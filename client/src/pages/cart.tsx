import { useAdmin } from "@/lib/admin-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ShoppingBag, Minus, Plus, X } from "lucide-react";
import MobileNav from "@/components/mobile-nav";
import logoImg from "@assets/WhatsApp Image 2025-11-28 at 10.40.17 PM-modified_1764359891804.png";

export default function Cart() {
  const { products } = useAdmin();
  // Mock cart items - only if products are loaded
  const cartItems = products.length > 0 ? [
    { ...products[0], quantity: 1 },
    { ...(products[2] || products[1]), quantity: 2 }
  ] : [];

  return (
    <div className="min-h-screen bg-background font-sans">
      <nav className="sticky top-0 left-0 w-full z-50 px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between bg-white border-b border-border/40">
         <div className="flex items-center gap-2 sm:gap-3">
           <Link href="/">
             <a className="flex items-center gap-2 sm:gap-3">
               <img src={logoImg} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
               <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-foreground">Fabric & Blooms</span>
             </a>
           </Link>
         </div>
         <MobileNav />
      </nav>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-6 sm:py-12">
        <div className="mb-8 sm:mb-12">
          <Link href="/">
            <a className="inline-flex items-center text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
            </a>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">Your Shopping Cart</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
          <div className="lg:col-span-2 space-y-4 sm:space-y-8">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex gap-4 sm:gap-6 py-4 sm:py-6 border-b border-border">
                <div className="w-20 h-24 sm:w-24 sm:h-32 bg-secondary/20 rounded-sm overflow-hidden flex-shrink-0">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <h3 className="font-serif text-base sm:text-xl text-foreground truncate">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <span className="font-sans font-bold text-primary text-sm sm:text-base whitespace-nowrap">{item.price}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3 sm:mt-0">
                    <div className="flex items-center border border-border rounded-sm">
                      <button className="p-1.5 sm:p-2 hover:bg-secondary/50 transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="w-6 sm:w-8 text-center text-xs sm:text-sm">{item.quantity}</span>
                      <button className="p-1.5 sm:p-2 hover:bg-secondary/50 transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button className="text-[10px] sm:text-xs text-muted-foreground hover:text-destructive transition-colors underline">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-secondary/10 p-5 sm:p-8 h-fit rounded-sm">
            <h3 className="font-serif text-lg sm:text-xl text-foreground mb-4 sm:mb-6">Order Summary</h3>
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border/50">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>36.00 K.D.</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-right">Calculated at checkout</span>
              </div>
            </div>
            <div className="flex justify-between items-end mb-6 sm:mb-8">
              <span className="font-medium text-sm sm:text-base">Total</span>
              <span className="font-serif text-xl sm:text-2xl text-primary">36.00 K.D.</span>
            </div>
            <Button className="w-full h-11 sm:h-12 bg-primary hover:bg-primary/90 text-white rounded-none uppercase tracking-widest text-[10px] sm:text-xs font-bold">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
