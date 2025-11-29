"use client";
import { useState } from "react";
import articles from "@/data/articles"; 
import Link from "next/link";
import { Search, Sparkles, BookOpen, Clock, ArrowRight } from "lucide-react";

export default function ArticlesPage() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Anxiety", "Sleep", "Mindfulness", "Self-Care"];

  const filteredArticles = articles.filter((article) => {
    const query = searchQuery.toLowerCase();
    const title = article.title?.toLowerCase() || "";
    const preview = article.preview?.toLowerCase() || "";
    
    const matchesSearch = title.includes(query) || preview.includes(query);
    const matchesCategory = filter === "All" || (article.category && article.category.includes(filter));

    return matchesSearch && matchesCategory; 
  });

  return (
    // PERBAIKAN: HAPUS BG GRADIENT, GUNAKAN MIN-H-SCREEN TRANSPARAN
    <div className="w-full relative overflow-hidden min-h-screen text-gray-800">

      {/* Decor (Hanya hiasan di mode default) */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 pt-36 pb-32 relative z-10">

        {/* HEADER SECTION */}
        <div className="text-center mb-16 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur border border-white/50 text-indigo-600 text-sm font-bold mb-6 shadow-sm glass-card">
            <BookOpen size={18} />
            <span>Wellness Library</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-gray-800 mb-6 tracking-tight text-glow">
            Insights for a <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">
              Better You.
            </span>
          </h1>

          {/* SEARCH BAR (Floating Capsule) */}
          <div className="relative max-w-lg mx-auto group">
             <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors">
                <Search size={22} />
             </div>
             <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari topik (misal: 'Stress', 'Tidur')..." 
                className="w-full pl-14 pr-6 py-4 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-300 outline-none transition-all text-gray-700 placeholder:text-gray-400 text-lg glass-card"
             />
          </div>

          {/* TAGS FILTER */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                   filter === cat 
                   ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105" 
                   : "bg-white/50 text-gray-600 hover:bg-white hover:shadow-md glass-card"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ARTICLES GRID */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
            {filteredArticles.map((a, idx) => (
              <Link 
                key={a.id} 
                href={`/articles/${a.id}`}
                className="group glass-card rounded-[2rem] overflow-hidden hover-3d flex flex-col h-full shadow-lg border border-white/40"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Image Placeholder */}
                <div className="h-56 bg-gray-200 relative overflow-hidden">
                   {a.thumbnail ? (
                     <img src={a.thumbnail} alt={a.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-100 to-indigo-100 text-teal-300">
                        <Sparkles size={48} />
                     </div>
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                   <div className="flex items-center gap-3 text-xs font-bold text-gray-400 mb-3">
                      <span className="bg-white/60 px-2 py-1 rounded-lg border border-white/50 text-indigo-500 glass-card">
                        {a.category || "General"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14}/> 5 min read
                      </span>
                   </div>
                   
                   <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                     {a.title}
                   </h3>
                   
                   <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                     {a.preview || "Klik untuk membaca selengkapnya tentang topik ini..."}
                   </p>

                   <div className="flex items-center text-indigo-600 font-bold text-sm group-hover:gap-2 transition-all">
                     Read Article <ArrowRight size={16} className="ml-1"/>
                   </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
           <div className="text-center py-20">
              <div className="glass-panel inline-block p-8 rounded-3xl">
                 <p className="text-gray-500 font-medium">Artikel tidak ditemukan.</p>
                 <button onClick={() => setSearchQuery("")} className="mt-2 text-teal-600 font-bold hover:underline cursor-pointer">Clear Search</button>
              </div>
           </div>
        )}

      </div>
    </div>
  );
}