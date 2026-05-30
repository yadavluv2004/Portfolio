import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const GtaBackgroundScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let W = window.innerWidth, H = window.innerHeight;

    // Keep alpha:true + transparent clear — same pattern as the original working scene
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    // Sunny Los Santos light-blue fog
    scene.fog = new THREE.FogExp2(0x8EC8E8, 0.007);

    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 180);
    camera.position.set(0, 2.2, 8.5);
    camera.lookAt(0, 0.8, 0);

    // Helper: MeshPhongMaterial (proven to work, no PBR)
    const mp = (color, shininess) => new THREE.MeshPhongMaterial({ color: color, shininess: shininess !== undefined ? shininess : 25 });

    // ── Lighting — bright sunny day ────────────────────────────
    scene.add(new THREE.AmbientLight(0xFFF8E8, 1.8));

    const sunLight = new THREE.DirectionalLight(0xFFF6D0, 2.5);
    sunLight.position.set(25, 50, -10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(1024, 1024);
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 100;
    sunLight.shadow.camera.left = -25;
    sunLight.shadow.camera.right = 25;
    sunLight.shadow.camera.top = 25;
    sunLight.shadow.camera.bottom = -25;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xC8DEFF, 0.6);
    fillLight.position.set(-20, 12, 8);
    scene.add(fillLight);

    // ── Sky backdrop ───────────────────────────────────────────
    const skyC = document.createElement("canvas");
    skyC.width = 4; skyC.height = 512;
    const skyCtx = skyC.getContext("2d");
    const skg = skyCtx.createLinearGradient(0, 0, 0, 512);
    skg.addColorStop(0,    "#1A6CBE");
    skg.addColorStop(0.35, "#4298D0");
    skg.addColorStop(0.65, "#74C2E8");
    skg.addColorStop(0.88, "#AADAF6");
    skg.addColorStop(1,    "#C8EAF8");
    skyCtx.fillStyle = skg;
    skyCtx.fillRect(0, 0, 4, 512);
    const skyMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(900, 420),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(skyC), depthWrite: false, fog: false })
    );
    skyMesh.position.set(0, 62, -165);
    scene.add(skyMesh);

    // Sun disc
    const sunMesh = new THREE.Mesh(
      new THREE.CircleGeometry(9, 48),
      new THREE.MeshBasicMaterial({ color: 0xFFFBE0, fog: false })
    );
    sunMesh.position.set(28, 46, -160);
    scene.add(sunMesh);

    const sunHalo = new THREE.Mesh(
      new THREE.CircleGeometry(16, 48),
      new THREE.MeshBasicMaterial({ color: 0xFFF5C0, transparent: true, opacity: 0.20, fog: false })
    );
    sunHalo.position.set(28, 46, -161);
    scene.add(sunHalo);

    // ── Clouds ─────────────────────────────────────────────────
    const cloudMat = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, shininess: 5 });
    const cloudDefs = [
      [-30, 30, -115, 1.2], [36, 34, -110, 0.95],
      [-12, 27, -106, 0.72], [20, 32, -126, 1.1],
      [-42, 38, -135, 0.85], [48, 29, -98, 0.62],
    ];
    const cloudPts = [[0,0,0,3.4],[-3,-0.7,0,2.3],[3,-0.7,0,2.3],[1.4,0.9,0,1.9],[-1.4,0.7,0,1.7]];
    const clouds = cloudDefs.map(function(d) {
      const g = new THREE.Group();
      cloudPts.forEach(function(p) {
        const s = new THREE.Mesh(new THREE.SphereGeometry(p[3], 9, 7), cloudMat);
        s.position.set(p[0], p[1], p[2]);
        g.add(s);
      });
      g.position.set(d[0], d[1], d[2]);
      g.scale.setScalar(d[3]);
      scene.add(g);
      return g;
    });

    // ── Ground ─────────────────────────────────────────────────
    const addPlane = function(w, h, color, px, py, pz) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mp(color, 5));
      m.rotation.x = -Math.PI / 2;
      m.position.set(px, py, pz);
      m.receiveShadow = true;
      scene.add(m);
      return m;
    };

    addPlane(140, 220, 0x8AA040, 0, -2, -100);       // dry grass base
    addPlane(14, 220, 0x4E8C28, -11, -1.97, -100);   // green strips
    addPlane(14, 220, 0x4E8C28,  11, -1.97, -100);
    addPlane(8.5, 220, 0x282828, 0, -1.96, -100);    // road

    // Road dashes
    for (var dz = 10; dz >= -210; dz -= 10) {
      const dash = new THREE.Mesh(
        new THREE.PlaneGeometry(0.13, 4.2),
        new THREE.MeshBasicMaterial({ color: 0xF0EDD8, transparent: true, opacity: 0.70 })
      );
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(0, -1.95, dz);
      scene.add(dash);
    }

    // Kerbs
    [-4.5, 4.5].forEach(function(x) {
      const k = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.09, 220), mp(0xC0B8A0, 10));
      k.position.set(x, -1.93, -100);
      k.castShadow = true;
      scene.add(k);
    });

    // ── Palm trees ─────────────────────────────────────────────
    const makePalm = function(px, pz, hs) {
      const g = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.16, 3.8 * hs, 10), mp(0x5A381A, 10));
      trunk.position.y = 1.9 * hs;
      trunk.rotation.z = (px > 0 ? 1 : -1) * 0.08;
      g.add(trunk);
      const fM = mp(0x277818, 10);
      for (var i = 0; i < 8; i++) {
        var a = (i / 8) * Math.PI * 2;
        const f = new THREE.Mesh(new THREE.SphereGeometry(0.70, 8, 6), fM);
        f.scale.set(1, 0.26, 0.62);
        f.position.set(Math.cos(a) * 1.3, 3.9 * hs + 0.1, Math.sin(a) * 1.3);
        g.add(f);
      }
      const crown = new THREE.Mesh(new THREE.SphereGeometry(0.58, 8, 7), fM);
      crown.position.y = 4.1 * hs;
      g.add(crown);
      g.position.set(px, -2, pz);
      g.castShadow = true;
      scene.add(g);
    };
    for (var tz = 6; tz >= -120; tz -= 13) {
      makePalm(-6 + (Math.random() - 0.5) * 0.5, tz, 0.82 + Math.random() * 0.3);
      makePalm( 6 + (Math.random() - 0.5) * 0.5, tz, 0.82 + Math.random() * 0.3);
    }

    // ── Buildings ──────────────────────────────────────────────
    const makeBuilding = function(bx, bz, bw, bh, bc) {
      const body = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bw * 0.78), mp(bc, 15));
      body.position.set(bx, -2 + bh / 2, bz);
      body.castShadow = true;
      body.receiveShadow = true;
      scene.add(body);

      const ledge = new THREE.Mesh(new THREE.BoxGeometry(bw + 0.3, 0.18, bw * 0.78 + 0.3), mp(0xD8C8A0, 10));
      ledge.position.set(bx, -2 + bh + 0.09, bz);
      scene.add(ledge);

      const wM = mp(0x5AAEC8, 80);
      const rows = Math.floor(bh / 1.55), cols = Math.floor(bw / 1.35);
      for (var wy = 0; wy < rows; wy++) {
        for (var wx = 0; wx < cols; wx++) {
          const win = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.52, 0.05), wM);
          win.position.set(bx - bw / 2 + 0.72 + wx * (bw / cols), -2 + 1.1 + wy * 1.55, bz + bw * 0.39 + 0.03);
          scene.add(win);
        }
      }
    };

    [
      [-14, -22, 5.5, 14, 0xCCAA70], [ 14, -20, 4.5, 19, 0xEEDDB8],
      [-13, -40, 6.0, 11, 0xE09060], [ 14, -42, 5.0, 16, 0xCCAA70],
      [-14, -60, 4.5, 21, 0xEEDDB8], [ 13, -58, 5.5, 12, 0xE09060],
      [-13, -78, 5.0, 15, 0xCCAA70], [ 14, -80, 4.0, 23, 0xEEDDB8],
      [-14, -98, 6.0, 12, 0xE09060], [ 14, -96, 5.0, 18, 0xCCAA70],
    ].forEach(function(b) { makeBuilding(b[0], b[1], b[2], b[3], b[4]); });

    // ── GTA V Characters ───────────────────────────────────────
    const characters = [];

    const makeChar = function(type, px, pz) {
      const g = new THREE.Group();

      // Per-type colour scheme
      var skinC, shoeC, pantC, torsC, hairC, bw;
      if (type === "michael") {
        skinC = 0xC89055; shoeC = 0x111111; pantC = 0x1A2838; torsC = 0x1A2838; hairC = 0x1A0E06; bw = 1.12;
      } else if (type === "franklin") {
        skinC = 0x7A4220; shoeC = 0x111111; pantC = 0x1E3060; torsC = 0x285518; hairC = 0x080808; bw = 0.97;
      } else { // trevor
        skinC = 0xBF9068; shoeC = 0x3A1E0C; pantC = 0x2C4878; torsC = 0xC8BC9C; hairC = 0x5A3015; bw = 1.16;
      }

      const skinM = mp(skinC, 15);
      const torsM = mp(torsC, type === "michael" ? 40 : 18);
      const pantM = mp(pantC, 10);
      const hairM = mp(hairC, 5);
      const shoeM = mp(shoeC, 45);

      // Shoes
      const shoeG = new THREE.BoxGeometry(0.22, 0.11, 0.36);
      [-1, 1].forEach(function(s) {
        const sh = new THREE.Mesh(shoeG, shoeM);
        sh.position.set(s * 0.215, 0.055, 0.04);
        g.add(sh);
      });

      // Legs
      const legG = new THREE.CylinderGeometry(0.11, 0.10, 1.0, 10);
      [-1, 1].forEach(function(s) {
        const leg = new THREE.Mesh(legG, pantM);
        leg.position.set(s * 0.215, 0.62, 0);
        g.add(leg);
      });

      // Waist
      const waist = new THREE.Mesh(new THREE.BoxGeometry(0.64 * bw, 0.44, 0.35), pantM);
      waist.position.y = 1.27;
      g.add(waist);

      // Torso
      const torso = new THREE.Mesh(new THREE.BoxGeometry(0.72 * bw, 0.75, 0.40), torsM);
      torso.position.y = 1.83;
      g.add(torso);

      // Michael: shirt collar + lapels
      if (type === "michael") {
        const col = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.04), mp(0xECE8DC, 30));
        col.position.set(0, 2.14, 0.21);
        g.add(col);
        [-1, 1].forEach(function(s) {
          const lap = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.30, 0.04), mp(0x263B52, 35));
          lap.position.set(s * 0.11, 1.95, 0.21);
          lap.rotation.z = -s * 0.28;
          g.add(lap);
        });
      }

      // Franklin: hoodie pocket + hood bulk
      if (type === "franklin") {
        const pk = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.13, 0.03), mp(0x214412, 5));
        pk.position.set(0, 1.61, 0.21);
        const hood = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.22, 0.24), mp(0x285518, 8));
        hood.position.set(0, 2.26, -0.06);
        g.add(pk, hood);
      }

      // Trevor: tank straps + grime
      if (type === "trevor") {
        [-1, 1].forEach(function(s) {
          const st = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.28, 0.04), mp(0xC8BC9C, 5));
          st.position.set(s * 0.18, 2.09, 0.21);
          g.add(st);
        });
        const gr = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.07, 0.03), mp(0x665040, 5));
        gr.position.set(-0.08, 1.75, 0.21);
        g.add(gr);
      }

      // Arms
      const armG = new THREE.CylinderGeometry(0.086, 0.074, 0.72, 10);
      [-1, 1].forEach(function(s) {
        const armM2 = (type === "michael") ? torsM : skinM;
        const arm = new THREE.Mesh(armG, armM2);
        arm.position.set(s * 0.47, 1.76, 0);
        arm.rotation.z = s * (type === "trevor" ? 0.26 : 0.16);
        g.add(arm);
        const hand = new THREE.Mesh(new THREE.SphereGeometry(0.082, 12, 10), skinM);
        hand.position.set(s * 0.56, 1.37, 0.04);
        g.add(hand);
      });

      // Neck
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.10, 0.17, 12), skinM);
      neck.position.y = 2.31;
      g.add(neck);

      // Head — more segments for smoother look
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.295, 24, 18), skinM);
      head.position.y = 2.64;
      head.scale.set(1, 0.96, 1);
      g.add(head);

      // Hair
      const hairCap = new THREE.Mesh(
        new THREE.SphereGeometry(0.31, 16, 10, 0, Math.PI * 2, 0, Math.PI * (type === "trevor" ? 0.56 : 0.44)),
        hairM
      );
      hairCap.position.y = type === "trevor" ? 2.74 : 2.76;
      if (type === "trevor") hairCap.scale.set(1, 0.86, 1.08);
      g.add(hairCap);

      // Michael: grey sideburns
      if (type === "michael") {
        const sbM = mp(0x7A7A7A, 5);
        [-1, 1].forEach(function(s) {
          const sb = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.17, 0.04), sbM);
          sb.position.set(s * 0.285, 2.52, 0.17);
          g.add(sb);
        });
      }

      // Trevor: stubble
      if (type === "trevor") {
        const stbl = new THREE.Mesh(
          new THREE.SphereGeometry(0.30, 10, 6, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.20),
          mp(0x4A3020, 5)
        );
        stbl.position.y = 2.47;
        stbl.scale.y = 0.52;
        g.add(stbl);
      }

      // Eyes
      [-1, 1].forEach(function(s) {
        const eye = new THREE.Mesh(
          new THREE.SphereGeometry(0.035, 7, 6),
          mp(type === "franklin" ? 0x2A1206 : 0x1A0A00, 5)
        );
        eye.position.set(s * 0.10, 2.68, 0.265);
        g.add(eye);
      });

      g.position.set(px, -2, pz);
      g.castShadow = true;
      scene.add(g);
      characters.push({ group: g, head: head, torso: torso, baseY: -2, bobSpeed: 0.48 + Math.random() * 0.28 });
    };

    // Hero trio: Trevor (L) · Franklin (centre-front) · Michael (R)
    makeChar("trevor",   -1.7, -0.3);
    makeChar("franklin",  0.0,  0.7);
    makeChar("michael",   1.7, -0.3);

    // Section characters
    makeChar("michael",   1.7, -17);
    makeChar("franklin", -1.7, -33);
    makeChar("trevor",    1.7, -49);
    makeChar("michael",  -1.7, -65);
    makeChar("franklin",  1.7, -81);

    // ── Cars ───────────────────────────────────────────────────
    const makeCar = function(cx, cz, color, spd) {
      const cg = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.42, 2.3), mp(color, 60));
      body.position.y = 0.30;
      cg.add(body);
      const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.33, 1.0), mp(0x111111, 50));
      cabin.position.set(0, 0.61, -0.18);
      cg.add(cabin);
      const wG = new THREE.CylinderGeometry(0.21, 0.21, 0.17, 10);
      wG.rotateZ(Math.PI / 2);
      const wM2 = mp(0x1A1A1A, 10);
      [[-0.56, 0.20, 0.72], [0.56, 0.20, 0.72], [-0.56, 0.20, -0.72], [0.56, 0.20, -0.72]].forEach(function(p) {
        const w = new THREE.Mesh(wG, wM2);
        w.position.set(p[0], p[1], p[2]);
        cg.add(w);
      });
      cg.position.set(cx, -2, cz);
      cg.castShadow = true;
      scene.add(cg);
      return { group: cg, speed: spd };
    };
    const cars = [
      makeCar( 2.3, -120, 0xBB1800, 0.24),
      makeCar(-2.3,  -78, 0xA8B0B8, 0.19),
    ];

    // ── Mouse / Scroll ─────────────────────────────────────────
    let mx = 0, my = 0;
    const onMM = function(e) {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMM);

    let scrollProg = 0;
    const onScroll = function() {
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      scrollProg = dh > 0 ? window.scrollY / dh : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Render loop ────────────────────────────────────────────
    let raf;
    const clock = new THREE.Clock();

    const animate = function() {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      const tZ = 7.5 - scrollProg * 82;
      camera.position.z += (tZ - camera.position.z) * 0.065;
      camera.position.x = Math.sin(t * 0.07) * 0.14 + mx * 0.10;
      camera.position.y = 2.2 + Math.cos(t * 0.05) * 0.06 - my * 0.07;
      camera.lookAt(new THREE.Vector3(0, 0.75, camera.position.z - 8));

      clouds.forEach(function(cl, i) {
        cl.position.x += Math.sin(t * 0.03 + i * 1.4) * 0.0007;
      });

      characters.forEach(function(ch) {
        ch.group.position.y = ch.baseY + Math.sin(t * ch.bobSpeed) * 0.022;
        ch.torso.scale.y = 1 + Math.sin(t * ch.bobSpeed * 1.1) * 0.007;
        const dist = Math.abs(camera.position.z - ch.group.position.z);
        if (dist < 14) {
          ch.head.rotation.y += (mx * 0.18 - ch.head.rotation.y) * 0.07;
          ch.head.rotation.x += (-my * 0.09 - ch.head.rotation.x) * 0.07;
        } else {
          ch.head.rotation.y *= 0.94;
          ch.head.rotation.x *= 0.94;
        }
      });

      cars.forEach(function(car) {
        car.group.position.z += car.speed;
        if (car.group.position.z > camera.position.z + 18) {
          car.group.position.z = camera.position.z - 130;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ─────────────────────────────────────────────────
    const onResize = function() {
      W = window.innerWidth;
      H = window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    return function() {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMM);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
        opacity: 0.55,
      }}
      className="gta-background-scene-element"
    />
  );
};

export default GtaBackgroundScene;
