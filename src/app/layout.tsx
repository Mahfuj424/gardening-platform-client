// pages/_app.tsx
"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import NavBar from "@/components/navbar/Navbar"; // Adjust path as necessary
import { usePathname } from "next/navigation";
import Providers from "@/lib/providers/Providers";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);
  const path = usePathname();
  console.log(path);

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
        <Providers>
          {/* Pass darkMode and toggleDarkMode as props to NavBar */}
          {path === "/auth/login" ||
          path === "/auth/register" ||
          path === "/dashboard/admin" ||
          path === "/dashboard/admin/posts" ||
          path === "/dashboard/admin/users" ? (
            ""
          ) : (
            <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          )}
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
