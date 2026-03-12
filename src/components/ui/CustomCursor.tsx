import { useEffect } from 'react';

export const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');
    
    if (!cursor) return;

    let lastX = 0;
    let lastY = 0;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
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
        cursor.classList.add('hovering');
      }
    };

    const handleMouseOut = () => {
      cursor.classList.remove('hovering');
    };

    const handleMouseDown = () => {
      cursor.style.transform = `translate(${lastX}px, ${lastY}px) translate(-50%, -50%) scale(0.9)`;
    };

    const handleMouseUp = () => {
      cursor.style.transform = `translate(${lastX}px, ${lastY}px) translate(-50%, -50%) scale(1)`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      moveCursor(e);
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

  return null;
};
