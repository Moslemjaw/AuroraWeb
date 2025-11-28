export const config = {
  siteName: import.meta.env.VITE_SITE_NAME || "Aurora Flowers",
  
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || "auroraflowers.kw@gmail.com",
    phone: import.meta.env.VITE_CONTACT_PHONE || "+965 51544913",
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "96551544913",
  },
  
  social: {
    instagram: import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/auroraflowers.kw",
    tiktok: import.meta.env.VITE_TIKTOK_URL || "https://www.tiktok.com/@auroraflowers.kw",
    whatsapp: `https://api.whatsapp.com/send/?phone=${import.meta.env.VITE_WHATSAPP_NUMBER || "96551544913"}&text&type=phone_number&app_absent=0`,
  },
  
  currency: {
    code: import.meta.env.VITE_CURRENCY_CODE || "KWD",
    symbol: import.meta.env.VITE_CURRENCY_SYMBOL || "K.D.",
  },
  
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || "",
  },
};
