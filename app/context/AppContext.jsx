"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * AppContext
 * يوفر: lang, setLang, currency, setCurrency, t(key), formatCurrency(number)
 */

const AppContext = createContext();

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
    // أضف مفاتيح إضافية كما تريد...
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
    // أضف مفاتيح إضافية كما تريد...
  },
};

export function AppProvider({ children }) {
  const [lang, setLang] = useState("AR"); // "AR" | "EN"
  const [currency, setCurrency] = useState("QAR"); // "QAR" | "USD"

  useEffect(() => {
    // تحميل محفوظات المستخدم
    const sLang = localStorage.getItem("app_lang");
    const sCur = localStorage.getItem("app_currency");
    if (sLang) setLang(sLang);
    if (sCur) setCurrency(sCur);
  }, []);

  useEffect(() => {
    localStorage.setItem("app_lang", lang);
    localStorage.setItem("app_currency", currency);

    // ضبط attributes أساسية للصفحة
    document.documentElement.lang = lang === "EN" ? "en" : "ar";
    document.documentElement.dir = lang === "EN" ? "ltr" : "rtl";
  }, [lang, currency]);

  const t = (key) => {
    return (DICT[lang] && DICT[lang][key]) || key;
  };

  const formatCurrency = (value) => {
    if (value == null || value === "") return "";
    const num = typeof value === "number" ? value : parseFloat(value.toString().replace(/[^\d.-]/g, "")) || 0;
    // QAR -> ريال قطري, USD -> $
    if (currency === "QAR") {
      return new Intl.NumberFormat(lang === "EN" ? "en-QA" : "ar-QA", {
        style: "currency",
        currency: "QAR",
        maximumFractionDigits: 0,
      }).format(num);
    } else {
      return new Intl.NumberFormat(lang === "EN" ? "en-US" : "ar-SA", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(num);
    }
  };

  return (
    <AppContext.Provider value={{ lang, setLang, currency, setCurrency, t, formatCurrency }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
