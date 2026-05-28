// https://www.youtube.com/watch?v=_OwJV2xL8M8

import * as THREE from 'three'; 

const scene = new THREE.Scene();

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});
const torusKnot = new THREE.Mesh( geometry, material ); 
scene.add( torusKnot );

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

const camera = new THREE.PerspectiveCamera(45, 800 / 600);
camera.position.z = 20;
scene.add(camera);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(800, 600);
renderer.render(scene, camera);
