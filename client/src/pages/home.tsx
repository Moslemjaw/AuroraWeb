import ProductCard from "@/components/product-card";
import CustomOrderForm from "@/components/custom-order-form";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, ShoppingBag, Star, Check, TrendingUp, Menu } from "lucide-react";
import { Link } from "wouter";

// Assets imports
import peonyImg from "@assets/generated_images/handmade_fabric_peony_bouquet.png";
import roseImg from "@assets/generated_images/fabric_rose_close_up.png";
import tulipImg from "@assets/generated_images/pastel_fabric_tulips.png";
import hydrangeaImg from "@assets/generated_images/blue_fabric_hydrangea.png";
import orchidImg from "@assets/generated_images/white_fabric_orchid.png";
import sunflowerImg from "@assets/generated_images/fabric_sunflower_bouquet.png";
import logoImg from "@assets/WhatsApp Image 2025-11-28 at 10.40.17 PM-modified_1764359891804.png";
import luxuryBouquetImg from "@assets/image_1764358990214.png";

import { useAdmin } from "@/lib/admin-context";
import { useLocation } from "wouter";
import { useState } from "react";

export default function Home() {
  const { products } = useAdmin();
  const [, setLocation] = useLocation();
  const [logoClicks, setLogoClicks] = useState(0);

  const handleLogoClick = (e: React.MouseEvent) => {
    // If 5 clicks in 3 seconds
    const newClicks = logoClicks + 1;
    setLogoClicks(newClicks);
    
    if (newClicks >= 5) {
      setLocation("/admin/login");
      setLogoClicks(0);
    }

    // Reset after 2 seconds of no clicks
    setTimeout(() => {
        setLogoClicks(0);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/10">
      
      {/* Navigation - Absolute positioned over Hero */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 py-8 flex items-center justify-between bg-transparent">
         <div className="flex items-center gap-3 cursor-pointer" onClick={handleLogoClick}>
           <img src={logoImg} alt="Logo" className="w-10 h-10 object-contain brightness-0 invert lg:filter-none transition-all" />
           <span className="font-serif text-xl font-medium tracking-tight text-white lg:text-foreground transition-colors">Fabric & Blooms</span>
         </div>
         
         <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8 text-xs font-bold tracking-widest uppercase text-white/90 hover:text-white transition-colors items-center">
              <Link href="/"><a className="hover:text-white transition-colors">Shop</a></Link>
              <Link href="/about"><a className="hover:text-white transition-colors">About Us</a></Link>
              <Link href="/contact"><a className="hover:text-white transition-colors">Contact</a></Link>
            </div>
            
            <div className="w-px h-4 bg-white/40 mx-2" />
            
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="hover:bg-white/10 hover:text-white px-0 gap-2 text-xs font-bold tracking-widest uppercase text-white/90">
                 Cart
                 <div className="relative">
                   <ShoppingBag className="w-5 h-5" />
                   <div className="absolute -top-2 -right-2 bg-white text-primary text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">0</div>
                 </div>
              </Button>
            </Link>
         </div>

         <Button variant="ghost" size="icon" className="md:hidden text-white"><Menu className="w-6 h-6" /></Button>
      </nav>

      {/* Hero Section - Redesigned Left Side */}
      <header className="relative w-full min-h-screen flex flex-col lg:flex-row">
        
        {/* Left Panel - Cleaner, Minimalist Content */}
        <div className="w-full lg:w-[45%] bg-white flex flex-col justify-center items-start p-8 md:p-16 lg:p-24 z-10 order-2 lg:order-1 pt-32 lg:pt-0">
             
             <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
               EST. 2024
             </span>

             <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] text-foreground tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
               Timeless <br/>
               <span className="italic font-light text-foreground/80">Botanicals.</span>
             </h1>

             <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-md mb-12 font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
               Handcrafted fabric flowers that capture the fleeting beauty of nature in a permanent form. Sustainable luxury for your home.
             </p>
             
             <div className="flex items-center gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
               <Button 
                 variant="outline" 
                 className="rounded-none border border-foreground/80 bg-transparent text-foreground hover:bg-primary hover:text-white hover:border-primary px-10 h-12 text-xs tracking-[0.2em] uppercase font-bold transition-all"
               >
                 View Collections
               </Button>
               <a href="#custom" className="text-xs tracking-[0.2em] uppercase font-bold text-muted-foreground/80 hover:text-foreground transition-colors">
                 Custom Orders
               </a>
             </div>
        </div>

        {/* Right Panel - Hero Image */}
        <div className="w-full lg:w-[55%] h-[50vh] lg:h-auto relative order-1 lg:order-2 overflow-hidden">
          <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none" />
          {/* Gradient fade to blend image with the next section */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white via-white/50 to-transparent z-20" />
          <img 
            src={luxuryBouquetImg} 
            alt="Luxury Fabric Bouquet" 
            className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-[2000ms]"
          />
        </div>

      </header>

      {/* Simplified Products Grid - Editorial Style */}
      <section id="products" className="pt-12 pb-32 bg-white relative z-20 -mt-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
             <p className="text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase mb-3">Shop The Look</p>
             <h2 className="font-serif text-4xl md:text-5xl text-foreground">Curated Collections</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {products.filter(p => p.isCurated).slice(0, 3).map((product) => (
              <ProductCard 
                key={product.productId}
                id={product.productId}
                image={product.imageUrl}
                title={product.title}
                price={product.price}
                description={product.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Professional Custom Order Section - Clean Background */}
      <section id="custom" className="py-32 bg-secondary/20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            <div className="space-y-10">
              <div className="space-y-6">
                <span className="text-primary font-bold tracking-widest uppercase text-xs">Bespoke Service</span>
                <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                  Design Your Own <br/>
                  Masterpiece.
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed font-light">
                  Our Custom Studio allows you to commission a unique arrangement. 
                  Select your preferences, and our artisans will craft a piece specifically for your space.
                </p>
              </div>

              <div className="space-y-8 font-serif text-xl text-foreground/80">
                <div className="flex items-center gap-4">
                  <span className="text-primary text-2xl">01.</span> Select Quantity
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-primary text-2xl">02.</span> Choose Palette
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-primary text-2xl">03.</span> We Create
                </div>
              </div>
            </div>

            <div className="w-full bg-white p-8 md:p-12 shadow-xl shadow-black/5">
               <CustomOrderForm />
            </div>

          </div>
        </div>
      </section>

      {/* Best Selling Section - Gallery Style */}
      <section id="bestsellers" className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-primary font-bold tracking-widest uppercase text-xs">Client Favorites</span>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">Best Sellers</h2>
            </div>
            <Button variant="outline" className="rounded-none border-b-2 border-transparent border-b-primary hover:border-b-primary hover:bg-transparent px-0 h-auto text-foreground font-medium uppercase tracking-widest text-xs">
              View All Favorites
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {products.filter(p => p.isBestSeller).length > 0 ? 
              products.filter(p => p.isBestSeller).slice(0, 3).map(product => (
                <ProductCard 
                  key={product.productId}
                  id={product.productId}
                  image={product.imageUrl}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                />
              )) : 
              // Fallback if no best sellers selected yet
              products.slice(3, 6).map(product => (
                <ProductCard 
                  key={product.productId}
                  id={product.productId}
                  image={product.imageUrl}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                />
              ))
            }
          </div>
        </div>
      </section>

      {/* Minimal Footer - Centered */}
      <footer className="bg-white py-24 border-t border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
          <div className="flex justify-center items-center gap-3 mb-10">
            <span className="font-serif text-3xl tracking-tight">fabric <span className="text-primary">&</span> blooms</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12 text-sm font-medium text-muted-foreground uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Shop</a>
            <a href="#" className="hover:text-primary transition-colors">About Us</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </nav>

          <div className="flex justify-center gap-6 mb-12">
             <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"><Instagram className="w-4 h-4"/></a>
             <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"><ShoppingBag className="w-4 h-4"/></a>
          </div>
          
          <p className="text-xs text-muted-foreground/60 uppercase tracking-widest">
            © 2025 Fabric Blooms Studio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
