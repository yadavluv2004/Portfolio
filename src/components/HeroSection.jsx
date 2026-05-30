import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
// CodCharacterCanvas replaced by real image
const roles = ["Software Engineer", "Full Stack Developer", "React Specialist", "Problem Solver"];

/* ─── COD Character Panel ─── */
function CharacterPanel() {
  return (
    <div
      className="cod-char-panel"
      style={{
        position: "absolute", top: 0, right: 0, bottom: 0,
        width: "72vw",
        maxWidth: "980px",
        zIndex: 1, overflow: "hidden", pointerEvents: "none",
        background: "transparent",
      }}
    >
      {/* COD Operator image — large, fills the panel */}
      <img
        src="/Gemini_Generated_Image_nfqc4xnfqc4xnfqc.png"
        alt="COD Operator"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          filter: "brightness(1.12) contrast(1.3) saturate(0.8) drop-shadow(0 0 60px rgba(0,220,50,0.35))",
          zIndex: 1,
        }}
      />

      {/* Oval vignette — masks gray bg at edges, keeps big character in center visible */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "radial-gradient(ellipse 58% 72% at 55% 50%, transparent 0%, transparent 48%, rgba(8,8,8,0.78) 68%, rgba(8,8,8,0.96) 84%, #080808 100%)",
      }} />

      {/* Green COD glow atmosphere */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
        background: "linear-gradient(110deg, rgba(0,255,65,0.1) 0%, rgba(0,180,40,0.04) 30%, transparent 52%)",
      }} />

      {/* Vertical green light streaks */}
      {[
        { left: "18%", w: "2.5px", opacity: 0.7,  blur: 3,  delay: "0s"   },
        { left: "21%", w: "18px",  opacity: 0.16, blur: 12, delay: "0.5s" },
        { left: "28%", w: "2px",   opacity: 0.52, blur: 2,  delay: "1s"   },
        { left: "31%", w: "26px",  opacity: 0.09, blur: 16, delay: "1.5s" },
        { left: "38%", w: "1.5px", opacity: 0.38, blur: 2,  delay: "2s"   },
        { left: "46%", w: "1px",   opacity: 0.22, blur: 2,  delay: "2.5s" },
      ].map((s, i) => (
        <div key={i} style={{
          position: "absolute", top: 0, left: s.left, width: s.w, height: "100%",
          background: "linear-gradient(180deg,transparent 0%,#00FF41 20%,#39FF14 55%,#00CC33 82%,transparent 100%)",
          opacity: s.opacity, filter: `blur(${s.blur}px)`,
          animation: `streakPulse 4.5s ease-in-out ${s.delay} infinite`,
          pointerEvents: "none", zIndex: 4,
        }} />
      ))}

      {/* Amber right rim */}
      <div style={{
        position: "absolute", top: 0, right: "5%", width: "2px", height: "100%",
        background: "linear-gradient(180deg,transparent 0%,#C8A040 25%,#C8A040 75%,transparent 100%)",
        opacity: 0.35, filter: "blur(3px)", zIndex: 4, pointerEvents: "none",
      }} />

      {/* Scan lines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5,
        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.05) 3px,rgba(0,0,0,0.05) 4px)",
      }} />

      {/* Left/top/bottom fades to blend into page */}
      {/* Outer edge fades */}
      <div style={{ position:"absolute", top:0, left:0, bottom:0, width:"18%", zIndex:6, pointerEvents:"none", background:"linear-gradient(90deg,#080808 0%,transparent 100%)" }} />
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"7%", zIndex:6, pointerEvents:"none", background:"linear-gradient(180deg,#080808 0%,transparent 100%)" }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"6%", zIndex:6, pointerEvents:"none", background:"linear-gradient(0deg,#080808 0%,transparent 100%)" }} />
      <div style={{ position:"absolute", top:0, right:0, bottom:0, width:"8%", zIndex:6, pointerEvents:"none", background:"linear-gradient(270deg,#080808 0%,transparent 100%)" }} />

      {/* Tactical corner brackets */}
      {[
        { top: "14px",    left: "14px",  borderTop: "2px solid rgba(0,255,65,0.55)", borderLeft: "2px solid rgba(0,255,65,0.55)",     width: "26px", height: "26px" },
        { top: "14px",    right: "14px", borderTop: "2px solid rgba(0,255,65,0.55)", borderRight: "2px solid rgba(0,255,65,0.55)",    width: "26px", height: "26px" },
        { bottom: "14px", left: "14px",  borderBottom: "2px solid rgba(0,255,65,0.55)", borderLeft: "2px solid rgba(0,255,65,0.55)", width: "26px", height: "26px" },
        { bottom: "14px", right: "14px", borderBottom: "2px solid rgba(0,255,65,0.55)", borderRight: "2px solid rgba(0,255,65,0.55)",width: "26px", height: "26px" },
      ].map((s, i) => (
        <div key={i} style={{ position: "absolute", pointerEvents: "none", zIndex: 6, ...s }} />
      ))}

      {/* Top HUD label */}
      <div style={{
        position: "absolute", top: "18px", left: "50px", right: "50px", zIndex: 7,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.48rem", color: "rgba(0,255,65,0.6)", letterSpacing: "0.2em" }}>◈ OPERATOR FILE</span>
        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.44rem", color: "rgba(200,160,64,0.5)", letterSpacing: "0.12em" }}>ID#2026-LY</span>
      </div>

      {/* Right tick marks */}
      <div style={{
        position: "absolute", top: "75px", right: "16px", bottom: "75px", zIndex: 7,
        display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end",
      }}>
        {[100, 80, 60, 40, 20, 0].map(v => (
          <div key={v} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.34rem", color: "rgba(0,255,65,0.28)" }}>{v}</span>
            <div style={{ width: v % 40 === 0 ? "8px" : "4px", height: "1px", background: "rgba(0,255,65,0.2)" }} />
          </div>
        ))}
      </div>

      {/* Bottom callsign block */}
      <div style={{ position: "absolute", bottom: "18px", left: "50px", right: "50px", zIndex: 7 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#5CB85C", boxShadow: "0 0 6px #5CB85C", display: "inline-block", animation: "pulse-dot 2s infinite" }} />
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.46rem", color: "#5CB85C", letterSpacing: "0.12em" }}>ACTIVE DUTY</span>
          </div>
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.44rem", color: "rgba(200,160,64,0.4)", letterSpacing: "0.1em" }}>XEBO.AI OPS</span>
        </div>
        <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(0,255,65,0.45), rgba(200,160,64,0.25), transparent)", marginBottom: "7px" }} />
        <div style={{ display: "flex", gap: "20px" }}>
          {[{ label: "CALLSIGN", value: "LUV.DEV" }, { label: "RANK", value: "SWE-IV" }, { label: "OPS", value: "10+ DONE" }].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.38rem", color: "rgba(232,224,208,0.25)", letterSpacing: "0.1em", marginBottom: "2px" }}>{label}</div>
              <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.68rem", fontWeight: 700, color: "#C8A040", letterSpacing: "0.08em" }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Hero Section ─── */
const HeroSection = () => {
  const [roleIdx,   setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting,  setDeleting]  = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let to;
    if (!deleting && displayed.length < current.length) {
      to = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === current.length) {
      to = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      to = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else {
      setDeleting(false);
      setRoleIdx((p) => (p + 1) % roles.length);
    }
    return () => clearTimeout(to);
  }, [displayed, deleting, roleIdx]);

  return (
    <section id="hero" style={{
      minHeight: "100vh", position: "relative",
      overflow: "hidden", display: "flex", alignItems: "center",
      background: "transparent",
    }}>
      {/* Ambient bg */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(200,160,64,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(200,160,64,0.022) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)",
        }} />
      </div>

      {/* COD Character Panel */}
      <CharacterPanel />

      {/* Left text content fade */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(90deg, #080808 0%, #080808 22%, rgba(8,8,8,0.85) 36%, rgba(8,8,8,0.2) 48%, transparent 60%)",
      }} />

      {/* Text content */}
      <div className="container" style={{ position: "relative", zIndex: 3, paddingTop: "96px", paddingBottom: "64px" }}>
        <div style={{ maxWidth: "580px" }}>

          {/* Status chip */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "5px 16px",
            background: "rgba(92,184,92,0.07)", border: "1px solid rgba(92,184,92,0.35)",
            fontSize: "0.68rem", color: "#5CB85C",
            fontFamily: "'Share Tech Mono',monospace", letterSpacing: "0.14em",
            marginBottom: "28px", opacity: 0, animation: "fade-up 0.7s ease 0.2s forwards",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#5CB85C", animation: "pulse-dot 2s ease-in-out infinite", display: "inline-block" }} />
            OPERATOR STATUS: ACTIVE DUTY
          </div>

          {/* Name */}
          <div style={{ opacity: 0, animation: "fade-up 0.7s ease 0.4s forwards" }}>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "clamp(0.56rem,1.3vw,0.7rem)", color: "rgba(232,224,208,0.3)", letterSpacing: "0.22em", marginBottom: "10px", textTransform: "uppercase" }}>
              ▶ MISSION BRIEFING / OPERATOR IDENTIFIED
            </div>
            <h1 style={{
              fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 700, lineHeight: 1,
              letterSpacing: "0.06em", textTransform: "uppercase", color: "#E8E0D0", marginBottom: "4px",
              animation: "glitch 8s ease-in-out 2s infinite",
              textShadow: "0 0 40px rgba(200,160,64,0.18), 4px 4px 0 rgba(0,0,0,0.9)",
              fontFamily: "'Rajdhani','Oswald',sans-serif",
            }}>LUV YADAV</h1>
          </div>

          {/* Typewriter */}
          <div style={{
            fontSize: "clamp(0.92rem,2.1vw,1.38rem)", fontWeight: 600, marginBottom: "22px", minHeight: "2.1rem",
            display: "flex", alignItems: "center", gap: "3px",
            opacity: 0, animation: "fade-up 0.7s ease 0.6s forwards",
            fontFamily: "'Rajdhani',sans-serif", letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            <span className="gradient-text">{displayed}</span>
            <span style={{ color: "#C8A040", fontWeight: 300, animation: "cursor-blink 1s step-end infinite" }}>|</span>
          </div>

          {/* Description */}
          <p style={{
            fontSize: "clamp(0.84rem,1.5vw,0.95rem)", color: "rgba(232,224,208,0.5)", lineHeight: 1.8, marginBottom: "34px",
            maxWidth: "470px", opacity: 0, animation: "fade-up 0.7s ease 0.8s forwards",
            fontFamily: "'Rajdhani',sans-serif", fontWeight: 500, letterSpacing: "0.03em",
          }}>
            Building next-gen web applications at{" "}
            <span style={{ color: "#C8A040", fontWeight: 700 }}>Xebo.ai</span>.
            Specialised in clean architecture, exceptional UX, and scalable systems.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "44px", opacity: 0, animation: "fade-up 0.7s ease 1.0s forwards" }}>
            <a href="#projects" className="cyber-btn-filled" style={{ padding: "12px 26px" }}>▶ VIEW OPERATIONS</a>
            <a href="/Luv-Yadav.pdf" download className="cyber-btn" style={{ padding: "12px 26px" }}>↓ DOWNLOAD DOSSIER</a>
          </div>

          {/* Stats */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4,1fr)",
            borderTop: "1px solid rgba(200,160,64,0.13)",
            paddingTop: "22px", marginBottom: "30px",
            opacity: 0, animation: "fade-up 0.7s ease 1.2s forwards",
          }}>
            {[
              { v: "10+",   l: "Missions",   color: "#5CB85C" },
              { v: "1+",    l: "Yrs Active", color: "#C8A040" },
              { v: "15+",   l: "Weapons",    color: "#CC5500" },
              { v: "93.9%", l: "Accuracy",   color: "#C8A040" },
            ].map(({ v, l, color }, i) => (
              <div key={l} style={{ textAlign: "center", borderRight: i < 3 ? "1px solid rgba(200,160,64,0.09)" : "none", padding: "0 6px" }}>
                <div style={{ fontSize: "clamp(1.1rem,2vw,1.6rem)", fontWeight: 700, lineHeight: 1, fontFamily: "'Share Tech Mono',monospace", color, textShadow: `0 0 10px ${color}44` }}>{v}</div>
                <div style={{ fontSize: "0.52rem", color: "rgba(232,224,208,0.3)", marginTop: "5px", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Share Tech Mono',monospace" }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Socials */}
          <div style={{ display: "flex", gap: "9px", opacity: 0, animation: "fade-up 0.7s ease 1.4s forwards" }}>
            {[
              { href: "https://github.com/yadavluv2004",                   icon: Github,   label: "GitHub",   hc: "#C8A040" },
              { href: "https://www.linkedin.com/in/luv-yadav-989424263/",  icon: Linkedin, label: "LinkedIn", hc: "#5CB85C" },
              { href: "https://x.com/yadav_luv2004",                       icon: Twitter,  label: "Twitter",  hc: "#5CB85C" },
            ].map(({ href, icon, label, hc }) => {
              const Icon = icon;
              return (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{
                    width: "38px", height: "38px", background: "rgba(200,160,64,0.05)",
                    border: "1px solid rgba(200,160,64,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(232,224,208,0.4)", textDecoration: "none", transition: "all 0.22s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = hc; e.currentTarget.style.borderColor = `${hc}55`;
                    e.currentTarget.style.background = `${hc}12`; e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = `0 4px 14px ${hc}28`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(232,224,208,0.4)"; e.currentTarget.style.borderColor = "rgba(200,160,64,0.2)";
                    e.currentTarget.style.background = "rgba(200,160,64,0.05)"; e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#about" style={{
        position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
        color: "rgba(200,160,64,0.3)", textDecoration: "none", zIndex: 4,
        opacity: 0, animation: "fade-up 0.7s ease 1.8s forwards", transition: "color 0.2s",
      }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "#C8A040"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(200,160,64,0.3)"; }}
      >
        <span style={{ fontSize: "0.54rem", letterSpacing: "0.2em", fontFamily: "'Share Tech Mono',monospace" }}>SCROLL</span>
        <div style={{ animation: "bounce-y 2s ease-in-out infinite" }}><ArrowDown size={12} /></div>
      </a>

      <style>{`@media(max-width:768px){.cod-char-panel{display:none!important}}`}</style>
    </section>
  );
};

export default HeroSection;
