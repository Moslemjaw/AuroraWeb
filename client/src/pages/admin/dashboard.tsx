import { useAdmin } from "@/lib/admin-context";
import AdminLayout from "@/components/admin-layout";
import { TrendingUp, ShoppingBag, Users, DollarSign } from "lucide-react";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { stats, orders, loadOrders, loadStats } = useAdmin();

  useEffect(() => {
    loadOrders();
    loadStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-foreground mb-1 sm:mb-2">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground">Welcome back, Admin.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Sales</p>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-1 sm:mt-2">{stats.totalSales}</h3>
              </div>
              <div className="p-2 sm:p-3 bg-primary/10 rounded-full text-primary">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="flex items-center text-[10px] sm:text-xs text-emerald-600 font-medium">
              <TrendingUp className="w-3 h-3 mr-1" /> +12.5% from last month
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg border border-border shadow-sm">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Orders</p>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-1 sm:mt-2">{stats.totalOrders}</h3>
              </div>
              <div className="p-2 sm:p-3 bg-primary/10 rounded-full text-primary">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="flex items-center text-[10px] sm:text-xs text-emerald-600 font-medium">
              <TrendingUp className="w-3 h-3 mr-1" /> +5 New orders today
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg border border-border shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Avg. Order</p>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-1 sm:mt-2">{stats.avgOrderValue}</h3>
              </div>
              <div className="p-2 sm:p-3 bg-primary/10 rounded-full text-primary">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground font-medium">
              stable from last week
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-border/50">
            <h3 className="font-serif text-base sm:text-lg font-medium">Recent Orders</h3>
          </div>
          
          {/* Mobile Card Layout */}
          <div className="lg:hidden divide-y divide-border/50">
            {orders.map((order) => (
              <div key={order.orderId} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-sm">{order.orderId}</p>
                    <p className="text-xs text-muted-foreground">{order.customerName}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium
                    ${order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}</span>
                  <span className="font-bold text-primary">{order.total}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/10 text-muted-foreground uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {orders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-secondary/5 transition-colors">
                    <td className="px-6 py-4 font-medium">{order.orderId}</td>
                    <td className="px-6 py-4">{order.customerName}</td>
                    <td className="px-6 py-4 text-muted-foreground">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
