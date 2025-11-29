"use client";
import { useState } from "react";
import { Clock, Sun, Moon } from "lucide-react";

export default function SleepCalculator() {
  const [wakeTime, setWakeTime] = useState("");
  const [bedTimes, setBedTimes] = useState([]);

  const calculateSleep = () => {
    if (!wakeTime) return;

    const [hours, minutes] = wakeTime.split(":").map(Number);
    const wakeDate = new Date();
    wakeDate.setHours(hours, minutes, 0);

    // Hitung mundur 4 siklus (6 jam), 5 siklus (7.5 jam), 6 siklus (9 jam)
    // Siklus tidur rata-rata = 90 menit
    const cycles = [6, 5, 4]; 
    const times = cycles.map((cycle) => {
      const sleepDate = new Date(wakeDate.getTime() - cycle * 90 * 60000);
      return {
        time: sleepDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
        cycles: cycle,
        hours: cycle * 1.5,
      };
    });

    setBedTimes(times);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-4 mb-8">
        <label className="text-gray-600 font-bold text-lg">Saya ingin bangun jam:</label>
        
        {/* INPUT JAM YANG LEBIH TEGAS */}
        <input
          type="time"
          value={wakeTime}
          onChange={(e) => setWakeTime(e.target.value)}
          className="p-4 rounded-2xl text-3xl font-black text-center bg-gray-100 border-2 border-transparent focus:border-indigo-500 focus:bg-white text-indigo-900 outline-none transition-all shadow-inner w-48"
        />
        
        <button
          onClick={calculateSleep}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
        >
          Hitung Waktu Tidur
        </button>
      </div>

      {bedTimes.length > 0 && (
        <div className="animate-fade-in-up">
          <p className="text-gray-500 mb-4 text-sm">Kamu sebaiknya tidur pada salah satu jam ini:</p>
          <div className="grid grid-cols-1 gap-3">
            {bedTimes.map((item, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-2xl flex justify-between items-center border-2 ${idx === 0 ? 'bg-indigo-100 border-indigo-200' : 'bg-white/50 border-white/50'}`}
              >
                <div className="flex items-center gap-3">
                   <div className={`p-2 rounded-full ${idx === 0 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {idx === 0 ? <Sun size={20}/> : <Moon size={20}/>}
                   </div>
                   <div className="text-left">
                      <span className={`block text-2xl font-black ${idx === 0 ? 'text-indigo-900' : 'text-gray-700'}`}>
                        {item.time}
                      </span>
                      <span className="text-xs font-bold text-gray-400">
                        {item.cycles} Siklus ({item.hours} Jam)
                      </span>
                   </div>
                </div>
                {idx === 0 && (
                    <span className="px-3 py-1 bg-indigo-200 text-indigo-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        Terbaik
                    </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}