"use client";

import { Canvas } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

const MODEL_URL = "/models/centurion_card.glb";

function CardModel() {
  const { scene } = useGLTF(MODEL_URL);
  return <primitive object={scene} scale={1.05} position={[0, 0, 0]} />;
}

export function CenturionCardBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 32 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[3, 2, 4]} intensity={1.6} color="#fff8e0" />
          <directionalLight position={[-3, -1, 2]} intensity={0.6} color="#a48dd7" />
          <Float
            speed={1.2}
            rotationIntensity={0.45}
            floatIntensity={0.25}
            floatingRange={[-0.04, 0.04]}
          >
            <CardModel />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
