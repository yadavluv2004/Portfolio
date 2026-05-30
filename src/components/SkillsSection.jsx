import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const skills = [
  { name: "React",        level: 90, category: "frontend", color: "#61DAFB", rarity: "LEGENDARY" },
  { name: "JavaScript",   level: 90, category: "frontend", color: "#F59E0B", rarity: "LEGENDARY" },
  { name: "TypeScript",   level: 82, category: "frontend", color: "#3178C6", rarity: "EPIC" },
  { name: "HTML / CSS",   level: 95, category: "frontend", color: "#E34F26", rarity: "LEGENDARY" },
  { name: "Tailwind CSS", level: 90, category: "frontend", color: "#38BDF8", rarity: "LEGENDARY" },
  { name: "Next.js",      level: 78, category: "frontend", color: "#C8A040", rarity: "RARE" },
  { name: "Node.js",      level: 80, category: "backend",  color: "#8CC84B", rarity: "EPIC" },
  { name: "Express",      level: 75, category: "backend",  color: "#94A3B8", rarity: "RARE" },
  { name: "MongoDB",      level: 70, category: "backend",  color: "#47A248", rarity: "RARE" },
  { name: "PostgreSQL",   level: 65, category: "backend",  color: "#5CB85C", rarity: "UNCOMMON" },
  { name: "REST APIs",    level: 85, category: "backend",  color: "#C8A040", rarity: "EPIC" },
  { name: "Git / GitHub", level: 90, category: "tools",    color: "#F05033", rarity: "LEGENDARY" },
  { name: "Docker",       level: 68, category: "tools",    color: "#0DB7ED", rarity: "UNCOMMON" },
  { name: "Figma",        level: 80, category: "tools",    color: "#CC5500", rarity: "RARE" },
  { name: "VS Code",      level: 95, category: "tools",    color: "#007ACC", rarity: "LEGENDARY" },
];

const rarityColor = {
  LEGENDARY: "#C8A040",
  EPIC:      "#8B5CF6",
  RARE:      "#3B82F6",
  UNCOMMON:  "#5CB85C",
};

const categories = ["all", "frontend", "backend", "tools"];
const catLabels = { all: "ALL WEAPONS", frontend: "PRIMARY", backend: "SECONDARY", tools: "EQUIPMENT" };

const SkillCard = ({ skill, active }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="glass-card"
      style={{ padding: "18px 20px", transition: "transform 0.2s ease", cursor: "default" }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Rarity indicator */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <div style={{
            width: "7px", height: "7px",
            background: skill.color, flexShrink: 0,
            boxShadow: `0 0 6px ${skill.color}80`,
          }} />
          <span style={{
            fontWeight: 700, color: "#E8E0D0", fontSize: "0.88rem",
            fontFamily: "'Rajdhani',sans-serif", letterSpacing: "0.05em",
          }}>{skill.name}</span>
        </div>
        <span style={{
          fontFamily: "'Share Tech Mono',monospace",
          fontSize: "0.52rem",
          color: rarityColor[skill.rarity] + "bb",
          letterSpacing: "0.08em",
          border: `1px solid ${rarityColor[skill.rarity]}25`,
          padding: "1px 6px",
        }}>{skill.rarity}</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <span style={{
          fontFamily: "'Share Tech Mono',monospace",
          fontSize: "0.58rem", color: "rgba(232,224,208,0.3)", letterSpacing: "0.1em",
        }}>PROFICIENCY</span>
        <span style={{
          fontFamily: "'Share Tech Mono',monospace",
          fontSize: "0.75rem", color: skill.color, fontWeight: 700,
        }}>{skill.level}%</span>
      </div>

      <div className="cyber-progress">
        <div
          className="cyber-progress-fill"
          style={{
            width: active ? `${skill.level}%` : "0%",
            background: `linear-gradient(90deg, #8B1A1A, ${skill.color})`,
            boxShadow: `0 0 8px ${skill.color}50`,
          }}
        />
      </div>

      {/* Level ticks */}
      <div style={{ display: "flex", gap: "2px", marginTop: "5px" }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: "2px",
            background: active && (i + 1) * 10 <= skill.level
              ? skill.color + "cc"
              : "rgba(200,160,64,0.08)",
            transition: `background ${0.8 + i * 0.08}s ease`,
          }} />
        ))}
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const [active, setActive] = useState("all");
  const [ref, inView] = useInView();

  const filtered = skills.filter((s) => active === "all" || s.category === active);

  return (
    <section id="skills" ref={ref} style={{ padding: "100px 0", background: "transparent" }}>
      <div className="container" style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <div className={`reveal ${inView ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: "52px" }}>
          <span className="section-label">// LOADOUT SELECTION</span>
          <h2 style={{
            fontFamily: "'Rajdhani','Oswald',sans-serif",
            fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 700, color: "#E8E0D0",
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="section-line" />
        </div>

        {/* Filter tabs */}
        <div className={`reveal ${inView ? "visible" : ""} delay-1`} style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: "7px 20px",
                border: active === cat ? "1.5px solid #C8A040" : "1.5px solid rgba(200,160,64,0.22)",
                background: active === cat ? "rgba(200,160,64,0.1)" : "transparent",
                color: active === cat ? "#C8A040" : "rgba(232,224,208,0.4)",
                fontWeight: 700, fontSize: "0.78rem", cursor: "pointer",
                letterSpacing: "0.12em", textTransform: "uppercase",
                transition: "all 0.2s ease",
                fontFamily: "'Rajdhani',sans-serif",
                borderRadius: "1px",
                boxShadow: active === cat ? "0 0 14px rgba(200,160,64,0.2)" : "none",
              }}
            >
              {catLabels[cat]}
            </button>
          ))}
        </div>

        {/* Rarity legend */}
        <div className={`reveal ${inView ? "visible" : ""} delay-2`} style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "32px" }}>
          {Object.entries(rarityColor).map(([rarity, color]) => (
            <div key={rarity} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div style={{ width: "5px", height: "5px", background: color, boxShadow: `0 0 4px ${color}` }} />
              <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.52rem", color: "rgba(232,224,208,0.3)", letterSpacing: "0.1em" }}>{rarity}</span>
            </div>
          ))}
        </div>

        {/* Skills grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "14px" }}>
          {filtered.map((skill, i) => (
            <div key={skill.name} className={`reveal ${inView ? "visible" : ""}`} style={{ transitionDelay: `${(i % 6) * 0.06}s` }}>
              <SkillCard skill={skill} active={inView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
