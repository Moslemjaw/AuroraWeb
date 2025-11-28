import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import AdminLayout from "@/components/admin-layout";
import { useAdmin } from "@/lib/admin-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Mail, Trash2, Eye, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Inquiry {
  _id: string;
  inquiryId: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "Unread" | "Read" | "Replied";
  createdAt: string;
}

export default function AdminInquiries() {
  const { isAuthenticated } = useAdmin();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthChecked(true);
      if (!isAuthenticated) {
        setLocation("/admin/login");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isAuthenticated, setLocation]);

  useEffect(() => {
    if (authChecked && isAuthenticated) {
      fetchInquiries();
    }
  }, [authChecked, isAuthenticated]);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/inquiries", { credentials: "include" });
      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      }
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        setInquiries(inquiries.map(inq => 
          inq._id === id ? { ...inq, status: status as Inquiry["status"] } : inq
        ));
        toast({ title: "Status updated" });
      }
    } catch (error) {
      toast({ title: "Failed to update status", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (response.ok) {
        setInquiries(inquiries.filter(inq => inq._id !== id));
        toast({ title: "Inquiry deleted" });
      }
    } catch (error) {
      toast({ title: "Failed to delete inquiry", variant: "destructive" });
    }
  };

  const handleView = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setViewDialogOpen(true);
    if (inquiry.status === "Unread") {
      handleStatusChange(inquiry._id, "Read");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Unread": return "bg-blue-100 text-blue-700";
      case "Read": return "bg-yellow-100 text-yellow-700";
      case "Replied": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (!authChecked || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl text-foreground">Inquiries</h1>
            <p className="text-muted-foreground mt-1">Messages from customers</p>
          </div>
          <Badge variant="outline" className="text-sm">
            {inquiries.filter(i => i.status === "Unread").length} unread
          </Badge>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : inquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <MessageSquare className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h3 className="font-serif text-xl text-foreground mb-2">No inquiries yet</h3>
            <p className="text-muted-foreground">Customer messages will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div 
                key={inquiry._id}
                className={`bg-white p-6 rounded-lg border ${inquiry.status === "Unread" ? "border-primary/30 bg-primary/5" : "border-border"}`}
                data-testid={`inquiry-${inquiry._id}`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-medium text-foreground">{inquiry.name}</h3>
                          <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                      </div>
                    </div>
                    <h4 className="font-medium text-foreground mt-3">{inquiry.subject}</h4>
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{inquiry.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{formatDate(inquiry.createdAt)}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Select 
                      value={inquiry.status} 
                      onValueChange={(value) => handleStatusChange(inquiry._id, value)}
                    >
                      <SelectTrigger className="w-[120px]" data-testid={`select-status-${inquiry._id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Unread">Unread</SelectItem>
                        <SelectItem value="Read">Read</SelectItem>
                        <SelectItem value="Replied">Replied</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleView(inquiry)}
                      data-testid={`button-view-${inquiry._id}`}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleDelete(inquiry._id)}
                      className="text-destructive hover:bg-destructive/10"
                      data-testid={`button-delete-${inquiry._id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">{selectedInquiry?.subject}</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{selectedInquiry.name}</p>
                  <a 
                    href={`mailto:${selectedInquiry.email}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-border">
                <p className="text-muted-foreground whitespace-pre-wrap">{selectedInquiry.message}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Received: {formatDate(selectedInquiry.createdAt)}
              </p>
              <div className="flex gap-2 pt-2">
                <Button 
                  className="flex-1"
                  onClick={() => {
                    window.location.href = `mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`;
                    handleStatusChange(selectedInquiry._id, "Replied");
                  }}
                  data-testid="button-reply-email"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Reply via Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
