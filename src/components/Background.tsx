
import { useEffect, useRef } from 'react';

const Background = () => {
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glareRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate position relative to window size
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      
      // Update glare position with transform
      glareRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0, 180, 216, 0.15) 0%, rgba(114, 9, 183, 0.05) 50%, transparent 100%)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div 
        ref={glareRef}
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{ 
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 180, 216, 0.15) 0%, rgba(114, 9, 183, 0.05) 50%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default Background;
