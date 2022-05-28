//*********************************************************
//      Global Variables
//*********************************************************
var camera, camera1, camera2, camera3, scene, renderer;
var pressedButtons = []
var clock;

const step = 300;
const R = 20; // Planet Radius
const NUMBER_OF_SPACE_TRASH = 20;

var space_ship;
var lat = -90;
var lon = 0;

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
    //TESTE DE ORIENTACAO

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
    /*

    for(var i = 0; i < NUMBER_OF_SPACE_TRASH; i++) {
        addSpaceTrash();
    }
    */
    createSpaceShipObject();
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
    var initial_position;
    const angle_step = 2;

    switch (code) {
        case "ArrowUp":

            space_ship.rotation.y = 0;
            space_ship.rotation.z = THREE.Math.degToRad(180);
            lat+=2;
            initial_position = sphericalToCartesian(THREE.Math.degToRad(lat), THREE.Math.degToRad(lon), 1.2 * R);
            space_ship.position.x = initial_position.x;
            space_ship.position.y = initial_position.y;
            space_ship.position.z = initial_position.z;
            space_ship.rotation.x = THREE.Math.degToRad(90 - lat);

            break;
        case "ArrowDown":
            space_ship.rotation.z = THREE.Math.degToRad(0);
            space_ship.rotation.y = 0;
            lat-=2;
            initial_position = sphericalToCartesian(THREE.Math.degToRad(lat), THREE.Math.degToRad(lon), 1.2 * R);
            space_ship.rotation.x =  - THREE.Math.degToRad(90 - lat);
            break;
        case "ArrowLeft":
            space_ship.rotation.z = THREE.Math.degToRad(-90);
            space_ship.rotation.x = 0;

            lon-=2;
            initial_position = sphericalToCartesian(THREE.Math.degToRad(lat), THREE.Math.degToRad(lon), 1.2 * R);

            space_ship.rotation.y = THREE.Math.degToRad(lon);
            break;
        case "ArrowRight":
            space_ship.rotation.z = THREE.Math.degToRad(90);
            space_ship.rotation.x = 0;

            lon+=2;
            initial_position = sphericalToCartesian(THREE.Math.degToRad(lat), THREE.Math.degToRad(lon), 1.2 * R);

            space_ship.rotation.y = THREE.Math.degToRad(lon);
            break;
    }

    space_ship.position.x = initial_position.x;
    space_ship.position.y = initial_position.y;
    space_ship.position.z = initial_position.z;
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

/*
*   nose
*   section_1
*   section_2 () (window)
*   main_body \\ (leg)
*   base       \\
*   nozzle
*             capsule
*
*
* */

function createSpaceShipObject() {
    const size_metric = R/20;

    //MAIN BODY
    const main_body_g = new THREE.CylinderGeometry( size_metric , size_metric, size_metric, 32 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} );
    const material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true} );
    const material3 = new THREE.MeshBasicMaterial( {color: 0x1e81b0, wireframe: true} );
    const main_body = new THREE.Mesh( main_body_g, material );

    //SECTION_2
    const section_2_g = new THREE.CylinderGeometry( size_metric/1.2 , size_metric, size_metric, 32 );
    const section_2 = new THREE.Mesh(section_2_g, material);
    section_2.position.y = size_metric;
    main_body.add(section_2);


    //WINDOW OUTER
    const window_o_main_object = new THREE.Object3D();
    const window_o_g = new THREE.CylinderGeometry( size_metric/3 , size_metric/3, size_metric/ 8, 32 );
    const window_o = new THREE.Mesh(window_o_g, material2);
    window_o.position.y = 0.9 * size_metric;
    window_o_main_object.add(window_o)

    window_o_main_object.rotateX(THREE.Math.degToRad(90));
    window_o_main_object.rotateY(THREE.Math.degToRad(-10));
    window_o_main_object.rotateZ(THREE.Math.degToRad(90));

    const window_inner_o = new THREE.CapsuleGeometry( size_metric/4, 0.5, 4, 8 );
    const window_inner = new THREE.Mesh(window_inner_o, material3);
    window_o.add(window_inner);
    section_2.add(window_o_main_object);

    //SECTION_1
    const section_1_g = new THREE.CylinderGeometry( size_metric/1.8 , size_metric/1.2, size_metric, 32 );
    const section_1 = new THREE.Mesh(section_1_g, material);
    section_1.position.y = 2 * size_metric;
    main_body.add(section_1);

    //NOSE
    const nose_g = new THREE.CylinderGeometry( 0 , size_metric/1.8, size_metric, 32 );
    const nose = new THREE.Mesh(nose_g, material);
    nose.position.y = 3 * size_metric;
    main_body.add(nose);

    //BASE
    const base_g = new THREE.CylinderGeometry( size_metric , size_metric/1.2, size_metric, 32 );
    const base = new THREE.Mesh(base_g, material);
    base.position.y = -1 * size_metric;
    main_body.add(base);

    //NOZZLE
    const nozzle_g = new THREE.CylinderGeometry( size_metric/1.5 , size_metric/1.5, size_metric/2, 32 );
    const nozzle = new THREE.Mesh(nozzle_g, material);
    nozzle.position.y = -1.7 * size_metric;
    main_body.add(nozzle);

    //LEGS
    const leg_object_1 = createLegObject(size_metric);
    const leg_object_2 = createLegObject(size_metric);
    leg_object_2.rotateY(THREE.Math.degToRad(90));
    const leg_object_3 = createLegObject(size_metric);
    leg_object_3.rotateY(THREE.Math.degToRad(180));
    const leg_object_4 = createLegObject(size_metric);
    leg_object_4.rotateY(THREE.Math.degToRad(270));


    main_body.add(leg_object_1);
    main_body.add(leg_object_2);
    main_body.add(leg_object_3);
    main_body.add(leg_object_4);

    space_ship = main_body;

    const initial_position = sphericalToCartesian(THREE.Math.degToRad(lat), THREE.Math.degToRad(lon), 1.2 * R);
    space_ship.position.x = initial_position.x;
    space_ship.position.y = initial_position.y;
    space_ship.position.z = initial_position.z;

    scene.add(main_body);
}


function createLegObject(size_metric) {
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} );

    const leg_main_object = new THREE.Object3D();
    const leg_object = new THREE.Object3D();
    const leg_g = new THREE.CylinderGeometry( size_metric/8 , size_metric/8, size_metric * 2, 32 )
    const leg = new THREE.Mesh(leg_g, material);

    leg_object.add(leg);
    leg_object.position.x = size_metric;
    leg_object.rotateZ(THREE.Math.degToRad(30));
    leg.position.y= -0.7 * size_metric;


    //CAPSULE
    const capsule_g = new THREE.CapsuleGeometry( size_metric/4, 2 * size_metric, 4, 8 );
    const capsule = new THREE.Mesh(capsule_g, material);
    capsule.position.y= -size_metric;
    capsule.rotateZ(THREE.Math.degToRad(-30));
    leg.add(capsule);

    leg_main_object.add(leg_object);
    return leg_main_object;
}


//TODO (ARTEM) CRIAR CLASSE DA SPACE_SHIP