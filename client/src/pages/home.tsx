import SplineFlower from "@/components/3d-flower";
import ProductCard from "@/components/product-card";
import CustomOrderForm from "@/components/custom-order-form";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, ShoppingBag, Star, Check } from "lucide-react";

// Assets imports
import peonyImg from "@assets/generated_images/handmade_fabric_peony_bouquet.png";
import roseImg from "@assets/generated_images/fabric_rose_close_up.png";
import tulipImg from "@assets/generated_images/pastel_fabric_tulips.png";
import logoImg from "@assets/image_1764356989830.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/10">
      
      {/* Minimalist Sticky Nav */}
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto container-padding h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
               {/* Using a colored version of the logo or just the icon if simpler */}
               <img src={logoImg} alt="Logo" className="w-5 h-5 object-contain" />
            </div>
            <span className="font-serif text-xl font-medium tracking-tight text-foreground">Fabric Blooms</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#products" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Collections</a>
            <a href="#custom" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Custom Studio</a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Our Story</a>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:block text-sm font-medium text-primary cursor-pointer hover:underline underline-offset-4">Sign In</span>
            <Button size="sm" className="rounded-full px-6 bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20">
              Cart (0)
            </Button>
          </div>
        </div>
      </nav>

      {/* Clean Hero Section */}
      <section className="pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Text Content - More breathing room */}
            <div className="flex-1 space-y-8 text-center lg:text-left max-w-2xl">
              <div className="inline-block">
                <span className="px-3 py-1 rounded-full bg-secondary text-primary text-xs font-bold tracking-wider uppercase mb-4 inline-block">
                  Handcrafted Excellence
                </span>
              </div>
              
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] text-foreground tracking-tight">
                Artistry in <br/>
                <span className="text-primary">Every Petal.</span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                We create bespoke fabric flowers that capture nature's beauty in a form that lasts forever. 
                Sustainable, elegant, and uniquely yours.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Button size="lg" className="h-14 px-8 rounded-full text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5">
                  Explore Collection
                </Button>
                <Button size="lg" variant="ghost" className="h-14 px-8 rounded-full text-base hover:bg-secondary text-foreground">
                  Custom Request <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" /> <span>Lifetime Durability</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" /> <span>Eco-Friendly Materials</span>
                </div>
              </div>
            </div>
            
            {/* 3D Visual - Clean and Uncluttered */}
            <div className="flex-1 w-full h-[500px] lg:h-[600px] relative">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-[3rem] -z-10 transform rotate-3" />
               <div className="absolute inset-0 border border-primary/10 rounded-[3rem] -z-10 transform -rotate-3" />
               <SplineFlower />
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Products Grid */}
      <section id="products" className="py-24 bg-secondary/30 border-y border-border/40">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
               <h2 className="font-serif text-4xl text-foreground mb-4">Featured Works</h2>
               <p className="text-muted-foreground text-lg">Timeless pieces for the modern home.</p>
            </div>
            <a href="#" className="text-primary font-medium hover:underline underline-offset-4 flex items-center gap-1">
              View All Products <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
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

      {/* Professional Custom Order Section */}
      <section id="custom" className="py-24 bg-white">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            
            <div className="space-y-10 sticky top-24">
              <div className="space-y-6">
                <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                  Design Your Own <br/>
                  <span className="text-primary">Masterpiece.</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our Custom Studio allows you to commission a unique arrangement. 
                  Select your preferences, and our artisans will craft a piece specifically for your space.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0 text-primary font-bold font-serif">1</div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Select Quantity</h4>
                    <p className="text-sm text-muted-foreground">Choose the perfect size for your vase or bouquet.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0 text-primary font-bold font-serif">2</div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Choose Palette</h4>
                    <p className="text-sm text-muted-foreground">From soft pastels to vibrant statement colors.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0 text-primary font-bold font-serif">3</div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">We Create</h4>
                    <p className="text-sm text-muted-foreground">Expertly crafted and shipped within 3-5 business days.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="bg-white rounded-2xl shadow-2xl shadow-primary/5 border border-border/50 p-1">
                <CustomOrderForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-foreground text-white py-20">
        <div className="container mx-auto container-padding">
          <div className="grid md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-12">
            <div className="col-span-2 md:pr-12">
              <div className="flex items-center gap-3 mb-6">
                <img src={logoImg} alt="Logo" className="w-8 h-8 brightness-0 invert opacity-80" />
                <span className="font-serif text-2xl">Fabric Blooms</span>
              </div>
              <p className="text-white/60 leading-relaxed">
                We are dedicated to the art of fabric floristry. 
                Combining traditional techniques with modern design to create sustainable beauty.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white">Customer Care</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Care Instructions</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-white">Connect</h4>
              <div className="flex gap-4 mb-6">
                 <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"><Instagram className="w-4 h-4"/></a>
                 <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"><Star className="w-4 h-4"/></a>
              </div>
              <p className="text-sm text-white/60">hello@fabricblooms.com</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
            <p>© 2025 Fabric Blooms Studio. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
