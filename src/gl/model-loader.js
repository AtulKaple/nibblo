import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import productGlbUrl from "./product.glb";

let cachedModel = null;
let cachedPackagingModel = null;

export async function loadProductModel() {
  if (cachedModel) {
    return cachedModel.clone();
  }

  if (MeshoptDecoder.ready) {
    await MeshoptDecoder.ready;
  }
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);

  const urlsToTry = [
    productGlbUrl,
    "/models/product.glb",
    "/assets/models/product.glb",
    "/wp-content/themes/emg-nibblo/assets/models/product.glb",
  ].filter(Boolean);

  let loadedGltf = null;
  for (const url of urlsToTry) {
    try {
      loadedGltf = await loader.loadAsync(url);
      if (loadedGltf && loadedGltf.scene) break;
    } catch (e) {
      // try next url
    }
  }

  if (!loadedGltf || !loadedGltf.scene) {
    console.warn("[NIBBLO] Could not load product.glb from URLs:", urlsToTry);
    return null;
  }

  const scene = loadedGltf.scene;

  // Compute bounding box and normalize
  const box = new THREE.Box3().setFromObject(scene);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);

  // Group to center the pivot
  const wrapper = new THREE.Group();
  scene.position.set(-center.x, -center.y, -center.z);
  wrapper.add(scene);

  // Configure materials and shadows
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) {
        child.material.roughness = Math.max(
          0.3,
          child.material.roughness !== undefined
            ? child.material.roughness
            : 0.45,
        );
        child.material.metalness = Math.min(
          0.2,
          child.material.metalness !== undefined
            ? child.material.metalness
            : 0.05,
        );
        child.material.envMapIntensity = 1.2;
        child.material.needsUpdate = true;
      }
    }
  });

  // Scale to fit hero centerpiece (~1.9 units across)
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const targetScale = 2.05 / maxDim;
  wrapper.scale.setScalar(targetScale);

  cachedModel = wrapper;
  return wrapper.clone();
}

export async function loadPackagingModel() {
  if (cachedPackagingModel) {
    return cachedPackagingModel.clone();
  }

  if (MeshoptDecoder.ready) {
    await MeshoptDecoder.ready;
  }
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);

  const urlsToTry = [
    "/models/packaging.glb",
    "/assets/models/packaging.glb",
    "/wp-content/themes/emg-nibblo/assets/models/packaging.glb",
  ].filter(Boolean);

  let loadedGltf = null;
  for (const url of urlsToTry) {
    try {
      loadedGltf = await loader.loadAsync(url);
      if (loadedGltf && loadedGltf.scene) break;
    } catch (e) {
      // try next url
    }
  }

  if (!loadedGltf || !loadedGltf.scene) {
    console.warn("[NIBBLO] Could not load packaging.glb from URLs:", urlsToTry);
    return null;
  }

  const scene = loadedGltf.scene;

  // Compute bounding box and normalize
  const box = new THREE.Box3().setFromObject(scene);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);

  // Group to center the pivot
  const wrapper = new THREE.Group();
  scene.position.set(-center.x, -center.y, -center.z);
  wrapper.add(scene);

  // Configure materials and shadows
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) {
        child.material.roughness = Math.max(
          0.35,
          child.material.roughness !== undefined
            ? child.material.roughness
            : 0.65,
        );
        child.material.metalness = Math.min(
          0.15,
          child.material.metalness !== undefined
            ? child.material.metalness
            : 0.05,
        );
        child.material.envMapIntensity = 1.1;
        child.material.needsUpdate = true;
      }
    }
  });

  // Scale packaging pouch to standing pouch height (~2.8 units tall)
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const targetScale = 2.8 / maxDim;
  wrapper.scale.setScalar(targetScale);

  cachedPackagingModel = wrapper;
  return wrapper.clone();
}
