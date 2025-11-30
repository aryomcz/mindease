"use client";
import articles from "@/data/articles";
import Link from "next/link";
import React from "react"
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from "lucide-react";
import Image from "next/image";

export default function ArticleDetail({ params }) {
    // Unwrapping params (Next.js 15+)
    const { id } = React.use(params);
    const article = articles.find((a) => a.id == id);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Article not found.
            </div>
        );
    }

    return (
        // 1. CONTAINER UTAMA: Hapus bg-gradient agar transparan mengikuti ambience
        <div className="w-full relative overflow-hidden min-h-screen">

            {/* Decor (Hanya hiasan di mode default) */}
            <div className="fixed top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-white/80 to-transparent pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 pt-32 pb-32 relative z-10">

                {/* NAVIGASI ATAS */}
                <div className="flex justify-between items-center mb-10 animate-fade-in-down">
                    <Link
                        href="/articles"
                        className="group flex items-center gap-2 text-gray-600 hover:text-teal-600 font-bold transition-colors bg-white/60 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-md glass-card"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Library
                    </Link>

                    <div className="flex gap-3">
                        <button
                            className="p-3 rounded-full bg-white/60 hover:bg-white text-gray-500 hover:text-indigo-600 transition shadow-sm border border-white/50 cursor-pointer glass-card"
                            aria-label="Save article to bookmarks"
                            title="Save article"
                        >
                            <Bookmark size={20} />
                        </button>
                        <button
                            className="p-3 rounded-full bg-white/60 hover:bg-white text-gray-500 hover:text-indigo-600 transition shadow-sm border border-white/50 cursor-pointer glass-card"
                            aria-label="Share article with others"
                            title="Share article"
                        >
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                {/* KONTEN UTAMA (GLASS PANEL) */}
                {/* glass-panel ini akan otomatis jadi gelap transparan saat mode hujan/hutan */}
                <article className="glass-panel p-8 md:p-12 rounded-[3rem] animate-fade-in-up shadow-2xl border border-white/60">

                    {/* Article Header */}
                    <div className="text-center mb-10 border-b border-gray-200 pb-10">
                        <div className="flex flex-wrap justify-center items-center gap-4 text-sm font-bold text-gray-400 mb-6">
                            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg border border-indigo-100 glass-card">
                                {article.category || "Wellness"}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar size={14} /> {article.date || "Today"}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock size={14} /> 5 min read
                            </span>
                        </div>

                        {/* Judul: text-gray-900 akan otomatis jadi putih di mode gelap */}
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                            {article.title}
                        </h1>

                        {/* Thumbnail Image */}
                        <div className="w-full h-64 md:h-96 bg-gray-200 rounded-[2rem] overflow-hidden shadow-inner relative">
                            {article.thumbnail ? (
                                <Image fill src={article.thumbnail} className="w-full h-full object-cover" alt={`Cover image for article: "${article.title}" - Mental health wellness content`} />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-tr from-teal-100 to-indigo-100"></div>
                            )}
                        </div>
                    </div>

                    {/* Article Body */}
                    {/* 2. KONTEN: Menggunakan text-gray-700 standar agar mudah berubah warna */}
                    <div className="text-gray-700 leading-loose text-lg space-y-6">
                        {article.content.split('\n').map((paragraph, idx) => (
                            <p key={idx} className="first-letter:text-5xl first-letter:font-bold first-letter:text-teal-600 first-letter:mr-1 first-letter:float-left">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Author Footer */}
                    <div className="mt-12 pt-8 border-t border-gray-200 flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-tr from-teal-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                            LM
                        </div>
                        <div>
                            <p className="font-bold text-gray-800">Lumind Team</p>
                            <p className="text-xs text-gray-500">Mental Health Specialist</p>
                        </div>
                    </div>

                </article>

            </div>
        </div>
    );
}