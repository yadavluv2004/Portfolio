import { useEffect, useRef } from "react";
import * as THREE from "three";

const ParticleField = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let W = window.innerWidth;
    let H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.z = 8;

    // Pink neon particles for dark background
    const N   = 140;
    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);

    for (let i = 0; i < N; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 18;
      pos[i*3+1] = (Math.random() - 0.5) * 12;
      pos[i*3+2] = (Math.random() - 0.5) * 6;
      vel[i*3]   = (Math.random() - 0.5) * 0.005;
      vel[i*3+1] = (Math.random() - 0.5) * 0.003;
      // Mix pink and cyan particles
      if (Math.random() > 0.4) {
        col[i*3] = 1.0; col[i*3+1] = 0.176; col[i*3+2] = 0.471; // #FF2D78 pink
      } else {
        col[i*3] = 0.0; col[i*3+1] = 0.898; col[i*3+2] = 1.0;   // #00E5FF cyan
      }
    }

    const ptGeo = new THREE.BufferGeometry();
    const ptBuf = new THREE.BufferAttribute(pos, 3);
    ptGeo.setAttribute("position", ptBuf);
    ptGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));

    const ptMat = new THREE.PointsMaterial({
      size: 0.07,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      vertexColors: true,
    });
    const points = new THREE.Points(ptGeo, ptMat);
    scene.add(points);

    // Neon line segments
    const MAX_LINES = 200;
    const lnPos = new Float32Array(MAX_LINES * 6);
    const lnGeo = new THREE.BufferGeometry();
    const lnBuf = new THREE.BufferAttribute(lnPos, 3);
    lnGeo.setAttribute("position", lnBuf);
    lnGeo.setDrawRange(0, 0);
    const lnSegs = new THREE.LineSegments(
      lnGeo,
      new THREE.LineBasicMaterial({ color: 0xFF2D78, transparent: true, opacity: 0.1 })
    );
    scene.add(lnSegs);

    // Mouse influence
    let mx = 9999, my = 9999;
    const onMouse = (e) => {
      mx = (e.clientX / W - 0.5) * 18;
      my = -(e.clientY / H - 0.5) * 12;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const THRESH_SQ = 3.2 * 3.2;
    const REPEL_R   = 2.2, REPEL_RSQ = 2.2 * 2.2;

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      for (let i = 0; i < N; i++) {
        pos[i*3]   += vel[i*3];
        pos[i*3+1] += vel[i*3+1];

        if (pos[i*3]   >  9) pos[i*3]   = -9;
        if (pos[i*3]   < -9) pos[i*3]   =  9;
        if (pos[i*3+1] >  6) pos[i*3+1] = -6;
        if (pos[i*3+1] < -6) pos[i*3+1] =  6;

        const dx = pos[i*3] - mx, dy = pos[i*3+1] - my;
        const d2 = dx*dx + dy*dy;
        if (d2 < REPEL_RSQ && d2 > 0.01) {
          const d = Math.sqrt(d2), str = (REPEL_R - d) / REPEL_R * 0.01;
          vel[i*3]   += (dx / d) * str;
          vel[i*3+1] += (dy / d) * str;
          vel[i*3]   *= 0.98;
          vel[i*3+1] *= 0.98;
        }
      }
      ptBuf.needsUpdate = true;

      let lc = 0;
      for (let a = 0; a < N && lc < MAX_LINES; a++) {
        for (let b = a + 1; b < N && lc < MAX_LINES; b++) {
          const dx = pos[a*3]-pos[b*3], dy = pos[a*3+1]-pos[b*3+1], dz = pos[a*3+2]-pos[b*3+2];
          if (dx*dx + dy*dy + dz*dz < THRESH_SQ) {
            lnPos[lc*6]   = pos[a*3];   lnPos[lc*6+1] = pos[a*3+1]; lnPos[lc*6+2] = pos[a*3+2];
            lnPos[lc*6+3] = pos[b*3];   lnPos[lc*6+4] = pos[b*3+1]; lnPos[lc*6+5] = pos[b*3+2];
            lc++;
          }
        }
      }
      lnBuf.needsUpdate = true;
      lnGeo.setDrawRange(0, lc * 2);

      camera.position.x = Math.sin(Date.now() * 0.0001) * 0.6;
      camera.position.y = Math.cos(Date.now() * 0.00007) * 0.4;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
};

export default ParticleField;
