"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Loader2, AlertTriangle, UserCircle2 } from "lucide-react";

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

const ERROR_MESSAGES: Record<string, string> = {
  OAuthCallback: "Terjadi kesalahan saat login dengan Google. Silakan coba lagi.",
  Configuration: "Terdapat kesalahan konfigurasi di server. Hubungi Admin.",
  AccessDenied: "Akses Anda ditolak.",
  CredentialsSignin: "Email atau kata sandi tidak sesuai.",
  default: "Terjadi kesalahan yang tidak diketahui. Silakan coba lagi.",
};

function LoginContent() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const [loginError, setLoginError] = useState<string | null>(null);

  // Jika error datang dari backend (signIn credentials) berupa pesan langsung
  // atau kalau query string mengandung pesan custom, tampilkan mentah-mentah.
  // Bila kodenya standar NextAuth (ex: OAuthCallback), terjemahkan ke Bahasa Indonesia.
  let errorMsg = loginError;
  if (!errorMsg && errorParam) {
    errorMsg = ERROR_MESSAGES[errorParam] ?? errorParam;
  }

  const handleGoogleLogin = async () => {
    setLoading(true);
    setLoginError(null);
    try {
      await signIn("google", { callbackUrl });
    } catch {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailLoading(true);
    setLoginError(null);
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    try {
      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.error) {
        setLoginError(res.error);
      } else if (res?.ok) {
        window.location.href = callbackUrl;
      }
    } catch {
      setLoginError("Terjadi kesalahan koneksi.");
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-black dark:text-white leading-tight">
          SMARTSEUM{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-violet-500 italic pr-2">
            LOGIN
          </span>
        </h1>
        <p className="text-black/40 dark:text-white/40 text-sm mt-2 font-light max-w-[280px]">
          Simpan riwayat koleksi dan jelajahi museum dengan cara yang baru
        </p>
      </div>

      {errorMsg && (
        <div className="flex items-start gap-3 px-4 py-3.5 mb-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm animate-in slide-in-from-top-2 duration-200">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <p>{errorMsg}</p>
        </div>
      )}
      
      {searchParams.get("verified") && (
        <div className="flex items-start gap-3 px-4 py-3.5 mb-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm animate-in slide-in-from-top-2 duration-200">
          <p>Email berhasil diverifikasi! Silakan login.</p>
        </div>
      )}

      <div className="relative bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-black/5 dark:shadow-black/30">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

        <div className="space-y-6">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-widest uppercase text-black/40 dark:text-white/40 ml-1">
                  Alamat Email
                </label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="nama@email.com" 
                  className="w-full h-12 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold tracking-widest uppercase text-black/40 dark:text-white/40 ml-1">
                  Kata Sandi
                </label>
                <input 
                  name="password" 
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  className="w-full h-12 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={emailLoading}
              className="w-full h-12 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-semibold text-sm transition-all hover:bg-black/80 dark:hover:bg-white/80 disabled:opacity-50"
            >
              {emailLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto text-white dark:text-black" /> : "Masuk"}
            </button>
          </form>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-black/8 dark:bg-white/8" />
            <span className="text-[10px] text-black/25 dark:text-white/25 font-mono uppercase tracking-widest">
              atau
            </span>
            <div className="flex-1 h-px bg-black/8 dark:bg-white/8" />
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="group relative w-full h-12 flex items-center justify-center gap-3 bg-white dark:bg-white/8 border border-black/10 dark:border-white/10 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 hover:bg-emerald-50/50 dark:hover:bg-emerald-500/5 rounded-2xl font-semibold text-sm text-black/80 dark:text-white/80 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-emerald-500/10 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin text-emerald-500" /> : <GoogleIcon />}
            {loading ? "Menghubungkan…" : "Masuk dengan Google"}
          </button>

          <div className="flex flex-col gap-2 mt-4">
            <Link
              href="/register"
              className="w-full h-11 flex items-center justify-center gap-2 rounded-2xl text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all duration-200"
            >
              Belum punya akun? Daftar
            </Link>
            
            <Link
              href="/"
              className="w-full h-11 flex items-center justify-center gap-2 bg-transparent border border-black/8 dark:border-white/8 hover:bg-black/4 dark:hover:bg-white/4 rounded-2xl text-sm font-medium text-black/40 dark:text-white/40 hover:text-black/60 dark:hover:text-white/60 transition-all duration-200"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] text-black/25 dark:text-white/20 mt-6 font-mono tracking-wider">
        Smart Museum · AR Interaktif v1.0
      </p>
    </div>
  );
}

export default function PublicLoginPage() {
  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black flex items-center justify-center px-4 py-12 transition-colors overflow-hidden font-sans">
      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none z-0" />

      {/* Ambient glows */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/6 blur-[130px] rounded-full animate-pulse pointer-events-none z-0" />
      <div className="fixed bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-violet-600/10 dark:bg-violet-600/6 blur-[130px] rounded-full animate-pulse delay-700 pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-400/5 blur-[160px] rounded-full pointer-events-none z-0 opacity-60" />

      <div className="relative z-10 w-full">
        <Suspense fallback={null}>
          <LoginContent />
        </Suspense>
      </div>
    </div>
  );
}
