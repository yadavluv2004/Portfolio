import React, { useState, useEffect } from "react";

const WEAPONS = [
  { name: "React Launcher", icon: "⚛️", desc: "Launches high-performance UI components" },
  { name: "Node Sabre", icon: "🟢", desc: "Slices through backend logic instantly" },
  { name: "Tailwind Shield", icon: "🎨", desc: "Absorbs layout styles and aesthetics" },
  { name: "TypeScript Sniper", icon: "🔷", desc: "Targets runtime errors before compile" },
  { name: "Three.js Blaster", icon: "🌐", desc: "Projects gorgeous 3D realities" }
];

export const GtaHud = () => {
  const [cash, setCash] = useState(2026100);
  const [activeWeaponIdx, setActiveWeaponIdx] = useState(0);
  const [timeStr, setTimeStr] = useState("12:00");
  const [wantedFlicker, setWantedFlicker] = useState(false);

  // Sync clock
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, "0");
      const m = String(d.getMinutes()).padStart(2, "0");
      setTimeStr(`${h}:${m}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Cash count up micro-animation on scroll or load
  useEffect(() => {
    const target = 2026100 + Math.floor(Math.random() * 899);
    const id = setInterval(() => {
      setCash((prev) => {
        if (prev >= target) {
          clearInterval(id);
          return target;
        }
        return prev + Math.floor(Math.random() * 15) + 1;
      });
    }, 45);
    return () => clearInterval(id);
  }, []);

  // Weapon wheel cycle
  useEffect(() => {
    const id = setInterval(() => {
      setActiveWeaponIdx((prev) => (prev + 1) % WEAPONS.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  // Flicker wanted stars occasionally
  useEffect(() => {
    const id = setInterval(() => {
      setWantedFlicker(true);
      setTimeout(() => setWantedFlicker(false), 800);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  const activeWeapon = WEAPONS[activeWeaponIdx];

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "12px",
        pointerEvents: "none",
        fontFamily: "'Pricedown', 'Space Grotesk', sans-serif"
      }}
      className="gta-hud-container"
    >
      {/* Clock, Weapon Slot, and Cash */}
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
        
        {/* Weapon Wheel Active Slot */}
        <div
          style={{
            width: "82px",
            height: "82px",
            background: "rgba(12, 8, 24, 0.85)",
            border: "3px solid #00E5FF",
            borderRadius: "14px",
            boxShadow: "0 0 20px rgba(0, 229, 255, 0.4), inset 0 0 10px rgba(0, 229, 255, 0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            pointerEvents: "all",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          title={`${activeWeapon.name}: ${activeWeapon.desc}`}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#FF2D78";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 45, 120, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#00E5FF";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 229, 255, 0.4)";
          }}
        >
          <div style={{ fontSize: "2rem", filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))" }}>
            {activeWeapon.icon}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "4px",
              fontSize: "0.58rem",
              fontFamily: "'JetBrains Mono', monospace",
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              textAlign: "center",
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              padding: "0 4px"
            }}
          >
            {activeWeapon.name.split(" ")[0]}
          </div>
        </div>

        {/* Info Grid (Clock, Cash, Status) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
          
          {/* Clock */}
          <div
            style={{
              fontSize: "2.4rem",
              color: "#FFD700",
              textShadow: "3px 3px 0px #000, 0 0 12px rgba(255,215,0,0.5)",
              lineHeight: "1.0",
              letterSpacing: "0.04em",
              fontWeight: 900
            }}
          >
            {timeStr}
          </div>

          {/* Cash Display */}
          <div
            style={{
              fontSize: "2.5rem",
              color: "#22C55E",
              textShadow: "3px 3px 0px #000, 0 0 15px rgba(34,197,94,0.4)",
              lineHeight: "1.0",
              fontWeight: 900,
              letterSpacing: "0.02em",
              marginTop: "4px"
            }}
          >
            ${cash.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Health & Armor Bars */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          width: "180px",
          background: "rgba(0,0,0,0.6)",
          padding: "6px 8px",
          borderRadius: "6px",
          border: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        {/* Health (Red) */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "#EF4444", fontSize: "0.52rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, width: "20px" }}>HP</span>
          <div style={{ flex: 1, height: "8px", background: "#450A0A", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ width: "100%", height: "100%", background: "#EF4444", boxShadow: "0 0 8px #EF4444" }} />
          </div>
        </div>

        {/* Armor (Blue) */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ color: "#3B82F6", fontSize: "0.52rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, width: "20px" }}>ARM</span>
          <div style={{ flex: 1, height: "8px", background: "#172554", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ width: "93.9%", height: "100%", background: "#3B82F6", boxShadow: "0 0 8px #3B82F6" }} />
          </div>
        </div>
      </div>

      {/* Wanted Level Stars */}
      <div style={{ display: "flex", gap: "4px", marginTop: "2px" }}>
        {[1, 2, 3, 4, 5, 6].map((star) => {
          const isWanted = star <= 5;
          const flickerStar = wantedFlicker && star === 5;
          return (
            <span
              key={star}
              style={{
                fontSize: "1.4rem",
                color: isWanted ? (flickerStar ? "rgba(0,0,0,0.2)" : "#FFD700") : "rgba(255,255,255,0.15)",
                textShadow: isWanted && !flickerStar ? "2px 2px 0px #000, 0 0 10px rgba(255,215,0,0.6)" : "none",
                transition: "color 0.2s ease"
              }}
            >
              ★
            </span>
          );
        })}
      </div>

      {/* Responsive Style Tag */}
      <style>{`
        @media (max-width: 600px) {
          .gta-hud-container {
            top: 10px !important;
            right: 10px !important;
            transform: scale(0.85);
            transform-origin: top right;
          }
        }
      `}</style>
    </div>
  );
};
