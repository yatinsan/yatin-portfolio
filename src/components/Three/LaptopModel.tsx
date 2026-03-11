"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Float, Text, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const CODE_COLORS = ["#3b82f6", "#a855f7", "#eab308", "#22c55e", "#ef4444"];

export default function LaptopModel({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  // Generate some random code lines for the "coding feeling"
  const codeLines = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      width: Math.random() * 2 + 0.5,
      color: CODE_COLORS[Math.floor(Math.random() * CODE_COLORS.length)],
      indent: Math.floor(Math.random() * 3) * 0.2,
      delay: Math.random() * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !lidRef.current) return;
    const t = state.clock.getElapsedTime();

    // Opening animation based on scroll (normalized 0 to 1)
    // Lid opening from flat (bottom) to upright or slightly beyond
    // Realistic hinge: 0 is closed (Math.PI), 1 is open (Math.PI / 2)
    // We want it slightly tilted back when "open"
    const openAngle = Math.PI - (scrollProgress * Math.PI * 0.7);
    lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, openAngle, 0.08);

    // Dynamic rotation for better positioning
    // Tilt the whole laptop slightly for a more premium look
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (Math.sin(t / 4) / 6) + 0.2, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -0.2, 0.05);
    
    // Floating movement
    groupRef.current.position.y = Math.sin(t / 2) / 8;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={groupRef} scale={0.9} position={[0, -0.5, 0]}>
        {/* Base / Keyboard Part */}
        <RoundedBox args={[4.5, 0.15, 3.2]} radius={0.08} smoothness={4} position={[0, -0.075, 0]}>
          <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        
        {/* Keyboard Texture Simulation */}
        <mesh position={[0, 0.01, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 1.8]} />
          <meshStandardMaterial color="#111" metalness={0.4} roughness={0.6} alphaTest={0.5} />
        </mesh>

        {/* Trackpad */}
        <RoundedBox args={[1.4, 0.01, 1]} radius={0.02} position={[0, 0.01, 1]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
        </RoundedBox>

        {/* Hinge/Lid Group */}
        <group ref={lidRef} position={[0, 0.02, -1.6]}>
          {/* Lid Body */}
          <group position={[0, 1.5, 0]}>
            <RoundedBox args={[4.5, 3, 0.08]} radius={0.08} smoothness={4}>
              <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
            </RoundedBox>

            {/* Apple-style bezel */}
            <mesh position={[0, 0, 0.041]}>
              <planeGeometry args={[4.4, 2.9]} />
              <meshStandardMaterial color="#000" />
            </mesh>

            {/* Main Screen Content Area */}
            <mesh ref={screenRef} position={[0, 0, 0.045]}>
              <planeGeometry args={[4.2, 2.7]} />
              <meshStandardMaterial color="#050505" />
            </mesh>

            {/* Screen Content: "Coding Feeling" */}
            <group position={[0, 0, 0.047]}>
              {/* Terminal Header */}
              <mesh position={[0, 1.25, 0]}>
                <planeGeometry args={[4.2, 0.2]} />
                <meshStandardMaterial color="#1a1a1a" />
              </mesh>
              
              <Text
                position={[-1.9, 1.25, 0.001]}
                fontSize={0.08}
                color="#666"
                anchorX="left"
              >
                bash — portfolio.tsx
              </Text>

              {/* Code Lines */}
              {codeLines.map((line, i) => (
                <mesh 
                  key={i} 
                  position={[-1.9 + line.indent, 1.0 - (i * 0.12), 0]}
                  onBeforeRender={(renderer, scene, camera, geometry, material) => {
                    // Optional: animate line appearance/glow
                  }}
                >
                  <planeGeometry args={[line.width, 0.06]} />
                  <meshStandardMaterial 
                    color={line.color} 
                    emissive={line.color}
                    emissiveIntensity={0.5}
                    transparent 
                    opacity={0.8} 
                  />
                </mesh>
              ))}

              {/* Glowing Cursor simulation */}
              <mesh position={[-1 + Math.sin(Date.now() / 100) * 0.05, -1.2, 0]}>
                <planeGeometry args={[0.1, 0.02]} />
                <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
              </mesh>
            </group>

            {/* Screen Glow */}
            <pointLight position={[0, 0, 0.5]} intensity={0.5} color="#3b82f6" distance={2} />
          </group>
        </group>
      </group>
    </Float>
  );
}
