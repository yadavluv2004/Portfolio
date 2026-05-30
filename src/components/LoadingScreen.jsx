import React, { useEffect, useState } from "react";

const BRIEFINGS = [
  "INTEL: Operator Luv Yadav specializes in React, Node.js, and TypeScript.",
  "CLASSIFIED: Target is a Full-Stack Engineer with 93.9% academic performance.",
  "OBJECTIVE: Review portfolio and initiate contact with the operator.",
  "SITREP: Operator currently deployed at Xebo.ai — building AI-powered systems.",
  "INTEL: 10+ missions completed, 15+ weapons in the loadout.",
  "COMMS: Scroll to navigate the tactical overview of operator capabilities.",
];

const LoadingScreen = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [tipIdx, setTipIdx] = useState(0);
  const [fade, setFade] = useState(false);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const pTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(pTimer); return 100; }
        return p + Math.floor(Math.random() * 3) + 1;
      });
    }, 28);

    const tTimer = setInterval(() => setTipIdx((i) => (i + 1) % BRIEFINGS.length), 3000);
    const dTimer = setInterval(() => setDots((d) => d.length >= 3 ? "." : d + "."), 400);

    const doneTimer = setTimeout(() => {
      setFade(true);
      setTimeout(onDone, 600);
    }, 2800);

    return () => {
      clearInterval(pTimer);
      clearInterval(tTimer);
      clearInterval(dTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10000,
      background: "#060604",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: fade ? 0 : 1,
      transition: "opacity 0.6s ease",
      pointerEvents: fade ? "none" : "all",
      fontFamily: "'Rajdhani', sans-serif",
      overflow: "hidden",
    }}>
      {/* Tactical grid background */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.07,
        backgroundImage: "linear-gradient(rgba(200,160,64,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,160,64,0.5) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
      }} />

      {/* Corner brackets */}
      {[
        { top: "24px", left: "24px", borderTop: "2px solid rgba(200,160,64,0.6)", borderLeft: "2px solid rgba(200,160,64,0.6)", width: "40px", height: "40px" },
        { top: "24px", right: "24px", borderTop: "2px solid rgba(200,160,64,0.6)", borderRight: "2px solid rgba(200,160,64,0.6)", width: "40px", height: "40px" },
        { bottom: "24px", left: "24px", borderBottom: "2px solid rgba(200,160,64,0.6)", borderLeft: "2px solid rgba(200,160,64,0.6)", width: "40px", height: "40px" },
        { bottom: "24px", right: "24px", borderBottom: "2px solid rgba(200,160,64,0.6)", borderRight: "2px solid rgba(200,160,64,0.6)", width: "40px", height: "40px" },
      ].map((s, i) => (
        <div key={i} style={{ position: "absolute", pointerEvents: "none", ...s }} />
      ))}

      {/* Top status bar */}
      <div style={{
        position: "absolute", top: "24px", left: "80px", right: "80px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: "0.62rem", letterSpacing: "0.18em",
        color: "rgba(200,160,64,0.45)", textTransform: "uppercase",
      }}>
        <span>SECURE CHANNEL ESTABLISHED</span>
        <span style={{ color: "#5CB85C" }}>● ONLINE</span>
        <span>SYS v2.4.1</span>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "28px", zIndex: 10, width: "90%", maxWidth: "500px" }}>

        {/* Crosshair */}
        <div style={{ position: "relative", width: "64px", height: "64px" }}>
          <div style={{
            position: "absolute", inset: 0,
            border: "1.5px solid rgba(200,160,64,0.3)",
            borderRadius: "50%",
          }} />
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0, height: "1px",
            background: "rgba(200,160,64,0.5)", transform: "translateY(-50%)",
          }} />
          <div style={{
            position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px",
            background: "rgba(200,160,64,0.5)", transform: "translateX(-50%)",
          }} />
          <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            width: "6px", height: "6px", borderRadius: "50%",
            background: "#C8A040",
            boxShadow: "0 0 12px #C8A040",
            animation: "pulse-dot 1.5s ease-in-out infinite",
          }} />
        </div>

        {/* Title */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.6rem", letterSpacing: "0.3em",
            color: "rgba(200,160,64,0.5)",
            marginBottom: "10px", textTransform: "uppercase",
          }}>TACTICAL PORTFOLIO — OPERATOR FILE</div>
          <h1 style={{
            fontFamily: "'Rajdhani', 'Oswald', sans-serif",
            fontSize: "clamp(2.4rem, 7vw, 4.5rem)",
            color: "#E8E0D0",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 700,
            lineHeight: 1,
            marginBottom: "6px",
            textShadow: "0 0 30px rgba(200,160,64,0.3)",
          }}>
            LUV YADAV
          </h1>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.72rem", letterSpacing: "0.2em",
            color: "#C8A040",
            textTransform: "uppercase",
          }}>
            SOFTWARE ENGINEER — ACTIVE DUTY
          </div>
        </div>

        {/* Loading status */}
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.8rem", color: "#5CB85C",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          LOADING ASSETS{dots} {Math.min(progress, 100)}%
        </div>

        {/* Progress bar */}
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.55rem", color: "rgba(200,160,64,0.5)", letterSpacing: "0.1em" }}>INTEL DOWNLOAD</span>
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.55rem", color: "#C8A040", letterSpacing: "0.1em" }}>{Math.min(progress, 100)}%</span>
          </div>
          <div style={{
            height: "4px",
            background: "rgba(200,160,64,0.1)",
            border: "1px solid rgba(200,160,64,0.25)",
            overflow: "hidden",
            position: "relative",
          }}>
            <div style={{
              height: "100%",
              width: `${Math.min(progress, 100)}%`,
              background: "linear-gradient(90deg, #8B1A1A, #C8A040)",
              boxShadow: "0 0 10px rgba(200,160,64,0.6)",
              transition: "width 0.1s ease-out",
            }} />
          </div>
          {/* Tick marks */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
            {[0, 25, 50, 75, 100].map(v => (
              <span key={v} style={{
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: "0.48rem", color: "rgba(200,160,64,0.3)", letterSpacing: "0",
              }}>{v}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Intel tip at bottom */}
      <div style={{
        position: "absolute", bottom: "50px",
        width: "90%", maxWidth: "600px",
        background: "rgba(13,14,11,0.9)",
        borderLeft: "3px solid #8B1A1A",
        padding: "14px 20px",
        display: "flex", gap: "12px", alignItems: "flex-start",
      }}>
        <span style={{
          fontFamily: "'Share Tech Mono',monospace",
          fontSize: "0.6rem", color: "#8B1A1A",
          letterSpacing: "0.1em", whiteSpace: "nowrap", paddingTop: "2px",
        }}>▶ INTEL</span>
        <div style={{
          fontFamily: "'Share Tech Mono',monospace",
          fontSize: "0.72rem",
          color: "rgba(232,224,208,0.75)",
          lineHeight: 1.55,
          letterSpacing: "0.04em",
        }}>
          {BRIEFINGS[tipIdx]}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
