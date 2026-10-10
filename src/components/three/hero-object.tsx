"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, type Group, type Mesh } from "three";
import { scrollState } from "@/lib/scroll-store";
import { Headphones } from "./headphones";

const AMBER = "#e8a54b";
const CREAM = "#f2ede4";

/** Resting pose for the opening frame; the poster still is rendered from it too. */
export const HERO_POSE = { rotX: 0.2, rotY: -0.9 };
/** Half the visible height at z=0 for the 35° camera seven units away. */
const HALF_H = Math.tan(MathUtils.degToRad(17.5)) * 7;

function ramp(p: number, a: number, b: number) {
  return MathUtils.smoothstep(p, a, b);
}

export function HeroObject({ lite }: { lite: boolean }) {
  const root = useRef<Group>(null);
  const body = useRef<Group>(null);
  const halo = useRef<Group>(null);
  const moon = useRef<Mesh>(null);
  const explode = useRef(0);
  const placed = useRef(false);

  useFrame((state, delta) => {
    if (!root.current || !body.current || !halo.current) return;
    const p = scrollState.hero;
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 1 / 30);

    const aspect = state.size.width / Math.max(state.size.height, 1);
    const halfW = HALF_H * aspect;
    const turn = ramp(p, 0, 0.34);
    const toLeft = ramp(p, 0.2, 0.42);
    const settle = ramp(p, 0.62, 0.86);

    let x = 0;
    let y = 0;
    let scale: number;
    if (lite) {
      scale = Math.min(1.15, (halfW * 2) / 4.7);
    } else if (aspect < 1) {
      // Portrait tablets: the copy sits low, so the object owns the upper half.
      y = MathUtils.lerp(0.75, 0.7, settle);
      scale = Math.min(0.55, (halfW * 2) / 4.6) * MathUtils.lerp(1, 0.85, settle);
    } else {
      const side = halfW * 0.45;
      x = MathUtils.lerp(MathUtils.lerp(side, -side * 0.75, toLeft), 0, settle);
      y = MathUtils.lerp(0, 0.4, settle);
      scale = MathUtils.clamp(aspect / 2, 0.6, 0.8) * MathUtils.lerp(1, 0.68, settle);
    }

    const target = lite ? 0 : ramp(p, 0.3, 0.46) * (1 - ramp(p, 0.6, 0.76));
    explode.current = MathUtils.damp(explode.current, target, 5, dt);
    const e = explode.current;
    const portrait = !lite && aspect < 1;
    scale *= 1 - (portrait ? 0.34 : 0.24) * e;
    y -= (portrait ? 0.75 : 0.35) * e * scale;

    if (!placed.current) {
      placed.current = true;
      root.current.position.set(x, y, 0);
      root.current.scale.setScalar(scale);
    }
    root.current.position.x = MathUtils.damp(root.current.position.x, x, 3.2, dt);
    root.current.position.y = MathUtils.damp(root.current.position.y, y, 3.2, dt);
    root.current.scale.setScalar(MathUtils.damp(root.current.scale.x, scale, 3.2, dt));

    // A slow three-quarter turn through the opening, opened side-on for the exploded
    // view, then settled into a calm 3/4 view.
    const sway = Math.sin(t * 0.35) * 0.08 * (1 - settle);
    const rotY =
      HERO_POSE.rotY - Math.PI * 1.5 * turn - 0.32 * e - 0.3 * settle + sway + scrollState.pointerX * 0.2;
    const rotX = HERO_POSE.rotX + 0.1 * e - 0.08 * settle + scrollState.pointerY * 0.1;
    body.current.rotation.y = MathUtils.damp(body.current.rotation.y, rotY, 4, dt);
    body.current.rotation.x = MathUtils.damp(body.current.rotation.x, rotX, 4, dt);
    body.current.position.y = Math.sin(t * 0.6) * 0.05 * (1 - settle * 0.8);

    halo.current.rotation.x = MathUtils.damp(halo.current.rotation.x, Math.PI / 2 - 0.45 + p * 0.6, 3, dt);
    halo.current.rotation.z = t * 0.12;

    if (moon.current) {
      const a = t * 0.45 + p * Math.PI * 2;
      moon.current.position.set(Math.cos(a) * 2.15, Math.sin(a) * 2.15, 0);
    }
  });

  return (
    <group ref={root} scale={0.8}>
      <group ref={body} rotation={[HERO_POSE.rotX, HERO_POSE.rotY, 0]}>
        <Headphones lite={lite} explode={explode} callouts={!lite} />
      </group>

      <group ref={halo} rotation={[Math.PI / 2 - 0.45, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.15, 0.009, 8, lite ? 128 : 256]} />
          <meshBasicMaterial color={AMBER} toneMapped={false} />
        </mesh>
        <mesh rotation={[0, 0, 0.4]}>
          <torusGeometry args={[2.55, 0.004, 6, lite ? 128 : 256]} />
          <meshBasicMaterial color={CREAM} transparent opacity={0.28} toneMapped={false} />
        </mesh>
        <mesh ref={moon} position={[2.15, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color={AMBER} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
