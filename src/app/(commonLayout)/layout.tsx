// pages/_app.tsx
"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import NavBar from "@/components/navbar/Navbar"; // Adjust path as necessary

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);

  // Sync dark mode with local storage and apply/remove class
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <html lang="en">
      <body className={`${darkMode ? "dark" : ""}`}>
        {/* Pass darkMode and toggleDarkMode as props to NavBar */}
        <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        {children}
      </body>
    </html>
  );
}
