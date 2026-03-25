"use client";

import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section id="beranda" className="bg-transparent transition-colors min-h-[60vh] md:min-h-[90vh] flex flex-col justify-center relative overflow-hidden">
      <div className="w-full flex flex-col items-center px-4 md:px-12 relative z-10 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center mb-10 gap-3 px-3 py-2 sm:px-5 sm:py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md rounded-full shadow-lg"
        >
          <span className="text-[8px] sm:text-xs text-black/60 dark:text-white/70 font-bold tracking-[0.3em] uppercase">
            Pengalaman Museum Pintar Interaktif
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10vw] sm:text-6xl md:text-8xl lg:text-9xl font-black text-black dark:text-white text-center leading-[0.85] tracking-tighter max-w-[95vw] lg:max-w-7xl"
        >
          HIDUPKAN{" "}
          <span className="inline-block text-transparent bg-clip-text bg-linear-to-r from-emerald-500 via-emerald-600 to-emerald-700 italic pr-12 mr-[-3rem]">
            SEJARAH&nbsp;
          </span>
          <br />
          DALAM TIGA{" "}
          <span className="inline-block text-transparent bg-clip-text bg-linear-to-r from-violet-500 via-purple-600 to-purple-700 italic pr-16 mr-[-4rem]">
            DIMENSI.&nbsp;
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-gray-500 dark:text-gray-400 text-center max-w-2xl text-base md:text-xl font-light leading-relaxed px-4"
        >
          Jembatan antara masa lalu dan masa depan. Temukan keajaiban artefak
          sejarah melalui teknologi WebAR tercanggih.
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
