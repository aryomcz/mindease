"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Wind, Smile, BookOpen, Heart, Sun, CloudRain, Gamepad2 } from "lucide-react";

// Components
import QuoteCard from "@/components/QuoteCard"; 
import PopItGame from "@/components/PopItGame"; // <--- Pastikan ini di-import
import WellnessBuddy from "@/components/WellnessBuddy";
import WelcomeModal from "@/components/WelcomeModal";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("Hello");
  const [lastMood, setLastMood] = useState(null);

  useEffect(() => {
    // Logic Sapaan Waktu
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Selamat Pagi");
    else if (hour < 18) setGreeting("Selamat Siang");
    else setGreeting("Selamat Malam");

    // Logic Ambil Mood Terakhir
    const savedMoods = JSON.parse(localStorage.getItem("moods") || "[]");
    if (savedMoods.length > 0) {
      setLastMood(savedMoods[savedMoods.length - 1]);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 animate-gradient overflow-hidden relative text-gray-800">
      
      <WelcomeModal onNameSubmit={setUserName} />

      {/* BACKGROUND DECORATION */}
      <div className="fixed top-0 -left-20 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none"></div>
      <div className="fixed top-20 -right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 relative z-10">
        
        {/* ================= HERO SECTION ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="text-center lg:text-left space-y-6 animate-fade-in-up">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-white/50 shadow-sm text-indigo-600 text-sm font-bold mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              Your Safe Space is Here
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight tracking-tight">
              {userName ? (
                <>
                  {greeting}, <br/>
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
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
              MindEase adalah ruang digital untuk merawat pikiranmu. Lacak emosi, atur napas, dan temukan ketenangan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
              
              {lastMood ? (
                // JIKA SUDAH ADA MOOD
                <div className="flex items-center gap-4 bg-white/80 backdrop-blur border border-white p-2 pr-6 rounded-2xl shadow-lg animate-fade-in-up">
                   <div className={`p-3 rounded-xl text-white shadow-md ${
                      lastMood.mood === 'Happy' ? 'bg-green-500' :
                      lastMood.mood === 'Sad' ? 'bg-blue-500' :
                      lastMood.mood === 'Angry' ? 'bg-rose-500' :
                      lastMood.mood === 'Stressed' ? 'bg-purple-500' : 'bg-yellow-500'
                   }`}>
                      <Smile size={24} />
                   </div>
                   <div className="text-left">
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Last Check-in</p>
                      <p className="text-lg font-black text-gray-800">{lastMood.mood}</p>
                   </div>
                   <Link href="/mood" className="ml-2 p-2 bg-gray-100 hover:bg-teal-100 hover:text-teal-600 rounded-full transition-colors" title="Update Mood">
                      <ArrowRight size={16}/>
                   </Link>
                </div>
              ) : (
                // JIKA BELUM ADA
                <Link href="/mood" className="flex items-center justify-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-200 hover:bg-teal-700 hover:-translate-y-1 transition-all duration-300">
                  <Smile size={20} /> Cek Mood
                </Link>
              )}

              <Link href="/breathing" className="flex items-center justify-center gap-2 px-8 py-4 bg-white/80 backdrop-blur text-gray-700 border border-white rounded-2xl font-bold shadow-sm hover:bg-white hover:text-teal-600 transition-all duration-300">
                <Wind size={20} /> Latihan Napas
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center items-center h-[400px] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
             <div className="absolute w-72 h-72 bg-teal-200/40 rounded-full animate-breathe blur-xl"></div>
             <div className="absolute w-56 h-56 bg-purple-200/40 rounded-full animate-breathe animation-delay-2000 blur-lg"></div>
             <div className="relative z-20 bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 text-center max-w-xs transform hover:scale-105 transition duration-500">
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
          </div>
        </section>

        {/* ================= WELLNESS BUDDY ================= */}
        <section className="mb-24 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="bg-indigo-600 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400 opacity-20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
              <div className="flex justify-center">
                 <WellnessBuddy />
              </div>
            </div>
          </div>
        </section>

        {/* ================= FUN ZONE: POP-IT (SUDAH KEMBALI!) ================= */}
        <section className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in-up">
          
          {/* Deskripsi (Kiri) */}
          <div className="text-center lg:text-right order-2 lg:order-1 pr-0 lg:pr-10">
             <div className="inline-block p-3 bg-teal-100 text-teal-600 rounded-2xl mb-4 shadow-sm">
                <Gamepad2 size={32} />
             </div>
             <h2 className="text-4xl font-black text-gray-800 mb-6">
               Butuh Istirahat Kilat?
             </h2>
             <p className="text-gray-600 text-lg mb-8 leading-relaxed">
               Kadang yang kamu butuhkan hanyalah pengalihan sederhana. Mainkan game Pop-It ini sepuasnya, rasakan sensasi 'ceklik' yang menenangkan.
             </p>
             <div className="inline-block px-5 py-3 bg-teal-50 text-teal-700 border border-teal-200 rounded-xl text-sm font-bold">
               🍬 Stress Relief Toy
             </div>
          </div>

          {/* Game (Kanan) */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-start">
             <PopItGame />
          </div>

        </section>

        {/* ================= ARTICLES PREVIEW ================= */}
        <section className="mb-24 animate-fade-in-up">
           <div className="flex justify-between items-end mb-8 px-2">
              <div>
                <h2 className="text-3xl font-black text-gray-800">Learn & Grow</h2>
                <p className="text-gray-500 mt-1">Artikel terbaru untuk wawasanmu.</p>
              </div>
              <Link href="/articles" className="text-teal-600 font-bold hover:underline flex items-center gap-1">
                 Lihat Semua <ArrowRight size={16}/>
              </Link>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<BookOpen className="w-8 h-8 text-rose-500" />} 
                title="Artikel Pilihan" 
                desc="Tips psikologi praktis untuk hadapi hari-hari berat."
                link="/articles"
                color="hover:border-rose-400"
              />
              <div className="md:col-span-2 bg-gradient-to-r from-teal-500 to-indigo-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-center relative overflow-hidden shadow-lg group cursor-pointer hover:scale-[1.01] transition-transform">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                 <h3 className="text-2xl font-bold mb-2 relative z-10">Mengapa "Healing" itu Penting?</h3>
                 <p className="text-teal-100 mb-6 max-w-lg relative z-10">
                    Simak penjelasan ilmiah tentang bagaimana istirahat sejenak bisa meningkatkan produktivitas dan kebahagiaanmu.
                 </p>
                 <Link href="/articles" className="inline-flex items-center gap-2 bg-white text-teal-700 px-5 py-3 rounded-xl font-bold w-fit shadow-md group-hover:bg-teal-50 transition">
                    Baca Artikel <ArrowRight size={18}/>
                 </Link>
              </div>
           </div>
        </section>

        {/* QUOTE */}
        <div className="mb-10">
          <QuoteCard />
        </div>

      </div>
    </main>
  );
}

// Component FeatureCard
function FeatureCard({ icon, title, desc, link, color }) {
  return (
    <Link 
      href={link} 
      className={`group bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] shadow-sm border-2 border-transparent ${color} hover:shadow-xl hover:bg-white hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col h-full justify-between`}
    >
      <div>
        <div className="mb-6 bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
      </div>
      
      <div className="flex items-center text-sm font-bold text-gray-400 group-hover:text-gray-900 transition-colors">
        Buka Library <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}