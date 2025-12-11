import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';
import { Terrain } from './terrain.js';

const gui = new GUI();

const stats = new Stats();
document.body.appendChild(stats.dom);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);

const terrain = new Terrain(10, 10);
scene.add(terrain);

const MainLight = new THREE.DirectionalLight();
MainLight.intensity = 3;
MainLight.position.set(1, 2, 3);
scene.add(MainLight);

const AmbientLight = new THREE.AmbientLight();
AmbientLight.intensity = 0.5;
scene.add(AmbientLight);

camera.position.set(15, 3, 10);


camera.position.z = 15;
controls.update();

function animate() {

    controls.update();
    stats.update();
    renderer.render(scene, camera);

}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const TerrainFolder = gui.addFolder('Terrain');
TerrainFolder.add(terrain, 'width', 1, 20, 1).name('Width');
TerrainFolder.add(terrain, 'height', 1, 20, 1).name('Height');
TerrainFolder.addColor(terrain.material, 'color');
TerrainFolder.onChange(() => {
    terrain.createTerrain();
});