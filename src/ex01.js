import * as THREE from "three";

// ----- 주제: AxesHelper, GridHelper

export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = 1;
  camera.position.y = 3;
  camera.position.z = 0;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 1); // 전체적으로 은은하게 밝혀준다.
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 2);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // AxesHelper
  const axesHelper = new THREE.AxesHelper(3); // 축의 기본 사이즈는 1이다.
  scene.add(axesHelper);

  // GridHelper
  const gridHelper = new THREE.GridHelper(5); // 그리드의 기본 사이즈는 10이다.
  scene.add(gridHelper);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "seagreen",
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = 2;
  mesh.position.y = 1;
  scene.add(mesh);

  camera.lookAt(mesh.position);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime();

    mesh.rotation.y = time;

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
