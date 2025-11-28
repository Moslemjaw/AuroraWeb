import { useState } from "react";
import { useAdmin } from "@/lib/admin-context";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Minus, Plus, ShoppingBag, Check } from "lucide-react";
import MobileNav from "@/components/mobile-nav";
import logoImg from "@assets/WhatsApp Image 2025-11-28 at 10.40.17 PM-modified_1764359891804.png";
import NotFound from "@/pages/not-found";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const [match, params] = useRoute("/product/:id");
  const { products } = useAdmin();
  const { addToCart, itemCount } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const product = products.find(p => p.productId === params?.id);

  if (!product) return <NotFound />;

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.imageUrl];

  const handleAddToCart = () => {
    addToCart({
      productId: product.productId,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
    }, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.title} added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <nav className="sticky top-0 left-0 w-full z-50 px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between bg-white border-b border-border/40">
         <div className="flex items-center gap-2 sm:gap-3">
           <Link href="/" className="flex items-center gap-2 sm:gap-3">
             <img src={logoImg} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
             <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-foreground">Fabric & Blooms</span>
           </Link>
         </div>
         <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8 text-xs font-bold tracking-widest uppercase text-muted-foreground/80">
              <Link href="/" className="hover:text-primary transition-colors">Shop</Link>
              <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
            <div className="w-px h-4 bg-border/60 mx-2" />
            <Link href="/cart" className="flex items-center gap-2 hover:text-primary transition-colors relative">
              <ShoppingBag className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
         </div>
         <MobileNav />
      </nav>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-6 sm:py-12">
        <Link href="/" className="inline-flex items-center text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors mb-6 sm:mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collection
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          <div className="space-y-4">
            <div className="bg-secondary/20 aspect-square sm:aspect-[4/5] overflow-hidden rounded-sm">
              <img 
                src={images[selectedImageIndex]} 
                alt={product.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              />
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === idx ? "border-primary" : "border-transparent"
                    }`}
                    data-testid={`image-thumb-${idx}`}
                  >
                    <img src={img} alt={`${product.title} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6 sm:space-y-8 lg:sticky lg:top-32">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-2 block">{product.category}</span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 sm:mb-4">{product.title}</h1>
              <p className="font-sans text-xl sm:text-2xl font-medium text-primary">{product.price}</p>
            </div>

            <div className="prose prose-stone text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
              <p>{product.longDescription || product.description}</p>
            </div>

            <div className="border-y border-border/50 py-4 sm:py-6 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" /> Handmade to order
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" /> Lifetime durability
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" /> Gift wrapping included
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="flex items-center border border-border rounded-none h-12 sm:h-14 px-2 sm:px-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 sm:p-2 hover:bg-secondary/50 transition-colors"
                  data-testid="decrease-quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 sm:w-12 text-center font-medium text-sm sm:text-base">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 sm:p-2 hover:bg-secondary/50 transition-colors"
                  data-testid="increase-quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button 
                onClick={handleAddToCart}
                className="flex-1 h-12 sm:h-14 bg-foreground text-background hover:bg-primary hover:text-white rounded-none uppercase tracking-widest text-[10px] sm:text-xs font-bold transition-colors"
                data-testid="button-add-to-cart"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
