"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const DICT = {
  AR: {
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    topics: "المواضيع",
    cart: "السلة",
    welcome: "مرحباً",
    logout: "تسجيل خروج",
    newUser: "مستخدم جديد",
    about_title: "من نحن",
    privacy_title: "سياسة الخصوصية",
    contact_title: "تواصل معنا",
    campaigns_title: "حملاتنا الإعلانية",
    add_course: "إضافة دورة",
    courses: "الدورات",
  },
  EN: {
    login: "Login",
    register: "Register",
    topics: "Topics",
    cart: "Cart",
    welcome: "Welcome",
    logout: "Logout",
    newUser: "New User",
    about_title: "About Us",
    privacy_title: "Privacy Policy",
    contact_title: "Contact Us",
    campaigns_title: "Our Campaigns",
    add_course: "Add Course",
    courses: "Courses",
  },
};

const AppContext = createContext();

export function AppProvider({ children }) {
  const [lang, setLang] = useState("AR");
  const [currency, setCurrency] = useState("QAR");

  // تحميل القيم من localStorage
  useEffect(() => {
    const sLang = localStorage.getItem("app_lang");
    const sCur = localStorage.getItem("app_currency");
    if (sLang) setLang(sLang);
    if (sCur) setCurrency(sCur);
  }, []);

  // حفظ القيم وتحديث الاتجاه
  useEffect(() => {
    localStorage.setItem("app_lang", lang);
    localStorage.setItem("app_currency", currency);
    document.documentElement.lang = lang === "EN" ? "en" : "ar";
    document.documentElement.dir = lang === "EN" ? "ltr" : "rtl";
  }, [lang, currency]);

  // تحميل Google Translate
  useEffect(() => {
    if (window.googleTranslateElementInit) return;
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "ar,en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);
  }, []);

  // تبديل اللغة
  const toggleLang = () => {
    const newLang = lang === "AR" ? "EN" : "AR";
    setLang(newLang);

    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = newLang === "AR" ? "ar" : "en";
      select.dispatchEvent(new Event("change"));
    }
  };

  // ترجمة المفاتيح
  const t = (key) => DICT[lang]?.[key] || key;

  // تنسيق العملة
  const formatCurrency = (value) => {
    if (value == null || value === "") return "";
    const num =
      typeof value === "number"
        ? value
        : parseFloat(value.toString().replace(/[^\d.-]/g, "")) || 0;

    return new Intl.NumberFormat(lang === "EN" ? "en-US" : "ar-SA", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        currency,
        setCurrency,
        t,
        formatCurrency,
      }}
    >
      {children}
      {/* عنصر ترجمة Google (مخفي) */}
      <div id="google_translate_element" style={{ display: "none" }}></div>
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
