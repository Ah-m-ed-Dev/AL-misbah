"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// 🔗 إعداد Supabase
const supabaseUrl = "https://kyazwzdyodysnmlqmljv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5YXp3emR5b2R5c25tbHFtbGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMjI4ODcsImV4cCI6MjA3NTc5ODg4N30.5oPcHui5y6onGAr9EYkq8fSihKeb4iC8LQFsLijIco4";
const supabase = createClient(supabaseUrl, supabaseKey);

const categories = [
  "الكل",
  "الأمن السيبراني",
  "اللغات",
  "القانون",
  "المحاسبة",
  "مهارات الحاسوب",
  "الصحة والإسعافات",
];

// -------- بطاقة الدورة --------
function CourseCard({ course, onClick }) {
  const fallback = "https://source.unsplash.com/400x300/?education,course";

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl border hover:shadow-lg transition overflow-hidden"
    >
      <img
        src={course.img || fallback}
        alt={course.title}
        className="w-full h-40 object-cover"
        onError={(e) => (e.currentTarget.src = fallback)}
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#7a1353] mb-2">{course.title}</h3>
        <p
          className="text-sm text-gray-600 mb-3"
          style={{ minHeight: "2.4rem" }}
        >
          {course.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="line-through text-gray-400 text-sm mr-2">
              {course.price}
            </span>
            <span className="font-bold text-[#7a1353]">{course.discount}</span>
          </div>

          <div className="text-sm flex items-center gap-2">
            <div aria-hidden>
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className={i < course.level ? "inline-block" : "inline-block opacity-30"}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="text-xs text-gray-500">
              ({course.progress || 0}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------- المكون الرئيسي --------
export default function CoursesCarousel() {
  const [activeTab, setActiveTab] = useState("الكل");
  const [start, setStart] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧩 جلب البيانات من Supabase
  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("خطأ في جلب البيانات:", error);
    } else {
      setCourses(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();

    // ⚡️ الاستماع للتحديثات في الوقت الفعلي
    const channel = supabase
      .channel("courses-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "courses" },
        () => fetchCourses()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredCourses =
    activeTab === "الكل"
      ? courses
      : courses.filter((c) => c.category === activeTab);

  const visibleCount = 4;
  const maxStart = Math.max(0, filteredCourses.length - visibleCount);
  const visible = filteredCourses.slice(start, start + visibleCount);
  const canPrev = start > 0;
  const canNext = start < maxStart;

  // 🛒 إضافة للسلة + بث التحديث
  const addToCart = (course) => {
    const existing = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = existing.find((c) => c.id === course.id);

    if (exists) {
      alert("✅ هذه الدورة موجودة بالفعل في السلة!");
      return;
    }

    const newCart = [
      ...existing,
      {
        id: course.id,
        title: course.title,
        price: course.discount || course.price,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(newCart));

    // 🔔 بثّ حدث لتحديث الهيدر فورًا بدون ريفريش
    window.dispatchEvent(new Event("cartUpdated"));

    alert("🎉 تمت إضافة الدورة إلى السلة!");
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
          تصفّح <span className="text-[#7a1353]">الدورات</span> الأكثر طلبًا
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveTab(cat);
                setStart(0);
              }}
              className={`px-4 py-2 rounded-full text-sm md:text-base transition border ${
                activeTab === cat
                  ? "bg-[#7a1353] text-white border-[#7a1353] shadow"
                  : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel */}
        {loading ? (
          <p className="text-center text-gray-500">جاري تحميل الدورات...</p>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-500">لا توجد دورات مضافة حاليًا.</p>
        ) : (
          <div className="relative">
            <button
              onClick={() => canPrev && setStart((s) => Math.max(0, s - visibleCount))}
              disabled={!canPrev}
              className="absolute left-[-0.75rem] -top-12 md:left-[-2.5rem] md:top-1/2 md:-translate-y-1/2 z-10 bg-white disabled:opacity-40 border border-gray-200 hover:border-gray-300 rounded-full p-2 shadow"
            >
              &#10094;
            </button>

            <button
              onClick={() => canNext && setStart((s) => Math.min(maxStart, s + visibleCount))}
              disabled={!canNext}
              className="absolute right-[-0.75rem] -top-12 md:right-[-2.5rem] md:top-1/2 md:-translate-y-1/2 z-10 bg-white disabled:opacity-40 border border-gray-200 hover:border-gray-300 rounded-full p-2 shadow"
            >
              &#10095;
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visible.map((c) => (
                <CourseCard
                  key={c.id}
                  course={c}
                  onClick={() => setSelectedCourse(c)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            <img
              src={selectedCourse.img}
              alt={selectedCourse.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://source.unsplash.com/800x450/?education,course")
              }
            />

            <h3 className="text-2xl font-bold mb-2 text-[#7a1353]">
              {selectedCourse.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              التصنيف:{" "}
              <span className="font-medium">{selectedCourse.category}</span>
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {selectedCourse.description}
            </p>

            <div className="flex items-center justify-between mb-6">
              <span className="line-through text-gray-400 text-lg">
                {selectedCourse.price}
              </span>
              <span className="text-2xl font-bold text-[#7a1353]">
                {selectedCourse.discount}
              </span>
            </div>

            {/* 🛒 زر أضف إلى السلة */}
            <button
              onClick={() => addToCart(selectedCourse)}
              className="w-full bg-[#7a1353] hover:bg-[#60093c] text-white py-3 rounded-xl font-medium text-lg mb-3"
            >
              🛒 أضف إلى السلة
            </button>

            {/* 🔗 زر التسجيل عبر واتساب */}
            <a
              href="https://wa.me/+97472041794"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center rounded-xl bg-green-600 hover:bg-green-700 text-white py-3 font-medium text-lg"
            >
              سجّل عبر الواتساب
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
