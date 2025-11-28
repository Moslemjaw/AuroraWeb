import type { Express, Request, Response, NextFunction } from "express";
import { type Server } from "http";
import { Product, Order, Color, CustomOrder, AdminUser } from "./models";
import { isMongoConnected } from "./db";
import { memoryStorage } from "./storage-memory";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

// Session type extension
declare module "express-session" {
  interface SessionData {
    adminId?: string;
    isAuthenticated?: boolean;
  }
}

// Auth middleware
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}

// Storage selector - use MongoDB if connected, otherwise use memory storage
function getStorage() {
  return isMongoConnected ? { Product, Order, Color, CustomOrder, isDB: true } : { storage: memoryStorage, isDB: false };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ============ AUTH ROUTES ============
  app.post("/api/admin/login", [
    body("password").isLength({ min: 1 })
  ], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { password } = req.body;
      
      // For demo: hardcoded admin check (password: admin123)
      // In production, use database-stored admin
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

  // ============ PRODUCT ROUTES ============
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const store = getStorage();
      const products = store.isDB ? await Product.find().sort({ createdAt: -1 }) : await store.storage.findProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:productId", async (req: Request, res: Response) => {
    try {
      const store = getStorage();
      const product = store.isDB ? await Product.findOne({ productId: req.params.productId }) : await store.storage.findProductByProductId(req.params.productId);
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
      const store = getStorage();
      const product = store.isDB ? await new Product(req.body).save() : await store.storage.createProduct(req.body);
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
      const store = getStorage();
      const product = store.isDB 
        ? await Product.findOneAndUpdate({ productId: req.params.productId }, { $set: req.body }, { new: true })
        : await store.storage.updateProduct(req.params.productId, req.body);
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
      const store = getStorage();
      const product = store.isDB 
        ? await Product.findOneAndDelete({ productId: req.params.productId })
        : await store.storage.deleteProduct(req.params.productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // ============ ORDER ROUTES ============
  app.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
    try {
      const store = getStorage();
      const orders = store.isDB ? await Order.find().sort({ createdAt: -1 }) : await store.storage.findOrders();
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
      const store = getStorage();
      const order = store.isDB 
        ? await new Order({ orderId, ...req.body }).save()
        : await store.storage.createOrder({ orderId, ...req.body });
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.patch("/api/orders/:orderId", requireAuth, async (req: Request, res: Response) => {
    try {
      const store = getStorage();
      const order = store.isDB 
        ? await Order.findOneAndUpdate({ orderId: req.params.orderId }, { $set: req.body }, { new: true })
        : await store.storage.updateOrder(req.params.orderId, req.body);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to update order" });
    }
  });

  // ============ COLOR ROUTES ============
  app.get("/api/colors", async (req: Request, res: Response) => {
    try {
      const store = getStorage();
      const colors = store.isDB ? await Color.find().sort({ createdAt: 1 }) : await store.storage.findColors();
      res.json(colors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch colors" });
    }
  });

  app.post("/api/colors", requireAuth, [
    body("name").isLength({ min: 1 }),
    body("hex").matches(/^#[0-9A-F]{6}$/i)
  ], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const colorId = `color-${Date.now()}`;
      const store = getStorage();
      const color = store.isDB 
        ? await new Color({ colorId, ...req.body }).save()
        : await store.storage.createColor({ colorId, ...req.body });
      res.status(201).json(color);
    } catch (error) {
      res.status(500).json({ error: "Failed to create color" });
    }
  });

  app.delete("/api/colors/:colorId", requireAuth, async (req: Request, res: Response) => {
    try {
      const store = getStorage();
      const color = store.isDB 
        ? await Color.findOneAndDelete({ colorId: req.params.colorId })
        : await store.storage.deleteColor(req.params.colorId);
      if (!color) {
        return res.status(404).json({ error: "Color not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete color" });
    }
  });

  // ============ CUSTOM ORDER ROUTES ============
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
      const store = getStorage();
      const customOrder = store.isDB 
        ? await new CustomOrder({ customOrderId, ...req.body }).save()
        : await store.storage.createCustomOrder({ customOrderId, ...req.body });
      res.status(201).json(customOrder);
    } catch (error) {
      res.status(500).json({ error: "Failed to create custom order" });
    }
  });

  app.get("/api/custom-orders", requireAuth, async (req: Request, res: Response) => {
    try {
      const store = getStorage();
      const customOrders = store.isDB ? await CustomOrder.find().sort({ createdAt: -1 }) : await store.storage.findCustomOrders();
      res.json(customOrders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch custom orders" });
    }
  });

  // ============ STATS/ANALYTICS ============
  app.get("/api/admin/stats", requireAuth, async (req: Request, res: Response) => {
    try {
      const store = getStorage();
      const totalOrders = store.isDB ? await Order.countDocuments() : await store.storage.countOrders();
      const orders = store.isDB ? await Order.find() : await store.storage.findOrders();
      
      // Calculate total sales
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
