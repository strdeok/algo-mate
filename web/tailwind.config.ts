/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 배경색 (깊은 남색)
        background: "#0f172a",
        surface: "#1e293b",

        // 메인 포인트
        primary: {
          DEFAULT: "#10b981",
          hover: "#059669",
          foreground: "#ffffff",
        },

        // 보조 포인트
        secondary: {
          DEFAULT: "#8b5cf6",
          hover: "#7c3aed",
        },

        // 상태 색상
        danger: "#f43f5e",
        warning: "#f59e0b",

        // 텍스트 색상
        text: {
          main: "#f1f5f9",
          sub: "#94a3b8",
        },
      },
      fontFamily: {
        jeju: ["'Jeju Gothic'", "sans-serif"],
        jaro: ['Jaro', "sans-serif"],
        pretendard: ["'Pretendard Variable'", "Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};
