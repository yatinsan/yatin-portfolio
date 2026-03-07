"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

export default function MobileModel({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const feedRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Auto-rotation + Scroll-based rotation
    meshRef.current.rotation.y = (Math.sin(t / 4) / 4) + (scrollProgress * Math.PI * 2);
    meshRef.current.rotation.x = scrollProgress * Math.PI * 0.5;
    
    // Floating effect
    meshRef.current.position.y = (Math.sin(t / 2) / 10);

    // Simulated screen scroll
    if (feedRef.current) {
      feedRef.current.position.y = (Math.sin(t / 2) + 1) * 0.5;
    }
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
          {/* Status Bar - Highest Layer */}
          <group position={[0, 2.7, 0.03]}>
            <group position={[0.9, 0, 0]}>
               <mesh position={[0, 0, 0]}>
                <planeGeometry args={[0.25, 0.1]} />
                <meshStandardMaterial color="white" opacity={0.3} transparent />
              </mesh>
               <mesh position={[0.1, 0, 0]}>
                <planeGeometry args={[0.02, 0.05]} />
                <meshStandardMaterial color="white" opacity={0.3} transparent />
              </mesh>
            </group>
          </group>

          {/* Header - Fixed Top */}
          <group position={[0, 2.1, 0.02]}>
            <mesh position={[1, 0, 0]}>
              <circleGeometry args={[0.18, 32]} />
              <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
            </mesh>
          </group>

          {/* Scrolling Feed Area */}
          <group ref={feedRef} position={[0, 0, 0.01]}>
            {[1, 0, -1, -2].map((i) => (
              <group key={i} position={[0, i * 1.3 - 0.2, 0]}>
                {/* Card Background */}
                <RoundedBox args={[2.5, 1.1, 0.01]} radius={0.1} smoothness={4}>
                  <meshStandardMaterial color="#111111" />
                </RoundedBox>
                {/* Content Decor */}
                <group position={[-0.4, 0, 0.01]}>
                  <mesh position={[-0.4, 0, 0]}>
                    <planeGeometry args={[0.6, 0.6]} />
                    <meshStandardMaterial color="#1a1a1a" />
                  </mesh>
                  <mesh position={[0.5, 0.15, 0]}>
                    <planeGeometry args={[1, 0.08]} />
                    <meshStandardMaterial color="#333" />
                  </mesh>
                  <mesh position={[0.4, -0.05, 0]}>
                    <planeGeometry args={[0.8, 0.06]} />
                    <meshStandardMaterial color="#222" />
                  </mesh>
                </group>
                {/* Accent line */}
                <mesh position={[-1.2, 0, 0.01]}>
                  <planeGeometry args={[0.05, 0.6]} />
                  <meshStandardMaterial color="#3b82f6" />
                </mesh>
              </group>
            ))}
          </group>

          {/* Bottom Navigation - Fixed Bottom (Higher Z) */}
          <group position={[0, -2.5, 0.03]}>
             <mesh>
              <planeGeometry args={[2.7, 0.7]} />
              <meshStandardMaterial color="#080808" />
            </mesh>
            <mesh position={[0, 0.35, 0]}>
              <planeGeometry args={[2.7, 0.01]} />
              <meshStandardMaterial color="#ffffff" opacity={0.1} transparent />
            </mesh>
            {[-1, -0.33, 0.33, 1].map((i) => (
              <mesh key={i} position={[i * 0.6, 0.05, 0.01]}>
                <circleGeometry args={[0.07, 32]} />
                <meshStandardMaterial color={i === -1 ? "#3b82f6" : "#222"} />
              </mesh>
            ))}
          </group>

          {/* Floating Action Button */}
          <group position={[0.8, -1.8, 0.04]}>
            <mesh>
              <circleGeometry args={[0.22, 32]} />
              <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1} />
            </mesh>
          </group>

          {/* Screen Glass Overlay */}
          <mesh position={[0, 0, 0.05]}>
            <planeGeometry args={[2.7, 5.7]} />
            <meshStandardMaterial 
              color="#ffffff" 
              opacity={0.05} 
              transparent 
              roughness={0.1}
              metalness={0.1}
            />
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
