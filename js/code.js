//*********************************************************
//      Global Variables
//*********************************************************
var camera, camera1, camera2, camera3, scene, renderer;
var createdObjects = [];
var pressedButtons = []

const unitStep = 1;
const angleStep = 5;

var baseGObject, midHandGObject, topHandGObject;

function createScene() {
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(5));
}


function animate() {
    requestAnimationFrame( animate );
    //baseGObject.rotateY(THREE.Math.degToRad(-3));
    //baseGObject.rotateZ(THREE.Math.degToRad(-3));
    pressedButtons.forEach(code => detectPressedKey(code));
    renderer.render( scene, camera ); // CHANGE TS
};


function init() {
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);


    createScene();
    camera1 = createCamera(0,0,20)
    camera2 = createCamera(0,20,0)
    camera3 = createCamera(20,0,0)

    camera = camera1;


    //createCube(0,0,0);
    //createCylinder(0,0,0);
    //createSphere(0,0,0);
    //createCone(0,0,0);
    //createTorus(0,0,0);
    //createSpiral(0,0,0,15,9*Math.PI);

    //create3DObject(0,0,0);

    //createArtCanvas(40, 40);
    createComplexObject();

    animate();
}



function createCamera(x,y,z) {
    //TODO -> Alterar esta parte
    const height = screen.height/15;
    const width = screen.width/15
    const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );

    camera.position.x = x
    camera.position.y = y;
    camera.position.z = z;
    camera.lookAt(scene.position);
    return camera
}

function createCube(x,y,z) {
    const geometry = new THREE.BoxGeometry(10,10,10);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube)
}



function createCylinder(x,y,z) {
    const geometry = new THREE.CylinderGeometry(5, 5, 20, 32 );
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cylinerd = new THREE.Mesh(geometry, material);
    cylinerd.position.x = 15
    scene.add(cylinerd)
}

function createSphere(x,y,z) {
    const geometry = new THREE.SphereGeometry(8, 8, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = -15
    scene.add(sphere)
}

function createCone(x, y, z) {
    const geometry = new THREE.ConeGeometry(8, 8, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cone = new THREE.Mesh(geometry, material);
    cone.position.y = 15
    scene.add(cone)
}

function createTorus(x, y, z) {
    const geometry = new THREE.TorusGeometry(8, 3, 16, 50);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const torus = new THREE.Mesh(geometry, material);
    torus.position.y = -20
    scene.add(torus)
}

function createCanvas() {
    const geometry = new THREE.BoxGeometry(10,10,10);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube)
}

class SpiralCurve extends THREE.Curve {

	constructor(x, y, z, r, l) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = r;
        this.length = l;
	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {
        const a = this.length * t;
        const r = this.radius * t;

        const x = this.x + r * Math.cos(a);
        const y = this.y + r * Math.sin(a);
        const z = this.z;

		return optionalTarget.set(x, y, z);

	}
}

function createSpiral(x, y, z, r, l) {
    const path = new SpiralCurve(x, y, z, r, l);
    const geometry = new THREE.TubeGeometry(path, 64/(2*Math.PI)*l, r/10/l*(4*Math.PI));
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const spiral = new THREE.Mesh(geometry, material);
    addElement(spiral);
    scene.add(spiral);
    return spiral;
}

function createComplexObject() {

    const object = new THREE.Object3D();
    const baseGeometry = new THREE.CylinderGeometry( 8, 12, 5, 32 );
    const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    object.rotateY(THREE.Math.degToRad(100));

    //HAND BETWEEN BASE AND TOP ONE
    const handObject = new THREE.Object3D();
    const midHandGeometry = new THREE.BoxGeometry(3,20,3);
    const midHandMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true });
    const midHand = new THREE.Mesh(midHandGeometry, midHandMaterial);


    midHand.position.y+= 2.5+9;
    handObject.rotateZ(THREE.Math.degToRad(30))     //ROTATION OF ALL HAND

    //TOP HAND
    const topHandObject = new THREE.Object3D();
    const topHandGeometry = new THREE.BoxGeometry(3,10,3);
    const topHandMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
    const topHand = new THREE.Mesh(topHandGeometry, topHandMaterial);

    topHandObject.position.y+=22;
    topHand.position.y+=3;
    topHandObject.rotateZ(THREE.Math.degToRad(50));      //ROTATION OF TOP HAND


    topHandObject.add(topHand);
    handObject.add(topHandObject)
    handObject.add(midHand); //vai pasar a ser outro objeto (talvez)


    addElement(base);
    addElement(midHand);
    addElement(topHand);


    object.add(base);
    object.add(handObject);


    baseGObject = object;
    midHandGObject = handObject;
    topHandGObject = topHandObject;

    scene.add(object);
}

