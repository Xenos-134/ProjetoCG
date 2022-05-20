//*********************************************************
//      Global Variables
//*********************************************************
var camera, camera1, camera2, camera3, scene, renderer;
var createdObjects = [];
var pressedButtons = []
var clock;

const unitStep = 50;
const angleStep = 300;

const coneAng = THREE.Math.degToRad(120)

var baseObject, armObject, handObject;

function createScene() {
    scene = new THREE.Scene();
    //scene.add(new THREE.AxesHelper(5));
}


function animate() {
    delta = clock.getDelta();
    requestAnimationFrame( animate );
    pressedButtons.forEach(code => detectPressedKey(code, delta));
    renderer.render( scene, camera );
};


function init() {
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);


    createScene();
    camera1 = createCamera(0,0,100)
    camera2 = createCamera(0,100,0)
    camera3 = createCamera(100,0,0)

    camera = camera1;




    //createArtCanvas(40, 40);
    createComplexObject().translateY(-15);
    createStar(15,10,-20).rotateZ(THREE.Math.degToRad(-10));
    //createStar(-20,-20,-10);
    createPlanet(-20,15,20).rotateY(THREE.Math.degToRad(-20)).rotateX(THREE.Math.degToRad(120));
    createCube(-20, 0, -10).rotateZ(THREE.Math.degToRad(30));
    createCube(40, -5, 0).rotateZ(THREE.Math.degToRad(-30));
    createCube(-30, 5, 10).rotateZ(THREE.Math.degToRad(-35));
    createTorus(25, -20, 20).rotateY(THREE.Math.degToRad(-30)).rotateX(THREE.Math.degToRad(46));
    createSphere(30, 10, 0);
    createSimpleCube(-30, -15, 5);
    createSpiral(-5, -5, -20, 5, 3.5*Math.PI).rotateX(Math.PI)

    clock = new THREE.Clock();
    animate();
}

function createSimpleCube(x,y,z) {
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
    //TODO -> Alterar esta parte
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


function createStar(x,y,z) {
    const object = new THREE.Object3D();
    const pyramidTopGeometry = new THREE.ConeGeometry( 5, 10, 4);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
    const pyramidTop = new THREE.Mesh(pyramidTopGeometry, material);
    pyramidTop.position.y = 1.25;
    const pyramidBot = new THREE.Mesh(pyramidTopGeometry, material);
    pyramidBot.rotateZ(THREE.Math.degToRad(180));
    //pyramidBot.rotateY(THREE.Math.degToRad(45));
    pyramidBot.position.y = - 1.25;


    object.position.x = x;
    object.position.y = y;
    object.position.z = z;

    addElement(pyramidTop);
    //addElement(pyramidBot);

    object.add(pyramidTop);
    object.add(pyramidBot);
    scene.add(object);
    return object;
}


function createPlanet(x,y,z) {
    const shpereGeometry = new THREE.SphereGeometry( 8, 32, 16 );
    const shpereMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
    const sphere = new THREE.Mesh( shpereGeometry, shpereMaterial );

    const torusGeomety = new THREE.TorusBufferGeometry(10, 1.5, 50, 50);
    const torusMaterial = new THREE.MeshBasicMaterial( { color: 0xff7f00, wireframe: true } );
    const torus = new THREE.Mesh( torusGeomety, torusMaterial );

    sphere.add(torus);

    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;

    addElement(sphere);
    addElement(torus);
    scene.add( sphere );
    return sphere;
}


function createCube(x,y,z) {
    const geometry1 = new THREE.ConeGeometry( 5, 7, 4 );
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff7f, wireframe: true });
    const cube1 = new THREE.Mesh(geometry1, material);
    const cube2 = new THREE.Mesh(geometry1, material);

    cube2.rotateX(THREE.Math.degToRad(180));
    cube2.position.y = -7;
    cube1.add(cube2);

    cube1.position.x = x;
    cube1.position.y = y;
    cube1.position.z = z;

    addElement(cube1);
    scene.add(cube1)
    return cube1;
}



