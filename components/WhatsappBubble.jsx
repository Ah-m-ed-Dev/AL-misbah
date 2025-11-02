"use client";

import { useEffect } from "react";

export default function WhatsappWidget() {
  useEffect(() => {
    // لو الويدجت موجودة بالفعل، لا تعيد تحميلها
    if (window.__ednaLoaded) return;

    // ضع علامة أنه تم التحميل
    window.__ednaLoaded = true;

    // إنشاء عنصر السكريبت
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

    // تشغيل الويدجت عند تحميل السكريبت
    s.onload = () => {
      if (typeof CreateWhatsappChatWidget !== "undefined") {
        CreateWhatsappChatWidget(options);
      }
    };

    document.body.appendChild(s);
  }, []);

  return null;
}
