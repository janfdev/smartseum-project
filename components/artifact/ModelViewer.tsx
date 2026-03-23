"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  PresentationControls,
  Stage,
} from "@react-three/drei";

interface ModelViewerProps {
  modelUrl?: string;
}

function FallbackGeometry() {
  return (
    <mesh castShadow>
      <torusKnotGeometry args={[1, 0.28, 256, 64]} />
      <meshPhysicalMaterial
        color="#c8b8ff"
        roughness={0}
        metalness={0.6}
        transmission={0.1}
        thickness={0.5}
        envMapIntensity={2}
      />
    </mesh>
  );
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl }) => {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <spotLight
            position={[5, 10, 5]}
            angle={0.2}
            penumbra={1}
            intensity={1.5}
            castShadow
          />
          <Environment preset="city" />

          <PresentationControls
            speed={1.2}
            global
            zoom={0.85}
            polar={[-Math.PI / 3, Math.PI / 3]}
          >
            <Stage environment="city" intensity={0.4} castShadow={false} adjustCamera={false}>
              {modelUrl ? <Model url={modelUrl} /> : <FallbackGeometry />}
            </Stage>
          </PresentationControls>

          <OrbitControls
            enableZoom
            enablePan={false}
            minPolarAngle={Math.PI / 5}
            maxPolarAngle={(Math.PI * 4) / 5}
            makeDefault
          />
        </Suspense>
      </Canvas>

      {/* Interaction hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/20 tracking-widest uppercase pointer-events-none select-none">
        Geser · Putar · Zoom
      </div>
    </div>
  );
};
