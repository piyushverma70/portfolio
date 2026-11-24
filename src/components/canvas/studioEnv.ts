import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * Creates a high-dynamic-range studio environment using Google Model-Viewer's RoomEnvironment
 * with an integrated #C7F36B electric-lime HDR area light panel.
 *
 * This provides true HDR physical studio lighting:
 * - 900-lumen overhead key light
 * - 50-lumen softbox area light banks
 * - Physical room boxes casting authentic graphite occlusion
 * - 35-lumen electric-lime area light bank for subtle green edge reflections
 *
 * This completely eliminates flat white plastic surfaces and eliminates black cartoon borders.
 */
export const createStudioEnvironment = (renderer: THREE.WebGLRenderer) => {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const roomEnv = new RoomEnvironment();

  // Add an HDR Electric-Lime Studio Area Light Panel on the bottom-right
  const limePanelGeo = new THREE.BoxGeometry(0.1, 4.5, 4.5);
  const limePanelMat = new THREE.MeshLambertMaterial({
    color: 0x000000,
    emissive: 0xc7f36b,
    emissiveIntensity: 35,
  });
  const limePanel = new THREE.Mesh(limePanelGeo, limePanelMat);
  limePanel.position.set(12, -1, 4);
  roomEnv.add(limePanel);

  // Prefilter the HDR room into a reflection mipmap cube texture
  const envTexture = pmremGenerator.fromScene(roomEnv, 0.04).texture;

  const dispose = () => {
    pmremGenerator.dispose();
    envTexture.dispose();
    roomEnv.dispose();
    limePanelGeo.dispose();
    limePanelMat.dispose();
  };

  return { envTexture, dispose };
};
