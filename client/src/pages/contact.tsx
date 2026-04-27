import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import MobileNav from "@/components/mobile-nav";
import LanguageToggle from "@/components/language-toggle";
import logoImg from "@assets/WhatsApp Image 2025-11-28 at 10.40.17 PM-modified_1764359891804.png";
import {
  Mail,
  MapPin,
  Phone,
  Loader2,
  CheckCircle,
  ShoppingBag,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { config } from "@/lib/config";
import { useT } from "@/lib/i18n";

export default function Contact() {
  const { toast } = useToast();
  const { getText, t, lang } = useT();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast({
        title: getText(t.contact.fillAllFields),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        toast({
          title: getText(t.contact.msgSentTitle),
          description: getText(t.contact.msgSentDesc),
        });
      } else {
        const data = await response.json();
        toast({
          title: getText(t.contact.failedToSend),
          description: data.error || getText(t.contact.tryAgain),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: getText(t.contact.failedToSend),
        description: getText(t.contact.tryAgainLater),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Link
              href="/about"
              className="hover:text-primary transition-colors"
            >
              {getText(t.nav.aboutUs)}
            </Link>
            <Link href="/contact" className="text-primary transition-colors">
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
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <span className="text-primary font-bold tracking-widest uppercase text-xs">
              {getText(t.contact.getInTouch)}
            </span>
            <h1 className="font-serif text-5xl text-foreground leading-tight">
              {getText(t.contact.heroTitle)}
            </h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              {getText(t.contact.heroDescription)}
            </p>

            <div className="space-y-6 pt-8">
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <span>{config.contact.email}</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <span>{config.contact.phone}</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>{getText(t.contact.locationLabel)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-xl shadow-black/5 border border-border/50">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h3 className="font-serif text-2xl text-foreground">
                  {getText(t.contact.thankYou)}
                </h3>
                <p className="text-muted-foreground text-center">
                  {getText(t.contact.messageSent)}
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="mt-4"
                  data-testid="button-send-another"
                >
                  {getText(t.contact.sendAnother)}
                </Button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {getText(t.contact.name)}
                    </label>
                    <input
                      type="text"
                      className="w-full border-b border-border py-2 focus:outline-none focus:border-primary bg-transparent"
                      placeholder={getText(t.contact.namePlaceholder)}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      data-testid="input-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {getText(t.contact.email)}
                    </label>
                    <input
                      type="email"
                      className="w-full border-b border-border py-2 focus:outline-none focus:border-primary bg-transparent"
                      placeholder={getText(t.contact.emailPlaceholder)}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      data-testid="input-email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {getText(t.contact.subject)}
                  </label>
                  <input
                    type="text"
                    className="w-full border-b border-border py-2 focus:outline-none focus:border-primary bg-transparent"
                    placeholder={getText(t.contact.subjectPlaceholder)}
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    data-testid="input-subject"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {getText(t.contact.message)}
                  </label>
                  <textarea
                    className="w-full border-b border-border py-2 focus:outline-none focus:border-primary bg-transparent min-h-[100px]"
                    placeholder={getText(t.contact.messagePlaceholder)}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    data-testid="input-message"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-foreground text-background hover:bg-primary hover:text-white rounded-none uppercase tracking-widest text-xs font-bold transition-colors mt-4"
                  data-testid="button-submit"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {getText(t.contact.sending)}
                    </>
                  ) : (
                    getText(t.contact.sendMessage)
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
