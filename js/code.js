//*********************************************************
//      Global Variables
//*********************************************************
var camera1, camera2, camera3, scene, renderer;
var globalObject;

var angleBase, angleMiddleHand, angleTopHand;



function animate() {
    requestAnimationFrame( animate );
    renderer.render(scene, camera1);
};


function createScene() {
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(5));
}

function init() {
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("keydown", detectKey);



    createScene();
    camera1 = createCamera(0,0,20)
    camera2 = createCamera(0,20,0)
    camera3 = createCamera(20,0,0)




    //createCube(0,0,0);
    //createCylinder(0,0,0);
    //createSphere(0,0,0);
    //createCone(0,0,0);
    //createTorus(0,0,0);

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

function createComplexObject() {
    const object = new THREE.Object3D();
    const baseGeometry = new THREE.CylinderGeometry( 8, 12, 5, 32 );
    const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);

    angleBase = object;       // <======================

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

    object.add(base);
    object.add(handObject);


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



function detectKey(e) {
    console.log("PRESSED KEY:", e.key.toLowerCase())
    switch (e.key.toLowerCase()) {
        case "1":
            renderer.render(scene, camera1);
            break;
        case "2":
            renderer.render(scene, camera2);
            break;
        case "3":
            renderer.render(scene, camera3);
            break;
        case "e":
            angleBase.rotateY(THREE.Math.degToRad(50));
            console.log("rotate")
            break;
        case "q":
            angleBase.rotateY(THREE.Math.degToRad(-50));
            console.log("rotate")
            break;
    }

}