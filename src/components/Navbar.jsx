import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import audioManager from "../lib/audioManager";

const NAV_ITEMS = [
  { name: "Home",       href: "#hero",       code: "01" },
  { name: "About",      href: "#about",      code: "02" },
  { name: "Experience", href: "#experience", code: "03" },
  { name: "Skills",     href: "#skills",     code: "04" },
  { name: "Projects",   href: "#projects",   code: "05" },
  { name: "Contact",    href: "#contact",    code: "06" },
];

function NavLink({ name, href, isActive, code }) {
  const [hov, setHov] = useState(false);
  const active = isActive || hov;
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        padding: "5px 12px",
        color: active ? "#C8A040" : "rgba(232,224,208,0.5)",
        textDecoration: "none",
        fontSize: "0.78rem",
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        borderRadius: "1px",
        background: isActive ? "rgba(200,160,64,0.1)" : hov ? "rgba(200,160,64,0.06)" : "transparent",
        border: isActive ? "1px solid rgba(200,160,64,0.3)" : "1px solid transparent",
        transition: "all 0.18s ease",
        display: "flex", alignItems: "center", gap: "5px",
      }}
    >
      <span style={{
        fontFamily: "'Share Tech Mono',monospace",
        fontSize: "0.5rem",
        color: active ? "rgba(200,160,64,0.6)" : "rgba(255,255,255,0.15)",
        letterSpacing: "0",
      }}>{code}</span>
      {name}
      {isActive && (
        <span style={{
          position: "absolute", bottom: "-1px", left: "12px", right: "12px",
          height: "1.5px",
          background: "#C8A040",
          boxShadow: "0 0 6px rgba(200,160,64,0.6)",
        }} />
      )}
    </a>
  );
}

