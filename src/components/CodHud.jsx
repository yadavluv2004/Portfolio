import { useEffect, useState } from "react";

const KILL_FEED = [
  { msg: "MeetHive — WebRTC ops deployed",       color: "#C8A040" },
  { msg: "StayNest — full-stack mission cleared", color: "#5CB85C" },
  { msg: "Simon Says — logic challenge won",      color: "#CC5500" },
  { msg: "TypeScript — +20 XP earned",            color: "#C8A040" },
  { msg: "CI/CD pipeline — automated success",    color: "#5CB85C" },
];

export const CodHud = () => {
  const [time, setTime] = useState("");
  const [killIdx, setKillIdx] = useState(0);
  const [xp, setXp] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Hide HUD when user scrolls past the hero section
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const { bottom } = hero.getBoundingClientRect();
      setVisible(bottom > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`);
    };
    tick();
    const t = setInterval(tick, 60000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setKillIdx(i => (i + 1) % KILL_FEED.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setXp(x => Math.min(x + 1, 87)), 80);
    return () => clearInterval(t);
  }, []);

  if (isMobile) return null;

  return (
    <div style={{
      position: "fixed", top: 0, right: 0, zIndex: 40, pointerEvents: "none",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(-12px)",
      transition: "opacity 0.4s ease, transform 0.4s ease",
    }}>
      {/* Top-right panel */}
      <div style={{
        margin: "72px 16px 0 0",
        background: "rgba(6,6,4,0.85)",
        border: "1px solid rgba(200,160,64,0.22)",
        borderRadius: "1px",
        padding: "10px 14px",
        minWidth: "180px",
        backdropFilter: "blur(8px)",
        fontFamily: "'Share Tech Mono',monospace",
      }}>
        {/* Clock */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", borderBottom: "1px solid rgba(200,160,64,0.12)", paddingBottom: "8px" }}>
          <span style={{ fontSize: "0.52rem", color: "rgba(232,224,208,0.35)", letterSpacing: "0.1em" }}>LOCAL</span>
          <span style={{ fontSize: "0.88rem", color: "#C8A040", letterSpacing: "0.12em" }}>{time}</span>
        </div>

        {/* XP bar */}
        <div style={{ marginBottom: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <span style={{ fontSize: "0.48rem", color: "rgba(232,224,208,0.3)", letterSpacing: "0.1em" }}>XP</span>
            <span style={{ fontSize: "0.52rem", color: "#C8A040" }}>{xp}/100</span>
          </div>
          <div style={{ height: "3px", background: "rgba(200,160,64,0.1)" }}>
            <div style={{
              height: "100%", width: `${xp}%`,
              background: "linear-gradient(90deg, #8B1A1A, #C8A040)",
              boxShadow: "0 0 6px rgba(200,160,64,0.5)",
              transition: "width 0.1s ease",
            }} />
          </div>
        </div>

        {/* Health / Armor */}
        {[
          { label: "HP", value: 100, color: "#5CB85C" },
          { label: "AR", value: 93,  color: "#C8A040" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ marginBottom: "5px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
              <span style={{ fontSize: "0.46rem", color: "rgba(232,224,208,0.3)", letterSpacing: "0.1em" }}>{label}</span>
              <span style={{ fontSize: "0.5rem", color }}>{value}%</span>
            </div>
            <div style={{ height: "2px", background: "rgba(255,255,255,0.06)" }}>
              <div style={{ height: "100%", width: `${value}%`, background: color, boxShadow: `0 0 4px ${color}80` }} />
            </div>
          </div>
        ))}

        {/* Ammo */}
        <div style={{
          marginTop: "8px", paddingTop: "8px",
          borderTop: "1px solid rgba(200,160,64,0.1)",
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
        }}>
          <span style={{ fontSize: "0.46rem", color: "rgba(232,224,208,0.25)", letterSpacing: "0.1em" }}>AMMO</span>
          <div style={{ display: "flex", gap: "2px", alignItems: "baseline" }}>
            <span style={{ fontSize: "0.88rem", color: "#E8E0D0", fontWeight: 700 }}>30</span>
            <span style={{ fontSize: "0.44rem", color: "rgba(232,224,208,0.3)" }}>/ 120</span>
          </div>
        </div>
      </div>

      {/* Kill feed */}
      <div style={{
        margin: "8px 16px 0 0",
        background: "rgba(6,6,4,0.75)",
        borderLeft: "2px solid #8B1A1A",
        padding: "7px 12px",
        fontFamily: "'Share Tech Mono',monospace",
        maxWidth: "260px",
      }}>
        <div style={{ fontSize: "0.44rem", color: "rgba(232,224,208,0.28)", letterSpacing: "0.14em", marginBottom: "4px" }}>KILL FEED</div>
        <div style={{
          fontSize: "0.6rem",
          color: KILL_FEED[killIdx].color,
          letterSpacing: "0.05em",
          transition: "color 0.3s ease",
          lineHeight: 1.4,
        }}>
          ▸ {KILL_FEED[killIdx].msg}
        </div>
      </div>
    </div>
  );
};
