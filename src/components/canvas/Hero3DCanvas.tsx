import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    // 2. WebGL Renderer with High-Precision Tone Mapping
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

    // 3. Studio Environment & Reflections
    // Create an artificial gradient studio reflection environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    // Top-Right Main Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    // Bottom-Left Soft Fill Light
    const fillLight = new THREE.DirectionalLight(0xf5f4f0, 1.5);
    fillLight.position.set(-5, -4, 3);
    scene.add(fillLight);

    // Electric Lime Neon Rim Light (casts green highlights on chrome edges)
    const limeRimLight = new THREE.PointLight(0xc7f36b, 4.5, 12, 1.2);
    limeRimLight.position.set(2.8, 1.5, -2);
    scene.add(limeRimLight);

    // Bottom Lime Accent Light
    const limeBottomLight = new THREE.PointLight(0xc7f36b, 3.0, 8, 1.5);
    limeBottomLight.position.set(0, -2.5, 1.5);
    scene.add(limeBottomLight);

    // 4. Sculpture Group
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // 5. Materials
    // Liquid Mirror Chrome
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf8f8f8,
      metalness: 0.98,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 1.0,
    });

    // Electric Lime Accent Material
    const limeMaterial = new THREE.MeshStandardMaterial({
      color: 0xc7f36b,
      emissive: 0xc7f36b,
      emissiveIntensity: 0.7,
      roughness: 0.25,
      metalness: 0.2,
    });

    // Dark Titanium Core Material
    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f2022,
      metalness: 0.9,
      roughness: 0.3,
    });

    // 6. Extruded Geometric 3D PV Monogram
    const extrudeSettings = {
      steps: 1,
      depth: 0.32,
      bevelEnabled: true,
      bevelThickness: 0.07,
      bevelSize: 0.06,
      bevelOffset: 0,
      bevelSegments: 4,
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

    // Backing Lime Accent Plate on P
    const pBackGeo = new THREE.ExtrudeGeometry(pShape, { depth: 0.08, bevelEnabled: false });
    pBackGeo.center();
    const pBackMesh = new THREE.Mesh(pBackGeo, limeMaterial);
    pBackMesh.position.set(-0.45, 0.05, -0.22);
    sculptureGroup.add(pBackMesh);

    // Backing Lime Accent Plate on V
    const vBackGeo = new THREE.ExtrudeGeometry(vShape, { depth: 0.08, bevelEnabled: false });
    vBackGeo.center();
    const vBackMesh = new THREE.Mesh(vBackGeo, limeMaterial);
    vBackMesh.position.set(0.48, -0.05, -0.14);
    sculptureGroup.add(vBackMesh);

    // 7. Floating Orbiting Neon Lime Ring
    const ringGeo = new THREE.TorusGeometry(1.55, 0.024, 16, 120);
    const ringMesh = new THREE.Mesh(ringGeo, limeMaterial);
    ringMesh.rotation.x = Math.PI / 2.3;
    ringMesh.rotation.y = -Math.PI / 5;
    sculptureGroup.add(ringMesh);

    // Secondary Chrome Ring Accent
    const chromeRingGeo = new THREE.TorusGeometry(1.72, 0.016, 16, 120);
    const chromeRingMesh = new THREE.Mesh(chromeRingGeo, chromeMaterial);
    chromeRingMesh.rotation.x = Math.PI / 2.7;
    chromeRingMesh.rotation.y = Math.PI / 6;
    sculptureGroup.add(chromeRingMesh);

    // Center the sculpture group and tilt to isometric aesthetic
    sculptureGroup.rotation.x = 0.15;
    sculptureGroup.rotation.y = -0.32;

    // 8. Mouse Tracking & Smooth Parallax Lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = -0.32;
    let targetRotX = 0.15;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 1.4;
      mouseY = y * 1.4;
    };

    const handleMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
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

    // 9. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth floating breathing
      sculptureGroup.position.y = Math.sin(elapsed * 0.9) * 0.12;

      // Base idle yaw + mouse parallax easing
      const idleY = -0.32 + Math.sin(elapsed * 0.35) * 0.12;
      const idleX = 0.15 + Math.cos(elapsed * 0.45) * 0.06;

      targetRotY = idleY + mouseX * 0.5;
      targetRotX = idleX - mouseY * 0.4;

      sculptureGroup.rotation.y += (targetRotY - sculptureGroup.rotation.y) * 0.05;
      sculptureGroup.rotation.x += (targetRotX - sculptureGroup.rotation.x) * 0.05;

      // Slowly rotate the orbital rings around the monogram
      ringMesh.rotation.z = elapsed * 0.25;
      chromeRingMesh.rotation.z = -elapsed * 0.18;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);

      renderer.dispose();
      [pGeo, vGeo, pBackGeo, vBackGeo, ringGeo, chromeRingGeo].forEach((g) => g.dispose());
      [chromeMaterial, limeMaterial, titaniumMaterial].forEach((m) => m.dispose());
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
        title="Interactive 3D PV Monogram Sculpture — Move pointer to rotate"
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
