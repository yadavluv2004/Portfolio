import React, { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "hero",       label: "H", name: "Home",       x: 0,    y: 0 },
  { id: "about",      label: "A", name: "About",      x: -45,  y: -50 },
  { id: "experience", label: "E", name: "Experience", x: 30,   y: -110 },
  { id: "skills",     label: "S", name: "Skills",     x: -55,  y: -170 },
  { id: "projects",   label: "P", name: "Projects",   x: 40,   y: -230 },
  { id: "contact",    label: "C", name: "Contact",    x: 0,    y: -300 }
];

export const GtaMinimap = () => {
  const canvasRef = useRef(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track active section and scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      setScrollProgress(progress);

      // Determine active section
      let currentSection = "hero";
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            currentSection = section.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Draw Radar Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Interpolate player position along the section coordinates based on scroll progress
      const totalSegs = SECTIONS.length - 1;
      const segProgress = scrollProgress * totalSegs;
      const segIndex = Math.min(Math.floor(segProgress), totalSegs - 1);
      const segAlpha = segProgress - segIndex;

      const p1 = SECTIONS[segIndex];
      const p2 = SECTIONS[segIndex + 1];

      // Current player position on map
      const playerX = p1.x + (p2.x - p1.x) * segAlpha;
      const playerY = p1.y + (p2.y - p1.y) * segAlpha;

      // Draw Radar Background
      ctx.save();
      ctx.translate(w / 2, h / 2);
      
      // Radar clipping path (circular radar)
      ctx.beginPath();
      ctx.arc(0, 0, w / 2 - 8, 0, Math.PI * 2);
      ctx.clip();

      // Draw map background grid
      ctx.fillStyle = "#0c0818";
      ctx.fillRect(-w, -h, w * 2, h * 2);

      // Rotate map based on scroll to make it dynamic
      const mapRotation = scrollProgress * Math.PI * 0.5;
      ctx.rotate(-mapRotation);

      // Draw stylized road networks (lines)
      ctx.strokeStyle = "rgba(255, 45, 120, 0.15)";
      ctx.lineWidth = 14;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Draw road loop connecting all sections
      ctx.beginPath();
      SECTIONS.forEach((s, idx) => {
        // Map offset relative to player
        const mx = s.x - playerX;
        const my = s.y - playerY;
        if (idx === 0) ctx.moveTo(mx, my);
        else ctx.lineTo(mx, my);
      });
      ctx.stroke();

      // Draw secondary road grid lanes
      ctx.strokeStyle = "rgba(0, 229, 255, 0.08)";
      ctx.lineWidth = 8;
      ctx.beginPath();
      for (let offset = -200; offset <= 200; offset += 60) {
        ctx.moveTo(-200 - playerX, offset - playerY);
        ctx.lineTo(200 - playerX, offset - playerY);
        ctx.moveTo(offset - playerX, -200 - playerY);
        ctx.lineTo(offset - playerX, 200 - playerY);
      }
      ctx.stroke();

      // Draw section landmarks (glowing letters)
      SECTIONS.forEach((s) => {
        const mx = s.x - playerX;
        const my = s.y - playerY;
        const isActive = activeSection === s.id;

        // Landmark circle
        ctx.beginPath();
        ctx.arc(mx, my, 11, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? "#FF2D78" : "rgba(12,8,24,0.9)";
        ctx.strokeStyle = isActive ? "#00E5FF" : "rgba(255,255,255,0.4)";
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();

        // Landmark Text label
        ctx.fillStyle = isActive ? "#FFFFFF" : "rgba(255,255,255,0.7)";
        ctx.font = "bold 10px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.label, mx, my);
      });

      ctx.restore();

      // Draw Radar circular border (GTA style)
      ctx.strokeStyle = "#FF2D78";
      ctx.lineWidth = 4;
      ctx.shadowColor = "#FF2D78";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, w / 2 - 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Draw outer dark rim
      ctx.strokeStyle = "#080808";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, w / 2 - 2, 0, Math.PI * 2);
      ctx.stroke();

      // Draw player arrow in the center (static facing up, or wiggling)
      ctx.save();
      ctx.translate(w / 2, h / 2);
      // Subtle pulse scale
      const scale = 1.0 + Math.sin(Date.now() * 0.007) * 0.08;
      ctx.scale(scale, scale);

      ctx.shadowColor = "#00E5FF";
      ctx.shadowBlur = 8;

      ctx.fillStyle = "#00E5FF";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 1.5;
      
      // Arrow shape
      ctx.beginPath();
      ctx.moveTo(0, -9);
      ctx.lineTo(7, 8);
      ctx.lineTo(0, 3);
      ctx.lineTo(-7, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [scrollProgress, activeSection]);

  // Click handler to scroll to section
  const handleMapClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left - canvas.width / 2;
    const cy = e.clientY - rect.top - canvas.height / 2;

    // Find nearest section marker on map based on approximate distance
    // (Simply cycles through sections for intuitive clicks, or cycles to next section)
    const targetIdx = (SECTIONS.findIndex(s => s.id === activeSection) + 1) % SECTIONS.length;
    const targetId = SECTIONS[targetIdx].id;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "32px",
        left: "32px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        pointerEvents: "none",
        fontFamily: "'Space Grotesk', sans-serif"
      }}
      className="gta-minimap-container"
    >
      {/* Radar Map */}
      <div style={{ position: "relative", pointerEvents: "all", cursor: "crosshair" }} onClick={handleMapClick}>
        <canvas
          ref={canvasRef}
          width={132}
          height={132}
          style={{
            display: "block",
            borderRadius: "50%",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)"
          }}
        />
        {/* Active Section text display */}
        <div
          style={{
            position: "absolute",
            bottom: "-2px",
            right: "-20px",
            background: "rgba(12,8,24,0.92)",
            border: "1.5px solid #FF2D78",
            boxShadow: "0 0 10px rgba(255,45,120,0.3)",
            borderRadius: "4px",
            padding: "2px 8px",
            fontSize: "0.58rem",
            color: "#FFF",
            fontFamily: "'JetBrains Mono', monospace",
            textTransform: "uppercase",
            letterSpacing: "0.08em"
          }}
        >
          {activeSection}
        </div>
      </div>

      {/* Mini health & armor bar beneath radar (GTA SA layout!) */}
      <div
        style={{
          width: "132px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          background: "rgba(12,8,24,0.85)",
          padding: "5px",
          borderRadius: "5px",
          border: "1.5px solid rgba(255,45,120,0.25)"
        }}
      >
        <div style={{ display: "flex", gap: "2px" }}>
          {/* Health bar */}
          <div style={{ flex: 1, height: "6px", background: "#450A0A", borderRadius: "1px", overflow: "hidden" }}>
            <div style={{ width: "100%", height: "100%", background: "#EF4444" }} />
          </div>
          {/* Armor bar */}
          <div style={{ flex: 1, height: "6px", background: "#172554", borderRadius: "1px", overflow: "hidden" }}>
            <div style={{ width: "93.9%", height: "100%", background: "#3B82F6" }} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .gta-minimap-container {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
