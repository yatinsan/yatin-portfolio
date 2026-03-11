"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const codeSnippets = [
  {
    code: `function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  renderer.render(scene, camera);
}`,
    top: "10%",
    left: "5%",
  },
  {
    code: `const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
    },
  },
});`,
    top: "30%",
    right: "10%",
  },
  {
    code: `export default function Portfolio() {
  return (
    <div className="grid-layout">
      <HeroSection />
      <ProjectGrid />
    </div>
  );
}`,
    top: "55%",
    left: "15%",
  },
  {
    code: `interface User {
  id: string;
  name: string;
  role: 'developer' | 'designer';
}`,
    top: "75%",
    right: "15%",
  },
];

const CodeSnippet = ({ snippet, index, scrollYProgress }: { 
  snippet: typeof codeSnippets[0], 
  index: number, 
  scrollYProgress: MotionValue<number>
}) => {
  const step = 1 / codeSnippets.length;
  const start = index * step;
  const end = (index + 1) * step;
  
  const fadeInStart = Math.max(0, start - 0.05);
  const fadeOutEnd = Math.min(1, end + 0.05);

  const opacity = useTransform(scrollYProgress, (progress) => {
    if (progress < fadeInStart || progress > fadeOutEnd) return 0;
    if (progress < start) return (progress - fadeInStart) / (start - fadeInStart || 0.001);
    if (progress > end) return 1 - (progress - end) / (fadeOutEnd - end || 0.001);
    return 1;
  });
  
  const y = useTransform(scrollYProgress, [start, end], [50, -50]);

  return (
    <motion.div
      style={{
        position: "absolute",
        top: snippet.top,
        left: (snippet as any).left,
        right: (snippet as any).right,
        opacity,
        y,
      }}
      className="font-mono text-sm text-blue-400 whitespace-pre"
    >
      {snippet.code}
    </motion.div>
  );
};

export default function CodeScrollEffect() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20 select-none">
      {codeSnippets.map((snippet, index) => (
        <CodeSnippet 
          key={index} 
          snippet={snippet} 
          index={index} 
          scrollYProgress={scrollYProgress} 
        />
      ))}
    </div>
  );
}
