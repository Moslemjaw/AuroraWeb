import ProductCard from "@/components/product-card";
import CustomOrderForm from "@/components/custom-order-form";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, ShoppingBag, Star, Check, TrendingUp, Menu } from "lucide-react";

// Assets imports
import peonyImg from "@assets/generated_images/handmade_fabric_peony_bouquet.png";
import roseImg from "@assets/generated_images/fabric_rose_close_up.png";
import tulipImg from "@assets/generated_images/pastel_fabric_tulips.png";
import hydrangeaImg from "@assets/generated_images/blue_fabric_hydrangea.png";
import orchidImg from "@assets/generated_images/white_fabric_orchid.png";
import sunflowerImg from "@assets/generated_images/fabric_sunflower_bouquet.png";
import logoImg from "@assets/WhatsApp Image 2025-11-28 at 10.40.17 PM-modified_1764359891804.png";
import luxuryBouquetImg from "@assets/image_1764358990214.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/10">
      
      {/* Navigation - Clean & Fixed on Mobile, integrated on Desktop */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between bg-white/95 backdrop-blur-md border-b border-border/40 transition-all duration-300">
         <div className="flex items-center gap-3">
           <img src={logoImg} alt="Logo" className="w-10 h-10 object-contain" />
           <span className="font-serif text-xl font-medium tracking-tight text-foreground">Fabric & Blooms</span>
         </div>
         
         <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8 text-xs font-bold tracking-widest uppercase text-muted-foreground/80">
              <a href="#products" className="hover:text-primary transition-colors">Shop</a>
              <a href="#about" className="hover:text-primary transition-colors">About Us</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            </div>
            
            <div className="w-px h-4 bg-border/60 mx-2" />
            
            <Button variant="ghost" size="sm" className="hover:bg-primary/5 hover:text-primary px-2 gap-2 text-xs font-bold tracking-widest uppercase text-muted-foreground/80">
               Cart
               <ShoppingBag className="w-4 h-4 mb-0.5" />
               <span className="bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full ml-[-4px] -mt-2">0</span>
            </Button>
         </div>

         <Button variant="ghost" size="icon" className="md:hidden"><Menu className="w-5 h-5" /></Button>
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
        <div className="w-full lg:w-[55%] h-[50vh] lg:h-auto relative order-1 lg:order-2 flex items-center justify-center bg-white p-6 lg:p-12 overflow-hidden">
          <div className="relative w-full h-full max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/5">
             <img 
               src={luxuryBouquetImg} 
               alt="Luxury Fabric Bouquet" 
               className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-[2000ms]"
             />
             {/* Subtle overlay for depth */}
             <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2rem] pointer-events-none" />
          </div>
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
            <ProductCard 
              image={peonyImg}
              title="Blushing Peony"
              price="15.00 K.D."
              description="Delicate layers of fabric handcrafted into a stunning bloom."
            />
            <ProductCard 
              image={roseImg}
              title="Royal Velvet Rose"
              price="6.00 K.D."
              description="Deep red velvet textures for a romantic, classic look."
            />
            <ProductCard 
              image={tulipImg}
              title="Pastel Tulip Set"
              price="10.50 K.D."
              description="A breath of spring that never fades. Perfect for gifting."
            />
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
            <ProductCard 
              image={hydrangeaImg}
              title="Azure Hydrangea"
              price="18.00 K.D."
              description="Voluminous blooms of hand-dyed blue fabric petals."
            />
            <ProductCard 
              image={orchidImg}
              title="Imperial Orchid"
              price="22.00 K.D."
              description="Elegant, architectural stems of pure white orchids."
            />
            <ProductCard 
              image={sunflowerImg}
              title="Rustic Sunflower"
              price="16.50 K.D."
              description="Warm and inviting sunflowers wrapped in natural burlap."
            />
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
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Journal</a>
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
