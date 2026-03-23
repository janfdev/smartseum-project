"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Scanner } from "@yudiel/react-qr-scanner";
import { ModelViewerAR } from "@/components/interaction/ModelViewerAR";
import { ArrowRight, ScanLine, X, FlipHorizontal2 } from "lucide-react";

type ScannedItemType = {
  id: string;
  fileUrl: string;
  title: string;
  description?: string;
  qrCodeUrl?: string;
};

export default function ScanPage() {
  const [scannedId, setScannedId] = useState<string | null>(null);
  const [scannedItem, setScannedItem] = useState<ScannedItemType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");

  // For simulation
  const [simulationItems, setSimulationItems] = useState<ScannedItemType[]>([]);

  useEffect(() => {
    // Fetch 3 items for simulation
    const fetchSimulations = async () => {
      try {
        const res = await fetch("/api/items");
        const data = await res.json();
        if (data.items) {
          setSimulationItems(data.items.slice(0, 3));
        }
      } catch (e) {
        console.error("Failed to fetch simulation items", e);
      }
    };
    fetchSimulations();
  }, []);

  const captureCamera = () => {
    try {
      const video = document.querySelector("video");
      if (video) {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || video.clientWidth;
        canvas.height = video.videoHeight || video.clientHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
          setCapturedImage(dataUrl);
        }
      }
    } catch (err) {
      console.warn("Could not capture camera frame:", err);
    }
  };

  const handleScan = async (result: { rawValue: string }[] | string) => {
    if (scannedId || loading || scannedItem) return; 
    
    const newId = Array.isArray(result) ? result[0]?.rawValue : result;
    
    if (newId && typeof newId === 'string' && newId.length > 10) {
      captureCamera();
      setScannedId(newId);
      setLoading(true);
      try {
        const res = await fetch(`/api/items/${newId}`);
        const data = await res.json();
        
        if (data.item?.fileUrl) {
          setScannedItem(data.item);
        } else {
          setError("Artefak tidak ditemukan untuk QR ini.");
          setTimeout(() => { setError(null); setScannedId(null); setCapturedImage(null); }, 3000);
        }
      } catch {
        setError("Gagal memuat artefak. Pastikan koneksi stabil.");
        setTimeout(() => { setError(null); setScannedId(null); setCapturedImage(null); }, 3000);
      } finally {
        setLoading(false);
      }
    }
  };

  const simulateScan = (item: ScannedItemType) => {
    if (loading || scannedItem) return;
    captureCamera();
    setLoading(true);
    // Simulate the scanning process delay
    setTimeout(() => {
      setScannedItem(item);
      setScannedId(item.id);
      setLoading(false);
    }, 2000);
  };

  const closeAR = () => {
    setScannedItem(null);
    setScannedId(null);
    setCapturedImage(null);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col font-sans">
      
      {/* Background Camera Scanner */}
      <div className="absolute inset-0 z-0 bg-neutral-900">
        {capturedImage ? (
           <img src={capturedImage} alt="Captured Background" className="w-full h-full object-cover opacity-60 filter blur-sm transition-all duration-1000" />
        ) : (
           <Scanner
             onScan={handleScan}
             components={{ finder: false }}
             constraints={{ facingMode }}
             styles={{ video: { objectFit: "cover" } }}
           />
        )}
      </div>

      {loading && (
        <div className="absolute inset-0 z-[60] bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center w-24 h-24 mb-6">
            {/* Scanning Radar Animation */}
            <div className="absolute inset-0 border-2 border-emerald-500 rounded-full animate-ping opacity-75"></div>
            <div className="absolute inset-2 border-2 border-emerald-400 rounded-full animate-spin border-t-transparent"></div>
            <ScanLine className="w-10 h-10 text-emerald-400 z-10 animate-pulse" />
          </div>
          <p className="text-white text-xl font-medium tracking-wide">Menganalisis Kode...</p>
          <p className="text-emerald-400/80 text-sm mt-2">Menyiapkan Pengalaman 3D</p>
        </div>
      )}

      {error && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[60] bg-red-600/90 text-white px-6 py-3 rounded-full text-sm font-medium shadow-2xl backdrop-blur-md text-center max-w-[80vw] animate-in slide-in-from-top-4">
          {error}
        </div>
      )}

      {/* When AR Item is Loaded */}
      {scannedItem && !loading && (
        <>
          <div className="absolute inset-0 z-30 transition-opacity duration-1000 bg-black/40">
            <ModelViewerAR src={scannedItem.fileUrl} />
          </div>
          
          <button 
            onClick={closeAR}
            className="absolute top-10 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-xl"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Custom Overlay Card for detail (Tiktok effect overlay) */}
          <div className="absolute w-full bottom-0 left-0 z-50 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none">
            <div className="w-full max-w-lg mx-auto bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-8 duration-500 pointer-events-auto hover:bg-black/50 transition-colors">
               <div className="flex items-center gap-2 mb-2">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Objek Teridentifikasi</p>
               </div>
               <h2 className="text-white text-2xl font-bold tracking-tight mb-2 leading-tight">
                 {scannedItem.title}
               </h2>
               <p className="text-neutral-300 text-sm mb-6 line-clamp-2 leading-relaxed">
                 {scannedItem.description || "Tinjau material struktur dalam 3D Viewer interaktif untuk mencari tahu rincian lebih lanjut soal artefak."}
               </p>
               
               <Link 
                  href={`/item/${scannedItem.id}`}
                  className="w-full flex items-center justify-center py-3 px-6 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-all group shadow-xl"
               >
                 Jelajahi Sejarah Objek Detail
                 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
          </div>
        </>
      )}

      {/* UI Overlay BEFORE Scan (TikTok Filter Simulation UI) */}
      {!scannedItem && !loading && (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between pt-24 pb-12">

           {/* Top row: hint center + camera flip button right */}
           <div className="w-full flex items-center justify-center relative px-6">
             <div className="bg-black/40 px-6 py-3 rounded-full backdrop-blur-md border border-white/10 shadow-lg pointer-events-auto">
               <p className="text-white/90 font-medium text-sm tracking-wide flex items-center">
                 <ScanLine className="w-4 h-4 mr-2 opacity-70" />
                 Arahkan kamera ke QR Code Koleksi
               </p>
             </div>

             {/* Camera flip button */}
             <button
               onClick={() => setFacingMode((prev) => (prev === "environment" ? "user" : "environment"))}
               className="absolute right-6 pointer-events-auto w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95"
               title={facingMode === "environment" ? "Ganti ke kamera depan" : "Ganti ke kamera belakang"}
             >
               <FlipHorizontal2 className="w-5 h-5" />
             </button>
           </div>

           {/* Filter/Simulation Selection (Center Bottom) */}
           <div className="w-full pointer-events-auto flex flex-col items-center">
              <p className="text-white/60 text-xs uppercase tracking-widest mb-4 font-semibold">Simulasi Filter Scan</p>
              
              <div className="flex items-end justify-center gap-3 md:gap-4 px-4 overflow-x-auto snap-x max-w-full pb-4 scrollbar-hide">
                 {simulationItems.map((item) => (
                    <button 
                      key={item.id} 
                      onClick={() => simulateScan(item)}
                      className="group relative flex-shrink-0 flex flex-col items-center justify-center bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/20 hover:border-blue-500/50 rounded-2xl w-24 md:w-28 h-32 md:h-36 transition-all snap-center shadow-lg active:scale-95"
                    >
                       <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                       
                       <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl mb-3 flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                          {item.qrCodeUrl ? (
                            <img src={item.qrCodeUrl} alt="QR" className="w-full h-full object-cover rounded-md opacity-80" />
                          ) : (
                            <ScanLine className="text-blue-400 w-6 h-6" />
                          )}
                       </div>
                       
                       <p className="text-white text-xs font-semibold text-center px-2 line-clamp-2 leading-tight">
                         {item.title}
                       </p>
                    </button>
                 ))}
                 
                 {simulationItems.length === 0 && (
                   <div className="text-white/50 text-sm border border-white/10 rounded-xl px-4 py-8 bg-black/20 backdrop-blur">
                     Belum ada QR artefak di database...
                   </div>
                 )}
              </div>
           </div>

        </div>
      )}
    </div>
  );
}
