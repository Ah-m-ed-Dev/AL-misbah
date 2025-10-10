"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Layers, Settings, LogOut, Trash2, Edit3, Check, X } from "lucide-react";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: "", price: "", desc: "" });
  const [editCourse, setEditCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("courses");

  // تحميل البيانات من localStorage عند فتح الصفحة
  useEffect(() => {
    const saved = localStorage.getItem("courses");
    if (saved) setCourses(JSON.parse(saved));
  }, []);

  // حفظ تلقائي عند أي تغيير
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  // إضافة كورس جديد
  const addCourse = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const newCourse = { ...form, id: Date.now() };
    setCourses([newCourse, ...courses]);
    setForm({ title: "", price: "", desc: "" });
  };

  // حذف كورس
  const deleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  // بدء تعديل كورس
  const startEdit = (course) => {
    setEditCourse(course.id);
    setForm({ title: course.title, price: course.price, desc: course.desc });
  };

  // حفظ التعديلات
  const saveEdit = (id) => {
    setCourses(
      courses.map((c) =>
        c.id === id ? { ...c, title: form.title, price: form.price, desc: form.desc } : c
      )
    );
    setEditCourse(null);
    setForm({ title: "", price: "", desc: "" });
  };

  // إلغاء التعديل
  const cancelEdit = () => {
    setEditCourse(null);
    setForm({ title: "", price: "", desc: "" });
  };

  const tabs = [
    { id: "courses", label: "الكورسات", icon: Layers },
    { id: "settings", label: "الإعدادات", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f7f1f5] to-[#fdfdfd] text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#7b0b4c] text-white p-6 flex flex-col justify-between shadow-2xl">
        <div>
          <h2 className="text-3xl font-extrabold mb-10 text-center tracking-wide">
            لوحة التحكم
          </h2>
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-start gap-3 w-full text-right p-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white/20 shadow-md"
                    : "hover:bg-white/10"
                }`}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <button className="flex items-center justify-center gap-2 mt-10 bg-white/20 hover:bg-white/30 transition rounded-lg py-2 text-sm font-semibold">
          <LogOut size={16} /> تسجيل الخروج
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10 overflow-y-auto relative">
        <motion.section
          layout
          className="h-56 rounded-2xl shadow-lg mb-12 relative overflow-hidden bg-[#7b0b4c]"
        >
          <div className="absolute inset-0 bg-black/40" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex items-center justify-center h-full"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center">
              إدارة الكورسات
            </h1>
          </motion.div>
        </motion.section>

        {/* Tabs */}
        <AnimatePresence mode="wait">
          {activeTab === "courses" && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* نموذج الإضافة */}
              {!editCourse && (
                <form
                  onSubmit={addCourse}
                  className="space-y-4 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-lg max-w-md border border-gray-100"
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
              )}

              {/* الكورسات */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {courses.map((c) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      layout
                      whileHover={{ y: -5 }}
                      className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition relative"
                    >
                      {editCourse === c.id ? (
                        <>
                          <input
                            type="text"
                            value={form.title}
                            onChange={(e) =>
                              setForm({ ...form, title: e.target.value })
                            }
                            className="w-full border px-3 py-2 mb-2 rounded"
                          />
                          <input
                            type="text"
                            value={form.price}
                            onChange={(e) =>
                              setForm({ ...form, price: e.target.value })
                            }
                            className="w-full border px-3 py-2 mb-2 rounded"
                          />
                          <textarea
                            value={form.desc}
                            onChange={(e) =>
                              setForm({ ...form, desc: e.target.value })
                            }
                            className="w-full border px-3 py-2 mb-2 rounded"
                          />
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => saveEdit(c.id)}
                              className="text-green-600 hover:text-green-800"
                            >
                              <Check size={20} />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => deleteCourse(c.id)}
                            className="absolute top-3 left-3 text-gray-400 hover:text-red-500 transition"
                            title="حذف الكورس"
                          >
                            <Trash2 size={18} />
                          </button>
                          <button
                            onClick={() => startEdit(c)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-blue-500 transition"
                            title="تعديل الكورس"
                          >
                            <Edit3 size={18} />
                          </button>
                          <h3 className="font-bold text-xl text-[#7b0b4c]">
                            {c.title}
                          </h3>
                          <p className="text-gray-600 mt-2 line-clamp-3">
                            {c.desc}
                          </p>
                          <p className="mt-4 font-semibold text-lg text-gray-800">
                            {c.price} $
                          </p>
                        </>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-md max-w-sm border"
            >
              <h2 className="text-lg font-bold mb-4 text-[#7b0b4c]">
                ⚙️ الإعدادات العامة
              </h2>
              <p className="text-gray-600">يمكنك تعديل إعدادات النظام من هنا.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
