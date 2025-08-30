// components/Footer.jsx
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#7a1353] text-gray-300 pt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-right">
        {/* العمود الأول */}
        <div>
          <p className="mb-4">
            مركز المصباح للتدريب المهني
            <br />
            شارع الملكة رانيا العبدالله - عمان الأردن
          </p>
          <p className="mb-2">الأردن</p>
          <p>+962 (6) 516 - 6422</p>
          <p className="mb-4">+962 (79) 101 - 9999</p>

          <p className="mb-2">المملكة المتحدة</p>
          <p>+44 (20) 8057 - 5900 EXT:5900</p>

          <p className="mb-2 mt-4">الإمارات العربية المتحدة</p>
          <p>+971 (52) 667 - 7069</p>

          <p className="mb-2 mt-4">قطر</p>
          <p>+974 4040 - 2121</p>
          <p>+974 3000 - 9764</p>

          <p className="mb-2 mt-4">مصر</p>
          <p>+20 (10) 00 00 - 79 87</p>

          <p className="mt-4">info@pioneersacademy.com</p>
        </div>

        {/* العمود الثاني */}
        <div>
          <h3 className="text-xl font-semibold mb-4">التدريب</h3>
          <ul className="space-y-2">
            <li>التدريب عن بعد</li>
            <li>ندوات تفاعلية (ويبِنار)</li>
            <li>الدبلومات التدريبية</li>
            <li>جدول الدورات القادمة</li>
            <li>عروض التدريب</li>
            <li>امتحان المستوى (أفراد)</li>
            <li>أسئلة متكررة</li>
            <li>الأحكام و الشروط</li>
            <li>سياسة الخصوصية</li>
          </ul>
        </div>

        {/* العمود الثالث */}
        <div>
          <h3 className="text-xl font-semibold mb-4">مركز المصباح</h3>
          <ul className="space-y-2">
            <li>معلومات عنا</li>
            <li>الملف التعريفي</li>
            <li>الاعتمادية</li>
            <li>آراء العملاء</li>
            <li>الحملات الدعائية</li>
            <li>تواصل معنا</li>
            <li>وظائف</li>
          </ul>
        </div>
      </div>

      {/* الجزء السفلي */}
      <div className="border-t border-gray-600 mt-10 pt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <p className="text-sm mb-4">
            © 2025 مركز المصباح للتدريب. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6 justify-center">
            <a href="#" className="hover:text-blue-500">
              <FaFacebookF size={22} />
            </a>
            <a href="#" className="hover:text-white">
              <FaXTwitter size={22} />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaInstagram size={22} />
            </a>
            <a href="#" className="hover:text-blue-600">
              <FaLinkedinIn size={22} />
            </a>
            <a href="#" className="hover:text-red-600">
              <FaYoutube size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
