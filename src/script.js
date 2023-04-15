import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

/**
 * Parameters
 */

/**
 * Fonts
 */
const fontLoader = new FontLoader();

/*
 * Textures
 */
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const moonTexture = textureLoader.load("/textures/moon-darker.png");
// const moonColorTexture = textureLoader.load("/textures/moonColor.png");
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
const matcapTexture = textureLoader.load("/textures/matcaps/shiny.png");

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Yut Game", {
    font: font,
    size: 2,
    height: 0.2,
    curveSegments: 3,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
  });
  textGeometry.center();

  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  const text = new THREE.Mesh(textGeometry, material);
  text.position.set(0, 10, -10);
  // scene.add(text);
  console.log("text");
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d0d0d);

function getRandomCoordinatesInRange(min, scale) {
  let x = (Math.random() - 0.5) * scale;
  let y = (Math.random() - 0.5) * scale;
  let z = (Math.random() - 0.5) * scale;
  let distance = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  while (distance < min) {
    x = (Math.random() - 0.5) * scale;
    y = (Math.random() - 0.5) * scale;
    z = (Math.random() - 0.5) * scale;
    distance = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  }
  return [x, y, z];
}

/**
 * Decoration with stars and planets
 */
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
const sphereGeometry = new THREE.SphereGeometry(0.3);
for (let i = 0; i < 1000; i++) {
  const star = new THREE.Mesh(sphereGeometry, material);
  let randomCoordinates = getRandomCoordinatesInRange(40, 200);
  star.position.x = randomCoordinates[0];
  star.position.y = randomCoordinates[1];
  star.position.z = randomCoordinates[2];
  star.rotation.x = Math.random() * 2 * Math.PI;
  star.rotation.y = Math.random() * 2 * Math.PI;
  star.rotation.z = Math.random() * 2 * Math.PI;
  const scale = Math.random();
  star.scale.x = scale;
  star.scale.y = scale;
  star.scale.z = scale;
  scene.add(star);
}

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
  ambientLightColor: 0x2a2222,
  pointLightColor: 0x4d4d75,
};

/*
 * Debug
 */
//const gui = new dat.GUI();

// gui.add(parameters, "outerRingRadiusWiden").name("outer ring radius widen");
// gui
//   .add(parameters, "outerRingRadiusShrinken")
//   .name("outer ring radius shrinken");
// gui.add(parameters, "innerRingRadiusWiden").name("inner ring radius widen");
// gui
//   .add(parameters, "innerRingRadiusShrinken")
//   .name("inner ring radius shrinken");
// gui
//   .add(boardTileGroup.children[20].scale, "x")
//   .min(1)
//   .max(5)
//   .step(0.01)
//   .name("polaris x scale");
// gui
//   .add(boardTileGroup.children[20].scale, "y")
//   .min(1)
//   .max(5)
//   .step(0.01)
//   .name("polaris y scale");
// gui
//   .add(boardTileGroup.children[20].scale, "z")
//   .min(1)
//   .max(5)
//   .step(0.01)
//   .name("polaris z scale");
// gui.addColor(parameters, "ambientLightColor").onChange(() => {
//   ambientLight.color = new THREE.Color(parameters.ambientLightColor);
// });
// gui.addColor(parameters, "pointLightColor").onChange(() => {
//   pointLightBottomLeft.color = new THREE.Color(parameters.pointLightColor);
//   pointLightBottomRight.color = new THREE.Color(parameters.pointLightColor);
//   pointLightTopLeft.color = new THREE.Color(parameters.pointLightColor);
//   pointLightTopRight.color = new THREE.Color(parameters.pointLightColor);
// });

/**
 * Board Floor
 */
const boardMaterial = new THREE.MeshBasicMaterial({
  map: moonTexture,
  transparent: true,
});
const galaxy_floor = new THREE.Mesh(
  new THREE.PlaneGeometry(32, 32),
  boardMaterial
);
galaxy_floor.position.set(0, -2, 0);
galaxy_floor.rotation.x = -Math.PI / 2;
galaxy_floor.name = "galaxy_floor";
scene.add(galaxy_floor);

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0x2a2222, 0.5);
// // ambientLight.color = new THREE.Color(0xffff00);
// ambientLight.intensity = 1;
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(
//   parameters.directionalLightcolor,
//   0.3
// );
// directionalLight.position.set(0, 3, 0);
// scene.add(directionalLight);

// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight,
//   5
// );
// scene.add(directionalLightHelper);

const pointLightBottomLeft = new THREE.PointLight(0x4d4d75, 0.5, 10, 1);
pointLightBottomLeft.position.set(-7, 1, 7);
scene.add(pointLightBottomLeft);

const pointLightBottomRight = new THREE.PointLight(0x4d4d75, 0.5, 10, 1);
pointLightBottomRight.position.set(7, 1, 7);
scene.add(pointLightBottomRight);

const pointLightTopLeft = new THREE.PointLight(0x4d4d75, 0.5, 10, 1);
pointLightTopLeft.position.set(7, 1, -7);
scene.add(pointLightTopLeft);

const pointLightTopRight = new THREE.PointLight(0x4d4d75, 0.5, 10, 1);
pointLightTopRight.position.set(-7, 1, -7);
scene.add(pointLightTopRight);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
// scene.add(hemisphereLight);

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
camera.position.z = 0;
camera.position.y = 30;
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
