"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Box,
  QrCode,
  TrendingUp,
  Clock,
  CheckCircle2,
  MonitorPlay,
  Users,
  Layers,
  ArrowRight,
} from "lucide-react";

type Item = {
  id: string;
  title: string;
  createdAt: string;
  qrCodeUrl: string | null;
};

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role;

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [now] = useState(() => Date.now());

  useEffect(() => {
    fetch("/api/items")
      .then((r) => r.json())
      .then((d) => {
        if (d.items) setItems(d.items);
      })
      .finally(() => setLoading(false));
  }, []);

  const withQR = items.filter((i) => i.qrCodeUrl).length;
  const recent = items.filter(
    (i) => now - new Date(i.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000,
  ).length;

  const stats = [
    {
      label: "Total Artefak",
      value: loading ? "—" : items.length,
      icon: <Box className="w-5 h-5" />,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      sub: "Model 3D terdaftar",
    },
    {
      label: "QR Generated",
      value: loading ? "—" : withQR,
      icon: <QrCode className="w-5 h-5" />,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      sub: "Siap cetak & dipajang",
    },
    {
      label: "Baru Minggu Ini",
      value: loading ? "—" : recent,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      sub: "Ditambahkan 7 hari terakhir",
    },
    {
      label: "Tanpa QR",
      value: loading ? "—" : items.length - withQR,
      icon: <Clock className="w-5 h-5" />,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      sub: "Perlu diproses ulang",
    },
  ];

  const shortcuts = [
    {
      label: "Kelola Artefak & QR",
      desc: "Upload model 3D baru, download QR, kelola koleksi.",
      href: "/admin/items",
      icon: <QrCode className="w-5 h-5 text-blue-400" />,
      cta: "Buka Manajemen",
    },
    ...(userRole === "admin"
      ? [
          {
            label: "Pengguna",
            desc: "Kelola hak akses uploader dan admin.",
            href: "/admin/users",
            icon: <Users className="w-5 h-5 text-orange-400" />,
            cta: "Buka Manajemen",
            disabled: false,
          },
        ]
      : []),
  ];

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" }).format(
      new Date(iso),
    );

  return (
    <div className="p-6 md:p-8 space-y-8 min-h-full">
      {/* Welcome */}
      <div>
        <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-1">
          Panel Kontrol
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
          Selamat Datang, Admin 👋
        </h1>
        <p className="text-neutral-500 text-sm mt-1">
          Ringkasan kondisi terkini koleksi Smart Museum Anda.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white dark:bg-white/4 border border-neutral-200 dark:border-white/6 rounded-2xl p-5 flex flex-col gap-3 shadow-sm dark:shadow-none"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg} ${s.color}`}
            >
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white tabular-nums">
                {s.value}
              </p>
              <p className="text-xs font-semibold text-neutral-500 mt-0.5">
                {s.label}
              </p>
              <p className="text-[10px] text-neutral-400 mt-1">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Two column: shortcuts + recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shortcuts 2 col */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-1 gap-4">
          {shortcuts.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className={`group flex flex-col bg-white dark:bg-white/4 border border-neutral-200 dark:border-white/6 rounded-2xl p-5 transition-all shadow-sm dark:shadow-none ${
                s.disabled
                  ? "opacity-40 pointer-events-none"
                  : "hover:bg-neutral-50 dark:hover:bg-white/6 hover:border-neutral-300 dark:hover:border-white/10 hover:-translate-y-0.5"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-white/6 flex items-center justify-center mb-4">
                {s.icon}
              </div>
              <p className="font-semibold text-neutral-900 dark:text-white text-sm mb-1">
                {s.label}
              </p>
              <p className="text-neutral-500 text-xs leading-relaxed mb-4 flex-1">
                {s.desc}
              </p>
              <div className="flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2 gap-1.5 transition-all">
                {s.cta}
                {!s.disabled && (
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Recent 1 col */}
        <div className="bg-white dark:bg-white/4 border border-neutral-200 dark:border-white/6 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
          <div className="px-5 py-4 border-b border-neutral-100 dark:border-white/5 flex items-center justify-between">
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
              Terbaru
            </p>
            <Link
              href="/admin/items"
              className="text-[11px] text-blue-600 dark:text-blue-400 hover:text-blue-500 font-medium"
            >
              Lihat semua →
            </Link>
          </div>
          <div className="divide-y divide-neutral-100 dark:divide-white/5">
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="w-5 h-5 border-2 border-neutral-200 dark:border-white/10 border-t-blue-500 rounded-full animate-spin" />
              </div>
            ) : items.length === 0 ? (
              <p className="text-neutral-400 text-sm text-center py-10">
                Belum ada artefak
              </p>
            ) : (
              items.slice(0, 6).map((item) => (
                <Link
                  key={item.id}
                  href={`/item/${item.id}`}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-neutral-50 dark:hover:bg-white/3 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/6 flex items-center justify-center shrink-0 overflow-hidden">
                    {item.qrCodeUrl ? (
                      <img
                        src={item.qrCodeUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Box className="w-4 h-4 text-neutral-400 dark:text-white/30" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-800 dark:text-white/80 truncate group-hover:text-black dark:group-hover:text-white transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-0.5 flex items-center gap-1">
                      {item.qrCodeUrl ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />{" "}
                          QR Ready
                        </>
                      ) : (
                        <span className="text-amber-500">Tanpa QR</span>
                      )}
                      <span className="text-neutral-300 dark:text-white/15 mx-1">
                        ·
                      </span>
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
