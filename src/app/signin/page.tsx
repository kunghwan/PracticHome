"use client";

import TextInput from "./../../components/Ui/useTextInput";
import { IoHome, IoMoon, IoSunny } from "react-icons/io5";
import { useEffect, useState } from "react";

const Signin = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // ✅ 새로고침 시에도 로컬스토리지 적용
  // useEffect(() => {
  //   const saved = localStorage.getItem("theme");
  //   if (saved === "dark") {
  //     setIsDarkMode(true);
  //     document.documentElement.classList.add("dark");
  //   }
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 transition-all duration-300">
      <div className="flex justify-end w-[280px] gap-x-2.5">
        <button
          className={CircleButton}
          onClick={() => setIsDarkMode((prev) => !prev)}
        >
          {isDarkMode ? <IoMoon /> : <IoSunny />}
        </button>
        <button className={CircleButton}>
          <IoHome />
        </button>
      </div>
      <TextInput placeholder="아이디" />
      <TextInput placeholder="비밀번호" />
    </div>
  );
};

export default Signin;

const CircleButton =
  "border rounded-full p-3 flex items-center justify-center text-xl transition-colors dark:bg-gray-700";
