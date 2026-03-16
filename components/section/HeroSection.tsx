"use client";

import React from "react";
import { Home as HouseIcon } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="bg-white dark:bg-black transition-colors min-h-[85vh] flex flex-col justify-center">
      <div className="w-full flex flex-col items-center px-6 md:px-12 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-12 sm:mb-16"
        >
          <HouseIcon className="w-5 h-5 text-black dark:text-white stroke-[2.5]" />
          <span className="text-sm text-black dark:text-white sm:text-[15px] font-semibold tracking-wide">
            Dolskaya St., 1, Moscow 115569 Russia
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium text-black dark:text-white text-center leading-[1.12] max-w-6xl tracking-tight"
        >
          BEGIN AN EXPLORATION THROUGH
          <br className="hidden sm:block" />
          A GALLERY SHOWCASING ARTISAN
          <br className="hidden sm:block" />
          CREATIVITY.
        </motion.h1>
      </div>
    </section>
  );
};

export default HeroSection;