function createCombinedObject2() {
    //TODO
}

function createCombinedObject3() {
    //TODO
}

function create3DObject(x,y,z) {
    const object = new THREE.Object3D();
    const ballGeometry = new THREE.SphereGeometry(8, 8, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
    const ball = new THREE.Mesh(ballGeometry, material);

    object.position.x = -25;
    object.position.y = -25;

    object.add(ball);
    scene.add(object);
}

function createArtCanvas(h, w) {
    const object = new THREE.Object3D();
    const objectMaterialWireframe = false;

    //MAIN Canvas Part
    const mainSpaceGeometry = new THREE.BoxGeometry(70,50,1);
    const mainSpaceMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: objectMaterialWireframe });
    const mainSpace = new THREE.Mesh(mainSpaceGeometry, mainSpaceMaterial);

    //BORDERS
    const borderMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: objectMaterialWireframe });
    //Horizontal Borders
    const hBorderGeometry = new THREE.CylinderGeometry(1,1,51, 20, 1, false, 0, Math.PI);
    const hBorderL = new THREE.Mesh(hBorderGeometry, borderMaterial);
    hBorderL.rotation.y = -1.5; hBorderL.position.x = -34.5;

    const hBorderR = new THREE.Mesh(hBorderGeometry, borderMaterial);
    hBorderR.rotation.y = -1.5; hBorderR.position.x = 34.5;
    //Vertical Borders
    const vBorderGeometry = new THREE.CylinderGeometry(1,1,71, 20, 1, false, 0, Math.PI);
    const vBorderT = new THREE.Mesh(vBorderGeometry, borderMaterial);
    vBorderT.rotateZ(THREE.Math.degToRad(270));
    vBorderT.rotateY(THREE.Math.degToRad(270));
    vBorderT.position.y = -24.5;

    const vBorderB = new THREE.Mesh(vBorderGeometry, borderMaterial);
    vBorderB.rotateZ(THREE.Math.degToRad(270));
    vBorderB.rotateY(THREE.Math.degToRad(270));
    vBorderB.position.y = -24.5;
    vBorderB.position.y = 24.5;


    object.position.x = 0;
    object.position.y = 0;
    object.position.z = 0;

    object.add(hBorderL);
    object.add(hBorderR);
    object.add(vBorderT);
    object.add(vBorderB);
    object.add(mainSpace);
    scene.add(object);
}

function addElement(obj) {
    createdObjects.push(obj);
}

function toggleWireframe(flag) {
    createdObjects.forEach(e => {
        console.log("E:", e)
        e.material.wireframe = flag;
    })
}

function addButtonToList(code) {
    if(!pressedButtons.includes(code)) {
        pressedButtons.push(code);
        console.log("ADDED:", pressedButtons);
    }
}

function removeButtonFromList(code) {
    pressedButtons = pressedButtons.filter(c => c !== code);
    console.log("PBS:", pressedButtons);
}

function detectPressedKey(code) {
    console.log("DETECTED :", code);
    switch (code) {
        case "Digit1":
            camera = camera1;
            break;
        case "Digit2":
            renderer.render(scene, camera2);
            camera = camera2;
            break;
        case "Digit3":
            renderer.render(scene, camera3);
            camera = camera3;
            break;
        case "Digit4":
            toggleWireframe();
            break;
        case "KeyQ":
            baseGObject.rotateY(THREE.Math.degToRad(-angleStep));
            break;
        case "KeyW":
            baseGObject.rotateY(THREE.Math.degToRad(angleStep));
            break;
        case "KeyA":
            midHandGObject.rotateZ(THREE.Math.degToRad(-angleStep));
            break;
        case "KeyS":
            midHandGObject.rotateZ(THREE.Math.degToRad(angleStep));
            break;
        case "KeyZ":
            topHandGObject.rotateZ(THREE.Math.degToRad(-angleStep));
            break;
        case "KeyX":
            topHandGObject.rotateZ(THREE.Math.degToRad(+angleStep));
            break;
        case "ArrowUp":
            baseGObject.position.z-=unitStep;
            break;
        case "ArrowDown":
            baseGObject.position.z+=unitStep;
            break;
        case "ArrowLeft":
            baseGObject.position.x-=unitStep;
            break;
        case "ArrowRight":
            baseGObject.position.x+=unitStep;
            break;
        case "KeyD":
            toggleWireframe(false);
            break;
        case "KeyC":
            toggleWireframe(true);
            break;
    }
}



function onKeyDown(e) {
    addButtonToList(e.code);

}
function onKeyUp(e) {
    removeButtonFromList(e.code);
    //if (pressed[e.code]) pressed[e.code] = false;
}