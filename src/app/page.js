"use client";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { ArrowRight, Wind, Smile, BookOpen, Heart, Sun, CloudRain, Gamepad2 } from "lucide-react";

// Components
import { MotionWrapper } from "@/components/MotionWrapper"; // Pastikan path ini benar sesuai file kamu
import QuoteCard from "@/components/QuoteCard";
import PopItGame from "@/components/PopItGame";
import WellnessBuddy from "@/components/WellnessBuddy";
import { UserContext } from "@/context/UserContext";
import ToolsCarousel from "@/components/ToolsCarousel";
import ArticlesCarousel from "@/components/ArticlesCarousel";

export default function Home() {
  const { userName, setUserName } = useContext(UserContext);
  const [greeting, setGreeting] = useState("Hello");
  const [lastMood, setLastMood] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const hour = new Date().getHours();
    setGreeting(
      hour < 12 ? "Selamat Pagi" : hour < 18 ? "Selamat Siang" : "Selamat Malam"
    );

    const savedName = localStorage.getItem("user_name");
    const savedMoods = JSON.parse(localStorage.getItem("moods") || "[]");

    savedName && setUserName(savedName);
    savedMoods.length && setLastMood(savedMoods.at(-1));
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full overflow-hidden text-gray-800 relative min-h-screen">

      {/* BACKGROUND DECORATION */}
      <div className="fixed top-0 -left-20 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none"></div>
      <div className="fixed top-20 -right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>

      {/* Container utama: Padding disesuaikan biar lega di HP */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20 relative z-10">

        {/* ================= HERO SECTION ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 md:mb-24">

          <div className="text-center lg:text-left space-y-6">

            {/* BADGE */}
            <MotionWrapper animation="slideInDown" duration={0.6} delay={0.3}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-white/50 shadow-sm text-indigo-600 text-xs md:text-sm font-bold mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                </span>
                Your Safe Space is Here
              </div>
            </MotionWrapper>

            {/* MAIN TITLE - Ukuran font responsif (4xl di HP, 7xl di Desktop) */}
            <MotionWrapper animation="fadeInUp" duration={0.8} delay={0.3}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900 leading-tight tracking-tight">
                {userName ? (
                  <>
                    {greeting}, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600">
                      {userName}.
                    </span>
                  </>
                ) : (
                  <>
                    Don't Just Survive, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600">
                      Thrive & Breathe.
                    </span>
                  </>
                )}
              </h1>
            </MotionWrapper>

            {/* SUBTITLE */}
            <MotionWrapper animation="fadeInUp" duration={0.8} delay={0.4}>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                LuMind adalah ruang digital untuk merawat pikiranmu. Lacak emosi, atur napas, dan temukan ketenangan.
              </p>
            </MotionWrapper>

            {/* CTA BUTTONS */}
            <MotionWrapper animation="popIn" duration={0.7} delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                {lastMood ? (
                  <div className="flex items-center gap-4 bg-white/80 backdrop-blur border border-white p-2 pr-6 rounded-2xl shadow-lg">
                    <div className={`p-3 rounded-xl text-white shadow-md ${lastMood.mood === 'Happy' ? 'bg-green-500' : lastMood.mood === 'Sad' ? 'bg-blue-500' : lastMood.mood === 'Angry' ? 'bg-rose-500' : lastMood.mood === 'Stressed' ? 'bg-purple-500' : 'bg-yellow-500'}`}>
                      <Smile size={24} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Last Check-in</p>
                      <p className="text-lg font-black text-gray-800">{lastMood.mood}</p>
                    </div>
                    <Link href="/mood" className="ml-2 p-2 hover:bg-teal-100 hover:text-teal-600 rounded-full transition-colors">
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                ) : (
                  <Link href="/mood" className="flex items-center justify-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-200 hover:bg-teal-700 hover:-translate-y-1 transition-all duration-300">
                    <Smile size={20} /> Cek Mood
                  </Link>
                )}
                <Link
                  href="/breathing"
                  className="group flex items-center justify-center gap-2 px-8 py-4 bg-white/80 backdrop-blur text-gray-700 border border-white rounded-2xl font-bold shadow-sm hover:bg-white hover:text-teal-600 transition-all duration-300"
                >
                  <Wind size={20} className="transition-transform duration-500 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 -translate-x-0.5" />
                  <span className="inline-block transition-all duration-500 opacity-60 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1">
                    Latihan Napas
                  </span>
                </Link>
              </div>
            </MotionWrapper>
          </div>

          {/* HERO IMAGE */}
          <div className="relative flex justify-center items-center h-[300px] md:h-[400px]">
            <MotionWrapper animation="zoomIn" duration={0.8} delay={0.5}>
              <div className="absolute w-60 h-60 md:w-72 md:h-72 bg-teal-200/40 rounded-full animate-breathe blur-xl"></div>
              <div className="absolute w-44 h-44 md:w-56 md:h-56 bg-purple-200/40 rounded-full animate-breathe animation-delay-2000 blur-lg"></div>
              <div className="relative z-20 bg-white/70 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-2xl border border-white/50 text-center max-w-xs transform hover:scale-105 transition duration-500 cursor-pointer">
                <div className="bg-gradient-to-tr from-rose-100 to-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <Heart className="text-rose-500 fill-rose-500 animate-pulse" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {userName ? `You matter, ${userName}.` : "You matter."}
                </h3>
                <p className="text-gray-500 mt-2 text-sm">
                  {lastMood ? `Terakhir kamu merasa ${lastMood.mood}.` : "Ambil napas dalam-dalam, dan hembuskan perlahan."}
                </p>
              </div>
              <div className="absolute top-10 right-10 bg-white/80 backdrop-blur p-3 rounded-2xl shadow-lg animate-bounce duration-[3000ms] text-orange-400">
                <Sun size={24} fill="currentColor" />
              </div>
              <div className="absolute bottom-10 left-10 bg-white/80 backdrop-blur p-3 rounded-2xl shadow-lg animate-bounce duration-[4000ms] text-blue-400">
                <CloudRain size={24} fill="currentColor" />
              </div>
            </MotionWrapper>
          </div>
        </section>

        {/* ================= FEATURES SECTION ================= */}
        <section className="mb-16 md:mb-24">
          <MotionWrapper animation="fadeInUp" duration={0.8} delay={0.2}>
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-gray-800 flex items-center justify-center gap-2">
                Discover Tools <span className="text-teal-500 animate-pulse">●</span>
              </h2>
            </div>
          </MotionWrapper>
          <div className="flex gap-4 md:gap-5 overflow-x-auto pb-8 -mx-4 px-4 md:-mx-6 md:px-6 snap-x scrollbar-hide">
            <ToolsCarousel />
          </div>
        </section>

        {/* ================= WELLNESS BUDDY ================= */}
        <section className="mb-16 md:mb-24">
          <MotionWrapper animation="fadeInUp" duration={0.8}>
            <div className="bg-indigo-600 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400 opacity-20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <MotionWrapper animation="fadeInUp" duration={0.8}>
                  <div className="text-center lg:text-left">
                    <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                      Your Daily Companion
                    </h2>
                    <p className="text-indigo-100 text-lg mb-6 leading-relaxed">
                      Bangun kebiasaan baik setiap hari. Selesaikan target kecilmu untuk melihat teman virtualmu bahagia!
                    </p>
                    <div className="inline-flex gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-lg text-sm font-bold border border-white/10">
                      🐣 Live Tracker
                    </div>
                  </div>
                </MotionWrapper>
                <div className="flex justify-center">
                  <WellnessBuddy />
                </div>
              </div>
            </div>
          </MotionWrapper>
        </section>

        {/* ================= POP IT GAME ================= */}
        <section className="mb-16 md:mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <MotionWrapper animation="slideInLeft" duration={0.8}>
            <div className="text-center lg:text-right pr-0 lg:pr-10">
              <div className="inline-block p-3 bg-teal-100 text-teal-600 rounded-2xl mb-4 shadow-sm">
                <Gamepad2 size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-6">
                Butuh Istirahat Kilat?
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Kadang yang kamu butuhkan hanyalah pengalihan sederhana. Mainkan game Pop-It ini sepuasnya.
              </p>
              <div className="inline-block px-5 py-3 bg-teal-50 text-teal-700 border border-teal-200 rounded-xl text-sm font-bold">
                🍬 Stress Relief Toy
              </div>
            </div>
          </MotionWrapper>
          <MotionWrapper animation="slideInRight" duration={0.8}>
            <div className="flex justify-center">
              <PopItGame />
            </div>
          </MotionWrapper>
        </section>

        {/* ================= ARTICLES PREVIEW (PERBAIKAN LAYOUT DISINI) ================= */}
        {/*
           Perhatikan: Saya membuat struktur Header di sini agar responsif.
           Jika ArticlesCarousel kamu sudah punya header di dalamnya,
           sebaiknya header di dalam component itu di-hide atau dihapus,
           dan gunakan yang ini agar rapi.
        */}
        <section className="mb-16 md:mb-24">
          <MotionWrapper animation="fadeInUp" duration={0.8}>
            {/* Header Flex: Column di HP, Row di Tablet ke atas */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 px-2 gap-4 md:gap-0">
              <div>
                <h2 className="text-3xl font-black text-gray-800 flex items-center gap-2">
                  Learn & Grow <BookOpen className="text-rose-400 w-6 h-6 hidden md:block" />
                </h2>
                <p className="text-gray-500 mt-1">Wawasan praktis untuk harimu.</p>
              </div>

              {/* Tombol Lihat Semua yang rapi di mobile */}
              <Link
                href="/articles"
                className="group flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-full font-bold text-sm hover:bg-teal-100 transition-all self-start md:self-auto"
              >
                Lihat Semua
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Carousel Artikel */}
            <ArticlesCarousel />
          </MotionWrapper>
        </section>

        {/* ================= QUOTE ================= */}
        <div className="mb-10">
          <MotionWrapper animation="scaleIn" duration={0.8}>
            <QuoteCard />
          </MotionWrapper>
        </div>

      </div>
    </div>
  );
}