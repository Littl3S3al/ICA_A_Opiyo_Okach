let camera, controls, scene, renderer, light, raycaster;

// sound variables
var material1, material2, material3;
let analyser1, analyser2, analyser3;

// buffer geometry variables
let group;
let particlesData = [];
let positions, colors;
let particles;
let pointCloud;
let particlePositions;
let linesMesh;

const maxParticleCount = 100;
const particleCount = 50;
const r = 200;
const rHalf = r / 2;

let effectController = {
    showDots: true,
    showLines: true,
    minDistance: 150,
    limitConnections: false,
    maxConnections: 20,
    particleCount: 500
};

var particleXYZ = [];
let cubes = [];

let time;