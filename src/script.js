import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/*
 * Textures
 */
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const grassTexture = textureLoader.load("/textures/grass.jpg");
const neptuneTexture = textureLoader.load("/textures/neptune.jpg");
const marsTexture = textureLoader.load("/textures/mars.jpg");
const saturnTexture = textureLoader.load("/textures/saturn.jpg");
const saturnRingAlphaTexture = textureLoader.load(
  "/textures/saturnRingAlphaTexture.png"
);
const neptuneRingAlphaTexture = textureLoader.load(
  "/textures/neptuneRingAlphaTexture.png"
);

/*
 * Debug
 */
const gui = new dat.GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const boardTileGroup = new THREE.Group();
scene.add(boardTileGroup);

//outer ring
//radius: 18
//xz plane; z is reversed
//right: x: cos(Math.PI * 0/20) * r, z: sin(Math.PI * 0/20) * r
const radius = 18;
for (let i = 25; i > 5; i--) {
  let tile;
  if (i == 25) {
    const material = new THREE.MeshBasicMaterial({ map: grassTexture });
    tile = new THREE.Mesh(new THREE.SphereGeometry(1), material);
    tile.name = "earth";
  } else if (i == 20) {
    const neptuneGroup = new THREE.Group();
    const material = new THREE.MeshBasicMaterial({ map: neptuneTexture });
    const neptunePlanet = new THREE.Mesh(new THREE.SphereGeometry(1), material);
    neptunePlanet.name = "neptune";
    neptuneGroup.add(neptunePlanet);

    const ringMaterial = new THREE.MeshBasicMaterial({
      map: neptuneRingAlphaTexture,
    });
    ringMaterial.transparent = true;
    ringMaterial.side = THREE.DoubleSide;
    const ring = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.name = "neptuneRing";
    neptuneGroup.add(ring);

    tile = neptuneGroup;
    tile.name = "neptune";
  } else if (i == 15) {
    const material = new THREE.MeshBasicMaterial({ map: marsTexture });
    tile = new THREE.Mesh(new THREE.SphereGeometry(1), material);
    tile.name = "mars";
  } else if (i == 10) {
    const saturnGroup = new THREE.Group();
    const material = new THREE.MeshBasicMaterial({ map: saturnTexture });
    const saturnPlanet = new THREE.Mesh(new THREE.SphereGeometry(1), material);
    saturnPlanet.name = "saturnPlanet";
    saturnGroup.add(saturnPlanet);

    const ringMaterial = new THREE.MeshBasicMaterial({
      map: saturnRingAlphaTexture,
    });
    ringMaterial.transparent = true;
    ringMaterial.side = THREE.DoubleSide;
    const ring = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.name = "saturnRing";
    saturnGroup.add(ring);

    tile = saturnGroup;
    tile.name = "saturn";
  } else {
    tile = new THREE.Mesh(
      new THREE.SphereGeometry(0.3),
      new THREE.MeshBasicMaterial({ color: 0xfcff72 })
    );
    tile.name = "star";
  }

  tile.position.set(
    Math.cos((2 * Math.PI * i) / 20) * radius,
    0,
    Math.sin((2 * Math.PI * i) / 20) * radius
  );
  boardTileGroup.add(tile);
}

//shortcuts
//outside of loop so the tile indexes can be in order in the group
const radius_shortcut_1 = 12.5;
const radius_shortcut_2 = 6;
let i = 0;
const tile_outer_ring_20 = new THREE.Mesh(
  new THREE.SphereGeometry(0.3),
  new THREE.MeshBasicMaterial({ color: 0xfcff72 })
);
tile_outer_ring_20.position.set(
  Math.cos((2 * Math.PI * 5 * i) / 20) * radius_shortcut_1,
  0,
  Math.sin((2 * Math.PI * 5 * i) / 20) * radius_shortcut_1
);
tile_outer_ring_20.name = "star";
boardTileGroup.add(tile_outer_ring_20);

