"use client";

export default function TermsPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white p-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl max-w-4xl mx-auto mt-20">
        <h1 className="text-3xl font-bold mb-6">الشروط والأحكام</h1>
        <p className="leading-relaxed">
          باستخدامك لموقع مركز المصباح للتدريب، فإنك توافق على الالتزام بهذه الشروط والأحكام.
        </p>
      </div>
    </div>
  );
}
