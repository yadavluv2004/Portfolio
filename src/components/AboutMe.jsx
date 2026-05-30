import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { MapPin, Briefcase, GraduationCap, ArrowRight } from "lucide-react";

function Counter({ target, suffix, active }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let n = 0;
    const step = target / 50;
    const id = setInterval(() => {
      n += step;
      if (n >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(n));
    }, 30);
    return () => clearInterval(id);
  }, [active, target]);
  return <>{val}{suffix}</>;
}

const AboutMe = () => {
  const [ref, inView] = useInView();

  const stats = [
    { val: 10, suffix: "+", label: "Projects" },
    { val: 1,  suffix: "+", label: "Years Exp" },
    { val: 15, suffix: "+", label: "Technologies" },
    { val: 93, suffix: ".9%", label: "CGPA" },
  ];

  const abilities = [
    { title: "Full Stack Development", desc: "React, Node.js, TypeScript — end-to-end product engineering.", color: "#D4A940" },
    { title: "System Architecture",   desc: "Scalable, maintainable structures built for real growth.",      color: "#4CAF7D" },
    { title: "Performance & UX",      desc: "Core Web Vitals, micro-animations, and pixel-perfect UI.",     color: "#CC4400" },
    { title: "Dev Tooling & DevOps",  desc: "Git, Docker, CI/CD — shipping confidently and fast.",          color: "#D4A940" },
  ];

  return (
    <section id="about" ref={ref} style={{ padding: "120px 0", background: "transparent", position: "relative", overflow: "hidden" }}>

      {/* Giant background number */}
      <div style={{
        position: "absolute", top: "50%", right: "-2%",
        transform: "translateY(-50%)",
        fontFamily: "'Rajdhani','Oswald',sans-serif",
        fontSize: "clamp(180px,22vw,280px)",
        fontWeight: 700, color: "rgba(212,169,64,0.04)",
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
        letterSpacing: "-0.05em",
      }}>01</div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>

        {/* Top label */}
        <div className={`reveal ${inView ? "visible" : ""}`} style={{ marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "1px", background: "#D4A940" }} />
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", color: "#D4A940", letterSpacing: "0.25em", textTransform: "uppercase" }}>01 — ABOUT</span>
          </div>
          <h2 style={{
            fontFamily: "'Rajdhani','Oswald',sans-serif",
            fontSize: "clamp(2.8rem,5.5vw,4.5rem)",
            fontWeight: 700, color: "#F0EAE0",
            letterSpacing: "-0.01em", textTransform: "uppercase",
            lineHeight: 1,
          }}>
            Who I Am
          </h2>
        </div>

        {/* Main 2-col layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="about-grid">

          {/* Left — bio */}
          <div className={`reveal-left ${inView ? "visible" : ""}`}>

            {/* Profile strip */}
            <div style={{
              display: "flex", alignItems: "center", gap: "16px",
              padding: "16px 20px",
              background: "rgba(212,169,64,0.05)",
              border: "1px solid rgba(212,169,64,0.15)",
              marginBottom: "36px",
            }}>
              <div style={{
                width: "48px", height: "48px",
                background: "linear-gradient(135deg, #D4A940, #8B5E00)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "1rem",
                color: "#080808", flexShrink: 0,
              }}>LY</div>
              <div>
                <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#F0EAE0", letterSpacing: "0.05em", textTransform: "uppercase" }}>Luv Yadav</div>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "rgba(240,234,224,0.4)", letterSpacing: "0.12em" }}>SOFTWARE ENGINEER</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4CAF7D", boxShadow: "0 0 8px #4CAF7D", display: "inline-block" }} />
                <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.52rem", color: "#4CAF7D", letterSpacing: "0.1em" }}>ACTIVE</span>
              </div>
            </div>

            <p style={{
              fontSize: "1.05rem", color: "rgba(240,234,224,0.7)",
              lineHeight: 1.85, marginBottom: "24px",
              fontFamily: "'Rajdhani',sans-serif", fontWeight: 500,
            }}>
              Full-stack software engineer building AI-powered products at{" "}
              <span style={{ color: "#D4A940", fontWeight: 700 }}>Xebo.ai</span>.
              I specialise in crafting performant web applications with React, Node.js, and TypeScript.
            </p>

            <p style={{
              fontSize: "1.05rem", color: "rgba(240,234,224,0.5)",
              lineHeight: 1.85, marginBottom: "40px",
              fontFamily: "'Rajdhani',sans-serif", fontWeight: 500,
            }}>
              Graduated from <span style={{ color: "#4CAF7D", fontWeight: 700 }}>GGSIPU</span> with
              a 93.9% CGPA. I care deeply about clean code, great UX, and systems that scale.
            </p>

            {/* Info pills */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
              {[
                { icon: <MapPin size={14} />, text: "New Delhi, India" },
                { icon: <Briefcase size={14} />, text: "Software Engineer @ Xebo.ai" },
                { icon: <GraduationCap size={14} />, text: "B.Tech CSE, GGSIPU 2026" },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(240,234,224,0.5)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.92rem", fontWeight: 500 }}>
                  <span style={{ color: "#D4A940", flexShrink: 0 }}>{icon}</span>
                  {text}
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="#contact" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "12px 24px",
                background: "#D4A940", color: "#080808",
                textDecoration: "none", fontFamily: "'Rajdhani',sans-serif",
                fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#E8BE58"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#D4A940"; e.currentTarget.style.transform = "none"; }}
              >
                Get In Touch <ArrowRight size={14} />
              </a>
              <a href="/Luv-Yadav.pdf" download style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "12px 24px",
                background: "transparent", color: "#D4A940",
                textDecoration: "none", fontFamily: "'Rajdhani',sans-serif",
                fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase",
                border: "1px solid rgba(212,169,64,0.45)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,169,64,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "none"; }}
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Right — stats + abilities */}
          <div className={`reveal-right ${inView ? "visible" : ""}`}>

            {/* Stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", marginBottom: "40px" }}>
              {stats.map(({ val, suffix, label }, i) => {
                const colors = ["#D4A940", "#4CAF7D", "#CC4400", "#D4A940"];
                return (
                  <div key={label} style={{
                    padding: "28px 24px",
                    background: i % 2 === 0 ? "rgba(212,169,64,0.05)" : "rgba(76,175,125,0.05)",
                    border: `1px solid ${i % 2 === 0 ? "rgba(212,169,64,0.12)" : "rgba(76,175,125,0.12)"}`,
                    transition: "background 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = i % 2 === 0 ? "rgba(212,169,64,0.1)" : "rgba(76,175,125,0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = i % 2 === 0 ? "rgba(212,169,64,0.05)" : "rgba(76,175,125,0.05)"; }}
                  >
                    <div style={{
                      fontFamily: "'Share Tech Mono',monospace",
                      fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 700,
                      color: colors[i], lineHeight: 1, marginBottom: "6px",
                    }}>
                      <Counter target={val} suffix={suffix} active={inView} />
                    </div>
                    <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: "rgba(240,234,224,0.35)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</div>
                  </div>
                );
              })}
            </div>

            {/* Abilities list */}
            <div style={{ borderTop: "1px solid rgba(240,234,224,0.06)", paddingTop: "32px" }}>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: "rgba(240,234,224,0.3)", letterSpacing: "0.2em", marginBottom: "20px", textTransform: "uppercase" }}>
                Core Capabilities
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {abilities.map(({ title, desc, color }) => (
                  <div key={title} style={{
                    padding: "16px 0",
                    borderBottom: "1px solid rgba(240,234,224,0.06)",
                    display: "flex", gap: "16px", alignItems: "flex-start",
                    transition: "all 0.2s ease", cursor: "default",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "8px"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0"; }}
                  >
                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: color, marginTop: "8px", flexShrink: 0, boxShadow: `0 0 6px ${color}` }} />
                    <div>
                      <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#F0EAE0", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "3px" }}>{title}</div>
                      <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.82rem", color: "rgba(240,234,224,0.45)", fontWeight: 500 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .about-grid{ grid-template-columns:1fr !important; gap:48px !important; } }
      `}</style>
    </section>
  );
};

export default AboutMe;
