
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