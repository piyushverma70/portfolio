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
    camera.position.set(0, 0, 6.6);

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

    // 3. Studio HDR Environment Map
    const studioEnv = createStudioEnvironment(renderer);
    scene.environment = studioEnv.envTexture;

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Key Studio Light (overhead softbox)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    // Left Fill Softbox
    const fillLight = new THREE.DirectionalLight(0xe8edf2, 1.4);
    fillLight.position.set(-4, 2, 4);
    scene.add(fillLight);

    // Electric Lime Accent Light (inside the sculpture core)
    const innerLimeLight = new THREE.PointLight(0xc7f36b, 4.0, 8, 1.2);
    innerLimeLight.position.set(0, 0, 0);
    scene.add(innerLimeLight);

    // 5. Main Sculpture Group
    const sculptureGroup = new THREE.Group();
    sculptureGroup.rotation.x = 0.22;
    sculptureGroup.rotation.y = -0.32;
    scene.add(sculptureGroup);

    // 6. Materials
    // Luxury Liquid Mirror Chrome Material
    // Continuous curvature ensures sweeping liquid reflections from every perspective
    const liquidChromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.13,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0,
      envMapIntensity: 1.75,
    });

    // Luminous Electric-Lime Gem Core Material
    const limeCoreMaterial = new THREE.MeshStandardMaterial({
      color: 0xc7f36b,
      emissive: 0xc7f36b,
      emissiveIntensity: 1.2,
      roughness: 0.15,
      metalness: 0.05,
    });

    // Ethereal Translucent Lime Orbit Ring
    const limeTranslucentMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc7f36b,
      transparent: true,
      opacity: 0.82,
      transmission: 0.65,
      roughness: 0.10,
      metalness: 0.04,
      emissive: 0xc7f36b,
      emissiveIntensity: 0.55,
      clearcoat: 0.9,
      clearcoatRoughness: 0.05,
    });

    // Thin Polished Chrome Ring
    const thinChromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.10,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0,
      envMapIntensity: 1.8,
    });

    // 7. Kinetic Sculptural Elements
    // A. Liquid Chrome Kinetic Torus Knot Sculpture (Sleek, luxury proportions)
    const knotGeo = new THREE.TorusKnotGeometry(1.08, 0.28, 220, 38, 2, 3);
    const knotMesh = new THREE.Mesh(knotGeo, liquidChromeMaterial);
    sculptureGroup.add(knotMesh);

    // B. Internal Luminous Electric-Lime Floating Core
    const coreGeo = new THREE.IcosahedronGeometry(0.44, 0);
    const coreMesh = new THREE.Mesh(coreGeo, limeCoreMaterial);
    sculptureGroup.add(coreMesh);

    // C. Dual Floating Orbital Rings
    // Ring 1: Translucent Lime Ring
    const limeRingGeo = new THREE.TorusGeometry(1.74, 0.014, 20, 160);
    const limeRingMesh = new THREE.Mesh(limeRingGeo, limeTranslucentMaterial);
    limeRingMesh.rotation.x = Math.PI / 2.2;
    limeRingMesh.rotation.y = -Math.PI / 5;
    sculptureGroup.add(limeRingMesh);

    // Ring 2: Thin Chrome Ring
    const chromeRingGeo = new THREE.TorusGeometry(1.92, 0.010, 20, 160);
    const chromeRingMesh = new THREE.Mesh(chromeRingGeo, thinChromeMaterial);
    chromeRingMesh.rotation.x = Math.PI / 2.8;
    chromeRingMesh.rotation.y = Math.PI / 5;
    sculptureGroup.add(chromeRingMesh);

    // 8. Mouse Parallax Targets
    const DEFAULT_ROT_X = 0.22;
    const DEFAULT_ROT_Y = -0.32;

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

    // 9. Smooth Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Subtle floating bob
        sculptureGroup.position.y = Math.sin(elapsed * 0.8) * 0.06;

        // Smooth mouse easing
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        // Slow organic rotation of the liquid chrome knot
        knotMesh.rotation.x = elapsed * 0.20;
        knotMesh.rotation.y = elapsed * 0.25;

        // Slow counter-rotation of the inner lime gem
        coreMesh.rotation.x = -elapsed * 0.35;
        coreMesh.rotation.y = elapsed * 0.45;

        // Smooth orbital rotation of rings
        limeRingMesh.rotation.z = elapsed * 0.14;
        chromeRingMesh.rotation.z = -elapsed * 0.10;

        // Mouse-responsive tilt clamped to 8-12 degrees
        const targetX = DEFAULT_ROT_X - currentMouseY * 0.16;
        const targetY = DEFAULT_ROT_Y + currentMouseX * 0.18;
        sculptureGroup.rotation.x += (targetX - sculptureGroup.rotation.x) * 0.05;
        sculptureGroup.rotation.y += (targetY - sculptureGroup.rotation.y) * 0.05;
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

      [knotGeo, coreGeo, limeRingGeo, chromeRingGeo].forEach((g) => g.dispose());
      [liquidChromeMaterial, limeCoreMaterial, limeTranslucentMaterial, thinChromeMaterial].forEach((m) => m.dispose());
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
        title="Interactive Liquid Chrome Sculpture — Move pointer to explore"
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
