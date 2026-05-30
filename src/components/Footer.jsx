import { ArrowUp, Github, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      padding: "40px 0",
      borderTop: "1px solid rgba(240,234,224,0.07)",
      background: "#050504",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "0 32px",
        display: "flex", flexWrap: "wrap",
        alignItems: "center", justifyContent: "space-between", gap: "20px",
      }}>
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "'Rajdhani','Oswald',sans-serif",
            fontSize: "1.1rem", fontWeight: 700, color: "#D4A940",
            letterSpacing: "0.1em", textTransform: "uppercase",
          }}>LUV<span style={{ color: "rgba(240,234,224,0.4)", fontWeight: 400 }}>.DEV</span></span>
        </a>

        {/* Copy */}
        <p style={{ fontSize: "0.72rem", color: "rgba(240,234,224,0.22)", fontFamily: "'Share Tech Mono',monospace", letterSpacing: "0.06em" }}>
          © {year} LUV YADAV — BUILT WITH REACT
        </p>

        {/* Right group */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {[
            { href: "https://github.com/yadavluv2004",                   icon: <Github size={15} />,   hc: "#D4A940" },
            { href: "https://www.linkedin.com/in/luv-yadav-989424263/", icon: <Linkedin size={15} />, hc: "#4CAF7D" },
            { href: "https://x.com/yadav_luv2004",                       icon: <Twitter size={15} />,  hc: "#4CAF7D" },
          ].map(({ href, icon, hc }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer"
              style={{ color: "rgba(240,234,224,0.3)", transition: "color 0.2s, transform 0.2s", display: "flex" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = hc; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(240,234,224,0.3)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >{icon}</a>
          ))}

          <a href="#hero" style={{
            width: "32px", height: "32px",
            background: "rgba(212,169,64,0.08)",
            border: "1px solid rgba(212,169,64,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#D4A940", textDecoration: "none", transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,169,64,0.18)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,169,64,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
};
