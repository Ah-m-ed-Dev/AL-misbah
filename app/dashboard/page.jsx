"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function CoursesDashboard() {
  const router = useRouter();

  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    discount: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    const { data, error } = await supabase.from("courses").select("*");
    if (error) console.error("❌ خطأ في جلب الدورات:", error);
    else setCourses(data);
  }

  // ✅ رفع صورة الدورة في bucket الصحيح
  async function uploadImage(file) {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("courses-images")
      .upload(fileName, file);

    if (error) {
      console.error("❌ خطأ أثناء رفع الصورة:", error);
      alert("فشل رفع الصورة!");
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("courses-images") // ✅ نفس الباكت
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  }

  async function addCourse(e) {
    e.preventDefault();

    if (
      !newCourse.title ||
      !newCourse.description ||
      !newCourse.price ||
      !newCourse.category
    ) {
      alert("⚠️ الرجاء إدخال جميع البيانات المطلوبة");
      return;
    }

    let imageUrl = newCourse.image;

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
      if (!imageUrl) return;
    }

    const { data, error } = await supabase
      .from("courses")
      .insert([{ ...newCourse, image: imageUrl }])
      .select();

    if (error) {
      console.error("❌ خطأ أثناء الإضافة:", error);
      alert(`حدث خطأ أثناء الإضافة:\n${error.message}`);
    } else {
      alert("✅ تمت إضافة الدورة بنجاح!");
      setCourses([...courses, data[0]]);
      setNewCourse({
        title: "",
        description: "",
        image: "",
        price: "",
        discount: "",
        category: "",
      });
      setImageFile(null);
    }
  }

  async function deleteCourse(id) {
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (error) {
      alert(`❌ فشل حذف الدورة:\n${error.message}`);
      console.error(error);
    } else {
      setCourses(courses.filter((c) => c.id !== id));
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center p-8 text-right"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-5xl animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#7b0b4c]">🎓 إدارة الدورات</h1>
            <p className="text-gray-700 mt-1 text-sm font-medium">
              مرحباً 👋 مدير الموارد البشرية
            </p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-[#7b0b4c] text-white rounded-lg hover:bg-[#5e0839] transition"
          >
            ← الرجوع للصفحة الرئيسية
          </button>
        </div>

        {/* ✅ نموذج إضافة دورة */}
        <form onSubmit={addCourse} className="bg-gray-50 rounded-xl p-4 mb-8 shadow-inner">
          <h2 className="text-lg font-semibold mb-4 text-[#7b0b4c]">
            ➕ إضافة دورة جديدة
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="عنوان الدورة"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              className="border rounded-lg px-3 py-2 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#7b0b4c] outline-none"
            />
            <input
              type="text"
              placeholder="الوصف"
              value={newCourse.description}
              onChange={(e) =>
                setNewCourse({ ...newCourse, description: e.target.value })
              }
              className="border rounded-lg px-3 py-2 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#7b0b4c] outline-none"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="border rounded-lg px-3 py-2 text-gray-800 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-none file:bg-[#7b0b4c] file:text-white file:cursor-pointer"
            />

            <input
              type="text"
              placeholder="السعر"
              value={newCourse.price}
              onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
              className="border rounded-lg px-3 py-2 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#7b0b4c] outline-none"
            />
            <input
              type="text"
              placeholder="الخصم (اختياري)"
              value={newCourse.discount}
              onChange={(e) =>
                setNewCourse({ ...newCourse, discount: e.target.value })
              }
              className="border rounded-lg px-3 py-2 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#7b0b4c] outline-none"
            />
            <input
              type="text"
              placeholder="الفئة (مثلاً: القانون / اللغة / التقنية)"
              value={newCourse.category}
              onChange={(e) =>
                setNewCourse({ ...newCourse, category: e.target.value })
              }
              className="border rounded-lg px-3 py-2 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#7b0b4c] outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-[#7b0b4c] text-white px-6 py-2 rounded-lg hover:bg-[#5e0839] transition"
          >
            إضافة الدورة
          </button>
        </form>

        {/* ✅ قائمة الدورات */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[#7b0b4c]">📚 الدورات الحالية</h2>
          {courses.length === 0 ? (
            <p className="text-gray-500">لا توجد دورات حالياً.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <img
                    src={course.image || "https://via.placeholder.com/300x150"}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-gray-900 font-bold mb-1">{course.title}</h3>
                    <p className="text-gray-700 text-sm mb-2">{course.description}</p>
                    <p className="text-[#5e0839] font-semibold mb-1">
                      السعر: {course.price}
                    </p>
                    {course.discount && (
                      <p className="text-green-700 text-sm">
                        الخصم: {course.discount}
                      </p>
                    )}
                    <p className="text-gray-600 text-sm mb-2">
                      الفئة: {course.category}
                    </p>
                    <button
                      onClick={() => deleteCourse(course.id)}
                      className="mt-3 px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 🖼️ إدارة الحملات الإعلانية */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4 text-[#7b0b4c]">
            🖼️ إدارة الحملات الإعلانية
          </h2>
          <CampaignsManager />
        </div>
      </div>
    </div>
  );
}

/* 👇 الكومبوننت الخاص بالحملات */
function CampaignsManager() {
  const [campaigns, setCampaigns] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  async function fetchCampaigns() {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .order("id", { ascending: false });

    if (error) console.error("❌ خطأ في جلب الحملات:", error);
    else setCampaigns(data || []);
  }

  async function uploadImage(file) {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("campaigns-images")
      .upload(fileName, file);

    if (error) {
      console.error("❌ خطأ أثناء رفع صورة الحملة:", error);
      alert("فشل رفع الصورة!");
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("campaigns-images")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  }

  async function addCampaignImage(e) {
    e.preventDefault();
    if (!imageFile) {
      alert("⚠️ الرجاء اختيار صورة أولاً");
      return;
    }

    setUploading(true);
    const imageUrl = await uploadImage(imageFile);
    setUploading(false);

    if (!imageUrl) return;

    const { data, error } = await supabase
      .from("campaigns")
      .insert([{ image: imageUrl }])
      .select();

    if (error) {
      alert("❌ حدث خطأ أثناء إضافة الصورة!");
      console.error(error);
    } else {
      alert("✅ تمت إضافة الصورة بنجاح!");
      setCampaigns([data[0], ...campaigns]);
      setImageFile(null);
    }
  }

  async function deleteCampaign(id) {
    const { error } = await supabase.from("campaigns").delete().eq("id", id);
    if (error) {
      alert("❌ فشل حذف الصورة!");
      console.error(error);
    } else {
      setCampaigns(campaigns.filter((c) => c.id !== id));
    }
  }

  return (
    <div className="bg-gray-50 rounded-xl p-4 shadow-inner">
      <form onSubmit={addCampaignImage} className="flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="border rounded-lg px-3 py-2 text-gray-800 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-none file:bg-[#7b0b4c] file:text-white file:cursor-pointer"
        />
        <button
          type="submit"
          disabled={uploading}
          className="bg-[#7b0b4c] text-white px-6 py-2 rounded-lg hover:bg-[#5e0839] transition"
        >
          {uploading ? "جاري الرفع..." : "رفع الصورة"}
        </button>
      </form>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {campaigns.map((c) => (
          <div key={c.id} className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition">
            <img src={c.image} alt="campaign" className="w-full h-48 object-cover" />
            <div className="p-3 flex justify-between items-center">
              <span className="text-gray-600 text-sm">حملة #{c.id}</span>
              <button
                onClick={() => deleteCampaign(c.id)}
                className="text-red-600 hover:text-red-800 text-sm font-semibold"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
