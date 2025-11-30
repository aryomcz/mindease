"use client";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import TheVoid from "@/components/TheVoid";

export default function VoidPage() {
  return (
    // LAYER 1: Background Hitam Pekat dengan Radial Gradient Misterius
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center p-6 text-white selection:bg-purple-500 selection:text-white">

      {/* LAYER 2: Efek Noise/Grain (Biar kayak film lama) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* LAYER 3: Ambient Glow (Cahaya Redup di Background) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse-slow animation-delay-2000 pointer-events-none"></div>

      {/* LAYER 4: Partikel Bintang Melayang (CSS Animation) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Bintang 1 */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-[float_8s_ease-in-out_infinite] opacity-40 shadow-[0_0_10px_white]"></div>
        {/* Bintang 2 */}
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-indigo-300 rounded-full animate-[float_12s_ease-in-out_infinite_reverse] opacity-50 shadow-[0_0_10px_indigo]"></div>
        {/* Bintang 3 */}
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-teal-200 rounded-full animate-[float_10s_ease-in-out_infinite] opacity-30"></div>
      </div>

      {/* --- KONTEN UTAMA --- */}

      {/* Tombol Keluar (Pojok Kiri Atas) */}
      <div className="absolute top-4 lg:top-8 left-3 lg:left-6 z-50 animate-fade-in-down">
        <Link
          href="/toolbox"
          className="group flex items-center gap-2 text-slate-400 hover:text-white transition-all px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 bg-black/20 backdrop-blur-md"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium tracking-wide hidden md:block">EXIT VOID</span>
        </Link>
      </div>

      <div className="relative z-20 w-full max-w-2xl animate-fade-in-up text-center">

        {/* Header Judul */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/30 border border-indigo-500/20 text-indigo-300 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
            <Sparkles size={10} /> Safe Space
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 drop-shadow-2xl">
            The Void
          </h1>

          <p className="text-slate-400 mt-6 text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto">
            Di sini hening. Tidak ada jejak.<br />
            <span className="text-indigo-400">Tumpahkan.</span> <span className="text-purple-400">Lepaskan.</span> <span className="text-slate-500">Lupakan.</span>
          </p>
        </div>

        {/* Panggil Komponen The Void */}
        <TheVoid />

      </div>

    </div>
  );
}