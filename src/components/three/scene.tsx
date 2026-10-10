"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, PerformanceMonitor } from "@react-three/drei";
import { scrollState } from "@/lib/scroll-store";
import { Sculpture } from "./sculpture";
import { CameraRig } from "./camera-rig";

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

function StudioLights({ lite }: { lite: boolean }) {
  return (
    <Environment resolution={lite ? 64 : 256} frames={1}>
      <color attach="background" args={["#0a0908"]} />
      <Lightformer form="rect" intensity={3} color="#f2ede4" position={[0, 5, -6]} scale={[12, 1.6, 1]} />
      <Lightformer
        form="rect"
        intensity={7}
        color="#e8a54b"
        position={[-6, 1, 0]}
        rotation-y={Math.PI / 2}
        scale={[10, 1.2, 1]}
      />
      {!lite && (
        <>
          <Lightformer
            form="rect"
            intensity={4}
            color="#e8a54b"
            position={[6, -1, 2]}
            rotation-y={-Math.PI / 2}
            scale={[8, 0.5, 1]}
          />
          <Lightformer form="ring" intensity={1.5} color="#f2ede4" position={[0, 0, 9]} scale={4} />
        </>
      )}
      <Lightformer form="rect" intensity={2} color="#f2ede4" position={[4, 3, 6]} scale={[6, 1, 1]} />
      <Lightformer form="rect" intensity={2.5} color="#e8a54b" position={[-4, -3, 6]} scale={[6, 0.8, 1]} />
    </Environment>
  );
}

export default function Scene({ lite, active, onReady }: SceneProps) {
  const maxDpr = lite ? 1.5 : 2;
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
      gl={{ antialias: !lite, alpha: true, powerPreference: lite ? "low-power" : "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <PerformanceMonitor
        flipflops={3}
        onIncline={() => setDpr(maxDpr)}
        onDecline={() => setDpr(1)}
        onFallback={() => setDpr(1)}
      />
      <fog attach="fog" args={["#0a0908", 8, 16]} />
      <ambientLight intensity={0.15} />
      {!lite && <directionalLight position={[3, 4, 5]} intensity={0.6} color="#f2ede4" />}
      <StudioLights lite={lite} />
      <Sculpture lite={lite} />
      <CameraRig lite={lite} />
      <FirstFrame onReady={onReady} />
    </Canvas>
  );
}
