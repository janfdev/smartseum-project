/**
 * Admin Layout (Server Component)
 *
 * Responsibilities:
 *  - Server-side session guard (belt-and-suspenders on top of middleware)
 *  - Render the sidebar + topbar shell
 *
 * The actual sidebar/topbar are Client Components imported via the
 * AdminShell wrapper so we can keep useState there.
 */

import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { redirect } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { SessionProvider } from "next-auth/react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  // @ts-expect-error Custom properties
  const status = session.user.status;

  if (status === "pending") {
    return (
      <div className="min-h-screen cursor-default select-none bg-neutral-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center font-sans relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-sm w-full bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-white/10 p-8 rounded-3xl shadow-2xl">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">
            Akses Ditangguhkan
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-8">
            Akun Anda berhasil terdaftar dan masuk. Namun status akun Anda masih <strong className="text-neutral-900 dark:text-white">Menunggu Persetujuan (Pending)</strong>. Harap hubungi Administrator Kepala untuk mendapatkan izin akses ke dashboard.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center w-full h-11 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            Kembali ke Beranda Utama
          </a>
        </div>
      </div>
    );
  }

  if (status === "banned") {
    return (
      <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Akun Diblokir</h1>
        <p className="text-neutral-400 text-sm mb-6">Akses Anda ke sistem SmartSeum telah dicabut oleh Administrator.</p>
        <a href="/" className="px-6 py-2 bg-white text-black rounded-lg font-medium text-sm">Kembali ke Beranda</a>
      </div>
    );
  }

  // Pass down the user data to the client component shell
  return <AdminShell user={session.user}>{children}</AdminShell>;
}

