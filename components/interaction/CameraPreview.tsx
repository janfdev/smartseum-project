"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { CameraOff, SwitchCamera } from "lucide-react";

export const CameraPreview = ({ isPaused }: { isPaused?: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async (mode: "environment" | "user") => {
    stopCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || "Unable to access camera");
    }
  }, [stopCamera]);

  useEffect(() => {
    startCamera(facingMode);
    return () => stopCamera();
  }, [facingMode, startCamera, stopCamera]);

  // Handle Play / Pause for the freeze-frame effect
  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isPaused]);

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  return (
    <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center">
      {error ? (
        <div className="flex flex-col items-center justify-center text-white/50 text-center px-4">
          <CameraOff className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-sm font-medium tracking-wide">
            Camera Access Denied or Unavailable
          </p>
          <p className="text-xs mt-2 opacity-70 border border-white/20 rounded px-3 py-1 bg-white/5">
            {error}
          </p>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover transition-transform duration-300 ${
              facingMode === "user" ? "-scale-x-100" : ""
            }`}
          />
          
          <div className="absolute top-6 right-6 z-50">
            <button
              onClick={toggleCamera}
              disabled={isPaused}
              className={`p-3 bg-black/40 hover:bg-black/60 border border-white/20 rounded-full backdrop-blur-md transition-all active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)] group ${
                isPaused ? "opacity-30 cursor-not-allowed" : ""
              }`}
            >
              <SwitchCamera className="w-6 h-6 text-white group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </>
      )}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  );
};
