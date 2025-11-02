"use client";
import React, { useState } from "react";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // تمرير قيمة البحث إلى سكشن الدورات
    const coursesSection = document.getElementById("courses-section");
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth" });
      // تخزين قيمة البحث مؤقتاً لتصفية الدورات
      localStorage.setItem("searchQuery", searchQuery);
    }
  };

  return (
    <section className="relative">
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="Laptop hero"
          className="w-full h-[56vh] lg:h-[64vh] object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/60" /> {/* Overlay شفاف */}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-[56vh] lg:h-[64vh]">
        <div className="mt-8 md:mt-0 max-w-2xl flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-snug text-white mb-4">
            تعلّم اليوم، لِتقودَّ غدًا
          </h1>
          <p className="mt-3 text-lg text-white/80 mb-6">
            تعلّم.. طوِّر.. وحقق نجاحك مع مركز المصباح للتدريب الفني والعمالة
          </p>

          {/* مربع البحث */}
          <form onSubmit={handleSearch} className="w-full max-w-md flex gap-2">
            <input
              type="text"
              placeholder="ابحث عن دورة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-[#7b0b4c]"
            />
            <button
              type="submit"
              className="bg-[#7b0b4c] text-white px-4 py-3 rounded-2xl hover:bg-[#5e0839]"
            >
              بحث
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