function createCylinder(x,y,z) {
    const geometry = new THREE.CylinderGeometry(5, 5, 20, 32 );
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.x = 15;
    scene.add(cylinder);
    return cylinder;
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

function createCone(x, y, z) {
    const geometry = new THREE.ConeGeometry(8, 8, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cone = new THREE.Mesh(geometry, material);
    cone.position.y = 15
    scene.add(cone)
    return cone;
}


function createCanvas() {
    const geometry = new THREE.BoxGeometry(10,10,10);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube)
    return cube;
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
    const material = new THREE.MeshBasicMaterial({ color: 0x7f00ff, wireframe: true });
    const spiral = new THREE.Mesh(geometry, material);
    addElement(spiral);
    scene.add(spiral);
    return spiral;
}

function createComplexObject() {
    //BASE
    baseObject = new THREE.Object3D();

    const baseGeometry = new THREE.CylinderGeometry( 8, 12, 5, 32 );
    const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);

    const hingeGeometry = new THREE.CylinderGeometry( 1, 1, 7, 16);
    const hingeMaterial = new THREE.MeshBasicMaterial({ color: 0xbfbfbf, wireframe: true });
    const hinge = new THREE.Mesh(hingeGeometry, hingeMaterial);
    hinge.position.x=8;
    hinge.position.y=2.5;
    hinge.rotateZ(THREE.Math.degToRad(90));
    hinge.rotateX(THREE.Math.degToRad(90));

    const coneGeometry = new THREE.ConeGeometry(8, 5, 32);
    const coneMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.y = + 2.5 + 8 * Math.sin(coneAng) + 2.5 * Math.cos(coneAng);
    cone.position.x = + 8 - 8 * Math.cos(coneAng) + 2.5 * Math.sin(coneAng);
    cone.rotateZ(-coneAng);

    baseObject.add(base);
    baseObject.add(hinge);
    baseObject.add(cone);


    //ARM
    armObject = new THREE.Object3D();

    const armGeometry = new THREE.BoxGeometry(3,20,3);
    const armMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true });
    const arm = new THREE.Mesh(armGeometry, armMaterial);
    arm.position.y+= 2.5+9;
    armObject.rotateZ(THREE.Math.degToRad(30))     //ROTATION OF ALL HAND

    armObject.add(arm); //vai pasar a ser outro objeto (talvez)
    baseObject.add(armObject);


    //HAND
    handObject = new THREE.Object3D();

    const handGeometry = new THREE.BoxGeometry(3,10,3);
    const handMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
    const hand = new THREE.Mesh(handGeometry, handMaterial);
    handObject.position.y+=22;
    hand.position.y+=3;
    handObject.rotateZ(THREE.Math.degToRad(50));      //ROTATION OF TOP HAND

    handObject.add(hand);
    armObject.add(handObject)

    
    addElement(base);
    addElement(cone);
    addElement(hinge);
    addElement(arm);
    addElement(hand);

    baseObject.rotateY(THREE.Math.degToRad(100));
    scene.add(baseObject);
    return baseObject;
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
        e.material.wireframe = !e.material.wireframe;
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

function detectPressedKey(code, delta) {
    console.log("DETECTED :", code);
    switch (code) {
        case "KeyQ":
            baseObject.rotateY(THREE.Math.degToRad(-angleStep * delta));
            break;
        case "KeyW":
            baseObject.rotateY(THREE.Math.degToRad(angleStep * delta));
            break;
        case "KeyA":
            armObject.rotateZ(THREE.Math.degToRad(-angleStep * delta));
            break;
        case "KeyS":
            armObject.rotateZ(THREE.Math.degToRad(angleStep * delta));
            break;
        case "KeyZ":
            handObject.rotateZ(THREE.Math.degToRad(-angleStep * delta));
            break;
        case "KeyX":
            handObject.rotateZ(THREE.Math.degToRad(+angleStep * delta));
            break;
        case "ArrowUp":
            baseObject.position.z -= unitStep * delta;
            break;
        case "ArrowDown":
            baseObject.position.z += unitStep * delta;
            break;
        case "ArrowLeft":
            baseObject.position.x -= unitStep * delta;
            break;
        case "ArrowRight":
            baseObject.position.x += unitStep * delta;
            break;
        case "KeyC":
            baseObject.position.y -= unitStep * delta;
            break;
        case "KeyD":
            baseObject.position.y += unitStep * delta;
            break;
    }
}


function onKeyDown(e) {
    switch (e.code) {
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
        case "Digit6":
            console.log("XXXXXXXXXXXXXXXxx", pressedButtons);
            addButtonToList(e.code)
            break;
        case "KeyQ":
        case "KeyW":
        case "KeyA":
        case "KeyS":
        case "KeyZ":
        case "KeyX":
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
        case "KeyD":
        case "KeyC":
            addButtonToList(e.code);
            break;
    }

}
function onKeyUp(e) {
    if(e.code === "Digit4") toggleWireframe();
    removeButtonFromList(e.code);
}