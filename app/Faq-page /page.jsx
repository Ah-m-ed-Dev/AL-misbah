"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";

const COLORS = {
  primaryDark: "#0d1b2a",
  accent: "#fbc02d",
  maroon: "#601a43",
};

const faqs = [
  {
    question: "كيف أسجل في دورة؟",
    answer: `يمكنك التسجيل عن طريق ملء نموذج الاتصال في هذه الصفحة، أو الاتصال بمكتب القبول لدينا، أو زيارة مركز التدريب الخاص بنا شخصيًا. سيرشدك فريقنا خلال عملية التسجيل.`,
  },
  {
    question: "هل هناك متطلبات مسبقة لدوراتكم؟",
    answer: `معظم دوراتنا لا تتطلب متطلبات محددة مسبقة. ومع ذلك، يوصى بمعرفة أساسية بالكمبيوتر لجميع البرامج. دورة ICDL مناسبة للمبتدئين، في حين أن بعض وحدات المحاسبة الإلكترونية المتقدمة قد تتطلب معرفة أساسية بالمحاسبة.`,
  },
  {
    question: "ما هي الشهادات التي سأحصل عليها بعد الانتهاء؟",
    answer: `عند الانتهاء بنجاح من دورتك واجتياز التقييمات المطلوبة، ستحصل على شهادة رسمية. بالنسبة لـ ICDL، ستحصل على شهادة ICDL معترف بها دوليًا. توفر برامج المحاسبة الإلكترونية وشهادات المصباح اعترافًا جيدًا من أصحاب العمل المحليين.`,
  },
  {
    question: "هل تقدمون خطط دفع مرنة؟",
    answer: `نعم، نقدم خيارات دفع مرنة بما في ذلك خطط التقسيط. يرجى الاتصال بمكتب القبول لدينا للحصول على تفاصيل.`,
  },
  {
    question: "هل يمكنني زيارة المنشأة قبل التسجيل؟",
    answer: `بالطبع! يمكنك جدولة جولة بالاتصال بنا عبر الهاتف أو البريد الإلكتروني، وسيكون فريقنا سعيدًا بإظهار مرافقنا والإجابة على أي أسئلة.`,
  },
];

export default function FAQPage() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 text-right">
      <header
        className="py-16 px-6"
        style={{ backgroundColor: COLORS.primaryDark }}
      >
        <div className="max-w-5xl mx-auto text-white">
          <h1 className="text-4xl font-extrabold mb-4">
            الأسئلة المتكررة
          </h1>
          <p className="text-gray-200">
            اعثر على إجابات للأسئلة الشائعة حول دوراتنا وعملية التسجيل والمزيد.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-4">
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-4 rounded-xl shadow cursor-pointer"
            onClick={() => setExpanded(expanded === idx ? null : idx)}
          >
            <h2 className="font-semibold text-lg">{faq.question}</h2>
            {expanded === idx && (
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            )}
          </motion.div>
        ))}
      </main>

      <footer className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <Link
          href="tel:+97472041794"
          className="flex items-center gap-2 bg-[#601a43] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
        >
          <FaPhone /> اتصال مباشر
        </Link>
        <Link
          href="https://wa.me/+97472041794"
          className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
        >
          <FaWhatsapp /> تواصل عبر واتساب
        </Link>
      </footer>
    </div>
  );
}
