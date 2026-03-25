"use client";

/**
 * Admin Login Page
 *
 * UI mirrors the landing page aesthetic:
 *  - Same grid overlay + emerald/violet ambient glows
 *  - Glassmorphic card with backdrop-blur
 *  - Google OAuth via next-auth signIn()
 *  - Shows contextual error messages from middleware redirects
 */

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Scan, Loader2, AlertTriangle, ShieldCheck } from "lucide-react";

/* ── Google icon inline SVG so we avoid external deps ── */
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

/* ── Error banner shown when redirected with ?error= ── */
const ERROR_MESSAGES: Record<string, string> = {
  unauthorized: "Akun Anda tidak memiliki akses admin. Hubungi administrator.",
  OAuthCallback: "Terjadi kesalahan saat login. Coba lagi.",
  default: "Terjadi kesalahan. Silakan coba lagi.",
};

function LoginContent() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin/dashboard";

  const [loading, setLoading] = useState(false);

  const errorMsg = errorParam
    ? (ERROR_MESSAGES[errorParam] ?? ERROR_MESSAGES.default)
    : null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signIn("google", { callbackUrl });
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Logo + branding */}
      <div className="flex flex-col items-center mb-10 text-center">
        {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md rounded-full mb-4">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-black/50 dark:text-white/50">
            Admin Portal
          </span>
        </div> */}

        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-black dark:text-white leading-tight">
          SMARTSEUM{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-violet-500 italic pr-2">
            ADMIN
          </span>
        </h1>
        <p className="text-black/40 dark:text-white/40 text-sm mt-2 font-light">
          Panel kontrol eksklusif untuk administrator museum
        </p>
      </div>

      {/* Error banner */}
      {errorMsg && (
        <div className="flex items-start gap-3 px-4 py-3.5 mb-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm animate-in slide-in-from-top-2 duration-200">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <p>{errorMsg}</p>
        </div>
      )}

      {/* Glassmorphic card */}
      <div className="relative bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-black/5 dark:shadow-black/30">
        {/* Inner top accent line */}
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

        <div className="space-y-5">
          {/* Description */}
          <div className="text-center pb-2">
            <p className="text-xs text-black/40 dark:text-white/40 leading-relaxed">
              Gunakan akun Google yang telah terdaftar sebagai admin untuk
              masuk. Akun biasa tidak dapat mengakses halaman ini.
            </p>
          </div>

          {/* Divider */}
          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-black/8 dark:bg-white/8" />
            <span className="text-[10px] text-black/25 dark:text-white/25 font-mono uppercase tracking-widest">
              masuk dengan
            </span>
            <div className="flex-1 h-px bg-black/8 dark:bg-white/8" />
          </div>

          {/* Google OAuth button */}
          <button
            id="btn-google-login"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="
              group relative w-full h-12 flex items-center justify-center gap-3
              bg-white dark:bg-white/8
              border border-black/10 dark:border-white/10
              hover:border-emerald-500/40 dark:hover:border-emerald-500/30
              hover:bg-emerald-50/50 dark:hover:bg-emerald-500/5
              rounded-2xl font-semibold text-sm
              text-black/80 dark:text-white/80
              transition-all duration-200
              shadow-sm hover:shadow-md hover:shadow-emerald-500/10
              disabled:opacity-50 disabled:cursor-not-allowed
              active:scale-[0.99]
            "
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
            ) : (
              <GoogleIcon />
            )}
            {loading ? "Menghubungkan…" : "Lanjutkan dengan Google"}
          </button>

          {/* Scan QR shortcut */}
          <Link
            href="/scan"
            className="
              w-full h-11 flex items-center justify-center gap-2
              bg-transparent border border-black/8 dark:border-white/8
              hover:bg-black/4 dark:hover:bg-white/4
              rounded-2xl text-sm font-medium
              text-black/40 dark:text-white/40
              hover:text-black/60 dark:hover:text-white/60
              transition-all duration-200
            "
          >
            <Scan className="w-4 h-4" />
            Buka QR Scanner
          </Link>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-center text-[11px] text-black/25 dark:text-white/20 mt-6 font-mono tracking-wider">
        Smart Museum · AR Interaktif v1.0
      </p>
    </div>
  );
}

/* ─── Page export ─────────────────────────────────────────────────────────── */
export default function AdminLoginPage() {
  return (
    /* Same ambient background as landing page */
    <div className="relative min-h-screen w-full bg-white dark:bg-black flex items-center justify-center px-4 py-12 transition-colors overflow-hidden font-sans">
      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none z-0" />

      {/* Ambient glows — same as landing */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/6 blur-[130px] rounded-full animate-pulse pointer-events-none z-0" />
      <div className="fixed bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-violet-600/10 dark:bg-violet-600/6 blur-[130px] rounded-full animate-pulse delay-700 pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-400/5 blur-[160px] rounded-full pointer-events-none z-0 opacity-60" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <Suspense fallback={null}>
          <LoginContent />
        </Suspense>
      </div>
    </div>
  );
}
