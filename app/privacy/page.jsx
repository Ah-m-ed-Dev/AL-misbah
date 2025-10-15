export default function PrivacyPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="bg-white/90 p-10 rounded-2xl shadow-2xl max-w-4xl text-gray-800 backdrop-blur-md border border-[#800020]/30">
        <h1 className="text-5xl font-bold mb-6 text-center text-[#800020]">
          سياسة الخصوصية
        </h1>

        <p className="text-lg leading-relaxed mb-6">
          في <span className="font-semibold text-[#800020]">مركز المصباح للتدريب المهني</span>، 
          نؤمن بأن الخصوصية حق أساسي لكل مستخدم وزائر. نحن ملتزمون بحماية بياناتك الشخصية 
          والحفاظ عليها بسرية تامة وفقًا لأفضل المعايير القانونية والأمنية العالمية.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          يتم جمع المعلومات الشخصية فقط عند الضرورة، مثل التسجيل في الدورات 
          أو التواصل معنا للحصول على خدماتنا التدريبية. وتشمل هذه البيانات 
          الاسم، رقم الهاتف، البريد الإلكتروني، وأي معلومات مطلوبة لتقديم 
          الخدمة بأعلى جودة ممكنة.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          نحن لا نشارك بياناتك مع أي طرف ثالث إلا في حال وجود التزام قانوني 
          أو بموافقتك المسبقة. كما نحرص على تطبيق تقنيات متقدمة لحماية البيانات 
          ومنع أي استخدام غير مصرح به.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          يحتفظ مركز المصباح بالحق في تحديث سياسة الخصوصية من وقت لآخر لضمان 
          التوافق مع التطورات التقنية والقانونية، وسنعلن عن أي تغييرات جوهرية 
          بوضوح في هذه الصفحة.
        </p>

        <p className="text-lg leading-relaxed text-[#800020] font-semibold text-center">
          نقدر ثقتك، ونعاهدك على أن تبقى خصوصيتك أمانة في عنقنا.
        </p>
      </div>
    </div>
  );
}
