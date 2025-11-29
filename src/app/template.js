"use client";

export default function Template({ children }) {
  return (
    // Kita bungkus semua halaman dengan animasi Fade In Up
    // Jadi setiap ganti halaman, kontennya akan "naik" perlahan
    <div className="animate-fade-in-up">
      {children}
    </div>
  );
}