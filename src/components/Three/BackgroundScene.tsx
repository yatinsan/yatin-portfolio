import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Stars } from '@react-three/drei';
import { AbstractNodes } from './AbstractNodes';

export const BackgroundScene = () => {
  const scrollY = useRef(0);

  // Track scroll position natively independent of framer-motion constraints
  useEffect(() => {
    const handleScroll = () => {
      // Normalize scroll position from 0 to 1 based on page height
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollY.current = window.scrollY / maxScroll;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        {/* Adjusted lighting to be softer for the abstract background */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <directionalLight position={[-10, -10, -5]} color="#4f46e5" intensity={1} />
        
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="city" />
        
        {/* Abstract Geometry replacing the phone */}
        <AbstractNodes scrollY={scrollY} />
      </Canvas>
    </div>
  );
};
