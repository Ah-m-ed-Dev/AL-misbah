"use client";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

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
        <div className="fixed right-6 bottom-20 z-50 bg-white border rounded-xl shadow-xl p-4 flex flex-col items-center gap-3 w-64">
          {/* العنوان */}
          <h3 className="text-lg font-semibold text-gray-800">مركز المصباح</h3>

          {/* صف يحتوي على اللوجو وأيقونة واتساب */}
          <div className="flex items-center gap-2">
            <img
              src="/logo.png" // ضع مسار اللوجو الصحيح هنا
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
            <FaWhatsapp className="w-10 h-10 text-green-500" />
          </div>

          {/* زر الدردشة */}
          <a
            href="https://wa.me/97472041794"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold"
          >
            Chat on WhatsApp
          </a>

          {/* زر الإغلاق */}
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
