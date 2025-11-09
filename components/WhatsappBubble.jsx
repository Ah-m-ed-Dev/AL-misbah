"use client";
import { useEffect, useRef } from "react";

export default function WhatsappBubble() {
  const containerRef = useRef(null);
  const lastScroll = useRef(window.scrollY);

  useEffect(() => {
    if (window.__ednaLoaded) return;
    window.__ednaLoaded = true;

    // إنشاء Shadow DOM
    const host = document.createElement("div");
    containerRef.current = host;
    document.body.appendChild(host);

    const shadow = host.attachShadow({ mode: "open" });

    // إنشاء الويدجت
    const widgetWrapper = document.createElement("div");
    widgetWrapper.setAttribute(
      "style",
      `
      all: initial;
      direction: ltr;
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    `
    );
    shadow.appendChild(widgetWrapper);

    // زر إغلاق
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "×";
    closeBtn.setAttribute(
      "style",
      `
      position: absolute;
      top: 5px;
      right: 5px;
      background: transparent;
      border: none;
      font-size: 20px;
      cursor: pointer;
      z-index: 10;
    `
    );
    widgetWrapper.appendChild(closeBtn);
    closeBtn.addEventListener("click", () => {
      widgetWrapper.style.display = "none";
    });

    // تحميل سكربت Edna
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
        position: "left",
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

        // تعديل اتجاه iframe داخل الويدجت
        const fixDirection = () => {
          const iframes = widgetWrapper.querySelectorAll("iframe");
          iframes.forEach((iframe) => {
            try {
              const doc =
                iframe.contentDocument || iframe.contentWindow.document;
              if (doc && doc.body) {
                doc.body.dir = "ltr";
                doc.body.style.direction = "ltr";
                doc.body.style.textAlign = "left";
              }
            } catch (e) {}
          });
        };
        const interval = setInterval(fixDirection, 1000);
        setTimeout(() => clearInterval(interval), 10000);
      }
    };

    widgetWrapper.appendChild(s);

    // مراقبة السحب لتغيير الوضع بين كامل/مضغوط
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollingDown = currentScroll > lastScroll.current + 10;
      const scrollingUp = currentScroll < lastScroll.current - 10;

      if (scrollingDown) {
        // الوضع المضغوط
        widgetWrapper.style.width = "60px";
        widgetWrapper.style.height = "60px";
        widgetWrapper.style.borderRadius = "50%";
        widgetWrapper.style.overflow = "hidden";
        widgetWrapper.style.opacity = "0.8";
      } else if (scrollingUp) {
        // العودة للوضع الكامل
        widgetWrapper.style.width = "";
        widgetWrapper.style.height = "";
        widgetWrapper.style.borderRadius = "";
        widgetWrapper.style.overflow = "";
        widgetWrapper.style.opacity = "1";
      }

      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    // إخفاء عند الضغط خارج
    const handleClickOutside = (e) => {
      if (!widgetWrapper.contains(e.target)) {
        widgetWrapper.style.display = "none";
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      if (containerRef.current) containerRef.current.remove();
    };
  }, []);

  return null;
}
