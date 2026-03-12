import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FloatingShapes = ({ count = 40 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Generate random properties for the floating instances
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 25; // spread wide
      const y = (Math.random() - 0.5) * 25; // spread tall
      const z = (Math.random() - 0.5) * 15 - 5; // push mostly behind
      const rx = Math.random() * Math.PI;
      const ry = Math.random() * Math.PI;
      const rz = Math.random() * Math.PI;
      const scale = Math.random() * 0.3 + 0.1; // keep them relatively small
      
      // individual rotation and floating speeds
      const speedRotation = (Math.random() - 0.5) * 0.5;
      const speedY = (Math.random() - 0.5) * 0.2;
      
      temp.push({ x, y, z, rx, ry, rz, scale, speedRotation, speedY });
    }
    return temp;
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    
    // Animate each instance slowly
    particles.forEach((particle, i) => {
      particle.rx += delta * particle.speedRotation;
      particle.ry += delta * particle.speedRotation;
      particle.y += delta * particle.speedY; // float up or down slowly
      
      // Wrap around screen bounds to create infinite floating
      if (particle.y > 15) particle.y = -15;
      if (particle.y < -15) particle.y = 15;
      
      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.rotation.set(particle.rx, particle.ry, particle.rz);
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      
      if (meshRef.current) {
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
    });

    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        {/* Using Octahedron for a cool, low-poly tech feel */}
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#8b5cf6" // Violet accent color
          wireframe={true} 
          transparent={true} 
          opacity={0.15} // Kept low to not distract
        />
      </instancedMesh>
    </>
  );
};
