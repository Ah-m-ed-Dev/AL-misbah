"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHeadphones, FaVideo, FaCreditCard, FaGlobe } from "react-icons/fa";

/* 🎨 تعريف الألوان المخصصة */
const COLORS = {
  primaryDark: "#0d1b2a", // خلفية داكنة
  accent: "#fbc02d", // ذهبي للنبرة
  maroon: "#601a43", // خمري أساسي
};

/* 🎬 مكون الفيديو المنبثق */
const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-auto aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 md:-right-10 text-white text-3xl font-bold p-2 z-50 hover:text-red-500 transition"
          aria-label="إغلاق الفيديو"
        >
          &times;
        </button>
        <iframe
          width="100%"
          height="100%"
          src={videoUrl}
          title="فيديو ترويجي للبث المباشر"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-2xl"
        ></iframe>
      </div>
    </div>
  );
};

/* 🧩 الصفحة الرئيسية للبث المباشر */
export default function OnlineLearningPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /* 🏠 قسم الهيرو */
  const HeroSection = () => (
    <section
      className="relative text-white overflow-hidden"
      style={{ backgroundColor: COLORS.primaryDark }}
    >
      <Image
        src="/images/online-learning-hero-bg.jpg"
        alt="التعلم بالبث المباشر"
        fill
        quality={90}
        className="object-cover opacity-70"
        priority
      />
      <div className="relative z-10 pt-24 pb-40 md:py-40 px-6 max-w-7xl mx-auto">
        <nav className="text-sm flex justify-end gap-2 mb-8 md:mb-12">
          <Link href="/" className="hover:text-[#fbc02d]">
            الرئيسية
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#fbc02d]">البث المباشر</span>
        </nav>

        <div className="flex flex-col md:flex-row items-center justify-between text-right gap-10">
          <div className="md:w-1/2 order-2 md:order-1">
