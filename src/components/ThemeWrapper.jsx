"use client";
import { useAmbience } from "@/context/AmbienceContext";

export default function ThemeWrapper({ children }) {
  const { ambience } = useAmbience();

  // Tentukan mana yang dianggap "Mode Gelap"
  const isDarkMode = ambience === 'rain' || ambience === 'forest';

  return (
    // Kita tambahkan class "dark-ambience" jika modenya gelap
    <div className={`flex-1 flex flex-col transition-colors duration-700 ${isDarkMode ? "dark-ambience" : ""}`}>
      {children}
    </div>
  );
}