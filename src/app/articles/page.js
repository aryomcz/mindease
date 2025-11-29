"use client";
import { useState } from "react";
import articles from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import { Search, Sparkles, BookOpen, X } from "lucide-react";

export default function ArticlesPage() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // 1. State untuk Search

  // Dummy categories (Pastikan artikelmu nanti punya field 'category' kalau mau filter ini jalan beneran)
  // Untuk sekarang, ini visual filter saja, tapi search bar-nya akan jalan real-time.
  const categories = ["All", "Anxiety", "Sleep", "Mindfulness", "Self-Care"];

  // 2. LOGIC FILTERING (PENTING!)
  // Kita memfilter artikel berdasarkan Search Query YANG DIKETIK
  const filteredArticles = articles.filter((article) => {
    // Ubah ke huruf kecil biar pencarian tidak case-sensitive
    const query = searchQuery.toLowerCase();
    const title = article.title?.toLowerCase() || "";
    const preview = article.preview?.toLowerCase() || "";

    // Cek apakah judul ATAU preview mengandung kata kunci pencarian
    const matchesSearch = title.includes(query) || preview.includes(query);
    
    // (Opsional) Logic Filter Kategori
    // const matchesCategory = filter === "All" || article.category === filter;

    return matchesSearch; // && matchesCategory; (Aktifkan jika datanya sudah lengkap)
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 animate-gradient">
      
      {/* PADDING TOP 32 */}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-white/50 text-indigo-600 text-sm font-semibold mb-4 shadow-sm">
            <BookOpen size={16} />
            <span>Wellness Library</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 tracking-tight">
            Insights for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">Better You.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan panduan, tips praktis, dan wawasan mendalam untuk kesehatan mentalmu.
          </p>

          {/* SEARCH BAR (Sekarang Berfungsi!) */}
          <div className="mt-8 relative max-w-lg mx-auto group">
             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors">
                <Search size={20} />
             </div>
             
             <input 
                type="text" 
                value={searchQuery} // Sambungkan value ke State
                onChange={(e) => setSearchQuery(e.target.value)} // Update state saat mengetik
                placeholder="Cari topik (misal: 'Stress', 'Tidur')..." 
                className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white/80 backdrop-blur border border-white/50 focus:ring-4 focus:ring-teal-100 focus:border-teal-300 outline-none transition shadow-lg text-gray-700 placeholder:text-gray-400"
             />

             {/* Tombol Clear (X) - Muncul jika ada ketikan */}
             {searchQuery && (
               <button 
                 onClick={() => setSearchQuery("")}
                 className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-rose-500 transition"
               >
                 <X size={20} />
               </button>
             )}
          </div>

          {/* CATEGORY TAGS */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                   filter === cat 
                   ? "bg-gray-800 text-white shadow-lg scale-105" 
                   : "bg-white/50 text-gray-600 hover:bg-white hover:shadow-md"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ARTICLES GRID (Menggunakan filteredArticles) */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
            {filteredArticles.map((a) => (
              // Wrapper div agar efek hover lebih smooth
              <div key={a.id} className="transform transition duration-300 hover:-translate-y-2">
                 <ArticleCard article={a} />
              </div>
            ))}
          </div>
        ) : (
           // TAMPILAN JIKA PENCARIAN KOSONG
           <div className="text-center py-20 bg-white/40 backdrop-blur rounded-3xl border border-dashed border-gray-300 animate-pulse">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Search size={32}/>
              </div>
              <h3 className="text-xl font-bold text-gray-700">Tidak ditemukan.</h3>
              <p className="text-gray-500">Coba cari dengan kata kunci lain.</p>
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-4 text-teal-600 font-bold hover:underline"
              >
                Hapus Pencarian
              </button>
           </div>
        )}

      </div>
    </div>
  );
}