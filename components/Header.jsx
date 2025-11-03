"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../app/context/AppContext";
import { createPortal } from "react-dom";

/* =======================    GlobalAnimations ======================= */
function GlobalAnimations() {
  useEffect(() => {
    const id = "header-anim-css";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
      @keyframes scale-in { from { opacity: 0; transform: scale(0.97) } to { opacity: 1; transform: scale(1) } }
      .animate-fade-in { animation: fade-in .25s ease-out forwards; }
      .animate-scale-in { animation: scale-in .25s ease-out forwards; }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
}

/* =======================    Header ======================= */
export default function Header() {
  const [authMode, setAuthMode] = useState(null);
  const [user, setUser] = useState(null);
  const { lang, t } = useApp();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <header className="sticky top-0 z-40" dir="ltr">
      <GlobalAnimations />

      {/* الأعلى */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-100 relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* شعار الموقع */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/logo1.png"
              alt="AL Misbah Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="hidden sm:block font-extrabold tracking-wide text-[#7b0b4c]">
              مركز المصباح
            </span>
          </Link>

          {/* أزرار التحكم */}
          <div className="flex items-center gap-4">
            <SearchButton />
            <CartButton />

            {/* LangCurrency - زر ثابت بدون تفاعل */}
            <div dir="ltr">
              <LangCurrency />
            </div>
          </div>
        </div>
      </div>

      {/* الشريط الأسفل */}
      <div className="absolute top-16 left-0 w-full bg-white/10 backdrop-blur-sm z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <button className="flex items-center gap-2 text-gray-800 hover:text-[#7b0b4c]">
            <span className="text-sm">{t("topics")}</span>
          </button>

          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <button
                  onClick={() => setAuthMode("login")}
                  className="px-4 py-1.5 rounded-lg border border-[#7b0b4c] text-[#7b0b4c] bg-white/70 backdrop-blur-sm hover:bg-[#7b0b4c] hover:text-white text-sm"
                >
                  {t("login")}
                </button>
                <button
                  onClick={() => setAuthMode("register")}
                  className="px-4 py-1.5 rounded-lg bg-[#7b0b4c] text-white hover:bg-[#5e0839] text-sm"
                >
                  {t("newUser")}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#7b0b4c]">
                  {t("welcome")}، {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                >
                  {t("logout")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {authMode && (
        <LoginModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          setAuthMode={setAuthMode}
          setUser={setUser}
        />
      )}
    </header>
  );
}

/* =======================    SearchButton ======================= */
function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { lang } = useApp();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    localStorage.setItem("searchQuery", query);
    const coursesSection = document.getElementById("courses-section");
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="relative">
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

      {open && (
        <form
          onSubmit={handleSearch}
          className="absolute top-12 left-1/2 -translate-x-1/2
                     bg-white border rounded-lg shadow p-3 flex gap-2 items-center animate-fade-in"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === "AR" ? "ابحث هنا..." : "Search..."}
            className="w-80 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7b0b4c]"
          />
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

/* =======================    CartButton ======================= */
// (يبقى كما هو بدون أي تغيير، لأنك لم تذكر تعديله)
