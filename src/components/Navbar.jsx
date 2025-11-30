"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Smile, HeartHandshake } from "lucide-react";
import StreakCounter from "@/components/StreakCounter";
import { useAmbience } from "@/context/AmbienceContext"; 
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const { ambience } = useAmbience(); 
  const [scrolled, setScrolled] = useState(false);

  // Cek apakah sedang mode gelap (Rain/Forest)
  const isDarkMode = ambience === 'rain' || ambience === 'forest';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sembunyikan Navbar di halaman Void
  if (pathname === "/void") return null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Mood", href: "/mood" },
    { name: "Toolbox", href: "/toolbox" },
    { name: "Articles", href: "/articles" },
  ];

  return (
    <nav 
      role="navigation"
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled 
        ? (isDarkMode ? "bg-black/40 backdrop-blur-md shadow-sm py-2" : "bg-white/70 backdrop-blur-md shadow-sm py-2")
        : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        
        {/* KIRI: LOGO */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group"
          aria-label="Lumind Homepage"
        >
          {/* Logo Image */}
          <div className="relative w-10 h-10 group-hover:scale-110 transition-transform duration-300">
             <Image
             width={40}
             height={40} 
               src="/logo.png" 
               alt="Lumind Logo" 
               className="w-full h-full object-contain drop-shadow-sm"
             />
          </div>
          
<span className="text-xl md:text-2xl font-black tracking-tight block bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-500 drop-shadow-sm">            Lumind
          </span>
        </Link>

        {/* TENGAH: DESKTOP MENU */}
        <div className={`hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full border shadow-sm absolute left-1/2 -translate-x-1/2 transition-colors duration-500 ${
            isDarkMode ? "bg-black/30 border-white/20" : "bg-white/50 border-white/50"
        }`}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            
            // LOGIKA WARNA (SESUAI REQUEST)
            let linkClasses = "px-5 py-2 font-bold text-sm rounded-full transition-all duration-300 ";
            
            if (isDarkMode) {
                // --- MODE GELAP ---
                if (isActive) {
                    linkClasses += "bg-white text-black-600 shadow-md"; // Aktif: Putih Teks Abu
                } else {
                    linkClasses += "text-white hover:bg-white/20"; // Tidak Aktif: Teks Putih
                }
            } else {
                // --- MODE TERANG ---
                if (isActive) {
                    linkClasses += "bg-white text-teal-600 shadow-md"; // Aktif: Putih Teks Teal
                } else {
                    linkClasses += "text-gray-600 hover:bg-white hover:text-teal-600"; // Tidak Aktif: Teks Abu
                }
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-label={`Pergi ke halaman ${link.name}`}
                className={linkClasses}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* KANAN: STREAK & HOTLINE */}
        <div className="flex items-center gap-3">
            
            <div className="scale-90 sm:scale-100">
               <StreakCounter />
            </div>

            <div className="hidden md:block">
              <Link 
                href="/hotline" 
                aria-label="Pusat Bantuan Darurat"
                className={`px-5 py-2.5 font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 text-sm ${
                    isDarkMode 
                    ? "bg-white text-black-900 hover:bg-gray-200" 
                    : "bg-gray-900 text-white hover:bg-black"
                }`}
              >
                <HeartHandshake size={18} /> Help
              </Link>
            </div>

        </div>

      </div>
    </nav>
  );
}