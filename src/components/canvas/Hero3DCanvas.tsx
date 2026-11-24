import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect WebGL capability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene setup with subtle background integration
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Warm Key Light (top right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(6, 8, 6);
    scene.add(keyLight);

    // Soft Fill Light (bottom left)
    const fillLight = new THREE.DirectionalLight(0xf5f4f0, 1.6);
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);

    // Electric Lime Accent Rim Light (back-right, gives edge glow)
    const limeRimLight = new THREE.PointLight(0xc7f36b, 3.5, 12, 1.2);
    limeRimLight.position.set(3.5, 2.5, -2);
    scene.add(limeRimLight);

    // Back cyan-white backlight for reflection depth
    const backLight = new THREE.DirectionalLight(0xe8f0fe, 1.2);
    backLight.position.set(0, -6, -4);
    scene.add(backLight);

    // Environment reflections pseudo-sky
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    // Group for the entire PV Sculpture
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // --- MATERIALS ---
    // 1. Ultra-Polished Mirror Chrome
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf3f3f3,
      metalness: 0.96,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.98,
    });

    // 2. Translucent Frosted Glass
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.18,
      transmission: 0.88,
      thickness: 1.2,
      ior: 1.52,
      transparent: true,
      opacity: 0.85,
    });

    // 3. Electric Lime Glow Accent
    const limeMaterial = new THREE.MeshStandardMaterial({
      color: 0xc7f36b,
      emissive: 0xc7f36b,
      emissiveIntensity: 0.55,
      roughness: 0.25,
      metalness: 0.1,
    });

    // 4. Dark Gunmetal Titanium (subtle contrast)
    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f2022,
      metalness: 0.85,
      roughness: 0.35,
    });

    // --- SCULPTURE GEOMETRIES: "P" & "V" ABSTRACT MONOGRAM ---

    // [P] Stem: Smooth vertical tapered pillar with rounded caps
    const pStemGeo = new THREE.CylinderGeometry(0.24, 0.26, 2.7, 48);
    const pStem = new THREE.Mesh(pStemGeo, chromeMaterial);
    pStem.position.set(-0.75, 0.2, 0);
    pStem.castShadow = true;
    sculptureGroup.add(pStem);

    // [P] Loop: Sweeping Torus arc forming the P head
    const pLoopGeo = new THREE.TorusGeometry(0.72, 0.2, 36, 64, Math.PI * 1.25);
    const pLoop = new THREE.Mesh(pLoopGeo, glassMaterial);
    pLoop.position.set(-0.45, 0.8, 0.12);
    pLoop.rotation.z = -Math.PI / 2.3;
    sculptureGroup.add(pLoop);

    // Inner chrome ring nested inside P loop
    const pInnerRingGeo = new THREE.TorusGeometry(0.48, 0.08, 32, 64);
    const pInnerRing = new THREE.Mesh(pInnerRingGeo, chromeMaterial);
    pInnerRing.position.set(-0.42, 0.8, 0.12);
    pInnerRing.rotation.y = Math.PI / 6;
    sculptureGroup.add(pInnerRing);

    // [V] Left Arm: Slanted arm descending to center
    const vLeftArmGeo = new THREE.CylinderGeometry(0.2, 0.2, 2.2, 48);
    const vLeftArm = new THREE.Mesh(vLeftArmGeo, chromeMaterial);
    vLeftArm.position.set(0.35, 0.05, 0.3);
    vLeftArm.rotation.z = Math.PI / 7.2;
    vLeftArm.rotation.x = -Math.PI / 18;
    sculptureGroup.add(vLeftArm);

    // [V] Right Arm: Slanted arm ascending right
    const vRightArmGeo = new THREE.CylinderGeometry(0.2, 0.2, 2.4, 48);
    const vRightArm = new THREE.Mesh(vRightArmGeo, titaniumMaterial);
    vRightArm.position.set(1.15, 0.18, -0.15);
    vRightArm.rotation.z = -Math.PI / 6.8;
    vRightArm.rotation.x = Math.PI / 16;
    sculptureGroup.add(vRightArm);

    // [V Apex Joint / Node]: Electric lime signature torus accent
    const vApexJointGeo = new THREE.TorusGeometry(0.32, 0.09, 32, 48);
    const vApexJoint = new THREE.Mesh(vApexJointGeo, limeMaterial);
    vApexJoint.position.set(0.75, -0.9, 0.05);
    vApexJoint.rotation.x = Math.PI / 2.2;
    sculptureGroup.add(vApexJoint);

    // Orbiting Lime Micro-Orb 1 (Interacting dynamic accent)
    const limeOrb1Geo = new THREE.SphereGeometry(0.12, 32, 32);
    const limeOrb1 = new THREE.Mesh(limeOrb1Geo, limeMaterial);
    sculptureGroup.add(limeOrb1);

    // Orbiting Lime Micro-Orb 2
    const limeOrb2Geo = new THREE.SphereGeometry(0.08, 32, 32);
    const limeOrb2 = new THREE.Mesh(limeOrb2Geo, limeMaterial);
    sculptureGroup.add(limeOrb2);

    // Floating glass disc accentuating spatial depth
    const glassDiscGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.04, 64);
    const glassDisc = new THREE.Mesh(glassDiscGeo, glassMaterial);
    glassDisc.position.set(0.2, -0.1, -0.4);
    glassDisc.rotation.x = Math.PI / 3;
    glassDisc.rotation.z = Math.PI / 6;
    sculptureGroup.add(glassDisc);

    // Tilt the whole sculpture toward optimal isometric hero angle
    sculptureGroup.rotation.x = 0.18;
    sculptureGroup.rotation.y = -0.35;

    // Mouse movement interaction with gentle easing
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0.18;
    let targetRotationY = -0.35;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 1.2;
      mouseY = y * 1.2;
    };

    const handleMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Subtle floating breathing effect
        sculptureGroup.position.y = Math.sin(elapsedTime * 0.9) * 0.12;

        // Base idle rotation + mouse parallax lerp
        const idleRotY = -0.35 + Math.sin(elapsedTime * 0.35) * 0.15;
        const idleRotX = 0.18 + Math.cos(elapsedTime * 0.45) * 0.08;

        targetRotationY = idleRotY + mouseX * 0.6;
        targetRotationX = idleRotX - mouseY * 0.5;

        sculptureGroup.rotation.y += (targetRotationY - sculptureGroup.rotation.y) * 0.06;
        sculptureGroup.rotation.x += (targetRotationX - sculptureGroup.rotation.x) * 0.06;

        // Orbiting Lime Micro-Orbs around the sculpture
        const orb1Angle = elapsedTime * 1.1;
        limeOrb1.position.set(
          Math.cos(orb1Angle) * 1.6 + 0.2,
          Math.sin(orb1Angle * 0.8) * 0.9 + 0.1,
          Math.sin(orb1Angle) * 1.4
        );

        const orb2Angle = -elapsedTime * 1.4 + Math.PI;
        limeOrb2.position.set(
          Math.cos(orb2Angle) * 1.2 - 0.2,
          Math.sin(orb2Angle * 1.1) * 0.7 - 0.2,
          Math.sin(orb2Angle) * 1.0
        );

        // Slow secondary rotation on glass loop
        pLoop.rotation.x = Math.sin(elapsedTime * 0.5) * 0.12;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);

      // Clean up Three.js resources
      renderer.dispose();
      [pStemGeo, pLoopGeo, pInnerRingGeo, vLeftArmGeo, vRightArmGeo, vApexJointGeo, limeOrb1Geo, limeOrb2Geo, glassDiscGeo].forEach(
        (g) => g.dispose()
      );
      [chromeMaterial, glassMaterial, limeMaterial, titaniumMaterial].forEach((m) => m.dispose());
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[540px] xl:h-[600px] flex items-center justify-center">
      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing"
        title="Interactive 3D PV Sculpture — Move your mouse to explore"
      />

      {/* Fallback Static Visual if WebGL is unavailable */}
      {!webglSupported && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white/60 rounded-3xl border border-black/5 text-center">
          <div className="w-24 h-24 rounded-full bg-[#171717] flex items-center justify-center font-display font-bold text-3xl text-[#C7F36B] mb-4 shadow-xl">
            PV
          </div>
          <div className="font-display font-semibold text-lg text-[#171717]">Digital Atelier</div>
          <p className="text-xs text-[#737373] mt-1 font-mono">Piyush Verma — Creative Engineering</p>
        </div>
      )}

      {/* Subtle Studio Floor Shadow */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/5 blur-xl rounded-full pointer-events-none" />

      {/* Interactive Micro-badge */}
      <div className="absolute bottom-2 right-4 z-20 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-black/5 text-[10px] font-mono text-[#737373] pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C7F36B] animate-pulse" />
        <span>3D ATELIER SCULPTURE • REAL-TIME WEBGL</span>
      </div>
    </div>
  );
};
