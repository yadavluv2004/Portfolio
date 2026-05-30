import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth, H = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070713, 0.016);

    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 1.2, 8.5);
    camera.lookAt(0, 0.6, 0);

    // ── Palette ───────────────────────────────────────────────────────
    const PINK   = 0xFF2D78;
    const CYAN   = 0x00E5FF;
    const GOLD   = 0xFFD700;
    const PURPLE = 0xBD00FF;

    const mp = (c, s = 40) => new THREE.MeshPhongMaterial({ color: c, shininess: s });
    const me = (c, ei = 0.7) => new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: ei });

    // ── Lights ────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x0A0514, 1.2));

    const pinkLight = new THREE.PointLight(PINK, 5, 16);
    pinkLight.position.set(-4, 4, 4);
    scene.add(pinkLight);

    const cyanLight = new THREE.PointLight(CYAN, 3.5, 13);
    cyanLight.position.set(4, 3, 3);
    scene.add(cyanLight);

    const goldLight = new THREE.PointLight(GOLD, 2.0, 10);
    goldLight.position.set(0, 6, 3);
    scene.add(goldLight);

    const redPolice  = new THREE.PointLight(0xFF0000, 0, 7);
    redPolice.position.set(-2.5, 1.0, 1.5);
    scene.add(redPolice);

    const bluePolice = new THREE.PointLight(0x0044FF, 0, 7);
    bluePolice.position.set(2.5, 1.0, 1.5);
    scene.add(bluePolice);

    // ════════════════════════════════════════════════════════════════
    //  GTA VICE CITY CHARACTER
    // ════════════════════════════════════════════════════════════════
    const SKIN  = 0xC68642;
    const JEANS = 0x1A2D4A;
    const SHOE  = 0x080808;
    const TANK  = 0xF0F0F0;

    const dev = new THREE.Group();

    // Shoes
    const shoeG = new THREE.BoxGeometry(0.26, 0.14, 0.40);
    const shoeM = mp(SHOE, 20);
    const shoeL = new THREE.Mesh(shoeG, shoeM); shoeL.position.set(-0.22, 0.07, 0.06);
    const shoeR = new THREE.Mesh(shoeG, shoeM); shoeR.position.set( 0.22, 0.07, 0.06);
    dev.add(shoeL, shoeR);

    // Jeans legs
    const legG = new THREE.CylinderGeometry(0.13, 0.12, 1.0, 10);
    const legM = mp(JEANS, 15);
    const legL = new THREE.Mesh(legG, legM); legL.position.set(-0.22, 0.65, 0);
    const legR = new THREE.Mesh(legG, legM); legR.position.set( 0.22, 0.65, 0);
    dev.add(legL, legR);

    // Jeans waist
    const waist = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.52, 0.38), mp(JEANS, 15));
    waist.position.y = 1.41;
    dev.add(waist);

    // Torso — white tank top
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.78, 0.40), mp(TANK, 30));
    torso.position.y = 1.97;
    dev.add(torso);

    // Pink neon stripes on tank
    const stripeM = me(PINK, 0.5);
    const stripeG = new THREE.BoxGeometry(0.78, 0.028, 0.41);
    const stTop = new THREE.Mesh(stripeG, stripeM); stTop.position.y = 2.26;
    const stBot = new THREE.Mesh(stripeG, stripeM); stBot.position.y = 1.70;
    dev.add(stTop, stBot);

    // Skin arms
    const armG = new THREE.CylinderGeometry(0.10, 0.09, 0.76, 10);
    const armM = mp(SKIN, 30);
    const armL = new THREE.Mesh(armG, armM); armL.position.set(-0.53, 1.88, 0); armL.rotation.z = 0.25;
    const armRm = new THREE.Mesh(armG, armM); armRm.position.set( 0.53, 1.82, 0); armRm.rotation.z = -0.35;
    dev.add(armL, armRm);

    // Hands
    const handG = new THREE.SphereGeometry(0.09, 10, 10);
    const handM = mp(SKIN, 30);
    const handL = new THREE.Mesh(handG, handM); handL.position.set(-0.76, 1.43, 0.10);
    const handR = new THREE.Mesh(handG, handM); handR.position.set( 0.74, 1.36, 0.10);
    dev.add(handL, handR);

    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.18, 10), mp(SKIN, 30));
    neck.position.y = 2.48;
    dev.add(neck);

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.33, 18, 18), mp(SKIN, 35));
    head.position.y = 2.83;
    dev.add(head);

    // Hair
    const hair = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.45),
      mp(0x140808, 5)
    );
    hair.position.y = 2.96;
    dev.add(hair);

    // Pink cap body
    const capMat = me(PINK, 0.4);
    const capRing = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.38, 0.12, 8), capMat);
    capRing.position.y = 3.08;
    dev.add(capRing);

    const capDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.36, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.52),
      capMat
    );
    capDome.position.y = 3.08;
    dev.add(capDome);

    // Cap brim
    const capBrim = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.04, 0.30), me(0xCC0050, 0.3));
    capBrim.position.set(0, 3.03, 0.19);
    dev.add(capBrim);

    // Cyan glowing sunglasses
    const glassM = new THREE.MeshStandardMaterial({
      color: CYAN, emissive: CYAN, emissiveIntensity: 0.9,
      transparent: true, opacity: 0.88,
    });
    const glassGeo = new THREE.BoxGeometry(0.16, 0.09, 0.04);
    const glassL = new THREE.Mesh(glassGeo, glassM); glassL.position.set(-0.12, 2.83, 0.31);
    const glassRg = new THREE.Mesh(glassGeo, glassM); glassRg.position.set( 0.12, 2.83, 0.31);
    const bridgeM = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.025, 0.02), mp(0x111111, 20));
    bridgeM.position.set(0, 2.83, 0.32);
    dev.add(glassL, glassRg, bridgeM);

    dev.position.set(-1.4, -1.55, 0);
    scene.add(dev);

    // ════════════════════════════════════════════════════════════════
    //  RETROWAVE GRID FLOOR
    // ════════════════════════════════════════════════════════════════
    const gridGroup = new THREE.Group();

    for (let i = 0; i <= 20; i++) {
      const z  = -i * 1.8;
      const op = Math.max(0.03, 0.55 - i * 0.026);
      gridGroup.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-12, 0, z), new THREE.Vector3(12, 0, z),
        ]),
        new THREE.LineBasicMaterial({ color: PINK, transparent: true, opacity: op })
      ));
    }

    for (let i = -9; i <= 9; i++) {
      const xN = i * 1.4, xF = i * 0.35;
      gridGroup.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(xN, 0, 0), new THREE.Vector3(xF, 0, -36),
        ]),
        new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.2 })
      ));
    }

    gridGroup.position.set(0, -1.55, 0);
    scene.add(gridGroup);

    // ════════════════════════════════════════════════════════════════
    //  BUILDING SKYLINE
    // ════════════════════════════════════════════════════════════════
    const winPalette = [PINK, CYAN, GOLD, PURPLE, 0xFFFFFF, 0xFFAA00];

    const makeBuilding = (x, z, w, h, d) => {
      const g = new THREE.Group();
      g.position.set(x, -1.55, z);

      const body = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({ color: 0x060612 })
      );
      body.position.y = h / 2;
      g.add(body);

      // Neon top edge
      const neonTop = new THREE.Mesh(
        new THREE.BoxGeometry(w + 0.06, 0.055, d + 0.06),
        new THREE.MeshStandardMaterial({ color: PINK, emissive: PINK, emissiveIntensity: 1.0 })
      );
      neonTop.position.set(0, h + 0.027, 0);
      g.add(neonTop);

      // Neon corner strip
      const ec = [PINK, CYAN, PURPLE][Math.floor(Math.random() * 3)];
      const strip = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, h, 0.04),
        new THREE.MeshStandardMaterial({ color: ec, emissive: ec, emissiveIntensity: 1.0 })
      );
      strip.position.set(w / 2 + 0.02, h / 2, d / 2 + 0.02);
      g.add(strip);

      // Windows
      const rows = Math.max(1, Math.floor(h / 0.9));
      const cols = Math.max(1, Math.floor(w / 0.7));
      for (let r = 1; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() > 0.44) {
            const wc = winPalette[Math.floor(Math.random() * winPalette.length)];
            const win = new THREE.Mesh(
              new THREE.BoxGeometry(0.24, 0.20, 0.04),
              new THREE.MeshStandardMaterial({
                color: wc, emissive: wc, emissiveIntensity: 0.82,
                transparent: true, opacity: 0.6 + Math.random() * 0.38,
              })
            );
            win.position.set(-w / 2 + 0.3 + c * (w / cols), r * (h / rows), d / 2 + 0.02);
            g.add(win);
          }
        }
      }
      return g;
    };

    [
      [-8, -10, 2.0, 5.5, 1.5], [-5.5, -11, 1.5, 7.5, 1.2],
      [-3.2, -12, 1.9, 5.0, 1.4], [-1.2, -13, 2.2, 8.5, 1.6],
      [1.2, -12, 1.7, 6.5, 1.3], [3.5, -11, 2.0, 4.8, 1.5],
      [5.8, -10, 1.8, 6.0, 1.4], [7.8, -9, 2.0, 4.2, 1.2],
      [-6.5, -16, 2.5, 9.5, 2.0], [0.2, -17, 3.2, 11.5, 2.0],
      [7.2, -15, 2.4, 7.5, 1.8],
    ].forEach(([x, z, w, h, d]) => scene.add(makeBuilding(x, z, w, h, d)));

    // ════════════════════════════════════════════════════════════════
    //  PALM TREES
    // ════════════════════════════════════════════════════════════════
    const makePalm = (x, z) => {
      const g = new THREE.Group();
      g.position.set(x, -1.55, z);

      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.14, 2.9, 7),
        mp(0x7A4F0A, 10)
      );
      trunk.position.set(0, 1.45, 0);
      g.add(trunk);

      const leafMat = new THREE.MeshStandardMaterial({ color: 0x1A4A20, emissive: 0x041008, emissiveIntensity: 0.4 });
      for (let i = 0; i < 7; i++) {
        const ang = (i / 7) * Math.PI * 2;
        const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.22 + Math.random() * 0.1, 6, 6), leafMat);
        leaf.position.set(Math.cos(ang) * 0.42, 3.0 + (Math.random() - 0.5) * 0.3, Math.sin(ang) * 0.42);
        g.add(leaf);
      }
      const topLeaf = new THREE.Mesh(new THREE.SphereGeometry(0.28, 6, 6), leafMat);
      topLeaf.position.y = 3.2;
      g.add(topLeaf);
      return g;
    };

    scene.add(makePalm(-3.8, -1.2));
    scene.add(makePalm( 3.4, -0.8));
    scene.add(makePalm(-5.2, -3.5));
    scene.add(makePalm( 5.0, -3.0));
    scene.add(makePalm(-2.5, -5.5));
    scene.add(makePalm( 2.8, -5.0));

    // ════════════════════════════════════════════════════════════════
    //  FLOATING DOLLAR BILLS
    // ════════════════════════════════════════════════════════════════
    const dollars = [];
    for (let i = 0; i < 10; i++) {
      const bill = new THREE.Mesh(
        new THREE.PlaneGeometry(0.38, 0.18),
        new THREE.MeshStandardMaterial({
          color: 0x00BB44, emissive: 0x004422, emissiveIntensity: 0.35,
          transparent: true, opacity: 0.82, side: THREE.DoubleSide,
        })
      );
      bill.position.set(
        (Math.random() - 0.5) * 9,
        0.5 + Math.random() * 4,
        (Math.random() - 0.5) * 6 - 1
      );
      bill.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      bill.userData = {
        baseY:   bill.position.y,
        bobSpd:  0.35 + Math.random() * 0.5,
        bobAmp:  0.25 + Math.random() * 0.35,
        rotX:    (Math.random() - 0.5) * 0.018,
        rotY:    (Math.random() - 0.5) * 0.022,
        phase:   Math.random() * Math.PI * 2,
      };
      dollars.push(bill);
      scene.add(bill);
    }

    // ════════════════════════════════════════════════════════════════
    //  STARS
    // ════════════════════════════════════════════════════════════════
    const starCount = 280;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i*3]   = (Math.random() - 0.5) * 70;
      starPos[i*3+1] = 3 + Math.random() * 18;
      starPos[i*3+2] = -(Math.random() * 45 + 8);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
      color: 0xFFFFFF, size: 0.07, transparent: true, opacity: 0.88, sizeAttenuation: true,
    })));

    // ── Mouse ─────────────────────────────────────────────────────────
    let mx = 0, my = 0, tRY = 0, tRX = 0;
    const onMov = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMov);

    // ── Animate ───────────────────────────────────────────────────────
    let raf;
    let gridOff = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Mouse -> character look
      tRY += (mx * 0.38 - tRY) * 0.06;
      tRX += (my * 0.14 - tRX) * 0.06;

      dev.rotation.y    = tRY;
      dev.rotation.x    = tRX * 0.2;
      head.rotation.y   = tRY * 0.6;
      hair.rotation.y   = tRY * 0.6;
      capRing.rotation.y = tRY * 0.6;
      capDome.rotation.y = tRY * 0.6;
      capBrim.rotation.y = tRY * 0.6;
      glassL.rotation.y  = tRY * 0.6;
      glassRg.rotation.y = tRY * 0.6;

      // Idle bob
      dev.position.y = -1.55 + Math.sin(t * 0.8) * 0.05;

      // Breathing
      const br = Math.sin(t * 0.9) * 0.012;
      torso.scale.y     = 1 + br;
      torso.position.y  = 1.97 + br * 0.2;

      // Dollar bills float
      dollars.forEach((b) => {
        b.position.y  = b.userData.baseY + Math.sin(t * b.userData.bobSpd + b.userData.phase) * b.userData.bobAmp;
        b.rotation.x += b.userData.rotX;
        b.rotation.y += b.userData.rotY;
      });

      // Police lights alternate
      const pp = Math.floor(t * 2) % 2;
      redPolice.intensity  = pp === 0 ? 3.5 : 0;
      bluePolice.intensity = pp === 1 ? 3.5 : 0;

      // Pink light pulse
      pinkLight.intensity = 5 + Math.sin(t * 2.4) * 0.6;

      // Grid scroll (horizontal lines fly toward camera)
      gridOff = (gridOff + 0.009) % 1.8;
      gridGroup.position.z = gridOff;

      // Camera drift
      camera.position.x = Math.sin(t * 0.1) * 0.28;
      camera.position.y = 1.2 + Math.cos(t * 0.07) * 0.1;
      camera.lookAt(0, 0.6, 0);

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────────────────
    const onRsz = () => {
      if (!mount) return;
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onRsz);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMov);
      window.removeEventListener("resize", onRsz);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />;
};

export default ThreeScene;
