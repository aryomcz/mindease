"use client";
import { useState, useRef, useEffect } from "react";
import { CloudRain, Trees, Coffee, Volume2, X, Music } from "lucide-react";

export default function SoundPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSound, setActiveSound] = useState(null); // 'rain', 'forest', 'cafe'
  const [volume, setVolume] = useState(0.5);

  // Referensi Audio
  const audioRef = useRef(null);

  // Data Suara (Ganti URL ini dengan file lokalmu jika ada, misal: '/sounds/rain.mp3')
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
      url: "https://cdn.pixabay.com/download/audio/2021/09/06/audio_3327cb7428.mp3?filename=forest-wind-and-birds-6881.mp3" 
    },
    { 
      id: "cafe", 
      label: "Cafe", 
      icon: <Coffee size={20} />, 
      url: "https://cdn.pixabay.com/download/audio/2022/03/09/audio_7dd4533423.mp3?filename=people-talking-in-a-small-cafe-6346.mp3" 
    },
  ];

  // Efek ganti source audio saat activeSound berubah
  useEffect(() => {
    if (audioRef.current) {
      if (activeSound) {
        const sound = sounds.find(s => s.id === activeSound);
        if (sound) {
            // Cek apakah URL sudah sama (biar gak reload kalau klik tombol sama)
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

  // Efek ganti volume real-time
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Audio Element Tersembunyi */}
      <audio ref={audioRef} loop />

      {/* PANEL KONTROL (Muncul saat dibuka) */}
      <div 
        className={`
          mb-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-700 
          p-5 rounded-2xl shadow-2xl transition-all duration-300 origin-bottom-right
          ${isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-10 pointer-events-none"}
        `}
      >
        <div className="flex justify-between items-center mb-4 min-w-[200px]">
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                <Music size={16} className="text-teal-500"/> Soundscapes
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-rose-500">
                <X size={16} />
            </button>
        </div>

        {/* Pilihan Suara */}
        <div className="grid grid-cols-3 gap-2 mb-4">
            {sounds.map((sound) => (
                <button
                    key={sound.id}
                    onClick={() => setActiveSound(activeSound === sound.id ? null : sound.id)}
                    className={`
                        flex flex-col items-center justify-center p-3 rounded-xl transition-all
                        ${activeSound === sound.id 
                            ? "bg-teal-500 text-white shadow-lg scale-105" 
                            : "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 hover:bg-teal-100 dark:hover:bg-slate-700 hover:text-teal-600"
                        }
                    `}
                >
                    {sound.icon}
                    <span className="text-[10px] mt-1 font-medium">{sound.label}</span>
                    
                    {/* Visualizer kecil kalau aktif */}
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

        {/* Volume Slider */}
        <div className="flex items-center gap-3">
            <Volume2 size={16} className="text-gray-400"/>
            <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
        </div>
      </div>

      {/* TOMBOL PEMICU (Floating Action Button) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
            p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95
            flex items-center justify-center relative
            ${isOpen || activeSound 
                ? "bg-teal-500 text-white rotate-0" 
                : "bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 border border-teal-100 dark:border-slate-700 hover:bg-teal-50"
            }
        `}
      >
        {activeSound ? (
            // Ikon equalizer bergerak kalau ada suara nyala
            <div className="flex gap-1 h-5 items-end">
                <div className="w-1 bg-current animate-[bounce_1s_infinite] h-3"></div>
                <div className="w-1 bg-current animate-[bounce_1.5s_infinite] h-5"></div>
                <div className="w-1 bg-current animate-[bounce_1.2s_infinite] h-2"></div>
            </div>
        ) : (
            <Music size={24} />
        )}

        {/* Badge status on/off */}
        {activeSound && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
        )}
      </button>
    </div>
  );
}