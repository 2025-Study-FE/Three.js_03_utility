import * as THREE from "three";
import dat from "dat.gui";

// ----- GUI 컨트롤

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
  camera.position.y = 1;
  camera.position.z = 5;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 1); // 전체적으로 은은하게 밝혀준다.
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 2);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "seagreen",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Dat GUI
  const gui = new dat.GUI();
  // 조정할 오브젝트 요소, 조정할 요소의 속성, 조정할 범위의 최솟값과 최대값, 조정 단위(스텝)
  // name을 작성하지 않으면 속성값으로 설정된다.
  gui.add(mesh.position, "y", -5, 5, 0.01).name("y의 위치");
  gui.add(mesh.position, "z").min(-10).max(3).step(0.01).name("메쉬의 z 위치");
  gui.add(camera.position, "x", -10, 10, 0.01).name("카메라 x값");

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime();

    mesh.rotation.y = time;

    camera.lookAt(mesh.position);

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
