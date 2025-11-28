import { useAdmin, Product } from "@/lib/admin-context";
import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Plus, Trash, Edit, Star, TrendingUp, X, Image, Upload } from "lucide-react";
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin();
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product & { images: string[] }>>({ images: [] });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const response = await fetch("/api/upload/multiple", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      const currentImages = newProduct.images || [];
      setNewProduct({
        ...newProduct,
        images: [...currentImages, ...data.imageUrls],
        imageUrl: newProduct.imageUrl || data.imageUrls[0]
      });
      
      toast({ title: "Images uploaded successfully" });
    } catch (error) {
      console.error("Upload error:", error);
      toast({ title: "Failed to upload images", variant: "destructive" });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const currentImages = newProduct.images || [];
    const updatedImages = currentImages.filter((_, i) => i !== index);
    setNewProduct({
      ...newProduct,
      images: updatedImages,
      imageUrl: updatedImages[0] || ''
    });
  };

  const handleSaveProduct = async () => {
    if (!newProduct.title || !newProduct.price) {
      toast({ title: "Please fill in title and price", variant: "destructive" });
      return;
    }
    
    const images = newProduct.images || [];
    if (images.length === 0) {
      toast({ title: "Please add at least one image", variant: "destructive" });
      return;
    }
    
    try {
      const priceValue = parseFloat(newProduct.price) || 0;
      const formattedPrice = `${priceValue.toFixed(2)} K.D.`;
      
      await addProduct({
        productId: `prod-${Date.now()}`,
        title: newProduct.title,
        price: formattedPrice,
        description: newProduct.description || "",
        longDescription: newProduct.longDescription || "",
        imageUrl: images[0],
        images: images,
        category: "Flowers",
        isCurated: false,
        isBestSeller: false,
      });
      setIsAddModalOpen(false);
      setNewProduct({ images: [] });
      toast({ title: "Product added successfully" });
    } catch (error) {
      console.error("Failed to add product:", error);
      toast({ title: "Failed to add product", variant: "destructive" });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-foreground mb-1 sm:mb-2">Product Management</h1>
            <p className="text-sm text-muted-foreground">Add, edit, and organize your catalog.</p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={(open) => {
            setIsAddModalOpen(open);
            if (!open) {
              setNewProduct({ images: [] });
            }
          }}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-white hover:bg-primary/90 gap-2 w-full sm:w-auto">
                <Plus className="w-4 h-4" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 sm:gap-6 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Product Title</label>
                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                      value={newProduct.title || ''} 
                      onChange={e => setNewProduct({...newProduct, title: e.target.value})}
                      data-testid="input-product-title"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Price (K.D.)</label>
                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                      value={newProduct.price || ''} 
                      onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                      data-testid="input-product-price"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-medium">Short Description</label>
                   <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                      value={newProduct.description || ''} 
                      onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                      data-testid="input-product-description"
                   />
                </div>
                
                {/* File Upload Section */}
                <div className="space-y-3">
                  <label className="text-xs font-medium">Product Images</label>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    data-testid="input-file-upload"
                  />
                  
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full flex items-center justify-center gap-2 h-24 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-secondary/30 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="button-upload-images"
                  >
                    {isUploading ? (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm">Uploading...</span>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <Upload className="w-6 h-6 mx-auto mb-1" />
                        <span className="text-sm">Click to upload images</span>
                        <span className="text-xs block mt-0.5">PNG, JPG, GIF up to 10MB</span>
                      </div>
                    )}
                  </button>
                  
                  {/* Image Preview Grid */}
                  {(newProduct.images?.length ?? 0) > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {newProduct.images?.map((img, index) => (
                        <div key={index} className="relative group aspect-square bg-secondary/20 rounded-lg overflow-hidden border border-border">
                          <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                          {index === 0 && (
                            <span className="absolute top-1 left-1 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded">Main</span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            data-testid={`button-remove-image-${index}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <Button onClick={handleSaveProduct} disabled={isUploading} data-testid="button-save-product">
                  Save Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Card Layout */}
        <div className="lg:hidden space-y-4">
          {products.map((product) => (
            <div key={product.productId} className="bg-white rounded-lg border border-border p-4 shadow-sm">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-md bg-secondary/20 overflow-hidden flex-shrink-0">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">{product.title}</h3>
                  {product.images && product.images.length > 1 && (
                    <p className="text-xs text-muted-foreground">{product.images.length} images</p>
                  )}
                  <p className="text-sm font-bold text-primary mt-1">{product.price}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => updateProduct(product.productId, { isCurated: !product.isCurated })}
                    className={`flex items-center gap-1.5 text-xs ${product.isCurated ? 'text-yellow-600' : 'text-gray-400'}`}
                  >
                    <Star className={`w-4 h-4 ${product.isCurated ? 'fill-current' : ''}`} />
                    <span className="hidden sm:inline">Curated</span>
                  </button>
                  <button 
                    onClick={() => updateProduct(product.productId, { isBestSeller: !product.isBestSeller })}
                    className={`flex items-center gap-1.5 text-xs ${product.isBestSeller ? 'text-primary' : 'text-gray-400'}`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span className="hidden sm:inline">Best Seller</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deleteProduct(product.productId)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden lg:block bg-white rounded-lg border border-border shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary/10 text-muted-foreground uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Images</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-center">Curated</th>
                <th className="px-6 py-4 text-center">Best Seller</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {products.map((product) => (
                <tr key={product.productId} className="hover:bg-secondary/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-md bg-secondary/20 overflow-hidden">
                      <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{product.title}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {product.images && product.images.length > 0 ? `${product.images.length} images` : '1 image'}
                  </td>
                  <td className="px-6 py-4 font-medium">{product.price}</td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => updateProduct(product.productId, { isCurated: !product.isCurated })}
                      className={`p-1 rounded-full transition-colors ${product.isCurated ? 'text-yellow-500 bg-yellow-50' : 'text-gray-300 hover:text-gray-400'}`}
                    >
                      <Star className={`w-5 h-5 ${product.isCurated ? 'fill-current' : ''}`} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => updateProduct(product.productId, { isBestSeller: !product.isBestSeller })}
                      className={`p-1 rounded-full transition-colors ${product.isBestSeller ? 'text-primary bg-primary/10' : 'text-gray-300 hover:text-gray-400'}`}
                    >
                      <TrendingUp className="w-5 h-5" />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deleteProduct(product.productId)}>
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
