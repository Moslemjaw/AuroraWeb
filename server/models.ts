import mongoose from "mongoose";

// Admin User Schema
const adminUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

export const AdminUser = mongoose.model("AdminUser", adminUserSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  isCurated: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String },
  customerPhone: { type: String },
  total: { type: String, required: true },
  status: { type: String, default: "Pending", enum: ["Pending", "Processing", "Completed", "Cancelled"] },
  items: { type: Number, required: true },
  orderData: { type: Object }, // Store cart items
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);

// Color Schema
const colorSchema = new mongoose.Schema({
  colorId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  hex: { type: String, required: true },
}, { timestamps: true });

export const Color = mongoose.model("Color", colorSchema);

// Custom Order Schema
const customOrderSchema = new mongoose.Schema({
  customOrderId: { type: String, required: true, unique: true },
  customerName: { type: String },
  customerEmail: { type: String },
  customerPhone: { type: String },
  quantity: { type: Number, required: true },
  selectedColors: [{ type: String }],
  wrappingStyle: { type: String },
  totalPrice: { type: String, required: true },
  status: { type: String, default: "Pending" },
}, { timestamps: true });

export const CustomOrder = mongoose.model("CustomOrder", customOrderSchema);
