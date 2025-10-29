// ملف: app/api/admin/create-user/route.js

import { createClient } from '@supabase/supabase-js';

// ⚠️ استخدم متغيرات البيئة لـ SERVICE_ROLE_KEY
// تأكد من إضافة هذه المتغيرات في ملف .env:
// NEXT_PUBLIC_SUPABASE_URL=...
// SUPABASE_SERVICE_ROLE_KEY=...
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // 🔑 مفتاح المدير (Service Role)
);

export async function POST(request) {
  try {
    const { email, password, role } = await request.json();

    if (!email || !password || !role) {
      return new Response(JSON.stringify({ error: "الرجاء توفير البريد الإلكتروني وكلمة المرور والدور." }), { status: 400 });
    }

    // 1. إنشاء المستخدم باستخدام Supabase Admin (لتجاوز قيود الصلاحيات)
    const { data: userData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // تأكيد البريد الإلكتروني مباشرةً
    });

    if (authError) {
      console.error("Auth Error:", authError);
      return new Response(JSON.stringify({ error: authError.message }), { status: 400 });
    }

    // 2. إدخال بيانات المستخدم في جدول الملفات الشخصية (لتخزين الدور)
    const { error: profileError } = await supabaseAdmin
      .from('user_profiles') // ✅ تأكد من أن هذا هو اسم جدول الملفات الشخصية
      .insert([
        { id: userData.user.id, email: userData.user.email, role: role }
      ]);
    
    if (profileError) {
        console.error("Profile Insert Error:", profileError);
        // يجب هنا حذف المستخدم الذي تم إنشاؤه في الخطوة 1 للتنظيف
        await supabaseAdmin.auth.admin.deleteUser(userData.user.id);
        return new Response(JSON.stringify({ error: "فشل تعيين الدور. تم التراجع عن إنشاء المستخدم." }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "تم إنشاء المستخدم بنجاح" }), { status: 200 });
    
  } catch (error) {
    console.error("General Error:", error);
    return new Response(JSON.stringify({ error: "خطأ داخلي في الخادم." }), { status: 500 });
  }
}