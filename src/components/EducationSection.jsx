import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { GraduationCap, Award, Shield } from "lucide-react";

const edu = [
  {
    id: 1,
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    school: "Guru Gobind Singh Indraprastha University",
    short: "GGSIPU",
    period: "2022 – 2026",
    score: "93.9",
    unit: "CGPA",
    Icon: GraduationCap,
    accent: "#C8A040",
    rank: "S",
    rankLabel: "S-RANK",
    status: "IN PROGRESS",
    chips: ["DSA", "Web Technologies", "DBMS", "OS", "Networks"],
  },
  {
    id: 2,
    degree: "Class XII — CBSE",
    field: "Senior Secondary Certificate",
    school: "Ambience Public School",
    short: "APS",
    period: "Completed 2022",
    score: "92",
    unit: "%",
    Icon: Award,
    accent: "#5CB85C",
    rank: "A",
    rankLabel: "A-RANK",
    status: "CLEARED",
    chips: ["Mathematics", "Physics", "Computer Sc.", "English"],
  },
  {
    id: 3,
    degree: "Class X — CBSE",
    field: "Secondary School Certificate",
    school: "Ambience Public School",
    short: "APS",
    period: "Completed 2020",
    score: "90",
    unit: "%",
    Icon: Shield,
    accent: "#CC5500",
    rank: "A",
    rankLabel: "A-RANK",
    status: "CLEARED",
    chips: ["Mathematics", "Science", "Computer", "English"],
  },
];

