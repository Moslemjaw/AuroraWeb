import { useAdmin } from "@/lib/admin-context";
import { Button } from "@/components/ui/button";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Minus, Plus, ShoppingBag, Star, Check } from "lucide-react";
import logoImg from "@assets/WhatsApp Image 2025-11-28 at 10.40.17 PM-modified_1764359891804.png";
import NotFound from "@/pages/not-found";

export default function ProductDetail() {
  const [match, params] = useRoute("/product/:id");
  const { products } = useAdmin();
  const product = products.find(p => p.id === params?.id);

  if (!product) return <NotFound />;

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
         <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8 text-xs font-bold tracking-widest uppercase text-muted-foreground/80">
              <Link href="/"><a className="hover:text-primary transition-colors">Shop</a></Link>
              <Link href="/about"><a className="hover:text-primary transition-colors">About Us</a></Link>
              <Link href="/contact"><a className="hover:text-primary transition-colors">Contact</a></Link>
            </div>
            <div className="w-px h-4 bg-border/60 mx-2" />
            <Link href="/cart">
              <a className="flex items-center gap-2 hover:text-primary transition-colors">
                <ShoppingBag className="w-4 h-4" />
              </a>
            </Link>
         </div>
      </nav>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
        <Link href="/">
          <a className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collection
          </a>
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Product Image */}
          <div className="bg-secondary/20 aspect-[4/5] overflow-hidden rounded-sm">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>

          {/* Product Details */}
          <div className="space-y-8 sticky top-32">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">{product.category}</span>
              <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">{product.title}</h1>
              <p className="font-sans text-2xl font-medium text-primary">{product.price}</p>
            </div>

            <div className="prose prose-stone text-muted-foreground font-light leading-relaxed">
              <p>{product.longDescription}</p>
            </div>

            <div className="border-y border-border/50 py-6 space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary" /> Handmade to order
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary" /> Lifetime durability
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary" /> Gift wrapping included
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center border border-border rounded-none h-14 px-4">
                <button className="p-2 hover:bg-secondary/50 transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="w-12 text-center font-medium">1</span>
                <button className="p-2 hover:bg-secondary/50 transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              <Button className="flex-1 h-14 bg-foreground text-background hover:bg-primary hover:text-white rounded-none uppercase tracking-widest text-xs font-bold transition-colors">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
