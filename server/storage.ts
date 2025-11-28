import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import {
  products, colors, presentations, addons, settings, orders, customOrders,
  type Product, type InsertProduct,
  type Color, type InsertColor,
  type Presentation, type InsertPresentation,
  type Addon, type InsertAddon,
  type Setting, type InsertSetting,
  type Order, type InsertOrder,
  type CustomOrder, type InsertCustomOrder,
} from "@shared/schema";

export interface IStorage {
  findProducts(): Promise<Product[]>;
  findProductByProductId(productId: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(productId: string, updates: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(productId: string): Promise<Product | undefined>;

  findOrders(): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(orderId: string, updates: Partial<InsertOrder>): Promise<Order | undefined>;
  countOrders(): Promise<number>;

  findColors(): Promise<Color[]>;
  createColor(color: InsertColor): Promise<Color>;
  updateColor(colorId: string, updates: Partial<InsertColor>): Promise<Color | undefined>;
  deleteColor(colorId: string): Promise<Color | undefined>;

  findPresentations(): Promise<Presentation[]>;
  createPresentation(presentation: InsertPresentation): Promise<Presentation>;
  updatePresentation(presentationId: string, updates: Partial<InsertPresentation>): Promise<Presentation | undefined>;
  deletePresentation(presentationId: string): Promise<Presentation | undefined>;

  findAddOns(): Promise<Addon[]>;
  createAddOn(addon: InsertAddon): Promise<Addon>;
  updateAddOn(addOnId: string, updates: Partial<InsertAddon>): Promise<Addon | undefined>;
  deleteAddOn(addOnId: string): Promise<Addon | undefined>;

  findSettings(): Promise<Setting[]>;
  getSetting(key: string): Promise<Setting | undefined>;
  updateSetting(key: string, value: unknown): Promise<Setting>;

  findCustomOrders(): Promise<CustomOrder[]>;
  createCustomOrder(customOrder: InsertCustomOrder): Promise<CustomOrder>;
}

export class DatabaseStorage implements IStorage {
  async findProducts(): Promise<Product[]> {
    return db.select().from(products).orderBy(desc(products.createdAt));
  }

  async findProductByProductId(productId: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.productId, productId));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(productId: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updated] = await db.update(products).set(updates).where(eq(products.productId, productId)).returning();
    return updated;
  }

  async deleteProduct(productId: string): Promise<Product | undefined> {
    const [deleted] = await db.delete(products).where(eq(products.productId, productId)).returning();
    return deleted;
  }

  async findOrders(): Promise<Order[]> {
    return db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }

  async updateOrder(orderId: string, updates: Partial<InsertOrder>): Promise<Order | undefined> {
    const [updated] = await db.update(orders).set(updates).where(eq(orders.orderId, orderId)).returning();
    return updated;
  }

  async countOrders(): Promise<number> {
    const result = await db.select().from(orders);
    return result.length;
  }

  async findColors(): Promise<Color[]> {
    return db.select().from(colors).orderBy(colors.createdAt);
  }

  async createColor(color: InsertColor): Promise<Color> {
    const [newColor] = await db.insert(colors).values(color).returning();
    return newColor;
  }

  async updateColor(colorId: string, updates: Partial<InsertColor>): Promise<Color | undefined> {
    const [updated] = await db.update(colors).set(updates).where(eq(colors.colorId, colorId)).returning();
    return updated;
  }

  async deleteColor(colorId: string): Promise<Color | undefined> {
    const [deleted] = await db.delete(colors).where(eq(colors.colorId, colorId)).returning();
    return deleted;
  }

  async findPresentations(): Promise<Presentation[]> {
    return db.select().from(presentations).orderBy(presentations.createdAt);
  }

  async createPresentation(presentation: InsertPresentation): Promise<Presentation> {
    const [newPresentation] = await db.insert(presentations).values(presentation).returning();
    return newPresentation;
  }

  async updatePresentation(presentationId: string, updates: Partial<InsertPresentation>): Promise<Presentation | undefined> {
    const [updated] = await db.update(presentations).set(updates).where(eq(presentations.presentationId, presentationId)).returning();
    return updated;
  }

  async deletePresentation(presentationId: string): Promise<Presentation | undefined> {
    const [deleted] = await db.delete(presentations).where(eq(presentations.presentationId, presentationId)).returning();
    return deleted;
  }

  async findAddOns(): Promise<Addon[]> {
    return db.select().from(addons).orderBy(addons.createdAt);
  }

  async createAddOn(addon: InsertAddon): Promise<Addon> {
    const [newAddOn] = await db.insert(addons).values(addon).returning();
    return newAddOn;
  }

  async updateAddOn(addOnId: string, updates: Partial<InsertAddon>): Promise<Addon | undefined> {
    const [updated] = await db.update(addons).set(updates).where(eq(addons.addOnId, addOnId)).returning();
    return updated;
  }

  async deleteAddOn(addOnId: string): Promise<Addon | undefined> {
    const [deleted] = await db.delete(addons).where(eq(addons.addOnId, addOnId)).returning();
    return deleted;
  }

  async findSettings(): Promise<Setting[]> {
    return db.select().from(settings);
  }

  async getSetting(key: string): Promise<Setting | undefined> {
    const [setting] = await db.select().from(settings).where(eq(settings.key, key));
    return setting;
  }

  async updateSetting(key: string, value: unknown): Promise<Setting> {
    const existing = await this.getSetting(key);
    if (existing) {
      const [updated] = await db.update(settings).set({ value, updatedAt: new Date() }).where(eq(settings.key, key)).returning();
      return updated;
    } else {
      const [newSetting] = await db.insert(settings).values({ key, value }).returning();
      return newSetting;
    }
  }

  async findCustomOrders(): Promise<CustomOrder[]> {
    return db.select().from(customOrders).orderBy(desc(customOrders.createdAt));
  }

  async createCustomOrder(customOrder: InsertCustomOrder): Promise<CustomOrder> {
    const [newCustomOrder] = await db.insert(customOrders).values(customOrder).returning();
    return newCustomOrder;
  }
}

export const storage = new DatabaseStorage();
