"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";

interface ModelViewerProps {
  modelUrl?: string;
}

function InnerScanner({ modelUrl }: ModelViewerProps) {
  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  if (!modelUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/50 font-mono text-sm">
        No Model Available
      </div>
    );
  }

  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing relative">
      {React.createElement("model-viewer", {
        src: modelUrl,
        alt: "A 3D model",
        "auto-rotate": true,
        "camera-controls": true,
        style: { width: "100%", height: "100%", backgroundColor: "transparent", outline: "none" },
      })}
      
      {/* Interaction hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/20 tracking-widest uppercase pointer-events-none select-none">
        Geser · Putar · Zoom
      </div>
    </div>
  );
}

export const ModelViewer = dynamic(() => Promise.resolve(InnerScanner), { ssr: false });
