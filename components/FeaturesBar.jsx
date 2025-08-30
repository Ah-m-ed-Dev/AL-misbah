"use client";

const items = [
  { 
    title: "تنوع في التدريب", 
    subtitle: "عن بُعد (مباشر) - قاعة دراسية", 
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="currentColor" d="M3 5h18v4H3V5Zm0 6h18v8H3v-8Zm2 2v4h14v-4H5Z"/></svg>
    ) 
  },
  { 
    title: "مدربون محترفون", 
    subtitle: "ذوي كفاءة عالية ومعتمدون دولياً", 
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5 0-9 2.5-9 5.5V22h18v-2.5C21 16.5 17 14 12 14Z"/></svg>
    ) 
  },
  { 
    title: "معتمدون دولياً", 
    subtitle: "مركز تدريب واختبار معتمد", 
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7"><path fill="currentColor" d="M12 2 2 7l10 5 10-5Zm0 7L2 4v13l10 5 10-5V4Z"/></svg>
    ) 
  },
];

export default function FeaturesBar() {
  return (
    <div className="bg-[#7b0b4c] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="shrink-0 bg-white/10 rounded-2xl p-3">{it.icon}</div>
            <div>
              <div className="text-lg font-bold">{it.title}</div>
              <div className="text-sm text-white/80">{it.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
