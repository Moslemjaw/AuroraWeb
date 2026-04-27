import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageToggle from "@/components/language-toggle";
import { useT } from "@/lib/i18n";

interface MobileNavProps {
  isLight?: boolean;
}

export default function MobileNav({ isLight = false }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { getText, t } = useT();

  return (
    <>
      <div className="flex items-center gap-2 md:hidden">
        <LanguageToggle />
        <Button 
          variant="ghost" 
          size="icon" 
          className={isLight ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-secondary'}
          onClick={() => setIsOpen(true)}
          data-testid="button-mobile-menu"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </div>

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
            <span className="font-serif text-xl">{getText(t.nav.menu)}</span>
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
              <Link 
                href="/"
                className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
                data-testid="link-mobile-shop"
              >
                {getText(t.nav.shop)}
              </Link>
              <Link 
                href="/about"
                className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
                data-testid="link-mobile-about"
              >
                {getText(t.nav.aboutUs)}
              </Link>
              <Link 
                href="/contact"
                className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
                data-testid="link-mobile-contact"
              >
                {getText(t.nav.contact)}
              </Link>

              <div className="pt-4 border-t border-border">
                <LanguageToggle />
              </div>
            </div>
          </nav>

          <div className="p-6 border-t border-border">
            <Link 
              href="/cart"
              className="flex items-center justify-center gap-3 w-full h-12 bg-primary text-white rounded-none font-medium uppercase tracking-wider text-sm"
              onClick={() => setIsOpen(false)}
              data-testid="link-mobile-cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {getText(t.nav.viewCart)}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
