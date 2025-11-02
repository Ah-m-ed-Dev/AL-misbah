"use client";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa"; // استدعاء أيقونة واتساب من مكتبة react-icons

export default function WhatsappPopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* زر واتساب العائم */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed right-6 bottom-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg"
      >
        <FaWhatsapp className="w-6 h-6" />
      </button>

      {/* البوب اب فوق الزر العائم */}
      {open && (
        <div className="fixed right-6 bottom-20 z-50 bg-white border rounded-xl shadow-xl p-4 flex flex-col items-center gap-3" style={{
            backgroundImage: "url('/logo.png')", // ضع رابط الصورة هنا
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <FaWhatsapp className="w-12 h-12 text-green-500" />
          <a
            href="https://wa.me/97472041794"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold"
          >
            Chat on WhatsApp
          </a>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-sm mt-1"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}