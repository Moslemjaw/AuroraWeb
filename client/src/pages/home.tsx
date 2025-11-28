import SplineFlower from "@/components/3d-flower";
import ProductCard from "@/components/product-card";
import CustomOrderForm from "@/components/custom-order-form";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, ShoppingBag, Heart } from "lucide-react";

// Assets imports
import peonyImg from "@assets/generated_images/handmade_fabric_peony_bouquet.png";
import roseImg from "@assets/generated_images/fabric_rose_close_up.png";
import tulipImg from "@assets/generated_images/pastel_fabric_tulips.png";
import logoImg from "@assets/image_1764356989830.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Fabric Blooms Logo" className="w-10 h-10 object-contain" />
            <span className="font-serif text-2xl font-medium tracking-tight text-foreground">Fabric Blooms</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-sm font-medium hover:text-primary transition-colors">Collections</a>
            <a href="#custom" className="text-sm font-medium hover:text-primary transition-colors">Custom Order</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">Our Story</a>
          </div>
          <Button variant="outline" size="icon" className="rounded-full border-2">
            <ShoppingBag className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left animate-in slide-in-from-left duration-1000 fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100/50 text-pink-800 text-sm font-medium border border-pink-200/50">
                <Heart className="w-4 h-4 fill-current" /> Handcrafted with Love
              </div>
              <h1 className="font-serif text-5xl lg:text-7xl leading-[1.1] text-foreground">
                Everlasting beauty, <span className="text-primary italic">crafted by hand.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Unique fabric flowers that never fade. Each petal is hand-shaped to create timeless bouquets for your home or special gifts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="rounded-full text-lg px-8 h-14 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-pink-300/50 transition-all">
                  Shop Collection
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-lg px-8 h-14 border-2 hover:bg-secondary/50">
                  Custom Request
                </Button>
              </div>
            </div>
            
            {/* 3D Element */}
            <div className="relative animate-in zoom-in duration-1000 fade-in delay-200">
              <div className="absolute -inset-4 bg-gradient-to-tr from-pink-200/30 to-purple-200/30 rounded-full blur-3xl -z-10" />
              <SplineFlower />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-24 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">Signature Collections</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most loved handcrafted arrangements, ready to bring joy to your space.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductCard 
              image={peonyImg}
              title="Blushing Peony Bouquet"
              price="$45.00"
              description="A romantic arrangement of soft pink fabric peonies with delicate cream accents."
            />
            <ProductCard 
              image={roseImg}
              title="Velvet Rose Single"
              price="$18.00"
              description="A striking single stem deep red rose crafted from premium velvet fabric."
            />
            <ProductCard 
              image={tulipImg}
              title="Spring Tulip Bundle"
              price="$32.00"
              description="Fresh and playful pastel tulips wrapped in eco-friendly kraft paper."
            />
          </div>
          
          <div className="mt-16 text-center">
            <Button variant="link" className="text-lg font-serif italic hover:text-primary gap-2">
              View all collections <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Custom Order Section */}
      <section id="custom" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50/50 to-white -z-20" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <CustomOrderForm />
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                Your Imagination, <br/>
                <span className="text-primary">Our Craft.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Can't find exactly what you're looking for? We love creating custom orders! 
                Choose your flower count, color palette, and wrapping style, and we'll bring your vision to life.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-pink-100">
                  <h4 className="font-serif text-xl mb-2 text-foreground">Handmade</h4>
                  <p className="text-sm text-muted-foreground">Every petal is cut and shaped by hand.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-pink-100">
                  <h4 className="font-serif text-xl mb-2 text-foreground">Sustainable</h4>
                  <p className="text-sm text-muted-foreground">Made with high-quality upcycled fabrics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <img src={logoImg} alt="Logo" className="w-8 h-8 brightness-0 invert" />
                <span className="font-serif text-2xl">Fabric Blooms</span>
              </div>
              <p className="text-white/60 max-w-sm">
                Creating everlasting memories with handcrafted fabric flowers. 
                Based in the heart of the city.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Shop</h4>
              <ul className="space-y-4 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">All Flowers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custom Orders</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Workshops</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Connect</h4>
              <ul className="space-y-4 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Instagram className="w-4 h-4"/> Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pinterest</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Email Us</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
            © 2024 Fabric Blooms. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
