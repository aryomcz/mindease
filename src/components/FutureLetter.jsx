"use client";
import { useState, useEffect } from "react";
import { Mail, Lock, Unlock, Send, Trash2, Clock } from "lucide-react";

export default function FutureLetter() {
  const [message, setMessage] = useState("");
  const [unlockTime, setUnlockTime] = useState(""); // Format: YYYY-MM-DDTHH:MM
  const [letters, setLetters] = useState([]);
  const [viewingLetter, setViewingLetter] = useState(null);

  // Load surat dari penyimpanan saat pertama buka
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("future_letters") || "[]");
    setLetters(saved);
  }, []);

  const handleSave = () => {
    if (!message || !unlockTime) return;

    const newLetter = {
      id: Date.now(),
      text: message,
      unlockDate: new Date(unlockTime).toISOString(),
      createdAt: new Date().toISOString(),
      isRead: false
    };

    const updatedLetters = [newLetter, ...letters];
    setLetters(updatedLetters);
    localStorage.setItem("future_letters", JSON.stringify(updatedLetters));

    // Reset Form
    setMessage("");
    setUnlockTime("");
    alert("Surat berhasil dikirim ke masa depan! 🚀");
  };

  const handleDelete = (id) => {
    const updated = letters.filter(l => l.id !== id);
    setLetters(updated);
    localStorage.setItem("future_letters", JSON.stringify(updated));
    if (viewingLetter?.id === id) setViewingLetter(null);
  };

  // Cek apakah surat sudah bisa dibuka
  const canOpen = (dateString) => {
    return new Date() >= new Date(dateString);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/60 max-w-4xl mx-auto">
      
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-rose-100 text-rose-500 rounded-2xl mb-4">
          <Mail size={32} />
        </div>
        <h2 className="text-3xl font-black text-gray-800">Time Capsule</h2>
        <p className="text-gray-500 mt-2">
          Tulis pesan untuk dirimu di masa depan. Beri semangat untuk hari esok.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* FORM TULIS SURAT */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
              <Send size={18} className="text-teal-500"/> Tulis Pesan
            </h3>
            
            <textarea
              className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-200 outline-none text-gray-700 text-sm min-h-[120px] resize-none mb-4"
              placeholder="Hai aku di masa depan, jangan lupa istirahat ya..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <label className="text-xs font-bold text-gray-500 mb-1 block">Buka Pada:</label>
            <input
              type="datetime-local"
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-600 text-sm mb-4 outline-none"
              value={unlockTime}
              onChange={(e) => setUnlockTime(e.target.value)}
            />

            <button
              onClick={handleSave}
              disabled={!message || !unlockTime}
              className="w-full py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Kunci Pesan
            </button>
          </div>
        </div>

        {/* DAFTAR SURAT (INBOX) */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
           <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2 sticky top-0 bg-white/0 backdrop-blur-sm py-2">
              <Clock size={18} className="text-indigo-500"/> Kapsul Waktu ({letters.length})
           </h3>

           {letters.length === 0 && (
             <div className="text-center py-10 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-xl">
               Belum ada surat tersimpan.
             </div>
           )}

           {letters.map((letter) => {
             const isUnlocked = canOpen(letter.unlockDate);
             
             return (
               <div key={letter.id} className="group relative">
                 <button
                   onClick={() => isUnlocked ? setViewingLetter(letter) : alert(`Sabar ya! Surat ini baru bisa dibuka pada ${new Date(letter.unlockDate).toLocaleString()}`)}
                   className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 cursor-pointer
                     ${isUnlocked 
                       ? "bg-white border-teal-200 hover:shadow-md hover:border-teal-400 cursor-pointer" 
                       : "bg-gray-50 border-gray-200 opacity-70 cursor-lock"
                     }
                   `}
                 >
                   <div className={`p-3 rounded-full ${isUnlocked ? "bg-teal-100 text-teal-600" : "bg-gray-200 text-gray-400"}`}>
                     {isUnlocked ? <Unlock size={20}/> : <Lock size={20}/>}
                   </div>
                   
                   <div className="flex-1">
                     <p className="text-sm font-bold text-gray-700">
                       {isUnlocked ? "Pesan Terbuka!" : "Pesan Terkunci"}
                     </p>
                     <p className="text-xs text-gray-500 mt-1">
                       {new Date(letter.unlockDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                     </p>
                   </div>
                 </button>

                 {/* Tombol Hapus */}
                 <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(letter.id); }}
                    className="absolute top-4 right-4 text-gray-300 hover:text-rose-500 transition-colors cursor-pointer"
                 >
                    <Trash2 size={16}/>
                 </button>
               </div>
             );
           })}
        </div>
      </div>

      {/* MODAL BACA SURAT */}
      {viewingLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-fade-in-up">
           <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border-t-8 border-teal-500">
              <button 
                onClick={() => setViewingLetter(null)}
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer"
              >
                <X_Icon /> 
              </button>
              
              <div className="text-center mb-6">
                 <div className="inline-block p-3 bg-teal-50 text-teal-600 rounded-full mb-2">
                    <Mail size={32}/>
                 </div>
                 <h3 className="text-xl font-bold text-gray-800">Pesan dari Masa Lalu</h3>
                 <p className="text-xs text-gray-400">Dibuat pada: {new Date(viewingLetter.createdAt).toLocaleString()}</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl text-gray-700 italic leading-relaxed text-center mb-6 relative">
                 <span className="absolute top-2 left-4 text-4xl text-gray-200">“</span>
                 {viewingLetter.text}
                 <span className="absolute bottom-[-10px] right-4 text-4xl text-gray-200">”</span>
              </div>

              <button 
                onClick={() => setViewingLetter(null)}
                className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition cursor-pointer"
              >
                Simpan Kembali
              </button>
           </div>
        </div>
      )}
    </div>
  );
}

// Komponen ikon X kecil untuk modal
function X_Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 12"/></svg>
  );
}