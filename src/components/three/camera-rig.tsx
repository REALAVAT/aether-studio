"use client";

import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { scrollState } from "@/lib/scroll-store";

export function CameraRig({ lite }: { lite: boolean }) {
  useFrame(({ camera }, delta) => {
    const p = scrollState.hero;
    const dt = Math.min(delta, 1 / 30);
    const swing = Math.sin(p * Math.PI);

    const x = -swing * (lite ? 0.8 : 1.4) + (lite ? 0 : scrollState.pointerX * 0.35);
    const y = 0.15 + p * 0.9 + (lite ? 0 : scrollState.pointerY * 0.2);
    const z = 7 - swing * 0.5 + p * 1.1;

    camera.position.x = MathUtils.damp(camera.position.x, x, 2.5, dt);
    camera.position.y = MathUtils.damp(camera.position.y, y, 2.5, dt);
    camera.position.z = MathUtils.damp(camera.position.z, z, 2.5, dt);
    camera.lookAt(0, p * 0.25, 0);
  });

  return null;
}
