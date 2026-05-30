import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useRef } from "react";

const projects = [
  {
    id: 1,
    num: "01",
    title: "MeetHive",
    description: "A full-featured video conferencing platform with real-time communication, room management, and a clean responsive UI built on WebRTC.",
    image: "/projects/MeetHive.jpeg",
    tags: ["React", "Node.js", "WebRTC", "TailwindCSS"],
    demoUrl: "https://meethivefrontend.onrender.com",
    githubUrl: "https://github.com/yadavluv2004/MeetHive",
    accent: "#D4A940",
    featured: true,
  },
  {
    id: 2,
    num: "02",
    title: "StayNest",
    description: "A full-stack vacation rental platform inspired by Airbnb — browse, list, and manage property bookings seamlessly.",
    image: "/projects/StayNest.jpeg",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    demoUrl: "https://staynest-tq1y.onrender.com/listings",
    githubUrl: "https://github.com/yadavluv2004/StayNest",
    accent: "#4CAF7D",
    featured: false,
  },
  {
    id: 3,
    num: "03",
    title: "Simon Says",
    description: "A classic memory game built with vanilla JavaScript — progressively harder colour sequences.",
    image: "/projects/Simonsays.jpg",
    tags: ["JavaScript", "HTML", "CSS"],
    demoUrl: "https://yadavluv2004.github.io/Simon-Say-Game/",
    githubUrl: "https://github.com/yadavluv2004/Simon-Say-Game",
    accent: "#CC4400",
    featured: false,
  },
];

