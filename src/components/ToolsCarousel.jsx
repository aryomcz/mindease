"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Trash2, Moon, Anchor, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

export default function ToolsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  // ✅ TAMBAH: Track viewport untuk trigger animasi
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

  // ✅ TAMBAH: Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay antar card: 150ms
        delayChildren: 0.2,    // Delay awal: 200ms
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // ✅ DATA: Definisikan cards di array untuk mapping
  const cards = [
    {
      id: 1,
      title: "The\nVoid",
      subtitle: "+ NEW",
      desc: "Buang pikiran negatifmu ke dalam kehampaan digital. Lega seketika.",
      href: "/void",
      bgColor: "bg-slate-800",
      textColor: "text-white",
      buttonColor: "bg-white text-slate-900",
      hoverButtonColor: "text-white",
      hoverButtonBgColor: "bg-slate-900",
      buttonText: "Release Now",
      icon: Trash2,
      iconColor: "text-slate-700",
      shadowColor: "shadow-slate-200",
    },
    {
      id: 2,
      title: "Sleep\nCycle",
      subtitle: "",
      desc: "Hitung waktu tidur ideal agar bangun segar tanpa pening.",
      href: "/toolbox?tool=sleep",
      bgColor: "bg-indigo-600",
      textColor: "text-white",
      buttonColor: "bg-white text-indigo-600",
      hoverButtonColor: "text-indigo-600",
      hoverButtonBgColor: "bg-indigo-700",
      buttonText: "Calculate",
      icon: Moon,
      iconColor: "text-indigo-500",
      shadowColor: "shadow-indigo-200",
    },
    {
      id: 3,
      title: "Panic\nRelief",
      subtitle: "",
      desc: "Teknik 5-4-3-2-1 untuk meredakan serangan cemas.",
      href: "/toolbox?tool=grounding",
      bgColor: "bg-[#C4D9C8]",
      textColor: "text-[#2D4F34]",
      buttonColor: "bg-[#2D4F34] text-[#C4D9C8]",
      hoverButtonColor: "text-[#C4D9C8]",
      hoverButtonBgColor: "bg-[#1a3a22]",
      buttonText: "Start Now",
      icon: Anchor,
      iconColor: "text-[#A5C2AA]",
      shadowColor: "shadow-green-100",
    },
    {
      id: 4,
      title: "Time\nCapsule",
      subtitle: "",
      desc: "Kirim surat harapan untuk dirimu di masa depan.",
      href: "/toolbox?tool=letter",
      bgColor: "bg-rose-400",
      textColor: "text-white",
      buttonColor: "bg-white text-rose-500",
      hoverButtonColor: "text-rose-500",
      hoverButtonBgColor: "bg-rose-500",
      buttonText: "Write Letter",
      icon: Mail,
      iconColor: "text-rose-300",
      shadowColor: "shadow-rose-200",
    },
  ];

  return (
    // ✅ WRAP dengan motion.div + container variants
    <motion.div
      ref={containerRef}
      className="relative w-full"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
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
      <div className="overflow-hidden py-12" ref={emblaRef}>
        <div className="flex gap-6 px-2">
          
          {/* ✅ MAP CARDS dengan motion.div */}
          {cards.map((card) => {
            const IconComponent = card.icon;
            
            return (
              // ✅ TAMBAH: motion.div untuk individual card animation
              <motion.div
                key={card.id}
                variants={cardVariants}
                className="snap-center shrink-0 w-[280px]"
              >
                <Link
                  href={card.href}
                  className={`${card.bgColor} rounded-[2.5rem] p-7 relative overflow-hidden flex flex-col justify-between group transition-transform hover:scale-[1.02] shadow-xl ${card.shadowColor} h-80 block`}
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`text-2xl font-black ${card.textColor} leading-tight whitespace-pre-line`}>
                        {card.title}
                      </h3>
                      {card.subtitle && (
                        <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-lg backdrop-blur">
                          {card.subtitle}
                        </span>
                      )}
                    </div>
                    <p className={`${card.textColor === "text-white" ? "text-slate-400" : "text-[#4A6B52]"} text-xs leading-relaxed opacity-80`}>
                      {card.desc}
                    </p>
                  </div>

                  <div className="relative z-10">
                    <div className={`w-12 h-12 ${card.buttonColor} rounded-full flex items-center justify-center font-bold group-hover:w-full transition-all duration-500 overflow-hidden relative`}>
                      <span
                        className="
                          absolute
                          left-4
                          opacity-0
                          -translate-x-3
                          group-hover:opacity-100
                          group-hover:translate-x-0
                          transition-all
                          duration-300
                          delay-150
                          text-sm
                          pointer-events-none
                          whitespace-nowrap
                        "
                      >
                        {card.buttonText}
                      </span>
                      <ArrowRight
                        size={20}
                        className="transition-transform duration-300 group-hover:translate-x-6"
                      />
                    </div>
                  </div>
                  
                  <IconComponent
                    className={`absolute -bottom-6 -right-6 ${card.iconColor} opacity-50 rotate-12 group-hover:rotate-0 transition-transform duration-500`}
                    size={160}
                  />
                </Link>
              </motion.div>
            );
          })}

        </div>
      </div>

      {/* INDICATORS */}
      <div className="flex justify-center mt-4 gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-slate-800 scale-110"
                : "bg-slate-400/40"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}