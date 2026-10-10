"use client";

import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { scrollState } from "@/lib/scroll-store";

export function CameraRig({ lite }: { lite: boolean }) {
  useFrame(({ camera }, delta) => {
    if (lite) return;
    const p = scrollState.hero;
    const dt = Math.min(delta, 1 / 30);
    const swing = Math.sin(p * Math.PI);

    const x = -swing * 0.5 + scrollState.pointerX * 0.3;
    const y = 0.15 + p * 0.35 + scrollState.pointerY * 0.15;
    const z = 7 - swing * 0.3 + p * 0.4;

    camera.position.x = MathUtils.damp(camera.position.x, x, 2.5, dt);
    camera.position.y = MathUtils.damp(camera.position.y, y, 2.5, dt);
    camera.position.z = MathUtils.damp(camera.position.z, z, 2.5, dt);
    camera.lookAt(0, p * 0.15, 0);
  });

  return null;
}
