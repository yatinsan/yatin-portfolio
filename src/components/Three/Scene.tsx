"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Environment, PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";

function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { mouse, viewport } = useThree();

  useFrame(() => {
    if (!lightRef.current) return;
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    lightRef.current.position.set(x, y, 2);
  });

  return <pointLight ref={lightRef} intensity={2} color="#3b82f6" />;
}

export default function Scene({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 -z-10 bg-[#030303]">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <MouseLight />
        
        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Environment preset="city" />
          {children}
        </Suspense>
      </Canvas>
      <div className="noise" />
    </div>
  );
}
