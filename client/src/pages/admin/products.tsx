import { useAdmin, Product } from "@/lib/admin-context";
import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Plus, Trash, Edit, Search, Star, Check, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});

  const handleSaveProduct = async () => {
    if (!newProduct.title || !newProduct.price) return;
    
    try {
      await addProduct({
        productId: `prod-${Date.now()}`,
        title: newProduct.title,
        price: newProduct.price,
        description: newProduct.description || "",
        longDescription: newProduct.longDescription || "",
        imageUrl: newProduct.imageUrl || "",
        category: newProduct.category || "Uncategorized",
        isCurated: false,
        isBestSeller: false,
      });
      setIsAddModalOpen(false);
      setNewProduct({});
    } catch (error) {
      console.error("Failed to add product:", error);
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
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
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
                      value={newProduct.title || ''} onChange={e => setNewProduct({...newProduct, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Price (K.D.)</label>
                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                      value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-medium">Category</label>
                   <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                      value={newProduct.category || ''} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-medium">Short Description</label>
                   <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                      value={newProduct.description || ''} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-medium">Image URL (Mock)</label>
                   <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                      value={newProduct.imageUrl || ''} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} />
                </div>
                <Button onClick={handleSaveProduct}>Save Product</Button>
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
                  <p className="text-xs text-muted-foreground">{product.category}</p>
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
                <th className="px-6 py-4">Category</th>
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
                  <td className="px-6 py-4 text-muted-foreground">{product.category}</td>
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
