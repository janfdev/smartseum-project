"use client";

import Link from "next/link";
import { Box, Scan, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-4 shadow-xl shadow-blue-600/25">
            <Box className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">SmartSeum Admin</h1>
          <p className="text-white/40 text-sm mt-1">Masuk ke panel kontrol museum</p>
        </div>

        {/* Card */}
        <div className="bg-white/4 border border-white/8 rounded-3xl p-8 space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">Email</label>
            <input
              type="email"
              placeholder="admin@smartseum.id"
              defaultValue="admin@smartseum.id"
              className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all placeholder:text-white/20"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              defaultValue="password"
              className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all placeholder:text-white/20"
            />
          </div>

          {/* Login button — no actual auth yet, just navigates */}
          <Link
            href="/admin/dashboard"
            className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 group"
          >
            Masuk ke Dashboard
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-[10px] text-white/20 font-mono uppercase tracking-widest">atau</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <Link
            href="/scan"
            className="w-full h-11 bg-white/5 hover:bg-white/8 border border-white/8 text-white/60 hover:text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all group text-sm"
          >
            <Scan className="w-4 h-4" />
            Buka QR Scanner
          </Link>
        </div>

        <p className="text-center text-[11px] text-white/20 mt-6 font-mono">
          Smart Museum · Sistem AR Interaktif v1.0
        </p>
      </div>
    </div>
  );
}
