"use client";

export default function CareersPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex items-center justify-center p-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1590402494742-4a99b7d95b52?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      <div className="bg-black/60 backdrop-blur-md rounded-2xl p-8 max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4">انضم إلى فريقنا</h1>
        <p className="text-lg leading-relaxed mb-6">
          نسعى إلى استقطاب الكفاءات المميزة في مجالات التدريب والتطوير. إذا كنت تمتلك المهارة والطموح،
          يسعدنا انضمامك إلينا.
        </p>
        <a
          href="mailto:hr@pioneersacademy.com"
          className="bg-[#7b0b4c] px-6 py-2 rounded-lg hover:bg-[#5e0839] transition"
        >
          إرسال السيرة الذاتية
        </a>
      </div>
    </div>
  );
}
