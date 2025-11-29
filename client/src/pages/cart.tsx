import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowLeft,
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  Palette,
  Gift,
  Sparkles,
} from "lucide-react";
import MobileNav from "@/components/mobile-nav";
import logoImg from "@assets/WhatsApp Image 2025-11-28 at 10.40.17 PM-modified_1764359891804.png";
import customOrderIcon from "@assets/custom-order-icon.png";

export default function Cart() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    getTotalFormatted,
    itemCount,
  } = useCart();

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
        <div className="mb-8 sm:mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">
            Your Shopping Cart
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
            <h2 className="font-serif text-2xl text-foreground mb-3">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any beautiful blooms yet.
            </p>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white rounded-none uppercase tracking-widest text-xs font-bold"
            >
              <Link href="/">Browse Collection</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="py-4 sm:py-6 border-b border-border"
                  data-testid={`cart-item-${item.productId}`}
                >
                  <div className="flex gap-4 sm:gap-6">
                    <div className="w-20 h-24 sm:w-28 sm:h-36 bg-secondary/20 rounded-sm overflow-hidden flex-shrink-0">
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
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <h3 className="font-serif text-base sm:text-xl text-foreground">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {item.category}
                          </p>
                        </div>
                        <span className="font-sans font-bold text-primary text-sm sm:text-base whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-3 sm:mt-0">
                        {item.type !== "custom" ? (
                          <div className="flex items-center border border-border rounded-sm">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                              className="p-1.5 sm:p-2 hover:bg-secondary/50 transition-colors"
                              data-testid={`decrease-${item.productId}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 sm:w-10 text-center text-xs sm:text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                              className="p-1.5 sm:p-2 hover:bg-secondary/50 transition-colors"
                              data-testid={`increase-${item.productId}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Custom Order
                          </span>
                        )}
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground hover:text-destructive transition-colors"
                          data-testid={`remove-${item.productId}`}
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Custom Order Details */}
                  {item.type === "custom" && item.customization && (
                    <div className="mt-4 ml-24 sm:ml-34 space-y-3 bg-secondary/10 rounded-lg p-3 sm:p-4">
                      {/* Colors */}
                      <div className="flex items-start gap-2">
                        <Palette className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-xs font-medium text-foreground block mb-1">
                            Colors
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.customization.selectedColors.map((color) => (
                              <div
                                key={color.colorId}
                                className="flex items-center gap-1 bg-white rounded-full px-2 py-0.5 border border-border"
                              >
                                {color.imageUrl ? (
                                  <div className="w-4 h-4 rounded border border-border/50 overflow-hidden">
                                    <img
                                      src={color.imageUrl}
                                      alt={color.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div
                                    className="w-3 h-3 rounded-full border border-border/50"
                                    style={{ backgroundColor: color.hex }}
                                  />
                                )}
                                <span className="text-[10px] text-muted-foreground">
                                  {color.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Presentation */}
                      <div className="flex items-start gap-2">
                        <Gift className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-xs font-medium text-foreground block mb-0.5">
                            Presentation
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {item.customization.presentation.name}
                          </span>
                        </div>
                      </div>

                      {/* Add-ons */}
                      {item.customization.addOns.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs font-medium text-foreground block mb-1">
                              Add-ons
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {item.customization.addOns.map((addon) => (
                                <span
                                  key={addon.addOnId}
                                  className="text-[10px] bg-white rounded-full px-2 py-0.5 border border-border text-muted-foreground"
                                >
                                  {addon.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-secondary/10 p-5 sm:p-8 h-fit rounded-sm sticky top-28">
              <h3 className="font-serif text-lg sm:text-xl text-foreground mb-4 sm:mb-6">
                Order Summary
              </h3>
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border/50">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">
                    Items ({itemCount})
                  </span>
                  <span>{getTotalFormatted()}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-right">Free</span>
                </div>
              </div>
              <div className="flex justify-between items-end mb-6 sm:mb-8">
                <span className="font-medium text-sm sm:text-base">Total</span>
                <span className="font-serif text-xl sm:text-2xl text-primary">
                  {getTotalFormatted()}
                </span>
              </div>
              <Button
                asChild
                className="w-full h-11 sm:h-12 bg-primary hover:bg-primary/90 text-white rounded-none uppercase tracking-widest text-[10px] sm:text-xs font-bold"
              >
                <Link href="/checkout" data-testid="button-checkout">
                  Proceed to Checkout
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
