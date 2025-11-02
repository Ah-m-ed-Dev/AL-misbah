
"use client";
import { useState } from "react";

export default function WhatsappPopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed right-6 bottom-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path
            fill="currentColor"
            d="M20.52 3.48A11.78 11.78 0 0 0 12 .25 11.79 11.79 0 0 0 .25 12 11.53 11.53 0 0 0 2.4 18.7L1 23l4.44-1.37A11.8 11.8 0 0 0 12 23.75 11.79 11.79 0 0 0 23.75 12a11.53 11.53 0 0 0-3.23-8.52Z"
          />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center gap-4">
            <svg viewBox="0 0 24 24" className="w-24 h-24 text-green-500">
              <path
                fill="currentColor"
                d="M20.52 3.48A11.78 11.78 0 0 0 12 .25 11.79 11.79 0 0 0 .25 12 11.53 11.53 0 0 0 2.4 18.7L1 23l4.44-1.37A11.8 11.8 0 0 0 12 23.75 11.79 11.79 0 0 0 23.75 12a11.53 11.53 0 0 0-3.23-8.52Z"
              />
            </svg>

            <a href="https://wa.me/97472041794"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold"
            >
              Chat on WhatsApp
            </a>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700 mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}