import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, timestamp, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const auroraProducts = pgTable("aurora_products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: text("product_id").notNull().unique(),
  title: text("title").notNull(),
  price: text("price").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  isCurated: text("is_curated").default("false"),
  isBestSeller: text("is_best_seller").default("false"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAuroraProductSchema = createInsertSchema(auroraProducts).omit({
  id: true,
  createdAt: true,
});
export type InsertAuroraProduct = z.infer<typeof insertAuroraProductSchema>;
export type AuroraProduct = typeof auroraProducts.$inferSelect;

export const auroraOrders = pgTable("aurora_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: text("order_id").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  total: text("total").notNull(),
  status: text("status").notNull().default("pending"),
  items: integer("items").notNull().default(1),
  orderData: jsonb("order_data"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAuroraOrderSchema = createInsertSchema(auroraOrders).omit({
  id: true,
  createdAt: true,
});
export type InsertAuroraOrder = z.infer<typeof insertAuroraOrderSchema>;
export type AuroraOrder = typeof auroraOrders.$inferSelect;

export const auroraColors = pgTable("aurora_colors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  colorId: text("color_id").notNull().unique(),
  name: text("name").notNull(),
  hex: text("hex").notNull(),
  price: real("price").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAuroraColorSchema = createInsertSchema(auroraColors).omit({
  id: true,
  createdAt: true,
});
export type InsertAuroraColor = z.infer<typeof insertAuroraColorSchema>;
export type AuroraColor = typeof auroraColors.$inferSelect;

export const auroraPresentations = pgTable("aurora_presentations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  presentationId: text("presentation_id").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAuroraPresentationSchema = createInsertSchema(auroraPresentations).omit({
  id: true,
  createdAt: true,
});
export type InsertAuroraPresentation = z.infer<typeof insertAuroraPresentationSchema>;
export type AuroraPresentation = typeof auroraPresentations.$inferSelect;

export const auroraAddons = pgTable("aurora_addons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  addOnId: text("addon_id").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAuroraAddonSchema = createInsertSchema(auroraAddons).omit({
  id: true,
  createdAt: true,
});
export type InsertAuroraAddon = z.infer<typeof insertAuroraAddonSchema>;
export type AuroraAddon = typeof auroraAddons.$inferSelect;

export const auroraSettings = pgTable("aurora_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAuroraSettingSchema = createInsertSchema(auroraSettings).omit({
  id: true,
  updatedAt: true,
});
export type InsertAuroraSetting = z.infer<typeof insertAuroraSettingSchema>;
export type AuroraSetting = typeof auroraSettings.$inferSelect;

export const auroraCustomOrders = pgTable("aurora_custom_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customOrderId: text("custom_order_id").notNull().unique(),
  customerName: text("customer_name"),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  quantity: integer("quantity").notNull().default(1),
  selectedColors: text("selected_colors").array(),
  selectedPresentation: text("selected_presentation"),
  selectedAddOns: text("selected_addons").array(),
  totalPrice: text("total_price").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAuroraCustomOrderSchema = createInsertSchema(auroraCustomOrders).omit({
  id: true,
  createdAt: true,
});
export type InsertAuroraCustomOrder = z.infer<typeof insertAuroraCustomOrderSchema>;
export type AuroraCustomOrder = typeof auroraCustomOrders.$inferSelect;