const tile_inner_ring_21 = new THREE.Mesh(
  new THREE.SphereGeometry(0.3),
  new THREE.MeshBasicMaterial({ color: 0xfcff72 })
);
tile_inner_ring_21.position.set(
  Math.cos((2 * Math.PI * 5 * i) / 20) * radius_shortcut_2,
  0,
  Math.sin((2 * Math.PI * 5 * i) / 20) * radius_shortcut_2
);
tile_inner_ring_21.name = "star";
boardTileGroup.add(tile_inner_ring_21);

//center
const polaris = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshBasicMaterial({ color: 0x5190cd })
);

polaris.name = "polaris";
boardTileGroup.add(polaris);

i = 2;

const tile_inner_ring_23 = new THREE.Mesh(
  new THREE.SphereGeometry(0.3),
  new THREE.MeshBasicMaterial({ color: 0xfcff72 })
);
tile_inner_ring_23.position.set(
  Math.cos((2 * Math.PI * 5 * i) / 20) * radius_shortcut_2,
  0,
  Math.sin((2 * Math.PI * 5 * i) / 20) * radius_shortcut_2
);
tile_inner_ring_23.name = "star";
boardTileGroup.add(tile_inner_ring_23);

const tile_outer_ring_24 = new THREE.Mesh(
  new THREE.SphereGeometry(0.3),
  new THREE.MeshBasicMaterial({ color: 0xfcff72 })
);
tile_outer_ring_24.position.set(
  Math.cos((2 * Math.PI * 5 * i) / 20) * radius_shortcut_1,
  0,
  Math.sin((2 * Math.PI * 5 * i) / 20) * radius_shortcut_1
);
tile_outer_ring_24.name = "star";
boardTileGroup.add(tile_outer_ring_24);

i = 3;

const tile_outer_ring_25 = new THREE.Mesh(
  new THREE.SphereGeometry(0.3),
  new THREE.MeshBasicMaterial({ color: 0xfcff72 })
);
tile_outer_ring_25.position.set(
  Math.cos((2 * Math.PI * 5 * i) / 20) * radius_shortcut_1,
  0,
  Math.sin((2 * Math.PI * 5 * i) / 20) * radius_shortcut_1
);
tile_outer_ring_25.name = "star";
boardTileGroup.add(tile_outer_ring_25);

const tile_inner_ring_26 = new THREE.Mesh(
  new THREE.SphereGeometry(0.3),
  new THREE.MeshBasicMaterial({ color: 0xfcff72 })
);
tile_inner_ring_26.position.set(
  Math.cos((2 * Math.PI * 5 * i) / 20) * radius_shortcut_2,
  0,
  Math.sin((2 * Math.PI * 5 * i) / 20) * radius_shortcut_2
);
tile_inner_ring_26.name = "star";
boardTileGroup.add(tile_inner_ring_26);

i = 5;

const tile_inner_ring_27 = new THREE.Mesh(
  new THREE.SphereGeometry(0.3),
  new THREE.MeshBasicMaterial({ color: 0xfcff72 })
);
tile_inner_ring_27.position.set(
  Math.cos((2 * Math.PI * 5 * i) / 20) * radius_shortcut_2,
  0,
  Math.sin((2 * Math.PI * 5 * i) / 20) * radius_shortcut_2
);
tile_inner_ring_27.name = "star";
boardTileGroup.add(tile_inner_ring_27);

const tile_outer_ring_28 = new THREE.Mesh(
  new THREE.SphereGeometry(0.3),
  new THREE.MeshBasicMaterial({ color: 0xfcff72 })
);
tile_outer_ring_28.position.set(
  Math.cos((2 * Math.PI * 5 * i) / 20) * radius_shortcut_1,
  0,
  Math.sin((2 * Math.PI * 5 * i) / 20) * radius_shortcut_1
);
tile_outer_ring_28.name = "star";
boardTileGroup.add(tile_outer_ring_28);

