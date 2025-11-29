import { Loader2 } from "lucide-react";
import logoImg from "@assets/WhatsApp Image 2025-11-28 at 10.40.17 PM-modified_1764359891804.png";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <img
            src={logoImg}
            alt="Aurora Flowers"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain animate-pulse"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary animate-spin" />
          </div>
        </div>
        <div className="text-center">
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">
            Aurora Flowers
          </h2>
          <p className="text-sm text-muted-foreground">
            Loading beautiful blooms...
          </p>
        </div>
      </div>
    </div>
  );
}
