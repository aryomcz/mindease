"use client";
import Link from "next/link";
import { ArrowRight, Wind, Smile, BookOpen, Heart, Sun, CloudRain } from "lucide-react";
import QuoteCard from "@/components/QuoteCard"; 
import PopItGame from "@/components/PopItGame";

export default function Home() {
  return (
    // 1. BACKGROUND DISAMAKAN DENGAN HALAMAN LAIN (Indigo-Purple-Teal)
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 animate-gradient overflow-hidden relative">
      
      {/* BACKGROUND DECORATION (Blobs - Warna disesuaikan biar blend) */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* 2. PADDING TOP 32 (Agar aman dari Navbar) */}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-12 relative z-10">
        
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-white/50 shadow-sm text-indigo-600 text-sm font-bold mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              Your Safe Space is Here
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-gray-800 leading-tight tracking-tight">
              Don't Just Survive, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">
                Thrive & Breathe.
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
              MindEase membantu kamu mengenali emosi, mengurangi stres, dan menemukan ketenangan dalam hitungan menit. 
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link href="/mood" className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-bold shadow-lg hover:bg-black hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <Smile size={20} />
                Cek Mood Hari Ini
              </Link>
              <Link href="/breathing" className="flex items-center justify-center gap-2 px-8 py-4 bg-white/50 backdrop-blur text-gray-700 border border-white/60 rounded-xl font-bold shadow-sm hover:bg-white hover:text-teal-600 transition-all duration-300">
                <Wind size={20} />
                Latihan Napas
              </Link>
            </div>
          </div>

          {/* Visual Interactive (Breathing Circle) */}
          <div className="relative flex justify-center items-center h-[400px] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
             {/* Lingkaran Luar (Breathing Animation) */}
            <div className="absolute w-72 h-72 bg-teal-200/40 rounded-full animate-breathe blur-xl"></div>
            <div className="absolute w-56 h-56 bg-purple-200/40 rounded-full animate-breathe animation-delay-2000 blur-lg"></div>
            
            {/* Kartu Tengah (Glassmorphism) */}
            <div className="relative z-20 bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 text-center max-w-xs transform hover:scale-105 transition duration-500">
              <div className="bg-gradient-to-tr from-rose-100 to-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                 <Heart className="text-rose-500 fill-rose-500 animate-pulse" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">You matter.</h3>
              <p className="text-gray-500 mt-2 text-sm">Ambil napas dalam-dalam, dan hembuskan perlahan.</p>
              
              {/* Fake Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-xs text-gray-400 mb-1 font-semibold">
                  <span>Stress Level</span>
                  <span className="text-teal-600">Reducing...</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-400 to-indigo-400 h-2 rounded-full w-[60%] animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* 3. DEKORASI DIPERBAIKI (Pakai Ikon Lucide) */}
            <div className="absolute top-10 right-10 bg-white/80 backdrop-blur p-3 rounded-2xl shadow-lg animate-bounce duration-[3000ms] text-orange-400">
                <Sun size={24} fill="currentColor" />
            </div>
            <div className="absolute bottom-10 left-10 bg-white/80 backdrop-blur p-3 rounded-2xl shadow-lg animate-bounce duration-[4000ms] text-blue-400">
                <CloudRain size={24} fill="currentColor" />
            </div>
          </div>
        </section>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <FeatureCard 
            icon={<Smile className="w-8 h-8 text-teal-500" />} 
            title="Mood Tracker" 
            desc="Catat emosi harianmu dan lihat grafik perkembangan mentalmu."
            link="/mood"
            color="hover:border-teal-400"
          />
          <FeatureCard 
            icon={<Wind className="w-8 h-8 text-indigo-500" />} 
            title="Breathing" 
            desc="Panduan visual pernapasan untuk redakan cemas seketika."
            link="/breathing"
            color="hover:border-indigo-400"
          />
          <FeatureCard 
            icon={<BookOpen className="w-8 h-8 text-rose-500" />} 
            title="Articles" 
            desc="Tips psikologi praktis untuk hadapi hari-hari berat."
            link="/articles"
            color="hover:border-rose-400"
          />
        </div>

        {/* --- BAGIAN BARU: FUN ZONE --- */}
      <section className="mt-20 mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Deskripsi */}
        <div className="text-center lg:text-right order-2 lg:order-1 animate-fade-in-up">
           <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
             Butuh Istirahat Kilat?
           </h2>
           <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
             Kadang yang kamu butuhkan hanyalah pengalihan sederhana. Mainkan game Pop-It ini sepuasnya, rasakan sensasi 'ceklik' yang menenangkan tanpa harus beli mainan plastik.
           </p>
           <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-lg text-sm font-bold">
             🧠 Melatih Fokus & Motorik
           </div>
        </div>

        {/* Komponen Pop It */}
        <div className="order-1 lg:order-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
           <PopItGame />
        </div>

      </section>

        {/* Quote Section */}
        <div className="mt-20">
          <QuoteCard />
        </div>

      </div>
    </main>
  );
}

// 4. FEATURE CARD YANG LEBIH GLASSY
function FeatureCard({ icon, title, desc, link, color }) {
  return (
    <Link 
      href={link} 
      className={`group bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-sm border-2 border-transparent ${color} hover:shadow-xl hover:bg-white transition-all duration-300 relative overflow-hidden`}
    >
      <div className="mb-4 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-4">{desc}</p>
      
      <div className="flex items-center text-sm font-bold text-gray-400 group-hover:text-gray-900 transition-colors">
        Coba Sekarang <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
      
      {/* Dekorasi Background Card */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-xl"></div>
    </Link>
  );
}