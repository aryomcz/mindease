"use client";
import { useAmbience } from "@/context/AmbienceContext";

export default function AmbienceBackground() {
  const { ambience } = useAmbience();

  // Konfigurasi Style untuk setiap mode
  const styles = {
    default: "bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50",
    rain: "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900",
    forest: "bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900",
    cafe: "bg-gradient-to-br from-orange-100 via-amber-100 to-stone-200",
  };

  return (
    <div className={`fixed inset-0 z-[-1] transition-all duration-[2000ms] ease-in-out ${styles[ambience] || styles.default}`}>
      
      {/* EFEK KHUSUS PER MODE */}
      
      {/* 1. RAIN MODE */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${ambience === 'rain' ? 'opacity-100' : 'opacity-0'}`}>
         {/* Efek Kaca Basah */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/simple-dashed.png')] opacity-10 mix-blend-overlay animate-pulse-slow"></div>
         {/* Overlay Biru Gelap */}
         <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
      </div>

      {/* 2. FOREST MODE */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${ambience === 'forest' ? 'opacity-100' : 'opacity-0'}`}>
         {/* Efek Cahaya Matahari Menembus Daun */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-yellow-400/20 rounded-full blur-[100px] animate-pulse-slow"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[80px]"></div>
         {/* Texture Daun Samar */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/forest.png')] opacity-20 mix-blend-soft-light"></div>
      </div>

      {/* 3. CAFE MODE */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${ambience === 'cafe' ? 'opacity-100' : 'opacity-0'}`}>
         {/* Suasana Hangat */}
         <div className="absolute inset-0 bg-orange-500/5 mix-blend-color-burn"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,transparent_20%,#000000_150%)] opacity-10"></div>
      </div>

      {/* 4. DEFAULT (Animasi Blob Lama) */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${ambience === 'default' ? 'opacity-100' : 'opacity-0'}`}>
         {/* Kita biarkan kosong, karena di page.js masing-masing sudah ada blob dekorasinya. 
             Atau kalau mau konsisten, pindahkan blob dekorasi dari page.js ke sini. */}
      </div>

    </div>
  );
}