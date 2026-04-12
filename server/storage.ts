import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import {
  auroraProducts, auroraColors, auroraPresentations, auroraAddons, auroraSettings, auroraOrders, auroraCustomOrders,
  type AuroraProduct as Product, type InsertAuroraProduct as InsertProduct,
  type AuroraColor as Color, type InsertAuroraColor as InsertColor,
  type AuroraPresentation as Presentation, type InsertAuroraPresentation as InsertPresentation,
  type AuroraAddon as Addon, type InsertAuroraAddon as InsertAddon,
  type AuroraSetting as Setting, type InsertAuroraSetting as InsertSetting,
  type AuroraOrder as Order, type InsertAuroraOrder as InsertOrder,
  type AuroraCustomOrder as CustomOrder, type InsertAuroraCustomOrder as InsertCustomOrder,
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
    return db.select().from(auroraProducts).orderBy(desc(auroraProducts.createdAt));
  }

  async findProductByProductId(productId: string): Promise<Product | undefined> {
    const [product] = await db.select().from(auroraProducts).where(eq(auroraProducts.productId, productId));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(auroraProducts).values(product).returning();
    return newProduct;
  }

  async updateProduct(productId: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updated] = await db.update(auroraProducts).set(updates).where(eq(auroraProducts.productId, productId)).returning();
    return updated;
  }

  async deleteProduct(productId: string): Promise<Product | undefined> {
    const [deleted] = await db.delete(auroraProducts).where(eq(auroraProducts.productId, productId)).returning();
    return deleted;
  }

  async findOrders(): Promise<Order[]> {
    return db.select().from(auroraOrders).orderBy(desc(auroraOrders.createdAt));
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(auroraOrders).values(order).returning();
    return newOrder;
  }

  async updateOrder(orderId: string, updates: Partial<InsertOrder>): Promise<Order | undefined> {
    const [updated] = await db.update(auroraOrders).set(updates).where(eq(auroraOrders.orderId, orderId)).returning();
    return updated;
  }

  async countOrders(): Promise<number> {
    const result = await db.select().from(auroraOrders);
    return result.length;
  }

  async findColors(): Promise<Color[]> {
    return db.select().from(auroraColors).orderBy(auroraColors.createdAt);
  }

  async createColor(color: InsertColor): Promise<Color> {
    const [newColor] = await db.insert(auroraColors).values(color).returning();
    return newColor;
  }

  async updateColor(colorId: string, updates: Partial<InsertColor>): Promise<Color | undefined> {
    const [updated] = await db.update(auroraColors).set(updates).where(eq(auroraColors.colorId, colorId)).returning();
    return updated;
  }

  async deleteColor(colorId: string): Promise<Color | undefined> {
    const [deleted] = await db.delete(auroraColors).where(eq(auroraColors.colorId, colorId)).returning();
    return deleted;
  }

  async findPresentations(): Promise<Presentation[]> {
    return db.select().from(auroraPresentations).orderBy(auroraPresentations.createdAt);
  }

  async createPresentation(presentation: InsertPresentation): Promise<Presentation> {
    const [newPresentation] = await db.insert(auroraPresentations).values(presentation).returning();
    return newPresentation;
  }

  async updatePresentation(presentationId: string, updates: Partial<InsertPresentation>): Promise<Presentation | undefined> {
    const [updated] = await db.update(auroraPresentations).set(updates).where(eq(auroraPresentations.presentationId, presentationId)).returning();
    return updated;
  }

  async deletePresentation(presentationId: string): Promise<Presentation | undefined> {
    const [deleted] = await db.delete(auroraPresentations).where(eq(auroraPresentations.presentationId, presentationId)).returning();
    return deleted;
  }

  async findAddOns(): Promise<Addon[]> {
    return db.select().from(auroraAddons).orderBy(auroraAddons.createdAt);
  }

  async createAddOn(addon: InsertAddon): Promise<Addon> {
    const [newAddOn] = await db.insert(auroraAddons).values(addon).returning();
    return newAddOn;
  }

  async updateAddOn(addOnId: string, updates: Partial<InsertAddon>): Promise<Addon | undefined> {
    const [updated] = await db.update(auroraAddons).set(updates).where(eq(auroraAddons.addOnId, addOnId)).returning();
    return updated;
  }

  async deleteAddOn(addOnId: string): Promise<Addon | undefined> {
    const [deleted] = await db.delete(auroraAddons).where(eq(auroraAddons.addOnId, addOnId)).returning();
    return deleted;
  }

  async findSettings(): Promise<Setting[]> {
    return db.select().from(auroraSettings);
  }

  async getSetting(key: string): Promise<Setting | undefined> {
    const [setting] = await db.select().from(auroraSettings).where(eq(auroraSettings.key, key));
    return setting;
  }

  async updateSetting(key: string, value: unknown): Promise<Setting> {
    const existing = await this.getSetting(key);
    if (existing) {
      const [updated] = await db.update(auroraSettings).set({ value, updatedAt: new Date() }).where(eq(auroraSettings.key, key)).returning();
      return updated;
    } else {
      const [newSetting] = await db.insert(auroraSettings).values({ key, value }).returning();
      return newSetting;
    }
  }

  async findCustomOrders(): Promise<CustomOrder[]> {
    return db.select().from(auroraCustomOrders).orderBy(desc(auroraCustomOrders.createdAt));
  }

  async createCustomOrder(customOrder: InsertCustomOrder): Promise<CustomOrder> {
    const [newCustomOrder] = await db.insert(auroraCustomOrders).values(customOrder).returning();
    return newCustomOrder;
  }
}

export const storage = new DatabaseStorage();
