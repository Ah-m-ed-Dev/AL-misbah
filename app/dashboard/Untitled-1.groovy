"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient"; // ✅ المسار الصحيح

export default function CoursesDashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    level: "",
    progress: "",
    img: "",
    price: "",
    discount: "",
    description: "",
  });

  // ✅ جلب الدورات من Supabase
  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from("courses").select("*");
      if (error) console.error(error);
      else setCourses(data);
    };
    fetchCourses();
  }, []);

  // ✅ إضافة دورة جديدة
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("courses").insert([formData]);
    if (error) {
      alert("❌ فشل في إضافة الدورة: " + error.message);
    } else {
      alert("✅ تم إضافة الدورة بنجاح!");
      setCourses([...courses, formData]);
      setFormData({
        title: "",
        category: "",
        level: "",
        progress: "",
        img: "",
        price: "",
        discount: "",
        description: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* ✅ زر العودة للرئيسية */}
      <button
        onClick={() => router.push("/")}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        ⬅️ العودة إلى الصفحة الرئيسية
      </button>

      {/* ✅ العنوان */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        لوحة التحكم - إدارة الدورات
      </h1>

      {/* ✅ نموذج إضافة دورة */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4"
      >
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key}
            value={formData[key]}
            onChange={(e) =>
              setFormData({ ...formData, [key]: e.target.value })
            }
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          ➕ إضافة دورة جديدة
        </button>
      </form>

      {/* ✅ عرض الدورات الحالية */}
      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition"
          >
            <img
              src={course.img}
              alt={course.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold text-gray-800 mt-3">
              {course.title}
            </h3>
            <p className="text-gray-600">{course.category}</p>
            <p className="text-gray-500 text-sm">{course.level}</p>
            <p className="text-green-600 font-bold mt-2">{course.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
