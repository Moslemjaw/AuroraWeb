import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import logoImg from "@assets/WhatsApp Image 2025-11-28 at 10.40.17 PM-modified_1764359891804.png";
import { Mail, MapPin, Phone, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { config } from "@/lib/config";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include"
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        toast({
          title: "Message sent!",
          description: "We'll get back to you soon."
        });
      } else {
        const data = await response.json();
        toast({
          title: "Failed to send message",
          description: data.error || "Please try again",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <nav className="sticky top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between bg-white border-b border-border/40">
         <div className="flex items-center gap-3">
           <Link href="/" className="flex items-center gap-3">
             <img src={logoImg} alt="Logo" className="w-10 h-10 object-contain" />
             <span className="font-serif text-xl font-medium tracking-tight text-foreground">Aurora Flowers</span>
           </Link>
         </div>
         <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8 text-xs font-bold tracking-widest uppercase text-muted-foreground/80">
              <Link href="/" className="hover:text-primary transition-colors">Shop</Link>
              <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
              <Link href="/contact" className="text-primary transition-colors">Contact</Link>
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
                <span>Kuwait City, Kuwait</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-xl shadow-black/5 border border-border/50">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h3 className="font-serif text-2xl text-foreground">Thank you!</h3>
                <p className="text-muted-foreground text-center">Your message has been sent. We'll get back to you soon.</p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="mt-4"
                  data-testid="button-send-another"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Name</label>
                    <input 
                      type="text" 
                      className="w-full border-b border-border py-2 focus:outline-none focus:border-primary bg-transparent" 
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      data-testid="input-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                    <input 
                      type="email" 
                      className="w-full border-b border-border py-2 focus:outline-none focus:border-primary bg-transparent" 
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      data-testid="input-email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Subject</label>
                  <input 
                    type="text" 
                    className="w-full border-b border-border py-2 focus:outline-none focus:border-primary bg-transparent" 
                    placeholder="Custom Order Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    data-testid="input-subject"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                  <textarea 
                    className="w-full border-b border-border py-2 focus:outline-none focus:border-primary bg-transparent min-h-[100px]" 
                    placeholder="Tell us about your dream bouquet..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
                      Sending...
                    </>
                  ) : (
                    "Send Message"
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
