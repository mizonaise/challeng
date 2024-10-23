"use client";
import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

import { IoMdPulse } from "react-icons/io";

const Navbar: React.FC = () => {
  return (
    <nav className="border-gray-200 bg-gray-200 dark:bg-dark">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="flex gap-1 items-center">
            <h1 className="font-bold text-gray-900 text-2xl dark:text-white">
              Invoilify
            </h1>
            <IoMdPulse className="text-3xl text-sky-400" aria-hidden="true" />
          </div>
        </Link>
        <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
