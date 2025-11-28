import SplineFlower from "@/components/3d-flower";
import ProductCard from "@/components/product-card";
import CustomOrderForm from "@/components/custom-order-form";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, ShoppingBag, Heart, Sparkles, Play } from "lucide-react";
import { motion } from "framer-motion";

// Assets imports
import peonyImg from "@assets/generated_images/handmade_fabric_peony_bouquet.png";
import roseImg from "@assets/generated_images/fabric_rose_close_up.png";
import tulipImg from "@assets/generated_images/pastel_fabric_tulips.png";
import logoImg from "@assets/image_1764356989830.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 overflow-x-hidden">
      
      {/* Modern Floating Navigation */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div className="glass-panel rounded-full px-6 py-3 flex items-center gap-8 md:gap-12 shadow-2xl shadow-black/5 max-w-4xl w-full justify-between">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Fabric Blooms Logo" className="w-8 h-8 object-contain" />
            <span className="font-serif text-xl font-semibold tracking-tight text-foreground hidden sm:block">Fabric Blooms</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-sm font-medium hover:text-primary transition-colors relative group">
              Collections
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#custom" className="text-sm font-medium hover:text-primary transition-colors relative group">
              Create Custom
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors relative group">
              Our Story
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </Button>
            <Button className="rounded-full bg-foreground text-background hover:bg-primary hover:text-white transition-colors shadow-lg">
              Shop Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Modern Layout */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-pink-100/40 rounded-full blur-[100px] -z-10 translate-x-1/4 -translate-y-1/4 animate-pulse duration-[5000ms]" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-purple-100/40 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4" />

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-8 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm text-sm font-medium animate-in slide-in-from-bottom-4 duration-700 fade-in">
                <Sparkles className="w-4 h-4 text-primary fill-primary" /> 
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent font-bold">New Collection Released</span>
              </div>
              
              <h1 className="font-serif text-6xl lg:text-8xl leading-[0.9] text-foreground tracking-tight animate-in slide-in-from-bottom-8 duration-700 delay-100 fade-in">
                Blooms that <br/>
                <span className="italic text-primary/90 relative inline-block">
                  last forever.
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed text-balance animate-in slide-in-from-bottom-8 duration-700 delay-200 fade-in">
                Experience the artistry of handcrafted fabric flowers. 
                Timeless elegance for your home, gifts, and special moments.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in slide-in-from-bottom-8 duration-700 delay-300 fade-in">
                <Button size="lg" className="rounded-full text-lg px-8 h-14 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-105">
                  Start Designing <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-lg px-8 h-14 border-2 bg-white/50 hover:bg-white transition-all group">
                  <Play className="w-4 h-4 mr-2 fill-current group-hover:text-primary" /> Watch Process
                </Button>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 opacity-60 animate-in fade-in delay-500 duration-1000">
                 <div>
                    <p className="font-bold text-2xl font-serif">5k+</p>
                    <p className="text-xs uppercase tracking-wider">Happy Clients</p>
                 </div>
                 <div className="w-px h-10 bg-border" />
                 <div>
                    <p className="font-bold text-2xl font-serif">100%</p>
                    <p className="text-xs uppercase tracking-wider">Handmade</p>
                 </div>
              </div>
            </div>
            
            {/* Right Content - 3D Flower */}
            <div className="lg:col-span-7 relative h-[600px] lg:h-[800px] w-full animate-in zoom-in duration-1000 fade-in delay-200">
               <SplineFlower />
               
               {/* Floating Badge */}
               <div className="absolute bottom-20 -left-10 bg-white p-4 rounded-2xl shadow-xl border border-pink-100 hidden lg:flex items-center gap-3 animate-bounce duration-[3000ms]">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary fill-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Best Seller</p>
                    <p className="text-xs text-muted-foreground">Peony Collection</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Marquee */}
      <div className="bg-primary/5 border-y border-primary/10 py-6 overflow-hidden whitespace-nowrap">
        <div className="inline-flex animate-marquee">
          {[...Array(10)].map((_, i) => (
             <span key={i} className="mx-8 font-serif text-2xl text-primary/40 italic flex items-center gap-4">
               Handmade with Love <Sparkles className="w-4 h-4" />
             </span>
          ))}
        </div>
      </div>

      {/* Products Grid - Modern Cards */}
      <section id="products" className="py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
               <h2 className="font-serif text-5xl text-foreground">Curated Collections</h2>
               <p className="text-muted-foreground max-w-md text-lg">
                 Our most loved handcrafted arrangements, ready to ship today.
               </p>
            </div>
            <Button variant="outline" className="rounded-full border-foreground/10 hover:bg-foreground hover:text-background transition-colors">
              View Full Catalog
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductCard 
              image={peonyImg}
              title="Blushing Peony"
              price="$45.00"
              description="Soft pink fabric peonies with delicate cream accents."
            />
            <ProductCard 
              image={roseImg}
              title="Velvet Rose"
              price="$18.00"
              description="A striking single stem deep red rose crafted from premium velvet."
            />
            <ProductCard 
              image={tulipImg}
              title="Spring Tulip"
              price="$32.00"
              description="Fresh and playful pastel tulips wrapped in eco-friendly kraft paper."
            />
          </div>
        </div>
      </section>

      {/* Custom Order Section - Split Layout */}
      <section id="custom" className="py-32 relative bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-foreground text-background rounded-[2.5rem] overflow-hidden shadow-2xl">
             <div className="grid lg:grid-cols-2">
                <div className="p-12 lg:p-20 flex flex-col justify-center space-y-8 relative overflow-hidden">
                   {/* Decorative circle */}
                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                   
                   <h2 className="font-serif text-5xl lg:text-6xl leading-tight relative z-10 text-white">
                     Design Your <br/>
                     <span className="text-primary italic">Dream Bouquet.</span>
                   </h2>
                   <p className="text-lg text-white/70 leading-relaxed max-w-md relative z-10">
                     Every detail matters. Customize your arrangement from petal color to wrapping style. 
                     Our artisans will bring your vision to life.
                   </p>
                   
                   <div className="grid grid-cols-2 gap-6 pt-8 relative z-10">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                          <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <h4 className="font-bold text-white">Unique</h4>
                        <p className="text-sm text-white/50">One of a kind pieces</p>
                      </div>
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                          <Heart className="w-5 h-5 text-primary" />
                        </div>
                        <h4 className="font-bold text-white">Sustainable</h4>
                        <p className="text-sm text-white/50">Zero-waste materials</p>
                      </div>
                   </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm p-8 lg:p-12 flex items-center justify-center border-l border-white/5">
                   <div className="w-full max-w-md transform lg:scale-110 transition-transform">
                      <CustomOrderForm />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer - Modern Minimalist */}
      <footer className="bg-white pt-24 pb-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="col-span-12 md:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <img src={logoImg} alt="Logo" className="w-10 h-10" />
                <span className="font-serif text-3xl tracking-tight">Fabric Blooms</span>
              </div>
              <p className="text-muted-foreground text-lg max-w-sm leading-relaxed">
                Elevating spaces with everlasting botanical art. 
                Sustainably crafted, ethically made, and designed to inspire.
              </p>
            </div>
            
            <div className="col-span-6 md:col-span-2 md:col-start-7">
              <h4 className="font-bold mb-6 text-lg">Shop</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Custom Orders</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Gift Cards</a></li>
              </ul>
            </div>
            
            <div className="col-span-6 md:col-span-2">
              <h4 className="font-bold mb-6 text-lg">Company</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Artisans</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div className="col-span-12 md:col-span-2">
               <h4 className="font-bold mb-6 text-lg">Follow Us</h4>
               <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <Heart className="w-5 h-5" />
                  </a>
               </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 Fabric Blooms. All rights reserved.</p>
            <div className="flex gap-8">
               <a href="#" className="hover:text-foreground">Privacy Policy</a>
               <a href="#" className="hover:text-foreground">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
