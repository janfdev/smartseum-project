"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          "auto-rotate"?: boolean | string;
          "camera-controls"?: boolean | string;
          "environment-image"?: string;
          exposure?: string;
          "shadow-intensity"?: string;
          "shadow-softness"?: string;
          "rotation-per-second"?: string;
          "max-camera-orbit"?: string;
          "min-camera-orbit"?: string;
          "camera-orbit"?: string;
          style?: React.CSSProperties;
          class?: string;
        },
        HTMLElement
      >;
    }
  }
}

export default function MuseumSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    import("@google/model-viewer").then(() => {
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) return null;

  return (
    <section className="min-h-[90vh] bg-white dark:bg-black text-black dark:text-white transition-colors relative flex items-center py-20 lg:py-32">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Text Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 space-y-8 text-center lg:text-left order-2 lg:order-1"
        >
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-gray-500 font-medium tracking-widest uppercase text-xs"
            >
              Interactive Showcase
            </motion.p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] max-w-xl mx-auto lg:mx-0">
              Jelajahi Eksibisi dari Berbagai Sudut Pandang.
            </h2>
          </div>

          <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Masuki dimensi baru dalam mengeksplorasi karya seni melalui maket museum interaktif kami. Visualisasi 3D ini memberikan Anda kebebasan untuk mengamati tata letak galeri secara mendetail.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Untuk melengkapi pengalaman pengunjung, seluruh pajangan telah diintegrasikan dengan sistem QR Code. Temukan cerita di balik karya hanya dengan pindaian singkat.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="pt-6 flex justify-center lg:justify-start"
          >
            <Link
              href="/qr-simulation"
              className="group inline-flex items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 transition-all font-medium px-8 py-3.5"
            >
              Coba Simulasi QR
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* 3D Model Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex-1 w-full aspect-square lg:aspect-auto lg:h-[70vh] relative order-1 lg:order-2"
        >
          {/* Subtle frame surrounding the 3D model */}
          <div className="w-full h-full relative z-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black overflow-hidden shadow-sm">
            <model-viewer
              src="/assets/3dmuseum.glb"
              alt="3D Model of Virtual Museum"
              auto-rotate
              camera-controls
              rotation-per-second="30deg"
              shadow-intensity="1.5"
              shadow-softness="1"
              environment-image="neutral"
              exposure="1"
              min-camera-orbit="auto auto 0m"
              style={{ width: "100%", height: "100%", outline: "none" }}
            >
            </model-viewer>
            
            {/* Guide overlay */}
            <div className="absolute bottom-4 left-0 w-full flex justify-center pointer-events-none">
              <span className="bg-black/5 dark:bg-white/10 backdrop-blur-sm text-gray-500 dark:text-gray-400 text-xs px-3 py-1.5 rounded-full font-medium tracking-wide">
                Drag & Scroll untuk navigasi
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
