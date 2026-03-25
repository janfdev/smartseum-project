"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  QrCode,
  MonitorPlay,
  Users,
  Layers,
  LogOut,
  Menu,
  X,
  Box,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    soon: false,
  },
  { label: "Artefak & QR", href: "/admin/items", icon: QrCode, soon: false },
  { label: "Pengguna", href: "/admin/users", icon: Users, soon: false },
];

/* ─── Collapsed-sidebar state shared via prop ─── */

interface SidebarProps {
  open: boolean;
}

export function AdminSidebar({ open }: SidebarProps) {
  const pathname = usePathname();

  return (
    /* IMPORTANT: NO overflow-hidden here so tooltips can escape */
    <aside
      style={{ width: open ? 232 : 64 }}
      className="hidden md:flex flex-col h-screen sticky top-0 bg-white dark:bg-[#0d0d0d] border-r border-neutral-200 dark:border-white/6 transition-[width] duration-200 ease-in-out flex-shrink-0 z-10"
    >
      {/* Brand */}
      <div className="flex items-center h-14 px-3 border-b border-neutral-200 dark:border-white/6 flex-shrink-0 overflow-hidden">
        <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
          <Box className="w-4 h-4 text-white" />
        </div>
        <span
          className="ml-2.5 font-bold text-neutral-900 dark:text-white text-sm tracking-tight whitespace-nowrap transition-all duration-200 overflow-hidden"
          style={{ maxWidth: open ? 160 : 0, opacity: open ? 1 : 0 }}
        >
          SmartSeum Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            /* Tooltip wrapper — position:relative so tooltip is relative to item */
            <div key={item.href} className="relative group/nav">
              <Link
                href={item.soon ? "#" : item.href}
                onClick={item.soon ? (e) => e.preventDefault() : undefined}
                className={[
                  "flex items-center h-9 rounded-xl text-sm font-medium transition-all duration-150 overflow-hidden",
                  open ? "px-3 gap-3" : "justify-center px-0",
                  active
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400"
                    : item.soon
                      ? "text-neutral-400 dark:text-white/25 hover:bg-neutral-50 dark:hover:bg-white/4 cursor-not-allowed"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-white/50 dark:hover:text-white/80 dark:hover:bg-white/6",
                ].join(" ")}
              >
                <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                {open && <span className="flex-1 truncate">{item.label}</span>}
                {open && item.soon && (
                  <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600 bg-amber-100 border border-amber-200 dark:text-amber-400 dark:bg-amber-400/10 dark:border-amber-400/20 px-1.5 py-0.5 rounded leading-none">
                    Soon
                  </span>
                )}
              </Link>

              {/* Tooltip: only visible when sidebar is collapsed */}
              {!open && (
                <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 z-[999] pointer-events-none select-none opacity-0 group-hover/nav:opacity-100 transition-opacity duration-150">
                  {/* Arrow */}
                  <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45 bg-white border-l border-b border-neutral-200 dark:bg-[#1e1e1e] dark:border-white/10" />
                  {/* Bubble */}
                  <div className="flex items-center gap-2 bg-white border border-neutral-200 dark:bg-[#1e1e1e] dark:border-white/10 shadow-xl rounded-xl px-3 py-2 whitespace-nowrap">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white/85">
                      {item.label}
                    </span>
                    {item.soon && (
                      <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600 bg-amber-100 border border-amber-200 dark:text-amber-400 dark:bg-amber-400/10 dark:border-amber-400/20 px-1.5 py-0.5 rounded leading-none">
                        Soon
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 pb-3 pt-3 border-t border-neutral-200 dark:border-white/6 flex-shrink-0">
        <div className="relative group/nav">
          <Link
            href="/"
            className={[
              "flex items-center h-9 rounded-xl text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-white/30 dark:hover:text-white/60 dark:hover:bg-white/6 transition-all duration-150 overflow-hidden",
              open ? "px-3 gap-3" : "justify-center px-0",
            ].join(" ")}
          >
            <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
            {open && <span className="truncate">Kembali ke Site</span>}
          </Link>
          {!open && (
            <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 z-[999] pointer-events-none select-none opacity-0 group-hover/nav:opacity-100 transition-opacity duration-150">
              <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45 bg-white border-l border-b border-neutral-200 dark:bg-[#1e1e1e] dark:border-white/10" />
              <div className="bg-white border border-neutral-200 dark:bg-[#1e1e1e] dark:border-white/10 shadow-xl rounded-xl px-3 py-2 whitespace-nowrap">
                <span className="text-sm font-medium text-neutral-900 dark:text-white/85">
                  Kembali ke Site
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

/* ─── Top Bar ─── */

import { signOut } from "next-auth/react";

interface TopbarProps {
  user?: any;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function AdminTopbar({
  user,
  sidebarOpen,
  onToggleSidebar,
}: TopbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const currentPage = NAV_ITEMS.find(
    (n) => pathname === n.href || pathname.startsWith(n.href + "/"),
  );

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "A";

  return (
    <>
      <header className="sticky top-0 z-20 h-14 flex items-center px-4 gap-3 bg-white/80 dark:bg-[#0d0d0d]/80 backdrop-blur-xl border-b border-neutral-200 dark:border-white/6 flex-shrink-0">
        {/* Sidebar toggle — visible on desktop */}
        <button
          onClick={onToggleSidebar}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-white/40 dark:hover:text-white/80 dark:hover:bg-white/8 transition-all"
          title={sidebarOpen ? "Tutup sidebar" : "Buka sidebar"}
        >
          {sidebarOpen ? (
            <PanelLeftClose className="w-4 h-4" />
          ) : (
            <PanelLeftOpen className="w-4 h-4" />
          )}
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden text-neutral-600 hover:text-neutral-900 dark:text-white/40 dark:hover:text-white transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page label */}
        <p className="flex-1 text-sm font-semibold text-neutral-800 dark:text-white/70 tracking-tight truncate">
          {currentPage?.label ?? "Admin Panel"}
        </p>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium text-emerald-400">
              Live
            </span>
          </div>

          {/* Theme toggler */}
          <AnimatedThemeToggler className="w-8 h-8 flex items-center justify-center rounded-lg !p-0 hover:!bg-white/8 dark:hover:!bg-white/8 transition-all [&_svg]:w-4 [&_svg]:h-4" />

          {/* Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen((p) => !p)}
              className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center select-none overflow-hidden border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-500/30 transition-all"
            >
              {user?.image ? (
                <img
                  src={user.image}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                userInitials
              )}
            </button>

            {/* Dropdown Menu */}
            {profileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-150">
                  <div className="p-3 border-b border-neutral-100 dark:border-white/5">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                      {user?.name || "Admin"}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-white/40 truncate mt-0.5">
                      {user?.email || "admin@smartseum.id"}
                    </p>
                    <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-100 border border-emerald-200 dark:text-emerald-400 dark:bg-emerald-400/10 dark:border-emerald-400/20">
                      {user?.role || "ADMIN"}
                    </div>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={() => signOut({ callbackUrl: "/admin/login" })}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 rounded-xl hover:bg-neutral-100 dark:text-red-400 dark:hover:bg-white/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Keluar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="relative w-60 h-full bg-white dark:bg-[#111] flex flex-col border-r border-neutral-200 dark:border-white/6">
            <div className="flex items-center gap-2.5 px-4 h-14 border-b border-neutral-200 dark:border-white/6">
              <div className="w-7 h-7 rounded-xl bg-blue-600 flex items-center justify-center">
                <Box className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-neutral-900 dark:text-white text-sm tracking-tight flex-1">
                SmartSeum
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-neutral-500 hover:text-neutral-900 dark:text-white/30 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 px-2 py-3 space-y-0.5">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.soon ? "#" : item.href}
                    onClick={
                      item.soon
                        ? (e) => e.preventDefault()
                        : () => setMobileOpen(false)
                    }
                    className={[
                      "flex items-center gap-3 h-9 px-3 rounded-xl text-sm font-medium transition-colors",
                      active
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400"
                        : item.soon
                          ? "text-neutral-400 dark:text-white/25 cursor-not-allowed"
                          : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-white/50 dark:hover:text-white/80 dark:hover:bg-white/6",
                    ].join(" ")}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="flex-1">{item.label}</span>
                    {item.soon && (
                      <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600 bg-amber-100 border border-amber-200 dark:text-amber-400 dark:bg-amber-400/10 dark:border-amber-400/20 px-1.5 py-0.5 rounded leading-none">
                        Soon
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
            <div className="px-2 pb-3 pt-3 border-t border-neutral-200 dark:border-white/6">
              <Link
                href="/"
                className="flex items-center gap-3 h-9 px-3 rounded-xl text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-white/30 dark:hover:text-white/60 dark:hover:bg-white/6 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Kembali ke Site
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
