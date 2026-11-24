import * as THREE from 'three';

/**
 * Creates a high-contrast physical studio environment map with:
 * - Direct front and overhead softboxes illuminating both 'P' and 'V' front faces with silver chrome
 * - Rear and side dark graphite flags providing deep contrast along side silhouettes
 * - Electric lime reflection card providing subtle #C7F36B rim reflections
 */
export const createStudioEnvironment = (renderer: THREE.WebGLRenderer) => {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  // Deep graphite studio backdrop for high metallic contrast
  envScene.background = new THREE.Color(0x101317);

  // 1. Direct Front-Center Softbox (bright silver reflections across both P & V front faces)
  const softboxFront = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 12),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  softboxFront.position.set(0, 1.5, 7.5);
  softboxFront.lookAt(0, 0, 0);
  envScene.add(softboxFront);

  // 2. Front-Left Softbox (ensures the 'P' front face is radiant polished silver)
  const softboxFrontLeft = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 10),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  softboxFrontLeft.position.set(-4, 3, 6);
  softboxFrontLeft.lookAt(0, 0, 0);
  envScene.add(softboxFrontLeft);

  // 3. Key Top-Right Studio Softbox (creates primary bright specular reflection line)
  const softboxKey = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 10),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  softboxKey.position.set(4, 7, 4.5);
  softboxKey.lookAt(0, 0, 0);
  envScene.add(softboxKey);

  // 4. Right Rim Softbox Strip
  const softboxRight = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 14),
    new THREE.MeshBasicMaterial({ color: 0xf5f8fa })
  );
  softboxRight.position.set(6, 1.5, 3.5);
  softboxRight.lookAt(0, 0, 0);
  envScene.add(softboxRight);

  // 5. Dark Graphite Flag 1 (Positioned behind and to the left for side silhouette contrast)
  const darkFlag1 = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 14),
    new THREE.MeshBasicMaterial({ color: 0x020305 })
  );
  darkFlag1.position.set(-6, 0, -3);
  darkFlag1.lookAt(0, 0, 0);
  envScene.add(darkFlag1);

  // 6. Dark Graphite Flag 2 (Bottom-Center: creates rich dark reflection in crevices)
  const darkFlag2 = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 6),
    new THREE.MeshBasicMaterial({ color: 0x010203 })
  );
  darkFlag2.position.set(0, -6, 1);
  darkFlag2.lookAt(0, 0, 0);
  envScene.add(darkFlag2);

  // 7. Electric Lime Studio Bounce Card (Bottom-Right)
  // Injects subtle, authentic #C7F36B reflections into the lower bevels
  const limeBounceCard = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
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
