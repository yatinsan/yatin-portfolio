"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

export default function MobileModel({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Auto-rotation + Scroll-based rotation
    meshRef.current.rotation.y = (Math.sin(t / 4) / 4) + (scrollProgress * Math.PI * 2);
    meshRef.current.rotation.x = scrollProgress * Math.PI * 0.5;
    
    // Floating effect
    meshRef.current.position.y = (Math.sin(t / 2) / 10);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef}>
        {/* Phone Body */}
        <RoundedBox args={[3, 6, 0.4]} radius={0.3} smoothness={4}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </RoundedBox>

        {/* Screen */}
        <RoundedBox args={[2.7, 5.7, 0.1]} radius={0.2} smoothness={4} position={[0, 0, 0.2]}>
          <meshStandardMaterial color="#000000" emissive="#000000" />
        </RoundedBox>

        {/* Simulated App Content */}
        <group position={[0, 0, 0.26]}>
          {/* Header */}
          <mesh position={[0, 2.4, 0]}>
            <planeGeometry args={[2.5, 0.6]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
          <Text
            position={[0, 2.4, 0.01]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Flutter Dashboard
          </Text>

          {/* Cards */}
          {[1, 0, -1].map((i) => (
            <mesh key={i} position={[0, i * 1.2, 0]}>
              <planeGeometry args={[2.3, 1]} />
              <meshStandardMaterial color="#262626" />
            </mesh>
          ))}

          {/* Floating Action Button */}
          <mesh position={[0.8, -2.4, 0.01]}>
            <circleGeometry args={[0.3, 32]} />
            <meshStandardMaterial color="#8b5cf6" />
          </mesh>
        </group>

        {/* Camera Lens */}
        <mesh position={[0, 2.6, -0.21]} rotation={[Math.PI, 0, 0]}>
          <circleGeometry args={[0.2, 32]} />
          <meshStandardMaterial color="#000000" metalness={1} roughness={0} />
        </mesh>
      </group>
    </Float>
  );
}
