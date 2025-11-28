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
import logoImg from "@assets/image_1764356989830.png";
import luxuryBouquetImg from "@assets/image_1764358990214.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/10">
      
      {/* Split Hero Section - Twig & Twine Style */}
      <header className="relative w-full min-h-screen flex flex-col lg:flex-row">
        
        {/* Left Panel - Content */}
        <div className="w-full lg:w-[45%] bg-white flex flex-col justify-between p-8 md:p-16 lg:p-20 z-10 order-2 lg:order-1">
          {/* Mobile Nav Toggle */}
          <div className="lg:hidden absolute top-6 right-6">
            <Button variant="ghost" size="icon"><Menu className="w-6 h-6" /></Button>
          </div>

          {/* Logo / Brand Area */}
          <div className="flex-1 flex flex-col justify-center items-start space-y-8">
             <div className="space-y-2">
               <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-foreground tracking-tight">
                 fabric <br/>
                 <span className="text-primary">&</span> blooms
               </h1>
               <p className="text-sm md:text-base tracking-[0.2em] text-muted-foreground font-bold uppercase pt-4 pl-1">
                 Floral Design Studio
               </p>
             </div>

             <nav className="flex flex-col items-start space-y-3 text-sm font-medium text-muted-foreground pt-8">
                <a href="#products" className="hover:text-primary transition-colors tracking-wide uppercase">Collections</a>
                <a href="#custom" className="hover:text-primary transition-colors tracking-wide uppercase">Custom Studio</a>
                <a href="#bestsellers" className="hover:text-primary transition-colors tracking-wide uppercase">Best Sellers</a>
                <a href="#about" className="hover:text-primary transition-colors tracking-wide uppercase">Our Story</a>
             </nav>
             
             <div className="pt-8">
               <Button className="rounded-full px-8 h-12 bg-foreground text-background hover:bg-primary hover:text-white transition-all uppercase tracking-widest text-xs font-bold">
                 Shop Latest
               </Button>
             </div>
          </div>

          {/* Footer of left panel */}
          <div className="hidden lg:flex gap-6 text-muted-foreground pt-12">
            <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5"/></a>
            <a href="#" className="hover:text-primary transition-colors"><ShoppingBag className="w-5 h-5"/></a>
          </div>
        </div>

        {/* Right Panel - Hero Image */}
        <div className="w-full lg:w-[55%] h-[50vh] lg:h-auto relative order-1 lg:order-2 overflow-hidden">
          <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none" />
          <img 
            src={luxuryBouquetImg} 
            alt="Luxury Fabric Bouquet" 
            className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-[2000ms]"
          />
        </div>

      </header>

      {/* Simplified Products Grid - Editorial Style */}
      <section id="products" className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-20">
             <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Curated Collections</h2>
             <div className="w-12 h-1 bg-primary mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <ProductCard 
              image={peonyImg}
              title="Blushing Peony"
              price="$45.00"
              description="Delicate layers of fabric handcrafted into a stunning bloom."
            />
            <ProductCard 
              image={roseImg}
              title="Royal Velvet Rose"
              price="$18.00"
              description="Deep red velvet textures for a romantic, classic look."
            />
            <ProductCard 
              image={tulipImg}
              title="Pastel Tulip Set"
              price="$32.00"
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
              price="$55.00"
              description="Voluminous blooms of hand-dyed blue fabric petals."
            />
            <ProductCard 
              image={orchidImg}
              title="Imperial Orchid"
              price="$65.00"
              description="Elegant, architectural stems of pure white orchids."
            />
            <ProductCard 
              image={sunflowerImg}
              title="Rustic Sunflower"
              price="$48.00"
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
