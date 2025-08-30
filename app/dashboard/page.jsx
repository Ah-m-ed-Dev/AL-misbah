"use client";

import { useState } from "react";
import { PlusCircle, Layers, Image, Settings } from "lucide-react";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [bg, setBg] = useState("url('/images/hero.jpg')"); // الخلفية الافتراضية
  const [form, setForm] = useState({ title: "", price: "", desc: "" });

  const addCourse = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setCourses([...courses, form]);
    setForm({ title: "", price: "", desc: "" });
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#7b0b4c] to-[#5e0839] text-white p-6 space-y-6 shadow-2xl relative z-10">
        <h2 className="text-2xl font-bold mb-8 text-center tracking-wide">
          لوحة التحكم
        </h2>
        <button className="flex items-center gap-2 w-full text-right hover:bg-white/10 p-3 rounded-lg transition">
          <Layers size={18} /> الكورسات
        </button>
        <button className="flex items-center gap-2 w-full text-right hover:bg-white/10 p-3 rounded-lg transition">
          <Image size={18} /> الخلفية
        </button>
        <button className="flex items-center gap-2 w-full text-right hover:bg-white/10 p-3 rounded-lg transition">
          <Settings size={18} /> الإعدادات
        </button>
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 p-10 relative overflow-hidden"
        style={{
          backgroundImage: bg,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" /> {/* Overlay */}
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-[#7b0b4c] mb-8 drop-shadow">
            إدارة الكورسات
          </h1>

          {/* إضافة كورس */}
          <form
            onSubmit={addCourse}
            className="space-y-4 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-md border border-gray-100"
          >
            <input
              type="text"
              placeholder="اسم الكورس"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#7b0b4c] outline-none transition"
            />
            <input
              type="text"
              placeholder="السعر"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#7b0b4c] outline-none transition"
            />
            <textarea
              placeholder="الوصف"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#7b0b4c] outline-none transition"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#7b0b4c] to-[#5e0839] text-white py-2 rounded-lg hover:opacity-90 transition font-semibold shadow"
            >
              <PlusCircle size={18} /> إضافة كورس
            </button>
          </form>

          {/* عرض الكورسات */}
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

          {/* تغيير الخلفية */}
          <div className="mt-16 bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-md max-w-sm border">
            <h2 className="text-lg font-bold mb-4 text-[#7b0b4c]">
              🖼️ تغيير الخلفية
            </h2>
            <input
              type="text"
              placeholder="ضع رابط صورة"
              onChange={(e) => setBg(`url('${e.target.value}')`)}
              className="w-full border px-4 py-2 rounded-lg mb-4"
            />
            <input
              type="color"
              onChange={(e) => setBg(e.target.value)}
              className="w-24 h-12 border rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
