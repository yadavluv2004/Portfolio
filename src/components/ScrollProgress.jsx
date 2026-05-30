import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const top = el.scrollTop || document.body.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      setPct(height > 0 ? (top / height) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${pct}%`,
        height: "2px",
        background: "linear-gradient(90deg, #8B1A1A, #C8A040, #8B1A1A)",
        backgroundSize: "200% 100%",
        animation: "border-flow 3s linear infinite",
        zIndex: 9999,
        boxShadow: "0 0 8px rgba(200,160,64,0.55)",
        transition: "width 0.1s linear",
      }}
    />
  );
};

export default ScrollProgress;
