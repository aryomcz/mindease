"use client";
import { useState, useEffect } from "react";
import { Bird, CheckCircle2, Circle, PartyPopper, Trophy, Flame } from "lucide-react";
import { MotionWrapper, StaggerContainer } from "./MotionWrapper";
import confetti from "canvas-confetti";

export default function WellnessBuddy() {
  const DEFAULT_TASKS = [
    { id: 1, text: "Minum air putih (2L)", done: false },
    { id: 2, text: "Latihan napas 1 menit", done: false },
    { id: 3, text: "Isi Mood Tracker", done: false },
    { id: 4, text: "Tidur sebelum jam 11", done: false },
  ];

  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);

  // *** Load + Reset Goals saat ganti hari ***
  useEffect(() => {
    const storedTasks = localStorage.getItem("buddy_tasks");
    const storedStreak = localStorage.getItem("buddy_streak");
    const storedDate = localStorage.getItem("buddy_date");

    const today = new Date().toLocaleDateString();

    if (storedStreak) setStreak(parseInt(storedStreak));

    if (storedDate !== today) {
      setTasks(DEFAULT_TASKS);
      localStorage.setItem("buddy_tasks", JSON.stringify(DEFAULT_TASKS));
      localStorage.setItem("buddy_date", today);
    } else {
      if (storedTasks) setTasks(JSON.parse(storedTasks));
      localStorage.setItem("buddy_date", today);
    }
  }, []);

  // *** Update progress + finish animation ***
  useEffect(() => {
    localStorage.setItem("buddy_tasks", JSON.stringify(tasks));

    const completed = tasks.filter(t => t.done).length;
    const percent = (completed / tasks.length) * 100;
    setProgress(percent);

    if (percent === 100) finishGoals();
  }, [tasks]);

  const finishGoals = () => {
    confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
    const newStreak = streak + 1;
    setStreak(newStreak);
    localStorage.setItem("buddy_streak", newStreak);
  };

  // *** No Undo ***
  const toggleTask = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, done: true } : t
    ));
  };

  // *** Mascot Logic ***
  const getMascotState = () => {
    if (progress === 0)
      return {
        anim: "animate-bounce",
        color: "!text-gray-400",
        bg: "!bg-gray-100",
        msg: "Ayo mulai harimu!",
        icon: <Bird size={64} />,
        deco: "✨"
      };

    if (progress < 100)
      return {
        anim: "animate-pulse",
        color: "!text-teal-500",
        bg: "!bg-teal-50",
        msg: "Good job! Keep going!",
        icon: <Bird size={64} />,
        deco: "💫"
      };

    return {
      anim: "animate-bounce",
      color: "!text-orange-500",
      bg: "!bg-orange-100",
      msg: "Kamu luar biasa!",
      icon: <Trophy size={64} />,
      deco: "🎉"
    };
  };

  const mascot = getMascotState();

  return (
    <div className="!bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-xl border 
      !border-white/60 max-w-sm w-full transform transition-all hover:scale-[1.02] cursor-pointer">

      {/* HEADER */}
      <div className="text-center mb-6 relative">

        {/* Little floating emote */}
        <div className="absolute -top-2 left-2 text-xl animate-pulse opacity-70">
          {mascot.deco}
        </div>

        <MotionWrapper animation="scaleIn" duration={0.8}>
          <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center
            ${mascot.bg} ${mascot.color} shadow-inner transition-all duration-500 relative`}> 

            {/* Glow dot */}
            <div className="absolute top-3 right-3 w-3 h-3 bg-teal-400 rounded-full animate-ping"></div>

            <div className={mascot.anim}>
              {mascot.icon}
            </div>
          </div>
        </MotionWrapper>

        {/* Chat bubble */}
        <div className="absolute top-0 right-0">
          <MotionWrapper animation="slideInRight" duration={0.8}>
            <div className="!bg-white border !border-gray-200 px-3 py-1 rounded-t-xl rounded-br-xl 
              text-xs font-bold !text-gray-600 shadow-sm animate-fade-in-up">
              {mascot.msg}
            </div>
          </MotionWrapper>
        </div>
      </div>

      {/* TITLE */}
      <div className="flex items-center justify-between mb-4 px-1">

        {/* LEFT: Daily Goals */}
        <h3 className="text-xl font-bold !text-gray-800 flex items-center gap-2">
          Daily Goals
        </h3>

        {/* RIGHT: Streak */}
        <div className="flex items-center gap-1 text-orange-500 font-bold text-sm">
          <Flame size={18} /> {streak} hari
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full !bg-gray-200 rounded-full h-2.5 mb-6 overflow-hidden">
        <div
          className="bg-teal-500 h-2.5 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* CHECKLIST */}
      <div className="space-y-3">
        <StaggerContainer>
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => toggleTask(task.id)}
              disabled={task.done}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 
                text-left group cursor-pointer 
                ${
                  task.done
                    ? "!bg-teal-50 !border-teal-200 !text-gray-400 line-through"
                    : "!bg-white border-gray-100 hover:!border-teal-300 !text-gray-700"
                }
              `}
            >
              <div className={`shrink-0 transition-colors 
                ${task.done ? "text-teal-500" : "text-gray-300 group-hover:text-teal-400"}`}>
                {task.done ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </div>

              <span className="text-sm font-medium">{task.text}</span>

              {task.done && (
                <PartyPopper size={16} className="ml-auto text-orange-400 animate-bounce" />
              )}
            </button>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
