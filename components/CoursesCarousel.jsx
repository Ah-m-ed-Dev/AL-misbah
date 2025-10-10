"use client";
import React, { useState, useEffect } from "react";

const categories = [
  "الكل",
  "الأمن السيبراني",
  "اللغات",
  "القانون",
  "المحاسبة",
  "مهارات الحاسوب",
  "الصحة والإسعافات",
];

const allCourses = [
  { id: 1, title: "الأمن السيبراني", category: "الأمن السيبراني", level: 1, progress: 70, img: "/courses/cyber.png", price: "150$", discount: "120$", desc: "دورة عملية للتعرف على أساسيات الأمن السيبراني." },
  { id: 2, title: "اللغة الإنجليزية", category: "اللغات", level: 1, progress: 40, img: "/courses/english.png", price: "100$", discount: "80$", desc: "تطوير مهارات المحادثة والاستماع في اللغة الإنجليزية." },
  { id: 3, title: "تخليص المعاملات", category: "القانون", level: 1, progress: 50, img: "/courses/paper.png", price: "120$", discount: "95$", desc: "تعلم إجراءات تخليص المعاملات الحكومية والخاصة." },
  { id: 4, title: "صياغة المذكرات القانونية", category: "القانون", level: 2, progress: 20, img: "/courses/law.png", price: "180$", discount: "150$", desc: "مهارات صياغة المذكرات القانونية بطريقة احترافية." },
  { id: 5, title: "المحاسبة الإلكترونية", category: "المحاسبة", level: 2, progress: 30, img: "/courses/accounting.png", price: "200$", discount: "160$", desc: "تعلم استخدام البرامج المحاسبية الحديثة." },
  { id: 6, title: "الترجمة القانونية", category: "اللغات", level: 1, progress: 60, img: "/courses/translation.png", price: "130$", discount: "100$", desc: "احتراف الترجمة في المجال القانوني." },
  { id: 7, title: "الإسعافات الأولية", category: "الصحة والإسعافات", level: 1, progress: 80, img: "/courses/firstaid.png", price: "90$", discount: "70$", desc: "مهارات أساسية في تقديم الإسعافات الأولية." },
  { id: 8, title: "الرخصة الدولية لقيادة الحاسب الآلي", category: "مهارات الحاسوب", level: 1, progress: 45, img: "/courses/icdl.png", price: "170$", discount: "140$", desc: "دورة شاملة لاجتياز اختبارات ICDL." },
  { id: 9, title: "إكسل متقدم", category: "مهارات الحاسوب", level: 2, progress: 35, img: "/courses/excel.png", price: "110$", discount: "90$", desc: "احتراف برنامج إكسل في الأعمال المتقدمة." },
];

// -------- CourseCard (مضمّن داخل الملف) --------
function CourseCard({ course, onClick }) {
  const [src, setSrc] = useState(course.img || "");
  // fallback to Unsplash if local file missing
  const fallback = "https://source.unsplash.com/400x300/?education,course";

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onClick(); }}
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl border hover:shadow-lg transition overflow-hidden"
      aria-label={`فتح تفاصيل ${course.title}`}
    >
      <img
        src={src}
        alt={course.title}
        className="w-full h-40 object-cover"
        onError={(e) => {
          // fallback to external image if local missing
          if (e.currentTarget.src !== fallback) {
            e.currentTarget.src = fallback;
          }
        }}
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#7a1353] mb-2">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-3" style={{ minHeight: "2.4rem" }}>
          {course.desc}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="line-through text-gray-400 text-sm mr-2">{course.price}</span>
            <span className="font-bold text-[#7a1353]">{course.discount}</span>
          </div>

          <div className="text-sm flex items-center gap-2">
            {/* level as stars (max 3) */}
            <div aria-hidden>
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className={i < course.level ? "inline-block" : "inline-block opacity-30"}>★</span>
              ))}
            </div>
            <div className="text-xs text-gray-500">({course.progress}%)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------- Main Carousel --------
