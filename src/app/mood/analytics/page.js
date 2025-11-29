"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, TrendingUp, PieChart as PieIcon, Trash2, Activity } from "lucide-react";
import PieChart from "@/components/PieChart";

// Mapping warna manual agar PASTI MUNCUL (Bypass Tailwind JIT)
const moodColors = {
  Happy: "#4ade80",    // Green
  Neutral: "#facc15",  // Yellow
  Sad: "#60a5fa",      // Blue
  Stressed: "#c084fc", // Purple
  Angry: "#f43f5e"     // Red
};

export default function MoodAnalytics() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("moods") || "[]");
    setMoods(saved);
    setLoading(false);
  }, []);

  const clearHistory = () => {
    if (confirm("Yakin ingin menghapus semua riwayat mood?")) {
      localStorage.removeItem("moods");
      setMoods([]);
    }
  };

  const counts = { Happy: 0, Neutral: 0, Sad: 0, Stressed: 0, Angry: 0 };
  moods.forEach((m) => {
    if (counts[m.mood] !== undefined) counts[m.mood]++;
  });

  const chartData = [
    { label: "Happy", value: counts.Happy, color: moodColors.Happy },
    { label: "Neutral", value: counts.Neutral, color: moodColors.Neutral },
    { label: "Sad", value: counts.Sad, color: moodColors.Sad },
    { label: "Stressed", value: counts.Stressed, color: moodColors.Stressed },
    { label: "Angry", value: counts.Angry, color: moodColors.Angry },
  ];

  const recentMoods = moods.slice(-7);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 animate-gradient relative overflow-hidden">

      {/* Background Ornaments */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-32 relative z-10">

        {/* HEADER */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in-down">
          <div>
            <Link href="/mood" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-teal-600 mb-2 transition-colors">
              <ArrowLeft size={18} className="mr-1" /> Back to Input
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-gray-800 text-glow">
              Emotional Data
            </h1>
            <p className="text-gray-600 mt-2 font-medium">
              Peta perasaanmu dalam angka dan visual.
            </p>
          </div>

          <div className="flex gap-3">
            {moods.length > 0 && (
              <button onClick={clearHistory} className="px-4 py-2 bg-rose-100 text-rose-600 rounded-xl font-bold hover:bg-rose-200 transition flex items-center gap-2 cursor-pointer">
                <Trash2 size={18} /> Reset
              </button>
            )}
            <div className="glass-card px-6 py-2 rounded-xl text-sm font-bold text-indigo-600">
              Total Entries: {moods.length}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* KARTU 1: PIE CHART */}
          <div className="glass-panel p-8 rounded-[2.5rem] flex flex-col items-center animate-fade-in-up hover-3d" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-2 w-full mb-6 text-gray-700">
              <div className="p-2.5 bg-teal-100 text-teal-600 rounded-xl"><PieIcon size={20} /></div>
              <h3 className="font-bold text-lg">Mix Emosi</h3>
            </div>

            {moods.length === 0 ? (
              <div className="text-gray-400 py-10 text-center italic">Data masih kosong.</div>
            ) : (
              <>
                <div className="scale-110 mb-4">
                  <PieChart data={chartData} size={180} />
                </div>
                <div className="grid grid-cols-2 gap-3 w-full">
                  {chartData.map((d) => (
                    d.value > 0 && (
                      <div key={d.label} className="flex items-center gap-2 text-xs font-bold text-gray-600 bg-white/40 p-2 rounded-lg border border-white/50">
                        <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ background: d.color }}></span>
                        <span className="flex-1">{d.label}</span>
                        <span className="bg-white px-1.5 py-0.5 rounded text-gray-800">{d.value}</span>
                      </div>
                    )
                  ))}
                </div>
              </>
            )}
          </div>

          {/* KARTU 2: TREND FLOW */}
          <div className="lg:col-span-2 glass-panel p-8 rounded-[2.5rem] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between w-full mb-8">
              <div className="flex items-center gap-2">
                <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl"><TrendingUp size={20} /></div>
                <h3 className="font-bold text-lg text-gray-700">Flow (7 Entri Terakhir)</h3>
              </div>
              <div className="text-xs font-medium text-gray-400 bg-white/50 px-3 py-1 rounded-full border border-white/50">
                Real-time
              </div>
            </div>

            <div className="h-64 flex items-end justify-between gap-3 px-2 pb-2">
              {recentMoods.length === 0 ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-300">
                  <Activity size={48} className="mb-2 opacity-20" />
                  <p>Mulai tracking untuk melihat grafik!</p>
                </div>
              ) : (
                recentMoods.map((m, i) => {
                  const val = counts[m.mood] || 3; // Fallback value
                  // Tinggi bar berdasarkan nilai mood (Happy=5, Angry=1) atau default 3
                  const moodValue = m.mood === 'Happy' ? 5 : m.mood === 'Neutral' ? 3 : m.mood === 'Sad' ? 2 : 1;
                  const heightPercentage = Math.max((moodValue / 5) * 100, 15);

                  // Ambil warna dari mapping, fallback ke abu-abu
                  const barColor = moodColors[m.mood] || "#d1d5db";

                  return (
                    <div key={i} className="flex flex-col items-center gap-3 flex-1 h-full justify-end group cursor-help">

                      {/* Tooltip */}
                      <div className="mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-gray-900 text-white text-[10px] py-1.5 px-3 rounded-lg shadow-xl absolute -mt-10 z-20 pointer-events-none whitespace-nowrap font-bold">
                        {m.mood} • {new Date(m.date).getDate()}/{new Date(m.date).getMonth() + 1}
                      </div>

                      {/* The Bar (Pakai Inline Style untuk Warna agar pasti muncul) */}
                      <div
                        className="w-full max-w-[50px] rounded-2xl transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-2 shadow-sm relative overflow-hidden"
                        style={{
                          height: `${heightPercentage}%`,
                          backgroundColor: barColor
                        }}
                      >
                        {/* Shine Effect */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
                      </div>

                      {/* Date Label */}
                      <span className="text-[10px] font-bold text-gray-400 group-hover:text-indigo-600 transition-colors">
                        {new Date(m.date).getDate()}/{new Date(m.date).getMonth() + 1}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* KARTU 3: JURNAL */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2 pl-2">
              <Calendar size={20} className="text-rose-500" /> Jurnal Terbaru
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              {[...moods].reverse().slice(0, 6).map((m, idx) => (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-3xl hover-3d flex gap-5 items-start group"
                >
                  {/* Indicator Line (Pakai Inline Style juga) */}
                  <div
                    className="w-1.5 h-12 mt-1 rounded-full shadow-sm"
                    style={{ backgroundColor: moodColors[m.mood] || "#d1d5db" }}
                  ></div>

                  <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-gray-800 text-lg group-hover:text-indigo-600 transition-colors">{m.mood}</span>
                      <span className="text-[10px] font-bold text-gray-400 bg-white/60 px-2 py-1 rounded-lg border border-white/50">
                        {new Date(m.date).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed italic line-clamp-2">
                      "{m.note || "Tidak ada catatan."}"
                    </p>
                  </div>
                </div>
              ))}
              {moods.length === 0 && (
                <div className="col-span-2 text-center py-12 text-gray-400 glass-card rounded-3xl border-dashed">
                  Belum ada riwayat jurnal. Yuk isi dulu!
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}