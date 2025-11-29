"use client";
import { useState, useEffect } from "react";
import { Send, Lock, Clock, Calendar, Trash2 } from "lucide-react";

export default function FutureLetter() {
  const [message, setMessage] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [capsules, setCapsules] = useState([]); // Menyimpan daftar surat

  // Load data dari local storage saat pertama buka
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("time_capsules") || "[]");
    setCapsules(saved);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message || !openTime) return;

    const newCapsule = {
      id: Date.now(),
      message,
      openTime,
      lockedAt: new Date().toISOString(),
    };

    const updatedCapsules = [newCapsule, ...capsules];
    setCapsules(updatedCapsules);
    localStorage.setItem("time_capsules", JSON.stringify(updatedCapsules));

    // Reset Form
    setMessage("");
    setOpenTime("");
    alert("Surat berhasil dikunci ke dalam Time Capsule!");
  };

  const handleDelete = (id) => {
    if(confirm("Hapus kapsul ini?")) {
        const updated = capsules.filter(c => c.id !== id);
        setCapsules(updated);
        localStorage.setItem("time_capsules", JSON.stringify(updated));
    }
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      
      {/* BAGIAN KIRI: FORMULIR */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] shadow-lg border border-white">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Send size={20} className="text-rose-500"/> Tulis Pesan
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
             <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hai aku di masa depan, jangan lupa istirahat ya..."
                rows="4"
                className="w-full p-4 rounded-2xl bg-white border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-gray-800 placeholder:text-gray-400 resize-none"
             ></textarea>
          </div>

          <div>
             <label className="text-xs font-bold text-gray-500 ml-1 mb-1 block">Buka pada tanggal & jam:</label>
             {/* PENTING: type="datetime-local" agar bisa pilih JAM */}
             <input
                type="datetime-local"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
                className="w-full p-3 rounded-xl bg-white border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-gray-800 font-medium"
             />
          </div>

          <button
            type="submit"
            disabled={!message || !openTime}
            className={`w-full py-3 rounded-xl font-bold text-white shadow-md transition-all flex items-center justify-center gap-2
                ${!message || !openTime 
                    ? "bg-gray-300 cursor-not-allowed" 
                    : "bg-rose-500 hover:bg-rose-600 hover:-translate-y-1"
                }
            `}
          >
            <Lock size={18} /> Kunci Pesan
          </button>
        </form>
      </div>

      {/* BAGIAN KANAN: LIST KAPSUL (BRANKAS) */}
      <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-2xl min-h-[300px] border border-slate-700 relative overflow-hidden">
         {/* Background pattern */}
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
         
         <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock size={20} className="text-teal-400"/> Kapsul Waktu ({capsules.length})
            </h3>

            <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                {capsules.length === 0 ? (
                    <div className="text-center py-10 text-slate-500 border-2 border-dashed border-slate-700 rounded-2xl">
                        <Lock size={32} className="mx-auto mb-2 opacity-50"/>
                        <p className="text-sm">Belum ada surat tersimpan.</p>
                    </div>
                ) : (
                    capsules.map((cap) => (
                        <div key={cap.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center group hover:bg-slate-800 transition-colors">
                            <div>
                                <div className="flex items-center gap-2 text-xs text-teal-400 font-bold mb-1">
                                    <Lock size={12}/> 
                                    TERKUNCI SAMPAI:
                                </div>
                                <div className="text-sm font-medium text-white">
                                    {new Date(cap.openTime).toLocaleString('id-ID', { 
                                        day: 'numeric', month: 'short', year: 'numeric', 
                                        hour: '2-digit', minute: '2-digit' 
                                    })}
                                </div>
                            </div>
                            <button 
                                onClick={() => handleDelete(cap.id)}
                                className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                                title="Buang Kapsul"
                            >
                                <Trash2 size={16}/>
                            </button>
                        </div>
                    ))
                )}
            </div>
         </div>
      </div>

    </div>
  );
}