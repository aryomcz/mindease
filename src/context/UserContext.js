"use client";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("user_name");
        if (saved) setUserName(saved);
    }, []);

    return (
        <UserContext.Provider value={{ userName, setUserName }}>
            {children}
        </UserContext.Provider>
    );
}
