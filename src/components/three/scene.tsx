"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { scrollState } from "@/lib/scroll-store";
import { HeroObject } from "./hero-object";
import { CameraRig } from "./camera-rig";
import { StudioLights } from "./studio-lights";

type SceneProps = {
  lite: boolean;
  active: boolean;
  onReady: () => void;
};

function FirstFrame({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    onReady();
  });
  return null;
}

export default function Scene({ lite, active, onReady }: SceneProps) {
  const maxDpr = lite ? 1.25 : 2;
  const [dpr, setDpr] = useState(() => Math.min(window.devicePixelRatio || 1, maxDpr));

  useEffect(() => {
    if (lite) return;
    const onMove = (e: PointerEvent) => {
      scrollState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      scrollState.pointerX = 0;
      scrollState.pointerY = 0;
    };
  }, [lite]);

  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.15, 7], fov: 35, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: lite ? "low-power" : "high-performance" }}
      onCreated={({ gl }) => {
        gl.debug.checkShaderErrors = process.env.NODE_ENV !== "production";
      }}
      style={{ pointerEvents: "none" }}
    >
      <PerformanceMonitor
        flipflops={3}
        onIncline={() => setDpr(maxDpr)}
        onDecline={() => setDpr(1)}
        onFallback={() => setDpr(1)}
      />
      <fog attach="fog" args={["#0a0908", 8, 16]} />
      <ambientLight intensity={0.2} />
      {!lite && <directionalLight position={[3, 4, 5]} intensity={0.7} color="#f2ede4" />}
      <StudioLights lite={lite} />
      <HeroObject lite={lite} />
      <CameraRig lite={lite} />
      <FirstFrame onReady={onReady} />
    </Canvas>
  );
}
