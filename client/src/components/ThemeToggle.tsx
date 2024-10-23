"use client";
import { useState, useEffect } from "react";

import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { Switch } from "@headlessui/react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleChange = () => {
    if (!darkMode) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Switch
      checked={darkMode}
      onChange={handleChange}
      className="group relative inline-flex h-8 w-16 items-center rounded-full bg-white transition data-[checked]:bg-gray-500"
    >
      <FaMoon className="text-white absolute left-1" size={18} />
      <span className="z-10 size-6 translate-x-1 rounded-full  bg-gray-300 dark:bg-medium  transition group-data-[checked]:translate-x-9 " />
      <BsSunFill
        size={18}
        className="ml-auto absolute right-1 text-yellow-400"
      />
    </Switch>
  );
};

export default ThemeToggle;
