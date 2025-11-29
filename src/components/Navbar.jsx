"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, HeartHandshake, Smile } from "lucide-react"; // Ikon pelengkap

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efek shadow muncul saat di-scroll agar tidak flat
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Mood Tracker", href: "/mood" },
    { name: "Breathing", href: "/breathing" },
    { name: "Articles", href: "/articles" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-md shadow-lg border-b border-white/20"
          : "bg-transparent py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* LOGO AREA - Dibuat playful */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-tr from-teal-400 to-green-300 p-2 rounded-xl text-white transform group-hover:rotate-12 transition duration-300 shadow-lg">
            <Smile size={24} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-green-500 tracking-tight">
            MindEase
          </span>
        </Link>

        {/* DESKTOP NAV - Menggunakan style 'Pill' yang empuk */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-gray-600 font-medium rounded-full hover:bg-teal-50 hover:text-teal-600 transition-all duration-300 hover:scale-105"
            >
              {link.name}
            </Link>
          ))}
          
          {/* Tombol Khusus Hotline - Menonjol untuk urgensi tapi tetap cantik */}
          <Link
            href="/hotline"
            className="ml-4 px-6 py-2.5 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold rounded-full shadow-md hover:shadow-xl hover:from-rose-500 hover:to-pink-600 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
          >
            <HeartHandshake size={18} />
            Help Center
          </Link>
        </div>

        {/* MOBILE TOGGLE - Tombol hamburger yang lebih soft */}
        <button
          className="md:hidden p-2 text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN - Animasi smooth & layout card */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-teal-100 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          open ? "opacity-100 scale-y-100 py-6" : "opacity-0 scale-y-0 h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col space-y-2 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-gray-600 hover:text-teal-700 hover:bg-teal-50 rounded-xl font-medium transition"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/hotline"
            onClick={() => setOpen(false)}
            className="mt-4 block text-center px-4 py-3 bg-rose-100 text-rose-600 font-bold rounded-xl hover:bg-rose-200 transition"
          >
            Butuh Bantuan Segera?
          </Link>
        </div>
      </div>
    </nav>
  );
}