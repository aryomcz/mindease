"use client";
import { useState } from "react";
import { 
  Wind, Moon, Anchor, Mail, ArrowLeft 
} from "lucide-react";
import Link from "next/link";

// Import alat bantu (Pop-It DIHAPUS dari sini karena ada di Home)
import SleepCalculator from "@/components/SleepCalculator";
import GroundingExercise from "@/components/GroundingExercise";
import FutureLetter from "@/components/FutureLetter";

export default function ToolboxPage() {
  const [activeTab, setActiveTab] = useState("grounding");

  // Daftar Alat Bantu (Pop-It / De-Stress SUDAH DIHAPUS)
  const tools = [
    { 
      id: "grounding", 
      label: "Grounding", 
      icon: <Anchor size={24}/>, 
      color: "from-purple-500 to-indigo-600",
      desc: "Teknik 5-4-3-2-1 untuk redakan panik."
    },
    { 
      id: "sleep", 
      label: "Sleep Calc", 
      icon: <Moon size={24}/>, 
      color: "from-indigo-500 to-blue-600",
      desc: "Hitung siklus tidur 90 menit."
    },
    { 
      id: "letter", 
      label: "Time Capsule", 
      icon: <Mail size={24}/>, 
      color: "from-rose-400 to-pink-500",
      desc: "Kirim pesan ke masa depan."
    },
    { 
        id: "breathe", 
        label: "Breathing", 
        icon: <Wind size={24}/>, 
        color: "from-cyan-400 to-blue-500",
        desc: "Latihan napas terpandu.",
        isLink: true,
        href: "/breathing"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-indigo-50 animate-gradient relative overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>

      {/* Container Utama (Tidak lagi h-screen, jadi bisa scroll) */}
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-32 relative z-10 flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-down">
           <h1 className="text-4xl md:text-5xl font-black text-gray-800 text-glow tracking-tight">
             Wellness <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">Toolbox</span>
           </h1>
           <p className="text-gray-500 mt-2 font-medium">Pilih alat bantu untuk menenangkan pikiranmu.</p>
        </div>

        {/* --- LAYOUT UTAMA (GRID) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* SIDEBAR MENU (Kiri / Atas di HP) */}
           <div className="lg:col-span-3 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
              {tools.map((tool) => (
                tool.isLink ? (
                    // Tipe Link (Breathing)
                    <Link 
                        key={tool.id} 
                        href={tool.href}
                        className="group flex lg:flex-col items-center lg:items-start gap-4 p-5 rounded-3xl bg-white/40 border border-white/60 hover:bg-white/80 transition-all hover:scale-105 min-w-[220px] lg:min-w-0 shadow-sm hover:shadow-md"
                    >
                        <div className={`p-3 rounded-2xl text-white shadow-lg bg-gradient-to-br ${tool.color} group-hover:rotate-6 transition-transform`}>
                            {tool.icon}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">{tool.label}</h3>
                            <p className="text-xs text-gray-500 hidden lg:block">{tool.desc}</p>
                        </div>
                        <ArrowLeft size={16} className="ml-auto lg:hidden rotate-180 text-gray-400"/>
                    </Link>
                ) : (
                    // Tipe Tab (Sleep, Letter, dll)
                    <button
                        key={tool.id}
                        onClick={() => setActiveTab(tool.id)}
                        className={`
                            group flex lg:flex-col items-center lg:items-start gap-4 p-5 rounded-3xl border transition-all text-left min-w-[220px] lg:min-w-0 relative overflow-hidden
                            ${activeTab === tool.id 
                                ? "bg-white shadow-xl border-white scale-105 z-10 ring-4 ring-white/30" 
                                : "bg-white/40 border-white/60 hover:bg-white/60 hover:scale-[1.02]"
                            }
                        `}
                    >
                        {/* Active Indicator Bar */}
                        {activeTab === tool.id && (
                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${tool.color}`}></div>
                        )}

                        <div className={`p-3 rounded-2xl text-white shadow-lg bg-gradient-to-br ${tool.color} ${activeTab === tool.id ? 'animate-bounce-slow' : ''}`}>
                            {tool.icon}
                        </div>
                        <div>
                            <h3 className={`font-bold ${activeTab === tool.id ? 'text-gray-900' : 'text-gray-600'}`}>{tool.label}</h3>
                            <p className="text-xs text-gray-500 hidden lg:block">{tool.desc}</p>
                        </div>
                    </button>
                )
              ))}
           </div>

           {/* CONTENT AREA (Kanan - Glass Panel) */}
           <div className="lg:col-span-9">
              {/* Gunakan min-h agar tidak kepotong tapi bisa manjang */}
              <div className="bg-white/50 backdrop-blur-2xl rounded-[3rem] border border-white/60 shadow-2xl p-6 md:p-12 min-h-[600px] transition-all duration-500 flex flex-col justify-center">
                 
                 <div className="animate-fade-in-up key={activeTab} w-full">
                    
                    {activeTab === "grounding" && (
                        <div className="max-w-2xl mx-auto w-full">
                            <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
                                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Anchor/></div>
                                <h2 className="text-2xl font-black text-gray-800">Grounding Technique</h2>
                            </div>
                            <GroundingExercise />
                        </div>
                    )}

                    {activeTab === "sleep" && (
                        <div className="max-w-xl mx-auto w-full text-center py-4">
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold">
                                <Moon size={16}/> Sleep Hygiene
                            </div>
                            <h2 className="text-3xl font-black text-gray-800 mb-8">Kalkulator Tidur</h2>
                            <SleepCalculator />
                        </div>
                    )}

                    {activeTab === "letter" && (
                        <div className="max-w-3xl mx-auto w-full py-4">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-black text-gray-800">Time Capsule</h2>
                                <p className="text-gray-500">Kirim harapan untuk dirimu di masa depan.</p>
                            </div>
                            <FutureLetter />
                        </div>
                    )}

                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}