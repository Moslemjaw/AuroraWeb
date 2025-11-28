// In-memory storage fallback when MongoDB is unavailable

interface Product {
  _id?: string;
  productId: string;
  title: string;
  price: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  category: string;
  isCurated?: boolean;
  isBestSeller?: boolean;
  createdAt?: Date;
}

interface Order {
  _id?: string;
  orderId: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  total: string;
  status: string;
  items: number;
  orderData?: any;
  createdAt?: Date;
}

interface Color {
  _id?: string;
  colorId: string;
  name: string;
  hex: string;
  price: number;
  createdAt?: Date;
}

interface Presentation {
  _id?: string;
  presentationId: string;
  name: string;
  description?: string;
  price: number;
  createdAt?: Date;
}

interface AddOn {
  _id?: string;
  addOnId: string;
  name: string;
  description?: string;
  price: number;
  createdAt?: Date;
}

interface Settings {
  _id?: string;
  key: string;
  value: any;
  updatedAt?: Date;
}

interface CustomOrder {
  _id?: string;
  customOrderId: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  quantity: number;
  selectedColors?: string[];
  selectedPresentation?: string;
  selectedAddOns?: string[];
  totalPrice: string;
  status: string;
  createdAt?: Date;
}

export class MemoryStorage {
  private products: Map<string, Product> = new Map();
  private orders: Map<string, Order> = new Map();
  private colors: Map<string, Color> = new Map();
  private presentations: Map<string, Presentation> = new Map();
  private addOns: Map<string, AddOn> = new Map();
  private settings: Map<string, Settings> = new Map();
  private customOrders: Map<string, CustomOrder> = new Map();

  constructor() {
    // Initialize with default colors (with prices)
    const defaultColors = [
      { colorId: "color-1", name: "Blush Pink", hex: "#f97a9d", price: 0.5 },
      { colorId: "color-2", name: "Cream White", hex: "#fdfbf7", price: 0 },
      { colorId: "color-3", name: "Sky Blue", hex: "#e0f2fe", price: 0.5 },
      { colorId: "color-4", name: "Lavender", hex: "#c4b5fd", price: 0.75 },
      { colorId: "color-5", name: "Ruby Red", hex: "#dc2626", price: 1.0 },
      { colorId: "color-6", name: "Gold", hex: "#fbbf24", price: 1.5 },
    ];
    defaultColors.forEach(color => {
      this.colors.set(color.colorId, { ...color, createdAt: new Date() });
    });

    // Initialize with default presentations
    const defaultPresentations = [
      { presentationId: "pres-1", name: "Signature Kraft Paper", description: "Eco-friendly kraft paper wrap", price: 0 },
      { presentationId: "pres-2", name: "Silk Ribbon Binding", description: "Elegant silk ribbon finish", price: 2.0 },
      { presentationId: "pres-3", name: "Ceramic Vase", description: "Beautiful ceramic vase included", price: 8.0 },
      { presentationId: "pres-4", name: "Premium Gift Box", description: "Luxury gift box presentation", price: 5.0 },
    ];
    defaultPresentations.forEach(pres => {
      this.presentations.set(pres.presentationId, { ...pres, createdAt: new Date() });
    });

    // Initialize with default add-ons
    const defaultAddOns = [
      { addOnId: "addon-1", name: "Greeting Card", description: "Personalized greeting card", price: 1.5 },
      { addOnId: "addon-2", name: "Extra Greenery", description: "Additional eucalyptus and foliage", price: 3.0 },
      { addOnId: "addon-3", name: "Decorative Pearls", description: "Pearl embellishments", price: 2.5 },
      { addOnId: "addon-4", name: "LED Fairy Lights", description: "Battery-powered fairy lights", price: 4.0 },
      { addOnId: "addon-5", name: "Fragrance Spray", description: "Light floral scent spray", price: 2.0 },
    ];
    defaultAddOns.forEach(addon => {
      this.addOns.set(addon.addOnId, { ...addon, createdAt: new Date() });
    });

    // Initialize default settings
    const defaultSettings = [
      { key: "flowerCountMin", value: 1 },
      { key: "flowerCountMax", value: 50 },
      { key: "pricePerFlower", value: 5.0 },
    ];
    defaultSettings.forEach(setting => {
      this.settings.set(setting.key, { ...setting, updatedAt: new Date() });
    });

    // Add demo orders
    const demoOrders = [
      { orderId: "ORD-7352", customerName: "Sarah Al-Sabah", total: "45.00 K.D.", status: "Processing", items: 3, createdAt: new Date("2024-11-28") },
      { orderId: "ORD-7351", customerName: "Fatima Ali", total: "120.00 K.D.", status: "Completed", items: 8, createdAt: new Date("2024-11-27") },
    ];
    demoOrders.forEach(order => {
      this.orders.set(order.orderId, order);
    });
  }

