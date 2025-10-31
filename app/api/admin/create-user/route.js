// ✅ app/api/admin/create-user/route.js
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// ✅ نفعّل الـ dynamic mode عشان ما يقيّم وقت الـ build
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    // 🔒 تأكد أن المتغيرات موجودة
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
      console.error("❌ Missing Supabase environment variables.");
      return NextResponse.json(
        { error: "إعدادات Supabase غير مكتملة." },
        { status: 500 }
      );
    }

    // ⚙️ إنشاء عميل Supabase داخل الدالة فقط
    const supabaseAdmin = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // 📩 قراءة البيانات من الطلب
    const { email, password, role } = await request.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "الرجاء توفير البريد الإلكتروني وكلمة المرور والدور." },
        { status: 400 }
      );
    }

    // 👤 إنشاء المستخدم
    const { data: userData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError) {
      console.error("Auth Error:", authError);
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // 🧾 إدخال بيانات الملف الشخصي
    const { error: profileError } = await supabaseAdmin
      .from("user_profiles")
      .insert([
        {
          id: userData.user.id,
          email: userData.user.email,
          role,
        },
      ]);

    if (profileError) {
      console.error("Profile Insert Error:", profileError);
      await supabaseAdmin.auth.admin.deleteUser(userData.user.id);
      return NextResponse.json(
        { error: "فشل إدخال بيانات المستخدم." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "تم إنشاء المستخدم بنجاح." });
  } catch (error) {
    console.error("General Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ داخلي في الخادم." },
      { status: 500 }
    );
  }
}
