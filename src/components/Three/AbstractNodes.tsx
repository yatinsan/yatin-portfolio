import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const AbstractNodes = ({ scrollY }: { scrollY: React.MutableRefObject<number> }) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  // Create a stylized wireframe geometry representing "connections" or "network"
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(3, 1), []);

  useFrame((state, delta) => {
    if (!groupRef.current || !meshRef.current) return;
    
    const scroll = scrollY.current;
    
    // Base gentle floating and rotation independent of scroll
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    
    // Constant slow rotation
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;

    // Scroll-based reactive transformations (subtle)
    // As user scrolls down, geometry scales up slightly and shifts
    const targetScale = 1 + scroll * 0.5; // grows from 1 to 1.5
    const targetY = scroll * 2; // shifts downwards relative to camera to stay somewhat centered or parallaxed
    const targetZ = scroll * -1; // pushes back slightly
    
    // Add extra spin based on scroll position interpolation
    const scrollRotation = scroll * Math.PI;

    // Apply damped interpolation for smooth reactive movement
    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 2, delta)
    );
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 2, delta);
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 2, delta);
    
    // Add scroll rotation to the base rotation
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, scrollRotation, 4, delta);
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial 
          color="#3b82f6" 
          wireframe={true} 
          transparent={true} 
          opacity={0.15} // Very subtle, doesn't clash with text
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Inner solid geometry for slight depth, extremely low opacity */}
      <mesh geometry={geometry} scale={0.98}>
        <meshBasicMaterial 
          color="#0a0a0a" 
          transparent={true} 
          opacity={0.8} 
        />
      </mesh>
    </group>
  );
};
