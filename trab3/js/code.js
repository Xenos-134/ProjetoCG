//*********************************************************
//      Global Variables
//*********************************************************
var camera, camera1, camera2, scene, renderer;
var pressedKeys = []
var clock;

const step = 50;
const degToRad = THREE.Math.degToRad;


//UNIDADE DE DIMENSAO
const unit = 1;

var globalMainObject = new THREE.Object3D();

function animate() {

    globalMainObject.rotateY(THREE.Math.degToRad(5));

    update();
    display();
    requestAnimationFrame(animate);
}


function update() {
    delta = clock.getDelta();
    pressedKeys.forEach(code => handleKey(code, delta));
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
    window.addEventListener("resize", onResize);

    scene = new THREE.Scene();
    createCameras();
    createFigure1();
    clock = new THREE.Clock();
}

function createFigure1() {

    const trainglePlane = new TrianglePlaneGeometry(20, 20, 20);

    globalMainObject = trainglePlane.object;
    scene.add(trainglePlane.object);
}


//Represetacao de uma geometria plana do triangulo
/*
         (C2)
          /\
         /  \
        /    \
  (C1) -------- (C3)
* */
class TrianglePlaneGeometry {
    geometry;
    object;

    constructor(c1, c2, c3) {
        const shape = new THREE.Shape();
        shape.moveTo(- c1, - c2); //Bottom Left  Corner
        shape.lineTo(c3, - c2);   //Bottom Right Corner
        shape.lineTo(0, c2);   //Top          Corner

        this.geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: false, side: THREE.DoubleSide } );
        this.object = new THREE.Mesh( this.geometry, material) ;
    }
}



function createCameras() {
    let aspect = window.innerWidth / window.innerHeight;
    let width, height;

    if (aspect > 1) {
        height = 200;
        width = height * aspect;
    } else {
        width = 200;
        height = width / aspect;
    }

    camera1 = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
    camera1.translateZ(20).lookAt(scene.position);
    
    camera2 = new THREE.PerspectiveCamera( 45, aspect , 1, 1000 );
    camera2.translateZ(20).lookAt(scene.position);

    camera = camera1;
    return camera;
}


function addKey(code) {
    if(!pressedKeys.includes(code)) {
        pressedKeys.push(code);
        return true;
    }
    return false;
}


function removeKey(code) {
    pressedKeys = pressedKeys.filter(c => c !== code);
}


function handleKey(code, delta) {
    switch (code) {
        case "KeyQ":
            //TODO
            break;
        case "KeyW":
            //TODO
            break;
        case "KeyE":
            //TODO
            break;
        case "KeyR":
            //TODO
            break;
        case "KeyT":
            //TODO
            break;
        case "KeyY":
            //TODO
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
            if (addKey(e.code)) {
                //TODO
            }
            break;
        case "KeyA":
            if (addKey(e.code)) {
                //TODO
            }
            break;
        case "KeyS":
            if (addKey(e.code)) {
                //TODO
            }
            break;
        case "KeyD":
            if (addKey(e.code)) {
                //TODO
            }
            break;
        case "KeyZ":
            if (addKey(e.code)) {
                //TODO
            }
            break;
        case "KeyX":
            if (addKey(e.code)) {
                //TODO
            }
            break;
        case "KeyC":
            if (addKey(e.code)) {
                //TODO
            }
            break;
        case "Space":
            if (addKey(e.code)) {
                //TODO
            }
            break;
        case "KeyQ":
        case "KeyW":
        case "KeyE":
        case "KeyR":
        case "KeyT":
        case "KeyY":
            addKey(e.code);
            break;
    }
}


function onKeyUp(e) {
    removeKey(e.code);
}


function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    let aspect = window.innerWidth / window.innerHeight;
    let width, height;

    if (aspect > 1) {
        height = 200;
        width = height * aspect;
    } else {
        width = 200;
        height = width / aspect;
    }

    camera1.left = width / - 2, camera1.right = width / 2, camera1.top = height / 2, camera1.bottom = height / - 2;
    camera1.updateProjectionMatrix();

    camera2.aspect = aspect;
    camera2.updateProjectionMatrix();
}