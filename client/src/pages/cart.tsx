import { useAdmin } from "@/lib/admin-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ShoppingBag, Minus, Plus, X } from "lucide-react";
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
      <nav className="sticky top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between bg-white border-b border-border/40">
         <div className="flex items-center gap-3">
           <Link href="/">
             <a className="flex items-center gap-3">
               <img src={logoImg} alt="Logo" className="w-10 h-10 object-contain" />
               <span className="font-serif text-xl font-medium tracking-tight text-foreground">Fabric & Blooms</span>
             </a>
           </Link>
         </div>
      </nav>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
        <div className="mb-12">
          <Link href="/">
            <a className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
            </a>
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground">Your Shopping Cart</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex gap-6 py-6 border-b border-border">
                <div className="w-24 h-32 bg-secondary/20 rounded-sm overflow-hidden flex-shrink-0">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-xl text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <span className="font-sans font-bold text-primary">{item.price}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-border rounded-sm">
                      <button className="p-2 hover:bg-secondary/50 transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button className="p-2 hover:bg-secondary/50 transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button className="text-xs text-muted-foreground hover:text-destructive transition-colors underline">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-secondary/10 p-8 h-fit rounded-sm">
            <h3 className="font-serif text-xl text-foreground mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6 pb-6 border-b border-border/50">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>36.00 K.D.</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <div className="flex justify-between items-end mb-8">
              <span className="font-medium">Total</span>
              <span className="font-serif text-2xl text-primary">36.00 K.D.</span>
            </div>
            <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-none uppercase tracking-widest text-xs font-bold">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
