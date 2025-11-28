import { useState } from "react";
import { useLocation } from "wouter";
import { useAdmin } from "@/lib/admin-context";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/WhatsApp Image 2025-11-28 at 10.40.17 PM-modified_1764359891804.png";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { login } = useAdmin();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await login(password);
      setLocation("/admin/dashboard");
    } catch (error: any) {
      setError(error.message || "Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <img src={logoImg} alt="Logo" className="w-16 h-16 object-contain mb-4" />
          <h1 className="font-serif text-3xl text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground mt-2">Please authenticate to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 bg-white p-8 rounded-lg shadow-lg border border-border">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
            <input 
              type="password" 
              className="w-full border border-input rounded-md px-3 py-2 focus:outline-none focus:border-primary transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          
          <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
            Login to Dashboard
          </Button>
        </form>
      </div>
    </div>
  );
}
