"use client";
import { useState } from "react";
import { Moon, Sun, Clock } from "lucide-react";

export default function SleepCalculator() {
  const [wakeTime, setWakeTime] = useState("");
  const [results, setResults] = useState(null);

  const calculateSleepTimes = () => {
    if (!wakeTime) return;

    // Logika: Manusia tidur dalam siklus 90 menit.
    // Kita harus tidur selama 5-6 siklus (7.5 - 9 jam) untuk sehat.
    // Rumus: Waktu Bangun - (90 menit * siklus) - 15 menit (waktu rata2 buat terlelap)

    const [hours, minutes] = wakeTime.split(":").map(Number);
    const wakeDate = new Date();
    wakeDate.setHours(hours, minutes, 0);

    // Hitung mundur 4, 5, dan 6 siklus (masing-masing 90 menit)
    const cycles = [6, 5, 4]; // 9 jam, 7.5 jam, 6 jam
    const suggestedTimes = cycles.map((cycle) => {
      const sleepDate = new Date(wakeDate.getTime() - cycle * 90 * 60000 - 15 * 60000); // dikurang 15 menit buat fase jatuh tertidur
      return {
        cycles: cycle,
        time: sleepDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }),
        label: cycle === 5 ? "Rekomendasi Terbaik" : cycle === 6 ? "Tidur Panjang" : "Cukup",
        color: cycle === 5 ? "bg-teal-100 text-teal-700 border-teal-200" : "bg-white text-gray-600 border-gray-200"
      };
    });

    setResults(suggestedTimes.reverse()); // Urutkan dari jam paling awal
  };

  return (
    <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/50 max-w-lg mx-auto transform transition-all hover:scale-[1.01]">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
          <Moon size={32} />
        </div>
        <h2 className="text-2xl font-black text-gray-800">Sleep Calculator</h2>
        <p className="text-gray-500 mt-2 text-sm">
          Bangun segar dengan mengikuti siklus tidur alami tubuh (90 menit/siklus).
        </p>
      </div>

      {/* INPUT */}
      <div className="flex flex-col gap-4 mb-8">
        <label className="text-sm font-bold text-gray-700 ml-1">Saya ingin bangun jam:</label>
        <div className="flex gap-2">
          <input
            type="time"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            className="flex-1 p-4 rounded-xl bg-white border border-gray-200 text-2xl font-bold text-center text-gray-800 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all shadow-sm"
          />
          <button
            onClick={calculateSleepTimes}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95 cursor-pointer"
          >
            Hitung
          </button>
        </div>
      </div>

      {/* HASIL */}
      {results && (
        <div className="space-y-4 animate-fade-in-up">
          <p className="text-center text-gray-600 font-medium mb-2">
            Kamu harus mulai tidur pada salah satu jam ini:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {results.map((res, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center shadow-sm ${res.color}`}
              >
                <span className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">
                  {res.label}
                </span>
                <span className="text-xl font-black">{res.time}</span>
                <span className="text-[10px] mt-1 text-gray-500">
                  {res.cycles} Siklus
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 p-4 bg-yellow-50 rounded-xl text-yellow-700 text-xs border border-yellow-100 flex items-start gap-2 text-left">
             <Clock size={16} className="shrink-0 mt-0.5"/>
             <p>Waktu di atas sudah termasuk <strong>15 menit</strong> estimasi waktu yang dibutuhkan rata-rata orang untuk jatuh tertidur.</p>
          </div>
        </div>
      )}
    </div>
  );
}