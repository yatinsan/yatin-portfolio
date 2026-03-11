"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Float, Text } from "@react-three/drei";
import * as THREE from "three";

const CODE_COLORS = ["#3b82f6", "#a855f7", "#eab308", "#22c55e", "#ef4444"];

export default function LaptopModel({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const codeGroupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Generate some random code lines for the "coding feeling"
  const codeLines = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      width: Math.random() * 2 + 0.5,
      color: CODE_COLORS[Math.floor(Math.random() * CODE_COLORS.length)],
      indent: Math.floor(Math.random() * 4) * 0.15,
      y: 1.0 - (i * 0.12),
      opacity: 0.6 + Math.random() * 0.4,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !lidRef.current || !codeGroupRef.current) return;
    const t = state.clock.getElapsedTime();
    const mouse = state.mouse;

    // 1. Smooth Coordinated Scroll & Orientation
    // The user prefers it open at scroll 0, closed at scroll 1 (or they were fixing orientation)
    // Let's make it OPEN at scroll 0 (Hero) and stay open for a bit, then close as we scroll away.
    const openLid = -0.3;
    const closedLid = 1.57;
    const targetLid = THREE.MathUtils.lerp(openLid, closedLid, scrollProgress);
    lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, targetLid, 0.08);

    // 2. Mouse Interactivity - "Look at Cursor"
    // The laptop subtly tilts towards the mouse X and Y
    const mouseX = mouse.x * 0.4;
    const mouseY = mouse.y * 0.2;
    
    // Combine Scroll Rotation + Mouse Tracking
    const scrollRotY = THREE.MathUtils.lerp(0.8, 0.1, scrollProgress);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, 
      scrollRotY + mouseX + (Math.sin(t / 4) / 12), 
      0.05
    );
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, 
      0.2 - mouseY, 
      0.05
    );

    // 3. Dynamic Code Scrolling
    // Speed up slightly if hovered
    const scrollSpeed = hovered ? 0.3 : 0.15;
    codeGroupRef.current.position.y = (t * scrollSpeed + scrollProgress * 0.5) % 2.0;

    // 4. Floating Movement
    groupRef.current.position.y = (Math.sin(t / 2) / 12) - 0.5;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group 
        ref={groupRef} 
        scale={0.9}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Base / Keyboard Part */}
        <RoundedBox args={[4.5, 0.15, 3.2]} radius={0.08} smoothness={4} position={[0, -0.075, 0]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        
        {/* Keyboard Texture Simulation */}
        <mesh position={[0, 0.02, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 1.8]} />
          <meshStandardMaterial color="#050505" metalness={0.2} roughness={0.8} />
        </mesh>

        {/* Trackpad */}
        <RoundedBox args={[1.4, 0.01, 1]} radius={0.02} position={[0, 0.015, 1]}>
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
        </RoundedBox>

        {/* Hinge/Lid Group */}
        <group ref={lidRef} position={[0, 0.02, -1.6]}>
          {/* Lid Body */}
          <group position={[0, 1.5, 0]}>
            <RoundedBox args={[4.5, 3, 0.08]} radius={0.08} smoothness={4}>
              <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
            </RoundedBox>

            {/* Bezel */}
            <mesh position={[0, 0, 0.041]}>
              <planeGeometry args={[4.4, 2.9]} />
              <meshStandardMaterial color="#000" />
            </mesh>

            {/* Screen Content Area */}
            <mesh position={[0, 0, 0.045]}>
              <planeGeometry args={[4.2, 2.7]} />
              <meshStandardMaterial color="#020202" />
            </mesh>

            {/* Screen Overlay Content */}
            <group position={[0, 0, 0.047]}>
              {/* Terminal Header */}
              <mesh position={[0, 1.25, 0]}>
                <planeGeometry args={[4.2, 0.2]} />
                <meshStandardMaterial color="#0f0f0f" />
              </mesh>
              
              <Text
                position={[-2.0, 1.25, 0.001]}
                fontSize={0.07}
                color="#666"
                anchorX="left"
              >
                ● ● ●  yatin@portfolio — zsh — 80x24
              </Text>

              {/* Scrolling Code Lines */}
              <group ref={codeGroupRef}>
                {codeLines.map((line, i) => (
                  <mesh 
                    key={i} 
                    position={[-1.9 + line.indent, line.y, 0]}
                  >
                    <planeGeometry args={[line.width, 0.05]} />
                    <meshStandardMaterial 
                      color={line.color} 
                      emissive={line.color}
                      emissiveIntensity={hovered ? 0.8 : 0.5}
                      transparent 
                      opacity={line.opacity} 
                    />
                  </mesh>
                ))}
              </group>

              {/* Active Cursor */}
              <mesh position={[-2.0, -1.2, 0]}>
                <planeGeometry args={[0.1, 0.02]} />
                <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={3} />
              </mesh>
            </group>

            {/* Screen Glow Effect - Reacts to Hover */}
            <pointLight 
              position={[0, 0, 0.6]} 
              intensity={hovered ? 1.5 : 0.8} 
              color="#3b82f6" 
              distance={3} 
            />
          </group>
        </group>
      </group>
    </Float>
  );
}
