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

    // 3. High-Contrast Studio Environment Map
    const studioEnv = createStudioEnvironment(renderer);
    scene.environment = studioEnv.envTexture;

    // 4. Studio Softbox & Controlled Rim Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Front-Facing Studio Softbox (bathes the front beveled faces in bright silver reflections)
    const frontSoftbox = new THREE.DirectionalLight(0xffffff, 2.2);
    frontSoftbox.position.set(0.5, 1.5, 6.0);
    scene.add(frontSoftbox);

    // Key Top-Right Studio Softbox
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(3.5, 5.5, 4.0);
    scene.add(keyLight);

    // Left Fill Softbox
    const fillLight = new THREE.DirectionalLight(0xdde2e8, 1.4);
    fillLight.position.set(-4.5, 1.5, 3.5);
    scene.add(fillLight);

    // Electric Lime Luminous Point Light (lower-right bevel bounce)
    const limeRimLight = new THREE.PointLight(0xc7f36b, 3.5, 7, 1.2);
    limeRimLight.position.set(1.8, -1.2, 0.8);
    scene.add(limeRimLight);

    // 5. Sculpture Group
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // 6. Materials
    // Luxury Polished Silver Chrome Material
    // Base color: #D8DDE2 (bright silver chrome with dark graphite reflections)
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd8dde2,
      metalness: 0.94,
      roughness: 0.16,
      clearcoat: 0.95,
      clearcoatRoughness: 0.06,
      reflectivity: 1.0,
      envMapIntensity: 1.5,
    });

    // Electric Lime Foundation Accent (Glowing green base layer beneath the chrome)
    const limeFoundationMaterial = new THREE.MeshStandardMaterial({
      color: 0xc7f36b,
      emissive: 0xc7f36b,
      emissiveIntensity: 0.9,
      roughness: 0.18,
      metalness: 0.1,
    });

    // Luminous Translucent Lime Ribbon Material (Diagonal orbit ring)
    const limeTranslucentMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc7f36b,
      transparent: true,
      opacity: 0.88,
      transmission: 0.45,
      roughness: 0.12,
      metalness: 0.05,
      emissive: 0xc7f36b,
      emissiveIntensity: 0.7,
      clearcoat: 0.85,
      clearcoatRoughness: 0.06,
    });

    // Thin Polished Chrome Ring Material
    const thinChromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd8dde2,
      metalness: 0.98,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      envMapIntensity: 1.6,
    });

    // 7. Extruded Geometric 3D PV Monogram with Architectural Chamfer & Bevels
    const extrudeSettings = {
      steps: 1,
      depth: 0.34,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.07,
      bevelOffset: 0,
      bevelSegments: 8, // smooth rounded bevels catching sharp studio highlights
    };

    // [P] Shape with architectural 45° chamfered top-left corner
    const pShape = new THREE.Shape();
    pShape.moveTo(-1.25, -1.0);
    pShape.lineTo(-0.85, -1.0);
    pShape.lineTo(-0.85, 0.05);
    pShape.lineTo(-0.25, 0.05);
    pShape.bezierCurveTo(0.35, 0.05, 0.35, 1.05, -0.25, 1.05);
    pShape.lineTo(-0.95, 1.05); // start of top-left 45° chamfer
    pShape.lineTo(-1.25, 0.75); // chamfer cut
    pShape.closePath();

    // [P] Hole
    const pHole = new THREE.Path();
    pHole.moveTo(-0.85, 0.38);
    pHole.lineTo(-0.25, 0.38);
    pHole.bezierCurveTo(0.06, 0.38, 0.06, 0.72, -0.25, 0.72);
    pHole.lineTo(-0.85, 0.72);
    pHole.closePath();
    pShape.holes.push(pHole);

    const pGeo = new THREE.ExtrudeGeometry(pShape, extrudeSettings);
    pGeo.center();
    const pMesh = new THREE.Mesh(pGeo, chromeMaterial);
    pMesh.position.set(-0.45, 0.06, 0);
    sculptureGroup.add(pMesh);

    // [V] Shape
    const vShape = new THREE.Shape();
    vShape.moveTo(-0.15, 1.05);
    vShape.lineTo(0.2, 1.05);
    vShape.lineTo(0.65, -0.7);
    vShape.lineTo(1.1, 1.05);
    vShape.lineTo(1.45, 1.05);
    vShape.lineTo(0.85, -1.0);
    vShape.lineTo(0.45, -1.0);
    vShape.closePath();

    const vGeo = new THREE.ExtrudeGeometry(vShape, extrudeSettings);
    vGeo.center();
    const vMesh = new THREE.Mesh(vGeo, chromeMaterial);
    vMesh.position.set(0.48, -0.05, 0.08);
    sculptureGroup.add(vMesh);

    // Luminous Lime Foundation/Backing Plates (creates glowing lime foundation as in reference)
    const pBackGeo = new THREE.ExtrudeGeometry(pShape, { depth: 0.12, bevelEnabled: false });
    pBackGeo.center();
    const pBackMesh = new THREE.Mesh(pBackGeo, limeFoundationMaterial);
    pBackMesh.position.set(-0.45, 0.06, -0.22);
    pBackMesh.scale.set(1.035, 1.035, 1);
    sculptureGroup.add(pBackMesh);

    const vBackGeo = new THREE.ExtrudeGeometry(vShape, { depth: 0.12, bevelEnabled: false });
    vBackGeo.center();
    const vBackMesh = new THREE.Mesh(vBackGeo, limeFoundationMaterial);
    vBackMesh.position.set(0.48, -0.05, -0.14);
    vBackMesh.scale.set(1.035, 1.035, 1);
    sculptureGroup.add(vBackMesh);

    // 8. Dual Diagonal Orbiting Rings
    // One subtle translucent lime-green ring
    const limeRingGeo = new THREE.TorusGeometry(1.60, 0.024, 20, 140);
    const limeRingMesh = new THREE.Mesh(limeRingGeo, limeTranslucentMaterial);
    limeRingMesh.rotation.x = Math.PI / 2.3;
    limeRingMesh.rotation.y = -Math.PI / 5;
    sculptureGroup.add(limeRingMesh);

    // One thin metallic chrome orbital ring
    const chromeRingGeo = new THREE.TorusGeometry(1.78, 0.015, 20, 140);
    const chromeRingMesh = new THREE.Mesh(chromeRingGeo, thinChromeMaterial);
    chromeRingMesh.rotation.x = Math.PI / 2.7;
    chromeRingMesh.rotation.y = Math.PI / 6;
    sculptureGroup.add(chromeRingMesh);

    // 9. Orientation Constants
    const DEFAULT_ROT_X = 0.14;
    const DEFAULT_ROT_Y = -0.30;
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
        sculptureGroup.position.y = Math.sin(elapsed * 0.8) * 0.07;

        // Easing mouse coordinates smoothly towards targets
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        // Gentle idle breathing rotation
        const idleRotX = DEFAULT_ROT_X + Math.cos(elapsed * 0.4) * 0.025;
        const idleRotY = DEFAULT_ROT_Y + Math.sin(elapsed * 0.35) * 0.035;

        // Clamped 8-12 degrees movement
        const targetX = idleRotX - currentMouseY * 0.16;
        const targetY = idleRotY + currentMouseX * 0.18;

        sculptureGroup.rotation.x += (targetX - sculptureGroup.rotation.x) * 0.05;
        sculptureGroup.rotation.y += (targetY - sculptureGroup.rotation.y) * 0.05;

        // Smooth orbital rotation
        limeRingMesh.rotation.z = elapsed * 0.16;
        chromeRingMesh.rotation.z = -elapsed * 0.12;
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
