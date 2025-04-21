
import { useEffect, useRef } from "react";

/**
 * Interactive 3D glare background.
 * - Glare gradient uses only greys, animated in 3D as user moves pointer.
 * - Glare gently floats and also reacts to scroll as a subtle parallax 3D premium effect.
 */
const GREY_GRADIENT = "radial-gradient(circle at 50% 50%, rgba(189,195,199,0.18) 0%, rgba(44,62,80,0.10) 65%, transparent 100%)";

const Background = () => {
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let req: number;
    let lastX = 50;
    let lastY = 50;
    let animGlare = (x = lastX, y = lastY) => {
      if (!glareRef.current) return;
      const rotateX = (y - 50) * 0.2;
      const rotateY = (x - 50) * -0.2;
      glareRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(189,195,199,0.22) 0%, rgba(44,62,80,0.09) 55%, transparent 100%)`;
      glareRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.018)`;
      lastX = x;
      lastY = y;
    };
    function handle(e: MouseEvent) {
      const { innerWidth, innerHeight } = window;
      const x = Math.round((e.clientX / innerWidth) * 100);
      const y = Math.round((e.clientY / innerHeight) * 100);
      if (req) cancelAnimationFrame(req);
      req = requestAnimationFrame(() => animGlare(x, y));
    }
    function handleScroll() {
      // subtle y parallax to glare
      if (!glareRef.current) return;
      const yPct = 50 + Math.min(20, window.scrollY / 13); // less motion for premium feel
      animGlare(lastX, yPct);
    }
    window.addEventListener("mousemove", handle);
    window.addEventListener("scroll", handleScroll);
    // Subtle periodic drifting even when idle:
    let drift = 0, anim;
    function driftLoop() {
      drift += 0.011;
      if (!glareRef.current) return;
      const dx = 50 + Math.sin(drift) * 8;
      const dy = 48 + Math.cos(drift / 2) * 7;
      animGlare(dx, dy);
      anim = requestAnimationFrame(driftLoop);
    }
    driftLoop();

    return () => {
      window.removeEventListener("mousemove", handle);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(anim);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div
        ref={glareRef}
        className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(.33,2,.29,.91)]"
        style={{
          background: GREY_GRADIENT,
          willChange: "background, transform",
          transition: "background 0.8s cubic-bezier(.33,2,.29,.91), transform 0.7s cubic-bezier(.33,2,.29,.91)",
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default Background;
