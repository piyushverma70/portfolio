import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    // Check for prefers-reduced-motion
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
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // 3. Realistic Studio HDR Environment Map via PMREMGenerator
    // This provides physical studio reflections so chrome surfaces shine with bright silver highlights
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    const envTexture = pmremGenerator.fromScene(roomEnv, 0.01).texture;
    scene.environment = envTexture;

    // 4. Studio Softbox & Rim Lighting Setup
    // Ambient fill to preserve luminosity
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Front-Facing Studio Softbox (bathes the front faces of P & V in luminous silver reflections)
    const frontSoftbox = new THREE.DirectionalLight(0xffffff, 2.5);
    frontSoftbox.position.set(1.2, 1.0, 5.5);
    scene.add(frontSoftbox);

    // Main Studio Key Light (bright front-top-right softbox)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 6, 4.5);
    scene.add(keyLight);

    // Soft Fill Light (neutral cool-grey fill from left)
    const fillLight = new THREE.DirectionalLight(0xf0f3f6, 1.6);
    fillLight.position.set(-5, 1, 4);
    scene.add(fillLight);

    // Top Softbox Light (overhead highlight for letter tops)
    const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
    topLight.position.set(0, 7, 2);
    scene.add(topLight);

    // Electric Lime Accent Light (gives subtle luminous lime reflection on lower bevels)
    const limeAccentLight = new THREE.PointLight(0xc7f36b, 3.2, 8, 1.1);
    limeAccentLight.position.set(2.2, -1.0, 1.0);
    scene.add(limeAccentLight);

    // Crisp White Specular Gleam Light (highlights the curved contour of 'P')
    const specularGleamLight = new THREE.PointLight(0xffffff, 2.2, 8, 1.0);
    specularGleamLight.position.set(-2.5, 2.5, 3.0);
    scene.add(specularGleamLight);

    // 5. Sculpture Group
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // 6. Materials
    // Luxury Polished Silver Chrome Material
    // Base color: #EBEDF0 (ultra-bright silver / platinum)
    // High metalness + controlled roughness ensures bright, silver reflections (never black)
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xebedf0,
      metalness: 0.96,
      roughness: 0.16,
      clearcoat: 0.85,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
      envMapIntensity: 1.6,
    });

    // Subtle Translucent Lime Accent Material (for orbit ring)
    const limeTranslucentMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc7f36b,
      transparent: true,
      opacity: 0.8,
      transmission: 0.5,
      roughness: 0.12,
      metalness: 0.08,
      emissive: 0xc7f36b,
      emissiveIntensity: 0.4,
      clearcoat: 0.7,
      clearcoatRoughness: 0.08,
    });

    // Electric Lime Backing Accent Material
    const limeBackingMaterial = new THREE.MeshStandardMaterial({
      color: 0xc7f36b,
      emissive: 0xc7f36b,
      emissiveIntensity: 0.38,
      roughness: 0.25,
      metalness: 0.15,
    });

    // 7. Extruded Geometric 3D PV Monogram with Smooth Rounded Bevels
    const extrudeSettings = {
      steps: 1,
      depth: 0.32,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.07,
      bevelOffset: 0,
      bevelSegments: 8, // smooth curved bevel reflections
    };

    // [P] Shape
    const pShape = new THREE.Shape();
    pShape.moveTo(-1.25, -1.0);
    pShape.lineTo(-0.85, -1.0);
    pShape.lineTo(-0.85, 0.05);
    pShape.lineTo(-0.25, 0.05);
    pShape.bezierCurveTo(0.35, 0.05, 0.35, 1.05, -0.25, 1.05);
    pShape.lineTo(-1.25, 1.05);
    pShape.closePath();

    // [P] Hole
    const pHole = new THREE.Path();
    pHole.moveTo(-0.85, 0.4);
    pHole.lineTo(-0.25, 0.4);
    pHole.bezierCurveTo(0.05, 0.4, 0.05, 0.72, -0.25, 0.72);
    pHole.lineTo(-0.85, 0.72);
    pHole.closePath();
    pShape.holes.push(pHole);

    const pGeo = new THREE.ExtrudeGeometry(pShape, extrudeSettings);
    pGeo.center();
    const pMesh = new THREE.Mesh(pGeo, chromeMaterial);
    pMesh.position.set(-0.45, 0.05, 0);
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

    // Backing Lime Accent Plates (creates a subtle luminous lime contour behind the silver letters)
    const pBackGeo = new THREE.ExtrudeGeometry(pShape, { depth: 0.08, bevelEnabled: false });
    pBackGeo.center();
    const pBackMesh = new THREE.Mesh(pBackGeo, limeBackingMaterial);
    pBackMesh.position.set(-0.45, 0.05, -0.20);
    pBackMesh.scale.set(1.02, 1.02, 1);
    sculptureGroup.add(pBackMesh);

    const vBackGeo = new THREE.ExtrudeGeometry(vShape, { depth: 0.08, bevelEnabled: false });
    vBackGeo.center();
    const vBackMesh = new THREE.Mesh(vBackGeo, limeBackingMaterial);
    vBackMesh.position.set(0.48, -0.05, -0.12);
    vBackMesh.scale.set(1.02, 1.02, 1);
    sculptureGroup.add(vBackMesh);

    // 8. Dual Orbiting Rings: One Translucent Lime, One Thin Polished Chrome
    // Translucent Lime Ring
    const limeRingGeo = new THREE.TorusGeometry(1.58, 0.024, 20, 140);
    const limeRingMesh = new THREE.Mesh(limeRingGeo, limeTranslucentMaterial);
    limeRingMesh.rotation.x = Math.PI / 2.3;
    limeRingMesh.rotation.y = -Math.PI / 5;
    sculptureGroup.add(limeRingMesh);

    // Thin Polished Chrome Ring
    const chromeRingGeo = new THREE.TorusGeometry(1.76, 0.016, 20, 140);
    const chromeRingMesh = new THREE.Mesh(chromeRingGeo, chromeMaterial);
    chromeRingMesh.rotation.x = Math.PI / 2.7;
    chromeRingMesh.rotation.y = Math.PI / 6;
    sculptureGroup.add(chromeRingMesh);

    // 9. Clamped & Refined Orientation Constants
    // Default optimal angle keeping PV 100% legible while displaying 3D depth
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
      // Normalize to [-0.5, 0.5]
      const nx = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5));
      const ny = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5));
      targetMouseX = nx;
      targetMouseY = ny;
    };

    const handleMouseLeave = () => {
      // Smoothly return target to center
      targetMouseX = 0;
      targetMouseY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. Smooth Animation Loop with Clamped 8-12° Rotation & Spring Lerp
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Subtle floating breathing on Y axis (gentle sine wave)
        sculptureGroup.position.y = Math.sin(elapsed * 0.8) * 0.07;

        // Easing mouse coordinates smoothly towards targets
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        // Gentle idle breathing rotation (max ~2 degrees)
        const idleRotX = DEFAULT_ROT_X + Math.cos(elapsed * 0.4) * 0.025;
        const idleRotY = DEFAULT_ROT_Y + Math.sin(elapsed * 0.35) * 0.035;

        // Mouse-driven rotation strictly clamped to 8-12 degrees (0.16 radians)
        const targetX = idleRotX - currentMouseY * 0.16;
        const targetY = idleRotY + currentMouseX * 0.18;

        // Smooth spring interpolation to target orientation
        sculptureGroup.rotation.x += (targetX - sculptureGroup.rotation.x) * 0.05;
        sculptureGroup.rotation.y += (targetY - sculptureGroup.rotation.y) * 0.05;

        // Independent, serene rotation of the orbital rings
        limeRingMesh.rotation.z = elapsed * 0.18;
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
      pmremGenerator.dispose();
      roomEnv.dispose();
      envTexture.dispose();

      [pGeo, vGeo, pBackGeo, vBackGeo, limeRingGeo, chromeRingGeo].forEach((g) => g.dispose());
      [chromeMaterial, limeTranslucentMaterial, limeBackingMaterial].forEach((m) => m.dispose());
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] flex items-center justify-center select-none">
      {/* Subtle Background Crosshair Grid Marks */}
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