function EduCard({ item, inView, delay }) {
  const { degree, field, school, short, period, score, unit, Icon, accent, rank, rankLabel, status, chips } = item;

  return (
    <div
      className={`reveal ${inView ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}s`, height: "100%" }}
    >
      <div style={{
        height: "100%",
        background: "rgba(10,11,9,0.95)",
        border: `1px solid ${accent}30`,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${accent}70`;
          e.currentTarget.style.boxShadow = `0 0 32px ${accent}18, inset 0 0 32px rgba(0,0,0,0.3)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `${accent}30`;
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Top accent stripe */}
        <div style={{ height: "3px", background: `linear-gradient(90deg, ${accent}, ${accent}44, transparent)` }} />

        {/* Scanlines overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.04) 3px,rgba(0,0,0,0.04) 4px)",
        }} />

        {/* Corner brackets */}
        <div style={{ position: "absolute", top: "10px", left: "10px", width: "14px", height: "14px", borderTop: `1.5px solid ${accent}80`, borderLeft: `1.5px solid ${accent}80` }} />
        <div style={{ position: "absolute", bottom: "10px", right: "10px", width: "14px", height: "14px", borderBottom: `1.5px solid ${accent}80`, borderRight: `1.5px solid ${accent}80` }} />

        {/* Header — score badge + icon */}
        <div style={{
          padding: "22px 22px 16px",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          borderBottom: `1px solid ${accent}14`,
        }}>
          {/* Score badge */}
          <div style={{
            width: "72px", height: "72px",
            border: `2px solid ${accent}60`,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: `${accent}0a`,
            position: "relative",
            boxShadow: `0 0 20px ${accent}20, inset 0 0 16px ${accent}08`,
          }}>
            {/* Rank letter in corner */}
            <div style={{
              position: "absolute", top: "-1px", right: "-1px",
              width: "18px", height: "18px",
              background: accent, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "#080808", fontWeight: 700 }}>{rank}</span>
            </div>
            <span style={{
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: "1.45rem", fontWeight: 700,
              color: accent,
              lineHeight: 1,
              textShadow: `0 0 14px ${accent}88`,
            }}>{score}</span>
            <span style={{
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: "0.42rem", color: `${accent}88`,
              letterSpacing: "0.1em", marginTop: "2px",
            }}>{unit}</span>
          </div>

          {/* Right side: icon + status */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
            <div style={{
              width: "38px", height: "38px",
              background: `${accent}12`, border: `1px solid ${accent}35`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: accent,
            }}>
              <Icon size={18} />
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "2px 8px",
              background: `${accent}10`, border: `1px solid ${accent}30`,
            }}>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: accent, display: "inline-block" }} />
              <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.42rem", color: accent, letterSpacing: "0.12em" }}>{status}</span>
            </div>
          </div>
        </div>

        {/* Body — degree + school */}
        <div style={{ padding: "16px 22px", flex: 1, display: "flex", flexDirection: "column", gap: "0" }}>
          {/* Degree */}
          <div style={{
            fontFamily: "'Rajdhani','Oswald',sans-serif",
            fontSize: "1rem", fontWeight: 700, color: "#E8E0D0",
            letterSpacing: "0.05em", textTransform: "uppercase",
            lineHeight: 1.2, marginBottom: "4px",
          }}>{degree}</div>

          {/* Field */}
          <div style={{
            fontFamily: "'Rajdhani',sans-serif",
            fontSize: "0.75rem", color: "rgba(232,224,208,0.45)",
            letterSpacing: "0.04em", marginBottom: "14px", fontWeight: 500,
          }}>{field}</div>

          {/* Divider */}
          <div style={{ height: "1px", background: `linear-gradient(90deg, ${accent}30, transparent)`, marginBottom: "14px" }} />

          {/* School */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.48rem", color: `${accent}70`, letterSpacing: "0.1em", paddingTop: "2px", whiteSpace: "nowrap" }}>[INST]</span>
            <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "rgba(232,224,208,0.78)", lineHeight: 1.3 }}>{school}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.48rem", color: `${accent}70`, letterSpacing: "0.1em" }}>[YR]</span>
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: "rgba(232,224,208,0.38)", letterSpacing: "0.08em" }}>{period}</span>
          </div>

          {/* Push chips to bottom */}
          <div style={{ flex: 1 }} />

          {/* Subject chips */}
          <div>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.44rem", color: "rgba(232,224,208,0.25)", letterSpacing: "0.16em", marginBottom: "8px", textTransform: "uppercase" }}>FIELD TRAINING</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {chips.map((c) => (
                <span key={c} style={{
                  fontFamily: "'Share Tech Mono',monospace",
                  fontSize: "0.58rem", padding: "2px 8px",
                  background: `${accent}0c`,
                  border: `1px solid ${accent}28`,
                  color: `${accent}cc`,
                  letterSpacing: "0.04em",
                }}>{c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          padding: "8px 22px",
          borderTop: `1px solid ${accent}14`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: `${accent}05`,
        }}>
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.44rem", color: "rgba(232,224,208,0.22)", letterSpacing: "0.1em" }}>{short}</span>
          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.44rem", color: `${accent}60`, letterSpacing: "0.14em" }}>{rankLabel}</span>
        </div>
      </div>
    </div>
  );
}

const EducationSection = () => {
  const [ref, inView] = useInView();

  return (
    <section id="education" ref={ref} style={{ padding: "100px 0", background: "transparent" }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>

        <div className={`reveal ${inView ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-label">// TRAINING RECORD</span>
          <h2 style={{
            fontFamily: "'Rajdhani','Oswald',sans-serif",
            fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 700, color: "#E8E0D0",
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            My <span className="gradient-text">Education</span>
          </h2>
          <div className="section-line" />
        </div>

        {/* Equal-height grid — align-items:stretch + each card is height:100% */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          alignItems: "stretch",
        }} className="edu-grid">
          {edu.map((item, i) => (
            <EduCard key={item.id} item={item} inView={inView} delay={i * 0.14} />
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){.edu-grid{grid-template-columns:1fr 1fr !important;}}
        @media(max-width:560px){.edu-grid{grid-template-columns:1fr !important;}}
      `}</style>
    </section>
  );
};

export default EducationSection;
