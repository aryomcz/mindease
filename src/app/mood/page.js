"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Smile, Meh, Frown, Zap, AlertCircle, Save, CheckCircle2 } from "lucide-react";

export default function MoodPage() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Data Mood (Lengkap dengan warna & shadow)
  const moods = [
    { id: "happy", label: "Happy", icon: <Smile size={42} />, color: "bg-green-400", shadow: "shadow-green-300", value: 5 },
    { id: "neutral", label: "Neutral", icon: <Meh size={42} />, color: "bg-yellow-400", shadow: "shadow-yellow-300", value: 3 },
    { id: "sad", label: "Sad", icon: <Frown size={42} />, color: "bg-blue-400", shadow: "shadow-blue-300", value: 2 },
    { id: "stressed", label: "Stressed", icon: <Zap size={42} />, color: "bg-purple-400", shadow: "shadow-purple-300", value: 1 },
    { id: "angry", label: "Angry", icon: <AlertCircle size={42} />, color: "bg-rose-500", shadow: "shadow-rose-300", value: 1 },
  ];

  const handleSave = () => {
    if (!selectedMood) return;

    // 1. Simpan data ke LocalStorage
    const newEntry = {
      mood: selectedMood.label,
      value: selectedMood.value,
      note: note,
      date: new Date().toISOString(),
      color: selectedMood.color 
    };

    const existingData = JSON.parse(localStorage.getItem("moods") || "[]");
    localStorage.setItem("moods", JSON.stringify([...existingData, newEntry]));

    // 2. Tampilkan efek sukses
    setIsSaved(true);
    
    // 3. Pindah halaman otomatis setelah 1.5 detik
    setTimeout(() => {
      router.push("/mood/analytics");
    }, 1500);
  };

  // Tampilan Sukses (Feedback Visual)
  if (isSaved) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50">
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-center animate-bounce-slow border border-white">
          <div className="mx-auto bg-green-100 w-20 h-20 rounded-full flex items-center justify-center text-green-600 mb-4 shadow-inner">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">Saved!</h2>
          <p className="text-gray-500 mt-2">Data mood kamu berhasil disimpan.</p>
        </div>
      </div>
    );
  }

  return (
    // MAIN CONTAINER: Gradient Background Bergerak
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-teal-100 animate-gradient">
      
      {/* PADDING TOP (pt-32) AGAR TIDAK TERTUTUP NAVBAR */}
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        
        {/* HEADER */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 text-sm font-semibold text-gray-600 mb-2 shadow-sm">
            ✨ Daily Check-in
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-800 tracking-tight leading-tight">
            How are you <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-600">
              feeling right now?
            </span>
          </h1>
        </div>

        {/* MOOD CARDS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {moods.map((m, index) => (
            <button
              key={m.id}
              onClick={() => setSelectedMood(m)}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`
                relative group p-5 rounded-2xl border transition-all duration-300 ease-out 
                flex flex-col items-center gap-3 animate-fade-in-up
                ${selectedMood?.id === m.id 
                  ? "bg-white border-white scale-105 shadow-xl ring-4 ring-white/50 z-10" 
                  : "bg-white/40 border-white/40 backdrop-blur-md hover:bg-white/70 hover:-translate-y-1 hover:shadow-lg"
                }
              `}
            >
              {/* Icon Container */}
              <div 
                className={`
                  p-3 rounded-xl text-white transition-all duration-300 shadow-md
                  ${selectedMood?.id === m.id ? m.color : "bg-gray-400/30 group-hover:" + m.color}
                  ${selectedMood?.id === m.id ? m.shadow : ""}
                `}
              >
                <div className={selectedMood?.id === m.id ? "animate-bounce" : ""}>
                  {m.icon}
                </div>
              </div>

              {/* Label */}
              <span className={`font-bold text-sm ${selectedMood?.id === m.id ? "text-gray-800" : "text-gray-600 group-hover:text-gray-800"}`}>
                {m.label}
              </span>
            </button>
          ))}
        </div>

        {/* AREA INPUT JURNAL (Slide Up Animation) */}
        {selectedMood && (
          <div className="animate-slide-up transition-all duration-500 ease-out">
            <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/60">
              
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-8 rounded-full ${selectedMood.color}`}></div>
                <h3 className="text-lg font-bold text-gray-700">
                  Why are you feeling {selectedMood.label}?
                </h3>
              </div>

              {/* Textarea Cantik */}
              <textarea
                className="w-full p-4 bg-white/50 border border-white/50 rounded-2xl focus:ring-2 focus:ring-teal-400 focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-700 shadow-inner resize-none"
                rows="3"
                placeholder="Ceritakan sedikit harimu... (Opsional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>

              <button 
                onClick={handleSave}
                className="w-full mt-6 bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Save size={20} className="group-hover:scale-110 transition-transform"/>
                Save & Continue
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}