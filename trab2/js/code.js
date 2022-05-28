//*********************************************************
//      Global Variables
//*********************************************************
var camera, camera1, camera2, camera3, scene, renderer;
var pressedButtons = []
var clock;

const step = 300;
const R = 20; // Planet Radius
const NUMBER_OF_SPACE_TRASH = 20;

function sphericalToCartesian(lat, long, r) {
    return new THREE.Vector3(
        r * Math.sin(long) * Math.sin(lat),
        r * Math.cos(lat),
        r * Math.cos(long) * Math.sin(lat),
    );
}


class Rocket extends THREE.Object3D {
    // TODO
}


class Junk extends THREE.Object3D {
    // TODO
}


function createScene() {
    scene = new THREE.Scene();
}


function animate() {
    update();
    display();
    requestAnimationFrame(animate);
}


function update() {
    delta = clock.getDelta();
    pressedButtons.forEach(code => handleKey(code, delta));
}


function display() {
    renderer.render( scene, camera );
}


function init() {
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    // TODO window resize

    createScene();
    createCameras();

    // TODO create planet, rocket and junk
    createPlanet();
    for(var i = 0; i < NUMBER_OF_SPACE_TRASH; i++) {
        addSpaceTrash();
    }

    clock = new THREE.Clock();
}

function addSpaceTrash() {
    var geometry;
    const randomSize = generateRandoNumber(R/24, R/20);
    const randomGeometry = generateRandoNumber(1,4);

    if(randomGeometry == 1) {
        geometry = new THREE.BoxGeometry( randomSize, randomSize, randomSize );
    } else if (randomGeometry == 2) {
        geometry = new THREE.ConeGeometry( randomSize, randomSize, 3 );;
    } else {
        geometry = new THREE.IcosahedronGeometry(randomSize); // PASSAR A FAZER COM UM POLIEDRO
    }


    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const object = new THREE.Mesh( geometry, material );

    const vector = sphericalToCartesian(Math.PI * Math.random(), 2*Math.PI * Math.random(), 1.2 * R);
    object.position.x = vector.x;
    object.position.y = vector.y;
    object.position.z = vector.z;


    scene.add( object );
}

function generateRandoNumber(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


function createPlanet() {
    const geometry = new THREE.SphereGeometry(R);
    const material = new THREE.MeshBasicMaterial({ color: 0xBf03f3f, wireframe: true} );
    const planet = new THREE.Mesh(geometry, material);

    scene.add(planet);
}


function createCube(x,y,z) {
    const geometry = new THREE.BoxGeometry( 5, 5, 5 );
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true} );
    const cube = new THREE.Mesh( geometry, material );
    cube.rotateZ(THREE.Math.degToRad(30));
    cube.rotateX(THREE.Math.degToRad(30));
    cube.rotateY(THREE.Math.degToRad(30));

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    addElement(cube);
    scene.add( cube );
    return cube;
}


function createCameras() {
    const height = screen.height/15;
    const width = screen.width/15

    camera1 = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
    camera2 = new THREE.PerspectiveCamera( width / height , 1, 1000 );
    camera3 = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
    

    camera = camera1;

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = -30;
    camera.lookAt(scene.position);

    return camera;
}


function createTorus(x,y,z) {
    const torusGeomety = new THREE.TorusBufferGeometry(5, 1, 30, 30);
    const torusMaterial = new THREE.MeshBasicMaterial( { color: 0xff0f0f, wireframe: true } );
    const torus = new THREE.Mesh( torusGeomety, torusMaterial );

    torus.position.x = x;
    torus.position.y = y;
    torus.position.z = z;

    addElement(torus);
    scene.add(torus);
    return torus;
}


function createSphere(x,y,z) {
    const geometry = new THREE.SphereGeometry(2, 8, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;

    addElement(sphere);
    scene.add(sphere);
    return sphere;
}


function addButtonToList(code) {
    if(!pressedButtons.includes(code)) {
        pressedButtons.push(code);
        console.log("Add key: ", pressedButtons);
    }
}


function removeButtonFromList(code) {
    pressedButtons = pressedButtons.filter(c => c !== code);
    console.log("Remove key: ", pressedButtons);
}


function handleKey(code, delta, movement) {
    console.log("Handle key: ", code);
    switch (code) {
        case "ArrowUp":
            // TODO
            break;
        case "ArrowDown":
            // TODO
            break;
        case "ArrowLeft":
            // TODO
            break;
        case "ArrowRight":
            // TODO
            break;
    }
}


function onKeyDown(e) {
    switch (e.code) {
        case "Digit1":
            camera = camera1;
            break;

        case "Digit2":
            camera = camera2;
            break;

        case "Digit3":
            camera = camera3;
            break;

        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
            addButtonToList(e.code);
            break;
    }
}


function onKeyUp(e) {
    removeButtonFromList(e.code);
}

//ESTOU AINDA A TESTAR



//TODO (ARTEM) CRIAR CLASSE DA SPACE_SHIP