"use client";
import { useState, useEffect } from "react";
import { Bird, CheckCircle2, Circle, PartyPopper, Trophy } from "lucide-react";
import { MotionWrapper, StaggerContainer } from "./MotionWrapper";

export default function WellnessBuddy() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Minum air putih (2L)", done: false },
    { id: 2, text: "Latihan napas 1 menit", done: false },
    { id: 3, text: "Isi Mood Tracker", done: false },
    { id: 4, text: "Tidur sebelum jam 11", done: false },
  ]);
  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const completed = tasks.filter(t => t.done).length;
    const percent = (completed / tasks.length) * 100;
    setProgress(percent);
  }, [tasks]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  const getMascotState = () => {
    if (progress === 0) return { 
        anim: "animate-bounce", 
        color: "!text-gray-400", // Paksa warna icon
        bg: "!bg-gray-100",      // Paksa warna bg icon
        msg: "Ayo mulai harimu!",
        icon: <Bird size={64} />
    };
    if (progress < 100) return { 
        anim: "animate-pulse", 
        color: "!text-teal-500", 
        bg: "!bg-teal-50",
        msg: "Good job! Keep going!",
        icon: <Bird size={64} />
    };
    return { 
        anim: "animate-bounce", 
        color: "!text-orange-500", 
        bg: "!bg-orange-100",
        msg: "Wow! Kamu luar biasa!",
        icon: <Trophy size={64} />
    };
  };

  const mascot = getMascotState();

  return (
    // PERBAIKAN 1: Tambah '!bg-white/90' agar kartu tetap putih transparan (tidak jadi hitam)
    // Tambah '!border-white/60' agar border tetap terlihat
    <div className="!bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-xl border !border-white/60 max-w-sm w-full transform transition-all hover:scale-[1.02] cursor-pointer">
      
      {/* HEADER: MASKOT */}
      <div className="text-center mb-6 relative">
        <MotionWrapper animation="scaleIn" duration={0.8}>
        <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center ${mascot.bg} ${mascot.color} shadow-inner transition-all duration-500`}>
           <div className={mascot.anim}>
             {mascot.icon}
           </div>
        </div>
        </MotionWrapper>
        
        {/* Chat Bubble Maskot */}
        {/* PERBAIKAN 2: Paksa text jadi abu-abu (!text-gray-600) dan bg putih (!bg-white) */}
        <div className="absolute top-0 right-0">
         <MotionWrapper animation="slideInRight" duration={0.8}>
          <div className="!bg-white border !border-gray-200 px-3 py-1 rounded-t-xl rounded-br-xl text-xs font-bold !text-gray-600 shadow-sm animate-fade-in-up">
            {mascot.msg}
          </div>
         </MotionWrapper>
        </div>
      </div>

      {/* PERBAIKAN 3: Paksa judul jadi hitam (!text-gray-800) */}
      <h3 className="text-xl font-bold !text-gray-800 mb-4 flex items-center gap-2">
        ✅ Daily Goals
      </h3>

      {/* PROGRESS BAR */}
      <div className="w-full !bg-gray-200 rounded-full h-2.5 mb-6 overflow-hidden">
        <div 
          className="bg-teal-500 h-2.5 rounded-full transition-all duration-700 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* CHECKLIST ITEMS */}
      <div className="space-y-3">
        <StaggerContainer>
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => toggleTask(task.id)}
            // PERBAIKAN 4: Paksa warna text item (!text-gray-XXX)
            // Paksa warna background item (!bg-XXX)
            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 text-left group cursor-pointer 
              ${task.done 
                ? "!bg-teal-50 !border-teal-200 !text-gray-400 line-through" 
                : "!bg-white border-gray-100 hover:!border-teal-300 !text-gray-700"
              }
            `}
          >
            <div className={`shrink-0 transition-colors ${task.done ? "text-teal-500" : "text-gray-300 group-hover:text-teal-400"}`}>
               {task.done ? <CheckCircle2 size={24} /> : <Circle size={24} />}
            </div>
            <span className="text-sm font-medium">{task.text}</span>
            {task.done && <PartyPopper size={16} className="ml-auto text-orange-400 animate-bounce" />}
          </button>
        ))}
        </StaggerContainer>
      </div>

    </div>
  );
}