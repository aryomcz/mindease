"use client";
import { createContext, useState, useContext } from "react";

const AmbienceContext = createContext();

export function AmbienceProvider({ children }) {
  // Mode: 'default', 'rain', 'forest', 'cafe'
  const [ambience, setAmbience] = useState("default");

  return (
    <AmbienceContext.Provider value={{ ambience, setAmbience }}>
      {children}
    </AmbienceContext.Provider>
  );
}

export function useAmbience() {
  return useContext(AmbienceContext);
}