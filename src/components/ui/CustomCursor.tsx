import { useEffect, useRef, useState } from 'react';
import birdImage from '../../assets/bird.png';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [thought, setThought] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  // Thought generation based on intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            let thoughts: string[] = [];
            switch(id) {
              case 'hero': thoughts = ["Who are you?", "Ready to fly?", "*chirp*"]; break;
              case 'about': thoughts = ["Hm, interesting past...", "So much experience!", "4+ years, huh?"]; break;
              case 'experience': thoughts = ["Working hard!", "Lots of apps...", "Flutter master!"]; break;
              case 'projects': thoughts = ["Cool projects!", "I like this one.", "So much code!"]; break;
              case 'skills': thoughts = ["Flutter, nice!", "Dart is great.", "Web too?"]; break;
              case 'contact': thoughts = ["Say hello!", "Send a message!", "Let's connect!"]; break;
              default: thoughts = ["*chirp*"];
            }
            if (thoughts.length > 0) {
              const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
              setThought(randomThought);
              
              // Clear thought after 4 seconds to not be annoying
              const timeout = setTimeout(() => {
                setThought('');
              }, 4000);
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

  // Mouse tracking
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let lastX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Apply main translation
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      
      const img = cursor.querySelector('img');
      if (img) {
         if (e.clientX > lastX + 2) img.style.transform = 'scale(1)'; // keep scale property, not scaleX
         else if (e.clientX < lastX - 2) img.style.transform = 'scaleX(-1)';
      }
      lastX = e.clientX;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hover-target')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    const handleMouseDown = () => {
      const img = cursor.querySelector('img');
      if (img) {
         img.style.scale = '0.9';
      }
    };

    const handleMouseUp = () => {
      const img = cursor.querySelector('img');
      if (img) {
         img.style.scale = 'isHovering ? 1.2 : 1';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{ willChange: 'transform' }}
    >
      <div className="relative flex items-center justify-center">
        {thought && (
          <div className="absolute bottom-full mb-3 left-1/2 text-center -translate-x-1/2 bg-white text-black text-xs font-bold px-4 py-2 rounded-2xl whitespace-nowrap shadow-lg animate-fade-in">
            {thought}
            {/* Thought bubble pointers */}
            <div className="absolute top-full right-[20%] w-2 h-2 bg-white -mt-0.5 rounded-full" />
            <div className="absolute top-[calc(100%+6px)] right-[15%] w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        )}
        <img 
          src={birdImage} 
          alt="cursor bird" 
          className="w-14 h-14 object-contain transition-all duration-200" 
          style={{ 
            scale: isHovering ? 1.2 : 1,
            filter: isHovering ? 'brightness(1.5) drop-shadow(0 0 15px rgba(59, 130, 246, 0.8))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))' 
          }}
        />
      </div>
    </div>
  );
};
