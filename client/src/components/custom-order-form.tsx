import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { Palette, Gift, Sparkles, Flower, Check, ShoppingCart } from "lucide-react";
import { colorAPI, presentationAPI, addOnAPI, settingsAPI } from "@/lib/api";
import { useCart } from "@/lib/cart-context";

type Color = {
  colorId: string;
  name: string;
  hex: string;
  imageUrl?: string;
  price: number;
};

type Presentation = {
  presentationId: string;
  name: string;
  description?: string;
  price: number;
};

type AddOn = {
  addOnId: string;
  name: string;
  description?: string;
  price: number;
};

type Settings = {
  flowerCountMin: number;
  flowerCountMax: number;
  pricePerFlower: number;
};

export default function CustomOrderForm() {
  const [, setLocation] = useLocation();
  const { addCustomToCart } = useCart();
  
  const [colors, setColors] = useState<Color[]>([]);
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [settings, setSettings] = useState<Settings>({
    flowerCountMin: 1,
    flowerCountMax: 50,
    pricePerFlower: 5.0,
  });

  const [quantity, setQuantity] = useState(1);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPresentation, setSelectedPresentation] = useState<string>("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      colorAPI.getAll(),
      presentationAPI.getAll(),
      addOnAPI.getAll(),
      settingsAPI.get(),
    ]).then(([colorsData, presentationsData, addOnsData, settingsData]) => {
      setColors(colorsData);
      setPresentations(presentationsData);
      setAddOns(addOnsData);
      const newSettings = {
        flowerCountMin: settingsData.flowerCountMin ?? 1,
        flowerCountMax: settingsData.flowerCountMax ?? 50,
        pricePerFlower: settingsData.pricePerFlower ?? 5.0,
      };
      setSettings(newSettings);
      setQuantity(newSettings.flowerCountMin);
      if (presentationsData.length > 0) {
        setSelectedPresentation(presentationsData[0].presentationId);
      }
    }).catch(console.error);
  }, []);

  const colorSurchargePerFlower = useMemo(() => {
    if (selectedColors.length === 0) return 0;
    const totalColorPrice = selectedColors.reduce((sum, colorId) => {
      const color = colors.find(c => c.colorId === colorId);
      return sum + (color?.price || 0);
    }, 0);
    return totalColorPrice / selectedColors.length;
  }, [selectedColors, colors]);

  const totalPrice = useMemo(() => {
    let total = quantity * (settings.pricePerFlower + colorSurchargePerFlower);
    const presentation = presentations.find(p => p.presentationId === selectedPresentation);
    if (presentation) total += presentation.price;
    selectedAddOns.forEach(addOnId => {
      const addOn = addOns.find(a => a.addOnId === addOnId);
      if (addOn) total += addOn.price;
    });
    return total;
  }, [quantity, colorSurchargePerFlower, selectedPresentation, selectedAddOns, presentations, addOns, settings]);

  const toggleColor = (colorId: string) => {
    setSelectedColors(prev => 
      prev.includes(colorId) 
        ? prev.filter(id => id !== colorId)
        : [...prev, colorId]
    );
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleAddToCart = () => {
    if (selectedColors.length === 0) {
      toast({
        title: "Please select at least one color",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPresentation) {
      toast({
        title: "Please select a presentation style",
        variant: "destructive",
      });
      return;
    }

    const selectedColorDetails = selectedColors.map(colorId => {
      const color = colors.find(c => c.colorId === colorId)!;
      return { colorId: color.colorId, name: color.name, hex: color.hex, imageUrl: color.imageUrl, price: color.price };
    });

    const presentationDetails = presentations.find(p => p.presentationId === selectedPresentation)!;
    
    const selectedAddOnDetails = selectedAddOns.map(addOnId => {
      const addOn = addOns.find(a => a.addOnId === addOnId)!;
      return { addOnId: addOn.addOnId, name: addOn.name, price: addOn.price };
    });

    const colorNames = selectedColorDetails.map(c => c.name).join(", ");
    const title = `Custom Bouquet (${quantity} flowers)`;

    addCustomToCart({
      productId: `custom-${Date.now()}`,
      title,
      price: `${totalPrice.toFixed(2)} K.D.`,
      imageUrl: "/attached_assets/generated_images/handmade_fabric_peony_bouquet.png",
      category: "Custom Order",
      type: "custom",
      customization: {
        flowerCount: quantity,
        pricePerFlower: settings.pricePerFlower,
        selectedColors: selectedColorDetails,
        presentation: {
          presentationId: presentationDetails.presentationId,
          name: presentationDetails.name,
          price: presentationDetails.price,
        },
        addOns: selectedAddOnDetails,
      },
    });

    toast({
      title: "Added to Cart!",
      description: `Your custom ${quantity}-flower arrangement has been added to your cart.`,
    });

    setQuantity(settings.flowerCountMin);
    setSelectedColors([]);
    setSelectedAddOns([]);
    if (presentations.length > 0) {
      setSelectedPresentation(presentations[0].presentationId);
    }

    setLocation("/cart");
  };

  return (
    <div className="p-0 sm:p-4 lg:p-10">
      <div className="text-center mb-6 sm:mb-10">
        <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-2">Start Your Project</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">Configure your arrangement below.</p>
      </div>

      <div className="space-y-8">
        {/* Quantity Slider */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-base font-medium text-foreground flex items-center gap-2">
              <Flower className="w-4 h-4 text-primary" /> Flower Count
            </label>
            <span className="font-mono text-sm font-bold text-primary bg-secondary px-3 py-1 rounded-md" data-testid="text-quantity">
              {quantity}
            </span>
          </div>
          <Slider
            min={settings.flowerCountMin}
            max={settings.flowerCountMax}
            step={1}
            value={[quantity]}
            onValueChange={(vals) => setQuantity(vals[0])}
            className="py-2"
            data-testid="slider-quantity"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{settings.flowerCountMin}</span>
            <span>{settings.flowerCountMax}</span>
          </div>
        </div>

        {/* Color Selection - Multi-select */}
        <div>
          <label className="text-sm sm:text-base font-medium text-foreground flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4 text-primary" /> Color Palette
            <span className="text-xs text-muted-foreground font-normal">(select multiple)</span>
          </label>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {colors.map((color) => (
              <button
                key={color.colorId}
                type="button"
                onClick={() => toggleColor(color.colorId)}
                className={`relative flex flex-col items-center justify-center rounded-lg border p-2 sm:p-3 hover:border-primary hover:bg-secondary/50 cursor-pointer transition-all h-24 sm:h-28 text-center ${
                  selectedColors.includes(color.colorId) 
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                    : 'border-border bg-white'
                }`}
                data-testid={`button-color-${color.colorId}`}
              >
                {selectedColors.includes(color.colorId) && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                {color.imageUrl ? (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg mb-1.5 sm:mb-2 shadow-sm border border-border overflow-hidden">
                    <img src={color.imageUrl} alt={color.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div 
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mb-1.5 sm:mb-2 shadow-sm border border-border" 
                    style={{ backgroundColor: color.hex }} 
                  />
                )}
                <span className="text-[10px] sm:text-xs font-medium leading-tight">{color.name}</span>
                {color.price > 0 && (
                  <span className="text-[9px] sm:text-[10px] text-primary mt-0.5">
                    +{color.price.toFixed(2)} K.D./ea
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Presentation Selection - Single select */}
        <div>
          <label className="text-base font-medium text-foreground flex items-center gap-2 mb-3">
            <Gift className="w-4 h-4 text-primary" /> Presentation
          </label>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {presentations.map((pres) => (
              <button
                key={pres.presentationId}
                type="button"
                onClick={() => setSelectedPresentation(pres.presentationId)}
                className={`relative flex flex-col items-start rounded-lg border p-3 sm:p-4 hover:border-primary hover:bg-secondary/50 cursor-pointer transition-all text-left ${
                  selectedPresentation === pres.presentationId 
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                    : 'border-border bg-white'
                }`}
                data-testid={`button-presentation-${pres.presentationId}`}
              >
                {selectedPresentation === pres.presentationId && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <span className="text-xs sm:text-sm font-medium">{pres.name}</span>
                {pres.description && (
                  <span className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{pres.description}</span>
                )}
                <span className="text-xs text-primary font-medium mt-1">
                  {pres.price > 0 ? `+${pres.price.toFixed(2)} K.D.` : 'Included'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Add-ons - Multi-select */}
        <div>
          <label className="text-base font-medium text-foreground flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" /> Add-ons
            <span className="text-xs text-muted-foreground font-normal">(optional, select multiple)</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {addOns.map((addOn) => (
              <button
                key={addOn.addOnId}
                type="button"
                onClick={() => toggleAddOn(addOn.addOnId)}
                className={`relative flex flex-col items-start rounded-lg border p-3 hover:border-primary hover:bg-secondary/50 cursor-pointer transition-all text-left ${
                  selectedAddOns.includes(addOn.addOnId) 
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                    : 'border-border bg-white'
                }`}
                data-testid={`button-addon-${addOn.addOnId}`}
              >
                {selectedAddOns.includes(addOn.addOnId) && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <span className="text-xs sm:text-sm font-medium pr-5">{addOn.name}</span>
                {addOn.description && (
                  <span className="text-[10px] text-muted-foreground mt-0.5">{addOn.description}</span>
                )}
                <span className="text-xs text-primary font-medium mt-1">
                  +{addOn.price.toFixed(2)} K.D.
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Price Summary & Submit */}
        <div className="pt-4 sm:pt-6 border-t border-border mt-4">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{quantity} flowers @ {settings.pricePerFlower.toFixed(2)} K.D. each</span>
              <span>{(quantity * settings.pricePerFlower).toFixed(2)} K.D.</span>
            </div>
            {selectedColors.length > 0 && colorSurchargePerFlower > 0 && (
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Color upgrade ({selectedColors.length} selected) @ +{colorSurchargePerFlower.toFixed(2)} K.D./flower</span>
                <span>+{(quantity * colorSurchargePerFlower).toFixed(2)} K.D.</span>
              </div>
            )}
            {selectedPresentation && (
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Presentation: {presentations.find(p => p.presentationId === selectedPresentation)?.name}</span>
                <span>+{(presentations.find(p => p.presentationId === selectedPresentation)?.price || 0).toFixed(2)} K.D.</span>
              </div>
            )}
            {selectedAddOns.length > 0 && (
              <div className="space-y-1">
                {selectedAddOns.map(addOnId => {
                  const addOn = addOns.find(a => a.addOnId === addOnId);
                  return addOn ? (
                    <div key={addOnId} className="flex justify-between text-xs text-muted-foreground">
                      <span>{addOn.name}</span>
                      <span>+{addOn.price.toFixed(2)} K.D.</span>
                    </div>
                  ) : null;
                })}
              </div>
            )}
          </div>
          <div className="flex justify-between items-end mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm text-muted-foreground">Total</span>
            <span className="text-2xl sm:text-3xl font-serif font-medium text-primary" data-testid="text-total-price">
              {totalPrice.toFixed(2)} K.D.
            </span>
          </div>
          <Button 
            type="button" 
            size="lg" 
            className="w-full h-12 sm:h-14 text-base sm:text-lg rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
            onClick={handleAddToCart}
            data-testid="button-add-to-cart"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
