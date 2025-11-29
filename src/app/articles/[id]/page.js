"use client";
import articles from "@/data/articles";
import Link from "next/link";
import React from "react"
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from "lucide-react";

export default function ArticleDetail({ params }) {
    // Pastikan logic params.id sesuai dengan versi Next.js kamu
    const { id } = React.use(params);
    // const id = parseInt(params.id);
    const article = articles.find((a) => a.id == id);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-indigo-50 text-gray-500">
                Article not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 animate-gradient relative">

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-white/80 to-transparent pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 pt-32 pb-32 relative z-10">

                {/* NAVIGASI ATAS */}
                <div className="flex justify-between items-center mb-10 animate-fade-in-down">
                    <Link
                        href="/articles"
                        className="group flex items-center gap-2 text-gray-600 hover:text-teal-600 font-bold transition-colors bg-white/60 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-md"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Library
                    </Link>

                    <div className="flex gap-3">
                        <button className="p-3 rounded-full bg-white/60 hover:bg-white text-gray-500 hover:text-indigo-600 transition shadow-sm border border-white/50 cursor-pointer">
                            <Bookmark size={20} />
                        </button>
                        <button className="p-3 rounded-full bg-white/60 hover:bg-white text-gray-500 hover:text-indigo-600 transition shadow-sm border border-white/50 cursor-pointer">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                {/* KONTEN UTAMA (GLASS PANEL) */}
                <article className="glass-panel p-8 md:p-12 rounded-[3rem] animate-fade-in-up">

                    {/* Article Header */}
                    <div className="text-center mb-10 border-b border-gray-100 pb-10">
                        <div className="flex flex-wrap justify-center items-center gap-4 text-sm font-bold text-gray-400 mb-6">
                            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg border border-indigo-100">
                                {article.category || "Wellness"}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar size={14} /> {article.date || "Today"}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock size={14} /> 5 min read
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                            {article.title}
                        </h1>

                        {/* Thumbnail Image */}
                        <div className="w-full h-64 md:h-96 bg-gray-200 rounded-4xl overflow-hidden shadow-inner relative">
                            {article.thumbnail ? (
                                <img src={article.thumbnail} className="w-full h-full object-cover" alt="Cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-tr from-teal-100 to-indigo-100"></div>
                            )}
                        </div>
                    </div>

                    {/* Article Body */}
                    <div className="prose prose-lg prose-indigo max-w-none text-gray-700 leading-loose">
                        {/* Render text with line breaks */}
                        {article.content.split('\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-6 first-letter:text-5xl first-letter:font-bold first-letter:text-teal-600 first-letter:mr-1 first-letter:float-left">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Author Footer */}
                    <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-tr from-teal-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                            ME
                        </div>
                        <div>
                            <p className="font-bold text-gray-800">MindEase Team</p>
                            <p className="text-xs text-gray-500">Mental Health Specialist</p>
                        </div>
                    </div>

                </article>

            </div>
        </div>
    );
}