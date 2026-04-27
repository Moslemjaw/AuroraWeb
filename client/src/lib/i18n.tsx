import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "ar";

// All translations for the website
const translations = {
  // ===== Navigation =====
  nav: {
    shop: { en: "Shop", ar: "تسوق" },
    aboutUs: { en: "About Us", ar: "من نحن" },
    contact: { en: "Contact", ar: "تواصل معنا" },
    cart: { en: "Cart", ar: "السلة" },
    menu: { en: "Menu", ar: "القائمة" },
    viewCart: { en: "View Cart", ar: "عرض السلة" },
    brand: { en: "Aurora Flowers", ar: "أورورا فلاور" },
  },

  // ===== Home Page =====
  home: {
    est: { en: "EST. 2024", ar: "تأسست ٢٠٢٤" },
    heroTitle1: { en: "Timeless", ar: "جمال" },
    heroTitle2: { en: "Botanicals.", ar: "لا يذبل." },
    heroDescription: {
      en: "Handcrafted fabric flowers that last forever. Beautiful, sustainable arrangements for your home.",
      ar: "زهور قماشية مصنوعة يدوياً تدوم للأبد. تنسيقات جميلة ومستدامة لمنزلك.",
    },
    viewCollections: { en: "View Collections", ar: "عرض المجموعات" },
    customOrders: { en: "Custom Orders", ar: "طلبات مخصصة" },
    shopTheLook: { en: "Shop The Look", ar: "تسوق التصاميم" },
    curatedCollections: { en: "Curated Collections", ar: "مجموعات مختارة" },
    noProducts: { en: "No products available", ar: "لا توجد منتجات" },
    bespokeService: { en: "Custom Service", ar: "خدمة مخصصة" },
    designYourOwn: { en: "Design Your Own", ar: "صمم تنسيقك" },
    masterpiece: { en: "Masterpiece.", ar: "الخاص." },
    customDescription: {
      en: "Create your own unique arrangement. Pick your preferences and our team will craft it just for you.",
      ar: "اصنع تنسيقك الفريد. اختر ما تفضله وفريقنا سيصنعه خصيصاً لك.",
    },
    step1: { en: "Select Quantity", ar: "اختر الكمية" },
    step2: { en: "Choose Palette", ar: "اختر الألوان" },
    step3: { en: "We Create", ar: "نصنعها لك" },
    clientFavorites: { en: "Client Favorites", ar: "الأكثر طلباً" },
    bestSellers: { en: "Best Sellers", ar: "الأكثر مبيعاً" },
    viewAllFavorites: { en: "View All Favorites", ar: "عرض الكل" },
    copyright: {
      en: "© 2025 Aurora Flowers. All rights reserved.",
      ar: "© ٢٠٢٥ أورورا فلاور. جميع الحقوق محفوظة.",
    },
    developedBy: { en: "Developed By", ar: "تطوير" },
  },

  // ===== About Page =====
  about: {
    ourStory: { en: "Our Story", ar: "قصتنا" },
    heroTitle: { en: "Crafting beauty that", ar: "نصنع جمالاً" },
    heroAccent: { en: "lasts forever.", ar: "يدوم للأبد." },
    artTitle: { en: "The Art of Fabric Floristry", ar: "فن صناعة الزهور القماشية" },
    artParagraph1: {
      en: "Aurora Flowers started with a simple idea: flowers shouldn't fade after a week. We make them last a lifetime.",
      ar: "بدأت أورورا فلاورز بفكرة بسيطة: الزهور لا يجب أن تذبل بعد أسبوع. نحن نجعلها تدوم مدى الحياة.",
    },
    artParagraph2: {
      en: "Every petal is individually cut, dyed, and shaped by hand in our Kuwait studio. We use premium fabrics like silk, organza, and velvet to create textures that look and feel like real flowers.",
      ar: "كل بتلة يتم قصها وصبغها وتشكيلها يدوياً في مرسمنا بالكويت. نستخدم أقمشة فاخرة مثل الحرير والأورجانزا والمخمل لصنع تنسيقات تشبه الزهور الحقيقية.",
    },
    ourValues: { en: "Our Values", ar: "قيمنا" },
    sustainability: { en: "Sustainability", ar: "الاستدامة" },
    sustainabilityDesc: {
      en: "Using eco-friendly materials and reducing waste through upcycling.",
      ar: "استخدام مواد صديقة للبيئة وتقليل الهدر من خلال إعادة التدوير.",
    },
    craftsmanship: { en: "Craftsmanship", ar: "الحرفية" },
    craftsmanshipDesc: {
      en: "Combining traditional flower-making techniques with modern design.",
      ar: "دمج تقنيات صناعة الزهور التقليدية مع التصميم الحديث.",
    },
    timelessness: { en: "Timelessness", ar: "الخلود" },
    timelessnessDesc: {
      en: "Creating pieces that can be treasured for generations.",
      ar: "صنع قطع يمكن الاحتفاظ بها لأجيال.",
    },
  },

  // ===== Contact Page =====
  contact: {
    getInTouch: { en: "Get in Touch", ar: "تواصل معنا" },
    heroTitle: {
      en: "We'd love to hear from you.",
      ar: "يسعدنا تواصلك معنا.",
    },
    heroDescription: {
      en: "Have a question about a custom order, shipping, or just want to say hello? We're here to help.",
      ar: "عندك سؤال عن طلب مخصص أو التوصيل أو تبي تقول مرحبا؟ نحن هنا لمساعدتك.",
    },
    locationLabel: { en: "Kuwait City, Kuwait", ar: "مدينة الكويت، الكويت" },
    name: { en: "Name", ar: "الاسم" },
    namePlaceholder: { en: "Jane Doe", ar: "الاسم الكامل" },
    email: { en: "Email", ar: "البريد الإلكتروني" },
    emailPlaceholder: { en: "jane@example.com", ar: "example@email.com" },
    subject: { en: "Subject", ar: "الموضوع" },
    subjectPlaceholder: { en: "Custom Order Inquiry", ar: "استفسار عن طلب مخصص" },
    message: { en: "Message", ar: "الرسالة" },
    messagePlaceholder: {
      en: "Tell us about your dream bouquet...",
      ar: "أخبرنا عن باقة أحلامك...",
    },
    sendMessage: { en: "Send Message", ar: "إرسال الرسالة" },
    sending: { en: "Sending...", ar: "جاري الإرسال..." },
    thankYou: { en: "Thank you!", ar: "شكراً لك!" },
    messageSent: {
      en: "Your message has been sent. We'll get back to you soon.",
      ar: "تم إرسال رسالتك. سنتواصل معك قريباً.",
    },
    sendAnother: { en: "Send Another Message", ar: "إرسال رسالة أخرى" },
    fillAllFields: { en: "Please fill in all fields", ar: "يرجى تعبئة جميع الحقول" },
    msgSentTitle: { en: "Message sent!", ar: "تم الإرسال!" },
    msgSentDesc: { en: "We'll get back to you soon.", ar: "سنتواصل معك قريباً." },
    failedToSend: { en: "Failed to send message", ar: "فشل إرسال الرسالة" },
    tryAgain: { en: "Please try again", ar: "يرجى المحاولة مرة أخرى" },
    tryAgainLater: { en: "Please try again later", ar: "يرجى المحاولة لاحقاً" },
  },

  // ===== Cart Page =====
  cart: {
    continueShopping: { en: "Continue Shopping", ar: "متابعة التسوق" },
    yourCart: { en: "Your Shopping Cart", ar: "سلة التسوق" },
    emptyCart: { en: "Your cart is empty", ar: "سلتك فارغة" },
    emptyCartDesc: {
      en: "Looks like you haven't added any beautiful blooms yet.",
      ar: "يبدو أنك لم تضف أي زهور جميلة بعد.",
    },
    browseCollection: { en: "Browse Collection", ar: "تصفح المجموعة" },
    customOrder: { en: "Custom Order", ar: "طلب مخصص" },
    remove: { en: "Remove", ar: "إزالة" },
    colors: { en: "Colors", ar: "الألوان" },
    presentation: { en: "Presentation", ar: "التغليف" },
    addOns: { en: "Add-ons", ar: "الإضافات" },
    orderSummary: { en: "Order Summary", ar: "ملخص الطلب" },
    items: { en: "Items", ar: "المنتجات" },
    shipping: { en: "Shipping", ar: "التوصيل" },
    free: { en: "Free", ar: "مجاناً" },
    total: { en: "Total", ar: "الإجمالي" },
    proceedToCheckout: { en: "Proceed to Checkout", ar: "إتمام الشراء" },
  },

  // ===== Checkout Page =====
  checkout: {
    backToCart: { en: "Back to Cart", ar: "العودة للسلة" },
    checkout: { en: "Checkout", ar: "إتمام الشراء" },
    customerInfo: { en: "Customer Information", ar: "معلومات العميل" },
    fullName: { en: "Full Name *", ar: "الاسم الكامل *" },
    emailLabel: { en: "Email", ar: "البريد الإلكتروني" },
    phone: { en: "Phone *", ar: "رقم الهاتف *" },
    deliveryAddress: { en: "Delivery Address", ar: "عنوان التوصيل" },
    streetAddress: { en: "Street Address *", ar: "العنوان التفصيلي *" },
    cityArea: { en: "City / Area *", ar: "المدينة / المنطقة *" },
    giftOptions: { en: "Gift Options", ar: "خيارات الهدايا" },
    isGift: {
      en: "This order is a gift (deliver to someone else)",
      ar: "هذا الطلب هدية (توصيل لشخص آخر)",
    },
    recipientName: { en: "Recipient Name", ar: "اسم المستلم" },
    giftMessage: { en: "Gift Message", ar: "رسالة الهدية" },
    giftMessagePlaceholder: {
      en: "Write a personal message for the recipient...",
      ar: "اكتب رسالة شخصية للمستلم...",
    },
    paymentMethod: { en: "Payment Method", ar: "طريقة الدفع" },
    cod: { en: "Cash on Delivery", ar: "الدفع عند الاستلام" },
    codDesc: { en: "Pay when you receive your order", ar: "ادفع عند استلام طلبك" },
    whatsappPay: { en: "Pay via WhatsApp", ar: "الدفع عبر واتساب" },
    whatsappPayDesc: {
      en: "Our team will contact you to complete the payment",
      ar: "فريقنا سيتواصل معك لإتمام الدفع",
    },
    creditCard: { en: "Credit/Debit Card", ar: "بطاقة ائتمان/خصم" },
    comingSoon: { en: "Coming Soon", ar: "قريباً" },
    creditCardDesc: {
      en: "Online payment will be available soon",
      ar: "الدفع الإلكتروني سيتوفر قريباً",
    },
    additionalNotes: { en: "Additional Notes", ar: "ملاحظات إضافية" },
    notesPlaceholder: {
      en: "Any special instructions for your order...",
      ar: "أي تعليمات خاصة لطلبك...",
    },
    subtotal: { en: "Subtotal", ar: "المجموع الفرعي" },
    qty: { en: "Qty", ar: "الكمية" },
    placeOrder: { en: "Place Order", ar: "تأكيد الطلب" },
    placingOrder: { en: "Placing Order...", ar: "جاري تأكيد الطلب..." },
    thankYou: { en: "Thank You!", ar: "شكراً لك!" },
    orderPlaced: {
      en: "Your order has been placed successfully.",
      ar: "تم تقديم طلبك بنجاح.",
    },
    orderId: { en: "Order ID", ar: "رقم الطلب" },
    whatsappNote: {
      en: "Our customer service team will contact you via WhatsApp to complete the payment.",
      ar: "فريق خدمة العملاء سيتواصل معك عبر واتساب لإتمام الدفع.",
    },
    cartEmpty: { en: "Your cart is empty", ar: "سلتك فارغة" },
    addItemsFirst: {
      en: "Add some beautiful flowers to your cart first.",
      ar: "أضف بعض الزهور الجميلة لسلتك أولاً.",
    },
    browseProducts: { en: "Browse Products", ar: "تصفح المنتجات" },
    cartEmptyError: { en: "Cart is empty", ar: "السلة فارغة" },
    addItemsErrorDesc: {
      en: "Please add items to your cart before checkout.",
      ar: "يرجى إضافة منتجات لسلتك قبل إتمام الشراء.",
    },
    orderSuccess: { en: "Order placed successfully!", ar: "تم تأكيد الطلب بنجاح!" },
    orderReceivedDesc: {
      en: "Your order has been received.",
      ar: "تم استلام طلبك.",
    },
    error: { en: "Error", ar: "خطأ" },
    orderFailed: {
      en: "Failed to place order. Please try again.",
      ar: "فشل في تأكيد الطلب. يرجى المحاولة مرة أخرى.",
    },
  },

  // ===== Product Detail Page =====
  product: {
    backToCollection: { en: "Back to Collection", ar: "العودة للمجموعة" },
    addToCart: { en: "Add to Cart", ar: "أضف للسلة" },
    addedToCart: { en: "Added to cart", ar: "تمت الإضافة للسلة" },
    addedDesc: { en: "added to your cart", ar: "تمت إضافتها لسلتك" },
    handmade: { en: "Handmade to order", ar: "مصنوعة يدوياً حسب الطلب" },
    lifetime: { en: "Lifetime durability", ar: "تدوم مدى الحياة" },
    giftWrapping: { en: "Gift wrapping included", ar: "تغليف هدايا مجاني" },
    viewDetails: { en: "View Details", ar: "عرض التفاصيل" },
  },

  // ===== Custom Order Form =====
  customForm: {
    startProject: { en: "Start Your Project", ar: "ابدأ مشروعك" },
    configureBelow: {
      en: "Configure your arrangement below.",
      ar: "صمم تنسيقك أدناه.",
    },
    flowerCount: { en: "Flower Count", ar: "عدد الزهور" },
    selectQuantity: { en: "Select quantity", ar: "اختر الكمية" },
    colorPalette: { en: "Color Palette", ar: "لوحة الألوان" },
    selectMultiple: { en: "(select multiple)", ar: "(اختر أكثر من لون)" },
    presentation: { en: "Presentation", ar: "التغليف" },
    addOnsOptional: { en: "Add-ons", ar: "الإضافات" },
    optional: { en: "(optional)", ar: "(اختياري)" },
    included: { en: "Included", ar: "مشمول" },
    noneSelected: { en: "None selected", ar: "لم يتم الاختيار" },
    selected: { en: "selected", ar: "مختار" },
    flowers: { en: "flowers", ar: "زهرة" },
    each: { en: "each", ar: "للواحدة" },
    colorUpgrade: { en: "Color upgrade", ar: "ترقية اللون" },
    perFlower: { en: "/flower", ar: "/زهرة" },
    total: { en: "Total", ar: "الإجمالي" },
    addToCart: { en: "Add to Cart", ar: "أضف للسلة" },
    selectColorError: {
      en: "Please select at least one color",
      ar: "يرجى اختيار لون واحد على الأقل",
    },
    selectPresentationError: {
      en: "Please select a presentation style",
      ar: "يرجى اختيار نوع التغليف",
    },
    addedToCartTitle: { en: "Added to Cart!", ar: "تمت الإضافة!" },
    addedToCartDesc: {
      en: "Your custom arrangement has been added to your cart.",
      ar: "تم إضافة تنسيقك المخصص إلى سلتك.",
    },
    customBouquet: { en: "Custom Bouquet", ar: "باقة مخصصة" },
  },

  // ===== Loading & Misc =====
  loading: {
    loadingBlooms: { en: "Loading beautiful blooms...", ar: "جاري تحميل الزهور..." },
  },
  notFound: {
    title: { en: "404 Page Not Found", ar: "٤٠٤ الصفحة غير موجودة" },
    description: {
      en: "The page you're looking for doesn't exist.",
      ar: "الصفحة التي تبحث عنها غير موجودة.",
    },
  },
} as const;

// Type helpers
type TranslationValue = { en: string; ar: string };
type TranslationSection = Record<string, TranslationValue>;
type Translations = typeof translations;

// Context
type I18nContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
  dir: "ltr" | "rtl";
  isRTL: boolean;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("aurora-lang") as Language) || "en";
    }
    return "en";
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("aurora-lang", newLang);
  };

  // Apply dir and lang to document
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const dir = lang === "ar" ? "rtl" : "ltr";
  const isRTL = lang === "ar";

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations, dir, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

// Helper to get text for current language
export function useT() {
  const { lang, t } = useI18n();

  // Returns a getter function: pass a translation object { en: "...", ar: "..." }
  const getText = (val: { en: string; ar: string }) => val[lang];

  /**
   * Picks the Arabic or English field from a database object.
   * Usage: localizeField(product, 'title', 'titleAr')  
   *   → returns titleAr when lang=ar (if it exists), otherwise title
   */
  const localizeField = (
    obj: Record<string, any>,
    enField: string,
    arField: string
  ): string => {
    if (lang === "ar" && obj[arField]) return obj[arField];
    return obj[enField] || "";
  };

  return { getText, lang, t, localizeField };
}
