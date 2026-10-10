"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, type Group, type Mesh } from "three";
import { scrollState } from "@/lib/scroll-store";

const AMBER = "#e8a54b";
const CREAM = "#f2ede4";

/** Smoothstep between edges a and b. */
function ramp(p: number, a: number, b: number) {
  const t = MathUtils.clamp((p - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}

export function Sculpture({ lite }: { lite: boolean }) {
  const root = useRef<Group>(null);
  const body = useRef<Group>(null);
  const halo = useRef<Group>(null);
  const moon = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!root.current || !body.current || !halo.current) return;
    const p = scrollState.hero;
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 1 / 30);

    // Visible width at z=0 for a 35° fov camera ~7 units away, so layout follows the viewport.
    const aspect = state.size.width / Math.max(state.size.height, 1);
    const halfWidth = Math.tan(MathUtils.degToRad(17.5)) * 7 * aspect;
    const fit = MathUtils.clamp(aspect / 2, 0.5, 0.85);
    const side = halfWidth * 0.45;

    // Chapter 1: right of the headline. Chapter 2: swings left. Chapter 3: centred and receding.
    const toLeft = ramp(p, 0.22, 0.48);
    const toCentre = ramp(p, 0.6, 0.85);
    const targetX = lite ? 0 : MathUtils.lerp(MathUtils.lerp(side, -side, toLeft), 0, toCentre);
    const targetY = lite ? MathUtils.lerp(0.95, 0.55, toCentre) : MathUtils.lerp(0, 0.45, toCentre);
    const targetScale = (lite ? 0.62 : fit) * MathUtils.lerp(1, 0.72, toCentre);

    root.current.position.x = MathUtils.damp(root.current.position.x, targetX, 3.2, dt);
    root.current.position.y = MathUtils.damp(root.current.position.y, targetY, 3.2, dt);
    const s = MathUtils.damp(root.current.scale.x, targetScale, 3.2, dt);
    root.current.scale.setScalar(s);

    const rotY = p * Math.PI * 1.6 + t * 0.08 + scrollState.pointerX * 0.25;
    const rotX = 0.35 - p * 0.7 + scrollState.pointerY * 0.15;
    body.current.rotation.y = MathUtils.damp(body.current.rotation.y, rotY, 4, dt);
    body.current.rotation.x = MathUtils.damp(body.current.rotation.x, rotX, 4, dt);
    body.current.position.y = Math.sin(t * 0.6) * 0.06;

    halo.current.rotation.x = MathUtils.damp(halo.current.rotation.x, Math.PI / 2 - 0.45 + p * 0.95, 3, dt);
    halo.current.rotation.z = t * 0.12;

    if (moon.current) {
      const a = t * 0.45 + p * Math.PI * 2;
      moon.current.position.set(Math.cos(a) * 2.15, Math.sin(a) * 2.15, 0);
    }
  });

  return (
    <group ref={root} position={[lite ? 0 : 1.9, lite ? 0.95 : 0, 0]} scale={lite ? 0.62 : 0.85}>
      <group ref={body}>
        <mesh>
          <torusKnotGeometry args={[1, 0.32, lite ? 180 : 420, lite ? 20 : 64, 2, 3]} />
          {lite ? (
            <meshStandardMaterial color="#2b241e" metalness={1} roughness={0.24} envMapIntensity={1.3} />
          ) : (
            <meshPhysicalMaterial
              color="#2b241e"
              metalness={1}
              roughness={0.2}
              clearcoat={1}
              clearcoatRoughness={0.12}
              iridescence={0.35}
              iridescenceIOR={1.3}
              envMapIntensity={1.4}
            />
          )}
        </mesh>
      </group>

      <group ref={halo}>
        <mesh>
          <torusGeometry args={[2.15, 0.009, 8, lite ? 128 : 256]} />
          <meshBasicMaterial color={AMBER} toneMapped={false} />
        </mesh>
        <mesh rotation={[0, 0, 0.4]}>
          <torusGeometry args={[2.55, 0.004, 6, lite ? 128 : 256]} />
          <meshBasicMaterial color={CREAM} transparent opacity={0.28} toneMapped={false} />
        </mesh>
        <mesh ref={moon}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color={AMBER} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