  // Products
  async findProducts() {
    return Array.from(this.products.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async findProductByProductId(productId: string) {
    return this.products.get(productId) || null;
  }

  async createProduct(product: any) {
    const newProduct = { ...product, _id: Date.now().toString(), createdAt: new Date() };
    this.products.set(product.productId, newProduct);
    return newProduct;
  }

  async updateProduct(productId: string, updates: any) {
    const product = this.products.get(productId);
    if (!product) return null;
    const updated = { ...product, ...updates };
    this.products.set(productId, updated);
    return updated;
  }

  async deleteProduct(productId: string) {
    const product = this.products.get(productId);
    this.products.delete(productId);
    return product || null;
  }

  // Orders
  async findOrders() {
    return Array.from(this.orders.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createOrder(order: any) {
    const newOrder = { ...order, _id: Date.now().toString(), createdAt: new Date() };
    this.orders.set(order.orderId, newOrder);
    return newOrder;
  }

  async updateOrder(orderId: string, updates: any) {
    const order = this.orders.get(orderId);
    if (!order) return null;
    const updated = { ...order, ...updates };
    this.orders.set(orderId, updated);
    return updated;
  }

  async countOrders() {
    return this.orders.size;
  }

  // Colors
  async findColors() {
    return Array.from(this.colors.values()).sort((a, b) => 
      (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0)
    );
  }

  async createColor(color: any) {
    const newColor = { ...color, _id: Date.now().toString(), createdAt: new Date() };
    this.colors.set(color.colorId, newColor);
    return newColor;
  }

  async updateColor(colorId: string, updates: any) {
    const color = this.colors.get(colorId);
    if (!color) return null;
    const updated = { ...color, ...updates };
    this.colors.set(colorId, updated);
    return updated;
  }

  async deleteColor(colorId: string) {
    const color = this.colors.get(colorId);
    this.colors.delete(colorId);
    return color || null;
  }

  // Presentations
  async findPresentations() {
    return Array.from(this.presentations.values()).sort((a, b) => 
      (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0)
    );
  }

  async createPresentation(presentation: any) {
    const newPresentation = { ...presentation, _id: Date.now().toString(), createdAt: new Date() };
    this.presentations.set(presentation.presentationId, newPresentation);
    return newPresentation;
  }

  async updatePresentation(presentationId: string, updates: any) {
    const presentation = this.presentations.get(presentationId);
    if (!presentation) return null;
    const updated = { ...presentation, ...updates };
    this.presentations.set(presentationId, updated);
    return updated;
  }

  async deletePresentation(presentationId: string) {
    const presentation = this.presentations.get(presentationId);
    this.presentations.delete(presentationId);
    return presentation || null;
  }

  // Add-ons
  async findAddOns() {
    return Array.from(this.addOns.values()).sort((a, b) => 
      (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0)
    );
  }

  async createAddOn(addOn: any) {
    const newAddOn = { ...addOn, _id: Date.now().toString(), createdAt: new Date() };
    this.addOns.set(addOn.addOnId, newAddOn);
    return newAddOn;
  }

  async updateAddOn(addOnId: string, updates: any) {
    const addOn = this.addOns.get(addOnId);
    if (!addOn) return null;
    const updated = { ...addOn, ...updates };
    this.addOns.set(addOnId, updated);
    return updated;
  }

  async deleteAddOn(addOnId: string) {
    const addOn = this.addOns.get(addOnId);
    this.addOns.delete(addOnId);
    return addOn || null;
  }

  // Settings
  async findSettings() {
    return Array.from(this.settings.values());
  }

  async getSetting(key: string) {
    return this.settings.get(key) || null;
  }

  async updateSetting(key: string, value: any) {
    const existing = this.settings.get(key);
    const setting = { key, value, updatedAt: new Date(), _id: existing?._id || Date.now().toString() };
    this.settings.set(key, setting);
    return setting;
  }

  // Custom Orders
  async findCustomOrders() {
    return Array.from(this.customOrders.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createCustomOrder(customOrder: any) {
    const newCustomOrder = { ...customOrder, _id: Date.now().toString(), createdAt: new Date() };
    this.customOrders.set(customOrder.customOrderId, newCustomOrder);
    return newCustomOrder;
  }
}

export const memoryStorage = new MemoryStorage();
