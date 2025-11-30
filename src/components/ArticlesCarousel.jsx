"use client";
import React from 'react'
import { ArrowRight, BookOpen, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Link from 'next/link';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { MotionWrapper } from './MotionWrapper';

export default function ArticlesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const { ref: containerRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const recentArticles = [
    {
      id: 1,
      title: "Mengapa 'Healing' itu Penting?",
      category: "Self-Care",
      readTime: "3 min",
      desc: "Penjelasan ilmiah bagaimana istirahat sejenak bisa meningkatkan produktivitas dan menjaga kewarasan.",
      color: "bg-teal-100 text-teal-700",
      link: "/articles/healing-penting"
    },
    {
      id: 2,
      title: "Teknik Grounding 5-4-3-2-1",
      category: "Anxiety",
      readTime: "5 min",
      desc: "Cara cepat dan praktis meredakan serangan panik atau cemas berlebih menggunakan lima indra tubuhmu.",
      color: "bg-rose-100 text-rose-700",
      link: "/articles/teknik-grounding"
    },
    {
      id: 3,
      title: "Digital Detox Sederhana",
      category: "Lifestyle",
      readTime: "4 min",
      desc: "Tips mengurangi screen time tanpa merasa tertinggal (FOMO) demi kesehatan mental yang lebih baik.",
      color: "bg-indigo-100 text-indigo-700",
      link: "/articles/digital-detox"
    }
  ];

  return (
    <section className="mb-24 animate-fade-in-up">
      {/* HEADER */}
      

      {/* WRAP CAROUSEL + STAGGER */}
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative"
      >
        {/* BUTTON LEFT */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur p-2 rounded-full z-20 shadow hover:bg-white cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        {/* BUTTON RIGHT */}
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur p-2 rounded-full z-20 shadow hover:bg-white cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>

        {/* CAROUSEL */}
        <div className="overflow-hidden py-4" ref={emblaRef}>
          <div className="flex gap-6 px-2">

            {recentArticles.map((article) => (
              <motion.div
                variants={cardVariants}
                key={article.id}
                className="shrink-0 w-[310px] md:w-[340px]"
              >
                <Link
                  href={article.link}
                  className="group flex flex-col bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden h-full"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-full pointer-events-none"></div>

                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${article.color}`}>
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-400 text-xs font-medium">
                      <Clock size={12} className="mr-1" /> {article.readTime}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {article.desc}
                  </p>

                  <div className="flex items-center text-sm font-bold text-teal-600 mt-auto">
                    Baca Artikel <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}

          </div>
        </div>

        {/* INDICATORS */}
        <div className="flex justify-center mt-4 gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === selectedIndex ? "bg-slate-800 scale-110" : "bg-slate-400/40"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
