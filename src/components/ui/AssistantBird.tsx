import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import birdImage from '../../assets/bird.png';

export const AssistantBird = () => {
  const [message, setMessage] = useState('');

  // Thought generation based on intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            let thoughts: string[] = [];
            switch(id) {
              case 'hero': thoughts = [
                "Welcome to Yatin's portfolio!", 
                "He's a great Flutter developer!", 
                "Do you like to work with him?"
              ]; break;
              case 'about': thoughts = [
                "4+ years of experience!", 
                "He's built some amazing things.", 
                "A true cross-platform expert!"
              ]; break;
              case 'experience': thoughts = [
                "Look at all that history...", 
                "He's lead teams and delivered!", 
                "Such a great asset to any team."
              ]; break;
              case 'projects': thoughts = [
                "10+ published apps!", 
                "He builds clean, scalable code.", 
                "I'd hire him immediately."
              ]; break;
              case 'skills': thoughts = [
                "Flutter, Dart, React, Three.js...", 
                "Is there anything he can't do?", 
                "Master of State Management!"
              ]; break;
              case 'contact': thoughts = [
                "Send him an email!", 
                "Let's build something great together.", 
                "He's ready for new opportunities!"
              ]; break;
              default: thoughts = ["*chirp chirp*"];
            }
            if (thoughts.length > 0) {
              const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
              setMessage(randomThought);
              
              // Clear thought after 5 seconds to not be annoying
              const timeout = setTimeout(() => {
                setMessage('');
              }, 5000);
              return () => clearTimeout(timeout);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none flex flex-col items-end">
      <AnimatePresence>
        {message && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="mb-4 bg-white text-black font-medium px-5 py-3 rounded-2xl shadow-xl max-w-[200px] text-sm relative"
          >
            {message}
            {/* Thought bubble pointer pointing down-right toward the bird */}
            <div className="absolute top-[calc(100%-4px)] right-[50px] w-4 h-4 bg-white rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.img 
        src={birdImage} 
        alt="assistant bird" 
        className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_10px_15px_rgba(59,130,246,0.3)] pointer-events-auto cursor-pointer" 
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        whileHover={{ scale: 1.1, rotate: -10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setMessage(message ? "" : "Pleased to meet you! Yatin is awesome!")}
      />
    </div>
  );
};
