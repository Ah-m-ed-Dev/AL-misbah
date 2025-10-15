"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CampaignsPage() {
  const campaigns = [
    { src: "/images/campaigns/1.jpg", title: "حملات تسويقية مبتكرة" },
    { src: "/images/campaigns/2.jpg", title: "تصميمات احترافية وجذابة" },
    { src: "/images/campaigns/3.jpg", title: "استراتيجيات رقمية فعالة" },
    { src: "/images/campaigns/4.jpg", title: "إعلانات موجهة باحتراف" },
    { src: "/images/campaigns/5.jpg", title: "إدارة حملات ناجحة" },
    { src: "/images/campaigns/6.jpg", title: "إعلانات عبر وسائل التواصل" },
    { src: "/images/campaigns/7.jpg", title: "تحليل الأداء التسويقي" },
    { src: "/images/campaigns/8.jpg", title: "إعلانات بصرية مؤثرة" },
    { src: "/images/campaigns/9.jpg", title: "حملاتنا الإعلانية في مجالات متعددة" },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* 🔹 خلفية ثابتة داكنة */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2000&q=80')",
          filter: "brightness(0.35)",
        }}
      ></div>

      {/* 🔹 طبقة غامقة نصف شفافة فوق الخلفية */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

      {/* 🔹 المحتوى */}
      <div className="relative z-10 py-24 px-6 flex flex-col items-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center text-[#c51f7c] mb-14"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          حملاتنا الإعلانية في مجالات متعددة
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
          {campaigns.map((item, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden rounded-2xl shadow-2xl border border-white/10"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Image
                src={item.src}
                alt={item.title}
                width={600}
                height={400}
                className="object-cover w-full h-72 transform group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                <p className="text-lg font-semibold">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
