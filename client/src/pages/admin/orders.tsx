import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, Redirect } from "wouter";
import { useAdmin } from "@/lib/admin-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LayoutDashboard, Package, Settings, ShoppingBag, LogOut, ChevronRight, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrderItem {
  productId: string;
  title: string;
  price: string;
  quantity: number;
  imageUrl: string;
}

interface OrderData {
  items: OrderItem[];
  address: string;
  city: string;
  notes: string;
  isGift: boolean;
  giftRecipientName?: string;
  giftMessage?: string;
  paymentMethod: string;
}

interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  total: string;
  status: string;
  items: number;
  orderData?: OrderData;
  createdAt: string;
}

export default function AdminOrders() {
  const { isAuthenticated, logout } = useAdmin();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await fetch("/api/orders", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
    enabled: isAuthenticated,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update order");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast({ title: "Status updated" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    },
  });

  if (!isAuthenticated) {
    return <Redirect to="/admin/login" />;
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case "cod": return "Cash on Delivery";
      case "whatsapp": return "WhatsApp Payment";
      case "card": return "Card Payment";
      default: return method;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-white border-r border-border hidden lg:block">
        <div className="p-6">
          <Link href="/" className="font-serif text-xl font-medium text-foreground">Fabric & Blooms</Link>
          <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
        </div>
        <nav className="px-4 space-y-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors">
            <Package className="w-4 h-4" /> Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-sm text-foreground bg-primary/10 rounded-lg">
            <ShoppingBag className="w-4 h-4" /> Orders
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors">
            <Settings className="w-4 h-4" /> Settings
          </Link>
        </nav>
        <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-border">
          <Button variant="ghost" onClick={logout} className="w-full justify-start text-muted-foreground hover:text-foreground">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">Orders</h1>
          <p className="text-sm text-muted-foreground">Manage customer orders and track deliveries</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No orders yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="orders-table">
                <thead className="bg-secondary/30">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Order ID</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Customer</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Items</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Total</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Payment</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Date</th>
                    <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-secondary/10" data-testid={`order-row-${order.orderId}`}>
                      <td className="px-4 py-4 text-sm font-medium">{order.orderId}</td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium">{order.customerName}</div>
                        {order.customerPhone && <div className="text-xs text-muted-foreground">{order.customerPhone}</div>}
                      </td>
                      <td className="px-4 py-4 text-sm">{order.items}</td>
                      <td className="px-4 py-4 text-sm font-medium text-primary">{order.total}</td>
                      <td className="px-4 py-4 text-xs">
                        {order.orderData?.paymentMethod ? getPaymentMethodLabel(order.orderData.paymentMethod) : "N/A"}
                      </td>
                      <td className="px-4 py-4">
                        <Select
                          value={order.status}
                          onValueChange={(value) => updateStatusMutation.mutate({ orderId: order.orderId, status: value })}
                        >
                          <SelectTrigger className="w-32 h-8 text-xs">
                            <Badge className={`${getStatusColor(order.status)} border-0`}>
                              {order.status}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Processing">Processing</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-4 py-4 text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                          data-testid={`view-order-${order.orderId}`}
                        >
                          <Eye className="w-4 h-4 mr-1" /> View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Order Details - {selectedOrder?.orderId}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-secondary/10 p-4 rounded-lg">
                  <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Customer</h4>
                  <p className="font-medium">{selectedOrder.customerName}</p>
                  {selectedOrder.customerEmail && <p className="text-sm text-muted-foreground">{selectedOrder.customerEmail}</p>}
                  {selectedOrder.customerPhone && <p className="text-sm text-muted-foreground">{selectedOrder.customerPhone}</p>}
                </div>
                <div className="bg-secondary/10 p-4 rounded-lg">
                  <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Delivery Address</h4>
                  <p className="text-sm">{selectedOrder.orderData?.address || "N/A"}</p>
                  <p className="text-sm">{selectedOrder.orderData?.city || ""}</p>
                </div>
              </div>

              {selectedOrder.orderData?.isGift && (
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                  <h4 className="text-xs uppercase tracking-wider text-pink-600 mb-2">Gift Order</h4>
                  {selectedOrder.orderData.giftRecipientName && (
                    <p className="text-sm"><strong>Recipient:</strong> {selectedOrder.orderData.giftRecipientName}</p>
                  )}
                  {selectedOrder.orderData.giftMessage && (
                    <p className="text-sm mt-2"><strong>Message:</strong> {selectedOrder.orderData.giftMessage}</p>
                  )}
                </div>
              )}

              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.orderData?.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-secondary/10 rounded-lg">
                      <div className="w-12 h-12 bg-secondary/30 rounded overflow-hidden flex-shrink-0">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium text-sm">{item.price}</span>
                    </div>
                  )) || <p className="text-sm text-muted-foreground">No item details available</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-secondary/10 p-4 rounded-lg">
                  <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Payment Method</h4>
                  <p className="font-medium">{selectedOrder.orderData?.paymentMethod ? getPaymentMethodLabel(selectedOrder.orderData.paymentMethod) : "N/A"}</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h4 className="text-xs uppercase tracking-wider text-primary mb-2">Total</h4>
                  <p className="font-serif text-2xl text-primary">{selectedOrder.total}</p>
                </div>
              </div>

              {selectedOrder.orderData?.notes && (
                <div className="bg-secondary/10 p-4 rounded-lg">
                  <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Notes</h4>
                  <p className="text-sm">{selectedOrder.orderData.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
