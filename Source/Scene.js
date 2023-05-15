import * as THREE from 'three';
import { FirstPersonControls} from 'three/examples/jsm/controls/FirstPersonControls.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PointLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import { Cube } from './Cube';

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.set(1, 1, 10);

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	const plane = new THREE.Mesh(
		new THREE.PlaneGeometry(20,20),
		new THREE.MeshBasicMaterial({ color: '#4CAF50', side: THREE.DoubleSide})
	)
	
	plane.rotation.x = Math.PI / 2;
	scene.add(plane);

	const house = new THREE.Group();
	scene.add(house);

	const walls = new THREE.Mesh(
		new THREE.BoxGeometry(4, 2.5, 4),
		new THREE.MeshBasicMaterial({
			color: '#8D6E63'
		})
	)
	walls.position.y = 2.5 / 2;

	house.add(walls);

	//roof
	const roof = new THREE.Mesh(
		new THREE.ConeGeometry(3.5, 1, 4),
		new THREE.MeshBasicMaterial({color: '#8D6E63'})
	)

	roof.position.y = 3
	roof.rotation.y = Math.PI * 0.25;

	house.add(roof);

	//door
	const door = new THREE.Mesh(
		new THREE.PlaneGeometry(2, 2, 100, 100),
		new THREE.MeshBasicMaterial({ color: '#795548'})
	)
	door.position.y = 1
	door.position.z = 2 + 0.01

	house.add(door);

	//grass
	const grassGeometry = new THREE.SphereGeometry(1, 16, 16)
	const  grassMaterial = new THREE.MeshBasicMaterial({ color: '#76FF03'})

	const bush1 = new THREE.Mesh(grassGeometry, grassMaterial)
	bush1.scale.set(0.5, 0.5, 0.5)
	bush1.position.set(0.8, 0.2, 2.2)

	const bush2 = new THREE.Mesh(grassGeometry, grassMaterial)
	bush2.scale.set(0.25, 0.25, 0.25)
	bush2.position.set(1.4, 0.1, 2.1)

	const bush3 = new THREE.Mesh(grassGeometry, grassMaterial)
	bush3.scale.set(0.4, 0.4, 0.4)
	bush3.position.set(-0.8, 0.1, 2.2)

	const bush4 = new THREE.Mesh(grassGeometry, grassMaterial)
	bush4.scale.set(0.15, 0.15, 0.15)
	bush4.position.set(-1, 0.05, 2.6)

	house.add(bush1, bush2, bush4, bush4)

	const graves = new THREE.Group();
	scene.add(graves);

	const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
	const graveMaterial = new THREE.MeshBasicMaterial({color: '#4DB6AC'})

	for(let i = 0; i < 50; i++){
		const angle = Math.random() * Math.PI * 2
		const radius = 3 + Math.random() * Math.PI * 2
		const x = Math.sin(angle) * radius
		const z = Math.cos(angle) * radius

		const grave = new THREE.Mesh(graveGeometry, graveMaterial)
		grave.position.set(x, 0.3, z)
		grave.rotation.y = (Math.random() - 0.5) * 0.4
		grave.rotation.z = (Math.random() - 0.5) * 0.4
		grave.castShadow = true
		graves.add(grave)
	}

	//door light

	
	const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
	doorLight.position.set(0, 2.2, 2.7)
	house.add(doorLight)

	

	const ambientLihgt = new THREE.AmbientLight('#ffffff', 1)
	//gui.add(ambientLihgt, 'intensity').min(0).max(1).step(0.001)
	scene.add(ambientLihgt)

	const moonLight = new THREE.DirectionalLight('#ffffff', 1)
	moonLight.position.set(4, 5, -2)
	//gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
	scene.add(moonLight)



	/*const controls = new PointLockControls(camera, renderer.domElement);
	const clock = new THREE.Clock();
	scene.add(controls.getObject())

	document.addEventListener('click', () => {
		controls.lock();
	});

	let keyboard = [];
	addEventListener('keydown', (e) => {
		keyboard[e.key] = true;
	});

	addEventListener('keyup', (e) => {
		keyboard[e.key] = false;
	});

	function WADS(delta) {
		let lookSpeed = 5;
		let actualSpeed = lookSpeed * delta;

		if(keyboard["w"]){
			controls.moveForward(actualSpeed)

		}

		if(keyboard["s"]){
			controls.moveForward(-actualSpeed)

		}

		if(keyboard["a"]){
			controls.moveRight(actualSpeed)

		}

		if(keyboard["d"]){
			controls.moveRight(-actualSpeed)

		}
	}*/

	const orbit = new OrbitControls(camera, renderer.domElement)
	scene.add(orbit)


	function animate() {
		requestAnimationFrame( animate );

		//const delta = clock.getDelta(); 
		//WADS(delta);

		orbit.update()

		//let delta = clock.getDelta();
		//WADS(delta);

		renderer.render( scene, camera );
	}
    animate(); 

