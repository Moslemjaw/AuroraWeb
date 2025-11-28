import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

export const AdminUser = mongoose.model("AdminUser", adminUserSchema);

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String },
  imageUrl: { type: String, required: true },
  images: [{ type: String }],
  category: { type: String, required: true },
  isCurated: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String },
  customerPhone: { type: String },
  total: { type: String, required: true },
  status: { type: String, default: "Pending", enum: ["Pending", "Processing", "Completed", "Cancelled"] },
  items: { type: Number, required: true },
  orderData: { type: Object },
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);

const colorSchema = new mongoose.Schema({
  colorId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  hex: { type: String, required: true },
  price: { type: Number, default: 0 },
}, { timestamps: true });

export const Color = mongoose.model("Color", colorSchema);

const presentationSchema = new mongoose.Schema({
  presentationId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, default: 0 },
}, { timestamps: true });

export const Presentation = mongoose.model("Presentation", presentationSchema);

const addOnSchema = new mongoose.Schema({
  addOnId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, default: 0 },
}, { timestamps: true });

export const AddOn = mongoose.model("AddOn", addOnSchema);

const settingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true });

export const Setting = mongoose.model("Setting", settingSchema);

const customOrderSchema = new mongoose.Schema({
  customOrderId: { type: String, required: true, unique: true },
  customerName: { type: String },
  customerEmail: { type: String },
  customerPhone: { type: String },
  quantity: { type: Number, required: true },
  selectedColors: [{ type: String }],
  selectedPresentation: { type: String },
  selectedAddOns: [{ type: String }],
  totalPrice: { type: String, required: true },
  status: { type: String, default: "Pending" },
}, { timestamps: true });

export const CustomOrder = mongoose.model("CustomOrder", customOrderSchema);
