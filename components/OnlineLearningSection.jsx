"use client";

import Image from "next/image";
import Link from "next/link"; // 👈 استيراد Link

export default function OnlineLearningSection() {
  return (
    <section className="w-full">
      {/* الجزء العلوي */}
      <div className="grid md:grid-cols-2">
        {/* التعلم عن بعد */}
        <div className="relative text-white flex items-center justify-center p-10 overflow-hidden">
          <Image
            src="/images/live-learning.jpg"
            alt="التعلم عن بعد"
            width={800}
            height={600}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div> {/* طبقة شفافة لتوضيح النص */}
          <div className="relative z-10 max-w-md text-center md:text-right">
            <h2 className="text-3xl font-bold mb-4">
              نظام التعلم عن بعد{" "}
              <span className="text-yellow-300">بخاصية البث المباشر</span>
            </h2>
            <p className="mb-6 text-gray-100 leading-relaxed">
              يمكنك الإلتحاق بالدورات التي تعقد في الأكاديمية دون الحاجة
              للتواجد داخل القاعة التدريبية
            </p>
            {/* 1. التعلم عن بعد - اعرف المزيد */}
            <Link href="/online-learning" passHref>
              <button className="bg-yellow-400 text-[#7a1353] px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
                اعرف المزيد
              </button>
            </Link>
          </div>
        </div>

        {/* مكتبة الدورات */}
        <div className="relative text-white flex items-center justify-center p-10 overflow-hidden">
          <Image
            src="/images/recorded-courses.jpg"
            alt="مكتبة الدورات"
            width={800}
            height={600}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div> {/* طبقة شفافة */}
          <div className="relative z-10 max-w-md text-center md:text-right">
            <h2 className="text-3xl font-bold mb-4">مكتبة الدورات المسجلة</h2>
            <p className="mb-6 text-gray-100 leading-relaxed">
              تعلم في الأوقات المناسبة لك من خلال مكتبة ضخمة من الدورات
              المسجلة
            </p>
            {/* 2. مكتبة الدورات - استعرض الدورات المتاحة */}
            <Link href="/recorded-courses" passHref>
              <button className="bg-yellow-400 text-[#7a1353] px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
                استعرض الدورات المتاحة
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* جدول الدورات */}
      <div className="bg-gray-50 text-center py-14">
        <h2 className="text-3xl font-bold text-[#7a1353] mb-4">
          جدول الدورات التدريبية
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          تعرف على مواعيد وأوقات إنعقاد الدورات التدريبية القادمة
        </p>
        {/* 3. جدول الدورات - اختر المواعيد المناسبة لك */}
        <Link href="/course-schedule" passHref>
          <button className="bg-[#7a1353] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#9e1a6d] transition">
            اختر المواعيد المناسبة لك
          </button>
        </Link>
      </div>
    </section>
  );
}