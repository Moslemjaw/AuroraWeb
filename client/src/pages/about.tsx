import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import MobileNav from "@/components/mobile-nav";
import LanguageToggle from "@/components/language-toggle";
import { ShoppingBag } from "lucide-react";
import logoImg from "@assets/WhatsApp Image 2025-11-28 at 10.40.17 PM-modified_1764359891804.png";
import artisanImg from "@assets/image_1764360953696.png";
import { useT } from "@/lib/i18n";

export default function About() {
  const { getText, t, lang } = useT();

  return (
    <div className="min-h-screen bg-background font-sans">
      <nav className="sticky top-0 left-0 w-full z-50 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-white border-b border-border shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <img
              src={logoImg}
              alt="Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-foreground">
              {getText(t.nav.brand)}
            </span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8 text-xs font-bold tracking-widest uppercase text-foreground/80 items-center">
            <Link href="/" className="hover:text-primary transition-colors">
              {getText(t.nav.shop)}
            </Link>
            <Link href="/about" className="text-primary transition-colors">
              {getText(t.nav.aboutUs)}
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              {getText(t.nav.contact)}
            </Link>
          </div>

          <div className="w-px h-4 bg-border mx-2" />
          <LanguageToggle />
          <div className="w-px h-4 bg-border mx-2" />

          <Link href="/cart">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-secondary px-0 gap-2 text-xs font-bold tracking-widest uppercase text-foreground/80 hover:text-primary"
            >
              {getText(t.nav.cart)}
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

      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-6">
          <span className="text-primary font-bold tracking-widest uppercase text-xs">
            {getText(t.about.ourStory)}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-foreground leading-tight">
            {getText(t.about.heroTitle)}{" "}
            <span className="italic text-primary">{getText(t.about.heroAccent)}</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative aspect-[4/5] bg-secondary/20 overflow-hidden">
            <img
              src={artisanImg}
              alt="Artisan working"
              className="object-cover w-full h-full scale-105"
            />
          </div>
          <div className="space-y-8">
            <h2 className="font-serif text-3xl text-foreground">
              {getText(t.about.artTitle)}
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              {getText(t.about.artParagraph1)}
            </p>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              {getText(t.about.artParagraph2)}
            </p>
            <div className="pt-4">
              <img
                src={logoImg}
                alt="Signature"
                className="w-16 h-16 opacity-50"
              />
            </div>
          </div>
        </div>

        <div className="bg-secondary/10 p-12 md:p-20 text-center space-y-8">
          <h2 className="font-serif text-3xl text-foreground">{getText(t.about.ourValues)}</h2>
          <div className="grid md:grid-cols-3 gap-12 pt-8">
            <div className="space-y-4">
              <div className="w-12 h-1 bg-primary mx-auto mb-4" />
              <h3 className="font-serif text-xl">{getText(t.about.sustainability)}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {getText(t.about.sustainabilityDesc)}
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-1 bg-primary mx-auto mb-4" />
              <h3 className="font-serif text-xl">{getText(t.about.craftsmanship)}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {getText(t.about.craftsmanshipDesc)}
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-1 bg-primary mx-auto mb-4" />
              <h3 className="font-serif text-xl">{getText(t.about.timelessness)}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {getText(t.about.timelessnessDesc)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
