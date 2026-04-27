import { useI18n, Language } from "@/lib/i18n";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  className?: string;
  variant?: "icon" | "full";
}

export default function LanguageToggle({ className = "", variant = "full" }: LanguageToggleProps) {
  const { lang, setLang } = useI18n();

  const toggle = () => {
    setLang(lang === "en" ? "ar" : "en");
  };

  if (variant === "icon") {
    return (
      <button
        onClick={toggle}
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors text-xs font-bold ${className}`}
        data-testid="button-language-toggle"
        aria-label="Switch Language"
      >
        {lang === "en" ? "AR" : "EN"}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-foreground/80 hover:text-primary transition-colors ${className}`}
      data-testid="button-language-toggle"
      aria-label="Switch Language"
    >
      <Globe className="w-4 h-4" />
      {lang === "en" ? "عربي" : "EN"}
    </button>
  );
}
