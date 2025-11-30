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
      <div className="flex flex-col items-center gap-4 mb-8 bg-gray-50 p-6 rounded-[2rem] border border-gray-200">
        <label className="text-gray-700 font-bold text-lg">Saya ingin bangun jam:</label>
        
        {/* INPUT JAM TEGAS */}
        <input
          type="time"
          value={wakeTime}
          onChange={(e) => setWakeTime(e.target.value)}
          className="p-4 rounded-2xl text-4xl font-black text-center bg-white border-2 border-indigo-200 focus:border-indigo-600 text-indigo-900 outline-none shadow-sm w-48"
        />
        
        <button
          onClick={calculateSleep}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          Hitung Waktu Tidur
        </button>
      </div>

      {bedTimes.length > 0 && (
        <div className="animate-fade-in-up space-y-3">
            {bedTimes.map((item, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-2xl flex justify-between items-center border ${idx === 0 ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-white border-gray-200 text-gray-800'}`}
              >
                <div className="flex items-center gap-4">
                   <div className={`p-2 rounded-full ${idx === 0 ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {idx === 0 ? <Sun size={24}/> : <Moon size={24}/>}
                   </div>
                   <div className="text-left">
                      <span className="block text-2xl font-black">{item.time}</span>
                      <span className={`text-xs font-bold ${idx === 0 ? 'text-indigo-100' : 'text-gray-500'}`}>
                        {item.cycles} Siklus ({item.hours} Jam)
                      </span>
                   </div>
                </div>
                {idx === 0 && (
                    <span className="px-3 py-1 bg-white text-indigo-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        Terbaik
                    </span>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}