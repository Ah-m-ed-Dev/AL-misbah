export default function TestimonialsSection() {
  const testimonials = [
    {
      text: "تقدم بخالص الشكر... تلبيه الاحتياجات.",
      name: "محمد الشعلان",
      title: "مدير دائرة الامداد",
    },
    {
      text: "لا يسعنا إلا أن نشكر لكم... التوفيق والنجاح.",
      name: "هشام عبدالله",
      title: "محاسب قانوني ومراقب حسابات",
    },
    {
      text: "يسر إدارة شركة... المزيد من التقدم والنجاح.",
      name: "أحمد نصر",
      title: "المدير التنفيذي",
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#7a1353]">
          آراء العملاء
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-6 rounded-lg text-center border-t-4 border-[#7a1353] hover:shadow-xl transition-shadow duration-300"
            >
              <p className="text-gray-700 leading-loose mb-6">{item.text}</p>
              <h3 className="font-bold text-lg text-[#7a1353]">
                {item.name}
              </h3>
              <p className="text-gray-500">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
