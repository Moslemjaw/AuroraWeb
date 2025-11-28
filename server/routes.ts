import type { Express, Request, Response, NextFunction } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { body, validationResult } from "express-validator";

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
      const products = await storage.findProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:productId", async (req: Request, res: Response) => {
    try {
      const product = await storage.findProductByProductId(req.params.productId);
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
      const product = await storage.createProduct(req.body);
      res.status(201).json(product);
    } catch (error: any) {
      if (error.code === "23505") {
        return res.status(400).json({ error: "Product ID already exists" });
      }
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  app.patch("/api/products/:productId", requireAuth, async (req: Request, res: Response) => {
    try {
      const product = await storage.updateProduct(req.params.productId, req.body);
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
      const product = await storage.deleteProduct(req.params.productId);
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
      const orders = await storage.findOrders();
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
      const order = await storage.createOrder({ orderId, ...req.body });
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.patch("/api/orders/:orderId", requireAuth, async (req: Request, res: Response) => {
    try {
      const order = await storage.updateOrder(req.params.orderId, req.body);
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
      const colors = await storage.findColors();
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
      const color = await storage.createColor({ colorId, ...req.body });
      res.status(201).json(color);
    } catch (error) {
      res.status(500).json({ error: "Failed to create color" });
    }
  });

  app.patch("/api/colors/:colorId", requireAuth, async (req: Request, res: Response) => {
    try {
      const color = await storage.updateColor(req.params.colorId, req.body);
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
      const color = await storage.deleteColor(req.params.colorId);
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
      const presentations = await storage.findPresentations();
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
      const presentation = await storage.createPresentation({ presentationId, ...req.body });
      res.status(201).json(presentation);
    } catch (error) {
      res.status(500).json({ error: "Failed to create presentation" });
    }
  });

  app.patch("/api/presentations/:presentationId", requireAuth, async (req: Request, res: Response) => {
    try {
      const presentation = await storage.updatePresentation(req.params.presentationId, req.body);
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
      const presentation = await storage.deletePresentation(req.params.presentationId);
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
      const addOns = await storage.findAddOns();
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
      const addOn = await storage.createAddOn({ addOnId, ...req.body });
      res.status(201).json(addOn);
    } catch (error) {
      res.status(500).json({ error: "Failed to create add-on" });
    }
  });

  app.patch("/api/addons/:addOnId", requireAuth, async (req: Request, res: Response) => {
    try {
      const addOn = await storage.updateAddOn(req.params.addOnId, req.body);
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
      const addOn = await storage.deleteAddOn(req.params.addOnId);
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
      const allSettings = await storage.findSettings();
      const settingsObj = allSettings.reduce((acc: any, s: any) => {
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
        await storage.updateSetting(key, value);
      }
      const allSettings = await storage.findSettings();
      const settingsObj = allSettings.reduce((acc: any, s: any) => {
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
      const customOrder = await storage.createCustomOrder({ customOrderId, ...req.body });
      res.status(201).json(customOrder);
    } catch (error) {
      res.status(500).json({ error: "Failed to create custom order" });
    }
  });

  app.get("/api/custom-orders", requireAuth, async (req: Request, res: Response) => {
    try {
      const customOrders = await storage.findCustomOrders();
      res.json(customOrders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch custom orders" });
    }
  });

  app.get("/api/admin/stats", requireAuth, async (req: Request, res: Response) => {
    try {
      const totalOrders = await storage.countOrders();
      const orders = await storage.findOrders();
      
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
