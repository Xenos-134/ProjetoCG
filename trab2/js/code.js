//*********************************************************
//      Global Variables
//*********************************************************
var camera, camera1, camera2, camera3, scene, renderer;
var pressedButtons = []
var clock;

const unitStep = 50;
const angleStep = 300;


function createScene() {
    scene = new THREE.Scene();
}


function animate() {
    update();
    display();
};


function update() {
    delta = clock.getDelta();
    requestAnimationFrame( animate );
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
    camera1 = createCamera(0,0,100)
    camera2 = createCamera(0,100,0)
    camera3 = createCamera(100,0,0)

    camera = camera1;

    clock = new THREE.Clock();
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


function createCamera(x,y,z) {
    const height = screen.height/15;
    const width = screen.width/15
    const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );

    camera.position.x = x
    camera.position.y = y;
    camera.position.z = z;
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
            break;
        case "ArrowDown":
            break;
        case "ArrowLeft":
            break;
        case "ArrowRight":
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