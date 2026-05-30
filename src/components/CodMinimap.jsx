import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "hero",       label: "H", x: 0.5,  y: 0.1,  color: "#C8A040" },
  { id: "about",      label: "A", x: 0.3,  y: 0.3,  color: "#5CB85C" },
  { id: "experience", label: "E", x: 0.7,  y: 0.35, color: "#CC5500" },
  { id: "skills",     label: "S", x: 0.25, y: 0.55, color: "#C8A040" },
  { id: "projects",   label: "P", x: 0.72, y: 0.65, color: "#5CB85C" },
  { id: "contact",    label: "C", x: 0.5,  y: 0.85, color: "#CC5500" },
];

export const CodMinimap = () => {
  const canvasRef = useRef(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [ping, setPing] = useState(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      setVisible(hero.getBoundingClientRect().bottom > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fn = () => {
      const ids = SECTIONS.map(s => s.id);
      let current = "hero";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.55) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const SIZE = canvas.width;
    const cx = SIZE / 2, cy = SIZE / 2;
    const r = SIZE / 2 - 2;

    ctx.clearRect(0, 0, SIZE, SIZE);

    // Clip to circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    // Dark background
    ctx.fillStyle = "rgba(4,4,3,0.92)";
    ctx.fillRect(0, 0, SIZE, SIZE);

    // Grid lines
    ctx.strokeStyle = "rgba(200,160,64,0.06)";
    ctx.lineWidth = 0.5;
    for (let i = 1; i < 4; i++) {
      const v = SIZE * i / 4;
      ctx.beginPath(); ctx.moveTo(v, 0); ctx.lineTo(v, SIZE); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, v); ctx.lineTo(SIZE, v); ctx.stroke();
    }

    // Rings
    [0.3, 0.6, 0.9].forEach(fr => {
      ctx.beginPath();
      ctx.arc(cx, cy, r * fr, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(200,160,64,${fr * 0.07})`;
      ctx.stroke();
    });

    // Cross
    ctx.strokeStyle = "rgba(200,160,64,0.1)";
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, SIZE); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(SIZE, cy); ctx.stroke();

    // Section dots
    SECTIONS.forEach(sec => {
      const sx = sec.x * SIZE;
      const sy = sec.y * SIZE;
      const isActive = sec.id === activeSection;

      if (isActive) {
        ctx.beginPath();
        ctx.arc(sx, sy, 7, 0, Math.PI * 2);
        ctx.fillStyle = sec.color + "22";
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(sx, sy, isActive ? 3.5 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? sec.color : sec.color + "70";
      ctx.fill();

      ctx.fillStyle = isActive ? "#E8E0D0" : "rgba(232,224,208,0.35)";
      ctx.font = `${isActive ? "bold " : ""}7px 'Share Tech Mono', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(sec.label, sx, sy - 10);
    });

    // Player marker (center)
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#C8A040";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(200,160,64,0.5)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Ping
    if (ping) {
      const px = ping.x * SIZE, py = ping.y * SIZE;
      const elapsed = (Date.now() - ping.t) / 1000;
      const pr = elapsed * 20;
      if (pr < 20) {
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(204,85,0,${Math.max(0, 1 - elapsed / 1)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    ctx.restore();
  }, [activeSection, ping]);

  const handleClick = () => {
    const idx = SECTIONS.findIndex(s => s.id === activeSection);
    const next = SECTIONS[(idx + 1) % SECTIONS.length];
    const el = document.getElementById(next.id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setPing({ x: next.x, y: next.y, t: Date.now() });
    setTimeout(() => setPing(null), 1200);
  };

  return (
    <div style={{
      position: "fixed", bottom: "20px", left: "20px", zIndex: 40,
      cursor: "none", userSelect: "none",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 0.4s ease, transform 0.4s ease",
      pointerEvents: visible ? "auto" : "none",
    }} className="cod-minimap-wrap">
      <div style={{ position: "relative" }}>
        {/* Outer frame */}
        <div style={{
          position: "absolute", inset: "-4px",
          border: "1px solid rgba(200,160,64,0.22)",
          borderRadius: "50%",
          pointerEvents: "none",
        }} />
        <canvas
          ref={canvasRef}
          width={110}
          height={110}
          onClick={handleClick}
          style={{ borderRadius: "50%", display: "block" }}
        />
        {/* Label */}
        <div style={{
          position: "absolute", bottom: "-18px", left: "50%", transform: "translateX(-50%)",
          fontFamily: "'Share Tech Mono',monospace",
          fontSize: "0.42rem", color: "rgba(200,160,64,0.45)",
          letterSpacing: "0.1em", whiteSpace: "nowrap",
        }}>TACTICAL MAP</div>
      </div>
      <style>{`@media(max-width:600px){.cod-minimap-wrap{display:none}}`}</style>
    </div>
  );
};