/*for (let i = -1; i < 3; i++) {
  //ring 1
  const tile_outer_ring = new THREE.Mesh(
    new THREE.SphereGeometry(0.3),
    new THREE.MeshBasicMaterial({ color: 0xfcff72 })
  );
  tile_outer_ring.position.set(
    Math.cos((2 * Math.PI * 5 * i) / 20) * radius_shortcut_1,
    0,
    Math.sin((2 * Math.PI * 5 * i) / 20) * radius_shortcut_1
  );
  group.add(tile_outer_ring);
  //ring 2
  const tile_inner_ring = new THREE.Mesh(
    new THREE.SphereGeometry(0.3),
    new THREE.MeshBasicMaterial({ color: 0xfcff72 })
  );
  tile_inner_ring.position.set(
    Math.cos((2 * Math.PI * 5 * i) / 20) * radius_shortcut_2,
    0,
    Math.sin((2 * Math.PI * 5 * i) / 20) * radius_shortcut_2
  );
  group.add(tile_inner_ring);
}*/

const parameters = {
  outerRingRadiusWiden: () => {
    boardTileGroup.children[21].position.z -= 0.5;
    boardTileGroup.children[23].position.x += 0.5;
    boardTileGroup.children[25].position.z += 0.5;
    boardTileGroup.children[27].position.x -= 0.5;
    console.log(
      "outer ring radius",
      Math.abs(boardTileGroup.children[27].position.x)
    );
  },
  outerRingRadiusShrinken: () => {
    boardTileGroup.children[21].position.z += 0.5;
    boardTileGroup.children[23].position.x -= 0.5;
    boardTileGroup.children[25].position.z -= 0.5;
    boardTileGroup.children[27].position.x += 0.5;
    console.log(
      "outer ring radius",
      Math.abs(boardTileGroup.children[27].position.x)
    );
  },
  innerRingRadiusWiden: () => {
    boardTileGroup.children[22].position.z -= 0.5;
    boardTileGroup.children[24].position.x += 0.5;
    boardTileGroup.children[26].position.z += 0.5;
    boardTileGroup.children[28].position.x -= 0.5;
    console.log(
      "inner ring radius",
      Math.abs(boardTileGroup.children[28].position.x)
    );
  },
  innerRingRadiusShrinken: () => {
    boardTileGroup.children[22].position.z += 0.5;
    boardTileGroup.children[24].position.x -= 0.5;
    boardTileGroup.children[26].position.z -= 0.5;
    boardTileGroup.children[28].position.x += 0.5;
    console.log(
      "inner ring radius",
      Math.abs(boardTileGroup.children[28].position.x)
    );
  },
};

gui.add(parameters, "outerRingRadiusWiden").name("outer ring radius widen");
gui
  .add(parameters, "outerRingRadiusShrinken")
  .name("outer ring radius shrinken");
gui.add(parameters, "innerRingRadiusWiden").name("inner ring radius widen");
gui
  .add(parameters, "innerRingRadiusShrinken")
  .name("inner ring radius shrinken");
gui
  .add(boardTileGroup.children[20].scale, "x")
  .min(1)
  .max(5)
  .step(0.01)
  .name("polaris x scale");
gui
  .add(boardTileGroup.children[20].scale, "y")
  .min(1)
  .max(5)
  .step(0.01)
  .name("polaris y scale");
gui
  .add(boardTileGroup.children[20].scale, "z")
  .min(1)
  .max(5)
  .step(0.01)
  .name("polaris z scale");

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  //for moving between screens with different pixel ratios
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement; // for safari
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  }
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 30;
camera.position.y = 10;
camera.lookAt(polaris.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
//controls.enabled = false;
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
//you must do this here on top of within the 'resize' event
//or it will not fill the viewport on start
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

console.log(boardTileGroup);

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //stars should move up and down about their locations
  //planets should rotate about their centers
  for (let tileMesh of boardTileGroup.children) {
    if (tileMesh.name === "star") {
      tileMesh.position.y = Math.sin(elapsedTime) * 0.2;
    } else if (tileMesh.name === "saturn") {
      tileMesh.rotation.y = elapsedTime * 0.5;
    } else if (
      tileMesh.name === "earth" ||
      tileMesh.name === "neptune" ||
      tileMesh.name === "mars"
    ) {
      tileMesh.rotation.y = elapsedTime * 0.5;
    }
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
