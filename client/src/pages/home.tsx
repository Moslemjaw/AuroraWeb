import ProductCard from "@/components/product-card";
import CustomOrderForm from "@/components/custom-order-form";
import MobileNav from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Instagram,
  ShoppingBag,
  Star,
  Check,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { Link } from "wouter";
import { config } from "@/lib/config";

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

type ProductType = {
  productId: string;
  title: string;
  price: string;
  description: string;
  imageUrl: string;
};

function ProductCarousel({
  products,
  itemsPerPage = 3,
}: {
  products: ProductType[];
  itemsPerPage?: number;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No products available
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
        {visibleProducts.map((product) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            onClick={goToPrev}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
            data-testid="carousel-prev"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  currentPage === index
                    ? "bg-primary text-white"
                    : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
                data-testid={`carousel-page-${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={goToNext}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
            data-testid="carousel-next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { products } = useAdmin();
  const [, setLocation] = useLocation();
  const [logoClicks, setLogoClicks] = useState(0);

  const handleLogoClick = (e: React.MouseEvent) => {
    const newClicks = logoClicks + 1;
    setLogoClicks(newClicks);

    if (newClicks >= 5) {
      setLocation("/admin/login");
      setLogoClicks(0);
    }

    setTimeout(() => {
      setLogoClicks(0);
    }, 2000);
  };

  const curatedProducts = products.filter((p) => p.isCurated);
  const bestSellerProducts = products.filter((p) => p.isBestSeller);
  const fallbackProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/10">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-white border-b border-border shadow-sm">
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer"
          onClick={handleLogoClick}
        >
          <img
            src={logoImg}
            alt="Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
          <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-foreground">
            Aurora Flowers
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8 text-xs font-bold tracking-widest uppercase text-foreground/80 items-center">
            <Link href="/" className="hover:text-primary transition-colors">
              Shop
            </Link>
            <Link
              href="/about"
              className="hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="w-px h-4 bg-border mx-2" />

          <Link href="/cart">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-secondary px-0 gap-2 text-xs font-bold tracking-widest uppercase text-foreground/80 hover:text-primary"
            >
              Cart
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                <div className="absolute -top-2 -right-2 bg-primary text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                  0
                </div>
              </div>
            </Button>
          </Link>
        </div>

        <MobileNav isLight={false} />
      </nav>

      {/* Hero Image - Mobile */}
      <div className="w-full lg:hidden relative">
        <img
          src={luxuryBouquetImg}
          alt="Luxury Fabric Bouquet"
          className="w-full h-auto object-cover"
        />
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/80 via-white/40 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/80 via-white/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* Hero Section */}
      <header className="relative w-full flex flex-col lg:flex-row lg:min-h-[calc(100vh-80px)] -mt-24 lg:mt-0 z-10">
        {/* Left Panel */}
        <div className="w-full lg:w-[45%] bg-transparent lg:bg-white flex flex-col justify-center items-start px-6 py-4 sm:p-8 md:p-16 lg:p-24 z-10 lg:pt-24">
          <span className="text-primary font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-4 sm:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            EST. 2024
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] text-foreground tracking-tight mb-4 sm:mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            Timeless <br />
            <span className="italic font-light text-foreground/80">
              Botanicals.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed max-w-md mb-8 sm:mb-12 font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Handcrafted fabric flowers that capture the fleeting beauty of
            nature in a permanent form. Sustainable luxury for your home.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300 w-full sm:w-auto mt-2 mb-8 sm:mb-0">
            <Button
              variant="outline"
              className="rounded-none border border-foreground/80 bg-transparent text-foreground hover:bg-primary hover:text-white hover:border-primary px-8 sm:px-12 h-12 sm:h-14 text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold transition-all w-full sm:w-auto"
              onClick={() => {
                const element = document.getElementById("products");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              View Collections
            </Button>
            <a
              href="#custom"
              className="text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold text-muted-foreground/80 hover:text-foreground transition-colors text-center sm:text-left w-full sm:w-auto py-3"
            >
              Custom Orders
            </a>
          </div>
        </div>

        {/* Right Panel - Desktop */}
        <div className="hidden lg:block w-[55%] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none" />
          <img
            src={luxuryBouquetImg}
            alt="Luxury Fabric Bouquet"
            className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-[2000ms]"
          />
        </div>
      </header>

      {/* Divider */}
      <div className="w-full flex justify-center py-4 bg-white relative z-20">
        <div className="w-3/4 max-w-4xl h-px bg-border/60"></div>
      </div>

      {/* Curated Collections Section */}
      <section
        id="products"
        className="pt-8 sm:pt-16 pb-16 sm:pb-32 bg-white relative z-20"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="text-center mb-10 sm:mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground uppercase mb-2 sm:mb-3">
              Shop The Look
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">
              Curated Collections
            </h2>
          </div>

          <ProductCarousel
            products={
              curatedProducts.length > 0 ? curatedProducts : fallbackProducts
            }
            itemsPerPage={3}
          />
        </div>
      </section>

      {/* Divider */}
      <div className="w-full flex justify-center py-4 bg-white">
        <div className="w-3/4 max-w-4xl h-px bg-border/60"></div>
      </div>

      {/* Custom Order Section */}
      <section id="custom" className="py-12 sm:py-16 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20 items-center">
            <div className="space-y-6 sm:space-y-10">
              <div className="space-y-4 sm:space-y-6">
                <span className="text-primary font-bold tracking-widest uppercase text-[10px] sm:text-xs">
                  Bespoke Service
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
                  Design Your Own <br className="hidden sm:block" />
                  Masterpiece.
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed font-light">
                  Our Custom Studio allows you to commission a unique
                  arrangement. Select your preferences, and our artisans will
                  craft a piece specifically for your space.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-8 font-serif text-lg sm:text-xl text-foreground/80">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-primary text-xl sm:text-2xl">01.</span>{" "}
                  Select Quantity
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-primary text-xl sm:text-2xl">02.</span>{" "}
                  Choose Palette
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-primary text-xl sm:text-2xl">03.</span>{" "}
                  We Create
                </div>
              </div>
            </div>

            <div className="w-full bg-white p-6 sm:p-8 md:p-12 shadow-xl shadow-black/5">
              <CustomOrderForm />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full flex justify-center py-4 bg-white">
        <div className="w-3/4 max-w-4xl h-px bg-border/60"></div>
      </div>

      {/* Best Sellers Section */}
      <section id="bestsellers" className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-16 gap-4 sm:gap-6">
            <div className="space-y-2 sm:space-y-4">
              <span className="text-primary font-bold tracking-widest uppercase text-[10px] sm:text-xs">
                Client Favorites
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">
                Best Sellers
              </h2>
            </div>
            <Button
              variant="outline"
              className="rounded-none border-b-2 border-transparent border-b-primary hover:border-b-primary hover:bg-transparent px-0 h-auto text-foreground font-medium uppercase tracking-widest text-[10px] sm:text-xs"
            >
              View All Favorites
            </Button>
          </div>

          <ProductCarousel
            products={
              bestSellerProducts.length > 0
                ? bestSellerProducts
                : fallbackProducts.slice(3)
            }
            itemsPerPage={3}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 sm:py-16 md:py-24 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 text-center">
          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-6 sm:mb-10">
            <span className="font-serif text-2xl sm:text-3xl tracking-tight">
              Aurora <span className="text-primary">Flowers</span>
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12 mb-8 sm:mb-12 text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">
              Shop
            </Link>
            <Link
              href="/about"
              className="hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
            <a
              href={config.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
              data-testid="link-instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={config.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
              data-testid="link-tiktok"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
            <a
              href={config.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
              data-testid="link-whatsapp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>

          <p className="text-[10px] sm:text-xs text-muted-foreground/60 uppercase tracking-widest mb-2">
            © 2025 Aurora Flowers. All rights reserved.
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground/60">
            Developed By{" "}
            <a
              href="https://www.instagram.com/nova.luminar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline"
            >
              Nova
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
