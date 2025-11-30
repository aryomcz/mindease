"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Play, Square, RotateCcw, Wind } from "lucide-react";

export default function Breathing() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState("Ready"); // State: Ready, Inhale, Hold, Exhale
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);

  const timerRef = useRef(null);

  // --- 1. LOGIKA PERNAPASAN ---
  useEffect(() => {
    let phaseTimer;

    if (isActive) {
      if (phase === "Inhale") {
        phaseTimer = setTimeout(() => {
          setPhase("Hold");
        }, 4000);
      } else if (phase === "Hold") {
        phaseTimer = setTimeout(() => {
          setPhase("Exhale");
        }, 4000);
      } else if (phase === "Exhale") {
        phaseTimer = setTimeout(() => {
          setPhase("Inhale");
        }, 4000);
      }
    }

    return () => clearTimeout(phaseTimer);
  }, [phase, isActive]);

  // --- 2. LOGIKA TIMER MUNDUR ---
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsFinished(true);
      setPhase("Ready");
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const startSession = () => {
    if (timeLeft === 0) setTimeLeft(60);
    setIsActive(true);
    setIsFinished(false);
    setPhase("Inhale");
  };

  const stopSession = () => {
    setIsActive(false);
    setPhase("Ready");
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resetSession = () => {
    setIsActive(false);
    setPhase("Ready");
    setTimeLeft(60);
    setIsFinished(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const getPhaseConfig = () => {
    switch (phase) {
      case "Inhale":
        return {
          text: "INHALE",
          subtext: "Tarik napas panjang dari hidung...",
          color: "bg-teal-400 text-teal-50 shadow-teal-300",
          scale: "scale-150"
        };
      case "Hold":
        return {
          text: "HOLD",
          subtext: "Tahan napas sejenak...",
          color: "bg-indigo-500 text-indigo-50 shadow-indigo-400",
          scale: "scale-150"
        };
      case "Exhale":
        return {
          text: "EXHALE",
          subtext: "Hembuskan perlahan lewat mulut...",
          color: "bg-rose-400 text-rose-50 shadow-rose-300",
          scale: "scale-100"
        };
      default:
        return {
          text: "READY?",
          subtext: "Tekan tombol Play untuk mulai.",
          color: "bg-white text-gray-500 shadow-gray-200",
          scale: "scale-100"
        };
    }
  };

  const config = getPhaseConfig();

  return (
    // PERBAIKAN: HAPUS BG GRADIENT, GUNAKAN CLASS STANDAR AGAR AMBIENCE TERLIHAT
    <div className="w-full relative overflow-hidden min-h-screen flex flex-col items-center pt-32 pb-10 px-6">

      {/* HEADER */}
      <div className="text-center mb-10 z-10 transition-all duration-300">
        {/* Gunakan text-white atau text-gray-800 tergantung mode (otomatis oleh globals.css .dark-ambience) */}
        <h1 className="text-4xl font-black text-gray-800 mb-2 tracking-tight">Breathing Space</h1>
        <p className="text-gray-500 min-h-[1.5rem] font-medium animate-pulse">
          {config.subtext}
        </p>
      </div>

      {/* VISUALISASI LINGKARAN */}
      <div className="relative flex items-center justify-center w-full max-w-md h-80 mb-12">
        {isActive && (
          <div className={`absolute w-64 h-64 rounded-full opacity-30 animate-ping ${phase === 'Inhale' ? 'bg-teal-300' : 'bg-rose-300'}`}></div>
        )}

        <div
          className={`
            relative z-20 flex flex-col items-center justify-center
            w-56 h-56 rounded-full shadow-2xl
            transition-all duration-[4000ms] ease-in-out
            ${config.color} ${config.scale}
          `}
        >
          {/* Paksa teks dalam bola agar tetap terlihat kontras dengan warna bola */}
          <span className={`text-3xl font-black tracking-widest drop-shadow-sm ${phase === "Ready" ? "text-gray-500" : "text-white"}`}>{config.text}</span>
          {phase !== "Ready" && <Wind className="mt-2 opacity-60 animate-bounce text-white" size={24} />}
        </div>
      </div>

      {/* CONTROLS */}
      {!isFinished ? (
        // Gunakan glass-panel agar transparan mengikuti background
        <div className="flex items-center gap-6 glass-panel px-8 py-4 rounded-3xl shadow-xl border border-white/50 z-10 transition-all hover:shadow-2xl hover:-translate-y-1 bg-white/60">

          <button onClick={resetSession} className="p-3 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all cursor-pointer" aria-label="Reset">
            <RotateCcw size={22} />
          </button>

          <button
            onClick={isActive ? stopSession : startSession}
            className={`
               w-16 h-16 flex items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer
               ${isActive ? "bg-amber-400 hover:bg-amber-500" : "bg-teal-500 hover:bg-teal-600"}
            `}
            aria-label={isActive ? "Stop" : "Start"}
          >
            {isActive ? <Square fill="currentColor" size={24} /> : <Play fill="currentColor" size={28} className="ml-1" />}
          </button>

          <div className="w-16 text-center">
            <span className="text-2xl font-mono font-bold text-gray-700">
              00:{`timeLeft < 10 ? 0${timeLeft} : timeLeft`}
            </span>
          </div>

        </div>
      ) : (
        // LAYAR SELESAI
        <div className="glass-panel p-8 rounded-3xl shadow-2xl text-center animate-fade-in-up z-10 border border-white max-w-sm bg-white/80">
          <div className="inline-block p-4 bg-teal-100 text-teal-600 rounded-full mb-4 animate-bounce">
            <Wind size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Relaxed?</h2>
          <p className="text-gray-600 mb-6 text-sm">Kerja bagus! Jangan lupa minum air putih ya.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={resetSession} className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition cursor-pointer">
              Ulangi
            </button>
            <Link href="/mood" className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-200 transition">
              Cek Mood
            </Link>
          </div>
        </div>
      )}

      {/* Background Decor (Hanya hiasan di mode default) */}
      <div className="fixed top-20 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none"></div>

    </div>
  );
}