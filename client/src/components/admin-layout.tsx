import { Link, useLocation } from "wouter";
import { LayoutDashboard, ShoppingBag, Package, Settings, LogOut } from "lucide-react";
import { useAdmin } from "@/lib/admin-context";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { logout } = useAdmin();

  const isActive = (path: string) => location === path;

  return (
    <div className="min-h-screen bg-secondary/10 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border flex flex-col fixed h-full">
        <div className="p-8 border-b border-border/50">
          <span className="font-serif text-xl font-bold text-foreground">Admin Panel</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/dashboard">
            <a className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive('/admin/dashboard') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary/50'}`}>
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </a>
          </Link>
          <Link href="/admin/orders">
            <a className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive('/admin/orders') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary/50'}`}>
              <ShoppingBag className="w-4 h-4" />
              Orders
            </a>
          </Link>
          <Link href="/admin/products">
            <a className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive('/admin/products') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary/50'}`}>
              <Package className="w-4 h-4" />
              Products
            </a>
          </Link>
          <Link href="/admin/settings">
            <a className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive('/admin/settings') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary/50'}`}>
              <Settings className="w-4 h-4" />
              Settings
            </a>
          </Link>
        </nav>

        <div className="p-4 border-t border-border/50">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 lg:p-12">
        {children}
      </main>
    </div>
  );
}
