// components/Footer.jsx
"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  // --- عدّل الروابط أدناه بحسب حساباتكم وصفحاتكم الحقيقية ---
  const social = {
    facebook: "https://www.facebook.com/yourpage",
    x: "https://x.com/yourhandle", // formerly Twitter
    instagram: "https://www.instagram.com/yourhandle",
    linkedin: "https://www.linkedin.com/company/yourcompany",
    youtube: "https://www.youtube.com/@yourchannel",
  };

  // خرائط جوجل للعنوان (يفتح في نافذة جديدة)
  const address = "شارع الملكة رانيا العبدالله - عمان الأردن";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  // روابط داخلية (عدل المسارات لو عندك مسارات مختلفة)
  const trainingLinks = [
    { label: "التدريب عن بعد", href: "/training/online" },
    { label: "ندوات تفاعلية (ويبِنار)", href: "/training/webinars" },
    { label: "الدبلومات التدريبية", href: "/training/diplomas" },
    { label: "جدول الدورات القادمة", href: "/training/schedule" },
    { label: "عروض التدريب", href: "/training/offers" },
    { label: "امتحان المستوى (أفراد)", href: "/training/placement-test" },
    { label: "أسئلة متكررة", href: "/faq" },
    { label: "الأحكام و الشروط", href: "/terms" },
    { label: "سياسة الخصوصية", href: "/privacy" },
  ];

  const centerLinks = [
    { label: "معلومات عنا", href: "/about" },
    { label: "الملف التعريفي", href: "/profile" },
    { label: "الاعتمادية", href: "/accreditation" },
    { label: "آراء العملاء", href: "/testimonials" },
    { label: "الحملات الدعائية", href: "/campaigns" },
    { label: "تواصل معنا", href: "/contact" },
    { label: "وظائف", href: "/careers" },
  ];

  return (
    <footer className="bg-[#7a1353] text-gray-300 pt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-right">
        {/* العمود الأول */}
        <div>
          <p className="mb-4">
            مركز المصباح للتدريب المهني
            <br />
            <Link
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
              aria-label="افتح العنوان في خرائط جوجل"
            >
              {address}
            </Link>
          </p>

          <p className="mb-2">الأردن</p>
          <p>
            <a href="tel:+96265166422" className="hover:underline" aria-label="اتصل الأردن - مكتب">
              +962 (6) 516 - 6422
            </a>
          </p>
          <p className="mb-4">
            <a href="tel:+962791019999" className="hover:underline" aria-label="اتصل الأردن - جوال">
              +962 (79) 101 - 9999
            </a>
          </p>

          <p className="mb-2">المملكة المتحدة</p>
          <p>
            <a
              href="tel:+442080575900"
              className="hover:underline"
              aria-label="اتصل المملكة المتحدة"
            >
              +44 (20) 8057 - 5900
            </a>
            <span className="text-xs text-gray-400 ml-2">EXT:5900</span>
          </p>

          <p className="mb-2 mt-4">الإمارات العربية المتحدة</p>
          <p>
            <a href="tel:+971526677069" className="hover:underline" aria-label="اتصل الإمارات">
              +971 (52) 667 - 7069
            </a>
          </p>

          <p className="mb-2 mt-4">قطر</p>
          <p>
            <a href="tel:+97440402121" className="hover:underline" aria-label="اتصل قطر 1">
              +974 4040 - 2121
            </a>
          </p>
          <p>
            <a href="tel:+97430009764" className="hover:underline" aria-label="اتصل قطر 2">
              +974 3000 - 9764
            </a>
          </p>

          <p className="mb-2 mt-4">مصر</p>
          <p>
            <a href="tel:+20100007987" className="hover:underline" aria-label="اتصل مصر">
              +20 (10) 00 00 - 79 87
            </a>
          </p>

          <p className="mt-4">
            <a
              href="mailto:info@pioneersacademy.com"
              className="hover:underline"
              aria-label="أرسل بريدًا إلى info@pioneersacademy.com"
            >
              info@pioneersacademy.com
            </a>
          </p>
        </div>

        {/* العمود الثاني */}
        <div>
          <h3 className="text-xl font-semibold mb-4">التدريب</h3>
          <ul className="space-y-2">
            {trainingLinks.map((ln) => (
              <li key={ln.href}>
                <Link href={ln.href} className="hover:underline">
                  {ln.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* العمود الثالث */}
        <div>
          <h3 className="text-xl font-semibold mb-4">مركز المصباح</h3>
          <ul className="space-y-2">
            {centerLinks.map((ln) => (
              <li key={ln.href}>
                <Link href={ln.href} className="hover:underline">
                  {ln.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* الجزء السفلي */}
      <div className="border-t border-gray-600 mt-10 pt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <p className="text-sm mb-4">© 2025 مركز المصباح للتدريب. جميع الحقوق محفوظة.</p>

          <div className="flex gap-6 justify-center">
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="صفحتنا على فيسبوك"
              className="hover:text-white"
            >
              <FaFacebookF size={22} />
            </a>

            <a
              href={social.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="حسابنا على X"
              className="hover:text-white"
            >
              <FaXTwitter size={22} />
            </a>

            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="حسابنا على إنستاجرام"
              className="hover:text-pink-500"
            >
              <FaInstagram size={22} />
            </a>

            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="صفحتنا على لينكدإن"
              className="hover:text-blue-600"
            >
              <FaLinkedinIn size={22} />
            </a>

            <a
              href={social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="قناتنا على يوتيوب"
              className="hover:text-red-600"
            >
              <FaYoutube size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
