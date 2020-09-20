import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/build/three.module.js';
import { GUI } from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/controls/OrbitControls.js';
        


// timer
let clock = new THREE.Clock();

// DOM start button
let startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', () => {
	init(); bufferGeo();
} );
		 

// add cubes
// add a box
const boxWidth = 5;
const boxHeight = 5;
const boxDepth = 5;
const geometryBox = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
// const material = new THREE.MeshBasicMaterial({color: 0x44aa88});

const makeInstance = (geometry, x, y, z) => {
	const material = new THREE.MeshPhongMaterial({color: 0x00ff00});

	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	cube.position.set(  x, y, z );
	cube.material.transparent = true ;
	cube.material.opacity = 0 ;

	return cube;
}


// make text

	
	


            // function to add all sound elements
			function init() {

                // remove start button
                console.log('init');
				var overlay = document.getElementById( 'overlay' );
				overlay.remove();

        		// bring in camera
				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.set( 0, 25, 200 );

                // bring in audio listener
				var listener = new THREE.AudioListener();
				camera.add( listener );

        		// scene
				scene = new THREE.Scene();
				scene.fog = new THREE.FogExp2( 0x000000, 0.0025 );

        		// light
				light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 0, 0.5, 1 ).normalize();
				scene.add( light );

				cubes = [
					makeInstance(geometryBox, 0, 0, 0), 
					makeInstance(geometryBox, 0, 0, 0), 
					makeInstance(geometryBox, 0, 0, 0), 
					makeInstance(geometryBox, 0, 0, 0), 
					makeInstance(geometryBox, 0, 0, 0), 
					makeInstance(geometryBox, 0, 0, 0)
				]
				

				// sound spheres
				var sphere = new THREE.SphereBufferGeometry( 20, 32, 16 );

				material1 = new THREE.MeshPhongMaterial( { color: 0xffaa00, flatShading: true, shininess: 0 } );
				material2 = new THREE.MeshPhongMaterial( { color: 0xff2200, flatShading: true, shininess: 0 } );
				material3 = new THREE.MeshPhongMaterial( { color: 0x6622aa, flatShading: true, shininess: 0 } );

				// sound spheres

				var audioLoader = new THREE.AudioLoader();

				var mesh1 = new THREE.Mesh( sphere, material1 );
				mesh1.position.set( - 250, 30, 0 );
				scene.add( mesh1 );

				var sound1 = new THREE.PositionalAudio( listener );
				audioLoader.load( 'assets/bensound-anewbeginning.ogg', function ( buffer ) {

                    sound1.setLoop()
					sound1.setBuffer( buffer );
					sound1.setRefDistance( 20 );
					sound1.play();

				} );
				mesh1.add( sound1 );

				//

				var mesh2 = new THREE.Mesh( sphere, material2 );
				mesh2.position.set( 250, 30, 0 );
				scene.add( mesh2 );

				var sound2 = new THREE.PositionalAudio( listener );
				audioLoader.load( 'assets/bensound-creativeminds.ogg', function ( buffer ) {

                    sound2.setLoop()
					sound2.setBuffer( buffer );
					sound2.setRefDistance( 20 );
					sound2.play();

				} );
				mesh2.add( sound2 );

				//

				var mesh3 = new THREE.Mesh( sphere, material3 );
                mesh3.position.set(  0, 30, - 250 );
                scene.add( mesh3 );

				var sound3 = new THREE.PositionalAudio( listener );
				audioLoader.load( 'assets/bensound-ukulele.ogg', function ( buffer ) {

                    sound3.setLoop();
					sound3.setBuffer( buffer );
					sound3.setRefDistance( 20 );
					sound3.play();

				} );
				mesh3.add( sound3 );

				// analysers

				analyser1 = new THREE.AudioAnalyser( sound1, 32 );
				analyser2 = new THREE.AudioAnalyser( sound2, 32 );
				analyser3 = new THREE.AudioAnalyser( sound3, 32 );


				var SoundControls = function () {

					this.master = listener.getMasterVolume();
					this.firstSphere = sound1.getVolume();
					this.secondSphere = sound2.getVolume();
					this.thirdSphere = sound3.getVolume();

				};

				var gui = new GUI();
				var soundControls = new SoundControls();
				var volumeFolder = gui.addFolder( 'sound volume' );

				volumeFolder.add( soundControls, 'master' ).min( 0.0 ).max( 1.0 ).step( 0.01 ).onChange( function () {

					listener.setMasterVolume( soundControls.master );

				} );
				volumeFolder.add( soundControls, 'firstSphere' ).min( 0.0 ).max( 1.0 ).step( 0.01 ).onChange( function () {

					sound1.setVolume( soundControls.firstSphere );

				} );
				volumeFolder.add( soundControls, 'secondSphere' ).min( 0.0 ).max( 1.0 ).step( 0.01 ).onChange( function () {

					sound2.setVolume( soundControls.secondSphere );

				} );

				volumeFolder.add( soundControls, 'thirdSphere' ).min( 0.0 ).max( 1.0 ).step( 0.01 ).onChange( function () {

					sound3.setVolume( soundControls.thirdSphere );

				} );
				volumeFolder.open();

				//

        // create canvas
                const container = document.querySelector('.container');
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				//

            // add controls
				controls = new OrbitControls( camera, renderer.domElement );
                controls.target.set(0, 5, 0);

				//

				window.addEventListener( 'resize', onWindowResize, false );

				// add text
				const objects = [];
				const spread = 15;

				function addObject(x, y, obj) {
					obj.position.x = x * spread;
					obj.position.y = y * spread;

					scene.add(obj);
					objects.push(obj);
				}

	{
		const loader = new THREE.FontLoader();
		// promisify font loading
		function loadFont(url) {
		return new Promise((resolve, reject) => {
			loader.load(url, resolve, undefined, reject);
		});
		}

    async function doit(text, parent) {
      const font = await loadFont('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json');   
      const geometry = new THREE.TextBufferGeometry(text, {
        font: font,
        size: 5.0,
        height: .2,
        curveSegments: 12,
        bevelEnabled: false
      });

	  const material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
      const mesh = new THREE.Mesh(geometry, material);
      geometry.computeBoundingBox();
      geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1);

      parent.add(mesh);

      addObject(.5, 0, parent);
	}
	const words = ['space', 'image', 'sound', 'text', 'data', 'body'];
	cubes.forEach((cube, i) => {
		doit(words[i], cube);
	})
}


			}

            function bufferGeo() {

				group = new THREE.Group();
				scene.add( group );

				var segments = maxParticleCount * maxParticleCount;

				positions = new Float32Array( segments * 3 );
				colors = new Float32Array( segments * 3 );

				var pMaterial = new THREE.PointsMaterial( {
					color: 0xFFFFFF,
					size: 5,
					blending: THREE.AdditiveBlending,
					transparent: true,
					sizeAttenuation: false
				} );

				particles = new THREE.BufferGeometry();
				particlePositions = new Float32Array( maxParticleCount * 3 );

				for ( var i = 0; i < maxParticleCount; i ++ ) {

					var x = Math.random() * r - r / 2;
					var y = Math.random() * r - r / 2;
					var z = Math.random() * r - r / 2;

					particlePositions[ i * 3 ] = x;
					particlePositions[ i * 3 + 1 ] = y;
					particlePositions[ i * 3 + 2 ] = z;

					

					// add it to the geometry
					particlesData.push( {
						velocity: new THREE.Vector3( - 1 + Math.random() * 2, - 1 + Math.random() * 2, - 1 + Math.random() * 2 ),
						numConnections: 0
					} );
				}


				particles.setDrawRange( 0, particleCount );
				particles.setAttribute( 'position', new THREE.BufferAttribute( particlePositions, 3 ).setUsage( THREE.DynamicDrawUsage ) );
				

				// create the particle system
				pointCloud = new THREE.Points( particles, pMaterial );
				group.add( pointCloud );

				var geometry = new THREE.BufferGeometry();

				geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ).setUsage( THREE.DynamicDrawUsage ) );
				geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ).setUsage( THREE.DynamicDrawUsage ) );

				geometry.computeBoundingSphere();

				geometry.setDrawRange( 0, 0 );


				var material = new THREE.LineBasicMaterial( {
					vertexColors: true,
					blending: THREE.AdditiveBlending,
					transparent: true
				} );

				linesMesh = new THREE.LineSegments( geometry, material );
				group.add( linesMesh );

				//

				// stats = new Stats();
                // container.appendChild( stats.dom );
                
				animate();
				
            }

            function animateBuffer() {
				let k = 0;
				var vertexpos = 0;
				var colorpos = 0;
				var numConnected = 0;
				
				for ( var i = 0; i < particleCount; i ++ )
					particlesData[ i ].numConnections = 0;

				for ( var i = 0; i < particleCount; i ++ ) {

					// get the particle
					var particleData = particlesData[ i ];

					particlePositions[ i * 3 ] += particleData.velocity.x;
					particlePositions[ i * 3 + 1 ] += particleData.velocity.y;
					particlePositions[ i * 3 + 2 ] += particleData.velocity.z;

					let remainder = Math.floor(particleCount / 6);
					if(i % remainder === 0 && k < 6){
						particleXYZ[k] = {
							x: particlePositions[ i * 3 ], 
							y: particlePositions[ i * 3 + 1 ], 
							z: particlePositions[ i * 3 + 2 ]
						};
						k++
					}

					

					if ( particlePositions[ i * 3 + 1 ] < - rHalf || particlePositions[ i * 3 + 1 ] > rHalf )
						particleData.velocity.y = - particleData.velocity.y;

					if ( particlePositions[ i * 3 ] < - rHalf || particlePositions[ i * 3 ] > rHalf )
						particleData.velocity.x = - particleData.velocity.x;

					if ( particlePositions[ i * 3 + 2 ] < - rHalf || particlePositions[ i * 3 + 2 ] > rHalf )
						particleData.velocity.z = - particleData.velocity.z;

					if ( effectController.limitConnections && particleData.numConnections >= effectController.maxConnections )
						continue;

					
					// Check collision
					for ( var j = i + 1; j < particleCount; j ++ ) {

						var particleDataB = particlesData[ j ];
						if ( effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections )
							continue;

						var dx = particlePositions[ i * 3 ] - particlePositions[ j * 3 ];
						var dy = particlePositions[ i * 3 + 1 ] - particlePositions[ j * 3 + 1 ];
						var dz = particlePositions[ i * 3 + 2 ] - particlePositions[ j * 3 + 2 ];
						var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

						
						if ( dist < effectController.minDistance ) {

							particleData.numConnections ++;
							particleDataB.numConnections ++;

							var alpha = 1.0 - dist / effectController.minDistance;

							positions[ vertexpos ++ ] = particlePositions[ i * 3 ];
							positions[ vertexpos ++ ] = particlePositions[ i * 3 + 1 ];
							positions[ vertexpos ++ ] = particlePositions[ i * 3 + 2 ];

							positions[ vertexpos ++ ] = particlePositions[ j * 3 ];
							positions[ vertexpos ++ ] = particlePositions[ j * 3 + 1 ];
							positions[ vertexpos ++ ] = particlePositions[ j * 3 + 2 ];

							colors[ colorpos ++ ] = alpha;
							colors[ colorpos ++ ] = alpha;
							colors[ colorpos ++ ] = alpha;

							colors[ colorpos ++ ] = alpha;
							colors[ colorpos ++ ] = alpha;
							colors[ colorpos ++ ] = alpha;

							numConnected ++;

						}

					}

				}


				linesMesh.geometry.setDrawRange( 0, numConnected * 2 );
				linesMesh.geometry.attributes.position.needsUpdate = true;
				linesMesh.geometry.attributes.color.needsUpdate = true;

				pointCloud.geometry.attributes.position.needsUpdate = true;

				cubes.forEach((cube, index) => {
					cube.position.set(particleXYZ[index].x, particleXYZ[index].y, particleXYZ[index].z);
					cube.rotation.y = Math.atan2( ( camera.position.x - cube.position.x ), ( camera.position.z - cube.position.z ) );
				});

				requestAnimationFrame( animate );

			}

			

            
            // resize
			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				// controls.handleResize();

			}


            // animate
			function animate() {
                requestAnimationFrame( animateBuffer );
				render();

			}


            // render
			function render() {

				var delta = clock.getDelta();

				controls.update( delta );

				material1.emissive.b = analyser1.getAverageFrequency() / 256;
				material2.emissive.b = analyser2.getAverageFrequency() / 256;
				material3.emissive.b = analyser3.getAverageFrequency() / 256;

				renderer.render( scene, camera );

			}