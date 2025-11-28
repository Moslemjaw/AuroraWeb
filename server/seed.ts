import { Product } from "./models";
import { isMongoConnected } from "./db";
import { memoryStorage } from "./storage-memory";

const seedProducts = [
  {
    productId: "peony-bouquet",
    title: "Blushing Peony",
    price: "15.00 K.D.",
    description: "Delicate layers of fabric handcrafted into a stunning bloom.",
    longDescription: "Our signature Blushing Peony bouquet features three hand-shaped blooms created from premium silk and organza. Each petal is individually cut, dyed, and molded to capture the organic irregularities of a real peony. The arrangement is finished with preserved eucalyptus foliage and wrapped in our branded kraft paper.",
    imageUrl: "/attached_assets/generated_images/handmade_fabric_peony_bouquet.png",
    category: "Bouquets",
    isCurated: true,
    isBestSeller: false,
  },
  {
    productId: "velvet-rose",
    title: "Royal Velvet Rose",
    price: "6.00 K.D.",
    description: "Deep red velvet textures for a romantic, classic look.",
    longDescription: "A symbol of timeless love, our Royal Velvet Rose is crafted from rich, deep red velvet that catches the light beautifully. Standing tall on a realistic wire stem wrapped in floral tape, this single stem makes a dramatic statement on its own or as part of a larger arrangement.",
    imageUrl: "/attached_assets/generated_images/fabric_rose_close_up.png",
    category: "Single Stems",
    isCurated: true,
    isBestSeller: false,
  },
  {
    productId: "pastel-tulips",
    title: "Pastel Tulip Set",
    price: "10.50 K.D.",
    description: "A breath of spring that never fades. Perfect for gifting.",
    longDescription: "Bring the freshness of spring indoors year-round with our Pastel Tulip Set. This bundle includes five tulips in varying shades of soft pink, cream, and lavender. Made from high-quality cotton blend fabric, these tulips have a soft, natural touch.",
    imageUrl: "/attached_assets/generated_images/pastel_fabric_tulips.png",
    category: "Bundles",
    isCurated: true,
    isBestSeller: false,
  },
  {
    productId: "azure-hydrangea",
    title: "Azure Hydrangea",
    price: "18.00 K.D.",
    description: "Voluminous blooms of hand-dyed blue fabric petals.",
    longDescription: "Our Azure Hydrangea is a masterpiece of volume and texture. Hundreds of small, hand-punched petals are assembled to create a full, rounded flower head. The fabric is hand-dyed to achieve a realistic gradient from pale blue to deep azure.",
    imageUrl: "/attached_assets/generated_images/blue_fabric_hydrangea.png",
    category: "Stems",
    isCurated: false,
    isBestSeller: true,
  },
  {
    productId: "imperial-orchid",
    title: "Imperial Orchid",
    price: "22.00 K.D.",
    description: "Elegant, architectural stems of pure white orchids.",
    longDescription: "Minimalist and sophisticated, the Imperial Orchid features a tall, arching stem with five pristine white blooms. Crafted from a specialized coated fabric that mimics the waxy texture of real orchids, this piece is perfect for modern interiors.",
    imageUrl: "/attached_assets/generated_images/white_fabric_orchid.png",
    category: "Potted",
    isCurated: false,
    isBestSeller: true,
  },
  {
    productId: "rustic-sunflower",
    title: "Rustic Sunflower",
    price: "16.50 K.D.",
    description: "Warm and inviting sunflowers wrapped in natural burlap.",
    longDescription: "Radiate happiness with our Rustic Sunflower arrangement. Using textured linen and felt, we've recreated the golden warmth of a sunflower field. The center is detailed with french knots for texture, and the bouquet is tied with rustic twine.",
    imageUrl: "/attached_assets/generated_images/fabric_sunflower_bouquet.png",
    category: "Bouquets",
    isCurated: false,
    isBestSeller: true,
  },
];

export async function seedDatabase() {
  try {
    if (isMongoConnected) {
      const count = await Product.countDocuments();
      if (count === 0) {
        await Product.insertMany(seedProducts);
        console.log("✓ Database seeded with products");
      }
    } else {
      // Seed memory storage
      for (const product of seedProducts) {
        await memoryStorage.createProduct(product);
      }
      console.log("✓ Memory storage seeded with products");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
