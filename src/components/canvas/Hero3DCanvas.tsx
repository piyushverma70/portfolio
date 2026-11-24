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

    // 2. High-Precision WebGL Renderer with ACES Tone Mapping
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

    // 3. HDR Studio Environment Map
    const studioEnv = createStudioEnvironment(renderer);
    scene.environment = studioEnv.envTexture;

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    // Key Studio Light (overhead front-right softbox)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(4.0, 6.0, 4.5);
    scene.add(keyLight);

    // Left Fill Softbox (front-left fill)
    const fillLight = new THREE.DirectionalLight(0xe8edf2, 1.4);
    fillLight.position.set(-4.0, 2.5, 4.5);
    scene.add(fillLight);

    // Electric Lime Accent Light (lower bevel bounce)
    const limeRimLight = new THREE.PointLight(0xc7f36b, 3.2, 7, 1.2);
    limeRimLight.position.set(1.8, -1.2, 0.8);
    scene.add(limeRimLight);

    // 5. Sculpture Group
    const sculptureGroup = new THREE.Group();
    // 3/4 perspective angle showing off the sculptural beveled depth
    sculptureGroup.rotation.x = 0.14;
    sculptureGroup.rotation.y = -0.26;
    scene.add(sculptureGroup);

    // 6. Materials
    // Liquid Mirror Chrome Material
    // In Three.js PBR: metalness 0.98 + pure white produces true liquid mirror chrome
    // reflecting the HDR studio environment with smooth highlights and deep graphite depth
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0,
      envMapIntensity: 1.6,
    });

    // Luminous Lime Foundation Layer (1:1 footprint directly behind the chrome letters — ZERO outline border)
    const limeFoundationMaterial = new THREE.MeshStandardMaterial({
      color: 0xc7f36b,
      emissive: 0xc7f36b,
      emissiveIntensity: 0.85,
      roughness: 0.18,
      metalness: 0.08,
    });

    // Delicate Translucent Electric-Lime Orbit Ring
    const limeTranslucentMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc7f36b,
      transparent: true,
      opacity: 0.82,
      transmission: 0.6,
      roughness: 0.10,
      metalness: 0.04,
      emissive: 0xc7f36b,
      emissiveIntensity: 0.6,
      clearcoat: 0.9,
      clearcoatRoughness: 0.05,
    });

    // Thin Polished Chrome Orbit Ring
    const thinChromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.10,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0,
      envMapIntensity: 1.7,
    });

    // 7. Custom Sculptural 3D PV Monogram Geometry with Wide Rounded Bevels
    const extrudeSettings = {
      steps: 1,
      depth: 0.42, // thick sculptural 3D depth
      bevelEnabled: true,
      bevelThickness: 0.10, // generous rounded bevel
      bevelSize: 0.08, // wide bevel that catches continuous studio specular lines
      bevelOffset: 0,
      bevelSegments: 10, // 10 segments for silky smooth curved bevel highlights
    };

    // [P] Custom Sculptural Letterform with Architectural 45° Chamfer
    const pShape = new THREE.Shape();
    pShape.moveTo(-1.35, -1.15);
    pShape.lineTo(-0.85, -1.15);
    pShape.lineTo(-0.85, 0.05);
    pShape.lineTo(-0.15, 0.05);
    pShape.bezierCurveTo(0.45, 0.05, 0.45, 1.15, -0.15, 1.15);
    pShape.lineTo(-0.95, 1.15); // chamfer start
    pShape.lineTo(-1.35, 0.75); // 45° chamfer cut
    pShape.closePath();

    // [P] Inner Counter / Hole
    const pHole = new THREE.Path();
    pHole.moveTo(-0.85, 0.42);
    pHole.lineTo(-0.15, 0.42);
    pHole.bezierCurveTo(0.12, 0.42, 0.12, 0.78, -0.15, 0.78);
    pHole.lineTo(-0.85, 0.78);
    pHole.closePath();
    pShape.holes.push(pHole);

    const pGeo = new THREE.ExtrudeGeometry(pShape, extrudeSettings);
    pGeo.center();
    const pMesh = new THREE.Mesh(pGeo, chromeMaterial);
    pMesh.position.set(-0.35, 0.05, 0);
    sculptureGroup.add(pMesh);

    // [V] Custom Sculptural Letterform with Balanced Diagonal Proportions
    const vShape = new THREE.Shape();
    vShape.moveTo(-0.08, 1.15);
    vShape.lineTo(0.35, 1.15);
    vShape.lineTo(0.72, -0.65);
    vShape.lineTo(1.15, 1.15);
    vShape.lineTo(1.58, 1.15);
    vShape.lineTo(0.95, -1.15);
    vShape.lineTo(0.48, -1.15);
    vShape.closePath();

    const vGeo = new THREE.ExtrudeGeometry(vShape, extrudeSettings);
    vGeo.center();
    const vMesh = new THREE.Mesh(vGeo, chromeMaterial);
    // Shifted forward in Z (0.12) so V gracefully interlocks in front of P without clipping
    vMesh.position.set(0.40, -0.05, 0.12);
    sculptureGroup.add(vMesh);

    // Luminous Lime Foundation Layer (Exact 1:1 footprint directly behind the chrome letters — ZERO outline)
    const pBackGeo = new THREE.ExtrudeGeometry(pShape, { depth: 0.10, bevelEnabled: false });
    pBackGeo.center();
    const pBackMesh = new THREE.Mesh(pBackGeo, limeFoundationMaterial);
    pBackMesh.position.set(-0.35, 0.05, -0.26);
    sculptureGroup.add(pBackMesh);

    const vBackGeo = new THREE.ExtrudeGeometry(vShape, { depth: 0.10, bevelEnabled: false });
    vBackGeo.center();
    const vBackMesh = new THREE.Mesh(vBackGeo, limeFoundationMaterial);
    vBackMesh.position.set(0.40, -0.05, -0.14);
    sculptureGroup.add(vBackMesh);

    // 8. Exactly Two Refined Orbital Elements
    // 1. One delicate translucent electric-lime ring
    const limeRingGeo = new THREE.TorusGeometry(1.72, 0.016, 20, 160);
    const limeRingMesh = new THREE.Mesh(limeRingGeo, limeTranslucentMaterial);
    limeRingMesh.rotation.x = Math.PI / 2.3;
    limeRingMesh.rotation.y = -Math.PI / 5;
    sculptureGroup.add(limeRingMesh);

    // 2. One thin polished chrome ring
    const chromeRingGeo = new THREE.TorusGeometry(1.90, 0.012, 20, 160);
    const chromeRingMesh = new THREE.Mesh(chromeRingGeo, thinChromeMaterial);
    chromeRingMesh.rotation.x = Math.PI / 2.7;
    chromeRingMesh.rotation.y = Math.PI / 6;
    sculptureGroup.add(chromeRingMesh);

    // 9. Orientation Constants (balanced 3/4 perspective)
    const DEFAULT_ROT_X = 0.14;
    const DEFAULT_ROT_Y = -0.26;
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
        // Floating breathing on Y axis (gentle 5-second sine wave)
        sculptureGroup.position.y = Math.sin(elapsed * 0.8) * 0.07;

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

        // Smooth orbital rotation of rings
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
      {/* Background Precision Crosshairs */}
      <div className="absolute top-8 left-8 text-[#C2C0B8] text-sm font-mono pointer-events-none">+</div>
      <div className="absolute top-8 right-8 text-[#C2C0B8] text-sm font-mono pointer-events-none">+</div>
      <div className="absolute bottom-8 left-8 text-[#C2C0B8] text-sm font-mono pointer-events-none">+</div>
      <div className="absolute bottom-8 right-8 text-[#C2C0B8] text-sm font-mono pointer-events-none">+</div>

      {/* Interactive WebGL 3D Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing"
        title="Interactive 3D Floating PV Monogram — Move pointer to explore"
      />

      {/* Ambient Electric Lime Glow Underlay */}
      <div className="absolute inset-0 bg-[#C7F36B]/20 rounded-full blur-[80px] pointer-events-none -z-10 transform scale-75" />

      {/* Bottom Right Micro-label */}
      <div className="absolute bottom-2 right-4 text-right text-[10px] font-mono tracking-widest text-[#737373] leading-tight pointer-events-none z-20">
        <div>CREATIVE</div>
        <div>DEVELOPER</div>
        <div className="font-bold text-[#171717]">PV.</div>
      </div>
    </div>
  );
};
