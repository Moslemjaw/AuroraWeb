import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  isLight?: boolean;
}

export default function MobileNav({ isLight = false }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className={`md:hidden ${isLight ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-secondary'}`}
        onClick={() => setIsOpen(true)}
        data-testid="button-mobile-menu"
      >
        <Menu className="w-6 h-6" />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[100] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out menu */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[101] transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <span className="font-serif text-xl">Menu</span>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(false)}
              data-testid="button-close-menu"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <nav className="flex-1 p-6">
            <div className="space-y-6">
              <Link href="/">
                <a 
                  className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                  data-testid="link-mobile-shop"
                >
                  Shop
                </a>
              </Link>
              <Link href="/about">
                <a 
                  className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                  data-testid="link-mobile-about"
                >
                  About Us
                </a>
              </Link>
              <Link href="/contact">
                <a 
                  className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                  data-testid="link-mobile-contact"
                >
                  Contact
                </a>
              </Link>
            </div>
          </nav>

          <div className="p-6 border-t border-border">
            <Link href="/cart">
              <a 
                className="flex items-center justify-center gap-3 w-full h-12 bg-primary text-white rounded-none font-medium uppercase tracking-wider text-sm"
                onClick={() => setIsOpen(false)}
                data-testid="link-mobile-cart"
              >
                <ShoppingBag className="w-5 h-5" />
                View Cart
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
