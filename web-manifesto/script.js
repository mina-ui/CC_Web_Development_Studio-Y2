import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
// https://www.youtube.com/watch?v=hNsn0CA94xg
let scene, camera, renderer, light, earth, controls;

window.onload = () => {
    init();
    animate();
    window.addEventListener("resize", onWindowResize, false);
};

function init() {
    scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(85, aspect, 0.1, 1000);

    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 1).normalize();
    scene.add(light);

    earth = initEarth();
    scene.add(earth);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    renderer.setClearColor(0x000000, 0);

    document.querySelector(".earth-container").appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 5;
    controls.maxDistance = 50;

    camera.position.set(0, 0, 20);
    camera.lookAt(earth.position);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
}

function initEarth() {
    const geometry = new THREE.SphereGeometry(8, 32, 32);
    const loader = new THREE.TextureLoader();
    const earthTexture = loader.load("earth.jpeg");
    const material = new THREE.MeshPhongMaterial({
        map: earthTexture,
    });

    return new THREE.Mesh(geometry, material);
}

gsap.from(".manifesto h2", {
    opacity: 0,
    y: -50,
    duration: 1,
    delay: 0.5,
    ease: "power3.out"
});

gsap.from(".manifesto p", {
    opacity: 0,
    y: 50,
    duration: 1.5,
    stagger: 0.3,
    delay: 1,
    ease: "power3.out"
});




