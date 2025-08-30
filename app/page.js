import Header from "../components/Header";
import Hero from "../components/Hero";
import FeaturesBar from "../components/FeaturesBar";
import CoursesCarousel from "../components/CoursesCarousel";
import OnlineLearningSection from "../components/OnlineLearningSection";
import WhatsappBubble from "../components/WhatsappBubble";
import TestimonialsSection from "../components/TestimonialsSection"; 
import Footer from "../components/Footer"; // استدعاء الفوتر الجديد

export default function LandingPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-white text-gray-900 font-sans">
      {/* الهيدر */}
      <Header />

      {/* قسم البطل (Hero) */}
      <Hero />

      {/* شريط المميزات */}
      <FeaturesBar />

      {/* الكاروسيل الخاص بالدورات */}
      <CoursesCarousel />

      {/* القسم الجديد (التعلم عن بعد + مكتبة الدورات + جدول الدورات) */}
      <OnlineLearningSection />

      {/* قسم آراء العملاء */}
      <TestimonialsSection />

      {/* الفوتر */}
      <Footer />

      {/* فقاعة واتساب */}
      <WhatsappBubble />
    </div>
  );
}
