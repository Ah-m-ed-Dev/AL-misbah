"use client";
import { useState } from "react";

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

export default function CoursesCarousel() {
  const [activeTab, setActiveTab] = useState("الكل");
  const [start, setStart] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // فلترة الكورسات حسب التصنيف
  const filteredCourses =
    activeTab === "الكل"
      ? allCourses
      : allCourses.filter((c) => c.category === activeTab);

  const visible = filteredCourses.slice(start, start + 4);
  const canPrev = start > 0;
  const canNext = start + 4 < filteredCourses.length;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
          تصفّح <span className="text-[#7a1353]">الدورات</span> الأكثر طلبًا
        </h2>

        {/* أزرار التصنيفات */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveTab(cat);
                setStart(0); // نرجع لأول الكورسات لما نغيّر التصنيف
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

        {/* الكروسل */}
        <div className="relative">
          <button
            onClick={() => canPrev && setStart((s) => Math.max(0, s - 1))}
            disabled={!canPrev}
            className="absolute -right-4 -top-12 md:-right-10 md:top-1/2 md:-translate-y-1/2 z-10 bg-white disabled:opacity-40 border border-gray-200 hover:border-gray-300 rounded-full p-2 shadow"
          >
            &#10094;
          </button>
          <button
            onClick={() =>
              canNext && setStart((s) => Math.min(filteredCourses.length - 4, s + 1))
            }
            disabled={!canNext}
            className="absolute -left-4 -top-12 md:-left-10 md:top-1/2 md:-translate-y-1/2 z-10 bg-white disabled:opacity-40 border border-gray-200 hover:border-gray-300 rounded-full p-2 shadow"
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

      {/* المودال */}
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
            />
            <h3 className="text-2xl font-bold mb-3">{selectedCourse.title}</h3>
            <p className="text-gray-600 mb-4">{selectedCourse.desc}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="line-through text-gray-400">
                {selectedCourse.price}
              </span>
              <span className="text-xl font-bold text-[#7a1353]">
                {selectedCourse.discount}
              </span>
            </div>
            <a
              href="https://wa.me/+974 7204 1794" // ضع رقم الواتس هنا
              target="_blank"
              className="block text-center w-full rounded-xl bg-[#7a1353] hover:bg-[#60093c] text-white py-3 font-medium"
            >
              سجّل عبر الواتساب
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

function CourseCard({ course, onClick }) {
  return (
    <article
      onClick={onClick}
      className="cursor-pointer group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition bg-white"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={course.img}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition"
        />
        <div className="absolute top-3 right-3">
          <span className="inline-block text-xs bg-[#7a1353] text-white px-3 py-1 rounded-full shadow">
            دورة تدريبية
          </span>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <h3 className="font-bold text-lg leading-snug line-clamp-2 min-h-[3rem]">
          {course.title}
        </h3>
        <div className="flex items-center justify-between text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <span>{course.progress}%</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <span>{course.level}</span>
            <span>المستويات</span>
          </div>
        </div>
      </div>
    </article>
  );
}
