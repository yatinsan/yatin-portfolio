"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

function Shape({ position, geometry, color, speed, factor }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Auto rotation
    meshRef.current.rotation.x = Math.sin(t / 4) * speed;
    meshRef.current.rotation.y = Math.cos(t / 4) * speed;
    meshRef.current.rotation.z += 0.01;

    // React to mouse
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    
    // Smoothly follow/repel from mouse
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, position[0] + (x * factor), 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1] + (y * factor), 0.1);
  });

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial 
        color={color} 
        metalness={0.8} 
        roughness={0.2} 
        transparent 
        opacity={0.3}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

export default function FloatingShapes() {
  const shapes = useMemo(() => [
    {
      position: [-5, 3, -2],
      geometry: <sphereGeometry args={[0.5, 32, 32]} />,
      color: "#3b82f6",
      speed: 1,
      factor: 0.1
    },
    {
      position: [5, -4, -1],
      geometry: <torusGeometry args={[0.4, 0.1, 16, 32]} />,
      color: "#8b5cf6",
      speed: 1.5,
      factor: 0.15
    },
    {
      position: [-6, -2, -3],
      geometry: <octahedronGeometry args={[0.6]} />,
      color: "#ec4899",
      speed: 0.8,
      factor: 0.05
    },
    {
      position: [6, 4, -4],
      geometry: <boxGeometry args={[0.7, 0.7, 0.7]} />,
      color: "#06b6d4",
      speed: 1.2,
      factor: 0.2
    },
    {
      position: [0, 5, -5],
      geometry: <tetrahedronGeometry args={[0.8]} />,
      color: "#10b981",
      speed: 1,
      factor: 0.08
    }
  ], []);

  return (
    <group>
      {shapes.map((props, i) => (
        <Shape key={i} {...props} />
      ))}
    </group>
  );
}
