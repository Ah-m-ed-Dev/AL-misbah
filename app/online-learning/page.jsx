"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHeadphones, FaVideo, FaCreditCard, FaGlobe, FaWhatsapp } from "react-icons/fa";

// 🎨 تعاريف الألوان
const PRIMARY_DARK = "#0d1b2a"; // لون خلفية داكن (قريب من الأسود/الأزرق الغامق)
const ACCENT_COLOR = "#fbc02d"; // لون أصفر ذهبي للنبرة (لتطوير مهاراتك)
const MAROON_COLOR = "#601a43"; // لون الزر الأساسي (العنابي)

// 🔗 رابط الفيديو الترويجي
const PROMO_VIDEO_URL = "https://www.youtube.com/embed/G58LOqOqiJs?autoplay=1"; 

// 🎬 مكون مشغل الفيديو (Modal)
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
          className="absolute top-[-40px] right-0 md:right-[-40px] text-white text-3xl font-bold p-2 z-50 hover:text-red-500 transition"
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


export default function OnlineLearningPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 1. قسم الرأس (Hero Section)
  const HeroSection = () => (
    <section className={`relative text-white bg-[${PRIMARY_DARK}] overflow-hidden`}>
      {/* 🏞️ صورة خلفية لقسم الهيرو (مثال: شخص يتعلم عبر اللابتوب) */}
      <Image
        src="/images/online-learning-hero-bg.jpg" // صورة خلفية عامة
        alt="التعلم بالبث المباشر"
        layout="fill"
        objectFit="cover"
        quality={90}
        className="opacity-70"
        priority
      />

      <div className="relative z-10 pt-20 pb-40 md:py-40 px-6 max-w-7xl mx-auto">
        
        <nav className="text-sm flex justify-end gap-4 mb-10">
          <Link href="/" className="hover:text-[#fbc02d]">الرئيسية</Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#fbc02d]">البث المباشر</span>
        </nav>

        <div className="flex flex-col md:flex-row items-center justify-between text-right">
          <div className="md:w-1/2 order-2 md:order-1 mt-10 md:mt-0">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              طور مهاراتك وأنت في مكانك!
            </h1>
            <p className="text-lg mb-6 text-gray-200">
              تعلم عن بعد وتتميز بشهادات معتمدة دولية. أكثر من 50 دورة في مختلف التخصصات الأكثر طلباً محلياً وعالمياً!
            </p>
            <Link href="/course-schedule" passHref>
              <button className={`bg-[${ACCENT_COLOR}] text-[${MAROON_COLOR}] px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition`}>
                استعراض الدورات
              </button>
            </Link>
          </div>
          
          <div className="md:w-1/2 order-1 md:order-2 flex justify-center md:justify-start">
            <div className="relative w-full max-w-md">
              {/* 🏞️ صورة اللابتوب مع المحاضر (يمكن استبدالها بصورة توضيحية) */}
              <Image
                src="/images/live-laptop-main.png" // صورة لابتوب مع محاضر
                alt="التعلم عن بعد المباشر"
                width={700}
                height={500}
                layout="responsive"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // 2. قسم الفيديو الترويجي (أسفل الـ Hero)
  const VideoPromoSection = () => (
    <section className={`bg-[${PRIMARY_DARK}] text-white py-16 px-6`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        <div className="md:w-1/2 text-right">
          <h2 className="text-4xl font-bold mb-4 leading-relaxed">
            لم تعد المسافات عائق بعد الآن
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            مع نظام **التعلم عن بعد** بخاصية **البث المباشر**.
          </p>
          <p className="text-lg text-gray-400">
            أصبح بإمكانك الإلتحاق بالدورات التدريبية التي تُعقد في الأكاديمية دون الحاجة للتواجد داخل القاعة التدريبية، سواء كنت في المنزل أو العمل أو حتى في المقهى. كل ما يلزمك هو جهاز حاسوب متصل بشبكة الإنترنت لتكون قادراً على الدخول لحسابك والإنضمام للدورات التدريبية، وتعيين أجواء الدروس والتفاعل بكل سهولة.
          </p>
        </div>

        <div className="md:w-1/2 relative flex justify-center">
          {/* 🏞️ صورة اللابتوب لزر تشغيل الفيديو */}
          <Image
            src="/images/video-promo-laptop.png" // صورة لابتوب مع أيقونة تشغيل فيديو
            alt="شاهد الفيديو الترويجي"
            width={700}
            height={400}
            layout="responsive"
          />
          
          {/* زر تشغيل الفيديو العائم */}
          <button 
            onClick={openModal} 
            className="absolute inset-0 m-auto flex items-center justify-center w-20 h-20 bg-white/80 rounded-full shadow-lg transition transform hover:scale-105"
            aria-label="تشغيل الفيديو الترويجي"
          >
            <FaVideo className="w-10 h-10 text-[#601a43] ml-1" />
          </button>
        </div>
      </div>
    </section>
  );

  // 3. قسم الميزات - تم تعديل لون الخلفية إلى العنابي (الخمري) ولون الأيقونات إلى الأبيض
  const FeaturesSection = () => (
    <section className={`bg-[${MAROON_COLOR}] text-white py-16 px-6`}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        
        {/* ميزة 1: الدعم الفني */}
        <div className="flex flex-col items-center">
          <FaHeadphones className="w-12 h-12 text-white mb-3" />
          <h3 className="font-bold mb-2">فريق عمل متخصص لتقديم المساعدة</h3>
          <p className="text-sm text-gray-200">(الدعم الفني)</p>
        </div>

        {/* ميزة 2: سلسلة الدروس */}
        <div className="flex flex-col items-center">
          <FaVideo className="w-12 h-12 text-white mb-3" />
          <h3 className="font-bold mb-2">سلسلة من الدروس المسجلة التي تم طرحها</h3>
          <p className="text-sm text-gray-200">خلال الدورة</p>
        </div>

        {/* ميزة 3: خيارات الدفع */}
        <div className="flex flex-col items-center text-right">
          <FaCreditCard className="w-12 h-12 text-white mb-3" />
          <h3 className="font-bold mb-2">خيارات متعددة للدفع</h3>
          <ul className="text-sm text-gray-200 list-inside text-center">
            <li>فيزا/ماستر كارد</li>
            <li>آي فورت</li>
            <li>زين كاش</li>
            <li>حوالات بنكية</li>
          </ul>
        </div>

        {/* ميزة 4: الحساب الإلكتروني */}
        <div className="flex flex-col items-center text-right">
          <FaGlobe className="w-12 h-12 text-white mb-3" />
          <h3 className="font-bold mb-2">مكان واحد لإدارة جميع أمورك الأكاديمية</h3>
          <ul className="text-sm text-gray-200 list-inside text-center">
            <li>مرفقات المواد والمراجع التعليمية</li>
            <li>التواصل مع المدرب مباشرةً من خلال نظام المراسلات الإلكترونية</li>
            <li>طلب إصدار الشهادات</li>
          </ul>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen">
      <HeroSection />
      <VideoPromoSection />
      <FeaturesSection />

      {/* 💬 زر Chat with us العائم (WhatsApp) */}
      <Link 
        href="https://wa.me/XXXXXXXXXXX"
        target="_blank" 
        className="fixed bottom-6 right-6 z-40 bg-green-500 text-white flex items-center gap-2 p-3 rounded-full shadow-lg hover:bg-green-600 transition"
      >
        <FaWhatsapp className="w-6 h-6" />
        <span className="font-semibold">Chat with us</span>
      </Link>
      
      {/* 🎬 مشغل الفيديو (Modal) */}
      <VideoModal isOpen={isModalOpen} onClose={closeModal} videoUrl={PROMO_VIDEO_URL} />
    </div>
  );
}