"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-white to-pink-50 flex flex-col items-center px-4 py-16"
    >
      <motion.h1
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-[#7b0b4c] mb-6 text-center"
      >
        الشروط والأحكام
      </motion.h1>

      <motion.p
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-gray-700 text-center max-w-3xl mb-12 leading-relaxed"
      >
        من خلال استخدامك لموقعنا أو التسجيل في إحدى دوراتنا، فإنك توافق على
        الالتزام بجميع الشروط والأحكام التالية الخاصة بمركز المصباح للتدريب.
      </motion.p>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4, duration: 0.8 }}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-4xl w-full space-y-8"
      >
        <Section
          title="1. التسجيل واستخدام الموقع"
          content="يجب أن تكون المعلومات التي تقدمها صحيحة ومحدثة. يحتفظ المركز بحق تعليق أو إلغاء أي حساب في حال تقديم معلومات غير صحيحة أو استخدام غير قانوني للموقع."
        />
        <Section
          title="2. الدورات والدفع"
          content="يحق للمركز تعديل مواعيد أو محتوى الدورات بما يتناسب مع متطلبات الجودة. يتم الدفع وفقاً لسياسات المركز، وقد تُتاح خطط تقسيط محددة. لا تُسترد الرسوم بعد بدء الدورة إلا حسب سياسة الاسترجاع."
        />
        <Section
          title="3. حقوق الملكية الفكرية"
          content="جميع الحقوق محفوظة لمركز المصباح للتدريب. يُمنع نسخ أو إعادة نشر أي محتوى دون إذن كتابي مسبق."
        />
        <Section
          title="4. سياسة الخصوصية"
          content="يلتزم المركز بحماية خصوصية بيانات المستخدمين وعدم مشاركتها مع أي طرف ثالث دون موافقة، إلا في الحالات التي يتطلبها القانون."
        />
        <Section
          title="5. الإلغاء والتعديلات"
          content="يحق للمركز تعديل هذه الشروط في أي وقت، وسيُعتبر استمرارك في استخدام الموقع موافقة على التعديلات الجديدة."
        />
        <Section
          title="6. المسؤولية القانونية"
          content="المركز غير مسؤول عن أي أضرار ناتجة عن سوء استخدام الموقع أو الخدمات. يتحمل المستخدم كامل المسؤولية عن استخدامه للموقع بما يتوافق مع القوانين المحلية."
        />
        <Section
          title="7. التواصل معنا"
          content="لأي استفسارات، يمكنكم التواصل معنا عبر البريد الإلكتروني: info@almisbah.com أو الهاتف: +974 7204 1794."
        />
      </motion.div>
    </div>
  );
}

function Section({ title, content }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6 }}
      className="border-r-4 border-[#7b0b4c] pr-4"
    >
      <h2 className="text-2xl font-bold text-[#7b0b4c] mb-3">{title}</h2>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </motion.div>
  );
}
