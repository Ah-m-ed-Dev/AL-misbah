import "./globals.css";
import { Cairo } from "next/font/google";
import { AppProvider } from "./context/AppContext";
import WhatsappWidget from "@/components/WhatsappBubble";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${cairo.className} bg-white text-gray-900`}>
        <AppProvider>{children}</AppProvider>
<WhatsappBubble/>
      </body>
    </html>
  );
}
