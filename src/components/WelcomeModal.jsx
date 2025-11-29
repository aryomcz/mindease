"use client";
import { useState, useEffect, useContext } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { UserContext } from "@/context/UserContext";

export default function WelcomeModal() {
  const { userName, setUserName } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [step, setStep] = useState(1); // 1: Intro, 2: Input Nama

  useEffect(() => {
    const savedName = localStorage.getItem("user_name");

    // Jika belum pernah isi nama → tampilkan modal
    if (!savedName) {
      setShow(true);
    } else {
      // Jika ada → set langsung ke context
      setUserName(savedName);
    }
  }, []);

  const handleSave = () => {
    if (!name.trim()) return;

    // Simpan ke localStorage
    localStorage.setItem("user_name", name);

    // Simpan ke context → auto update ke seluruh app
    setUserName(name);

    // Tutup modal
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in-up w-full h-screen">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden">

        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-100 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 text-center">
          
          {step === 1 ? (
            // LANGKAH 1: INTRO
            <div className="animate-fade-in-up">
              <div className="inline-block p-4 bg-teal-50 text-teal-600 rounded-full mb-6 animate-bounce">
                <Sparkles size={32} />
              </div>
              <h2 className="text-3xl font-black text-gray-800 mb-4">
                Hai, Selamat Datang!
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                LuMind adalah ruang amanmu untuk beristirahat, bercerita, dan tumbuh.  
                Sebelum kita mulai, boleh kami mengenalmu?
              </p>

              <button
                onClick={() => setStep(2)}
                className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Tentu, Lanjut <ArrowRight size={20} />
              </button>
            </div>

          ) : (
            // LANGKAH 2: INPUT NAMA
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Siapa nama panggilanmu?
              </h2>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Misal: Althof"
                className="w-full p-4 text-center text-xl font-bold border-b-2 border-gray-200 focus:border-teal-500 outline-none bg-transparent mb-8 text-gray-800 placeholder:text-gray-300 transition-colors"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />

              <button
                onClick={handleSave}
                disabled={!name.trim()}
                className="w-full py-4 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-teal-200 cursor-pointer"
              >
                Mulai Perjalanan 🚀
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
