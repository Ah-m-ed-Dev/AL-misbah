"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// القاموس اللغوي
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

  useEffect(() => {
    const sLang = localStorage.getItem("app_lang");
    const sCur = localStorage.getItem("app_currency");
    if (sLang) setLang(sLang);
    if (sCur) setCurrency(sCur);
  }, []);

  useEffect(() => {
    localStorage.setItem("app_lang", lang);
    localStorage.setItem("app_currency", currency);
    document.documentElement.lang = lang === "EN" ? "en" : "ar";
    document.documentElement.dir = lang === "EN" ? "ltr" : "rtl";
  }, [lang, currency]);

  const t = (key) => (DICT[lang] && DICT[lang][key]) || key;

  const formatCurrency = (value) => {
    if (value == null || value === "") return "";
    const num = typeof value === "number" ? value : parseFloat(value.toString().replace(/[^\d.-]/g, "")) || 0;
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
