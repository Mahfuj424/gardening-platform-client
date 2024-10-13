/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // This is a client component

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NavBar from "@/components/navbar/Navbar"; // Adjust path as necessary
import { Toaster } from "sonner";

export default function DarkModeClient({ children }:any) {
  const [darkMode, setDarkMode] = useState(false);
  const path = usePathname(); // Use hook here

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
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
    <>
      {/* Conditional NavBar rendering */}
      {path === "/auth/login" ||
      path === "/auth/register" ||
      path === "/dashboard/admin" ||
      path === "/dashboard/user" ||
      path === "/dashboard/user/following" ||
      path === "/dashboard/user/followers" ||
      path === "/dashboard/admin/posts" ||
      path === "/dashboard/admin/users" ? (
        ""
      ) : (
        <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}
      {children}
      <Toaster position="top-center" />
    </>
  );
}
