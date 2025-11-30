"use client";
import Link from "next/link";
import { ArrowRight, Trash2, Moon, Anchor, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

export default function ToolsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    // [Autoplay({ delay: 3000 })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

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

  return (
    <div className="relative w-full">
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
          
          {/* CARD 1 */}
          <Link href="/void" className="snap-center shrink-0 w-[280px] h-80 bg-slate-800 rounded-[2.5rem] p-7 relative overflow-hidden flex flex-col justify-between group transition-transform hover:scale-[1.02] shadow-xl shadow-slate-200">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-black text-white leading-tight">The<br />Void</h3>
                <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-lg backdrop-blur">+ NEW</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">Buang pikiran negatifmu ke dalam kehampaan digital. Lega seketika.</p>
            </div>

            <div className="relative z-10">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 font-bold group-hover:w-full transition-all duration-500 overflow-hidden relative">
                {/* TEXT */}
                <span
                  className="
                    absolute
                    left-4
                    opacity-0
                    -translate-x-4
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
                  Release Now
                </span>
                {/* ARROW */}
                <ArrowRight
                  size={20}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-6
                  "
                />
              </div>
            </div>
            <Trash2 className="absolute -bottom-6 -right-6 text-slate-700 opacity-50 rotate-12 group-hover:rotate-0 transition-transform duration-500" size={160} />
          </Link>

          {/* CARD 2 */}
          <Link href="/toolbox?tool=sleep" className="snap-center shrink-0 w-[280px] h-80 bg-indigo-600 rounded-[2.5rem] p-7 relative overflow-hidden flex flex-col justify-between group transition-transform hover:scale-[1.02] shadow-xl shadow-indigo-200">
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-white mb-2 leading-tight">Sleep<br />Cycle</h3>
              <p className="text-indigo-200 text-xs leading-relaxed">Hitung waktu tidur ideal agar bangun segar tanpa pening.</p>
            </div>
            <div className="relative z-10">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold group-hover:w-full transition-all duration-500 overflow-hidden relative">
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
                Calculate
              </span>

              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-6"
              />
            </div>

            </div>
            <Moon className="absolute -bottom-4 -right-4 text-indigo-500 opacity-50 rotate-12 group-hover:rotate-0 transition-transform duration-500" size={150} />
          </Link>

          {/* CARD 3 */}
          <Link href="/toolbox?tool=grounding" className="snap-center shrink-0 w-[280px] h-80 bg-[#C4D9C8] rounded-[2.5rem] p-7 relative overflow-hidden flex flex-col justify-between group transition-transform hover:scale-[1.02] shadow-xl shadow-green-100">
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-[#2D4F34] mb-2 leading-tight">Panic<br />Relief</h3>
              <p className="text-[#4A6B52] text-xs leading-relaxed">Teknik 5-4-3-2-1 untuk meredakan serangan cemas.</p>
            </div>
            <div className="relative z-10">
             <div className="w-12 h-12 bg-[#2D4F34] rounded-full flex items-center justify-center text-[#C4D9C8] font-bold group-hover:w-full transition-all duration-500 overflow-hidden relative">
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
                Start Now
              </span>

              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-6"
              />
            </div>

            </div>
            <Anchor className="absolute -bottom-6 -right-6 text-[#A5C2AA] opacity-60 rotate-12 group-hover:rotate-0 transition-transform duration-500" size={160} />
          </Link>

          {/* CARD 4 */}
          <Link href="/toolbox?tool=letter" className="snap-center shrink-0 w-[280px] h-80 bg-rose-400 rounded-[2.5rem] p-7 relative overflow-hidden flex flex-col justify-between group transition-transform hover:scale-[1.02] shadow-xl shadow-rose-200">
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-white mb-2 leading-tight">Time<br />Capsule</h3>
              <p className="text-rose-100 text-xs leading-relaxed">Kirim surat harapan untuk dirimu di masa depan.</p>
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-500 font-bold group-hover:w-full transition-all duration-500 overflow-hidden relative">
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
                  Write Letter
                </span>

                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-6"
                />
              </div>

            </div>
            <Mail className="absolute -bottom-6 -right-6 text-rose-300 opacity-60 rotate-12 group-hover:rotate-0 transition-transform duration-500" size={160} />
          </Link>

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
    </div>
  );
}
