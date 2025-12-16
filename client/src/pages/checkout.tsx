import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useLocation } from "wouter";
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  MessageCircle,
  Check,
} from "lucide-react";
import MobileNav from "@/components/mobile-nav";
import logoImg from "@assets/WhatsApp Image 2025-11-28 at 10.40.17 PM-modified_1764359891804.png";
import customOrderIcon from "@assets/custom-order-icon.png";
import { useToast } from "@/hooks/use-toast";

export default function Checkout() {
  const { items, getTotalFormatted, getTotal, clearCart } = useCart();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    city: "",
    notes: "",
    isGift: false,
    giftRecipientName: "",
    giftMessage: "",
    paymentMethod: "cod",
  });

  const SHIPPING_FEE = 2; // 2.00 K.D. flat rate
  const formatCurrency = (amount: number) => `${amount.toFixed(2)} K.D.`;
  const subtotal = getTotal();
  const totalWithShipping = subtotal + (items.length > 0 ? SHIPPING_FEE : 0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        total: formatCurrency(totalWithShipping),
        items: items.length,
        status: "Pending",
        orderData: {
          items: items,
          address: formData.address,
          city: formData.city,
          notes: formData.notes,
          isGift: formData.isGift,
          giftRecipientName: formData.giftRecipientName,
          giftMessage: formData.giftMessage,
          paymentMethod: formData.paymentMethod,
        },
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to create order");

      const order = await response.json();
      setOrderId(order.orderId);
      setOrderComplete(true);
      clearCart();

      toast({
        title: "Order placed successfully!",
        description: `Your order ${order.orderId} has been received.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <nav className="sticky top-0 left-0 w-full z-50 px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between bg-white border-b border-border/40">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <img
                src={logoImg}
                alt="Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
              <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-foreground">
                Aurora Flowers
              </span>
            </Link>
          </div>
          <MobileNav />
        </nav>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
              Thank You!
            </h1>
            <p className="text-muted-foreground mb-2">
              Your order has been placed successfully.
            </p>
            <p className="text-lg font-medium text-primary mb-8">
              Order ID: {orderId}
            </p>

            {formData.paymentMethod === "whatsapp" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
                <p className="text-green-800 text-sm">
                  Our customer service team will contact you via WhatsApp to
                  complete the payment.
                </p>
              </div>
            )}

            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white rounded-none uppercase tracking-widest text-xs font-bold"
            >
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <nav className="sticky top-0 left-0 w-full z-50 px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between bg-white border-b border-border/40">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <img
                src={logoImg}
                alt="Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
              <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-foreground">
                Aurora Flowers
              </span>
            </Link>
          </div>
          <MobileNav />
        </nav>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-20">
          <div className="max-w-lg mx-auto text-center">
            <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Add some beautiful flowers to your cart first.
            </p>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white rounded-none uppercase tracking-widest text-xs font-bold"
            >
              <Link href="/">Browse Products</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <nav className="sticky top-0 left-0 w-full z-50 px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between bg-white border-b border-border/40">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <img
              src={logoImg}
              alt="Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-foreground">
              Aurora Flowers
            </span>
          </Link>
        </div>
        <MobileNav />
      </nav>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-6 sm:py-12">
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cart
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">
            Checkout
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-6 sm:p-8 border border-border/40 rounded-sm">
                <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-6">
                  Customer Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label
                      htmlFor="customerName"
                      className="text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 rounded-none border-border"
                      data-testid="input-customer-name"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="customerEmail"
                      className="text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      Email
                    </Label>
                    <Input
                      id="customerEmail"
                      name="customerEmail"
                      type="email"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      className="mt-1 rounded-none border-border"
                      data-testid="input-customer-email"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="customerPhone"
                      className="text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      Phone *
                    </Label>
                    <Input
                      id="customerPhone"
                      name="customerPhone"
                      type="tel"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      required
                      className="mt-1 rounded-none border-border"
                      data-testid="input-customer-phone"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 border border-border/40 rounded-sm">
                <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-6">
                  Delivery Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="address"
                      className="text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      Street Address *
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={2}
                      className="mt-1 rounded-none border-border resize-none"
                      data-testid="input-address"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="city"
                      className="text-xs uppercase tracking-wider text-muted-foreground"
                    >
                      City / Area *
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="mt-1 rounded-none border-border"
                      data-testid="input-city"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 border border-border/40 rounded-sm">
                <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-6">
                  Gift Options
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="isGift"
                      checked={formData.isGift}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, isGift: !!checked }))
                      }
                      data-testid="checkbox-is-gift"
                    />
                    <Label htmlFor="isGift" className="text-sm cursor-pointer">
                      This order is a gift (deliver to someone else)
                    </Label>
                  </div>

                  {formData.isGift && (
                    <div className="pl-6 space-y-4 border-l-2 border-primary/20">
                      <div>
                        <Label
                          htmlFor="giftRecipientName"
                          className="text-xs uppercase tracking-wider text-muted-foreground"
                        >
                          Recipient Name
                        </Label>
                        <Input
                          id="giftRecipientName"
                          name="giftRecipientName"
                          value={formData.giftRecipientName}
                          onChange={handleInputChange}
                          className="mt-1 rounded-none border-border"
                          data-testid="input-gift-recipient"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="giftMessage"
                          className="text-xs uppercase tracking-wider text-muted-foreground"
                        >
                          Gift Message
                        </Label>
                        <Textarea
                          id="giftMessage"
                          name="giftMessage"
                          value={formData.giftMessage}
                          onChange={handleInputChange}
                          rows={3}
                          className="mt-1 rounded-none border-border resize-none"
                          placeholder="Write a personal message for the recipient..."
                          data-testid="input-gift-message"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 border border-border/40 rounded-sm">
                <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-6">
                  Payment Method
                </h2>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, paymentMethod: value }))
                  }
                  className="space-y-4"
                >
                  <div className="flex items-start space-x-3 p-4 border border-border rounded-sm hover:border-primary/50 transition-colors cursor-pointer">
                    <RadioGroupItem
                      value="cod"
                      id="cod"
                      className="mt-0.5"
                      data-testid="radio-cod"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="cod"
                        className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                      >
                        <Banknote className="w-5 h-5 text-primary" />
                        Cash on Delivery
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Pay when you receive your order
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border border-border rounded-sm hover:border-primary/50 transition-colors cursor-pointer">
                    <RadioGroupItem
                      value="whatsapp"
                      id="whatsapp"
                      className="mt-0.5"
                      data-testid="radio-whatsapp"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="whatsapp"
                        className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                      >
                        <MessageCircle className="w-5 h-5 text-green-500" />
                        Pay via WhatsApp
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Our customer service will contact you to complete the
                        payment
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border border-border rounded-sm opacity-60">
                    <RadioGroupItem
                      value="card"
                      id="card"
                      disabled
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="card"
                        className="flex items-center gap-2 text-sm font-medium cursor-not-allowed"
                      >
                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                        Credit/Debit Card
                        <span className="text-[10px] uppercase tracking-wider bg-secondary px-2 py-0.5 rounded-full">
                          Coming Soon
                        </span>
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Online payment gateway will be available soon
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-white p-6 sm:p-8 border border-border/40 rounded-sm">
                <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-6">
                  Additional Notes
                </h2>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="rounded-none border-border resize-none"
                  placeholder="Any special instructions for your order..."
                  data-testid="input-notes"
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-secondary/10 p-5 sm:p-8 rounded-sm sticky top-28">
                <h3 className="font-serif text-lg sm:text-xl text-foreground mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-border/50">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex gap-3"
                      data-testid={`order-item-${item.productId}`}
                    >
                      <div className="w-14 h-14 bg-secondary/20 rounded-sm overflow-hidden flex-shrink-0">
                        <img
                          src={
                            item.type === "custom"
                              ? customOrderIcon
                              : item.imageUrl || logoImg
                          }
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-border/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{getTotalFormatted()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {items.length > 0 ? formatCurrency(SHIPPING_FEE) : "Free"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="font-medium">Total</span>
                  <span className="font-serif text-2xl text-primary">
                    {formatCurrency(totalWithShipping)}
                  </span>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-none uppercase tracking-widest text-xs font-bold"
                  data-testid="button-place-order"
                >
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
