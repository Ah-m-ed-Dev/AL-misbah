"use client";
import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ✅ إعداد Supabase
const supabaseUrl = "https://kyazwzdyodysnmlqmljv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5YXp3emR5b2R5c25tbHFtbGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMjI4ODcsImV4cCI6MjA3NTc5ODg4N30.5oPcHui5y6onGAr9EYkq8fSihKeb4iC8LQFsLijIco4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchContainerRef = useRef(null);

  // ✅ إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ✅ البحث المباشر من Supabase مع الاقتراحات
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("courses")
        .select("id, title, category")
        .ilike("title", `%${searchQuery}%`)
        .limit(6);

      if (!error) {
        setSuggestions(data || []);
      } else {
        console.error("خطأ في جلب نتائج البحث:", error);
      }
      setLoading(false);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // تمرير قيمة البحث إلى سكشن الدورات
    const coursesSection = document.getElementById("courses-section");
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth" });
      // تخزين قيمة البحث مؤقتاً لتصفية الدورات
      localStorage.setItem("searchQuery", searchQuery);
    }
    
    // إغلاق القائمة بعد البحث
    setSuggestions([]);
  };

  // ✅ عند الضغط على اقتراح من القائمة
  const handleSelect = (course) => {
    localStorage.setItem("searchQuery", course.title.toLowerCase());
    localStorage.setItem("selectedCourseId", course.id);
    setSearchQuery(course.title);
    setSuggestions([]);
    
    // الانتقال إلى قسم الدورات
    setTimeout(() => {
      const coursesSection = document.getElementById("courses-section");
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: "smooth" });
        
        // تمييز الدورة المحددة بعد الانتقال
        setTimeout(() => {
          const selectedCourseId = localStorage.getItem("selectedCourseId");
          if (selectedCourseId) {
            const courseElement = document.getElementById(`course-${selectedCourseId}`);
            if (courseElement) {
              courseElement.scrollIntoView({ behavior: "smooth", block: "center" });
              courseElement.classList.add("ring-2", "ring-[#7b0b4c]");
              setTimeout(() => {
                courseElement.classList.remove("ring-2", "ring-[#7b0b4c]");
              }, 3000);
            }
            localStorage.removeItem("selectedCourseId");
          }
        }, 500);
      }
    }, 100);
  };

  return (
    <section className="relative">
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="Laptop hero"
          className="w-full h-[56vh] lg:h-[64vh] object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/60" /> {/* Overlay شفاف */}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-[56vh] lg:h-[64vh]">
        <div className="mt-8 md:mt-0 max-w-2xl flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-snug text-white mb-4">
            تعلّم اليوم، لِتقودَّ غدًا
          </h1>
          <p className="mt-3 text-lg text-white/80 mb-6">
            تعلّم.. طوِّر.. وحقق نجاحك مع مركز المصباح للتدريب الفني والعمالة
          </p>

          {/* مربع البحث مع الاقتراحات */}
          <div className="w-full max-w-md relative" ref={searchContainerRef}>
            <form onSubmit={handleSearch} className="w-full flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="ابحث عن دورة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-[#7b0b4c]"
                />
                
                {/* مؤشر التحميل */}
                {loading && (
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#7b0b4c]"></div>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="bg-[#7b0b4c] text-white px-4 py-3 rounded-2xl hover:bg-[#5e0839] transition-colors whitespace-nowrap"
              >
                بحث
              </button>
            </form>

            {/* قائمة الاقتراحات */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-60 overflow-y-auto">
                <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-b">
                  {suggestions.length} نتيجة
                </div>
                {suggestions.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => handleSelect(course)}
                    className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors group"
                  >
                    <div className="font-medium text-[#7b0b4c] mb-1 group-hover:text-[#5e0839]">
                      {course.title}
                    </div>
                    {course.category && (
                      <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
                        {course.category}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {searchQuery && !loading && suggestions.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 text-center text-gray-500 text-sm z-50">
                لا توجد نتائج مطابقة لـ "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}