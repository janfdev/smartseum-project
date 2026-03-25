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

type ItemType = {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
};

export default function MuseumSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [latestItem, setLatestItem] = useState<ItemType | null>(null);

  useEffect(() => {
    // Load model-viewer
    import("@google/model-viewer").then(() => {
      setIsLoaded(true);
    });

    // Fetch latest item from API
    const fetchLatestItem = async () => {
      try {
        const res = await fetch("/api/items");
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          // Ambil item terakhir/pertama sebagai eksibisi utama
          setLatestItem(data.items[0]);
        }
      } catch (error) {
        console.error("Gagal mengambil data item terbaru:", error);
      } finally {
        // isLoadingItem was removed as per linting
      }
    };

    fetchLatestItem();
  }, []);

  if (!isLoaded) return null;

  return (
    <section
      id="interaktif"
      className="min-h-[90vh] bg-transparent text-black dark:text-white transition-colors relative flex items-center py-20 lg:py-32 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        {/* Text Content Area (Restored to General Information) */}
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
              className="text-emerald-500 font-bold tracking-[0.3em] uppercase text-[10px]"
            >
              Interactive Experience
            </motion.p>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.95] max-w-xl mx-auto lg:mx-0">
              Jelajahi Dunia Melalui{" "}
              <span className="text-emerald-500">Lensa Digital.</span>
            </h2>
          </div>

          <div className="space-y-6 text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Smartseum mengubah artefak statis menjadi pengalaman 3D yang
              hidup. Gunakan perangkat Anda untuk membedah setiap detail
              mahakarya sejarah secara interaktif.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-sm opacity-60"
            >
              Sistem kami mengintegrasikan teknologi WebAR terkini untuk
              menghubungkan masa lalu dengan teknologi masa depan secara mulus.
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
              href="/scan"
              className="group relative inline-flex items-center justify-center rounded-full bg-white text-black hover:bg-emerald-500 hover:text-white transition-all duration-500 font-bold px-10 py-4 shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Mulai Eksplorasi AR
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* 3D Model Area (Scanned Viewport Look) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex-1 w-full aspect-square lg:aspect-auto lg:h-[75vh] relative order-1 lg:order-2"
        >
          {/* Main Container with Viewfinder Borders */}
          <div className="w-full h-full relative z-10 rounded-[2.5rem] border border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden shadow-2xl flex items-center justify-center group">
            {/* Viewfinder Corners */}
            <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-emerald-500/50 rounded-tl-lg" />
            <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-emerald-500/50 rounded-tr-lg" />
            <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-emerald-500/50 rounded-bl-lg" />
            <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-emerald-500/50 rounded-br-lg" />

            {/* Scanning Line Animation (Back and forth) */}
            <motion.div
              className="absolute left-0 right-0 h-px bg-emerald-500/30 z-20 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              animate={{ top: ["15%", "85%", "15%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {latestItem ? (
              <model-viewer
                src={latestItem.fileUrl}
                alt={`3D Model of ${latestItem.title}`}
                auto-rotate
                camera-controls
                rotation-per-second="30deg"
                shadow-intensity="2"
                shadow-softness="1"
                environment-image="neutral"
                exposure="1"
                min-camera-orbit="auto auto 0m"
                style={{
                  width: "100%",
                  height: "100%",
                  outline: "none",
                  filter: "drop-shadow(0 0 20px rgba(16,185,129,0.1))",
                }}
              ></model-viewer>
            ) : (
              <div className="flex flex-col items-center justify-center text-emerald-500/40 font-mono text-sm space-y-4">
                <div className="w-16 h-16 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                <p className="tracking-widest uppercase animate-pulse">
                  Menganalisis Sinyal...
                </p>
              </div>
            )}

            {/* Floating Info Card (Glassmorphism Overlay) */}
            {latestItem && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-10 right-10 left-10 lg:left-auto lg:w-72 z-30 p-5 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl pointer-events-auto"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Target Terkunci
                  </p>
                </div>
                <h3 className="text-white text-lg font-bold mb-1 line-clamp-1">
                  {latestItem.title}
                </h3>
                <p className="text-white/50 text-xs mb-4 line-clamp-2 leading-relaxed font-light">
                  {latestItem.description ||
                    "Struktur geometri artefak berhasil di-render dalam mode 3D volumetrik."}
                </p>
                <Link
                  href={`/item/${latestItem.id}`}
                  className="w-full h-9 flex items-center justify-center bg-white text-black rounded-xl text-xs font-bold hover:bg-emerald-500 hover:text-white transition-all duration-300"
                >
                  Buka Riwayat Penuh
                </Link>
              </motion.div>
            )}

            {/* Interaction Hint */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] px-3 py-1.5 rounded-full font-bold tracking-[0.3em] uppercase">
                Manipulasi 3D Aktif
              </span>
            </div>
          </div>

          {/* Background Glow */}
          <div className="absolute -inset-4 bg-emerald-500/5 blur-[100px] -z-10 rounded-full animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