export const Navbar = () => {
  const [scrolled, setScrolled]    = useState(false);
  const [menuOpen, setMenuOpen]    = useState(false);
  const [isPlaying, setIsPlaying]  = useState(audioManager.isPlaying);
  const [activeSection, setActive] = useState("hero");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = () => {
      const ids = NAV_ITEMS.map(i => i.href.slice(1));
      let current = "hero";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.55) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIsPlaying(audioManager.isPlaying), 500);
    return () => clearInterval(t);
  }, []);

  const handleAudioToggle = () => setIsPlaying(audioManager.toggle());

  return (
    <nav style={{
      position: "fixed", top: 0, width: "100%", zIndex: 50,
      background: scrolled ? "rgba(6,6,4,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(200,160,64,0.18)" : "none",
      boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.7)" : "none",
      transition: "all 0.32s cubic-bezier(.4,0,.2,1)",
    }}>
      {/* Animated top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: scrolled
          ? "linear-gradient(90deg, transparent 0%, #8B1A1A 20%, #C8A040 50%, #8B1A1A 80%, transparent 100%)"
          : "transparent",
        backgroundSize: "200% 100%",
        animation: scrolled ? "border-flow 4s linear infinite" : "none",
        transition: "background 0.4s ease",
      }} />

      <div style={{
        maxWidth: "1400px", margin: "0 auto",
        padding: scrolled ? "8px 24px" : "16px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "padding 0.32s ease",
      }}>

        {/* Logo */}
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Crosshair icon */}
          <div style={{ position: "relative", width: "22px", height: "22px", flexShrink: 0 }}>
            <div style={{ position: "absolute", inset: 0, border: "1.5px solid rgba(200,160,64,0.7)", borderRadius: "50%" }} />
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "rgba(200,160,64,0.7)", transform: "translateY(-50%)" }} />
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "rgba(200,160,64,0.7)", transform: "translateX(-50%)" }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "4px", height: "4px", borderRadius: "50%", background: "#C8A040" }} />
          </div>
          <div>
            <div style={{
              fontFamily: "'Rajdhani','Oswald',sans-serif",
              fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase", lineHeight: 1, color: "#E8E0D0",
            }}>
              <span style={{ color: "#C8A040", textShadow: "0 0 12px rgba(200,160,64,0.45)" }}>LUV</span>
              <span style={{ color: "rgba(232,224,208,0.7)" }}>.DEV</span>
            </div>
            <div style={{
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: "0.42rem", letterSpacing: "0.18em",
              color: "rgba(200,160,64,0.4)", textTransform: "uppercase",
            }}>OPERATOR FILE</div>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: "2px" }}>
          {NAV_ITEMS.map(({ name, href, code }) => (
            <NavLink key={name} name={name} href={href} code={code} isActive={activeSection === href.slice(1)} />
          ))}
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: "8px" }}>
          <button
            onClick={handleAudioToggle}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "5px 11px",
              background: "transparent",
              border: `1.5px solid ${isPlaying ? "rgba(92,184,92,0.45)" : "rgba(200,160,64,0.3)"}`,
              borderRadius: "2px",
              color: isPlaying ? "#5CB85C" : "rgba(232,224,208,0.35)",
              cursor: "pointer",
              fontSize: "0.58rem",
              fontFamily: "'Share Tech Mono',monospace",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              transition: "all 0.2s ease",
            }}
          >
            {isPlaying ? <Volume2 size={11} /> : <VolumeX size={11} />}
            <span>{isPlaying ? "COMMS ON" : "COMMS OFF"}</span>
          </button>

          <a
            href="/Luv-Yadav.pdf"
            download
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "6px 16px",
              background: "rgba(139,26,26,0.12)",
              border: "1.5px solid rgba(139,26,26,0.55)",
              borderRadius: "2px",
              color: "#CC5500",
              textDecoration: "none",
              fontSize: "0.7rem",
              fontFamily: "'Rajdhani',sans-serif",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
              boxShadow: "0 0 12px rgba(139,26,26,0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(139,26,26,0.25)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(139,26,26,0.35)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(139,26,26,0.12)";
              e.currentTarget.style.boxShadow = "0 0 12px rgba(139,26,26,0.1)";
              e.currentTarget.style.transform = "none";
            }}
          >
            ↓ DOSSIER
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(p => !p)}
          style={{
            background: menuOpen ? "rgba(200,160,64,0.1)" : "transparent",
            border: "1.5px solid rgba(200,160,64,0.4)",
            borderRadius: "2px",
            color: "#C8A040",
            cursor: "pointer",
            padding: "7px 9px",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s ease",
          }}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu — Tactical pause screen */}
      {menuOpen && (
        <div className="md:hidden animate-slide-down" style={{
          background: "rgba(5,5,4,0.98)",
          backdropFilter: "blur(28px)",
          borderTop: "1px solid rgba(200,160,64,0.22)",
          padding: "24px 20px 20px",
          position: "relative", overflow: "hidden",
        }}>
          {/* Grid overlay */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(200,160,64,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(200,160,64,0.025) 1px, transparent 1px)",
            backgroundSize: "40px 40px", pointerEvents: "none",
          }} />

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div style={{
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: "0.5rem", letterSpacing: "0.25em",
              color: "rgba(200,160,64,0.35)", marginBottom: "6px",
            }}>TACTICAL OVERLAY</div>
            <div style={{
              fontFamily: "'Rajdhani','Oswald',sans-serif",
              fontSize: "1.3rem", color: "#C8A040",
              letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700,
              textShadow: "0 0 18px rgba(200,160,64,0.5)",
            }}>— NAVIGATION —</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginBottom: "18px" }}>
            {NAV_ITEMS.map(({ name, href, code }, idx) => {
              const isAct = activeSection === href.slice(1);
              return (
                <a key={name} href={href} onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "11px 16px",
                    color: isAct ? "#C8A040" : "rgba(232,224,208,0.7)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    fontFamily: "'Rajdhani',sans-serif",
                    fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    borderRadius: "1px",
                    background: isAct ? "rgba(200,160,64,0.1)" : "transparent",
                    border: `1px solid ${isAct ? "rgba(200,160,64,0.3)" : "transparent"}`,
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{
                      fontFamily: "'Share Tech Mono',monospace",
                      fontSize: "0.52rem", color: isAct ? "#C8A040" : "rgba(255,255,255,0.2)",
                      minWidth: "18px",
                    }}>{code}</span>
                    {name}
                  </div>
                  <span style={{ color: isAct ? "#C8A040" : "rgba(255,255,255,0.15)", fontSize: "0.7rem" }}>▶</span>
                </a>
              );
            })}
          </div>

          <div style={{ borderTop: "1px solid rgba(200,160,64,0.12)", paddingTop: "16px", display: "flex", gap: "10px" }}>
            <a href="/Luv-Yadav.pdf" download style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              padding: "12px",
              background: "rgba(139,26,26,0.12)",
              border: "1.5px solid rgba(139,26,26,0.45)",
              borderRadius: "2px",
              color: "#CC5500", textDecoration: "none",
              fontSize: "0.78rem", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
            }}>
              ↓ DOSSIER
            </a>
            <button onClick={handleAudioToggle} style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              padding: "12px 16px",
              background: "transparent",
              border: `1.5px solid ${isPlaying ? "rgba(92,184,92,0.4)" : "rgba(200,160,64,0.3)"}`,
              borderRadius: "2px",
              color: isPlaying ? "#5CB85C" : "rgba(232,224,208,0.35)",
              cursor: "pointer",
              fontSize: "0.6rem", fontFamily: "'Share Tech Mono',monospace",
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              {isPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
