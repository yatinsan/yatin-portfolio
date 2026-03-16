import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export const TextReveal = ({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  as: Component = 'span',
}: TextRevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const mergedClasses = twMerge(clsx("inline-flex flex-wrap m-0 p-0", className));

  const MotionComponent = motion[Component as keyof typeof motion] as any;

  return (
    <MotionComponent
      ref={ref}
      className={mergedClasses}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span variants={child} className="inline-block pb-1">
            {word}
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  );
};
