import './globals.css';

// لو عندك خطوط عربية، ممكن تضيف هنا أو تستبدلها
// مثال:
// import { Geist, Geist_Mono } from './fonts';

export const metadata = {
  title: 'مركز المصباح',
  description: 'أكاديمية تدريب متكاملة لتطوير المهارات',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-white text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}
