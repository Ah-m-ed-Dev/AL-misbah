"use client";

import "./globals.css";
import { Cairo } from "next/font/google";
import { AppProvider } from "./context/AppContext"; // ✅ استيراد الكونتكست

// استدعاء الخط
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "700"], // الأوزان الممكن تختارها
});

export const metadata = {
  title: "مركز المصباح",
  description: "أكاديمية تدريب متكاملة لتطوير المهارات",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body className={`${cairo.className} bg-white text-gray-900`}>
        {/* ✅ تغليف التطبيق داخل AppProvider */}
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
