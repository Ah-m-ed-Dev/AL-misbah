"use client";

export default function WhatsappBubble() {
  return (
    <a
      href="https://wa.me/97472041794"
      className="fixed left-6 bottom-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl flex items-center gap-3 pr-5 pl-3 py-2"
    >
      <span className="w-10 h-10 rounded-full bg-white/20 grid place-items-center">
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="currentColor" d="M20.52 3.48A11.78 11.78 0 0 0 12 .25 11.79 11.79 0 0 0 .25 12 11.53 11.53 0 0 0 2.4 18.7L1 23l4.44-1.37A11.8 11.8 0 0 0 12 23.75 11.79 11.79 0 0 0 23.75 12a11.53 11.53 0 0 0-3.23-8.52ZM12 21.3a9.9 9.9 0 0 1-5.05-1.4l-.36-.21-2.63.81.85-2.55-.24-.37A9.94 9.94 0 1 1 12 21.3Zm5.53-7.4c-.3-.15-1.74-.86-2-.95s-.46-.15-.65.15-.75.95-.92 1.15-.34.22-.63.07a8.16 8.16 0 0 1-2.41-1.49 9 9 0 0 1-1.66-2.06c-.17-.3 0-.46.13-.61s.3-.37.45-.56a2 2 0 0 0 .3-.56.51.51 0 0 0-.02-.56c-.07-.15-.65-1.56-.9-2.12s-.48-.49-.65-.5h-.56a1.07 1.07 0 0 0-.77.36 3.24 3.24 0 0 0-1 2.4 5.63 5.63 0 0 0 1.19 2.88 12.87 12.87 0 0 0 4.93 4.58 16.9 16.9 0 0 0 1.69.7 4 4 0 0 0 1.84.11 3 3 0 0 0 2-1.42 2.47 2.47 0 0 0 .17-1.43c-.08-.13-.3-.21-.6-.36Z"/>
        </svg>
      </span>
      <span className="font-semibold">Chat with us</span>
    </a>
  );
}
