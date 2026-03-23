import React from "react";
import { db } from "@/lib/db";
import { items } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { ModelViewer } from "@/components/artifact/ModelViewer";

export default async function ItemDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const itemData = await db.select().from(items).where(eq(items.id, id));

  if (itemData.length === 0) notFound();

  const item = itemData[0];
  const year = new Date(item.createdAt).getFullYear();
  const shortId = item.id.split("-").pop()?.toUpperCase() ?? item.id;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans">

      {/* ─── FLOATING NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5">
        <Link
          href="/scan"
          className="group flex items-center gap-2.5 text-white/60 hover:text-white transition-colors text-sm font-medium"
        >
          <span className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/10 transition-all">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          </span>
          Kembali
        </Link>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-white/40 font-mono uppercase tracking-[0.15em]">
            #{shortId}
          </span>
        </div>
      </nav>

      {/* ─── HERO 3D VIEWER – Full Width ─── */}
      <section className="relative w-full" style={{ height: "70vh", minHeight: 480 }}>
        {/* Gradient floor */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/0 via-transparent to-[#0a0a0a] z-10 pointer-events-none" />
        {/* Side vignettes */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <div className="absolute inset-0">
          <ModelViewer modelUrl={item.fileUrl} />
        </div>
      </section>

      {/* ─── CONTENT BODY ─── */}
      <article className="relative z-20 -mt-4 max-w-5xl mx-auto px-6 md:px-10 pb-24">

        {/* Title area */}
        <header className="mb-12">
          <p className="text-xs tracking-[0.25em] uppercase text-white/35 font-mono mb-4">
            Koleksi Museum · {year}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0] text-white mb-6">
            {item.title}
          </h1>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Terverifikasi
            </span>
            {item.qrCodeUrl && (
              <a
                href={item.qrCodeUrl}
                download
                className="inline-flex items-center gap-1.5 text-xs font-semibold border border-white/10 text-white/40 hover:text-white hover:border-white/30 px-3 py-1.5 rounded-full transition-all"
              >
                <Download className="w-3 h-3" />
                QR Code
              </a>
            )}
          </div>
        </header>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-white/20 font-mono text-[10px] tracking-widest uppercase">Analisis</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        {/* Description + Meta Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Description */}
          <div className="md:col-span-2">
            <p className="text-white/70 text-xl md:text-2xl leading-relaxed font-light">
              {item.description
                ? item.description
                : "Identifikasi mendalam terhadap objek ini sedang dalam proses penelitian lanjutan oleh tim kurator museum."}
            </p>
          </div>

          {/* Meta sidebar */}
          <div className="flex flex-col gap-6 md:border-l md:border-white/8 md:pl-10">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-2">
                Tahun Dicatat
              </p>
              <p className="text-white text-2xl font-semibold tabular-nums">{year}</p>
            </div>
            <div className="h-px bg-white/8 hidden md:block" />
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-2">
                Kategori
              </p>
              <p className="text-white/70 text-base font-medium">Koleksi 3D</p>
            </div>
            <div className="h-px bg-white/8 hidden md:block" />
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 mb-2">
                ID Rekaman
              </p>
              <p className="text-white/40 text-xs font-mono break-all">{item.id}</p>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM ACTION ─── */}
        <div className="mt-20 pt-10 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-white/25 text-xs font-mono uppercase tracking-widest mb-1">Smart Museum</p>
            <p className="text-white/50 text-sm">Sistem Interaktif Galeri AR</p>
          </div>

          <Link
            href="/scan"
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/15 hover:border-white/40 text-white/60 hover:text-white transition-all text-sm font-medium hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Kembali ke Scanner
          </Link>
        </div>
      </article>
    </main>
  );
}
