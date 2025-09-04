"use client";

import { useState } from "react";
import { PlusCircle, Layers, Image, Settings } from "lucide-react";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [heroBg, setHeroBg] = useState("url('/images/hero.jpg')");
  const [form, setForm] = useState({ title: "", price: "", desc: "" });
  const [activeTab, setActiveTab] = useState("courses"); // tab افتراضي

  const addCourse = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setCourses([...courses, form]);
    setForm({ title: "", price: "", desc: "" });
  };

  return (
    <div className="min-h-screen flex font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#7b0b4c] to-[#5e0839] text-white p-6 space-y-6 shadow-2xl relative z-10">
        <h2 className="text-2xl font-bold mb-8 text-center tracking-wide">
          لوحة التحكم
        </h2>
        <button
          onClick={() => setActiveTab("courses")}
          className={`flex items-center gap-2 w-full text-right p-3 rounded-lg transition ${
            activeTab === "courses" ? "bg-white/20" : "hover:bg-white/10"
          }`}
        >
          <Layers size={18} /> الكورسات
        </button>
        <button
          onClick={() => setActiveTab("background")}
          className={`flex items-center gap-2 w-full text-right p-3 rounded-lg transition ${
            activeTab === "background" ? "bg-white/20" : "hover:bg-white/10"
          }`}
        >
          <Image size={18} /> الخلفية
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 w-full text-right p-3 rounded-lg transition ${
            activeTab === "settings" ? "bg-white/20" : "hover:bg-white/10"
          }`}
        >
          <Settings size={18} /> الإعدادات
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 relative overflow-hidden bg-gray-50">
        {/* Hero Section */}
        <section
          className="h-64 rounded-2xl shadow-lg mb-12 relative overflow-hidden"
          style={{
            background: heroBg,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex items-center justify-center h-full">
            <h1 className="text-4xl font-extrabold text-white drop-shadow">
              أهلاً بك في لوحة التحكم
            </h1>
          </div>
        </section>

        <div className="relative z-10">
          {/* الكورسات */}
          {activeTab === "courses" && (
            <>
              <h2 className="text-2xl font-extrabold text-[#7b0b4c] mb-8 drop-shadow">
                إدارة الكورسات
              </h2>

              <form
                onSubmit={addCourse}
                className="space-y-4 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-md border border-gray-100"
              >
                <input
                  type="text"
                  placeholder="اسم الكورس"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#7b0b4c] outline-none transition text-gray-800 placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="السعر"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#7b0b4c] outline-none transition text-gray-800 placeholder-gray-500"
                />
                <textarea
                  placeholder="الوصف"
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#7b0b4c] outline-none transition text-gray-800 placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#7b0b4c] to-[#5e0839] text-white py-2 rounded-lg hover:opacity-90 transition font-semibold shadow"
                >
                  <PlusCircle size={18} /> إضافة كورس
                </button>
              </form>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((c, i) => (
                  <div
                    key={i}
                    className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition transform hover:-translate-y-1"
                  >
                    <h3 className="font-bold text-xl text-[#7b0b4c]">{c.title}</h3>
                    <p className="text-gray-600 mt-2">{c.desc}</p>
                    <p className="mt-4 font-semibold text-lg text-gray-800">
                      {c.price} $
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* الخلفية */}
          {activeTab === "background" && (
            <div className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-md max-w-sm border">
              <h2 className="text-lg font-bold mb-4 text-[#7b0b4c]">
                🖼️ تغيير خلفية الهيرو
              </h2>

              {/* رابط صورة من الإنترنت */}
              <input
                type="text"
                placeholder="ضع رابط صورة"
                onChange={(e) => setHeroBg(`url('${e.target.value}')`)}
                className="w-full border px-4 py-2 rounded-lg mb-4 text-gray-800 placeholder-gray-500"
              />

              {/* اختيار صورة من الجهاز */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setHeroBg(`url('${reader.result}')`);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full mb-4"
              />

              {/* اختيار لون ثابت */}
              <input
                type="color"
                onChange={(e) => setHeroBg(e.target.value)}
                className="w-24 h-12 border rounded-lg cursor-pointer"
              />
            </div>
          )}

          {/* الإعدادات */}
          {activeTab === "settings" && (
            <div className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-md max-w-sm border">
              <h2 className="text-lg font-bold mb-4 text-[#7b0b4c]">⚙️ الإعدادات</h2>
              <p className="text-gray-600">إعدادات عامة للنظام هنا.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
