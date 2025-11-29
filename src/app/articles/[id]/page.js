"use client";
import articles from "@/data/articles";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from "lucide-react";

export default function ArticleDetail({ params }) {
  // Parsing ID (pastikan logic ini sesuai dengan cara nextjs menangani params di versimu)
  const id = parseInt(params.id);
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
        <h1 className="text-4xl font-bold text-gray-300 mb-4">404</h1>
        <p className="text-gray-600 mb-6">Artikel tidak ditemukan.</p>
        <Link href="/articles" className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition">
          Kembali ke Library
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 animate-gradient">
      
      {/* Container Utama dengan PT-32 */}
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        
        {/* NAVIGASI ATAS */}
        <div className="flex justify-between items-center mb-8 animate-fade-in-down">
          <Link
            href="/articles"
            className="group flex items-center gap-2 text-gray-500 hover:text-teal-600 font-semibold transition-colors bg-white/60 px-4 py-2 rounded-full backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-md"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Library
          </Link>

          <div className="flex gap-2">
            <button className="p-2.5 rounded-full bg-white/60 hover:bg-white text-gray-500 hover:text-indigo-600 transition shadow-sm border border-white/50" title="Save Article">
                <Bookmark size={20} />
            </button>
            <button className="p-2.5 rounded-full bg-white/60 hover:bg-white text-gray-500 hover:text-indigo-600 transition shadow-sm border border-white/50" title="Share">
                <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* KONTEN ARTIKEL (Glass Container) */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/60 animate-fade-in-up">
          
          {/* HEADER GAMBAR */}
          <div className="relative h-64 md:h-96 w-full bg-gray-200">
            {article.thumbnail ? (
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gradient-to-tr from-gray-100 to-gray-200">
                 <span className="text-6xl mb-2">🖼️</span>
                 <span className="text-sm font-medium uppercase tracking-widest">No Image Available</span>
              </div>
            )}
            
            {/* Overlay Gradient agar teks judul terbaca jika mau ditaruh di atas gambar (Opsional) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>

          {/* ISI KONTEN */}
          <div className="px-8 md:px-12 py-10">
            
            {/* Meta Data */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 font-medium">
               <span className="flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg">
                 <Calendar size={14}/> {article.date || "Today"}
               </span>
               <span className="flex items-center gap-1">
                 <Clock size={14}/> 5 min read
               </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
              {article.title}
            </h1>

            {/* Garis Pemisah Estetik */}
            <hr className="border-gray-200 mb-8" />

            {/* Body Text */}
            <article className="prose prose-lg prose-indigo max-w-none text-gray-700 leading-relaxed whitespace-pre-line first-letter:text-5xl first-letter:font-bold first-letter:text-teal-600 first-letter:mr-1 first-letter:float-left">
              {article.content}
            </article>

            {/* Author / Footer Kecil */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                   ME
                </div>
                <div>
                   <p className="text-sm font-bold text-gray-800">MindEase Team</p>
                   <p className="text-xs text-gray-500">Wellness Content Creator</p>
                </div>
            </div>

          </div>
        </div>

        {/* RELATED ARTICLES */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-teal-500 rounded-full"></span>
            Baca Juga
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles
              .filter((a) => a.id !== id)
              .slice(0, 2)
              .map((a) => (
                <Link
                  key={a.id}
                  href={`/articles/${a.id}`}
                  className="group block bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                    {a.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {a.preview || "Klik untuk membaca selengkapnya tentang topik menarik ini..."}
                  </p>
                  <div className="mt-4 text-sm font-semibold text-teal-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Article <ArrowLeft size={16} className="rotate-180"/>
                  </div>
                </Link>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}