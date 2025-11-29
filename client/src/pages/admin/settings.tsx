import { useAdmin } from "@/lib/admin-context";
import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Plus, Trash, Save, Upload, X } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { config } from "@/lib/config";

export default function AdminSettings() {
  const { toast } = useToast();
  const {
    colors,
    addColor,
    updateColor,
    removeColor,
    presentations,
    addPresentation,
    updatePresentation,
    removePresentation,
    addOns,
    addAddOn,
    updateAddOn,
    removeAddOn,
    settings,
    updateSettings,
  } = useAdmin();

  const [newColor, setNewColor] = useState({
    name: "",
    hex: "#f97a9d",
    imageUrl: "",
    price: 0,
  });
  const [useImageForColor, setUseImageForColor] = useState(false);
  const [isUploadingFabric, setIsUploadingFabric] = useState(false);
  const fabricFileRef = useRef<HTMLInputElement>(null);

  const [newPresentation, setNewPresentation] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const [newAddOn, setNewAddOn] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const [flowerSettings, setFlowerSettings] = useState({
    min: settings.flowerCountMin,
    max: settings.flowerCountMax,
    pricePerFlower: settings.pricePerFlower,
  });

  const handleFabricUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploadingFabric(true);
    const formData = new FormData();
    formData.append("image", files[0]);

    // Get API base URL
    const apiBase = config.api.baseUrl || "/api";
    const uploadUrl = `${apiBase}/upload`;

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Upload failed" }));
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();
      setNewColor({ ...newColor, imageUrl: data.imageUrl });
      toast({ title: "Image uploaded successfully" });
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Failed to upload image",
        description:
          error.message || "Please check your connection and try again",
        variant: "destructive",
      });
    } finally {
      setIsUploadingFabric(false);
      if (fabricFileRef.current) {
        fabricFileRef.current.value = "";
      }
    }
  };

  const handleAddColor = async () => {
    if (newColor.name && (newColor.hex || newColor.imageUrl)) {
      try {
        await addColor({
          name: newColor.name,
          hex: newColor.hex || "#cccccc",
          imageUrl: useImageForColor ? newColor.imageUrl : undefined,
          price: newColor.price,
        });
        setNewColor({ name: "", hex: "#f97a9d", imageUrl: "", price: 0 });
        setUseImageForColor(false);
        toast({ title: "Color added successfully" });
      } catch (error) {
        console.error("Failed to add color:", error);
        toast({ title: "Failed to add color", variant: "destructive" });
      }
    }
  };

  const handleAddPresentation = async () => {
    if (newPresentation.name) {
      try {
        await addPresentation({ ...newPresentation });
        setNewPresentation({ name: "", description: "", price: 0 });
        toast({ title: "Presentation added successfully" });
      } catch (error) {
        console.error("Failed to add presentation:", error);
        toast({ title: "Failed to add presentation", variant: "destructive" });
      }
    }
  };

  const handleAddAddOn = async () => {
    if (newAddOn.name) {
      try {
        await addAddOn({ ...newAddOn });
        setNewAddOn({ name: "", description: "", price: 0 });
        toast({ title: "Add-on added successfully" });
      } catch (error) {
        console.error("Failed to add add-on:", error);
        toast({ title: "Failed to add add-on", variant: "destructive" });
      }
    }
  };

  const handleSaveSettings = async () => {
    try {
      await updateSettings({
        flowerCountMin: flowerSettings.min,
        flowerCountMax: flowerSettings.max,
        pricePerFlower: flowerSettings.pricePerFlower,
      });
      toast({ title: "Settings saved successfully" });
    } catch (error) {
      console.error("Failed to save settings:", error);
      toast({ title: "Failed to save settings", variant: "destructive" });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-foreground mb-1 sm:mb-2">
            Settings & Configuration
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage colors, presentations, add-ons, and pricing.
          </p>
        </div>

        {/* Flower Count & Pricing Settings */}
        <div className="bg-white p-4 sm:p-6 rounded-lg border border-border shadow-sm">
          <h3 className="font-serif text-base sm:text-lg font-medium mb-3 sm:mb-4">
            Flower Count & Pricing
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Minimum Flowers
              </label>
              <input
                type="number"
                min="1"
                className="w-full h-10 rounded-md border border-input px-3 py-2 text-sm"
                value={flowerSettings.min}
                onChange={(e) =>
                  setFlowerSettings({
                    ...flowerSettings,
                    min: parseInt(e.target.value) || 1,
                  })
                }
                data-testid="input-min-flowers"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Maximum Flowers
              </label>
              <input
                type="number"
                min="1"
                className="w-full h-10 rounded-md border border-input px-3 py-2 text-sm"
                value={flowerSettings.max}
                onChange={(e) =>
                  setFlowerSettings({
                    ...flowerSettings,
                    max: parseInt(e.target.value) || 50,
                  })
                }
                data-testid="input-max-flowers"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Price Per Flower (K.D.)
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                className="w-full h-10 rounded-md border border-input px-3 py-2 text-sm"
                value={flowerSettings.pricePerFlower}
                onChange={(e) =>
                  setFlowerSettings({
                    ...flowerSettings,
                    pricePerFlower: parseFloat(e.target.value) || 0,
                  })
                }
                data-testid="input-price-per-flower"
              />
            </div>
          </div>
          <Button
            onClick={handleSaveSettings}
            className="mt-4"
            data-testid="button-save-settings"
          >
            <Save className="w-4 h-4 mr-2" /> Save Settings
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Color/Fabric Management */}
          <div className="bg-white p-4 sm:p-6 rounded-lg border border-border shadow-sm">
            <h3 className="font-serif text-base sm:text-lg font-medium mb-3 sm:mb-4">
              Colors & Fabric Patterns
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Add solid colors or upload fabric pattern images for custom
              orders.
            </p>
            <div className="space-y-4">
              {/* Toggle between color and image */}
              <div className="flex items-center gap-4 mb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="colorType"
                    checked={!useImageForColor}
                    onChange={() => {
                      setUseImageForColor(false);
                      setNewColor({ ...newColor, imageUrl: "" });
                    }}
                    className="accent-primary"
                  />
                  <span className="text-sm">Solid Color</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="colorType"
                    checked={useImageForColor}
                    onChange={() => setUseImageForColor(true)}
                    className="accent-primary"
                  />
                  <span className="text-sm">Fabric Pattern</span>
                </label>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-2 items-end">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Color/Pattern Name"
                      className="w-full h-10 rounded-md border border-input px-3 py-2 text-sm"
                      value={newColor.name}
                      onChange={(e) =>
                        setNewColor({ ...newColor, name: e.target.value })
                      }
                      data-testid="input-color-name"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Price (K.D.)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.25"
                      className="w-20 h-10 rounded-md border border-input px-2 py-2 text-sm"
                      value={newColor.price}
                      onChange={(e) =>
                        setNewColor({
                          ...newColor,
                          price: parseFloat(e.target.value) || 0,
                        })
                      }
                      data-testid="input-color-price"
                    />
                  </div>
                  <Button
                    onClick={handleAddColor}
                    size="icon"
                    className="h-10 w-10"
                    disabled={
                      isUploadingFabric ||
                      (useImageForColor && !newColor.imageUrl)
                    }
                    data-testid="button-add-color"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Color picker or Image Upload based on toggle */}
                {!useImageForColor ? (
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        className="w-10 h-10 rounded border border-input cursor-pointer p-1"
                        value={newColor.hex}
                        onChange={(e) =>
                          setNewColor({ ...newColor, hex: e.target.value })
                        }
                        data-testid="input-color-hex"
                      />
                      <span className="text-xs text-muted-foreground">
                        {newColor.hex}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Fabric Pattern Image
                    </label>
                    <input
                      ref={fabricFileRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                      className="hidden"
                      onChange={(e) => handleFabricUpload(e.target.files)}
                    />

                    {!newColor.imageUrl ? (
                      <button
                        type="button"
                        onClick={() => fabricFileRef.current?.click()}
                        disabled={isUploadingFabric}
                        className="w-full flex items-center justify-center gap-2 h-20 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-secondary/30 transition-colors cursor-pointer disabled:opacity-50"
                        data-testid="button-upload-fabric"
                      >
                        {isUploadingFabric ? (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            <span className="text-xs">Uploading...</span>
                          </div>
                        ) : (
                          <div className="text-center text-muted-foreground">
                            <Upload className="w-5 h-5 mx-auto mb-1" />
                            <span className="text-xs">
                              Click to upload fabric image
                            </span>
                          </div>
                        )}
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-lg border border-border overflow-hidden bg-secondary/20">
                          <img
                            src={newColor.imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setNewColor({ ...newColor, imageUrl: "" })
                          }
                          className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1"
                        >
                          <X className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {colors.map((color) => (
                  <div
                    key={color.colorId}
                    className="flex items-center justify-between p-3 bg-secondary/10 rounded-md gap-2"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {color.imageUrl ? (
                        <div className="w-8 h-8 rounded-lg border border-border overflow-hidden flex-shrink-0">
                          <img
                            src={color.imageUrl}
                            alt={color.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className="w-8 h-8 rounded-full border border-border shadow-sm flex-shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                      )}
                      <div className="min-w-0">
                        <span className="text-sm font-medium truncate block">
                          {color.name}
                        </span>
                        {color.imageUrl && (
                          <span className="text-[10px] text-muted-foreground">
                            Pattern
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {color.price > 0
                        ? `+${color.price.toFixed(2)} K.D.`
                        : "Free"}
                    </span>
                    <button
                      onClick={() => removeColor(color.colorId)}
                      className="text-muted-foreground hover:text-destructive p-1"
                      data-testid={`button-delete-color-${color.colorId}`}
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Presentation Options */}
          <div className="bg-white p-4 sm:p-6 rounded-lg border border-border shadow-sm">
            <h3 className="font-serif text-base sm:text-lg font-medium mb-3 sm:mb-4">
              Presentation Options
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-2 sm:gap-3 items-end">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Presentation Name"
                    className="w-full h-10 rounded-md border border-input px-3 py-2 text-sm"
                    value={newPresentation.name}
                    onChange={(e) =>
                      setNewPresentation({
                        ...newPresentation,
                        name: e.target.value,
                      })
                    }
                    data-testid="input-presentation-name"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Price (K.D.)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    className="w-24 h-10 rounded-md border border-input px-2 py-2 text-sm"
                    value={newPresentation.price}
                    onChange={(e) =>
                      setNewPresentation({
                        ...newPresentation,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    data-testid="input-presentation-price"
                  />
                </div>
                <Button
                  onClick={handleAddPresentation}
                  size="icon"
                  className="h-10 w-10"
                  data-testid="button-add-presentation"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                {presentations.map((pres) => (
                  <div
                    key={pres.presentationId}
                    className="flex items-center justify-between p-3 bg-secondary/10 rounded-md gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium truncate block">
                        {pres.name}
                      </span>
                      {pres.description && (
                        <span className="text-xs text-muted-foreground truncate block">
                          {pres.description}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {pres.price > 0
                        ? `+${pres.price.toFixed(2)} K.D.`
                        : "Free"}
                    </span>
                    <button
                      onClick={() => removePresentation(pres.presentationId)}
                      className="text-muted-foreground hover:text-destructive p-1"
                      data-testid={`button-delete-presentation-${pres.presentationId}`}
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add-ons Section */}
        <div className="bg-white p-4 sm:p-6 rounded-lg border border-border shadow-sm">
          <h3 className="font-serif text-base sm:text-lg font-medium mb-3 sm:mb-4">
            Add-ons (Multi-Select)
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Customers can select multiple add-ons to enhance their order.
          </p>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto_auto] gap-2 sm:gap-3 items-end">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Add-on Name"
                  className="w-full h-10 rounded-md border border-input px-3 py-2 text-sm"
                  value={newAddOn.name}
                  onChange={(e) =>
                    setNewAddOn({ ...newAddOn, name: e.target.value })
                  }
                  data-testid="input-addon-name"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Description (optional)
                </label>
                <input
                  type="text"
                  placeholder="Brief description"
                  className="w-full h-10 rounded-md border border-input px-3 py-2 text-sm"
                  value={newAddOn.description}
                  onChange={(e) =>
                    setNewAddOn({ ...newAddOn, description: e.target.value })
                  }
                  data-testid="input-addon-description"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Price (K.D.)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  className="w-24 h-10 rounded-md border border-input px-2 py-2 text-sm"
                  value={newAddOn.price}
                  onChange={(e) =>
                    setNewAddOn({
                      ...newAddOn,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  data-testid="input-addon-price"
                />
              </div>
              <Button
                onClick={handleAddAddOn}
                size="icon"
                className="h-10 w-10"
                data-testid="button-add-addon"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {addOns.map((addon) => (
                <div
                  key={addon.addOnId}
                  className="flex items-start justify-between p-3 bg-secondary/10 rounded-md gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium block">
                      {addon.name}
                    </span>
                    {addon.description && (
                      <span className="text-xs text-muted-foreground block">
                        {addon.description}
                      </span>
                    )}
                    <span className="text-sm text-primary font-medium mt-1 block">
                      {addon.price > 0
                        ? `+${addon.price.toFixed(2)} K.D.`
                        : "Free"}
                    </span>
                  </div>
                  <button
                    onClick={() => removeAddOn(addon.addOnId)}
                    className="text-muted-foreground hover:text-destructive p-1"
                    data-testid={`button-delete-addon-${addon.addOnId}`}
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