export default function CoursesCarousel() {
  const [activeTab, setActiveTab] = useState("الكل");
  const [start, setStart] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = activeTab === "الكل" ? allCourses : allCourses.filter((c) => c.category === activeTab);

  const visibleCount = 4;
  const maxStart = Math.max(0, filteredCourses.length - visibleCount);

  const visible = filteredCourses.slice(start, start + visibleCount);
  const canPrev = start > 0;
  const canNext = start < maxStart;

  // close modal with Esc
  useEffect(() => {
    if (!selectedCourse) return;
    const handler = (e) => { if (e.key === "Escape") setSelectedCourse(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedCourse]);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
          تصفّح <span className="text-[#7a1353]">الدورات</span> الأكثر طلبًا
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveTab(cat); setStart(0); }}
              className={`px-4 py-2 rounded-full text-sm md:text-base transition border ${activeTab === cat ? "bg-[#7a1353] text-white border-[#7a1353] shadow" : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Prev (left) */}
          <button
            onClick={() => canPrev && setStart((s) => Math.max(0, s - visibleCount))}
            disabled={!canPrev}
            aria-label="السابق"
            className="absolute left-[-0.75rem] -top-12 md:left-[-2.5rem] md:top-1/2 md:-translate-y-1/2 z-10 bg-white disabled:opacity-40 border border-gray-200 hover:border-gray-300 rounded-full p-2 shadow"
          >
            &#10094;
          </button>

          {/* Next (right) */}
          <button
            onClick={() => canNext && setStart((s) => Math.min(maxStart, s + visibleCount))}
            disabled={!canNext}
            aria-label="التالي"
            className="absolute right-[-0.75rem] -top-12 md:right-[-2.5rem] md:top-1/2 md:-translate-y-1/2 z-10 bg-white disabled:opacity-40 border border-gray-200 hover:border-gray-300 rounded-full p-2 shadow"
          >
            &#10095;
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visible.map((c) => (
              <CourseCard key={c.id} course={c} onClick={() => setSelectedCourse(c)} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-label={`تفاصيل ${selectedCourse.title}`}>
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
            <button onClick={() => setSelectedCourse(null)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl" aria-label="إغلاق">✕</button>

            <img src={selectedCourse.img} alt={selectedCourse.title} className="w-full h-48 object-cover rounded-lg mb-4" onError={(e) => { e.currentTarget.src = "https://source.unsplash.com/800x450/?education,course"; }} />

            <h3 className="text-2xl font-bold mb-2 text-[#7a1353]">{selectedCourse.title}</h3>

            <p className="text-sm text-gray-500 mb-2">التصنيف: <span className="font-medium">{selectedCourse.category}</span></p>

            <p className="text-gray-700 mb-4 leading-relaxed">{selectedCourse.desc}</p>

            <div className="mb-4">
              <label className="text-sm text-gray-600">نسبة الإنجاز:</label>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-1 overflow-hidden">
                <div className="bg-[#7a1353] h-3 rounded-full transition-all" style={{ width: `${selectedCourse.progress}%` }} />
              </div>
              <p className="text-sm text-right mt-1 text-gray-500">{selectedCourse.progress}%</p>
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="line-through text-gray-400 text-lg">{selectedCourse.price}</span>
              <span className="text-2xl font-bold text-[#7a1353]">{selectedCourse.discount}</span>
            </div>

            <div className="flex gap-3">
              <a href="https://wa.me/+97472041794" target="_blank" rel="noopener noreferrer" className="flex-1 text-center rounded-xl bg-[#7a1353] hover:bg-[#60093c] text-white py-3 font-medium text-lg">سجّل عبر الواتساب</a>
              <button onClick={() => { /* مثال: إضافة لوظيفة شراء/عربة */ alert("تمت الإضافة (مثال)"); }} className="px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium">أضف للعربة</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
