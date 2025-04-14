import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Button geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const materialStart = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const materialStop = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const materialDownload = new THREE.MeshBasicMaterial({ color: 0x0000ff });

const startButton = new THREE.Mesh(geometry, materialStart);
startButton.position.x = -3;
scene.add(startButton);

const stopButton = new THREE.Mesh(geometry, materialStop);
stopButton.position.x = 0;
scene.add(stopButton);

const downloadButton = new THREE.Mesh(geometry, materialDownload);
downloadButton.position.x = 3;
scene.add(downloadButton);

// Button position
camera.position.z = 5;

// Animation
function animate() {
  requestAnimationFrame(animate);
  startButton.rotation.x += 0.01;
  startButton.rotation.y += 0.01;

  stopButton.rotation.x += 0.01;
  stopButton.rotation.y += 0.01;

  downloadButton.rotation.x += 0.01;
  downloadButton.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();

// Click event for Start Recording
startButton.addEventListener('click', () => {
  fetch('http://localhost:5000/start-recording', { method: 'POST', credentials: 'include' })
    .then(response => response.json())
    .then(data => alert(data.message));
});

// Click event for Stop Recording
stopButton.addEventListener('click', () => {
  fetch('http://localhost:5000/stop-recording', { method: 'POST', credentials: 'include' })
    .then(response => response.json())
    .then(data => alert(data.message));
});

// Click event for Download Bot
downloadButton.addEventListener('click', () => {
  window.location.href = 'http://localhost:5000/download-bot';
});
