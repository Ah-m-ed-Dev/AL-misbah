"use client";
import { useState } from "react";

export default function HeroSection() {
  const [bg, setBg] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBg(URL.createObjectURL(file)); // يحول الصورة اللي رفعتها لخلفية
    }
  };

  return (
    <section
      className="relative h-[80vh] flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${bg || "/default-hero.jpg"})`, // لو مفيش صورة مرفوعة يستعمل الافتراضية
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* طبقة ضبابية */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* المحتوى */}
      <div className="relative z-10 text-center space-y-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#7b0b4c] drop-shadow-lg animate-pulse">
          ✨ مرحبًا بك في مركز المصباح ✨
        </h1>
        <p className="text-lg sm:text-xl font-medium text-white/90">
          غيّر خلفية الهيرو من جهازك مباشرة 🖼️
        </p>

        {/* زر رفع صورة */}
        <label className="inline-block mt-4 px-5 py-2 rounded-2xl bg-[#7b0b4c] hover:bg-[#5e0839] transition text-white cursor-pointer shadow-lg">
          اختر صورة
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </section>
  );
}
