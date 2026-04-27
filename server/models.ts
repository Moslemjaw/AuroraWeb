import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

export const AuroraAdminUser = mongoose.model("AuroraAdminUser", adminUserSchema);

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  titleAr: { type: String },
  price: { type: String, required: true },
  description: { type: String, required: true },
  descriptionAr: { type: String },
  longDescription: { type: String },
  longDescriptionAr: { type: String },
  imageUrl: { type: String, required: true },
  images: [{ type: String }],
  category: { type: String, required: true },
  isCurated: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
}, { timestamps: true });

export const AuroraProduct = mongoose.model("AuroraProduct", productSchema);

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

export const AuroraOrder = mongoose.model("AuroraOrder", orderSchema);

const colorSchema = new mongoose.Schema({
  colorId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  nameAr: { type: String },
  hex: { type: String, required: true },
  imageUrl: { type: String },
  price: { type: Number, default: 0 },
}, { timestamps: true });

export const AuroraColor = mongoose.model("AuroraColor", colorSchema);

const presentationSchema = new mongoose.Schema({
  presentationId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  nameAr: { type: String },
  description: { type: String },
  descriptionAr: { type: String },
  price: { type: Number, default: 0 },
}, { timestamps: true });

export const AuroraPresentation = mongoose.model("AuroraPresentation", presentationSchema);

const addOnSchema = new mongoose.Schema({
  addOnId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  nameAr: { type: String },
  description: { type: String },
  descriptionAr: { type: String },
  price: { type: Number, default: 0 },
}, { timestamps: true });

export const AuroraAddOn = mongoose.model("AuroraAddOn", addOnSchema);

const settingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true });

export const AuroraSetting = mongoose.model("AuroraSetting", settingSchema);

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

export const AuroraCustomOrder = mongoose.model("AuroraCustomOrder", customOrderSchema);

const inquirySchema = new mongoose.Schema({
  inquiryId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: "Unread", enum: ["Unread", "Read", "Replied"] },
}, { timestamps: true });

export const AuroraInquiry = mongoose.model("AuroraInquiry", inquirySchema);
