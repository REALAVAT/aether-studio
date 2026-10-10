"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Curve,
  DoubleSide,
  MathUtils,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Vector2,
  Vector3,
  type Group,
  type Object3D,
} from "three";
import { callouts as calloutList } from "./callouts";

const AMBER = "#e8a54b";

/** Ear-cup centre offset on X and the cup's vertical centre. */
const CUP_X = 0.95;
const CUP_Y = -0.45;
/** Cup depth along its axis; the headband meets the middle of it. */
const CUP_DEPTH = 0.42;
const BAND_R = CUP_X + CUP_DEPTH / 2;
const BAND_Y = 0.58;

/** How far each part travels at full explode, along the cup axis (or up, for the band). */
const TRAVEL = { band: 0.7, cushion: -0.42, driver: 0.02, cup: 0.48 };

class Arc extends Curve<Vector3> {
  radius: number;
  from: number;
  to: number;
  centreY: number;

  constructor(radius: number, from: number, to: number, centreY: number) {
    super();
    this.radius = radius;
    this.from = from;
    this.to = to;
    this.centreY = centreY;
  }

  getPoint(t: number, target = new Vector3()) {
    const a = this.from + (this.to - this.from) * t;
    return target.set(Math.cos(a) * this.radius, this.centreY + Math.sin(a) * this.radius, 0);
  }
}

const cupProfile = [
  [0, 0.4],
  [0.3, 0.42],
  [0.48, 0.405],
  [0.58, 0.34],
  [0.64, 0.22],
  [0.665, 0.09],
  [0.645, 0],
  [0.57, -0.015],
].map(([x, y]) => new Vector2(x, y));

const coneProfile = [
  [0.08, -0.075],
  [0.2, -0.05],
  [0.33, -0.02],
  [0.4, 0],
].map(([x, y]) => new Vector2(x, y));

function useMaterials(lite: boolean) {
  const materials = useMemo(() => {
    const shell = lite
      ? new MeshStandardMaterial({ color: "#161412", roughness: 0.5, metalness: 0.25, side: DoubleSide })
      : new MeshPhysicalMaterial({
          color: "#141210",
          roughness: 0.46,
          metalness: 0.2,
          clearcoat: 0.35,
          clearcoatRoughness: 0.5,
          side: DoubleSide,
        });
    const leather = lite
      ? new MeshStandardMaterial({ color: "#100f0d", roughness: 0.85 })
      : new MeshPhysicalMaterial({
          color: "#0f0e0c",
          roughness: 0.78,
          sheen: 1,
          sheenColor: "#4a4036",
          sheenRoughness: 0.55,
        });
    const brushed = lite
      ? new MeshStandardMaterial({ color: "#a9a49c", metalness: 1, roughness: 0.34 })
      : new MeshPhysicalMaterial({
          color: "#aca79f",
          metalness: 1,
          roughness: 0.3,
          anisotropy: 0.85,
          anisotropyRotation: Math.PI / 2,
        });
    const accent = new MeshStandardMaterial({
      color: AMBER,
      metalness: 0.7,
      roughness: 0.28,
      emissive: AMBER,
      emissiveIntensity: 0.35,
    });
    const driver = new MeshStandardMaterial({ color: "#1d1a17", metalness: 0.4, roughness: 0.55 });
    const copper = new MeshStandardMaterial({ color: "#b07a3a", metalness: 0.9, roughness: 0.25 });
    return { shell, leather, brushed, accent, driver, copper };
  }, [lite]);

  useEffect(() => () => Object.values(materials).forEach((m) => m.dispose()), [materials]);
  return materials;
}

/** Invisible point a DOM callout is pinned to; found by name each frame. */
function Anchor({ index, position }: { index: number; position: [number, number, number] }) {
  return <object3D name={`callout-${index}`} position={position} />;
}

type EarCupProps = {
  side: 1 | -1;
  lite: boolean;
  materials: ReturnType<typeof useMaterials>;
  parts: RefObject<Record<string, Group | null>>;
  callouts?: boolean;
};

