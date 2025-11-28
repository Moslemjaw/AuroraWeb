import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import logoImg from "@assets/WhatsApp Image 2025-11-28 at 10.40.17 PM-modified_1764359891804.png";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <nav className="sticky top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between bg-white border-b border-border/40">
         <div className="flex items-center gap-3">
           <Link href="/">
             <a className="flex items-center gap-3">
               <img src={logoImg} alt="Logo" className="w-10 h-10 object-contain" />
               <span className="font-serif text-xl font-medium tracking-tight text-foreground">Fabric & Blooms</span>
             </a>
           </Link>
         </div>
         <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8 text-xs font-bold tracking-widest uppercase text-muted-foreground/80">
              <Link href="/"><a className="hover:text-primary transition-colors">Shop</a></Link>
              <Link href="/about"><a className="hover:text-primary transition-colors">About Us</a></Link>
              <Link href="/contact"><a className="text-primary transition-colors">Contact</a></Link>
            </div>
         </div>
      </nav>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-20">
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <span className="text-primary font-bold tracking-widest uppercase text-xs">Get in Touch</span>
            <h1 className="font-serif text-5xl text-foreground leading-tight">We'd love to hear from you.</h1>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Whether you have a question about a custom order, shipping, or just want to say hello, we're here to help.
            </p>
            
            <div className="space-y-6 pt-8">
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <span>hello@fabricblooms.com</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+965 1234 5678</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>Kuwait City, Kuwait</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-xl shadow-black/5 border border-border/50">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Name</label>
                  <input type="text" className="w-full border-b border-border py-2 focus:outline-none focus:border-primary bg-transparent" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                  <input type="email" className="w-full border-b border-border py-2 focus:outline-none focus:border-primary bg-transparent" placeholder="jane@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Subject</label>
                <input type="text" className="w-full border-b border-border py-2 focus:outline-none focus:border-primary bg-transparent" placeholder="Custom Order Inquiry" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea className="w-full border-b border-border py-2 focus:outline-none focus:border-primary bg-transparent min-h-[100px]" placeholder="Tell us about your dream bouquet..." />
              </div>
              <Button className="w-full h-12 bg-foreground text-background hover:bg-primary hover:text-white rounded-none uppercase tracking-widest text-xs font-bold transition-colors mt-4">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
