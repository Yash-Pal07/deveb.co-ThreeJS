import * as THREE from "three";
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 8;

// Create geometry and material
const geometry = new THREE.IcosahedronGeometry(1.5, 60);
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColorChange: {
      value: 0,
    },
  },
  side: THREE.DoubleSide,
  // wireframe:true,
  vertexShader: vertex,
  fragmentShader: fragment,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.position.y = -1.5;
// Renderer setup
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//gsap
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".landing-page",
    start: "top top",
    end: "65% center",
    scrub: 4,
    // markers: true,
  },
});

tl.to(
  mesh.position,
  {
    y: 0,
    z: -4,
    duration: 4,
    ease: "power1.inOut",
  },
  "same"
);
tl.to(
  material.uniforms.uColorChange,
  {
    value: 1,
    duration: 2.2,
    ease: "linear",
  },
  "same"
);
tl.to(
  ".landing-page h1",
  {
    opacity: 0,
    y: -90,
    delay: 0.5,
    duration: 2,
    ease: "linear",
    scrub: 3,
  },
  "same"
);
tl.to(
  ".landing-page p",
  {
    opacity: 1,
    duration: 2,
    y: -100,
  },
  "-=2"
);

// Handle window resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Animation loop
let clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  material.uniforms.uTime.value = clock.getElapsedTime();
}

animate();
