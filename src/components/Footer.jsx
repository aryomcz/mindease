"use client";
import Link from "next/link";
import { Smile, Instagram, Twitter, Github, Heart, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Footer Wrapper dengan Border Top Gradient
    <footer className="relative bg-white/80 backdrop-blur-xl mt-20 border-t border-white/50">
      
      {/* Garis Gradient Halus di Bagian Atas */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-purple-400 to-rose-400"></div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* KOLOM 1: BRAND & DESC */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-teal-100 p-2 rounded-lg text-teal-600 group-hover:rotate-12 transition-transform">
                <Smile size={24} />
              </div>
              <span className="text-2xl font-black text-gray-800 tracking-tight">
                MindEase
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Teman digitalmu untuk kesehatan mental yang lebih baik. Lacak mood, atur napas, dan temukan ketenangan setiap hari.
            </p>
          </div>

          {/* KOLOM 2: QUICK LINKS */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Fitur Utama</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/mood" className="hover:text-teal-600 hover:translate-x-1 transition-all inline-block">
                  Mood Tracker
                </Link>
              </li>
              <li>
                <Link href="/breathing" className="hover:text-teal-600 hover:translate-x-1 transition-all inline-block">
                  Breathing Exercise
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-teal-600 hover:translate-x-1 transition-all inline-block">
                  Wellness Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: SUPPORT */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Bantuan</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/hotline" className="hover:text-rose-500 hover:translate-x-1 transition-all inline-block font-medium">
                  Hotline Darurat
                </Link>
              </li>
              <li>
                <Link href="/hotline" className="hover:text-teal-600 hover:translate-x-1 transition-all inline-block">
                  Konseling Kampus
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-teal-600 hover:translate-x-1 transition-all inline-block">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* KOLOM 4: SOCIAL & NEWSLETTER (Visual Only) */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Stay Connected</h3>
            <div className="flex gap-3 mb-6">
              <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-teal-100 hover:text-teal-600 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-sky-100 hover:text-sky-600 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 hover:text-black transition">
                <Github size={20} />
              </a>
            </div>
            
            {/* Tombol Email Sederhana */}
            <a href="mailto:hello@mindease.com" className="flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 transition">
               <Mail size={16} /> hello@mindease.com
            </a>
          </div>

        </div>

        {/* BOTTOM BAR: COPYRIGHT */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            © {currentYear} MindEase. All rights reserved.
          </p>
          
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse" />
            <span>for <span className="font-bold text-gray-700">PRISMA 2025</span></span>
          </div>
        </div>

      </div>
    </footer>
  );
}