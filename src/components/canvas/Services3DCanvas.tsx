import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createStudioEnvironment } from './studioEnv';

export const Services3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    // 2. WebGL Renderer with High-Precision ACES Tone Mapping
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

    // 3. High-Contrast Studio Environment
    const studioEnv = createStudioEnvironment(renderer);
    scene.environment = studioEnv.envTexture;

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Front-Top Key Softbox (bathes the top flat surfaces in polished silver chrome sheen)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(2, 6, 5);
    scene.add(keyLight);

    // Left Fill Softbox
    const fillLight = new THREE.DirectionalLight(0xdde2e8, 1.4);
    fillLight.position.set(-4, 3, 5);
    scene.add(fillLight);

    // 5. Main Sculpture Group
    const slabGroup = new THREE.Group();
    // 3/4 perspective angle matching the reference: slabs stretch horizontally/diagonally
    slabGroup.rotation.x = 0.58;
    slabGroup.rotation.y = -0.42;
    slabGroup.rotation.z = -0.22;
    scene.add(slabGroup);

    // 6. Polished Metallic Chrome Material
    // Silver reflective surface with controlled dark graphite bevels
    const chromeSlabMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd4d9de,
      metalness: 0.94,
      roughness: 0.16,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
      envMapIntensity: 1.5,
    });

    // Luminous Electric-Lime Core Material
    const limeGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0xc7f36b,
      emissive: 0xc7f36b,
      emissiveIntensity: 2.0,
      roughness: 0.15,
      metalness: 0.05,
    });

    // 7. Rounded Rectangular Slab Geometry Construction
    const slabW = 3.5;
    const slabH = 2.0;
    const slabRadius = 0.35;

    const slabShape = new THREE.Shape();
    const x0 = -slabW / 2;
    const y0 = -slabH / 2;
    slabShape.moveTo(x0 + slabRadius, y0);
    slabShape.lineTo(x0 + slabW - slabRadius, y0);
    slabShape.quadraticCurveTo(x0 + slabW, y0, x0 + slabW, y0 + slabRadius);
    slabShape.lineTo(x0 + slabW, y0 + slabH - slabRadius);
    slabShape.quadraticCurveTo(x0 + slabW, y0 + slabH, x0 + slabW - slabRadius, y0 + slabH);
    slabShape.lineTo(x0 + slabRadius, y0 + slabH);
    slabShape.quadraticCurveTo(x0, y0 + slabH, x0, y0 + slabH - slabRadius);
    slabShape.lineTo(x0, y0 + slabRadius);
    slabShape.quadraticCurveTo(x0, y0, x0 + slabRadius, y0);

    const slabExtrudeSettings = {
      steps: 1,
      depth: 0.18,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 6,
    };

    const slabGeometry = new THREE.ExtrudeGeometry(slabShape, slabExtrudeSettings);
    slabGeometry.center();

    // 8. Upper Slab (Sitting slightly behind and above in the top-right)
    const upperSlab = new THREE.Mesh(slabGeometry, chromeSlabMaterial);
    upperSlab.position.set(0.7, 0.75, -0.6);
    slabGroup.add(upperSlab);

    // Glowing electric-lime circular spot on the upper slab (as in reference)
    const limeSpotGeo = new THREE.CircleGeometry(0.42, 32);
    const upperLimeSpot = new THREE.Mesh(limeSpotGeo, limeGlowMaterial);
    upperLimeSpot.position.set(0.9, 0.2, 0.10);
    upperSlab.add(upperLimeSpot);

    // Point light radiating lime illumination across the upper slab
    const upperLimeLight = new THREE.PointLight(0xc7f36b, 3.5, 5, 1.2);
    upperLimeLight.position.set(0.9, 0.2, 0.35);
    upperSlab.add(upperLimeLight);

    // 9. Lower Slab (Shifted forward and slightly sideways to the left)
    const lowerSlab = new THREE.Mesh(slabGeometry, chromeSlabMaterial);
    lowerSlab.position.set(-0.6, -0.65, 0.45);
    slabGroup.add(lowerSlab);

    // Subtle lime glow reflection on the lower slab
    const lowerLimeSpot = new THREE.Mesh(new THREE.CircleGeometry(0.36, 32), limeGlowMaterial);
    lowerLimeSpot.position.set(-0.65, -0.35, 0.10);
    lowerSlab.add(lowerLimeSpot);

    const lowerLimeLight = new THREE.PointLight(0xc7f36b, 2.5, 4, 1.2);
    lowerLimeLight.position.set(-0.65, -0.35, 0.35);
    lowerSlab.add(lowerLimeLight);

    // 10. Mouse Parallax & Smooth Animation
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

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        // Subtle organic floating bob between the two slabs
        upperSlab.position.y = 0.75 + Math.sin(elapsed * 0.7) * 0.06;
        lowerSlab.position.y = -0.65 + Math.sin(elapsed * 0.7 + 1.1) * 0.05;

        // Subtle interactive parallax
        slabGroup.rotation.x = 0.58 - currentMouseY * 0.12;
        slabGroup.rotation.y = -0.42 + currentMouseX * 0.14;
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

      slabGeometry.dispose();
      limeSpotGeo.dispose();
      chromeSlabMaterial.dispose();
      limeGlowMaterial.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px] flex items-center justify-center select-none">
      {/* Interactive WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing"
        title="Floating 3D Metallic Slabs — Move pointer to explore"
      />

      {/* Subtle Ambient Electric Lime Underlay */}
      <div className="absolute inset-0 bg-[#C7F36B]/15 rounded-full blur-[80px] pointer-events-none -z-10 transform scale-75" />
    </div>
  );
};
