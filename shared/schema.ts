import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, timestamp, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
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

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export const orders = pgTable("orders", {
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

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export const colors = pgTable("colors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  colorId: text("color_id").notNull().unique(),
  name: text("name").notNull(),
  hex: text("hex").notNull(),
  price: real("price").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertColorSchema = createInsertSchema(colors).omit({
  id: true,
  createdAt: true,
});
export type InsertColor = z.infer<typeof insertColorSchema>;
export type Color = typeof colors.$inferSelect;

export const presentations = pgTable("presentations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  presentationId: text("presentation_id").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPresentationSchema = createInsertSchema(presentations).omit({
  id: true,
  createdAt: true,
});
export type InsertPresentation = z.infer<typeof insertPresentationSchema>;
export type Presentation = typeof presentations.$inferSelect;

export const addons = pgTable("addons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  addOnId: text("addon_id").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAddonSchema = createInsertSchema(addons).omit({
  id: true,
  createdAt: true,
});
export type InsertAddon = z.infer<typeof insertAddonSchema>;
export type Addon = typeof addons.$inferSelect;

export const settings = pgTable("settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSettingSchema = createInsertSchema(settings).omit({
  id: true,
  updatedAt: true,
});
export type InsertSetting = z.infer<typeof insertSettingSchema>;
export type Setting = typeof settings.$inferSelect;

export const customOrders = pgTable("custom_orders", {
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

export const insertCustomOrderSchema = createInsertSchema(customOrders).omit({
  id: true,
  createdAt: true,
});
export type InsertCustomOrder = z.infer<typeof insertCustomOrderSchema>;
export type CustomOrder = typeof customOrders.$inferSelect;
