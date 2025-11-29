"use client";
import { useState } from "react";
import { RefreshCw, X } from "lucide-react";

export default function PopItGame() {
  // Kita buat grid 6x6 (36 bubbles)
  const [bubbles, setBubbles] = useState(Array(36).fill(false)); // false = belum pop

  const playPopSound = () => {
    // Pastikan kamu punya file ini, atau hapus baris ini kalau gak mau pake suara
    const audio = new Audio("/sounds/pop.mp3"); 
    audio.volume = 0.5;
    audio.play().catch(() => {}); // Catch error kalau user belum interaksi
  };

  const handlePop = (index) => {
    if (bubbles[index]) return; // Kalau sudah pop, jangan lakukan apa-apa

    playPopSound();

    // Update state
    const newBubbles = [...bubbles];
    newBubbles[index] = true;
    setBubbles(newBubbles);

    // Cek kalau sudah habis semua (Opsional: Auto reset)
    if (newBubbles.every((b) => b === true)) {
      setTimeout(() => resetGame(), 1000);
    }
  };

  const resetGame = () => {
    setBubbles(Array(36).fill(false));
  };

  return (
    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl p-8 rounded-3xl border border-white/60 dark:border-slate-700 shadow-2xl max-w-sm mx-auto text-center transform hover:scale-[1.02] transition-transform duration-500">
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black text-gray-800 dark:text-white flex items-center gap-2">
          🍬 Virtual Pop-It
        </h3>
        <button 
          onClick={resetGame}
          className="p-2 bg-white dark:bg-slate-700 rounded-full shadow-sm hover:rotate-180 transition-transform duration-500 text-teal-600 dark:text-teal-400 cursor-pointer"
          title="Reset"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Sedang cemas? Pecahkan gelembung ini untuk meredakan stresmu.
      </p>

      {/* GRID POP IT */}
      <div className="grid grid-cols-6 gap-3 p-4 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl shadow-inner border border-white/20">
        {bubbles.map((isPopped, index) => (
          <button
            key={index}
            onClick={() => handlePop(index)}
            className={`
              w-10 h-10 rounded-full shadow-[inset_-2px_-4px_6px_rgba(0,0,0,0.1)] transition-all duration-200 cursor-pointer
              ${isPopped 
                ? "bg-gray-300 dark:bg-slate-700 scale-90 shadow-inner translate-y-1" // Style saat PECAH
                : "bg-gradient-to-tr from-teal-400 to-cyan-300 hover:brightness-110 active:scale-95 shadow-lg transform hover:-translate-y-0.5" // Style saat UTUH
              }
            `}
          >
            {/* Kilau Cahaya di bubble */}
            {!isPopped && (
                <div className="w-3 h-3 bg-white/40 rounded-full absolute top-1.5 left-1.5 blur-[1px]"></div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 text-xs text-gray-400 font-medium">
        {bubbles.filter(b => b).length} / 36 Popped
      </div>
    </div>
  );
}