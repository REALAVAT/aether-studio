"use client";

import { Environment, Lightformer } from "@react-three/drei";

/** Softbox-style environment built from Lightformers — no HDR download. */
export function StudioLights({ lite }: { lite: boolean }) {
  return (
    <Environment resolution={lite ? 64 : 256} frames={1}>
      <color attach="background" args={["#0a0908"]} />
      <Lightformer form="rect" intensity={3} color="#f2ede4" position={[0, 5, -6]} scale={[12, 1.6, 1]} />
      <Lightformer
        form="rect"
        intensity={6}
        color="#e8a54b"
        position={[-6, 1, 0]}
        rotation-y={Math.PI / 2}
        scale={[10, 1.2, 1]}
      />
      <Lightformer form="rect" intensity={4} color="#f2ede4" position={[0, 6, 2]} rotation-x={Math.PI / 2} scale={[8, 3, 1]} />
      {!lite && (
        <>
          <Lightformer
            form="rect"
            intensity={3.5}
            color="#e8a54b"
            position={[6, -1, 2]}
            rotation-y={-Math.PI / 2}
            scale={[8, 0.5, 1]}
          />
          <Lightformer form="ring" intensity={1.5} color="#f2ede4" position={[0, 0, 9]} scale={4} />
        </>
      )}
      <Lightformer form="rect" intensity={2.5} color="#f2ede4" position={[4, 3, 6]} scale={[6, 1, 1]} />
      <Lightformer form="rect" intensity={2.5} color="#e8a54b" position={[-4, -3, 6]} scale={[6, 0.8, 1]} />
    </Environment>
  );
}
