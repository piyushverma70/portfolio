import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
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
    camera.position.set(0, 0, 6.0);

    // 2. High-Precision WebGL Renderer with ACES Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 3. Studio HDR Environment Map
    const studioEnv = createStudioEnvironment(renderer);
    scene.environment = studioEnv.envTexture;

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Key Studio Light (overhead front-right softbox)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(4.5, 6.0, 5.0);
    scene.add(keyLight);

    // Left Fill Softbox (front-left fill)
    const fillLight = new THREE.DirectionalLight(0xe8edf2, 1.6);
    fillLight.position.set(-4.5, 2.5, 4.5);
    scene.add(fillLight);

    // Top Rim Light
    const topRimLight = new THREE.DirectionalLight(0xffffff, 2.2);
    topRimLight.position.set(0, 7.0, -2.0);
    scene.add(topRimLight);

    // 5. Sculpture Group
    const sculptureGroup = new THREE.Group();
    // Default 3/4 perspective angle matching reference editorial visual
    const DEFAULT_ROT_X = 0.14;
    const DEFAULT_ROT_Y = -0.22;
    sculptureGroup.rotation.x = DEFAULT_ROT_X;
    sculptureGroup.rotation.y = DEFAULT_ROT_Y;
    scene.add(sculptureGroup);

    // Dedicated Electric Lime Under-Glow Point Light (attached to sculpture group)
    const limeAccentLight = new THREE.PointLight(0xc7f36b, 6.0, 7.0, 1.2);
    limeAccentLight.position.set(0.2, -1.2, 0.7);
    sculptureGroup.add(limeAccentLight);

    // Electric Lime Rim Back Light (casts vibrant lime highlights on lower bevels)
    const limeRimBack = new THREE.DirectionalLight(0xc7f36b, 2.0);
    limeRimBack.position.set(0.5, -3.0, -2.0);
    sculptureGroup.add(limeRimBack);

    // 6. Materials
    // Luxury Liquid Chrome Material
    const liquidChromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 1.0,
      envMapIntensity: 1.9,
    });

    // Luminous Translucent Lime Orbit Material
    const limeTranslucentMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc7f36b,
      transparent: true,
      opacity: 0.85,
      transmission: 0.65,
      roughness: 0.08,
      metalness: 0.04,
      emissive: 0xc7f36b,
      emissiveIntensity: 0.70,
      clearcoat: 0.9,
      clearcoatRoughness: 0.04,
    });

    // Thin Polished Chrome Ring Material
    const thinChromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.06,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 1.0,
      envMapIntensity: 1.9,
    });

    const geometriesToDispose: THREE.BufferGeometry[] = [];

    // 7. Continuous Super-Ellipse Cross-Section (C-Infinity Smooth Squircle)
    // Eliminates all sharp creases and flat facets for seamless liquid mercury reflections
    const a = 0.22; // half-width (total stroke face width = 0.44)
    const b = 0.17; // half-depth (total stroke depth = 0.34)
    const n = 3.2;  // super-ellipse power for smooth rounded profile
    const crossSection = new THREE.Shape();
    const segs = 48;
    for (let i = 0; i <= segs; i++) {
      const theta = (i / segs) * Math.PI * 2;
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);
      const px = a * Math.sign(cosT) * Math.pow(Math.abs(cosT), 2 / n);
      const py = b * Math.sign(sinT) * Math.pow(Math.abs(sinT), 2 / n);
      if (i === 0) crossSection.moveTo(px, py);
      else crossSection.lineTo(px, py);
    }
    crossSection.closePath();

    const extrudeOpts = {
      steps: 48,
      bevelEnabled: true,
      bevelSize: 0.03,
      bevelThickness: 0.03,
      bevelSegments: 6,
    };

    // Center offset to balance monogram
    const OX = -0.16;

    // --- Letter [P] ---
    // A. Slanted Stem
    const pStemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.85 + OX, -1.15, 0),
      new THREE.Vector3(-0.70 + OX, 0.0, 0),
      new THREE.Vector3(-0.55 + OX, 1.15, 0),
    ]);
    const rawPStem = new THREE.ExtrudeGeometry(crossSection, { ...extrudeOpts, extrudePath: pStemCurve });
    const pStemGeo = mergeVertices(rawPStem, 1e-3);
    pStemGeo.computeVertexNormals();
    rawPStem.dispose();
    geometriesToDispose.push(pStemGeo);
    const pStemMesh = new THREE.Mesh(pStemGeo, liquidChromeMaterial);
    pStemMesh.position.set(0, 0, -0.06);
    sculptureGroup.add(pStemMesh);

    // B. Smooth Slanted Loop of [P]
    const pLoopCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.55 + OX, 1.15, 0),
      new THREE.Vector3(0.0 + OX, 1.15, 0),
      new THREE.Vector3(0.48 + OX, 0.65, 0),
      new THREE.Vector3(0.0 + OX, 0.12, 0),
      new THREE.Vector3(-0.68 + OX, 0.12, 0),
    ]);
    const rawPLoop = new THREE.ExtrudeGeometry(crossSection, { ...extrudeOpts, extrudePath: pLoopCurve });
    const pLoopGeo = mergeVertices(rawPLoop, 1e-3);
    pLoopGeo.computeVertexNormals();
    rawPLoop.dispose();
    geometriesToDispose.push(pLoopGeo);
    const pLoopMesh = new THREE.Mesh(pLoopGeo, liquidChromeMaterial);
    pLoopMesh.position.set(0, 0, -0.06);
    sculptureGroup.add(pLoopMesh);

    // --- Letter [V] ---
    // Continuous 3D Swept Curve Nestled Tightly Against P with Italic Slant and Smooth Rounded Apex
    const vCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.25 + OX, 1.15, 0),
      new THREE.Vector3(-0.05 + OX, 0.35, 0),
      new THREE.Vector3(0.25 + OX, -0.92, 0),
      new THREE.Vector3(0.38 + OX, -1.15, 0),
      new THREE.Vector3(0.52 + OX, -0.92, 0),
      new THREE.Vector3(0.85 + OX, 0.35, 0),
      new THREE.Vector3(1.18 + OX, 1.25, 0),
    ]);
    const rawVGeo = new THREE.ExtrudeGeometry(crossSection, { ...extrudeOpts, steps: 64, extrudePath: vCurve });
    const vGeo = mergeVertices(rawVGeo, 1e-3);
    vGeo.computeVertexNormals();
    rawVGeo.dispose();
    geometriesToDispose.push(vGeo);
    const vMesh = new THREE.Mesh(vGeo, liquidChromeMaterial);
    // V sits slightly in front of P in Z, overlapping P's loop with rich 3D parallax
    vMesh.position.set(0, 0, 0.06);
    sculptureGroup.add(vMesh);

    // 8. Exactly Two Refined Orbital Rings Wrapped Closely
    // 1. Delicate translucent electric-lime orbit ring
    const limeRingGeo = new THREE.TorusGeometry(1.60, 0.020, 24, 160);
    geometriesToDispose.push(limeRingGeo);
    const limeRingMesh = new THREE.Mesh(limeRingGeo, limeTranslucentMaterial);
    limeRingMesh.rotation.x = Math.PI / 2.3;
    limeRingMesh.rotation.y = -Math.PI / 5;
    sculptureGroup.add(limeRingMesh);

    // 2. Thin polished chrome orbit ring
    const chromeRingGeo = new THREE.TorusGeometry(1.78, 0.012, 24, 160);
    geometriesToDispose.push(chromeRingGeo);
    const chromeRingMesh = new THREE.Mesh(chromeRingGeo, thinChromeMaterial);
    chromeRingMesh.rotation.x = Math.PI / 2.7;
    chromeRingMesh.rotation.y = Math.PI / 6;
    sculptureGroup.add(chromeRingMesh);

    // 9. Orientation & Interaction
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

    // 10. Smooth Floating Animation Loop
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
        const idleRotX = DEFAULT_ROT_X + Math.cos(elapsed * 0.4) * 0.02;
        const idleRotY = DEFAULT_ROT_Y + Math.sin(elapsed * 0.35) * 0.03;

        // Clamped 8-12 degrees parallax
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

      geometriesToDispose.forEach((g) => g.dispose());
      [liquidChromeMaterial, limeTranslucentMaterial, thinChromeMaterial].forEach((m) => m.dispose());
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
        title="Interactive 3D Chrome PV Monogram — Move pointer to explore"
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
