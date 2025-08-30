"use client";
import Link from "next/link";
import { useState } from "react";

const categories = [
  "الأمن السيبراني",
  "اللغات",
  "القانون",
  "المحاسبة",
  "مهارات الحاسوب",
  "الصحة والإسعافات",
];

const allCourses = [
  { id: 1, title: "الأمن السيبراني", level: 1, progress: 70, img: "/courses/cyber.png" },
  { id: 2, title: "اللغة الإنجليزية", level: 1, progress: 40, img: "/courses/english.png" },
  { id: 3, title: "تخليص المعاملات", level: 1, progress: 50, img: "/courses/paper.png" },
  { id: 4, title: "صياغة المذكرات القانونية", level: 2, progress: 20, img: "/courses/law.png" },
  { id: 5, title: "المحاسبة الإلكترونية", level: 2, progress: 30, img: "/courses/accounting.png" },
  { id: 6, title: "الترجمة القانونية", level: 1, progress: 60, img: "/courses/translation.png" },
  { id: 7, title: "الإسعافات الأولية", level: 1, progress: 80, img: "/courses/firstaid.png" },
  { id: 8, title: "الرخصة الدولية لقيادة الحاسب الآلي", level: 1, progress: 45, img: "/courses/icdl.png" },
  { id: 9, title: "إكسل متقدم", level: 2, progress: 35, img: "/courses/excel.png" },
];

export default function CoursesCarousel() {
  const [activeTab, setActiveTab] = useState(0);
  const [start, setStart] = useState(0);

  const visible = allCourses.slice(start, start + 4);
  const canPrev = start > 0;
  const canNext = start + 4 < allCourses.length;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
          تصفّح <span className="text-[#7a1353]">الدورات</span> الأكثر طلبًا
        </h2>

        {/* أزرار التصنيفات */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-full text-sm md:text-base transition border ${
                activeTab === i
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
            onClick={() => canNext && setStart((s) => Math.min(allCourses.length - 4, s + 1))}
            disabled={!canNext}
            className="absolute -left-4 -top-12 md:-left-10 md:top-1/2 md:-translate-y-1/2 z-10 bg-white disabled:opacity-40 border border-gray-200 hover:border-gray-300 rounded-full p-2 shadow"
          >
            &#10095;
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visible.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CourseCard({ course }) {
  return (
    <article className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition bg-white">
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
        {/* بدل المودال → لينك للصفحة */}
        <Link href={`/courses/${course.id}`}>
          <button className="w-full rounded-xl bg-[#7a1353] hover:bg-[#60093c] text-white py-2.5 font-medium">
            تفاصيل الدورة
          </button>
        </Link>
      </div>
    </article>
  );
}
