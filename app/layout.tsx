import "./globals.css";
import { Montserrat, Geist } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-montserrat",
  display: "swap",
});

import type { Metadata } from "next";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Smartseum | Simulasi Museum 3D",
  description:
    "Aplikasi Simulasi Museum interaktif berbantuan QR Code dan 3D Viewer berbasis web.",
};

import Providers from "@/components/ui/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(montserrat.variable, "font-sans", geist.variable)}>
      <head>
        {/* Prevent flash of wrong theme on hard reload */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-white text-black font-sans m-0 p-0 antialiased overflow-x-hidden dark:bg-neutral-950 dark:text-white transition-colors">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
