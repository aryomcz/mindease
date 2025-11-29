"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Smile, HeartHandshake } from "lucide-react";
import StreakCounter from "@/components/StreakCounter";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Mood", href: "/mood" },
    { name: "Toolbox", href: "/toolbox" },
    { name: "Articles", href: "/articles" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      scrolled 
      ? "bg-white/70 backdrop-blur-md shadow-sm py-2" 
      : "bg-transparent py-4"
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        
        {/* KIRI: LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-tr from-teal-400 to-indigo-500 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform shadow-lg shadow-teal-200">
            <Smile size={24} strokeWidth={2.5} />
          </div>
          
          {/* PERBAIKAN DI SINI: Saya hapus 'hidden sm:block' */}
          {/* Saya ubah ukurannya: 'text-xl' di HP, 'text-2xl' di Laptop */}
          <span className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600 tracking-tight block">
            MindEase
          </span>
        </Link>

        {/* TENGAH: DESKTOP MENU (Hanya Desktop) */}
        <div className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/50 shadow-sm absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-5 py-2 text-gray-600 font-bold text-sm rounded-full hover:bg-white hover:text-teal-600 hover:shadow-md transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* KANAN: STREAK & HOTLINE */}
        <div className="flex items-center gap-3">
           
           {/* STREAK COUNTER */}
           <div className="scale-90 sm:scale-100">
              <StreakCounter />
           </div>

           {/* TOMBOL HOTLINE (Hanya Desktop) */}
           <div className="hidden md:block">
             <Link href="/hotline" className="px-5 py-2.5 bg-gray-900 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-black hover:-translate-y-1 transition-all flex items-center gap-2 text-sm">
               <HeartHandshake size={18} /> Help
             </Link>
           </div>

        </div>

      </div>
    </nav>
  );
}