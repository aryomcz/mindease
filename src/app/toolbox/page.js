"use client";
import { useState, useEffect, Suspense } from "react";
import { createPortal } from "react-dom";
import { useSearchParams, useRouter } from "next/navigation";
import { Wind, Moon, Anchor, Mail, ArrowRight, Trash2, X } from "lucide-react";
import Link from "next/link";

// Components
import SleepCalculator from "@/components/SleepCalculator";
import GroundingExercise from "@/components/GroundingExercise";
import FutureLetter from "@/components/FutureLetter";

// --- KOMPONEN MODAL (POPUP) DENGAN PORTAL ---
function ToolModal({ tool, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (tool) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [tool]);

  if (!tool || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      
      {/* Overlay Gelap */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in" 
        onClick={onClose} 
      ></div>

      {/* Konten Modal - SELALU PUTIH (Agar input form terbaca jelas) */}
      <div className="bg-white w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-[2.5rem] p-6 md:p-8 relative shadow-2xl animate-scale-up z-10 custom-scrollbar border-4 border-white">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4 sticky top-0 bg-white z-20">
           <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl text-white shadow-lg bg-gradient-to-br ${tool.color}`}>
                 {tool.icon}
              </div>
              <div>
                 {/* Paksa Teks Hitam di dalam Modal (karena bg-nya putih) */}
                 <h2 className="text-2xl font-black !text-gray-900 leading-none">{tool.label}</h2>
                 <p className="text-sm !text-gray-500 mt-1">{tool.desc}</p>
              </div>
           </div>
           
           <button 
             onClick={onClose} 
             className="p-3 bg-gray-100 hover:bg-rose-100 !text-gray-500 hover:!text-rose-500 rounded-full transition-colors cursor-pointer"
           >
              <X size={24} />
           </button>
        </div>

        {/* Isi Fitur - Paksa Teks Hitam */}
        <div className="!text-gray-800 modal-content-reset">
           {tool.component}
        </div>

      </div>
    </div>,
    document.body
  );
}

// --- KONTEN UTAMA TOOLBOX ---
function ToolboxContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    const toolId = searchParams.get("tool");
    if (toolId) {
       const tool = tools.find(t => t.id === toolId);
       if (tool && !tool.isLink) {
          setSelectedTool(tool);
       }
    }
  }, [searchParams]);

  const handleClose = () => {
    setSelectedTool(null);
    router.push("/toolbox", { scroll: false });
  };

  const tools = [
    { 
      id: "grounding", 
      label: "Grounding", 
      icon: <Anchor size={40}/>, 
      color: "from-purple-500 to-indigo-600",
      bgCard: "bg-indigo-50",
      desc: "Teknik 5-4-3-2-1 untuk meredakan serangan panik.",
      component: <GroundingExercise />,
      isLink: false
    },
    { 
      id: "sleep", 
      label: "Sleep Calc", 
      icon: <Moon size={40}/>, 
      color: "from-blue-500 to-cyan-600",
      bgCard: "bg-blue-50",
      desc: "Hitung siklus tidur agar bangun segar tanpa pening.",
      component: <SleepCalculator />,
      isLink: false
    },
    { 
      id: "letter", 
      label: "Time Capsule", 
      icon: <Mail size={40}/>, 
      color: "from-rose-400 to-pink-500",
      bgCard: "bg-rose-50",
      desc: "Kirim pesan harapan untuk dirimu di masa depan.",
      component: <FutureLetter />,
      isLink: false
    },
    { 
      id: "void", 
      label: "The Void", 
      icon: <Trash2 size={40}/>, 
      color: "from-slate-700 to-black",
      bgCard: "bg-slate-200",
      desc: "Ruang hampa untuk membuang pikiran negatif.",
      isLink: true,
      href: "/void"
    },
    { 
        id: "breathe", 
        label: "Breathing", 
        icon: <Wind size={40}/>, 
        color: "from-teal-400 to-emerald-500",
        bgCard: "bg-teal-50",
        desc: "Latihan napas terpandu untuk relaksasi instan.",
        isLink: true,
        href: "/breathing"
    },
  ];

  return (
    <>
      <div className="space-y-8 pb-32 relative"> 
         {tools.map((tool, index) => (
            <div 
                key={tool.id} 
                className="sticky top-28 transition-all duration-500" 
                style={{ zIndex: index + 1 }}
            >
                {tool.isLink ? (
                    <Link href={tool.href} className="block group">
                        <ToolCardUI tool={tool} index={index} />
                    </Link>
                ) : (
                    <div onClick={() => setSelectedTool(tool)} className="cursor-pointer group">
                        <ToolCardUI tool={tool} index={index} />
                    </div>
                )}
            </div>
         ))}
      </div>

      <ToolModal tool={selectedTool} onClose={handleClose} />
    </>
  );
}

// --- KOMPONEN KARTU (ADAPTIF) ---
function ToolCardUI({ tool, index }) {
    return (
        // Gunakan 'glass-panel' agar backgroundnya otomatis berubah (Putih/Gelap Transparan)
        // HAPUS tanda seru (!) pada bg-white agar bisa di-override oleh dark mode
        <div className={`
            glass-panel relative overflow-hidden rounded-[3rem] p-8 md:p-12 shadow-xl transition-all duration-500 group-hover:-translate-y-2 border-4 border-white/50
            bg-white/80 backdrop-blur-md 
        `}>
            {/* Gradient Blob Decoration */}
            <div className={`absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br ${tool.color} opacity-20 blur-3xl group-hover:scale-125 transition-transform duration-700`}></div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    {/* Nomor Urut */}
                    
                    <div>
                        <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                            {tool.label}
                        </h3>
                        <p className="text-gray-600 text-lg max-w-lg leading-relaxed font-medium">
                            {tool.desc}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-4 mt-4 md:mt-0">
                    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-[2rem] flex items-center justify-center text-white shadow-xl bg-gradient-to-br ${tool.color} group-hover:rotate-6 transition-transform duration-500`}>
                        {tool.icon}
                    </div>
                    {/* Tombol Buka Fitur */}
                    <div className="glass-card px-6 py-2 rounded-full text-sm font-bold text-gray-800 shadow-sm group-hover:bg-teal-600 group-hover:text-white transition-colors flex items-center gap-2 border border-gray-100/50">
                        Buka Fitur <ArrowRight size={16}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ToolboxPage() {
  return (
    <div className="w-full relative overflow-x-hidden min-h-screen">
      
      {/* Background Transparan (Agar Ambience Terlihat) */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-transparent"></div>

      <div className="max-w-5xl mx-auto px-6 pt-36 relative z-10 flex flex-col">
        
        {/* HEADER */}
        <div className="mb-10 animate-fade-in-down">
           <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter mb-4">
             Toolbox<span className="text-teal-500">.</span>
           </h1>
           <p className="text-xl text-gray-600 max-w-lg leading-relaxed font-medium">
             Kumpulan alat bantu digital untuk menenangkan pikiran, mengatur tidur, dan melepaskan emosi.
           </p>
        </div>

        <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading Tools...</div>}>
           <ToolboxContent />
        </Suspense>
      </div>
    </div>
  );
}