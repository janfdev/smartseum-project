"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatedThemeToggler } from "./animated-theme-toggler";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="w-full relative z-50 bg-white dark:bg-black transition-colors">
      <div className="px-4 md:px-12 lg:px-24">
        <div className="flex items-center justify-between py-4 sm:py-6">
          {/* Logo / Brand */}
          <h2 className="text-2xl font-medium">SmartSeum</h2>

          {/* Desktop Navigation (Pill) */}
          <div className="hidden md:flex items-center gap-1 px-1.5 py-1.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-transparent shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] rounded-full transition-colors z-20">
            <button className="px-6 py-2 text-[13px] font-semibold bg-black text-white dark:bg-white dark:text-black rounded-full transition-colors">
              HOME
            </button>
            <button className="px-5 py-2 text-[13px] font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors rounded-full">
              STORY
            </button>
            <button className="px-5 py-2 text-[13px] font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors rounded-full">
              ARTIST
            </button>
            <button className="px-5 py-2 text-[13px] font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors rounded-full">
              GALLERY
            </button>
            <button className="px-5 py-2 text-[13px] font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors rounded-full">
              PRESS RELEASE
            </button>
            <button className="px-5 py-2 text-[13px] font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors rounded-full">
              CONTACT
            </button>
          </div>

          {/* Right Side: Theme & Mobile Toggle */}
          <div className="flex items-center gap-4 z-20">
            <AnimatedThemeToggler />

            {/* Mobile Navigation Toggle */}
            <button
              onClick={handleClick}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isActive}
            >
              {isActive ? (
                <X className="w-6 h-6 text-black dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-black dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content (Dropdown) */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-lg transition-all duration-300 origin-top overflow-hidden z-10 ${
          isActive ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2 px-4">
          <button className="w-full text-left px-4 py-3 text-base font-medium rounded-lg bg-gray-100 text-black dark:bg-gray-800 dark:text-white transition-colors">
            HOME
          </button>
          <button className="w-full text-left px-4 py-3 text-base font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-black dark:text-gray-300 dark:hover:bg-gray-900/50 dark:hover:text-white transition-colors">
            STORY
          </button>
          <button className="w-full text-left px-4 py-3 text-base font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-black dark:text-gray-300 dark:hover:bg-gray-900/50 dark:hover:text-white transition-colors">
            ARTIST
          </button>
          <button className="w-full text-left px-4 py-3 text-base font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-black dark:text-gray-300 dark:hover:bg-gray-900/50 dark:hover:text-white transition-colors">
            GALLERY
          </button>
          <button className="w-full text-left px-4 py-3 text-base font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-black dark:text-gray-300 dark:hover:bg-gray-900/50 dark:hover:text-white transition-colors">
            PRESS RELEASE
          </button>
          <button className="w-full text-left px-4 py-3 text-base font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-black dark:text-gray-300 dark:hover:bg-gray-900/50 dark:hover:text-white transition-colors">
            CONTACT
          </button>
        </div>
      </div>
    </nav>
  );
}
