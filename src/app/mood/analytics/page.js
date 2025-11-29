"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, TrendingUp, PieChart as PieIcon } from "lucide-react";
import PieChart from "@/components/PieChart"; 

export default function MoodAnalytics() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil data dari localStorage
    const saved = JSON.parse(localStorage.getItem("moods") || "[]");
    setMoods(saved); 
    setLoading(false);
  }, []);

  // Hitung Statistik
  const counts = { Happy: 0, Neutral: 0, Sad: 0, Stressed: 0, Angry: 0 };
  moods.forEach((m) => (counts[m.mood] = (counts[m.mood] || 0) + 1));

  const chartData = [
    { label: "Happy", value: counts.Happy, color: "#4ade80" },     // Green-400
    { label: "Neutral", value: counts.Neutral, color: "#facc15" }, // Yellow-400
    { label: "Sad", value: counts.Sad, color: "#60a5fa" },         // Blue-400
    { label: "Stressed", value: counts.Stressed, color: "#c084fc" }, // Purple-400
    { label: "Angry", value: counts.Angry, color: "#f43f5e" },     // Rose-500
  ];

  // Data untuk 7 Hari Terakhir
  const recentMoods = moods.slice(-7); 

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 text-indigo-400 animate-pulse">
      Loading your journey...
    </div>
  );

  return (
    // BACKGROUND SAMA DENGAN HALAMAN INPUT (Konsisten)
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-teal-100 animate-gradient">
      
      {/* PADDING TOP 32 (Agar aman dari Navbar) */}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        
        {/* HEADER */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in-down">
          <div>
             <Link href="/mood" className="inline-flex items-center text-sm text-gray-500 hover:text-teal-600 mb-2 transition-colors">
                <ArrowLeft size={16} className="mr-1"/> Back to Tracker
             </Link>
            <h1 className="text-4xl font-black text-gray-800">Mood Analytics</h1>
            <p className="text-gray-600 mt-1">Pola emosimu dalam visualisasi data.</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur px-5 py-2 rounded-2xl border border-white/50 text-sm font-bold text-gray-600 shadow-sm">
            Total Entries: {moods.length}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KARTU 1: PIE CHART (Glassmorphism Style) */}
          <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/60 flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-2 w-full mb-6">
                <div className="p-2 bg-teal-100 text-teal-600 rounded-lg"><PieIcon size={20}/></div>
                <h3 className="font-bold text-gray-700">Emotional Mix</h3>
            </div>
            
            {moods.length === 0 ? (
              <div className="text-gray-400 py-10 text-center italic">Belum ada data mood. <br/> Yuk isi dulu!</div>
            ) : (
              <>
                <PieChart data={chartData} size={200} /> 
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-8 w-full">
                  {chartData.map((d) => (
                    d.value > 0 && (
                      <div key={d.label} className="flex items-center gap-2 text-sm text-gray-700 bg-white/50 p-2 rounded-lg border border-white/40">
                        <span className="w-3 h-3 rounded-full shadow-sm" style={{ background: d.color }}></span>
                        <span className="flex-1 font-medium">{d.label}</span>
                        <span className="font-bold bg-white px-2 rounded text-gray-500 text-xs">{d.value}</span>
                      </div>
                    )
                  ))}
                </div>
              </>
            )}
          </div>

          {/* KARTU 2: BAR CHART (Trend Emosi) */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/60 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-2 w-full mb-2">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><TrendingUp size={20}/></div>
                <h3 className="font-bold text-gray-700">Mood Flow (7 Hari Terakhir)</h3>
            </div>
            <p className="text-xs text-gray-500 mb-8 ml-11">Grafik naik menandakan emosi positif, turun menandakan emosi negatif.</p>

            <div className="h-64 flex items-end justify-between gap-3 px-2">
              {recentMoods.length === 0 ? (
                 <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50/50 rounded-2xl border border-dashed border-gray-300">
                    Mulai tracking untuk melihat grafikmu!
                 </div>
              ) : (
                recentMoods.map((m, i) => {
                  // Skala tinggi bar (1-5)
                  const heightPercentage = (m.value / 5) * 100; 
                  
                  return (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1 group relative h-full justify-end">
                      {/* Tooltip on Hover */}
                      <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-800 text-white text-xs py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap z-20 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
                        {m.mood} • {new Date(m.date).toLocaleDateString()}
                      </div>
                      
                      {/* The Bar */}
                      <div 
                        className={`w-full max-w-[50px] rounded-2xl transition-all duration-500 ease-spring hover:opacity-80 hover:scale-105 shadow-md ${
                           // Ambil class background dari data, atau default gray
                           m.color ? m.color.split(' ')[0] : 'bg-gray-300'
                        }`}
                        style={{ height: `${heightPercentage}%`, minHeight: '10%' }}
                      ></div>
                      
                      {/* Label Tanggal */}
                      <span className="text-[10px] text-gray-500 font-bold bg-white/50 px-2 py-1 rounded-full">
                         {new Date(m.date).getDate()}/{new Date(m.date).getMonth()+1}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* KARTU 3: RECENT JOURNALS */}
          <div className="lg:col-span-3 bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/60 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center gap-2 w-full mb-6">
                <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><Calendar size={20}/></div>
                <h3 className="font-bold text-gray-700">Jurnal Terbaru</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...moods].reverse().slice(0, 4).map((m, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-white/60 hover:bg-white transition-all duration-300 border border-white/50 hover:shadow-md group">
                  <div className={`w-1.5 h-full rounded-full transition-all group-hover:w-2 ${m.color ? m.color.split(' ')[0] : 'bg-gray-300'}`}></div>
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-gray-800 text-lg">{m.mood}</span>
                      <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                        {new Date(m.date).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed italic border-l-2 border-gray-200 pl-3 mt-2">
                      "{m.note || "Tidak ada catatan."}"
                    </p>
                  </div>
                </div>
              ))}
              {moods.length === 0 && <p className="text-gray-500 italic text-center w-full py-4">Belum ada riwayat jurnal.</p>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}