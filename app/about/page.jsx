export default function AboutPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="bg-white/90 p-10 rounded-2xl text-center shadow-2xl max-w-4xl backdrop-blur-md">
        <h1 className="text-5xl font-bold mb-6 text-[#800020]">عن مركز المصباح للتدريب المهني</h1>
        <p className="text-lg leading-relaxed text-gray-800 mb-6">
          مركز المصباح للتدريب المهني هو مؤسسة تعليمية وتدريبية متخصصة تهدف إلى
          بناء القدرات وصقل المهارات المهنية للشباب والموظفين والعاملين في مختلف
          القطاعات. نسعى من خلال برامجنا إلى تقديم تجربة تعليمية متكاملة تجمع بين
          الجانب النظري والتطبيقي، بما يتوافق مع متطلبات سوق العمل المحلية
          والإقليمية.
        </p>
        <p className="text-lg leading-relaxed text-gray-800 mb-6">
          نُقدّم دورات متخصصة في مجالات مثل الحاسب الآلي، الإدارة، الكهرباء،
          صيانة الأجهزة، التصميم، السلامة المهنية، والمزيد. كما نتعاون مع جهات
          معتمدة لتوفير شهادات دولية تفتح آفاقًا واسعة أمام المتدربين لمواصلة
          التطور المهني.
        </p>
        <p className="text-lg leading-relaxed text-gray-800 mb-6">
          نؤمن بأن التدريب هو مفتاح النجاح، لذلك نسعى دائمًا لتوفير بيئة تعليمية
          حديثة تعتمد على أساليب مبتكرة ومدربين ذوي خبرة عالية، لضمان تحقيق أفضل
          النتائج لطلابنا.
        </p>
        <p className="text-lg leading-relaxed text-[#800020] font-semibold">
          رؤيتنا: أن نكون المركز الرائد في التدريب المهني على مستوى الوطن العربي. <br />
          رسالتنا: تمكين الأفراد بالمعرفة والمهارة لبناء مستقبل مهني مستدام.
        </p>
      </div>
    </div>
  );
}
