import { useAdmin } from "@/lib/admin-context";
import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";

export default function AdminSettings() {
  const { colors, addColor, removeColor } = useAdmin();
  const [newColor, setNewColor] = useState({ name: '', hex: '#000000' });

  const handleAddColor = async () => {
    if (newColor.name && newColor.hex) {
      try {
        await addColor({ ...newColor });
        setNewColor({ name: '', hex: '#000000' });
      } catch (error) {
        console.error("Failed to add color:", error);
      }
    }
  };

  return (
    <AdminLayout>
       <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-foreground mb-1 sm:mb-2">Settings & Configuration</h1>
          <p className="text-sm text-muted-foreground">Manage global settings, colors, and preferences.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Color Management */}
          <div className="bg-white p-4 sm:p-6 rounded-lg border border-border shadow-sm">
            <h3 className="font-serif text-base sm:text-lg font-medium mb-3 sm:mb-4">Custom Order Colors</h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input 
                  type="text" 
                  placeholder="Color Name" 
                  className="flex-1 h-10 rounded-md border border-input px-3 py-2 text-sm"
                  value={newColor.name}
                  onChange={e => setNewColor({...newColor, name: e.target.value})}
                />
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 border border-input rounded-md px-2 flex-1 sm:flex-none">
                    <input 
                      type="color" 
                      className="w-8 h-8 rounded overflow-hidden cursor-pointer border-none bg-transparent p-0"
                      value={newColor.hex}
                      onChange={e => setNewColor({...newColor, hex: e.target.value})}
                    />
                    <span className="text-xs text-muted-foreground sm:hidden">{newColor.hex}</span>
                  </div>
                  <Button onClick={handleAddColor} size="icon" className="shrink-0 h-10 w-10"><Plus className="w-4 h-4" /></Button>
                </div>
              </div>

              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {colors.map(color => (
                  <div key={color.colorId} className="flex items-center justify-between p-3 bg-secondary/10 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-border shadow-sm flex-shrink-0" style={{ backgroundColor: color.hex }} />
                      <span className="text-xs sm:text-sm font-medium">{color.name}</span>
                    </div>
                    <button onClick={() => removeColor(color.colorId)} className="text-muted-foreground hover:text-destructive p-1">
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
