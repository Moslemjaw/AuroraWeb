import { storage } from "./storage";

const seedProducts = [
  {
    productId: "peony-bouquet",
    title: "Blushing Peony",
    price: "15.00 K.D.",
    description: "Delicate layers of fabric handcrafted into a stunning bloom.",
    longDescription: "Our signature Blushing Peony bouquet features three hand-shaped blooms created from premium silk and organza.",
    imageUrl: "/attached_assets/generated_images/handmade_fabric_peony_bouquet.png",
    category: "Bouquets",
    isCurated: "true",
    isBestSeller: "false",
  },
  {
    productId: "velvet-rose",
    title: "Royal Velvet Rose",
    price: "6.00 K.D.",
    description: "Deep red velvet textures for a romantic, classic look.",
    longDescription: "A symbol of timeless love, our Royal Velvet Rose is crafted from rich, deep red velvet that catches the light beautifully.",
    imageUrl: "/attached_assets/generated_images/fabric_rose_close_up.png",
    category: "Single Stems",
    isCurated: "true",
    isBestSeller: "false",
  },
  {
    productId: "pastel-tulips",
    title: "Pastel Tulip Set",
    price: "10.50 K.D.",
    description: "A breath of spring that never fades. Perfect for gifting.",
    longDescription: "Bring the freshness of spring indoors year-round with our Pastel Tulip Set.",
    imageUrl: "/attached_assets/generated_images/pastel_fabric_tulips.png",
    category: "Bundles",
    isCurated: "true",
    isBestSeller: "false",
  },
  {
    productId: "azure-hydrangea",
    title: "Azure Hydrangea",
    price: "18.00 K.D.",
    description: "Voluminous blooms of hand-dyed blue fabric petals.",
    longDescription: "Our Azure Hydrangea is a masterpiece of volume and texture.",
    imageUrl: "/attached_assets/generated_images/blue_fabric_hydrangea.png",
    category: "Stems",
    isCurated: "false",
    isBestSeller: "true",
  },
  {
    productId: "imperial-orchid",
    title: "Imperial Orchid",
    price: "22.00 K.D.",
    description: "Elegant, architectural stems of pure white orchids.",
    longDescription: "Minimalist and sophisticated, the Imperial Orchid features a tall, arching stem with five pristine white blooms.",
    imageUrl: "/attached_assets/generated_images/white_fabric_orchid.png",
    category: "Potted",
    isCurated: "false",
    isBestSeller: "true",
  },
  {
    productId: "rustic-sunflower",
    title: "Rustic Sunflower",
    price: "16.50 K.D.",
    description: "Warm and inviting sunflowers wrapped in natural burlap.",
    longDescription: "Radiate happiness with our Rustic Sunflower arrangement.",
    imageUrl: "/attached_assets/generated_images/fabric_sunflower_bouquet.png",
    category: "Bouquets",
    isCurated: "false",
    isBestSeller: "true",
  },
];

const seedColors = [
  { colorId: "color-1", name: "Blush Pink", hex: "#f97a9d", price: 0.5 },
  { colorId: "color-2", name: "Cream White", hex: "#fdfbf7", price: 0 },
  { colorId: "color-3", name: "Sky Blue", hex: "#e0f2fe", price: 0.5 },
  { colorId: "color-4", name: "Lavender", hex: "#c4b5fd", price: 0.75 },
  { colorId: "color-5", name: "Ruby Red", hex: "#dc2626", price: 1.0 },
  { colorId: "color-6", name: "Gold", hex: "#fbbf24", price: 1.5 },
];

const seedPresentations = [
  { presentationId: "pres-1", name: "Signature Kraft Paper", description: "Eco-friendly kraft paper wrap", price: 0 },
  { presentationId: "pres-2", name: "Silk Ribbon Binding", description: "Elegant silk ribbon finish", price: 2.0 },
  { presentationId: "pres-3", name: "Ceramic Vase", description: "Beautiful ceramic vase included", price: 8.0 },
  { presentationId: "pres-4", name: "Premium Gift Box", description: "Luxury gift box presentation", price: 5.0 },
];

const seedAddons = [
  { addOnId: "addon-1", name: "Greeting Card", description: "Personalized greeting card", price: 1.5 },
  { addOnId: "addon-2", name: "Extra Greenery", description: "Additional eucalyptus and foliage", price: 3.0 },
  { addOnId: "addon-3", name: "Decorative Pearls", description: "Pearl embellishments", price: 2.5 },
  { addOnId: "addon-4", name: "LED Fairy Lights", description: "Battery-powered fairy lights", price: 4.0 },
  { addOnId: "addon-5", name: "Fragrance Spray", description: "Light floral scent spray", price: 2.0 },
];

const seedSettings = [
  { key: "flowerCountMin", value: 1 },
  { key: "flowerCountMax", value: 50 },
  { key: "pricePerFlower", value: 5.0 },
];

export async function seedDatabase() {
  try {
    const existingProducts = await storage.findProducts();
    if (existingProducts.length === 0) {
      for (const product of seedProducts) {
        await storage.createProduct(product);
      }
      console.log("✓ Database seeded with products");
    }

    const existingColors = await storage.findColors();
    if (existingColors.length === 0) {
      for (const color of seedColors) {
        await storage.createColor(color);
      }
      console.log("✓ Database seeded with colors");
    }

    const existingPresentations = await storage.findPresentations();
    if (existingPresentations.length === 0) {
      for (const presentation of seedPresentations) {
        await storage.createPresentation(presentation);
      }
      console.log("✓ Database seeded with presentations");
    }

    const existingAddons = await storage.findAddOns();
    if (existingAddons.length === 0) {
      for (const addon of seedAddons) {
        await storage.createAddOn(addon);
      }
      console.log("✓ Database seeded with add-ons");
    }

    const existingSettings = await storage.findSettings();
    if (existingSettings.length === 0) {
      for (const setting of seedSettings) {
        await storage.updateSetting(setting.key, setting.value);
      }
      console.log("✓ Database seeded with settings");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
