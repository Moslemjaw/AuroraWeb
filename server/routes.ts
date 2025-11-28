import type { Express, Request, Response, NextFunction } from "express";
import { type Server } from "http";
import { Product, Order, Color, Presentation, AddOn, Setting, CustomOrder } from "./models";
import { body, validationResult } from "express-validator";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed"));
  }
});

declare module "express-session" {
  interface SessionData {
    adminId?: string;
    isAuthenticated?: boolean;
  }
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.use("/uploads", (req, res, next) => {
    const filePath = path.join(uploadDir, req.path);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ error: "File not found" });
    }
  });

  app.post("/api/upload", requireAuth, upload.single("image"), (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl, filename: req.file.filename });
  });

  app.post("/api/upload/multiple", requireAuth, upload.array("images", 10), (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }
    const imageUrls = files.map(file => `/uploads/${file.filename}`);
    res.json({ imageUrls });
  });
  
  app.post("/api/admin/login", [
    body("password").isLength({ min: 1 })
  ], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { password } = req.body;
      if (password === "admin123") {
        req.session.isAuthenticated = true;
        req.session.adminId = "admin";
        return res.json({ success: true, message: "Logged in successfully" });
      }
      res.status(401).json({ error: "Invalid credentials" });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/admin/check", (req, res) => {
    res.json({ isAuthenticated: !!req.session.isAuthenticated });
  });

  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:productId", async (req: Request, res: Response) => {
    try {
      const product = await Product.findOne({ productId: req.params.productId });
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.post("/api/products", requireAuth, [
    body("productId").isLength({ min: 1 }),
    body("title").isLength({ min: 1 }),
    body("price").isLength({ min: 1 }),
    body("description").isLength({ min: 1 }),
    body("imageUrl").isLength({ min: 1 }),
    body("category").isLength({ min: 1 })
  ], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const product = await new Product(req.body).save();
      res.status(201).json(product);
    } catch (error: any) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Product ID already exists" });
      }
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  app.patch("/api/products/:productId", requireAuth, async (req: Request, res: Response) => {
    try {
      const product = await Product.findOneAndUpdate(
        { productId: req.params.productId },
        { $set: req.body },
        { new: true }
      );
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/products/:productId", requireAuth, async (req: Request, res: Response) => {
    try {
      const product = await Product.findOneAndDelete({ productId: req.params.productId });
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  app.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.post("/api/orders", [
    body("customerName").isLength({ min: 1 }),
    body("total").isLength({ min: 1 }),
    body("items").isInt({ min: 1 })
  ], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const orderId = `ORD-${Date.now()}`;
      const order = await new Order({ orderId, ...req.body }).save();
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.patch("/api/orders/:orderId", requireAuth, async (req: Request, res: Response) => {
    try {
      const order = await Order.findOneAndUpdate(
        { orderId: req.params.orderId },
        { $set: req.body },
        { new: true }
      );
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to update order" });
    }
  });

  app.get("/api/colors", async (req: Request, res: Response) => {
    try {
      const colors = await Color.find().sort({ createdAt: 1 });
      res.json(colors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch colors" });
    }
  });

  app.post("/api/colors", requireAuth, [
    body("name").isLength({ min: 1 }),
    body("hex").matches(/^#[0-9A-F]{6}$/i),
    body("price").isFloat({ min: 0 })
  ], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const colorId = `color-${Date.now()}`;
      const color = await new Color({ colorId, ...req.body }).save();
      res.status(201).json(color);
    } catch (error) {
      res.status(500).json({ error: "Failed to create color" });
    }
  });

  app.patch("/api/colors/:colorId", requireAuth, async (req: Request, res: Response) => {
    try {
      const color = await Color.findOneAndUpdate(
        { colorId: req.params.colorId },
        { $set: req.body },
        { new: true }
      );
      if (!color) {
        return res.status(404).json({ error: "Color not found" });
      }
      res.json(color);
    } catch (error) {
      res.status(500).json({ error: "Failed to update color" });
    }
  });

  app.delete("/api/colors/:colorId", requireAuth, async (req: Request, res: Response) => {
    try {
      const color = await Color.findOneAndDelete({ colorId: req.params.colorId });
      if (!color) {
        return res.status(404).json({ error: "Color not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete color" });
    }
  });

  app.get("/api/presentations", async (req: Request, res: Response) => {
    try {
      const presentations = await Presentation.find().sort({ createdAt: 1 });
      res.json(presentations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch presentations" });
    }
  });

  app.post("/api/presentations", requireAuth, [
    body("name").isLength({ min: 1 }),
    body("price").isFloat({ min: 0 })
  ], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const presentationId = `pres-${Date.now()}`;
      const presentation = await new Presentation({ presentationId, ...req.body }).save();
      res.status(201).json(presentation);
    } catch (error) {
      res.status(500).json({ error: "Failed to create presentation" });
    }
  });

  app.patch("/api/presentations/:presentationId", requireAuth, async (req: Request, res: Response) => {
    try {
      const presentation = await Presentation.findOneAndUpdate(
        { presentationId: req.params.presentationId },
        { $set: req.body },
        { new: true }
      );
      if (!presentation) {
        return res.status(404).json({ error: "Presentation not found" });
      }
      res.json(presentation);
    } catch (error) {
      res.status(500).json({ error: "Failed to update presentation" });
    }
  });

  app.delete("/api/presentations/:presentationId", requireAuth, async (req: Request, res: Response) => {
    try {
      const presentation = await Presentation.findOneAndDelete({ presentationId: req.params.presentationId });
      if (!presentation) {
        return res.status(404).json({ error: "Presentation not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete presentation" });
    }
  });

  app.get("/api/addons", async (req: Request, res: Response) => {
    try {
      const addOns = await AddOn.find().sort({ createdAt: 1 });
      res.json(addOns);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch add-ons" });
    }
  });

  app.post("/api/addons", requireAuth, [
    body("name").isLength({ min: 1 }),
    body("price").isFloat({ min: 0 })
  ], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const addOnId = `addon-${Date.now()}`;
      const addOn = await new AddOn({ addOnId, ...req.body }).save();
      res.status(201).json(addOn);
    } catch (error) {
      res.status(500).json({ error: "Failed to create add-on" });
    }
  });

  app.patch("/api/addons/:addOnId", requireAuth, async (req: Request, res: Response) => {
    try {
      const addOn = await AddOn.findOneAndUpdate(
        { addOnId: req.params.addOnId },
        { $set: req.body },
        { new: true }
      );
      if (!addOn) {
        return res.status(404).json({ error: "Add-on not found" });
      }
      res.json(addOn);
    } catch (error) {
      res.status(500).json({ error: "Failed to update add-on" });
    }
  });

  app.delete("/api/addons/:addOnId", requireAuth, async (req: Request, res: Response) => {
    try {
      const addOn = await AddOn.findOneAndDelete({ addOnId: req.params.addOnId });
      if (!addOn) {
        return res.status(404).json({ error: "Add-on not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete add-on" });
    }
  });

  app.get("/api/settings", async (req: Request, res: Response) => {
    try {
      const settings = await Setting.find();
      const settingsObj = settings.reduce((acc: any, s: any) => {
        acc[s.key] = s.value;
        return acc;
      }, {});
      res.json(settingsObj);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  app.patch("/api/settings", requireAuth, async (req: Request, res: Response) => {
    try {
      const updates = req.body;
      for (const [key, value] of Object.entries(updates)) {
        await Setting.findOneAndUpdate(
          { key },
          { $set: { key, value } },
          { upsert: true, new: true }
        );
      }
      const settings = await Setting.find();
      const settingsObj = settings.reduce((acc: any, s: any) => {
        acc[s.key] = s.value;
        return acc;
      }, {});
      res.json(settingsObj);
    } catch (error) {
      res.status(500).json({ error: "Failed to update settings" });
    }
  });

  app.post("/api/custom-orders", [
    body("quantity").isInt({ min: 1 }),
    body("totalPrice").isLength({ min: 1 })
  ], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const customOrderId = `CUSTOM-${Date.now()}`;
      const customOrder = await new CustomOrder({ customOrderId, ...req.body }).save();
      res.status(201).json(customOrder);
    } catch (error) {
      res.status(500).json({ error: "Failed to create custom order" });
    }
  });

  app.get("/api/custom-orders", requireAuth, async (req: Request, res: Response) => {
    try {
      const customOrders = await CustomOrder.find().sort({ createdAt: -1 });
      res.json(customOrders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch custom orders" });
    }
  });

  app.get("/api/admin/stats", requireAuth, async (req: Request, res: Response) => {
    try {
      const totalOrders = await Order.countDocuments();
      const orders = await Order.find();
      
      const totalSales = orders.reduce((sum: number, order: any) => {
        const amount = parseFloat(order.total.replace(/[^0-9.]/g, ''));
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);

      const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

      res.json({
        totalSales: `${totalSales.toFixed(2)} K.D.`,
        totalOrders,
        avgOrderValue: `${avgOrderValue.toFixed(2)} K.D.`
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  return httpServer;
}
