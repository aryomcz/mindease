"use client";
import { useState, useEffect } from "react";
import { Music, Cloud, Sparkles, ChevronRight, X } from "lucide-react";

export default function OnboardingTutorial() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  useEffect(() => {
    // Cek apakah user sudah pernah lihat tutorial
    const tutorialSeen = localStorage.getItem("lumind_tutorial_seen");
    
    if (!tutorialSeen) {
      // Tampilkan tutorial setelah 2 detik (setelah loading selesai)
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 2500);
      
      return () => clearTimeout(timer);
    } else {
      setHasSeenTutorial(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem("lumind_tutorial_seen", "true");
    setShowTutorial(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const steps = [
    {
      title: "Welcome to Lumind! 🌟",
      description: "Kami punya beberapa fitur seru untuk membuat pengalaman kamu lebih nyaman.",
      icon: <Sparkles size={48} />,
      color: "from-teal-500 to-cyan-500",
      highlight: null,
      instruction: "Swipe atau klik 'Next' untuk melanjutkan"
    },
    {
      title: "🎵 Ambient Sounds",
      description: "Dengarkan suara latar yang menenangkan: Hujan, Hutan, atau Kafe. Klik tombol musik di pojok kanan bawah!",
      icon: <Music size={48} />,
      color: "from-purple-500 to-indigo-600",
      highlight: "sound-player",
      instruction: "Lihat tombol musik floating di kanan bawah? Coba klik untuk membuka panel!"
    },
    {
      title: "🎨 Dynamic Ambience",
      description: "Setiap suara akan mengubah tema warna website untuk pengalaman yang lebih immersive.",
      icon: <Cloud size={48} />,
      color: "from-rose-500 to-orange-500",
      highlight: null,
      instruction: "Suara Hujan → Background Gelap, Hutan → Hijau, Kafe → Hangat"
    },
    {
      title: "⌨️ Keyboard Friendly",
      description: "Semua fitur bisa diakses lewat keyboard. Gunakan Tab untuk navigasi dan Enter untuk klik.",
      icon: <Sparkles size={48} />,
      color: "from-blue-500 to-teal-500",
      highlight: null,
      instruction: "Accessibility is important! ♿"
    },
    {
      title: "✨ Kamu Siap!",
      description: "Sekarang jelajahi Lumind dan nikmati fitur-fitur yang telah kami siapkan untuk kesehatan mentalmu.",
      icon: <Sparkles size={48} />,
      color: "from-green-500 to-teal-500",
      highlight: null,
      instruction: "Klik 'Done' untuk mulai 🚀"
    }
  ];

  const step = steps[currentStep];

  if (!showTutorial) return null;

  return (
    <>
      {/* Overlay Gelap dengan Spotlight Effect */}
      <div className="fixed inset-0 z-[9999] pointer-events-none">
        
        {/* Background semi-transparan */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        {/* Spotlight pada elemen yang di-highlight */}
        {step.highlight && (
          <>
            <div 
              id={`spotlight-${step.highlight}`}
              className="absolute rounded-[2.5rem] border-4 border-white/80 shadow-[0_0_40px_rgba(255,255,255,0.6)] animate-pulse pointer-events-none"
              style={{
                boxShadow: "0 0 60px rgba(255,255,255,0.8), inset 0 0 60px rgba(255,255,255,0.2)"
              }}
            ></div>
            
            {/* Arrow pointing ke highlight */}
            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 animate-bounce">
              <div className="text-white text-4xl drop-shadow-lg">👇</div>
            </div>
          </>
        )}
      </div>

      {/* Modal Card di Center */}
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-auto">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-md w-full shadow-2xl border border-white/60 backdrop-blur-xl animate-fade-in-up relative overflow-hidden">
          
          {/* Decorative Background Gradient */}
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${step.color} opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none`}></div>
          
          {/* Close Button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all z-10 cursor-pointer"
            aria-label="Close tutorial"
          >
            <X size={20} />
          </button>

          <div className="relative z-10">
            
            {/* Icon */}
            <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-lg animate-bounce`}>
              {step.icon}
            </div>

            {/* Title */}
            <h2 className="text-3xl font-black text-gray-800 mb-3 text-center">
              {step.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              {step.description}
            </p>

            {/* Instruction */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-3 mb-6 text-sm font-medium text-teal-800">
              💡 {step.instruction}
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-6">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === currentStep
                      ? "bg-teal-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSkip}
                className="flex-1 px-4 py-2.5 text-gray-600 font-bold rounded-xl border border-gray-300 hover:bg-gray-50 transition-all cursor-pointer"
              >
                Skip
              </button>
              
              <button
                onClick={handleNext}
                className={`flex-1 px-4 py-2.5 text-white font-bold rounded-xl bg-gradient-to-r ${step.color} shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2`}
              >
                {currentStep === steps.length - 1 ? "Done" : "Next"}
                {currentStep < steps.length - 1 && <ChevronRight size={18} />}
              </button>
            </div>

            {/* Helper Text */}
            <p className="text-[10px] text-gray-400 text-center mt-4">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}