"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../app/context/AppContext";
import { createPortal } from "react-dom";

/* ======================= GlobalAnimations ======================= */
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

/* ======================= Header ======================= */
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

      {/* Top Bar */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-100 relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
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

          {/* Controls */}
          <div className="flex items-center gap-4">
            <SearchButton />
            <CartButton />
            <div dir="ltr">
              <LangCurrency />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
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

/* ======================= SearchButton ======================= */
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
        🔍
      </button>

      {open && (
        <form
          onSubmit={handleSearch}
          className="absolute top-12 left-1/2 -translate-x-1/2 bg-white border rounded-lg shadow p-3 flex gap-2 items-center animate-fade-in"
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

/* ======================= CartButton ======================= */
function CartButton() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const { formatCurrency, t } = useApp();

  useEffect(() => {
    const loadCart = () =>
      setCart(JSON.parse(localStorage.getItem("cart") || "[]"));

    loadCart();
    window.addEventListener("storage", loadCart);
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("storage", loadCart);
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const totalCount = cart.length;
  const totalPrice = cart.reduce(
    (sum, c) =>
      sum + (parseFloat((c.price || "0").toString().replace(/[^\d.]/g, "")) || 0),
    0
  );

  const handleRemove = (id) => {
    const updated = cart.filter((c) => c.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleWhatsAppOrder = () => {
    if (!cart.length) return alert(t("cart") + " فارغة!");
    const message =
      "مرحباً! أود طلب الدورات التالية:\n\n" +
      cart.map((c, i) => `${i + 1}- ${c.title} (${c.price || "0"})`).join("\n") +
      `\n\n${t("cart")}: ${formatCurrency(totalPrice)}`;
    window.open(
      "https://wa.me/+97472041794?text=" + encodeURIComponent(message),
      "_blank"
    );
  };

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-scale-in">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        <h3 className="font-bold text-[#7b0b4c] mb-4 text-lg">{t("cart")}</h3>

        {cart.length === 0 ? (
          <p className="text-sm text-gray-500">{t("cart")} فارغة.</p>
        ) : (
          <>
            <ul className="space-y-2 mb-3 max-h-64 overflow-y-auto">
              {cart.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between border-b pb-1 text-sm"
                >
                  <div>
                    <div className="font-medium">{c.title}</div>
                    {c.category && (
                      <div className="text-xs text-gray-500">{c.category}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#7b0b4c] font-semibold">
                      {formatCurrency(c.price)}
                    </span>
                    <button
                      onClick={() => handleRemove(c.id)}
                      className="text-gray-400 hover:text-red-500 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-between text-sm font-medium mb-4">
              <span>الإجمالي:</span>
              <span className="text-[#7b0b4c]">{formatCurrency(totalPrice)}</span>
            </div>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-[#25D366] text-white py-2 rounded-lg text-sm font-bold hover:bg-[#1eb15a]"
            >
              طلب عبر واتساب
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative">
      <button
        className="relative p-2 rounded-full hover:bg-gray-100"
        aria-label="السلة"
        onClick={() => setOpen(true)}
      >
        🛒
        {totalCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#7b0b4c] text-white text-xs rounded-full px-1.5">
            {totalCount}
          </span>
        )}
      </button>

      {open && typeof window !== "undefined" && createPortal(modal, document.body)}
    </div>
  );
}

/* ======================= LangCurrency (عرض فقط) ======================= */
function LangCurrency() {
  const { lang, currency } = useApp(); // إزالة setLang و setCurrency لأننا لن نغيرهما
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const currencies = {
    USD: { label: "Dollar", flag: "🇺🇸" },
    QAR: { label: "Riyal", flag: "🇶🇦" },
  };

  const languages = {
    AR: { label: "العربية", flag: "🇸🇦" },
    EN: { label: "English", flag: "🇬🇧" },
  };

  return (
    <div className="flex items-center gap-3 text-sm" dir="ltr">
      {/* العملات */}
      <div className="relative">
        <button
          className="flex items-center gap-2 px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50"
          onClick={() => {
            setCurrencyOpen(!currencyOpen);
            setLangOpen(false);
          }}
        >
          <span>{currencies[currency]?.flag}</span>
          <span>{currencies[currency]?.label}</span>
        </button>
        {currencyOpen && (
          <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow text-sm z-10">
            {Object.entries(currencies).map(([key, val]) => (
              <button
                key={key}
                onClick={(e) => e.preventDefault()} // منع أي تأثير فعلي
                className="block px-4 py-2 hover:bg-gray-100 w-full text-right flex items-center gap-2 cursor-default"
              >
                <span>{val.flag}</span> {val.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* اللغات */}
      <div className="relative">
        <button
          className="flex items-center gap-2 px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50"
          onClick={() => {
            setLangOpen(!langOpen);
            setCurrencyOpen(false);
          }}
        >
          <span>{languages[lang]?.flag}</span>
          <span>{languages[lang]?.label}</span>
        </button>
        {langOpen && (
          <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow text-sm z-10">
            {Object.entries(languages).map(([key, val]) => (
              <button
                key={key}
                onClick={(e) => e.preventDefault()} // منع أي تأثير فعلي
                className="block px-4 py-2 hover:bg-gray-100 w-full text-right flex items-center gap-2 cursor-default"
              >
                <span>{val.flag}</span> {val.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


/* ======================= LoginModal ======================= */
function LoginModal({ mode, onClose, setAuthMode, setUser }) {
  const router = useRouter();

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = [
      { name: "المدير العام", email: "alfathhamid599@gmail.com", password: "123456", role: "general_manager" },
      { name: "المدير التنفيذي", email: "fayhaalfatihhamida@gmail.com", password: "123456", role: "executive" },
      { name: "مدير الموارد البشرية", email: "atag4052@gmail.com", password: "123456", role: "hr" },
    ];

    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);
      onClose();
      router.push("/dashboard");
    } else {
      alert("❌ البريد الإلكتروني أو كلمة المرور غير صحيحة!");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-scale-in text-right"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-center mb-4 text-[#7b0b4c]">
          {mode === "login" ? "تسجيل الدخول" : "إنشاء حساب جديد"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">كلمة المرور</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#7b0b4c] text-white py-2 rounded-lg font-medium hover:bg-[#5e0839]"
          >
            {mode === "login" ? "تسجيل الدخول" : "تسجيل"}
          </button>
        </form>
      </div>
    </div>
  );
}
