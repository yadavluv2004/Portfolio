import { Github, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const { toast } = useToast();
  const form = useRef();
  const [sending, setSending] = useState(false);
  const [sectionRef, inView] = useInView();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs
      .sendForm("service_348mruc", "template_o7i8p5t", form.current, { publicKey: "k-ScpJ9dq1Es4t0EZ" })
      .then(
        () => {
          toast({ title: "Transmission sent!", description: "Message received. Will respond ASAP." });
          form.current.reset();
        },
        () => {
          toast({ title: "Transmission failed", description: "Please email directly.", variant: "destructive" });
        }
      )
      .finally(() => setSending(false));
  };

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    background: "rgba(200,160,64,0.04)",
    border: "1px solid rgba(200,160,64,0.2)",
    borderRadius: "1px",
    color: "#E8E0D0",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box",
    fontFamily: "'Rajdhani',sans-serif",
    fontWeight: 500,
    letterSpacing: "0.04em",
  };

  const onFocus = (e) => {
    e.target.style.borderColor = "rgba(200,160,64,0.6)";
    e.target.style.boxShadow = "0 0 0 2px rgba(200,160,64,0.08), 0 0 16px rgba(200,160,64,0.08)";
  };
  const onBlur = (e) => {
    e.target.style.borderColor = "rgba(200,160,64,0.2)";
    e.target.style.boxShadow = "none";
  };

  return (
    <section id="contact" ref={sectionRef} style={{ padding: "100px 0", background: "transparent" }}>
      <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>

        <div className={`reveal ${inView ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: "60px" }}>
          <span className="section-label">// ESTABLISH COMMS</span>
          <h2 style={{
            fontFamily: "'Rajdhani','Oswald',sans-serif",
            fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 700, color: "#E8E0D0",
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="section-line" />
          <p style={{ color: "rgba(232,224,208,0.45)", marginTop: "16px", fontSize: "0.9rem", fontFamily: "'Rajdhani',sans-serif", fontWeight: 500 }}>
            Open to new missions and interesting conversations.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "36px", alignItems: "start" }} className="contact-grid">

          {/* Left — info */}
          <div className={`reveal-left ${inView ? "visible" : ""}`}>
            <div style={{
              fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem",
              letterSpacing: "0.2em", color: "#C8A040",
              marginBottom: "20px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              ◈ CONTACT INTEL
              <div style={{ flex: 1, height: "1px", background: "rgba(200,160,64,0.18)" }} />
            </div>

            {[
              { icon: <Mail size={16} />,   label: "Comms",    value: "yadav.luv2004@gmail.com", href: "mailto:yadav.luv2004@gmail.com", color: "#C8A040" },
              { icon: <Phone size={16} />,  label: "Radio",    value: "+91 8882840355",           href: "tel:8882840355",               color: "#5CB85C" },
              { icon: <MapPin size={16} />, label: "Location", value: "New Delhi, India",         href: null,                           color: "#CC5500" },
            ].map(({ icon, label, value, href, color }) => (
              <div key={label} style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "22px" }}>
                <div style={{
                  width: "40px", height: "40px",
                  background: `${color}0a`,
                  border: `1px solid ${color}28`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color, flexShrink: 0,
                }}>
                  {icon}
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Share Tech Mono',monospace",
                    fontSize: "0.58rem", color: "rgba(232,224,208,0.3)",
                    marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.12em",
                  }}>[{label}]</div>
                  {href ? (
                    <a href={href} style={{ color: "rgba(232,224,208,0.72)", textDecoration: "none", fontSize: "0.88rem", fontWeight: 600, transition: "color 0.2s", fontFamily: "'Rajdhani',sans-serif" }}
                      onMouseEnter={(e) => { e.target.style.color = color; }}
                      onMouseLeave={(e) => { e.target.style.color = "rgba(232,224,208,0.72)"; }}>
                      {value}
                    </a>
                  ) : (
                    <span style={{ color: "rgba(232,224,208,0.72)", fontSize: "0.88rem", fontWeight: 600, fontFamily: "'Rajdhani',sans-serif" }}>{value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Socials */}
            <div style={{ marginTop: "28px" }}>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: "rgba(232,224,208,0.3)", marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.14em" }}>
                [ NETWORK LINKS ]
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  { href: "https://www.linkedin.com/in/luv-yadav-989424263/", icon: <Linkedin size={16} />, color: "#5CB85C" },
                  { href: "https://github.com/yadavluv2004",                   icon: <Github size={16} />,   color: "#C8A040" },
                  { href: "https://x.com/yadav_luv2004",                       icon: <Twitter size={16} />,  color: "#5CB85C" },
                  { href: "https://www.instagram.com/2004luvyadav",             icon: <Instagram size={16}/>, color: "#CC5500" },
                ].map(({ href, icon, color }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                    style={{
                      width: "38px", height: "38px",
                      background: "rgba(200,160,64,0.04)",
                      border: "1px solid rgba(200,160,64,0.16)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "rgba(232,224,208,0.4)", textDecoration: "none",
                      transition: "all 0.2s ease", borderRadius: "1px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = color;
                      e.currentTarget.style.borderColor = `${color}40`;
                      e.currentTarget.style.background = `${color}10`;
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = `0 4px 14px ${color}28`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(232,224,208,0.4)";
                      e.currentTarget.style.borderColor = "rgba(200,160,64,0.16)";
                      e.currentTarget.style.background = "rgba(200,160,64,0.04)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className={`glass-card reveal-right ${inView ? "visible" : ""}`} style={{ padding: "32px" }}>
            <div style={{
              fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem",
              letterSpacing: "0.2em", color: "#C8A040",
              marginBottom: "24px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              ◈ SECURE TRANSMISSION
              <div style={{ flex: 1, height: "1px", background: "rgba(200,160,64,0.18)" }} />
            </div>

            <form ref={form} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <label style={{ display: "block", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "rgba(232,224,208,0.3)", marginBottom: "7px", textTransform: "uppercase", letterSpacing: "0.14em" }}>[ CALLSIGN ]</label>
                <input type="text" name="name" required placeholder="Your name" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "rgba(232,224,208,0.3)", marginBottom: "7px", textTransform: "uppercase", letterSpacing: "0.14em" }}>[ FREQUENCY ]</label>
                <input type="email" name="email" required placeholder="you@example.com" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "rgba(232,224,208,0.3)", marginBottom: "7px", textTransform: "uppercase", letterSpacing: "0.14em" }}>[ TRANSMISSION ]</label>
                <textarea name="message" required rows={5} placeholder="Enter your message..." style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }} onFocus={onFocus} onBlur={onBlur} />
              </div>
              <button
                type="submit"
                disabled={sending}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "12px 24px",
                  background: sending ? "rgba(200,160,64,0.06)" : "linear-gradient(135deg, #8B1A1A, #CC5500)",
                  color: sending ? "rgba(232,224,208,0.4)" : "#fff",
                  border: sending ? "1px solid rgba(200,160,64,0.2)" : "none",
                  borderRadius: "1px",
                  fontFamily: "'Rajdhani',sans-serif", fontWeight: 700,
                  fontSize: "0.88rem", letterSpacing: "0.12em", textTransform: "uppercase",
                  cursor: sending ? "not-allowed" : "none",
                  transition: "all 0.25s ease",
                  boxShadow: sending ? "none" : "0 4px 20px rgba(139,26,26,0.45)",
                }}
              >
                {sending ? "TRANSMITTING…" : "SEND TRANSMISSION"} {!sending && <Send size={15} />}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
        input::placeholder, textarea::placeholder { color: rgba(232,224,208,0.18); font-family: 'Rajdhani', sans-serif; }
        input, textarea { color-scheme: dark; }
      `}</style>
    </section>
  );
};

export default ContactSection;
