import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ShieldAlert } from "lucide-react";

export default async function AdminUsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // @ts-expect-error Custom properties
  const role = session?.user?.role;

  if (role !== "admin") {
    return (
      <div className="absolute inset-0 bg-neutral-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center font-sans z-50">
        <div className="relative max-w-sm w-full bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-white/10 p-8 rounded-3xl shadow-xl">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2">
            Akses Ditolak
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-8">
            Halaman ini hanya dapat diakses oleh Administrator Tingkat Atas. Anda adalah Uploader.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
