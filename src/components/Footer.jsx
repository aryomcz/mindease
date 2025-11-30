"use client";
import Link from "next/link";
import { Instagram, Twitter, Github } from "lucide-react"; // Hapus Smile
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname(); 
  const currentYear = new Date().getFullYear();

  if (pathname === "/void") return null;

  return (
    <footer className="relative mt-32 border-t border-white/40 bg-white/60 backdrop-blur-xl">
      
      {/* Garis Neon Tipis di Atas */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-50"></div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* UPPER SECTION: Flexbox Layout */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* 1. BRAND (Kiri) */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-3 group mb-2">
              {/* Logo Image */}
              <div className="w-10 h-10 group-hover:rotate-12 transition-transform duration-300">
                 <img src="/logo.png" alt="Lumind Logo" className="w-full h-full object-contain" />
              </div>
              
<span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-500">                LuMind
              </span>
            </Link>
            <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
              Teman digitalmu untuk kesehatan mental yang lebih baik.
            </p>
          </div>

          {/* 2. NAVIGATION (Tengah - Horizontal) */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-600">
            <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
            <Link href="/mood" className="hover:text-teal-600 transition-colors">Mood</Link>
            <Link href="/toolbox" className="hover:text-teal-600 transition-colors">Toolbox</Link>
            <Link href="/articles" className="hover:text-teal-600 transition-colors">Articles</Link>
            <Link href="/hotline" className="text-rose-500 hover:text-rose-600 transition-colors">Emergency</Link>
          </nav>

          {/* 3. SOCIALS (Kanan) */}
          <div className="flex gap-3">
            <SocialIcon icon={<Instagram size={18} />} href="#" color="hover:text-pink-600 hover:bg-pink-50" />
            <SocialIcon icon={<Twitter size={18} />} href="#" color="hover:text-sky-500 hover:bg-sky-50" />
            <SocialIcon icon={<Github size={18} />} href="#" color="hover:text-gray-900 hover:bg-gray-100" />
          </div>

        </div>

        {/* LOWER SECTION: Copyright & Credits */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium">
          <p>
            © {currentYear} LuMind Inc. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

// Helper Component untuk Icon Sosmed
function SocialIcon({ icon, href, color }) {
  return (
    <a 
      href={href} 
      className={`p-2.5 bg-white border border-gray-100 text-gray-400 rounded-full shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${color}`}
    >
      {icon}
    </a>
  );
}