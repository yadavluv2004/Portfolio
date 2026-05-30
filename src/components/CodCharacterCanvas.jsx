import { useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════
   COD Operator — Canvas illustration
   Inspiration: Ghost / MW2 skull-mask operator with rifle
   Proportions: small head (1/8 height), wide armoured body,
   prominent M4 rifle, atmospheric green lighting
══════════════════════════════════════════════════════ */
export default function CodCharacterCanvas({ style }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    paint(ctx, cv.width, cv.height);
  }, []);
  return (
    <canvas
      ref={ref}
      width={500}
      height={920}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
    />
  );
}

/* ── character constants ── */
// Head centre
const HX = 258, HY = 112;
// Head radii
const HRX = 50, HRY = 56;

function paint(ctx, W, H) {
  drawBackground(ctx, W, H);
  drawGreenStreaks(ctx, W, H);
  drawFog(ctx, W, H);
  drawLegs(ctx, W, H);
  drawTorso(ctx, W, H);
  drawLeftArm(ctx, W, H);
  drawRightArm(ctx, W, H);
  drawRifle(ctx, W, H);
  drawNeck(ctx, W, H);
  drawHead(ctx, W, H);
  drawRimLighting(ctx, W, H);
  drawEdgeFades(ctx, W, H);
}

/* ────────────────────────────────────────────────────
   BACKGROUND
──────────────────────────────────────────────────── */
function drawBackground(ctx, W, H) {
  ctx.fillStyle = "#05060A";
  ctx.fillRect(0, 0, W, H);

  // Dark ground plane gradient
  const ground = ctx.createLinearGradient(0, H * 0.7, 0, H);
  ground.addColorStop(0, "rgba(0,0,0,0)");
  ground.addColorStop(1, "rgba(0,8,2,0.5)");
  ctx.fillStyle = ground;
  ctx.fillRect(0, H * 0.7, W, H * 0.3);
}

/* ────────────────────────────────────────────────────
   GREEN VERTICAL STREAKS  (Ghost artwork signature)
──────────────────────────────────────────────────── */
function drawGreenStreaks(ctx, W, H) {
  const streaks = [
    { x: 148, w: 2.5, opacity: 0.70 },
    { x: 154, w: 20,  opacity: 0.14 },
    { x: 170, w: 2,   opacity: 0.52 },
    { x: 175, w: 30,  opacity: 0.09 },
    { x: 192, w: 1.5, opacity: 0.38 },
    { x: 210, w: 1,   opacity: 0.22 },
    { x: 228, w: 1,   opacity: 0.15 },
  ];
  streaks.forEach(({ x, w, opacity }) => {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0,    `rgba(0,255,65,0)`);
    g.addColorStop(0.12, `rgba(0,255,65,${opacity})`);
    g.addColorStop(0.55, `rgba(57,255,20,${opacity * 0.85})`);
    g.addColorStop(0.88, `rgba(0,200,50,${opacity * 0.35})`);
    g.addColorStop(1,    `rgba(0,255,65,0)`);
    ctx.fillStyle = g;
    ctx.fillRect(x - w / 2, 0, w, H);
  });
}

