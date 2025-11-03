"use client";
import { useEffect } from "react";

export default function WhatsappBubble() {
  useEffect(() => {
    // تأكد من عدم تكرار تحميل الويدجت
    if (window.__ednaLoaded) return;
    window.__ednaLoaded = true;

    // إنشاء السكربت الخارجي
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src =
      "https://edna.io/wp-content/plugins/whatsapp-widget-generator/js/generator.js?96996";

    const options = {
      host: "https://edna.io",
      enabled: true,
      chatButtonSetting: {
        backgroundColor: "#22c55e",
        ctaText: "Contact us",
        icon: "whatsapp",
        position: "right",
      },
      brandSetting: {
        backgroundColor: "#7b0b4c",
        brandImg: "https://i.postimg.cc/c1fVxG4K/logo1.png",
        brandName: "Al misbah Center",
        brandSubTitle: "Learn to Lead",
        ctaText: "Start Chat",
        phoneNumber: "97472041794",
        welcomeText: "مرحباً بك في مركز المصباح! ",
      },
    };

    s.onload = () => {
      if (typeof CreateWhatsappChatWidget !== "undefined") {
        CreateWhatsappChatWidget(options);

        // 👇 نتحقق ونعدل الاتجاه داخل iframe
        const fixDirection = () => {
          const iframes = document.querySelectorAll("iframe");
          iframes.forEach((iframe) => {
            try {
              const doc =
                iframe.contentDocument || iframe.contentWindow.document;
              if (doc && doc.body) {
                // تثبيت الاتجاه من اليسار لليمين
                doc.body.dir = "ltr";
                doc.body.style.direction = "ltr";
                doc.body.style.textAlign = "left";
              }
            } catch (e) {
              // تجاهل الأخطاء في حالة cross-origin
            }
          });
        };

        // نحاول عدة مرات لأن الويدجت أحياناً تتأخر في التحميل
        const interval = setInterval(fixDirection, 1000);
        setTimeout(() => clearInterval(interval), 10000);
      }
    };

    document.body.appendChild(s);
  }, []);

  return null;
}
