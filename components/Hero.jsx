"use client";

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

/* =======================
   SearchButton
======================= */
function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(""); // تخزين النص المكتوب
  const { lang } = useApp();

  // تنفيذ عملية البحث
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return alert(lang === "AR" ? "اكتب كلمة للبحث!" : "Type something to search!");
    // مثال: الانتقال لصفحة نتائج البحث
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <div className="relative">
      {/* زر العدسة */}
      <button
        className="p-2 rounded-full hover:bg-gray-100"
        aria-label="بحث"
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-600">
          <path
            fill="currentColor"
            d="M10 2a8 8 0 1 1 5.293 13.707l4 4-1.414 1.414-4-4A8 8 0 0 1 10 2Zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"
          />
        </svg>
      </button>

      {/* صندوق البحث */}
      {open && (
        <form
          onSubmit={handleSearch}
          className={`absolute top-12 ${
            lang === "AR" ? "left-0" : "right-0"
          } bg-white border rounded-lg shadow p-3 flex gap-2 items-center animate-fade-in`}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === "AR" ? "ابحث هنا..." : "Search..."}
            className="w-64 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7b0b4c]"
          />

          {/* ✅ زر البحث */}
          <button
            type="submit"
            className="bg-[#7b0b4c] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#5e0839]"
          >
            {lang === "AR" ? "بحث" : "Search"}
          </button>
        </form>
      )}
    </div>
  );
}
