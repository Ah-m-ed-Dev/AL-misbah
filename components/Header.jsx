"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* أنيميشن عامة */
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

export default function Header() {
  const [authMode, setAuthMode] = useState(null); // "login" | "register"
  const [user, setUser] = useState(null); // حالة المستخدم

  const handleLogout = () => setUser(null);

  return (
    <header className="sticky top-0 z-40">
      <GlobalAnimations />

      {/* ✅ الشريط الأبيض الأساسي */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-100 relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* الشعار */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#7b0b4c]">
              <path d="M12 2l9 5-9 5-9-5 9-5Zm0 7l9 5-9 5-9-5 9-5Z" />
            </svg>
            <span className="hidden sm:block font-extrabold tracking-wide text-[#7b0b4c]">
              مركز المصباح
            </span>
          </Link>

          {/* البحث + السلة + اللغة والعملة */}
          <div className="flex items-center gap-4">
            <SearchButton />
            <CartButton />
            <LangCurrency />
          </div>
        </div>
      </div>

      {/* ✅ الشريط الثاني الشفاف */}
      <div className="absolute top-16 left-0 w-full bg-white/10 backdrop-blur-sm z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          {/* المواضيع */}
          <button className="flex items-center gap-2 text-gray-800 hover:text-[#7b0b4c]">
            <span className="text-sm">المواضيع</span>
          </button>

          {/* تسجيل الدخول / المستخدم */}
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <button
                  onClick={() => setAuthMode("login")}
                  className="px-4 py-1.5 rounded-lg border border-[#7b0b4c] text-[#7b0b4c] bg-white/70 backdrop-blur-sm hover:bg-[#7b0b4c] hover:text-white text-sm"
                >
                  تسجيل الدخول
                </button>
                <button
                  onClick={() => setAuthMode("register")}
                  className="px-4 py-1.5 rounded-lg bg-[#7b0b4c] text-white hover:bg-[#5e0839] text-sm"
                >
                  مستخدم جديد
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#7b0b4c]">
                  مرحباً، {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                >
                  تسجيل خروج
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* المودال */}
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

/* 🔎 زر البحث */
function SearchButton() {
  const [open, setOpen] = useState(false);
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
        <div className="absolute top-12 right-0 bg-white border rounded-lg shadow p-3 animate-fade-in">
          <input
            type="text"
            placeholder="ابحث هنا..."
            className="w-64 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7b0b4c]"
          />
        </div>
      )}
    </div>
  );
}

/* 🛒 زر السلة */
function CartButton() {
  const [count] = useState(2);
  return (
    <button
      className="relative p-2 rounded-full hover:bg-gray-100"
      aria-label="السلة"
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-600">
        <path
          fill="currentColor"
          d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45A1 1 0 0 0 9 18h10v-2H9.42a.25.25 0 0 1-.21-.37l.93-1.63h7.45a1 1 0 0 0 .9-.55l3.58-6.49A.5.5 0 0 0 21.58 6H6.21l-.94-2zM7 20a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 .001 3.999A2 2 0 0 0 17 20z"
        />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#7b0b4c] text-white text-xs rounded-full px-1.5">
          {count}
        </span>
      )}
    </button>
  );
}

/* 🌍 زر اللغة والعملة */
function LangCurrency() {
  const [currency, setCurrency] = useState("دولار");
  const [lang, setLang] = useState("AR");

  return (
    <div className="hidden sm:flex items-center gap-3 text-sm">
      {/* العملة */}
      <div className="relative group">
        <button className="flex items-center gap-1 px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50">
          <span className="text-xs text-[#7b0b4c]">$</span>
          <span>{currency}</span>
        </button>
        <div className="absolute hidden group-hover:block right-0 mt-1 bg-white border rounded-lg shadow text-sm">
          {["دولار", "يورو", "جنيه"].map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-right"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* اللغة */}
      <div className="relative group">
        <button className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50">
          {lang}
        </button>
        <div className="absolute hidden group-hover:block right-0 mt-1 bg-white border rounded-lg shadow text-sm">
          {["AR", "EN"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-right"
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 🔑 تسجيل الدخول/التسجيل Modal (JS خالص) */
function LoginModal({ mode, onClose, setAuthMode, setUser }) {
  const [tab, setTab] = useState("phone");
  const router = useRouter();

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      setUser({ name: "أحمد" }); // تسجيل دخول تجريبي
      onClose();
      router.push("/dashboard"); // انتقال بعد الدخول
    } else {
      setUser({ name: "مستخدم جديد" });
      onClose();
      router.push("/dashboard"); // أو /welcome حسب ما تحب
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
        {/* زر إغلاق */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* العنوان */}
        <h2 className="text-xl font-semibold text-center mb-4 text-[#7b0b4c]">
          {mode === "login" ? "تسجيل الدخول" : "إنشاء حساب جديد"}
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-8 mb-6 text-sm border-b">
          <button
            onClick={() => setTab("phone")}
            className={`pb-2 ${
              tab === "phone"
                ? "text-[#7b0b4c] border-b-2 border-[#7b0b4c]"
                : "text-gray-500 hover:text-[#7b0b4c]"
            }`}
          >
            رقم الهاتف 📞
          </button>
          <button
            onClick={() => setTab("email")}
            className={`pb-2 ${
              tab === "email"
                ? "text-[#7b0b4c] border-b-2 border-[#7b0b4c]"
                : "text-gray-500 hover:text-[#7b0b4c]"
            }`}
          >
            البريد الإلكتروني 📧
          </button>
        </div>

        {/* النموذج */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === "phone" ? (
            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-sm mb-1">الدولة</label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option>الأردن</option>
                  <option>السعودية</option>
                  <option>مصر</option>
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-sm mb-1">رقم الهاتف</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="+962"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="example@mail.com"
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">كلمة المرور</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#7b0b4c] text-white py-2 rounded-lg font-medium hover:bg-[#5e0839]"
          >
            {mode === "login" ? "دخول" : "إنشاء حساب"}
          </button>
        </form>

        {/* روابط إضافية */}
        {mode === "login" && (
          <div className="mt-6 text-sm text-center space-y-2">
            <p>
              أليس لديك حساب؟{" "}
              <button
                onClick={() => setAuthMode("register")}
                className="text-[#7b0b4c] font-bold"
              >
                أنشئ حسابًا!
              </button>
            </p>
            <p>
              نسيت كلمة السر؟{" "}
              <Link href="/forgot" className="text-[#7b0b4c] font-bold">
                إضغط هنا!
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
