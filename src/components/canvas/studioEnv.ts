import * as THREE from 'three';

/**
 * Creates a high-contrast physical studio environment map with:
 * - Neutral silver studio ambience (prevents pitch-black chrome)
 * - Wide front softbox coverage (bright silver reflections across both P & V front faces)
 * - Top-right key softbox (sharp specular reflection line across top bevels)
 * - Controlled dark graphite flags on inner angles (authentic deep chrome contrast bands)
 * - Electric lime reflection card (subtle #C7F36B edge reflections)
 */
export const createStudioEnvironment = (renderer: THREE.WebGLRenderer) => {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  // Neutral metallic studio ambient tone
  envScene.background = new THREE.Color(0x424850);

  // 1. Direct Front-Center Softbox (illuminates both P & V front faces with silver chrome)
  const softboxFront = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 12),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  softboxFront.position.set(0, 2, 8);
  softboxFront.lookAt(0, 0, 0);
  envScene.add(softboxFront);

  // 2. Front-Left Softbox (ensures the 'P' front face is radiant polished silver)
  const softboxFrontLeft = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 10),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  softboxFrontLeft.position.set(-4, 3, 7);
  softboxFrontLeft.lookAt(0, 0, 0);
  envScene.add(softboxFrontLeft);

  // 3. Key Top-Right Studio Softbox (creates primary bright specular reflection line)
  const softboxKey = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 10),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  softboxKey.position.set(4, 7, 4);
  softboxKey.lookAt(0, 0, 0);
  envScene.add(softboxKey);

  // 4. Right Rim Softbox Strip
  const softboxRight = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 14),
    new THREE.MeshBasicMaterial({ color: 0xf4f7fa })
  );
  softboxRight.position.set(6, 1, 3);
  softboxRight.lookAt(0, 0, 0);
  envScene.add(softboxRight);

  // 5. Dark Graphite Flag (Side-Left & Rear: creates deep metallic contrast down side facets)
  const darkFlag1 = new THREE.Mesh(
    new THREE.PlaneGeometry(7, 14),
    new THREE.MeshBasicMaterial({ color: 0x050709 })
  );
  darkFlag1.position.set(-6, -1, 1);
  darkFlag1.lookAt(0, 0, 0);
  envScene.add(darkFlag1);

  // 6. Dark Graphite Flag 2 (Bottom-Center: creates dark contrast on inner crevices)
  const darkFlag2 = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    new THREE.MeshBasicMaterial({ color: 0x030406 })
  );
  darkFlag2.position.set(-1, -6, 2);
  darkFlag2.lookAt(0, 0, 0);
  envScene.add(darkFlag2);

  // 7. Electric Lime Studio Bounce Card (Bottom-Right)
  // Injects subtle, authentic #C7F36B reflections into the lower bevels
  const limeBounceCard = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 6),
    new THREE.MeshBasicMaterial({ color: 0xc7f36b })
  );
  limeBounceCard.position.set(2.8, -3.2, 1.2);
  limeBounceCard.lookAt(0, 0, 0);
  envScene.add(limeBounceCard);

  const envTexture = pmremGenerator.fromScene(envScene, 0.02).texture;

  const dispose = () => {
    pmremGenerator.dispose();
    envTexture.dispose();
    [softboxFront, softboxFrontLeft, softboxKey, softboxRight, darkFlag1, darkFlag2, limeBounceCard].forEach((m) => {
      m.geometry.dispose();
      (m.material as THREE.Material).dispose();
    });
  };

  return { envTexture, dispose };
};