function EarCup({ side, lite, materials: m, parts, callouts }: EarCupProps) {
  const seg = lite ? 28 : 64;
  const set = (key: string) => (g: Group | null) => {
    parts.current[`${key}${side}`] = g;
  };

  return (
    // Local +Y points away from the head, so every part explodes along one axis.
    <group position={[side * CUP_X, CUP_Y, 0]} rotation={[0, 0, -side * (Math.PI / 2)]} scale={[1.14, 1, 1]}>
      <group ref={set("cushion")}>
        <mesh material={m.leather} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.07, 0]} scale={[1, 1, 0.72]}>
          <torusGeometry args={[0.46, 0.13, lite ? 12 : 24, seg]} />
        </mesh>
        {callouts && side === -1 && (
          <Anchor index={1} position={[0.42, -0.1, 0]} />
        )}
      </group>

      <group ref={set("driver")}>
        <mesh material={m.driver} position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.43, 0.43, 0.035, seg]} />
        </mesh>
        <mesh material={m.driver}>
          <latheGeometry args={[coneProfile, seg]} />
        </mesh>
        <mesh material={m.copper} position={[0, -0.07, 0]} scale={[1, 0.45, 1]}>
          <sphereGeometry args={[0.085, lite ? 12 : 24, lite ? 8 : 16]} />
        </mesh>
        {callouts && side === 1 && (
          <Anchor index={2} position={[-0.5, 0, 0]} />
        )}
      </group>

      <group ref={set("cup")}>
        <mesh material={m.shell}>
          <latheGeometry args={[cupProfile, seg]} />
        </mesh>
        <mesh material={m.accent} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.415, 0]}>
          <torusGeometry args={[0.47, 0.022, 10, seg]} />
        </mesh>
        <mesh material={m.brushed} position={[0, 0.418, 0]}>
          <cylinderGeometry args={[0.445, 0.445, 0.012, seg]} />
        </mesh>
        <mesh material={m.brushed} position={[0, 0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.16, 0.012, 8, seg]} />
        </mesh>
        {callouts && side === -1 && (
          <Anchor index={3} position={[-0.55, 0.3, 0]} />
        )}
      </group>
    </group>
  );
}

type HeadphonesProps = {
  lite: boolean;
  /** 0 = assembled, 1 = fully exploded. Read every frame. */
  explode: RefObject<number>;
  callouts?: boolean;
};

/** Procedural over-ear headphones: brushed band, matte cups, amber accent rings. */
export function Headphones({ lite, explode, callouts = false }: HeadphonesProps) {
  const m = useMaterials(lite);
  const band = useRef<Group>(null);
  const parts = useRef<Record<string, Group | null>>({});
  const labels = useRef<{ el: HTMLElement; anchor: Object3D }[]>([]);
  const point = useMemo(() => new Vector3(), []);

  const outer = useMemo(() => new Arc(BAND_R, 0, Math.PI, BAND_Y), []);
  const inner = useMemo(() => new Arc(BAND_R - 0.11, 0.42, Math.PI - 0.42, BAND_Y), []);
  const seg = lite ? 48 : 128;

  useFrame(({ gl, scene, camera, size }) => {
    const e = explode.current;
    if (callouts && (labels.current.length < calloutList.length || !labels.current[0].el.isConnected)) {
      const host = gl.domElement.closest("[data-hero-stage]");
      labels.current = calloutList.flatMap((_, i) => {
        const el = host?.querySelector<HTMLElement>(`[data-callout="${i}"]`);
        const anchor = scene.getObjectByName(`callout-${i}`);
        return el && anchor ? [{ el, anchor }] : [];
      });
    }
    if (band.current) band.current.position.y = TRAVEL.band * e;
    for (const side of [1, -1]) {
      const p = parts.current;
      p[`cushion${side}`]?.position.setY(TRAVEL.cushion * e);
      p[`driver${side}`]?.position.setY(TRAVEL.driver * e);
      p[`cup${side}`]?.position.setY(TRAVEL.cup * e);
    }
    labels.current.forEach(({ el, anchor }, i) => {
      const o = MathUtils.smoothstep(e, 0.62 + i * 0.06, 0.86 + i * 0.04);
      el.style.opacity = String(o);
      el.style.visibility = o > 0.01 ? "visible" : "hidden";
      if (o <= 0.01) return;
      anchor.getWorldPosition(point).project(camera);
      const x = ((point.x + 1) / 2) * size.width;
      const y = ((1 - point.y) / 2) * size.height;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    });
  });

  return (
    <group>
      <group ref={band}>
        <mesh material={m.brushed} scale={[1, 1, 2.3]}>
          <tubeGeometry args={[outer, seg, 0.045, lite ? 8 : 16, false]} />
        </mesh>
        <mesh material={m.leather} scale={[1, 1, 1.6]}>
          <tubeGeometry args={[inner, seg, 0.07, lite ? 8 : 16, false]} />
        </mesh>
        {([1, -1] as const).map((side) => (
          <group key={side} position={[side * BAND_R, 0, 0]}>
            <mesh material={m.brushed} position={[0, BAND_Y - 0.13, 0]}>
              <cylinderGeometry args={[0.028, 0.028, 0.32, 12]} />
            </mesh>
            <mesh material={m.shell} position={[0, CUP_Y + 0.77, 0]}>
              <boxGeometry args={[0.12, 0.1, 0.16]} />
            </mesh>
          </group>
        ))}
        {callouts && (
          <Anchor index={0} position={[0.35, BAND_Y + BAND_R, 0]} />
        )}
      </group>

      {([1, -1] as const).map((side) => (
        <EarCup key={side} side={side} lite={lite} materials={m} parts={parts} callouts={callouts} />
      ))}
    </group>
  );
}
