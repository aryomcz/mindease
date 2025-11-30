"use client";
import { useState, useEffect } from "react";

const quotes = [
  "It is okay to rest.",
  "Take it one step at a time.",
  "Your mental health matters.",
  "Breathe. You are doing enough.",
  "Healing is not linear.",
  "You are stronger than you think.",
  "Small progress is still progress."
];

export default function QuoteCard() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  }, []);

  if (!quote) {
    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-teal-100 h-24 animate-pulse"></div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-teal-100 text-center hover:shadow-md transition-shadow">
      <p className="text-xl font-medium !text-gray-700 italic">
        "{quote}"
      </p>
    </div>
  );
}