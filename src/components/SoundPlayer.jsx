"use client";
import { useState, useRef, useEffect } from "react";
import { CloudRain, Trees, Coffee, Volume2, X, Music } from "lucide-react";

export default function SoundPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSound, setActiveSound] = useState(null);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef(null);

  const sounds = [
    { 
      id: "rain", 
      label: "Rain", 
      icon: <CloudRain size={20} />, 
      url: "/sounds/rain.mp3" 
    },
    { 
      id: "forest", 
      label: "Forest", 
      icon: <Trees size={20} />, 
      url: "/sounds/forest.mp3" 
    },
    { 
      id: "cafe", 
      label: "Cafe", 
      icon: <Coffee size={20} />, 
      url: "/sounds/cafe.mp3" 
    },
  ];

  useEffect(() => {
    if (audioRef.current) {
      if (activeSound) {
        const sound = sounds.find(s => s.id === activeSound);
        if (sound) {
            if (!audioRef.current.src.includes(sound.url)) {
                audioRef.current.src = sound.url;
            }
            audioRef.current.volume = volume;
            audioRef.current.play().catch(e => console.log("Audio play error:", e));
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [activeSound]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    // --- PERUBAHAN POSISI DI SINI ---
    // Mobile: top-20 right-4 (Di atas, bawah navbar)
    // Desktop: bottom-6 right-6 (Di bawah pojok)
    <div className={`
        fixed z-[60] flex flex-col items-end transition-all duration-500
         right-4 top-1/2 
        md:top-auto md:bottom-6 md:right-6
    `}>
      
      <audio ref={audioRef} loop />

      {/* PANEL KONTROL (Popup) */}
      <div 
        className={`
          mb-4 bg-white/80 backdrop-blur-xl border border-white/60 
          p-5 rounded-2xl shadow-2xl transition-all duration-300 origin-top-right md:origin-bottom-right
          ${isOpen ? "scale-100 opacity-100 translate-y-0 block" : "scale-0 opacity-0 -translate-y-10 md:translate-y-10 pointer-events-none hidden"}
        `}
      >
        <div className="flex justify-between items-center mb-4 min-w-[200px]">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Music size={16} className="text-teal-500"/> Soundscapes
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-rose-500 cursor-pointer">
                <X size={16} />
            </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
            {sounds.map((sound) => (
                <button
                    key={sound.id}
                    onClick={() => setActiveSound(activeSound === sound.id ? null : sound.id)}
                    className={`
                        flex flex-col items-center justify-center p-3 rounded-xl transition-all cursor-pointer
                        ${activeSound === sound.id 
                            ? "bg-teal-500 text-white shadow-lg scale-105" 
                            : "bg-white/50 border border-white/50 text-gray-500 hover:bg-teal-50 hover:text-teal-600"
                        }
                    `}
                >
                    {sound.icon}
                    <span className="text-[10px] mt-1 font-medium">{sound.label}</span>
                    
                    {activeSound === sound.id && (
                         <div className="flex gap-0.5 mt-1 h-2 items-end">
                             <div className="w-0.5 bg-white/70 animate-[bounce_1s_infinite] h-full"></div>
                             <div className="w-0.5 bg-white/70 animate-[bounce_1.2s_infinite] h-[60%]"></div>
                             <div className="w-0.5 bg-white/70 animate-[bounce_0.8s_infinite] h-[80%]"></div>
                         </div>
                    )}
                </button>
            ))}
        </div>

        <div className="flex items-center gap-3">
            <Volume2 size={16} className="text-gray-400"/>
            <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
        </div>
      </div>

      {/* TOMBOL PEMICU (Music Button) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
            p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95
            flex items-center justify-center relative border border-white/40 backdrop-blur-md cursor-pointer
            ${isOpen || activeSound 
                ? "bg-teal-500 text-white rotate-0 shadow-teal-200" 
                : "bg-white/70 text-teal-600 hover:bg-white"
            }
        `}
      >
        {activeSound ? (
            <div className="flex gap-1 h-4 items-end">
                <div className="w-1 bg-current animate-[bounce_1s_infinite] h-full"></div>
                <div className="w-1 bg-current animate-[bounce_1.5s_infinite] h-[60%]"></div>
                <div className="w-1 bg-current animate-[bounce_1.2s_infinite] h-[30%]"></div>
            </div>
        ) : (
            <Music size={20} />
        )}

        {/* Indikator Aktif (Titik Hijau) */}
        {activeSound && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border border-white"></span>
            </span>
        )}
      </button>
    </div>
  );
}