"use client";
import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function PopItGame() {
  const [bubbleCount, setBubbleCount] = useState(36); // default desktop
  const [bubbles, setBubbles] = useState([]);

  // Detect screen size ONLY once on load
  useEffect(() => {
    const updateBubbleCount = () => {
      if (window.innerWidth < 640) {
        setBubbleCount(24); // mobile → 24 bubbles
      } else {
        setBubbleCount(36); // desktop → 36 bubbles
      }
    };

    updateBubbleCount();
    setBubbles(Array(bubbleCount).fill(false));
  }, [bubbleCount]);

  const playPopSound = () => {
    const audio = new Audio("/sounds/pop.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {});
  };

  const handlePop = (index) => {
    if (bubbles[index]) return;

    playPopSound();

    const newBubbles = [...bubbles];
    newBubbles[index] = true;
    setBubbles(newBubbles);

    if (newBubbles.every((b) => b === true)) {
      setTimeout(() => resetGame(), 800);
    }
  };

  const resetGame = () => {
    setBubbles(Array(bubbleCount).fill(false));
  };

  return (
    <div className="bg-white/50 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-2xl max-w-sm mx-auto text-center">

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black text-gray-800 dark:text-white">🍬 Virtual Pop-It</h3>

        <button 
          onClick={resetGame}
          className="p-2 bg-white dark:bg-slate-700 rounded-full shadow-sm hover:rotate-180 transition duration-500 text-teal-600 dark:text-teal-400 cursor-pointer"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Sedang cemas? Pecahkan gelembung ini untuk meredakan stresmu.
      </p>

      {/* POP-IT GRID */}
      <div
        className={`
          grid gap-3 p-4 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-900 dark:to-slate-800 
          rounded-2xl shadow-inner border border-white/20
          ${bubbleCount === 24 ? "grid-cols-4" : "grid-cols-6"}
        `}
      >
        {bubbles.map((isPopped, index) => (
          <button
            key={index}
            onClick={() => handlePop(index)}
            className={`
              w-10 h-10 rounded-full relative transition-all duration-200 cursor-pointer
              ${isPopped
                ? "bg-gray-300 dark:bg-slate-700 scale-90 shadow-inner translate-y-1"
                : "bg-gradient-to-tr from-teal-400 to-cyan-300 shadow-lg hover:brightness-110 active:scale-95"
              }
            `}
          >
            {!isPopped && (
              <div className="w-3 h-3 bg-white/40 rounded-full absolute top-1.5 left-1.5 blur-[1px]"></div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 text-xs text-gray-400 font-medium">
        {bubbles.filter((b) => b).length} / {bubbleCount} popped
      </div>
    </div>
  );
}
