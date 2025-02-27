// Configuração básica da cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luzes
const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(luzAmbiente);

const luzDirecional = new THREE.DirectionalLight(0xffffff, 1);
luzDirecional.position.set(10, 10, 10);
scene.add(luzDirecional);

// Carregar o displacement map
const loader = new THREE.TextureLoader();
const displacementMap = loader.load('displacement-map.png'); // Coloca o displacement map na raiz do projeto

// Material e geometria do planeta
const geometria = new THREE.SphereGeometry(5, 128, 128);
const material = new THREE.MeshStandardMaterial({
    color: 0x5566ff,
    displacementMap: displacementMap,
    displacementScale: 1.5, // Ajusta a altura das elevações
    wireframe: false
});

const planeta = new THREE.Mesh(geometria, material);
scene.add(planeta);

// Controles de navegação
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(10, 10, 10);
controls.update();

// Animação
function animate() {
    requestAnimationFrame(animate);
    planeta.rotation.y += 0.002;
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Ajuste do tamanho da tela
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
