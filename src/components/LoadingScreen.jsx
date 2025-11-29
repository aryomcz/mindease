"use client";
import { useState, useEffect } from "react";
import { Smile } from "lucide-react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hilangkan loading screen setelah 2 detik
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2000ms = 2 detik

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-teal-50 to-white transition-opacity duration-700 ease-out ${
        loading ? "opacity-100" : "opacity-0 hidden pointer-events-none"
      }`}
    >
      <div className="relative">
        {/* Lingkaran Berdenyut */}
        <div className="absolute inset-0 bg-teal-200 rounded-full blur-xl opacity-50 animate-ping"></div>
        <div className="absolute inset-0 bg-indigo-200 rounded-full blur-xl opacity-50 animate-pulse animation-delay-2000"></div>
        
        {/* Logo Utama */}
        <div className="relative bg-white p-6 rounded-3xl shadow-2xl animate-bounce-slow">
          <Smile size={64} className="text-teal-500" strokeWidth={2.5} />
        </div>
      </div>

      <h1 className="mt-8 text-2xl font-black text-gray-700 tracking-widest uppercase animate-pulse">
        LuMind
      </h1>
      <p className="text-gray-400 text-sm mt-2 font-medium">Breathe In. Breathe Out.</p>
    </div>
  );
}