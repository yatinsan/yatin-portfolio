import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export const Magnetic = ({ children, strength = 0.5, className = '' }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
