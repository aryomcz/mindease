"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  ArrowRight, Wind, Smile, BookOpen, Heart, Sun, CloudRain, 
  Moon, Gamepad2, Anchor, Mail, Sparkles 
} from "lucide-react";

// Import Components
import QuoteCard from "@/components/QuoteCard"; 
import PopItGame from "@/components/PopItGame";
import SleepCalculator from "@/components/SleepCalculator";
import GroundingExercise from "@/components/GroundingExercise";
import FutureLetter from "@/components/FutureLetter";
import WellnessBuddy from "@/components/WellnessBuddy";
import WelcomeModal from "@/components/WelcomeModal";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("Hello");
  
  // State untuk Tab Aktif (Default: Sleep)
  const [activeTab, setActiveTab] = useState("grounding");

  // Logic Sapaan
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Selamat Pagi");
    else if (hour < 18) setGreeting("Selamat Siang");
    else setGreeting("Selamat Malam");
  }, []);

  // Data Tabs untuk Wellness Hub
  const tabs = [
    { id: "grounding", label: "Calm Down", icon: <Anchor size={20}/>, color: "bg-purple-500", desc: "Redakan cemas (5-4-3-2-1)" },
    { id: "sleep", label: "Sleep Well", icon: <Moon size={20}/>, color: "bg-indigo-500", desc: "Kalkulator tidur" },
    { id: "play", label: "Relax Zone", icon: <Gamepad2 size={20}/>, color: "bg-teal-500", desc: "Main Pop-It" },
    { id: "letter", label: "Time Capsule", icon: <Mail size={20}/>, color: "bg-rose-500", desc: "Surat masa depan" },
  ];

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
              MindEase adalah ruang digital untuk merawat pikiranmu. Lacak emosi, atur napas, dan temukan ketenangan—semua di satu tempat.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
              <Link href="/mood" className="flex items-center justify-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-200 hover:bg-teal-700 hover:-translate-y-1 transition-all duration-300">
                <Smile size={20} /> Cek Mood
              </Link>
              <Link href="/breathing" className="flex items-center justify-center gap-2 px-8 py-4 bg-white/80 backdrop-blur text-gray-700 border border-white rounded-2xl font-bold shadow-sm hover:bg-white hover:text-teal-600 transition-all duration-300">
                <Wind size={20} /> Latihan Napas
              </Link>
            </div>
          </div>

          {/* Visual Breathing Circle */}
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
               <p className="text-gray-500 mt-2 text-sm">Ambil napas dalam-dalam, dan hembuskan perlahan.</p>
             </div>
          </div>
        </section>

        {/* ================= WELLNESS BUDDY (Daily Goals) ================= */}
        <section className="mb-24">
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

        {/* ================= INTERACTIVE TOOLBOX HUB (PENGGANTI TUMPUKAN) ================= */}
        <section className="mb-24 animate-fade-in-up">
          <div className="text-center mb-10">
             <h2 className="text-4xl font-black text-gray-800 mb-4">Apa yang kamu butuhkan?</h2>
             <p className="text-gray-600 text-lg">Pilih alat bantu yang sesuai dengan kondisimu saat ini.</p>
          </div>

          <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/60 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
            
            {/* SIDEBAR MENU (Desktop) / TOPBAR (Mobile) */}
            <div className="md:w-1/3 p-6 md:p-8 bg-white/40 backdrop-blur border-b md:border-b-0 md:border-r border-white/50 flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-visible no-scrollbar">
               {tabs.map((tab) => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`
                     flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left min-w-[200px] md:min-w-0
                     ${activeTab === tab.id 
                        ? "bg-white shadow-lg scale-105 border-l-4 border-teal-500" 
                        : "hover:bg-white/50 text-gray-500 hover:text-gray-800"
                     }
                   `}
                 >
                   <div className={`p-3 rounded-full text-white shadow-md ${tab.color}`}>
                      {tab.icon}
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-800">{tab.label}</h4>
                      <p className="text-xs text-gray-500">{tab.desc}</p>
                   </div>
                 </button>
               ))}
            </div>

            {/* CONTENT AREA */}
            <div className="flex-1 p-6 md:p-12 bg-white/30 flex items-center justify-center relative">
               
               {/* Transisi Halus */}
               <div className="w-full max-w-xl animate-fade-in-up key={activeTab}"> 
                  {activeTab === "grounding" && (
                    <div className="text-center">
                       <h3 className="text-2xl font-bold mb-6 text-purple-700">Grounding Technique</h3>
                       <GroundingExercise />
                    </div>
                  )}
                  
                  {activeTab === "sleep" && (
                    <div className="text-center">
                       <h3 className="text-2xl font-bold mb-6 text-indigo-700">Sleep Calculator</h3>
                       <SleepCalculator />
                    </div>
                  )}

                  {activeTab === "play" && (
                    <div className="text-center">
                       <h3 className="text-2xl font-bold mb-6 text-teal-700">Stress Relief Toy</h3>
                       <PopItGame />
                    </div>
                  )}

                  {activeTab === "letter" && (
                    <div className="text-center">
                       <h3 className="text-2xl font-bold mb-6 text-rose-700">Letter to Future Self</h3>
                       <FutureLetter />
                    </div>
                  )}
               </div>

            </div>
          </div>
        </section>

        {/* ================= ARTICLES PREVIEW ================= */}
        <section className="mb-24">
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

// Component FeatureCard Kecil
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