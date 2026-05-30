import { useInView } from "@/hooks/useInView";
import { ExternalLink, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    company: "Xebo.ai",
    role: "Software Engineer",
    period: "2024 – Present",
    location: "New Delhi, India",
    url: "https://xebo.ai",
    type: "Full-time",
    desc: "Building AI-powered products used by thousands of users daily.",
    points: [
      "Built scalable front-end features with React and TypeScript for AI-powered products.",
      "Collaborated with cross-functional teams to design and ship user-focused web applications.",
      "Implemented REST API integrations and optimised bundle size and runtime performance.",
      "Participated in code reviews, pair programming and maintaining high engineering standards.",
    ],
    tags: ["React", "TypeScript", "Node.js", "REST APIs", "Git", "Agile"],
  },
];

const ExperienceSection = () => {
  const [ref, inView] = useInView();

  return (
    <section id="experience" ref={ref} style={{ padding: "120px 0", background: "rgba(255,255,255,0.012)", position: "relative", overflow: "hidden" }}>

      {/* Giant bg number */}
      <div style={{
        position: "absolute", top: "50%", left: "-1%",
        transform: "translateY(-50%)",
        fontFamily: "'Rajdhani','Oswald',sans-serif",
        fontSize: "clamp(180px,22vw,280px)",
        fontWeight: 700, color: "rgba(76,175,125,0.04)",
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
        letterSpacing: "-0.05em",
      }}>02</div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 32px" }}>

        {/* Heading */}
        <div className={`reveal ${inView ? "visible" : ""}`} style={{ marginBottom: "72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "1px", background: "#4CAF7D" }} />
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", color: "#4CAF7D", letterSpacing: "0.25em", textTransform: "uppercase" }}>02 — EXPERIENCE</span>
          </div>
          <h2 style={{
            fontFamily: "'Rajdhani','Oswald',sans-serif",
            fontSize: "clamp(2.8rem,5.5vw,4.5rem)",
            fontWeight: 700, color: "#F0EAE0",
            letterSpacing: "-0.01em", textTransform: "uppercase", lineHeight: 1,
          }}>
            Work History
          </h2>
        </div>

        {/* Experience entries */}
        <div style={{ position: "relative" }}>

          {experiences.map((exp, i) => (
            <div key={exp.company}
              className={`reveal ${inView ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Card */}
              <div style={{
                background: "rgba(10,11,9,0.6)",
                border: "1px solid rgba(240,234,224,0.07)",
                borderLeft: "3px solid #4CAF7D",
                padding: "36px 40px",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderLeftColor = "#D4A940";
                e.currentTarget.style.boxShadow = "0 8px 48px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderLeftColor = "#4CAF7D";
                e.currentTarget.style.boxShadow = "none";
              }}
              >
                {/* Top row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px", marginBottom: "24px", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px", flexWrap: "wrap" }}>
                      <h3 style={{
                        fontFamily: "'Rajdhani','Oswald',sans-serif",
                        fontSize: "clamp(1.3rem,2.5vw,1.7rem)", fontWeight: 700,
                        color: "#F0EAE0", textTransform: "uppercase", letterSpacing: "0.04em",
                      }}>{exp.role}</h3>
                      <span style={{
                        fontFamily: "'Share Tech Mono',monospace",
                        fontSize: "0.58rem", padding: "3px 10px",
                        background: "rgba(76,175,125,0.1)",
                        border: "1px solid rgba(76,175,125,0.3)",
                        color: "#4CAF7D", letterSpacing: "0.1em",
                      }}>{exp.type}</span>
                    </div>
                    <a href={exp.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#D4A940", textDecoration: "none", fontFamily: "'Rajdhani',sans-serif", fontSize: "1rem", fontWeight: 600, transition: "opacity 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.75"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                    >
                      {exp.company} <ExternalLink size={13} />
                    </a>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#D4A940", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", letterSpacing: "0.08em", marginBottom: "4px", justifyContent: "flex-end" }}>
                      <Calendar size={12} /> {exp.period}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(240,234,224,0.35)", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.06em", justifyContent: "flex-end" }}>
                      <MapPin size={11} /> {exp.location}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "rgba(240,234,224,0.06)", marginBottom: "24px" }} />

                {/* Summary */}
                <p style={{ color: "rgba(240,234,224,0.55)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "20px", fontFamily: "'Rajdhani',sans-serif", fontWeight: 500 }}>{exp.desc}</p>

                {/* Bullets */}
                <ul style={{ listStyle: "none", padding: 0, marginBottom: "28px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {exp.points.map((pt, j) => (
                    <li key={j} style={{ display: "flex", gap: "12px", color: "rgba(240,234,224,0.65)", fontSize: "0.92rem", lineHeight: 1.65, fontFamily: "'Rajdhani',sans-serif", fontWeight: 500 }}>
                      <span style={{ color: "#4CAF7D", flexShrink: 0, marginTop: "2px", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem" }}>→</span>
                      {pt}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {exp.tags.map((t) => (
                    <span key={t} style={{
                      fontFamily: "'Share Tech Mono',monospace",
                      fontSize: "0.62rem", padding: "4px 12px",
                      background: "rgba(212,169,64,0.07)",
                      border: "1px solid rgba(212,169,64,0.2)",
                      color: "rgba(212,169,64,0.8)", letterSpacing: "0.06em",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
