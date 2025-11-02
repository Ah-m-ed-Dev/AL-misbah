"use client";

import { useState } from "react";
export default function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <img
          src="hero.jpg" // ← استبدل باسم الصورة عندك في public
          alt="Laptop hero"
          className="w-full h-[56vh] lg:h-[64vh] object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/60" /> {/* Overlay شفاف */}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-[56vh] lg:h-[64vh]">
        <div className="mt-8 md:mt-0 max-w-2xl flex flex-col items-end">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-snug text-white text-right">
            تعلّم اليوم، لِتقودَّ غدًا
          </h1>
          <p className="mt-3 text-lg text-white/80 text-right">
            تعلّم.. طوِّر.. وحقق نجاحك مع مركز المصباح للتدريب الفني والعمالة
          </p>
          <SearchBar />
        </div>
      </div>
    </section>
  );
}



function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault(); // لمنع إعادة تحميل الصفحة
    if (!query.trim()) return;

    // هنا ضع منطق البحث الحقيقي مثلاً:
    alert(`جاري البحث عن: ${query}`);

    // يمكنك استبدال alert بـ:
    // router.push(`/search?query=${encodeURIComponent(query)}`);
    // أو استدعاء API للبحث عن النتائج
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mt-6 w-full max-w-md"
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن..."
          className="w-full rounded-2xl bg-white/95 shadow-lg focus:outline-none focus:ring-4 focus:ring-[#7b0b4c]/40 px-14 py-4 text-lg placeholder-gray-400"
        />

        <button
          type="submit"
          className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#7b0b4c]"
          aria-label="بحث"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <path
              fill="currentColor"
              d="M10 2a8 8 0 1 1 5.293 13.707l4 4-1.414 1.414-4-4A8 8 0 0 1 10 2Zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
