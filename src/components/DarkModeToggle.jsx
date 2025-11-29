"use client";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("mindease-color-scheme");
    if (saved) {
      setMode(saved);
      if (saved === "dark") document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem("mindease-color-scheme", next);

    if (next === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  return (
    <button className="bg-white p-2 rounded-lg shadow text-sm cursor-pointer" onClick={toggle}>
      {mode === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
