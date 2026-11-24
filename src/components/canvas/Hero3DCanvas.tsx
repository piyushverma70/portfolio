import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createStudioEnvironment } from './studioEnv';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.4);

    // 2. High-Precision WebGL Renderer with ACES Filmic Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 3. High-Dynamic-Range Studio Environment Map
    const studioEnv = createStudioEnvironment(renderer);
    scene.environment = studioEnv.envTexture;

    // 4. Balanced Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Key Studio Light (overhead front-right softbox)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(4.0, 6.0, 4.5);
    scene.add(keyLight);

    // Fill Softbox (front-left fill)
    const fillLight = new THREE.DirectionalLight(0xe8edf2, 1.4);
    fillLight.position.set(-4.0, 2.5, 4.5);
    scene.add(fillLight);

    // Electric Lime Luminous Point Light (lower bevel bounce)
    const limeRimLight = new THREE.PointLight(0xc7f36b, 3.2, 7, 1.2);
    limeRimLight.position.set(1.8, -1.2, 0.8);
    scene.add(limeRimLight);

    // 5. Sculpture Group
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // 6. Luxury Polished Silver Chrome Material
    // Metalness: 0.96 | Roughness: 0.16 | Clearcoat: 0.90
    // Seamlessly reflects the HDR studio environment with realistic highlights and depth (Zero flat white / Zero black outline)
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.96,
      roughness: 0.16,
      clearcoat: 0.90,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      envMapIntensity: 1.5,
    });

    // Luminous Lime Foundation Layer (1:1 footprint directly behind the chrome letters — ZERO outline border)
    const limeFoundationMaterial = new THREE.MeshStandardMaterial({
      color: 0xc7f36b,
      emissive: 0xc7f36b,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.08,
    });

    // Delicate Translucent Electric-Lime Orbit Ring
    const limeTranslucentMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc7f36b,
      transparent: true,
      opacity: 0.8,
      transmission: 0.6,
      roughness: 0.12,
      metalness: 0.04,
      emissive: 0xc7f36b,
      emissiveIntensity: 0.6,
      clearcoat: 0.85,
      clearcoatRoughness: 0.05,
    });

    // Thin Polished Chrome Orbit Ring
    const thinChromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0,
      envMapIntensity: 1.6,
    });

    // 7. Custom Sculptural 3D PV Monogram Geometry
    const extrudeSettings = {
      steps: 1,
      depth: 0.38, // thick luxury sculptural extrusion
      bevelEnabled: true,
      bevelThickness: 0.08, // generous rounded bevel
      bevelSize: 0.06,
      bevelOffset: 0,
      bevelSegments: 8, // smooth curved bevels catching sharp studio highlights
    };

    // [P] Custom Sculptural Letterform with Architectural 45° Chamfer
    const pShape = new THREE.Shape();
    pShape.moveTo(-1.30, -1.05);
    pShape.lineTo(-0.82, -1.05);
    pShape.lineTo(-0.82, 0.05);
    pShape.lineTo(-0.20, 0.05);
    pShape.bezierCurveTo(0.40, 0.05, 0.40, 1.05, -0.20, 1.05);
    pShape.lineTo(-0.95, 1.05); // chamfer start
    pShape.lineTo(-1.30, 0.70); // 45° chamfer cut
    pShape.closePath();

    // [P] Inner Counter / Hole
    const pHole = new THREE.Path();
    pHole.moveTo(-0.82, 0.38);
    pHole.lineTo(-0.20, 0.38);
    pHole.bezierCurveTo(0.08, 0.38, 0.08, 0.72, -0.20, 0.72);
    pHole.lineTo(-0.82, 0.72);
    pHole.closePath();
    pShape.holes.push(pHole);

    const pGeo = new THREE.ExtrudeGeometry(pShape, extrudeSettings);
    pGeo.center();
    const pMesh = new THREE.Mesh(pGeo, chromeMaterial);
    pMesh.position.set(-0.38, 0.04, 0);
    sculptureGroup.add(pMesh);

    // [V] Custom Sculptural Letterform with Balanced Diagonal Proportions
    const vShape = new THREE.Shape();
    vShape.moveTo(-0.12, 1.05);
    vShape.lineTo(0.32, 1.05);
    vShape.lineTo(0.70, -0.65);
    vShape.lineTo(1.10, 1.05);
    vShape.lineTo(1.52, 1.05);
    vShape.lineTo(0.92, -1.05);
    vShape.lineTo(0.48, -1.05);
    vShape.closePath();

    const vGeo = new THREE.ExtrudeGeometry(vShape, extrudeSettings);
    vGeo.center();
    const vMesh = new THREE.Mesh(vGeo, chromeMaterial);
    vMesh.position.set(0.42, -0.04, 0.10);
    sculptureGroup.add(vMesh);

    // Lime Foundation Layer (1:1 footprint directly behind the chrome letters — ZERO outline)
    const pBackGeo = new THREE.ExtrudeGeometry(pShape, { depth: 0.10, bevelEnabled: false });
    pBackGeo.center();
    const pBackMesh = new THREE.Mesh(pBackGeo, limeFoundationMaterial);
    pBackMesh.position.set(-0.38, 0.04, -0.24);
    sculptureGroup.add(pBackMesh);

    const vBackGeo = new THREE.ExtrudeGeometry(vShape, { depth: 0.10, bevelEnabled: false });
    vBackGeo.center();
    const vBackMesh = new THREE.Mesh(vBackGeo, limeFoundationMaterial);
    vBackMesh.position.set(0.42, -0.04, -0.14);
    sculptureGroup.add(vBackMesh);

    // 8. Exactly Two Refined Orbital Elements
    // 1. One delicate translucent electric-lime ring
    const limeRingGeo = new THREE.TorusGeometry(1.68, 0.015, 20, 160);
    const limeRingMesh = new THREE.Mesh(limeRingGeo, limeTranslucentMaterial);
    limeRingMesh.rotation.x = Math.PI / 2.3;
    limeRingMesh.rotation.y = -Math.PI / 5;
    sculptureGroup.add(limeRingMesh);

    // 2. One thin polished chrome ring
    const chromeRingGeo = new THREE.TorusGeometry(1.85, 0.012, 20, 160);
    const chromeRingMesh = new THREE.Mesh(chromeRingGeo, thinChromeMaterial);
    chromeRingMesh.rotation.x = Math.PI / 2.7;
    chromeRingMesh.rotation.y = Math.PI / 6;
    sculptureGroup.add(chromeRingMesh);

    // 9. Orientation Constants (balanced 3/4 perspective)
    const DEFAULT_ROT_X = 0.12;
    const DEFAULT_ROT_Y = -0.24;
    sculptureGroup.rotation.x = DEFAULT_ROT_X;
    sculptureGroup.rotation.y = DEFAULT_ROT_Y;

    // Mouse movement target coordinates
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5));
      const ny = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5));
      targetMouseX = nx;
      targetMouseY = ny;
    };

    const handleMouseLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Floating breathing on Y axis
        sculptureGroup.position.y = Math.sin(elapsed * 0.8) * 0.06;

        // Easing mouse coordinates smoothly towards targets
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        // Gentle idle breathing rotation
        const idleRotX = DEFAULT_ROT_X + Math.cos(elapsed * 0.4) * 0.02;
        const idleRotY = DEFAULT_ROT_Y + Math.sin(elapsed * 0.35) * 0.03;

        // Clamped 8-12 degrees movement
        const targetX = idleRotX - currentMouseY * 0.15;
        const targetY = idleRotY + currentMouseX * 0.16;

        sculptureGroup.rotation.x += (targetX - sculptureGroup.rotation.x) * 0.05;
        sculptureGroup.rotation.y += (targetY - sculptureGroup.rotation.y) * 0.05;

        // Smooth, slow orbital rotation
        limeRingMesh.rotation.z = elapsed * 0.14;
        chromeRingMesh.rotation.z = -elapsed * 0.10;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);

      renderer.dispose();
      studioEnv.dispose();

      [pGeo, vGeo, pBackGeo, vBackGeo, limeRingGeo, chromeRingGeo].forEach((g) => g.dispose());
      [chromeMaterial, limeFoundationMaterial, limeTranslucentMaterial, thinChromeMaterial].forEach((m) => m.dispose());
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] flex items-center justify-center select-none">
      {/* Background Crosshair Grid Marks */}
      <div className="absolute top-8 left-8 text-[#C2C0B8] text-sm font-mono pointer-events-none">+</div>
      <div className="absolute top-8 right-8 text-[#C2C0B8] text-sm font-mono pointer-events-none">+</div>
      <div className="absolute bottom-8 left-8 text-[#C2C0B8] text-sm font-mono pointer-events-none">+</div>
      <div className="absolute bottom-8 right-8 text-[#C2C0B8] text-sm font-mono pointer-events-none">+</div>

      {/* Interactive WebGL 3D Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing"
        title="Interactive 3D PV Monogram Sculpture — Move pointer to explore"
      />

      {/* Ambient Electric Lime Glow Underlay */}
      <div className="absolute inset-0 bg-[#C7F36B]/20 rounded-full blur-[70px] pointer-events-none -z-10 transform scale-75" />

      {/* Bottom Right Micro-label */}
      <div className="absolute bottom-2 right-4 text-right text-[10px] font-mono tracking-widest text-[#737373] leading-tight pointer-events-none z-20">
        <div>CREATIVE</div>
        <div>DEVELOPER</div>
        <div className="font-bold text-[#171717]">PV.</div>
      </div>
    </div>
  );
};
