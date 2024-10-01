import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // ডার্ক মোড ক্লাস হিসেবে সেট করা
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#4B5563", // gray-600 as secondary color
        darkBg: "#0F172A", // gray-900 as dark background color
        darkCard: "#1E293B",
        darkModal: "#334155",
        customRing: "#00984b",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(158deg, rgba(255,255,255,1) 0%, rgba(198,247,223,1) 0%, rgba(0,152,75,1) 68%, rgba(69,143,108,1) 100%, rgba(252,255,253,1) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
