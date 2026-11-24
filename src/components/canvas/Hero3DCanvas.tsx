import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene with soft warm fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xFAF8F5, 0.08);

    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 9.4;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Warm Ambient and Soft Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const softSunLight = new THREE.DirectionalLight(0xfff7ed, 1.1);
    softSunLight.position.set(5, 8, 5);
    scene.add(softSunLight);

    const peachRimLight = new THREE.DirectionalLight(0xfde2d4, 0.7);
    peachRimLight.position.set(-6, -4, -3);
    scene.add(peachRimLight);

    // Group for gentle organic movement
    const sphereGroup = new THREE.Group();
    // Shift slightly to right so headline has clear airy background
    sphereGroup.position.set(0.6, 0, 0);
    scene.add(sphereGroup);

    // Zen Floating Organic Orbs (Matte Pastel, Calming, Soft)
    const orbData = [
      { radius: 1.15, pos: [0.5, -0.2, 0], color: 0xF2ECE1, speed: 0.35 }, // Soft Cream Center
      { radius: 0.75, pos: [-2.8, 1.4, -1], color: 0xE2ECE4, speed: 0.5 }, // Soft Sage
      { radius: 0.85, pos: [3.2, -0.8, -1.2], color: 0xFCE8DD, speed: 0.45 }, // Soft Peach
      { radius: 0.55, pos: [-1.8, -1.9, 0.5], color: 0xEDE9F4, speed: 0.6 }, // Soft Lavender
      { radius: 0.65, pos: [2.5, 1.8, 0.2], color: 0xE8ECEF, speed: 0.5 }, // Soft Sky
    ];

    const orbs: { mesh: THREE.Mesh; initialPos: number[]; speed: number }[] = [];

    orbData.forEach((data) => {
      const geo = new THREE.SphereGeometry(data.radius, 48, 48);
      const mat = new THREE.MeshStandardMaterial({
        color: data.color,
        roughness: 0.55,
        metalness: 0.04,
        transparent: true,
        opacity: 0.78,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(data.pos[0], data.pos[1], data.pos[2]);
      sphereGroup.add(mesh);

      orbs.push({
        mesh,
        initialPos: [...data.pos],
        speed: data.speed,
      });
    });

    // Mouse movement lerp
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / rect.width) * 2 - 1;
      mouseY = -(y / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll interaction
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Soft mouse lerp
      targetX += (mouseX * 0.3 - targetX) * 0.03;
      targetY += (mouseY * 0.3 - targetY) * 0.03;

      sphereGroup.position.x = 0.6 + targetX;
      sphereGroup.position.y = targetY - scrollY * 0.0012;
      sphereGroup.rotation.y = elapsedTime * 0.06;

      // Gentle organic breathing/floating for each orb
      const isDark = document.documentElement.classList.contains('dark');
      if (scene.fog) {
        scene.fog.color.setHex(isDark ? 0x0F0F12 : 0xFAF8F5);
      }

      orbs.forEach((orb, i) => {
        const offset = i * 1.5;
        orb.mesh.position.y =
          orb.initialPos[1] + Math.sin(elapsedTime * orb.speed + offset) * 0.22;
        orb.mesh.position.x =
          orb.initialPos[0] + Math.cos(elapsedTime * (orb.speed * 0.8) + offset) * 0.15;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      orbs.forEach((o) => {
        o.mesh.geometry.dispose();
        if (Array.isArray(o.mesh.material)) {
          o.mesh.material.forEach((m) => m.dispose());
        } else {
          o.mesh.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none w-full h-full overflow-hidden z-0"
      style={{ opacity: 0.75 }}
    />
  );
};
