"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function Shape({ position, color, size, speed, distort }: any) {
  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={2}>
      <mesh position={position}>
        <sphereGeometry args={[size, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingShapes() {
  const shapes = useMemo(() => [
    { position: [10, 5, -15], color: "#3b82f6", size: 4, speed: 2, distort: 0.4 },
    { position: [-12, -8, -20], color: "#8b5cf6", size: 6, speed: 1.5, distort: 0.3 },
    { position: [15, -12, -25], color: "#0ea5e9", size: 5, speed: 1.8, distort: 0.5 },
    { position: [-18, 10, -30], color: "#6366f1", size: 7, speed: 1.2, distort: 0.2 },
  ], []);

  return (
    <group>
      {shapes.map((props, i) => (
        <Shape key={i} {...props} />
      ))}
    </group>
  );
}