function FeaturedCard({ project, inView }) {
  const cardRef = useRef(null);

  return (
    <div className={`reveal ${inView ? "visible" : ""}`} style={{ marginBottom: "20px" }}>
      <div ref={cardRef} style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        background: "rgba(10,11,9,0.8)",
        border: "1px solid rgba(240,234,224,0.08)",
        overflow: "hidden",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${project.accent}40`;
        e.currentTarget.style.boxShadow = `0 12px 60px rgba(0,0,0,0.5), 0 0 0 1px ${project.accent}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(240,234,224,0.08)";
        e.currentTarget.style.boxShadow = "none";
      }}
      className="featured-card"
      >
        {/* Image */}
        <div style={{ position: "relative", overflow: "hidden", minHeight: "320px" }}>
          <img src={project.image} alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.65) saturate(0.7)", transition: "transform 0.5s ease, filter 0.3s ease" }}
            onMouseEnter={(e) => { e.target.style.transform = "scale(1.05)"; e.target.style.filter = "brightness(0.8) saturate(0.85)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.filter = "brightness(0.65) saturate(0.7)"; }}
          />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, transparent 60%, rgba(10,11,9,0.9) 100%)` }} />
          <div style={{
            position: "absolute", top: "20px", left: "20px",
            fontFamily: "'Share Tech Mono',monospace", fontSize: "0.55rem",
            color: project.accent, letterSpacing: "0.14em",
            background: `${project.accent}15`,
            border: `1px solid ${project.accent}40`,
            padding: "4px 10px",
          }}>FEATURED PROJECT</div>
        </div>

        {/* Content */}
        <div style={{ padding: "40px 40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "rgba(240,234,224,0.25)", letterSpacing: "0.18em", marginBottom: "8px" }}>{project.num}</div>
          <h3 style={{
            fontFamily: "'Rajdhani','Oswald',sans-serif",
            fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 700,
            color: "#F0EAE0", textTransform: "uppercase", letterSpacing: "0.04em",
            marginBottom: "16px", lineHeight: 1,
          }}>{project.title}</h3>
          <p style={{ color: "rgba(240,234,224,0.55)", fontSize: "0.92rem", lineHeight: 1.75, marginBottom: "24px", fontFamily: "'Rajdhani',sans-serif", fontWeight: 500 }}>{project.description}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "32px" }}>
            {project.tags.map(t => (
              <span key={t} style={{
                fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem",
                padding: "3px 10px",
                background: `${project.accent}0c`,
                border: `1px solid ${project.accent}25`,
                color: `${project.accent}cc`, letterSpacing: "0.06em",
              }}>{t}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "10px 20px",
              background: project.accent, color: "#080808",
              textDecoration: "none", fontFamily: "'Rajdhani',sans-serif",
              fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              <ExternalLink size={13} /> Live Demo
            </a>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "10px 20px",
              background: "transparent", color: "rgba(240,234,224,0.55)",
              textDecoration: "none", fontFamily: "'Rajdhani',sans-serif",
              fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase",
              border: "1px solid rgba(240,234,224,0.15)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#F0EAE0"; e.currentTarget.style.borderColor = "rgba(240,234,224,0.35)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(240,234,224,0.55)"; e.currentTarget.style.borderColor = "rgba(240,234,224,0.15)"; }}
            >
              <Github size={13} /> Source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SmallCard({ project, inView, delay }) {
  return (
    <div className={`reveal ${inView ? "visible" : ""}`} style={{ transitionDelay: `${delay}s` }}>
      <div style={{
        background: "rgba(10,11,9,0.7)",
        border: "1px solid rgba(240,234,224,0.07)",
        overflow: "hidden",
        height: "100%",
        display: "flex", flexDirection: "column",
        transition: "border-color 0.3s, transform 0.3s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${project.accent}35`;
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(240,234,224,0.07)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
      >
        <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
          <img src={project.image} alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6) saturate(0.65)", transition: "transform 0.4s ease" }}
            onMouseEnter={(e) => { e.target.style.transform = "scale(1.06)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(10,11,9,0.85) 0%, transparent 55%)" }} />
          <div style={{
            position: "absolute", bottom: "14px", left: "16px",
            fontFamily: "'Share Tech Mono',monospace",
            fontSize: "0.52rem", color: project.accent,
            letterSpacing: "0.1em",
          }}>{project.num}</div>
          <div style={{
            position: "absolute", top: "12px", right: "12px",
            display: "flex", gap: "8px",
          }}>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              style={{ color: "rgba(240,234,224,0.5)", display: "flex", transition: "color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#F0EAE0"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(240,234,224,0.5)"; }}
            ><Github size={15} /></a>
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
              style={{ color: "rgba(240,234,224,0.5)", display: "flex", transition: "color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = project.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(240,234,224,0.5)"; }}
            ><ExternalLink size={15} /></a>
          </div>
        </div>

        <div style={{ padding: "20px 22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
          <h3 style={{
            fontFamily: "'Rajdhani','Oswald',sans-serif",
            fontSize: "1.2rem", fontWeight: 700, color: "#F0EAE0",
            textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px",
          }}>{project.title}</h3>
          <p style={{ color: "rgba(240,234,224,0.45)", fontSize: "0.85rem", lineHeight: 1.65, flex: 1, marginBottom: "16px", fontFamily: "'Rajdhani',sans-serif", fontWeight: 500 }}>{project.description}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {project.tags.map(t => (
              <span key={t} style={{
                fontFamily: "'Share Tech Mono',monospace", fontSize: "0.56rem",
                padding: "2px 8px",
                background: `${project.accent}08`,
                border: `1px solid ${project.accent}22`,
                color: `${project.accent}aa`, letterSpacing: "0.05em",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ProjectsSection = () => {
  const [ref, inView] = useInView();
  const featured = projects.find(p => p.featured);
  const others = projects.filter(p => !p.featured);

  return (
    <section id="projects" ref={ref} style={{ padding: "120px 0", background: "rgba(255,255,255,0.012)", position: "relative", overflow: "hidden" }}>

      {/* Giant bg number */}
      <div style={{
        position: "absolute", top: "50%", left: "-1%",
        transform: "translateY(-50%)",
        fontFamily: "'Rajdhani','Oswald',sans-serif",
        fontSize: "clamp(180px,22vw,280px)",
        fontWeight: 700, color: "rgba(212,169,64,0.04)",
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
        letterSpacing: "-0.05em",
      }}>04</div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>

        {/* Heading */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "72px", flexWrap: "wrap", gap: "20px" }}>
          <div className={`reveal ${inView ? "visible" : ""}`}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div style={{ width: "40px", height: "1px", background: "#D4A940" }} />
              <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", color: "#D4A940", letterSpacing: "0.25em", textTransform: "uppercase" }}>04 — PROJECTS</span>
            </div>
            <h2 style={{
              fontFamily: "'Rajdhani','Oswald',sans-serif",
              fontSize: "clamp(2.8rem,5.5vw,4.5rem)",
              fontWeight: 700, color: "#F0EAE0",
              letterSpacing: "-0.01em", textTransform: "uppercase", lineHeight: 1,
            }}>Selected Work</h2>
          </div>

          <a href="https://github.com/yadavluv2004" target="_blank" rel="noopener noreferrer"
            className={`reveal ${inView ? "visible" : ""} delay-2`}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem",
              color: "rgba(240,234,224,0.4)", textDecoration: "none",
              letterSpacing: "0.1em", textTransform: "uppercase",
              borderBottom: "1px solid rgba(240,234,224,0.15)",
              paddingBottom: "4px",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#D4A940"; e.currentTarget.style.borderColor = "#D4A940"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(240,234,224,0.4)"; e.currentTarget.style.borderColor = "rgba(240,234,224,0.15)"; }}
          >
            View All <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Featured project */}
        {featured && <FeaturedCard project={featured} inView={inView} />}

        {/* Smaller cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="projects-grid">
          {others.map((p, i) => (
            <SmallCard key={p.id} project={p} inView={inView} delay={0.15 + i * 0.1} />
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .featured-card { grid-template-columns:1fr !important; }
          .projects-grid { grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;
