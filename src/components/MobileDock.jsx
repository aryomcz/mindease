"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Smile, Grid, BookOpen, Phone } from "lucide-react";

export default function MobileDock() {
  const pathname = usePathname();

  const links = [
    { href: "/", icon: <Home size={22} />, label: "Home" },
    { href: "/mood", icon: <Smile size={22} />, label: "Mood" },
    { href: "/toolbox", icon: <Grid size={22} />, label: "Tools" },
    { href: "/articles", icon: <BookOpen size={22} />, label: "Read" },
    { href: "/hotline", icon: <Phone size={22} />, label: "Help" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-sm">
      {/* Container Kaca Melayang */}
      <nav className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl px-6 py-4 flex justify-between items-center relative overflow-hidden">
        
        {/* Efek Kilau Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full -skew-x-12 opacity-50 animate-pulse-slow pointer-events-none"></div>

        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.label} 
              href={link.href}
              className={`relative flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? "text-teal-600 -translate-y-1" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {/* Ikon dengan Background Glow kalau Aktif */}
              <div className={`p-2 rounded-2xl transition-all duration-300 ${
                isActive ? "bg-teal-100 shadow-lg shadow-teal-200/50 scale-110" : ""
              }`}>
                {link.icon}
              </div>
              
              {/* Titik indikator di bawah */}
              <span className={`absolute -bottom-2 w-1 h-1 rounded-full bg-teal-600 transition-all duration-300 ${
                isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}></span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}