import { useState } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, ShoppingBag, Package, Settings, LogOut, Menu, X, Home } from "lucide-react";
import { useAdmin } from "@/lib/admin-context";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { logout } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      <Link href="/admin/dashboard">
        <a 
          onClick={onClick}
          className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive('/admin/dashboard') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary/50'}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </a>
      </Link>
      <Link href="/admin/orders">
        <a 
          onClick={onClick}
          className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive('/admin/orders') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary/50'}`}
        >
          <ShoppingBag className="w-4 h-4" />
          Orders
        </a>
      </Link>
      <Link href="/admin/products">
        <a 
          onClick={onClick}
          className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive('/admin/products') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary/50'}`}
        >
          <Package className="w-4 h-4" />
          Products
        </a>
      </Link>
      <Link href="/admin/settings">
        <a 
          onClick={onClick}
          className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive('/admin/settings') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary/50'}`}
        >
          <Settings className="w-4 h-4" />
          Settings
        </a>
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-secondary/10 font-sans">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
        <span className="font-serif text-lg font-bold text-foreground">Admin Panel</span>
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-2 hover:bg-secondary/50 rounded-md"
          data-testid="button-admin-menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-[100]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop fixed, Mobile slide-out */}
      <aside className={`
        fixed h-full bg-white border-r border-border flex flex-col z-[101]
        w-[280px] lg:w-64
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6 lg:p-8 border-b border-border/50 flex items-center justify-between">
          <span className="font-serif text-lg lg:text-xl font-bold text-foreground">Admin Panel</span>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-secondary/50 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLinks onClick={() => setSidebarOpen(false)} />
        </nav>

        <div className="p-4 border-t border-border/50 space-y-2">
          <Link href="/">
            <a 
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-muted-foreground hover:bg-secondary/50 transition-colors w-full"
            >
              <Home className="w-4 h-4" />
              Back to Store
            </a>
          </Link>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-12 pt-20 lg:pt-12 min-h-screen">
        {children}
      </main>
    </div>
  );
}
