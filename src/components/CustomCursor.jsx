import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const ringRef  = useRef(null);
  const dotRef   = useRef(null);
  const trailRef = useRef([]);

  useEffect(() => {
    const ring = ringRef.current;
    const dot  = dotRef.current;
    if (!ring || !dot) return;

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top  = my + "px";
    };

    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      raf = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      ring.style.width  = "48px";
      ring.style.height = "48px";
      ring.style.borderColor = "rgba(204,85,0,0.8)";
      ring.style.background  = "rgba(204,85,0,0.05)";
    };
    const onLeave = () => {
      ring.style.width  = "30px";
      ring.style.height = "30px";
      ring.style.borderColor = "rgba(200,160,64,0.65)";
      ring.style.background  = "transparent";
    };
    const onDown = () => { ring.style.transform = "translate(-50%,-50%) scale(0.75)"; };
    const onUp   = () => { ring.style.transform = "translate(-50%,-50%) scale(1)"; };

    const linkEls = document.querySelectorAll("a, button, [role='button'], input, textarea");
    linkEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      linkEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Outer ring — laggy */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          border: "1.5px solid rgba(200,160,64,0.65)",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%,-50%)",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease",
          mixBlendMode: "screen",
        }}
      />
      {/* Inner dot — instant */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "#C8A040",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%,-50%)",
          boxShadow: "0 0 8px 2px rgba(200,160,64,0.75)",
        }}
      />
    </>
  );
};

export default CustomCursor;
