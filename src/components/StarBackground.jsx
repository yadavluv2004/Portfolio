import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    generate();
    window.addEventListener("resize", generate);
    return () => window.removeEventListener("resize", generate);
  }, []);

  const generate = () => {
    const count = Math.floor((window.innerWidth * window.innerHeight) / 8000);
    setStars(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 2 + 0.5,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.6 + 0.2,
        dur: Math.random() * 4 + 2,
      }))
    );
    setMeteors(
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        width: Math.random() * 80 + 60,
        height: Math.random() * 1.5 + 1,
        x: Math.random() * 100,
        y: Math.random() * 30,
        delay: Math.random() * 12,
        dur: Math.random() * 3 + 4,
      }))
    );
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star animate-pulse-star"
          style={{
            width: s.size + "px",
            height: s.size + "px",
            left: s.x + "%",
            top: s.y + "%",
            opacity: s.opacity,
            "--dur": s.dur + "s",
            boxShadow: `0 0 ${s.size * 3}px rgba(0,212,255,0.4)`,
          }}
        />
      ))}
      {meteors.map((m) => (
        <div
          key={m.id}
          className="meteor-el animate-meteor"
          style={{
            width: m.width + "px",
            height: m.height + "px",
            left: m.x + "%",
            top: m.y + "%",
            "--delay": m.delay + "s",
            "--dur": m.dur + "s",
            boxShadow: "0 0 8px rgba(0,212,255,0.5)",
          }}
        />
      ))}
    </div>
  );
};
