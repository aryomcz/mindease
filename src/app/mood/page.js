"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Smile, Meh, Frown, Zap, AlertCircle, 
  Save, CheckCircle2, History, ArrowRight 
} from "lucide-react";

export default function MoodPage() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [step, setStep] = useState("input"); 

  const moods = [
    { id: "happy", label: "Happy", icon: <Smile size={42} />, color: "text-green-500", bg: "bg-green-100" },
    { id: "neutral", label: "Neutral", icon: <Meh size={42} />, color: "text-yellow-500", bg: "bg-yellow-100" },
    { id: "sad", label: "Sad", icon: <Frown size={42} />, color: "text-blue-500", bg: "bg-blue-100" },
    { id: "stressed", label: "Stressed", icon: <Zap size={42} />, color: "text-purple-500", bg: "bg-purple-100" },
    { id: "angry", label: "Angry", icon: <AlertCircle size={42} />, color: "text-rose-500", bg: "bg-rose-100" },
  ];

  const getRecommendation = (moodLabel) => {
    switch (moodLabel) {
      case "Stressed":
      case "Angry":
        return {
          text: "Pikiranmu sedang panas.",
          action: "Dinginkan dengan Latihan Napas.",
          link: "/breathing",
          btnColor: "bg-teal-600 hover:bg-teal-700"
        };
      case "Sad":
        return {
          text: "Jangan dipendam sendirian.",
          action: "Buang bebanmu di The Void.",
          link: "/void",
          btnColor: "bg-slate-800 hover:bg-black"
        };
      case "Happy":
        return {
          text: "Energi kamu positif banget!",
          action: "Simpan momen ini di Time Capsule?",
          link: "/toolbox?tool=letter",
          btnColor: "bg-rose-500 hover:bg-rose-600"
        };
      default: 
        return {
          text: "Hari yang tenang.",
          action: "Cek kualitas tidurmu yuk?",
          link: "/toolbox?tool=sleep",
          btnColor: "bg-indigo-600 hover:bg-indigo-700"
        };
    }
  };

  const handleSave = () => {
    if (!selectedMood) return;

    const newEntry = {
      mood: selectedMood.label,
      note: note,
      date: new Date().toISOString(),
      color: selectedMood.color
    };

    const existingData = JSON.parse(localStorage.getItem("moods") || "[]");
    localStorage.setItem("moods", JSON.stringify([...existingData, newEntry]));

    setStep("saving");
    setTimeout(() => {
      setStep("recommendation");
    }, 1500);
  };

  if (step === "saving") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative w-full overflow-hidden">
        <div className="glass-panel p-10 rounded-[3rem] text-center animate-bounce-slow transform scale-110 shadow-2xl">
          <div className="mx-auto bg-green-100 w-24 h-24 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-lg shadow-green-200">
            <CheckCircle2 size={56} />
          </div>
          <h2 className="text-4xl font-black text-gray-800 mb-2">Saved!</h2>
          <p className="text-gray-500">Data mood kamu berhasil disimpan.</p>
        </div>
      </div>
    );
  }

  if (step === "recommendation") {
    const rec = getRecommendation(selectedMood.label);
    
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative w-full overflow-hidden">
        <div className="glass-panel p-8 md:p-12 rounded-[3rem] max-w-lg w-full text-center shadow-2xl border-2 border-white/60 animate-fade-in-up">
           <h3 className="text-xl font-bold text-gray-600 mb-2">{rec.text}</h3>
           <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600 mb-8 leading-tight">
             {rec.action}
           </h1>
           <div className="space-y-4">
              <Link 
                href={rec.link}
                className={`w-full py-4 text-white rounded-2xl font-bold text-lg shadow-xl shadow-gray-200 transition-all transform hover:scale-105 flex items-center justify-center gap-2 ${rec.btnColor}`}
              >
                Mulai Sekarang <ArrowRight size={20}/>
              </Link>
              <button 
                onClick={() => router.push("/mood/analytics")}
                className="w-full py-4 bg-white/50 hover:bg-white text-gray-600 rounded-2xl font-bold border border-white/60 transition-all"
              >
                Tidak, lihat riwayat saja
              </button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative overflow-hidden min-h-screen">

      <div className="fixed top-0 -left-20 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none"></div>
      <div className="fixed top-20 -right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 pt-36 pb-32 relative z-10">

        <div className="text-center mb-12 space-y-4 animate-fade-in-up">
          <div className="inline-block px-5 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 text-sm font-bold text-indigo-600 shadow-sm glass-card">
            ✨ Daily Check-in
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-800 tracking-tight leading-tight text-glow">
            How are you <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-600">
              feeling right now?
            </span>
          </h1>
        </div>

        {/* GRID MOOD */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {moods.map((m, index) => (
            <button
              key={m.id}
              onClick={() => setSelectedMood(m)}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`
                group relative p-6 rounded-[2rem] border transition-all duration-300 ease-out 
                flex flex-col items-center gap-4 animate-fade-in-up hover-3d cursor-pointer
                ${selectedMood?.id === m.id
                  ? "bg-white border-teal-200 shadow-xl ring-4 ring-teal-50 scale-105 z-10"
                  : "glass-card border-white/40 hover:bg-white/80"
                }
              `}
            >
              <div
                className={`
                  p-4 rounded-2xl transition-all duration-300 shadow-sm
                  ${selectedMood?.id === m.id ? m.bg + " " + m.color : "bg-white/50 text-gray-400 group-hover:" + m.color + " group-hover:" + m.bg}
                `}
              >
                <div className={selectedMood?.id === m.id ? "animate-bounce" : "group-hover:scale-110 transition-transform"}>
                  {m.icon}
                </div>
              </div>
              
              {/* PERBAIKAN DI SINI: */}
              {/* Jika selected, pakai 'text-black' (Pasti Hitam). Jika tidak, pakai logic biasa */}
              <span className={`font-bold text-sm ${selectedMood?.id === m.id ? "text-black" : "text-gray-500 group-hover:text-gray-800"}`}>
                {m.label}
              </span>
            </button>
          ))}
        </div>

        {/* AREA INPUT JURNAL */}
        <div className={`transition-all duration-500 ease-out overflow-hidden ${selectedMood ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"}`}>
          <div className="glass-panel p-8 rounded-[2.5rem] shadow-xl relative">

            <div className="flex items-center gap-3 mb-6">
              <div className={`w-1.5 h-8 rounded-full ${selectedMood?.color?.replace("text-", "bg-") || "bg-gray-300"}`}></div>
              <h3 className="text-xl font-bold text-gray-800">
                Why are you feeling {selectedMood?.label}?
              </h3>
            </div>

            <textarea
              className="w-full p-5 bg-white/50 border border-white/60 rounded-2xl focus:ring-4 focus:ring-teal-100 focus:border-teal-300 outline-none transition-all placeholder:text-gray-400 text-gray-700 shadow-inner resize-none text-lg glass-card"
              rows="3"
              placeholder="Ceritakan sedikit harimu... (Opsional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>

            <button
              onClick={handleSave}
              className="w-full mt-6 bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl hover:bg-black hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Save size={20} className="group-hover:scale-110 transition-transform" />
              Save & Continue
            </button>
          </div>
        </div>

        {/* Link History */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <button onClick={() => router.push('/mood/analytics')} className="text-gray-500 hover:text-teal-600 font-semibold text-sm flex items-center justify-center gap-2 mx-auto transition-colors cursor-pointer">
            <History size={16} /> Lihat Riwayat Mood Saya
          </button>
        </div>

      </div>
    </div>
  );
}