/* ────────────────────────────────────────────────────
   ATMOSPHERIC FOG / HAZE  (battlefield atmosphere)
──────────────────────────────────────────────────── */
function drawFog(ctx, W, H) {
  // Mid-background haze
  const haze = ctx.createRadialGradient(W * 0.55, H * 0.5, 20, W * 0.55, H * 0.5, W * 0.85);
  haze.addColorStop(0,   "rgba(18,30,12,0.28)");
  haze.addColorStop(0.6, "rgba(8,14,5,0.12)");
  haze.addColorStop(1,   "rgba(0,0,0,0)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, W, H);

  // Ground fog
  const fog = ctx.createLinearGradient(0, H * 0.72, 0, H * 0.85);
  fog.addColorStop(0, "rgba(10,22,8,0)");
  fog.addColorStop(1, "rgba(10,22,8,0.35)");
  ctx.fillStyle = fog;
  ctx.fillRect(0, H * 0.72, W, H * 0.28);
}

/* ────────────────────────────────────────────────────
   LEGS  (tactical trousers + boots)
──────────────────────────────────────────────────── */
function drawLegs(ctx, W, H) {
  // Left leg
  ctx.fillStyle = "#111a0c";
  ctx.beginPath();
  ctx.moveTo(178, 625); ctx.lineTo(238, 625);
  ctx.lineTo(240, 850); ctx.lineTo(176, 850);
  ctx.closePath(); ctx.fill();

  // Right leg
  ctx.fillStyle = "#0d1509";
  ctx.beginPath();
  ctx.moveTo(252, 625); ctx.lineTo(318, 625);
  ctx.lineTo(320, 850); ctx.lineTo(250, 850);
  ctx.closePath(); ctx.fill();

  // Left boot
  ctx.fillStyle = "#0a0c08";
  ctx.beginPath();
  ctx.moveTo(172, 848); ctx.lineTo(244, 848);
  ctx.lineTo(248, 895); ctx.lineTo(168, 895);
  ctx.closePath(); ctx.fill();

  // Right boot
  ctx.fillStyle = "#090b07";
  ctx.beginPath();
  ctx.moveTo(248, 848); ctx.lineTo(324, 848);
  ctx.lineTo(328, 895); ctx.lineTo(244, 895);
  ctx.closePath(); ctx.fill();

  // Knee pads
  ctx.fillStyle = "#1a2414";
  ellipse(ctx, 208, 618, 26, 18);
  ctx.fillStyle = "#151c10";
  ellipse(ctx, 284, 618, 26, 18);

  // Trouser cargo pocket - left
  ctx.fillStyle = "#0f1a0a";
  rect(ctx, 178, 680, 50, 48, 3);
  ctx.strokeStyle = "#1a2812"; ctx.lineWidth = 1;
  ctx.strokeRect(180, 682, 46, 44);

  // Trouser cargo pocket - right
  ctx.fillStyle = "#0c1508";
  rect(ctx, 264, 680, 50, 48, 3);
  ctx.strokeStyle = "#151e0e"; ctx.lineWidth = 1;
  ctx.strokeRect(266, 682, 46, 44);
}

/* ────────────────────────────────────────────────────
   TORSO  (full plate carrier / tactical vest)
──────────────────────────────────────────────────── */
function drawTorso(ctx, W, H) {
  // ── Main body silhouette ──
  ctx.save();
  ctx.shadowColor = "#1a3a10"; ctx.shadowBlur = 28;
  ctx.fillStyle = "#141e0e";
  ctx.beginPath();
  ctx.moveTo(78, 218);
  ctx.bezierCurveTo(60, 205, 148, 196, 208, 198);
  ctx.lineTo(210, 218); ctx.lineTo(308, 218);
  ctx.lineTo(310, 198);
  ctx.bezierCurveTo(372, 196, 460, 205, 442, 218);
  ctx.bezierCurveTo(455, 285, 440, 430, 418, 625);
  ctx.lineTo(82, 625);
  ctx.bezierCurveTo(62, 430, 46, 285, 78, 218);
  ctx.closePath(); ctx.fill();
  ctx.restore();

  // ── Front SAPI plate carrier ──
  ctx.fillStyle = "#0e1508";
  ctx.beginPath();
  ctx.moveTo(165, 212);
  ctx.lineTo(355, 212);
  ctx.bezierCurveTo(372, 212, 376, 230, 374, 248);
  ctx.lineTo(362, 510);
  ctx.bezierCurveTo(359, 528, 342, 536, 325, 536);
  ctx.lineTo(175, 536);
  ctx.bezierCurveTo(158, 536, 141, 528, 138, 510);
  ctx.lineTo(126, 248);
  ctx.bezierCurveTo(124, 230, 128, 212, 165, 212);
  ctx.closePath(); ctx.fill();

  // ── Center chest ridge ──
  ctx.strokeStyle = "#1c2c12"; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(258, 218); ctx.lineTo(258, 530); ctx.stroke();

  // ── MOLLE webbing ──
  ctx.setLineDash([9, 4]); ctx.strokeStyle = "#19280f"; ctx.lineWidth = 1.5;
  for (let y = 252; y < 524; y += 22) {
    ctx.beginPath(); ctx.moveTo(138, y); ctx.lineTo(362, y); ctx.stroke();
  }
  ctx.setLineDash([]);

  // ── Admin pouch (upper left) ──
  ctx.fillStyle = "#0b0e07";
  rect(ctx, 168, 228, 44, 50, 3);
  ctx.strokeStyle = "#15200d"; ctx.lineWidth = 1;
  ctx.strokeRect(170, 230, 40, 46);
  // Buckle
  ctx.fillStyle = "#1e2e16";
  rect(ctx, 178, 272, 22, 5, 2);

  // ── Radio pouch (upper right) ──
  ctx.fillStyle = "#0c0f08";
  rect(ctx, 290, 228, 44, 50, 3);
  ctx.strokeStyle = "#15200d"; ctx.lineWidth = 1;
  ctx.strokeRect(292, 230, 40, 46);

  // ── Large mag pouches (lower chest, 2x) ──
  ctx.fillStyle = "#0d1509";
  rect(ctx, 168, 295, 56, 68, 3);
  rect(ctx, 278, 295, 56, 68, 3);
  ctx.strokeStyle = "#18220f"; ctx.lineWidth = 1;
  ctx.strokeRect(170, 297, 52, 64);
  ctx.strokeRect(280, 297, 52, 64);
  // Dividers
  ctx.strokeStyle = "#101808"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(196, 298); ctx.lineTo(196, 360); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(306, 298); ctx.lineTo(306, 360); ctx.stroke();

  // ── Medkit pouch (right side body) ──
  ctx.fillStyle = "#0c1008";
  rect(ctx, 370, 355, 38, 52, 3);
  ctx.strokeStyle = "#181e0e"; ctx.lineWidth = 1;
  ctx.strokeRect(372, 357, 34, 48);
  // Red cross symbol
  ctx.fillStyle = "#5a1010";
  ctx.fillRect(383, 366, 12, 4); ctx.fillRect(387, 362, 4, 12);

  // ── Shoulder pauldrons ──
  ctx.save();
  ctx.shadowColor = "#0a1408"; ctx.shadowBlur = 12;
  ctx.fillStyle = "#1a2810";
  ellipse(ctx, 80, 252, 42, 26);
  ctx.fillStyle = "#141e0c";
  ellipse(ctx, 440, 252, 42, 26);
  ctx.restore();

  // ── Cummerbund panels ──
  rect(ctx, 96, 450, 48, 100, 4);
  ctx.fillStyle = "#0e1409";
  rect(ctx, 356, 450, 48, 100, 4);
}

/* ────────────────────────────────────────────────────
   LEFT ARM  (toward foregrip)
──────────────────────────────────────────────────── */
function drawLeftArm(ctx, W, H) {
  // Upper arm
  ctx.fillStyle = "#121c0c";
  ctx.beginPath();
  ctx.moveTo(78, 232); ctx.bezierCurveTo(48, 258, 18, 340, 6, 398);
  ctx.bezierCurveTo(2, 416, 10, 428, 24, 430);
  ctx.bezierCurveTo(40, 432, 56, 422, 60, 406);
  ctx.bezierCurveTo(76, 348, 98, 274, 112, 246);
  ctx.closePath(); ctx.fill();

  // Elbow pad
  ctx.fillStyle = "#1e2c14";
  ellipse(ctx, 36, 385, 24, 17);

  // Forearm
  ctx.fillStyle = "#101808";
  ctx.beginPath();
  ctx.moveTo(24, 430); ctx.bezierCurveTo(10, 430, -2, 418, -2, 408);
  ctx.lineTo(-6, 408); ctx.lineTo(-6, 424);
  ctx.bezierCurveTo(-6, 436, 8, 444, 24, 442);
  ctx.closePath(); ctx.fill();

  // Gloved hand
  ctx.fillStyle = "#0a0a0a";
  ellipse(ctx, -4, 416, 22, 16);
}

/* ────────────────────────────────────────────────────
   RIGHT ARM  (toward pistol grip / stock)
──────────────────────────────────────────────────── */
function drawRightArm(ctx, W, H) {
  // Upper arm
  ctx.fillStyle = "#111a0c";
  ctx.beginPath();
  ctx.moveTo(442, 232); ctx.bezierCurveTo(472, 258, 494, 332, 498, 392);
  ctx.bezierCurveTo(500, 410, 492, 424, 478, 426);
  ctx.bezierCurveTo(462, 428, 446, 416, 442, 400);
  ctx.bezierCurveTo(434, 360, 416, 280, 400, 250);
  ctx.closePath(); ctx.fill();

  // Elbow pad
  ctx.fillStyle = "#1a2810";
  ellipse(ctx, 490, 372, 22, 16);

  // Gloved hand at pistol grip
  ctx.fillStyle = "#0a0a0a";
  ellipse(ctx, 480, 428, 22, 15);
}

/* ────────────────────────────────────────────────────
   RIFLE  (M4A1 assault rifle — prominent)
──────────────────────────────────────────────────── */
function drawRifle(ctx, W, H) {
  const CY = 414; // rifle centerline Y

  // ── STOCK ──
  ctx.fillStyle = "#0c0c0c";
  ctx.beginPath();
  ctx.moveTo(432, CY - 18); ctx.lineTo(508, CY - 8);
  ctx.lineTo(504, CY + 28); ctx.lineTo(428, CY + 18);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#0f0f0f";
  ctx.beginPath();
  ctx.moveTo(502, CY - 8); ctx.lineTo(522, CY - 2);
  ctx.lineTo(518, CY + 28); ctx.lineTo(500, CY + 28);
  ctx.closePath(); ctx.fill();
  // Stock cheek weld groove
  ctx.fillStyle = "#090909";
  ctx.beginPath();
  ctx.moveTo(440, CY - 14); ctx.lineTo(498, CY - 5);
  ctx.lineTo(496, CY + 8); ctx.lineTo(438, CY - 1);
  ctx.closePath(); ctx.fill();

  // ── BUFFER TUBE ──
  ctx.fillStyle = "#111";
  rect(ctx, 396, CY - 16, 40, 26, 5);

  // ── LOWER RECEIVER ──
  ctx.fillStyle = "#0f0f0f";
  rect(ctx, 268, CY - 18, 132, 34, 4);

  // ── PISTOL GRIP ──
  ctx.fillStyle = "#0a0a0a";
  ctx.beginPath();
  ctx.moveTo(314, CY + 16); ctx.bezierCurveTo(311, CY + 46, 308, CY + 80, 312, CY + 92);
  ctx.lineTo(334, CY + 92); ctx.bezierCurveTo(338, CY + 80, 336, CY + 46, 334, CY + 16);
  ctx.closePath(); ctx.fill();
  rect(ctx, 310, CY + 88, 26, 8, 2);

  // ── TRIGGER GUARD ──
  ctx.strokeStyle = "#0d0d0d"; ctx.lineWidth = 5; ctx.fillStyle = "transparent";
  ctx.beginPath(); ctx.arc(324, CY + 22, 20, 0, Math.PI); ctx.stroke();

  // ── MAGAZINE ──
  ctx.fillStyle = "#0c0c0c";
  ctx.beginPath();
  ctx.moveTo(210, CY + 16); ctx.lineTo(256, CY + 16);
  ctx.bezierCurveTo(259, CY + 58, 258, CY + 95, 254, CY + 106);
  ctx.bezierCurveTo(249, CY + 116, 218, CY + 116, 214, CY + 106);
  ctx.bezierCurveTo(210, CY + 95, 210, CY + 58, 210, CY + 16);
  ctx.closePath(); ctx.fill();
  // Mag base plate
  ctx.fillStyle = "#111";
  rect(ctx, 210, CY + 104, 46, 10, 3);

  // ── UPPER RECEIVER ──
  ctx.fillStyle = "#0d0d0d";
  rect(ctx, 98, CY - 32, 314, 32, 4);

  // ── CHARGING HANDLE ──
  ctx.fillStyle = "#0a0a0a";
  ctx.beginPath();
  ctx.moveTo(374, CY - 32); ctx.lineTo(383, CY - 50);
  ctx.lineTo(402, CY - 43); ctx.lineTo(393, CY - 25);
  ctx.closePath(); ctx.fill();

  // ── TOP RAIL ──
  ctx.fillStyle = "#111";
  rect(ctx, 104, CY - 38, 288, 10, 2);

  // ── HANDGUARD (M-LOK) ──
  ctx.fillStyle = "#0f0f0f";
  rect(ctx, 4, CY - 26, 102, 32, 4);
  // M-LOK slots top row
  ctx.fillStyle = "#0a0a0a";
  for (let i = 0; i < 7; i++) ctx.fillRect(12 + i * 13, CY - 22, 8, 5);
  // Bottom row
  for (let i = 0; i < 7; i++) ctx.fillRect(12 + i * 13, CY + 4, 8, 5);
  // Side rail
  ctx.fillStyle = "#111";
  rect(ctx, 4, CY - 12, 102, 8, 2);

  // ── BARREL ──
  ctx.fillStyle = "#0a0a0a";
  rect(ctx, -65, CY - 9, 78, 14, 3);

  // ── MUZZLE BRAKE ──
  ctx.fillStyle = "#101010";
  rect(ctx, -82, CY - 14, 22, 24, 3);
  // Vent cuts
  ctx.strokeStyle = "#0a0a0a"; ctx.lineWidth = 2;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath(); ctx.moveTo(-80, CY - 8 + i * 5); ctx.lineTo(-62, CY - 8 + i * 5); ctx.stroke();
  }
  // Muzzle flash glow (subtle)
  const mfg = ctx.createRadialGradient(-90, CY, 0, -90, CY, 30);
  mfg.addColorStop(0, "rgba(255,140,20,0.18)");
  mfg.addColorStop(1, "rgba(255,140,20,0)");
  ctx.fillStyle = mfg;
  ctx.fillRect(-120, CY - 30, 60, 60);

  // ── ACOG SCOPE ──
  ctx.fillStyle = "#0a0a0a";
  rect(ctx, 174, CY - 62, 140, 30, 5);
  // Rear eyepiece
  ctx.fillStyle = "#040804";
  ctx.beginPath(); ctx.ellipse(192, CY - 47, 13, 10, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#1a2c14"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.ellipse(192, CY - 47, 13, 10, 0, 0, Math.PI * 2); ctx.stroke();
  // Front lens
  ctx.fillStyle = "#040804";
  ctx.beginPath(); ctx.ellipse(300, CY - 47, 13, 10, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#1a2c14"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.ellipse(300, CY - 47, 13, 10, 0, 0, Math.PI * 2); ctx.stroke();
  // Top turret
  rect(ctx, 238, CY - 74, 18, 16, 3);
  // Scope body lines
  ctx.strokeStyle = "#111"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(208, CY - 64); ctx.lineTo(278, CY - 64); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(208, CY - 36); ctx.lineTo(278, CY - 36); ctx.stroke();

  // ── PEQ-15 LASER UNIT ──
  ctx.fillStyle = "#0d0d0d";
  rect(ctx, 108, CY - 56, 52, 20, 3);
  // Laser aperture
  ctx.fillStyle = "rgba(255,30,10,0.7)";
  ctx.beginPath(); ctx.arc(114, CY - 46, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "rgba(255,30,10,0.25)";
  ctx.beginPath(); ctx.arc(114, CY - 46, 9, 0, Math.PI * 2); ctx.fill();
}

/* ────────────────────────────────────────────────────
   NECK
──────────────────────────────────────────────────── */
function drawNeck(ctx, W, H) {
  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath();
  ctx.moveTo(228, 163); ctx.lineTo(288, 163);
  ctx.lineTo(294, 202); ctx.lineTo(222, 202);
  ctx.closePath(); ctx.fill();
  // Collar / balaclava edge
  ctx.fillStyle = "#141414";
  rect(ctx, 218, 198, 84, 24, 4);
}

/* ────────────────────────────────────────────────────
   HEAD + SKULL BALACLAVA
──────────────────────────────────────────────────── */
function drawHead(ctx, W, H) {
  // ── Head base ──
  ctx.save();
  ctx.shadowColor = "#162412"; ctx.shadowBlur = 20;
  ctx.fillStyle = "#1c1c1c";
  ctx.beginPath(); ctx.ellipse(HX, HY, HRX, HRY, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  // ── Tactical beanie ──
  ctx.fillStyle = "#1e2e14";
  ctx.beginPath();
  ctx.moveTo(HX - HRX, HY - 8);
  ctx.bezierCurveTo(HX - HRX + 5, HY - HRY - 28, HX + HRX - 5, HY - HRY - 28, HX + HRX, HY - 8);
  ctx.bezierCurveTo(HX + HRX - 10, HY + 2, HX - HRX + 10, HY + 2, HX - HRX, HY - 8);
  ctx.closePath(); ctx.fill();
  // Ribbing lines on beanie
  ctx.strokeStyle = "#16240f"; ctx.lineWidth = 2;
  for (let i = 1; i <= 3; i++) {
    const oy = -14 + i * 8;
    ctx.beginPath();
    ctx.ellipse(HX, HY + oy, HRX - 6, 10, 0, -0.7, Math.PI + 0.7);
    ctx.stroke();
  }

  // ── NVG mount bracket ──
  ctx.fillStyle = "#111";
  rect(ctx, HX - 24, HY - HRY - 12, 48, 16, 3);
  // NVG tubes (folded up)
  ctx.fillStyle = "#0d0d0d";
  rect(ctx, HX - 20, HY - HRY - 26, 16, 16, 4);
  rect(ctx, HX + 4,  HY - HRY - 26, 16, 16, 4);
  ctx.fillStyle = "#050805";
  ctx.beginPath(); ctx.arc(HX - 12, HY - HRY - 20, 6, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(HX + 12, HY - HRY - 20, 6, 0, Math.PI * 2); ctx.fill();

  // ── Headset ──
  // Left cup
  ctx.fillStyle = "#0d0d0d";
  ctx.beginPath(); ctx.ellipse(HX - HRX - 10, HY + 8, 15, 12, 0.2, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#1a1a1a"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(HX - HRX - 10, HY + 8, 15, 12, 0.2, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = "#111";
  ctx.beginPath(); ctx.arc(HX - HRX - 10, HY + 8, 6, 0, Math.PI * 2); ctx.fill();
  // Right cup
  ctx.fillStyle = "#0d0d0d";
  ctx.beginPath(); ctx.ellipse(HX + HRX + 10, HY + 8, 15, 12, -0.2, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#1a1a1a"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(HX + HRX + 10, HY + 8, 15, 12, -0.2, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = "#111";
  ctx.beginPath(); ctx.arc(HX + HRX + 10, HY + 8, 6, 0, Math.PI * 2); ctx.fill();
  // Headset band over cap
  ctx.strokeStyle = "#0d0d0d"; ctx.lineWidth = 7; ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(HX - HRX - 10, HY + 4);
  ctx.bezierCurveTo(HX - HRX, HY - HRY - 30, HX + HRX, HY - HRY - 30, HX + HRX + 10, HY + 4);
  ctx.stroke();
  // Boom mic
  ctx.strokeStyle = "#0a0a0a"; ctx.lineWidth = 2.5; ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(HX - HRX - 10, HY + 16);
  ctx.bezierCurveTo(HX - HRX - 16, HY + 32, HX - HRX - 5, HY + 48, HX - HRX + 14, HY + 50);
  ctx.stroke();
  ctx.fillStyle = "#0d0d0d";
  ctx.beginPath(); ctx.arc(HX - HRX + 14, HY + 50, 4, 0, Math.PI * 2); ctx.fill();

  // ── SKULL BALACLAVA MASK ──
  drawSkullMask(ctx);
}

/* ────────────────────────────────────────────────────
   GHOST SKULL MASK  — the iconic COD element
──────────────────────────────────────────────────── */
function drawSkullMask(ctx) {
  // White skull paint upper forehead
  ctx.save();
  ctx.globalAlpha = 0.88;
  ctx.fillStyle = "#ccc6b4";
  ctx.beginPath();
  ctx.moveTo(HX - HRX + 4, HY - 14);
  ctx.bezierCurveTo(HX - HRX + 8, HY - 44, HX + HRX - 8, HY - 44, HX + HRX - 4, HY - 14);
  ctx.bezierCurveTo(HX + HRX - 12, HY - 2, HX - HRX + 12, HY - 2, HX - HRX + 4, HY - 14);
  ctx.closePath(); ctx.fill();
  ctx.restore();

  // Left temporal / cheek area white
  ctx.save(); ctx.globalAlpha = 0.52;
  ctx.fillStyle = "#b8b2a0";
  ctx.beginPath(); ctx.ellipse(HX - HRX + 8, HY + 12, 18, 26, 0.25, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  // Right temporal
  ctx.save(); ctx.globalAlpha = 0.44;
  ctx.fillStyle = "#b0aa98";
  ctx.beginPath(); ctx.ellipse(HX + HRX - 8, HY + 12, 18, 26, -0.25, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  // ── LEFT EYE SOCKET  (dark hollow) ──
  ctx.fillStyle = "#050505";
  ctx.beginPath(); ctx.ellipse(HX - 20, HY + 8, 20, 15, 0, 0, Math.PI * 2); ctx.fill();
  // Subtle green NVG inner reflection
  ctx.save(); ctx.globalAlpha = 0.3;
  ctx.fillStyle = "#0a2010";
  ctx.beginPath(); ctx.ellipse(HX - 24, HY + 5, 9, 7, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  // ── RIGHT EYE SOCKET ──
  ctx.fillStyle = "#050505";
  ctx.beginPath(); ctx.ellipse(HX + 20, HY + 8, 20, 15, 0, 0, Math.PI * 2); ctx.fill();
  ctx.save(); ctx.globalAlpha = 0.3;
  ctx.fillStyle = "#0a2010";
  ctx.beginPath(); ctx.ellipse(HX + 24, HY + 5, 9, 7, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  // ── NASAL CAVITY ──
  ctx.fillStyle = "#050505";
  ctx.beginPath();
  ctx.moveTo(HX - 7, HY + 26); ctx.lineTo(HX + 7, HY + 26);
  ctx.lineTo(HX + 5, HY + 40); ctx.lineTo(HX - 5, HY + 40);
  ctx.closePath(); ctx.fill();
  // Nasal bridge
  ctx.strokeStyle = "rgba(50,45,35,0.45)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(HX, HY - 6); ctx.lineTo(HX, HY + 26); ctx.stroke();

  // ── CHEEKBONES ──
  ctx.strokeStyle = "rgba(190,184,168,0.65)";
  ctx.lineWidth = 2.5; ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(HX - HRX + 5, HY + 28);
  ctx.bezierCurveTo(HX - 34, HY + 40, HX - 18, HY + 38, HX - 8, HY + 33);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(HX + HRX - 5, HY + 28);
  ctx.bezierCurveTo(HX + 34, HY + 40, HX + 18, HY + 38, HX + 8, HY + 33);
  ctx.stroke();

  // ── JAW WHITE AREA ──
  ctx.save(); ctx.globalAlpha = 0.76;
  ctx.fillStyle = "#c4be0c";  // will look pale/bone with globalAlpha
  ctx.fillStyle = "#c4bead";
  ctx.beginPath();
  ctx.moveTo(HX - HRX + 4, HY + 44);
  ctx.bezierCurveTo(HX - HRX + 6, HY + 68, HX - 26, HY + 80, HX, HY + 82);
  ctx.bezierCurveTo(HX + 26, HY + 80, HX + HRX - 6, HY + 68, HX + HRX - 4, HY + 44);
  ctx.bezierCurveTo(HX + HRX - 14, HY + 52, HX - HRX + 14, HY + 52, HX - HRX + 4, HY + 44);
  ctx.closePath(); ctx.fill();
  ctx.restore();

  // ── TEETH ── (most iconic Ghost feature)
  const teethDef = [10, 14, 17, 18, 18, 17, 14, 10]; // heights
  const tw = 10, tgap = 2;
  const totalW = teethDef.length * (tw + tgap) - tgap;
  const tx0 = HX - totalW / 2;
  const ty = HY + 44;

  // Gum line
  ctx.save(); ctx.globalAlpha = 0.55;
  ctx.fillStyle = "#aba598";
  rect(ctx, tx0 - 2, ty - 5, totalW + 4, 6, 2);
  ctx.restore();

  teethDef.forEach((h, i) => {
    const alpha = i === 0 || i === 7 ? 0.68 : 0.94;
    ctx.save(); ctx.globalAlpha = alpha;
    ctx.fillStyle = "#e4dece";
    rect(ctx, tx0 + i * (tw + tgap), ty, tw, h, [0, 0, 2, 2]);
    ctx.restore();
    // Gap shadow
    if (i < teethDef.length - 1) {
      ctx.strokeStyle = "rgba(20,18,14,0.35)"; ctx.lineWidth = 0.5;
      const gx = tx0 + i * (tw + tgap) + tw + tgap / 2;
      ctx.beginPath(); ctx.moveTo(gx, ty); ctx.lineTo(gx, ty + h - 2); ctx.stroke();
    }
  });

  // ── CHIN ──
  ctx.fillStyle = "#191919";
  ctx.beginPath();
  ctx.moveTo(HX - 34, HY + 82);
  ctx.bezierCurveTo(HX - 30, HY + 96, HX - 16, HY + 106, HX, HY + 108);
  ctx.bezierCurveTo(HX + 16, HY + 106, HX + 30, HY + 96, HX + 34, HY + 82);
  ctx.bezierCurveTo(HX + 20, HY + 88, HX - 20, HY + 88, HX - 34, HY + 82);
  ctx.closePath(); ctx.fill();
}

/* ────────────────────────────────────────────────────
   RIM LIGHTING
──────────────────────────────────────────────────── */
function drawRimLighting(ctx, W, H) {
  // Green left rim
  const gl = ctx.createLinearGradient(0, 0, W, 0);
  gl.addColorStop(0,   "rgba(0,255,65,0.46)");
  gl.addColorStop(0.25,"rgba(0,255,65,0.1)");
  gl.addColorStop(0.55,"rgba(0,255,65,0)");
  ctx.fillStyle = gl; ctx.fillRect(0, 0, W, H);

  // Amber right rim
  const ar = ctx.createLinearGradient(W, 0, 0, 0);
  ar.addColorStop(0,   "rgba(200,160,64,0.4)");
  ar.addColorStop(0.25,"rgba(200,160,64,0.08)");
  ar.addColorStop(0.55,"rgba(200,160,64,0)");
  ctx.fillStyle = ar; ctx.fillRect(0, 0, W, H);

  // Hard green edge line
  ctx.strokeStyle = "rgba(0,255,65,0.28)"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(1, 50); ctx.lineTo(1, H); ctx.stroke();
}

/* ────────────────────────────────────────────────────
   EDGE FADES
──────────────────────────────────────────────────── */
function drawEdgeFades(ctx, W, H) {
  // Bottom
  const bf = ctx.createLinearGradient(0, H - 180, 0, H);
  bf.addColorStop(0, "rgba(5,6,10,0)");
  bf.addColorStop(1, "rgba(5,6,10,1)");
  ctx.fillStyle = bf; ctx.fillRect(0, H - 180, W, 180);

  // Left (blends with text)
  const lf = ctx.createLinearGradient(0, 0, 170, 0);
  lf.addColorStop(0, "rgba(5,6,10,1)");
  lf.addColorStop(1, "rgba(5,6,10,0)");
  ctx.fillStyle = lf; ctx.fillRect(0, 0, 170, H);

  // Top
  const tf = ctx.createLinearGradient(0, 0, 0, 55);
  tf.addColorStop(0, "rgba(5,6,10,1)");
  tf.addColorStop(1, "rgba(5,6,10,0)");
  ctx.fillStyle = tf; ctx.fillRect(0, 0, W, 55);
}

/* ════════════════════════════════════════════════════
   CANVAS HELPERS
════════════════════════════════════════════════════ */
function ellipse(ctx, x, y, rx, ry) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

function rect(ctx, x, y, w, h, r = 0) {
  ctx.beginPath();
  if (!r) { ctx.rect(x, y, w, h); ctx.fill(); return; }
  const rr = typeof r === "number" ? [r, r, r, r] : [...r];
  while (rr.length < 4) rr.push(rr[0]);
  const [tl, tr, br, bl] = rr;
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);   ctx.arcTo(x + w, y,     x + w,     y + tr, tr);
  ctx.lineTo(x + w, y + h - br); ctx.arcTo(x + w, y + h, x + w - br, y + h, br);
  ctx.lineTo(x + bl, y + h);   ctx.arcTo(x,     y + h, x,         y + h - bl, bl);
  ctx.lineTo(x, y + tl);       ctx.arcTo(x,     y,     x + tl,    y, tl);
  ctx.closePath(); ctx.fill();
}
