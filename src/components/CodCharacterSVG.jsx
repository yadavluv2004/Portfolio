/* COD Ghost-style operator SVG — skull balaclava, plate carrier, AR, green streaks */
const CodCharacterSVG = ({ style }) => (
  <svg
    viewBox="0 0 500 920"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMax meet"
    style={{ width: "100%", height: "100%", display: "block", ...style }}
  >
    <defs>
      {/* Gradients */}
      <linearGradient id="bodyShade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1e2d18" />
        <stop offset="60%" stopColor="#141a0e" />
        <stop offset="100%" stopColor="#0e100a" />
      </linearGradient>
      <linearGradient id="vestGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1a2614" />
        <stop offset="100%" stopColor="#0c0e08" />
      </linearGradient>
      <linearGradient id="greenLeft" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00FF41" stopOpacity="0.75" />
        <stop offset="35%" stopColor="#00FF41" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#00FF41" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="amberRight" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#C8A040" stopOpacity="0.55" />
        <stop offset="35%" stopColor="#C8A040" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#C8A040" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="bottomFade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#080808" stopOpacity="0" />
        <stop offset="100%" stopColor="#080808" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="leftFade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#080808" stopOpacity="1" />
        <stop offset="55%" stopColor="#080808" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="topFade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#080808" stopOpacity="1" />
        <stop offset="100%" stopColor="#080808" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="greenStreak1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#00FF41" stopOpacity="0" />
        <stop offset="20%" stopColor="#00FF41" stopOpacity="0.65" />
        <stop offset="60%" stopColor="#39FF14" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#00FF41" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="greenStreak2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#00CC33" stopOpacity="0" />
        <stop offset="30%" stopColor="#00CC33" stopOpacity="0.35" />
        <stop offset="70%" stopColor="#00CC33" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#00CC33" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="skullFade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#D8D2C4" />
        <stop offset="100%" stopColor="#A8A298" />
      </linearGradient>
      <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#1a2a10" />
        <stop offset="100%" stopColor="#080808" />
      </radialGradient>
      <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
      <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* ══════════════════════════════════════════
        BACKGROUND ATMOSPHERIC GREEN STREAKS
        (The signature COD MW2 Ghost artwork look)
    ══════════════════════════════════════════ */}

    {/* Wide diffuse green glow behind character - left side */}
    <rect x="0" y="0" width="220" height="920" fill="#003310" opacity="0.22" />

    {/* Primary bright vertical streak */}
    <rect x="145" y="0" width="3" height="920" fill="url(#greenStreak1)" filter="url(#softBlur)" />
    {/* Wide soft glow around primary streak */}
    <rect x="120" y="0" width="55" height="920" fill="url(#greenStreak2)" opacity="0.5" />

    {/* Secondary streak */}
    <rect x="178" y="0" width="2" height="920" fill="url(#greenStreak1)" opacity="0.55" />
    <rect x="165" y="0" width="28" height="920" fill="url(#greenStreak2)" opacity="0.3" />

    {/* Thin accent streak */}
    <rect x="108" y="0" width="1.5" height="920" fill="url(#greenStreak1)" opacity="0.4" />

    {/* Far right amber accent streak */}
    <rect x="440" y="0" width="2" height="920" fill="#C8A040" opacity="0.3" filter="url(#softBlur)" />
    <rect x="420" y="0" width="40" height="920" fill="#C8A040" opacity="0.06" />

    {/* ══════════════════════════════════════════
        CHARACTER BODY — back to front
    ══════════════════════════════════════════ */}

    {/* ── LEGS (lower, mostly faded) ── */}
    <path d="M 195 640 L 255 640 L 260 920 L 190 920 Z" fill="#141a0e" />
    <path d="M 260 640 L 320 640 L 330 920 L 265 920 Z" fill="#101408" />

    {/* ── TORSO MAIN SHAPE ── */}
    {/* Wide shoulder block */}
    <path d="M 80 285 L 420 285 L 395 640 L 105 640 Z" fill="url(#bodyShade)" />

    {/* ── TACTICAL PLATE CARRIER / VEST ── */}
    {/* Front chest plate */}
    <path d="M 160 298 L 340 298 L 352 490 L 148 490 Z" fill="url(#vestGrad)" />

    {/* Chest plate center ridge */}
    <line x1="250" y1="302" x2="250" y2="486" stroke="#1e2a16" strokeWidth="2.5" />

    {/* MOLLE webbing rows */}
    {[320, 342, 364, 386, 408, 430, 452].map((y, i) => (
      <line key={i} x1="158" y1={y} x2="342" y2={y} stroke="#1a2614" strokeWidth="1.5" strokeDasharray="9 4" />
    ))}

    {/* Front pouch left */}
    <rect x="168" y="348" width="52" height="40" rx="3" fill="#0d1009" stroke="#1a2010" strokeWidth="1" />
    <line x1="168" y1="368" x2="220" y2="368" stroke="#1a2010" strokeWidth="1" />

    {/* Front pouch right */}
    <rect x="280" y="348" width="52" height="40" rx="3" fill="#0d1009" stroke="#1a2010" strokeWidth="1" />
    <line x1="280" y1="368" x2="332" y2="368" stroke="#1a2010" strokeWidth="1" />

    {/* Radio/admin pouch — left chest */}
    <rect x="168" y="298" width="38" height="42" rx="2" fill="#0a0d06" stroke="#141a0f" strokeWidth="1" />

    {/* Cummerbund sides */}
    <rect x="110" y="430" width="50" height="80" rx="4" fill="#141a0e" />
    <rect x="340" y="430" width="50" height="80" rx="4" fill="#0e1208" />

    {/* ── SHOULDER PAULDRONS ── */}
    {/* Left */}
    <path d="M 80 285 L 42 330 L 55 358 L 100 308 Z" fill="#1a2410" />
    <ellipse cx="48" cy="345" rx="28" ry="18" fill="#141e0e" />
    {/* Left upper arm attachment */}
    <path d="M 42 330 L 15 420 L 35 430 L 58 345 Z" fill="#141a0e" />

    {/* Right */}
    <path d="M 420 285 L 458 330 L 445 358 L 400 308 Z" fill="#141e0e" />
    <ellipse cx="452" cy="345" rx="28" ry="18" fill="#0f1a0a" />
    {/* Right upper arm attachment */}
    <path d="M 458 330 L 485 420 L 465 430 L 442 345 Z" fill="#141a0e" />

    {/* ── LEFT ARM (holding foregrip) ── */}
    {/* Forearm going down-left */}
    <path d="M 15 420 L -22 510 L 3 520 L 40 432 Z" fill="#101408" />
    {/* Left gloved hand at foregrip */}
    <ellipse cx="-9" cy="522" rx="24" ry="16" fill="#0a0a0a" />

    {/* ── RIGHT ARM (going to pistol grip / stock) ── */}
    {/* Forearm */}
    <path d="M 485 420 L 512 490 L 492 498 L 465 432 Z" fill="#101408" />
    {/* Right gloved hand */}
    <ellipse cx="504" cy="500" rx="22" ry="15" fill="#0a0a0a" />

    {/* ══════════════════════════════════════════
        ASSAULT RIFLE — M4/AR style
    ══════════════════════════════════════════ */}

    {/* STOCK */}
    <path d="M 436 455 L 506 468 L 500 493 L 430 480 Z" fill="#0d0d0d" />
    <path d="M 500 468 L 522 476 L 516 500 L 498 493 Z" fill="#111" />
    {/* Stock cheek weld indent */}
    <path d="M 445 460 L 496 470 L 492 480 L 440 470 Z" fill="#0a0a0a" />

    {/* BUFFER TUBE */}
    <rect x="400" y="455" width="40" height="22" rx="5" fill="#101010" />

    {/* LOWER RECEIVER */}
    <rect x="280" y="458" width="125" height="28" rx="4" fill="#0f0f0f" />

    {/* PISTOL GRIP */}
    <path d="M 315 486 L 338 486 L 344 540 L 309 540 Z" fill="#0a0a0a" />
    <rect x="308" y="536" width="38" height="8" rx="2" fill="#0d0d0d" />

    {/* TRIGGER GUARD */}
    <path d="M 310 484 Q 302 510 310 516 L 334 516 Q 342 510 334 484 Z" fill="none" stroke="#0d0d0d" strokeWidth="3" />

    {/* MAGAZINE */}
    <path d="M 245 486 L 285 486 L 288 565 L 242 565 Z" fill="#0c0c0c" />
    <path d="M 242 562 Q 265 578 288 562" stroke="#111" strokeWidth="2.5" fill="none" />

    {/* UPPER RECEIVER */}
    <rect x="100" y="448" width="305" height="26" rx="4" fill="#0d0d0d" />

    {/* CHARGING HANDLE */}
    <path d="M 376 443 L 384 428 L 400 434 L 392 449 Z" fill="#0a0a0a" />

    {/* HANDGUARD (M-LOK) */}
    <rect x="8" y="452" width="100" height="24" rx="4" fill="#0f0f0f" />
    {/* M-LOK slots top */}
    {[16, 28, 40, 52, 64, 76, 88].map((x, i) => (
      <rect key={`t${i}`} x={x} y="455" width="7" height="4" rx="1" fill="#0a0a0a" />
    ))}
    {/* M-LOK slots bottom */}
    {[16, 28, 40, 52, 64, 76, 88].map((x, i) => (
      <rect key={`b${i}`} x={x} y="467" width="7" height="4" rx="1" fill="#0a0a0a" />
    ))}

    {/* BARREL */}
    <rect x="-55" y="457" width="70" height="11" rx="2" fill="#0a0a0a" />

    {/* FLASH HIDER */}
    <rect x="-72" y="454" width="20" height="17" rx="2" fill="#111" />
    <line x1="-62" y1="453" x2="-62" y2="436" stroke="#111" strokeWidth="3" />
    {/* Vent cuts on flash hider */}
    <line x1="-70" y1="458" x2="-52" y2="458" stroke="#0a0a0a" strokeWidth="1" />
    <line x1="-70" y1="462" x2="-52" y2="462" stroke="#0a0a0a" strokeWidth="1" />
    <line x1="-70" y1="466" x2="-52" y2="466" stroke="#0a0a0a" strokeWidth="1" />

    {/* RAIL / OPTIC BASE */}
    <rect x="108" y="440" width="290" height="12" rx="2" fill="#111" />

    {/* SCOPE — ACOG style */}
    <rect x="190" y="420" width="130" height="24" rx="5" fill="#0a0a0a" />
    {/* Scope front lens */}
    <ellipse cx="204" cy="432" rx="10" ry="8" fill="#0a150a" stroke="#1a2a14" strokeWidth="1.5" />
    <ellipse cx="204" cy="432" rx="6" ry="5" fill="#061006" />
    {/* Scope rear lens */}
    <ellipse cx="306" cy="432" rx="10" ry="8" fill="#0a150a" stroke="#1a2a14" strokeWidth="1.5" />
    <ellipse cx="306" cy="432" rx="6" ry="5" fill="#061006" />
    {/* Scope body detail */}
    <line x1="218" y1="424" x2="290" y2="424" stroke="#111" strokeWidth="1.5" />
    <line x1="218" y1="442" x2="290" y2="442" stroke="#111" strokeWidth="1.5" />
    {/* Elevation turret */}
    <rect x="248" y="414" width="14" height="12" rx="2" fill="#111" />

    {/* ══════════════════════════════════════════
        NECK
    ══════════════════════════════════════════ */}
    <path d="M 222 258 L 278 258 L 285 290 L 215 290 Z" fill="#1a1a1a" />

    {/* ══════════════════════════════════════════
        HEAD
    ══════════════════════════════════════════ */}

    {/* Head base */}
    <ellipse cx="250" cy="168" rx="82" ry="92" fill="#1a1a1a" />

    {/* ── TACTICAL BEANIE / CAP ── */}
    <path d="M 170 148 Q 250 62 330 148 L 327 168 L 318 158 Q 250 78 182 158 L 173 168 Z" fill="#1e2d14" />
    {/* Cap ribbing */}
    <path d="M 173 152 Q 250 102 327 152" stroke="#141e0e" strokeWidth="2" fill="none" opacity="0.7" />
    <path d="M 176 162 Q 250 112 324 162" stroke="#141e0e" strokeWidth="1.5" fill="none" opacity="0.4" />

    {/* ── TACTICAL HEADSET ── */}
    {/* Left cup */}
    <path d="M 170 162 Q 145 170 138 192 L 150 196 Q 156 178 170 174 Z" fill="#111" />
    <ellipse cx="138" cy="196" rx="14" ry="10" fill="#0d0d0d" stroke="#1a1a1a" strokeWidth="1.5" />
    <circle cx="138" cy="196" r="6" fill="#111" />
    <circle cx="138" cy="196" r="2.5" fill="#1a1a1a" />
    {/* Right cup */}
    <path d="M 330 162 Q 355 170 362 192 L 350 196 Q 344 178 330 174 Z" fill="#111" />
    <ellipse cx="362" cy="196" rx="14" ry="10" fill="#0d0d0d" stroke="#1a1a1a" strokeWidth="1.5" />
    <circle cx="362" cy="196" r="6" fill="#111" />
    <circle cx="362" cy="196" r="2.5" fill="#1a1a1a" />
    {/* Headset band */}
    <path d="M 148 172 Q 250 118 352 172" stroke="#0d0d0d" strokeWidth="5" fill="none" />
    <path d="M 148 172 Q 250 118 352 172" stroke="#1a1a1a" strokeWidth="2" fill="none" />

    {/* ── SKULL BALACLAVA MASK ── */}
    {/* The mask covers the entire lower face with painted skull pattern */}

    {/* White skull forehead - top of skull shape */}
    <path d="M 190 148 Q 250 110 310 148 L 308 170 Q 250 130 192 170 Z" fill="url(#skullFade)" opacity="0.88" />

    {/* Left temporal bone - side of skull */}
    <path d="M 170 158 L 192 170 L 190 195 L 174 192 Q 160 178 168 162 Z" fill="#C0BAB0" opacity="0.55" />
    {/* Right temporal bone */}
    <path d="M 330 158 L 308 170 L 310 195 L 326 192 Q 340 178 332 162 Z" fill="#C0BAB0" opacity="0.45" />

    {/* LEFT EYE SOCKET — dark hollow */}
    <ellipse cx="213" cy="170" rx="30" ry="22" fill="#0d0d0d" />
    {/* Slight inner reflection / depth */}
    <ellipse cx="207" cy="166" rx="12" ry="9" fill="url(#eyeGlow)" />

    {/* RIGHT EYE SOCKET */}
    <ellipse cx="287" cy="170" rx="30" ry="22" fill="#0d0d0d" />
    <ellipse cx="281" cy="166" rx="12" ry="9" fill="url(#eyeGlow)" />

    {/* NASAL CAVITY (triangle) */}
    <path d="M 242 190 L 258 190 L 252 205 L 248 205 Z" fill="#0a0a0a" />
    {/* Nasal bridge line */}
    <line x1="250" y1="148" x2="250" y2="190" stroke="#0a0a0a" strokeWidth="2" opacity="0.5" />

    {/* CHEEKBONES */}
    <path d="M 182 192 Q 205 206 228 198" stroke="#C8C0B0" strokeWidth="2.5" fill="none" opacity="0.6" />
    <path d="M 272 198 Q 295 206 318 192" stroke="#C8C0B0" strokeWidth="2.5" fill="none" opacity="0.5" />

    {/* SKULL JAW — white lower face area */}
    <path d="M 185 208 Q 185 238 250 244 Q 315 238 315 208 L 308 206 Q 308 230 250 236 Q 192 230 192 206 Z"
      fill="#C8C2B4" opacity="0.72" />

    {/* TEETH ROW — most iconic Ghost feature */}
    {Array.from({ length: 8 }, (_, i) => {
      const x = 194 + i * 16;
      const h = i === 0 || i === 7 ? 10 : i === 1 || i === 6 ? 13 : 15;
      return (
        <rect key={`tooth-${i}`} x={x} y={206} width={12} height={h} rx={1.5}
          fill="#EAE4D8" opacity={0.92} />
      );
    })}

    {/* Gum line above teeth */}
    <rect x="193" y="203" width="114" height="5" rx="1.5" fill="#B8B0A0" opacity="0.5" />

    {/* Lower jaw bottom edge */}
    <path d="M 193 222 Q 250 248 307 222" stroke="#C0BAB0" strokeWidth="1.5" fill="none" opacity="0.4" />

    {/* Chin */}
    <path d="M 198 240 Q 250 265 302 240 Q 305 255 250 268 Q 195 255 198 240 Z" fill="#1a1a1a" />

    {/* ── NVG MOUNT (on cap, tactical detail) ── */}
    <rect x="228" y="120" width="44" height="14" rx="3" fill="#111" />
    <rect x="234" y="112" width="10" height="12" rx="2" fill="#0d0d0d" />
    <rect x="256" y="112" width="10" height="12" rx="2" fill="#0d0d0d" />
    {/* NVG tubes */}
    <ellipse cx="239" cy="108" rx="7" ry="7" fill="#0a0a0a" stroke="#111" strokeWidth="1" />
    <ellipse cx="261" cy="108" rx="7" ry="7" fill="#0a0a0a" stroke="#111" strokeWidth="1" />

    {/* ══════════════════════════════════════════
        LIGHTING OVERLAYS
    ══════════════════════════════════════════ */}

    {/* Green rim light wash over entire scene — left to right fade */}
    <rect x="0" y="0" width="500" height="920" fill="url(#greenLeft)" opacity="0.55" />

    {/* Amber rim light — right edge */}
    <rect x="0" y="0" width="500" height="920" fill="url(#amberRight)" opacity="0.45" />

    {/* Green edge line (hard left rim) */}
    <rect x="0" y="80" width="1.5" height="840" fill="#00FF41" opacity="0.4" />

    {/* ══════════════════════════════════════════
        EDGE FADES — blend into page bg
    ══════════════════════════════════════════ */}
    {/* Top fade */}
    <rect x="0" y="0" width="500" height="120" fill="url(#topFade)" />
    {/* Bottom fade */}
    <rect x="0" y="720" width="500" height="200" fill="url(#bottomFade)" />
    {/* Left fade (blends text content) */}
    <rect x="0" y="0" width="320" height="920" fill="url(#leftFade)" />
  </svg>
);

export default CodCharacterSVG;
