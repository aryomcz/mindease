"use client";
import { useState } from "react";
import { Eye, Hand, Ear, Sparkles, Smile, ArrowRight, RefreshCcw } from "lucide-react";

export default function GroundingExercise() {
  const [step, setStep] = useState(0); 

  const steps = [
    {
      id: 1,
      number: "5",
      title: "Things You See",
      desc: "Lihat sekelilingmu. Temukan 5 benda yang menarik perhatianmu. Sebutkan dalam hati.",
      icon: <Eye size={48} className="text-teal-500" />,
      color: "bg-teal-50 border-teal-200 text-teal-800"
    },
    // ... (data lain tetap sama)
    {
      id: 2,
      number: "4",
      title: "Things You Can Touch",
      desc: "Rasakan tekstur di sekitarmu. Baju yang kamu pakai, meja, atau udara di kulitmu.",
      icon: <Hand size={48} className="text-indigo-500" />,
      color: "bg-indigo-50 border-indigo-200 text-indigo-800"
    },
    {
      id: 3,
      number: "3",
      title: "Things You Can Hear",
      desc: "Tutup mata sejenak. Fokus pada 3 suara terjauh atau terdekat yang bisa kamu dengar.",
      icon: <Ear size={48} className="text-purple-500" />,
      color: "bg-purple-50 border-purple-200 text-purple-800"
    },
    {
      id: 4,
      number: "2",
      title: "Things You Can Smell",
      desc: "Tarik napas. Coba kenali 2 aroma di sekitarmu, atau bayangkan aroma favoritmu.",
      icon: <Sparkles size={48} className="text-rose-500" />,
      color: "bg-rose-50 border-rose-200 text-rose-800"
    },
    {
      id: 5,
      number: "1",
      title: "Thing You Can Taste",
      desc: "Rasakan lidahmu. Atau sebutkan 1 hal baik tentang dirimu hari ini.",
      icon: <Smile size={48} className="text-orange-500" />,
      color: "bg-orange-50 border-orange-200 text-orange-800"
    }
  ];

  const handleNext = () => setStep(step + 1);
  const handleReset = () => setStep(0);

  return (
    // PERBAIKAN: Hapus fixed height, ganti min-h-full agar fleksibel
    <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 shadow-xl w-full mx-auto relative overflow-visible transition-all hover:scale-[1.01]">
      
      {/* STEP 0: INTRO */}
      {step === 0 && (
        <div className="text-center animate-fade-in-up py-4">
          <div className="inline-block p-4 bg-teal-100 rounded-full text-teal-600 mb-6">
            <Sparkles size={32} />
          </div>
          <h2 className="text-2xl font-black text-gray-800 mb-4">Panic Attack?</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Gunakan teknik <strong>Grounding 5-4-3-2-1</strong> untuk meredakan kecemasan dan kembali fokus ke momen saat ini.
          </p>
          <button 
            onClick={handleNext}
            className="w-full py-4 bg-teal-600 text-white rounded-xl font-bold shadow-lg hover:bg-teal-700 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            Mulai Teknik Ini <ArrowRight size={20}/>
          </button>
        </div>
      )}

      {/* STEP 1-5: EXERCISE */}
      {step > 0 && step <= 5 && (
        <div className="text-center animate-fade-in-up py-4" key={step}>
          <div className="flex justify-between items-center mb-8 text-sm font-bold text-gray-400">
             <span>Langkah {step} dari 5</span>
             <button onClick={handleReset} className="hover:text-rose-500"><RefreshCcw size={16}/></button>
          </div>

          <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner ${steps[step-1].color.split(" ")[0]}`}>
             {steps[step-1].icon}
          </div>

          <h1 className="text-6xl font-black text-gray-200 absolute top-4 right-6 -z-10 select-none opacity-50">
            {steps[step-1].number}
          </h1>

          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {steps[step-1].title}
          </h3>
          <p className="text-gray-600 mb-8 text-lg min-h-[60px]">
            {steps[step-1].desc}
          </p>

          <button 
            onClick={handleNext}
            className="w-full py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50 transition-all"
          >
            Saya sudah menemukannya
          </button>
        </div>
      )}

      {/* STEP 6: FINISH */}
      {step === 6 && (
        <div className="text-center animate-fade-in-up py-8">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce">
            <Smile size={48} />
          </div>
          <h2 className="text-2xl font-black text-gray-800 mb-2">Kamu Hebat!</h2>
          <p className="text-gray-600 mb-8">
            Semoga pikiranmu sekarang lebih tenang.
          </p>
          <button 
            onClick={handleReset}
            className="w-full py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-black transition-all"
          >
            Selesai
          </button>
        </div>
      )}
      
      {/* Progress Bar */}
      {step > 0 && step <= 5 && (
          <div className="absolute bottom-0 left-0 h-2 bg-gray-100 w-full overflow-hidden rounded-b-[2rem]">
              <div 
                className="h-full bg-teal-500 transition-all duration-500" 
                style={{ width: `${(step/5)*100}%` }}
              ></div>
          </div>
      )}
    </div>
  );
}