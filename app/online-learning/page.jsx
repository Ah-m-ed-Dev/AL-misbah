"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHeadphones, FaVideo, FaCreditCard, FaGlobe } from "react-icons/fa";

/* 🎨 تعريف الألوان */
const COLORS = {
  primaryDark: "#0d1b2a", // خلفية داكنة
  accent: "#fbc02d", // ذهبي للنبرة
  maroon: "#601a43", // خمري أساسي
};

/* 🎬 مكون الفيديو المنبثق */
const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-auto aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 md:-right-10 text-white text-3xl font-bold p-2 z-50 hover:text-red-500 transition"
          aria-label="إغلاق الفيديو"
        >
          &times;
        </button>
        <iframe
          width="100%"
          height="100%"
          src={videoUrl}
          title="فيديو ترويجي للبث المباشر"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-2xl"
        ></iframe>
      </div>
    </div>
  );
};

/* 🧩 الصفحة */
export default function OnlineLearningPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /* 🏠 قسم الهيرو */
  const HeroSection = () => (
    <section
      className="relative text-white overflow-hidden"
      style={{ backgroundColor: COLORS.primaryDark }}
    >
      <Image
        src="https://cdn.vectorstock.com/i/1000x1000/93/16/young-man-study-at-computer-online-learning-vector-44559316.jpg"
        alt="التعلم بالبث المباشر"
        fill
        quality={90}
        className="object-cover opacity-70"
        priority
      />

      <div className="relative z-10 pt-24 pb-40 md:py-40 px-6 max-w-7xl mx-auto">
        <nav className="text-sm flex justify-end gap-2 mb-8 md:mb-12">
          <Link href="/" className="hover:text-[#fbc02d]">
            الرئيسية
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#fbc02d]">البث المباشر</span>
        </nav>

        <div className="flex flex-col md:flex-row items-center justify-between text-right gap-10">
          <div className="md:w-1/2 order-2 md:order-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              طور مهاراتك وأنت في مكانك!
            </h1>
            <p className="text-base sm:text-lg mb-6 text-gray-200 leading-relaxed">
              تعلم عن بعد وتتميز بشهادات معتمدة دولية. أكثر من 50 دورة في مختلف
              التخصصات الأكثر طلباً محلياً وعالمياً!
            </p>
            <Link href="/course-schedule" passHref>
              <button
                style={{
                  backgroundColor: COLORS.accent,
                  color: COLORS.maroon,
                }}
                className="px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition w-full sm:w-auto"
              >
                استعراض الدورات
              </button>
            </Link>
          </div>

          <div className="md:w-1/2 order-1 md:order-2 flex justify-center md:justify-start">
            <div className="relative w-full max-w-md">
              <Image
                src="https://png.pngtree.com/png-clipart/20210718/original/pngtree-e-learning-with-laptop-for-study-at-home-png-image_6547862.jpg"
                alt="التعلم عن بعد المباشر"
                width={700}
                height={500}
                className="rounded-xl object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  /* 🎥 قسم الفيديو */
  const VideoPromoSection = () => (
    <section
      className="text-white py-16 px-6"
      style={{ backgroundColor: COLORS.primaryDark }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 text-right">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-relaxed">
            لم تعد المسافات عائق بعد الآن
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6">
            مع نظام <strong>التعلم عن بعد</strong> بخاصية{" "}
            <strong>البث المباشر</strong>.
          </p>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            أصبح بإمكانك الإلتحاق بالدورات التدريبية التي تُعقد في الأكاديمية
            دون الحاجة للتواجد داخل القاعة التدريبية، سواء كنت في المنزل أو
            العمل أو حتى في المقهى. كل ما يلزمك هو جهاز حاسوب متصل بالإنترنت
            لتكون قادراً على الدخول لحسابك والانضمام للدورات والتفاعل بسهولة.
          </p>
        </div>

        <div className="md:w-1/2 relative flex justify-center">
          <Image
            src="https://png.pngtree.com/png-clipart/20230823/original/pngtree-online-education-illustration-elearning-learning-laptop-cartoon-png-image_9273788.png"
            alt="شاهد الفيديو الترويجي"
            width={700}
            height={400}
            className="rounded-xl"
          />
          <button
            onClick={openModal}
            className="absolute inset-0 m-auto flex items-center justify-center w-20 h-20 bg-white/80 rounded-full shadow-lg transition transform hover:scale-105"
            aria-label="تشغيل الفيديو الترويجي"
          >
            <FaVideo className="w-10 h-10 text-[#601a43]" />
          </button>
        </div>
      </div>
    </section>
  );

  /* 🌟 قسم الميزات */
  const FeaturesSection = () => (
    <section
      className="text-white py-16 px-6"
      style={{ backgroundColor: COLORS.maroon }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
        <div className="flex flex-col items-center">
          <FaHeadphones className="w-12 h-12 mb-3" />
          <h3 className="font-bold mb-2 text-lg">
            فريق عمل متخصص لتقديم المساعدة
          </h3>
          <p className="text-sm text-gray-200">(الدعم الفني)</p>
        </div>

        <div className="flex flex-col items-center">
          <FaVideo className="w-12 h-12 mb-3" />
          <h3 className="font-bold mb-2 text-lg">سلسلة من الدروس المسجلة</h3>
          <p className="text-sm text-gray-200">خلال الدورة</p>
        </div>

        <div className="flex flex-col items-center">
          <FaCreditCard className="w-12 h-12 mb-3" />
          <h3 className="font-bold mb-2 text-lg">خيارات متعددة للدفع</h3>
          <ul className="text-sm text-gray-200 list-none">
            <li>فيزا / ماستر كارد</li>
            <li>آي فورت</li>
            <li>زين كاش</li>
            <li>حوالات بنكية</li>
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <FaGlobe className="w-12 h-12 mb-3" />
          <h3 className="font-bold mb-2 text-lg">
            مكان واحد لإدارة جميع أمورك الأكاديمية
          </h3>
          <ul className="text-sm text-gray-200 list-none">
            <li>مرفقات المواد والمراجع التعليمية</li>
            <li>التواصل مع المدرب مباشرة</li>
            <li>طلب إصدار الشهادات</li>
          </ul>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen w-full">
      <HeroSection />
      <VideoPromoSection />
      <FeaturesSection />
      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoUrl="https://www.youtube.com/embed/G58LOqOqiJs?autoplay=1"
      />
    </div>
  );
}
