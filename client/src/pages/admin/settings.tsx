import { useAdmin } from "@/lib/admin-context";
import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";

export default function AdminSettings() {
  const { colors, addColor, removeColor } = useAdmin();
  const [newColor, setNewColor] = useState({ name: '', hex: '#000000' });

  const handleAddColor = () => {
    if (newColor.name && newColor.hex) {
      addColor({ id: Date.now().toString(), ...newColor });
      setNewColor({ name: '', hex: '#000000' });
    }
  };

  return (
    <AdminLayout>
       <div className="space-y-8">
        <div>
          <h1 className="font-serif text-3xl text-foreground mb-2">Settings & Configuration</h1>
          <p className="text-muted-foreground">Manage global settings, colors, and preferences.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Color Management */}
          <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
            <h3 className="font-serif text-lg font-medium mb-4">Custom Order Colors</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <input 
                  type="text" 
                  placeholder="Color Name" 
                  className="flex-1 h-10 rounded-md border border-input px-3 py-2 text-sm"
                  value={newColor.name}
                  onChange={e => setNewColor({...newColor, name: e.target.value})}
                />
                <div className="flex items-center gap-2 border border-input rounded-md px-2">
                  <input 
                    type="color" 
                    className="w-8 h-8 rounded overflow-hidden cursor-pointer border-none bg-transparent p-0"
                    value={newColor.hex}
                    onChange={e => setNewColor({...newColor, hex: e.target.value})}
                  />
                </div>
                <Button onClick={handleAddColor} size="icon" className="shrink-0"><Plus className="w-4 h-4" /></Button>
              </div>

              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {colors.map(color => (
                  <div key={color.id} className="flex items-center justify-between p-3 bg-secondary/10 rounded-md group">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full border border-border shadow-sm" style={{ backgroundColor: color.hex }} />
                      <span className="text-sm font-medium">{color.name}</span>
                    </div>
                    <button onClick={() => removeColor(color.id)} className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all">
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
