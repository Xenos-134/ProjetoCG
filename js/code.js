//*********************************************************
//      Global Variables
//*********************************************************
var camera1, camera2, camera3, scene, renderer;
var globalObject;


function createScene() {
    scene = new THREE.Scene();
    //scene.add(new THREE.AxisHelper(5));
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

    createCube(0,0,0);
    createCylinder(0,0,0);
    createSphere(0,0,0);
    createCone(0,0,0);
    createTorus(0,0,0);

    renderer.render(scene, camera1);


    //JUST FOR TEST
    /*
    setTimeout(function(){
        renderer.render(scene, camera2);
    }, 5000);

    setTimeout(function(){
        renderer.render(scene, camera3);
    }, 10000);
     */
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

function createCombinedObject1() {
    //TODO
}

function createCombinedObject2() {
    //TODO
}

function createCombinedObject2() {
    //TODO
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
    }

}