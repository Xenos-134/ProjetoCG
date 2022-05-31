//*********************************************************
//      Global Variables
//*********************************************************
var camera, camera1, camera2, camera3, scene, renderer;
var pressedButtons = []
var clock;

const step = 50;
const R = 200; // Planet Radius
const NUMBER_OF_SPACE_TRASH = 20;

const degToRad = THREE.Math.degToRad;

const minJunkSize = R/24, maxJunkSize = R/20;

var space_ship;
var lat = -90, lon = 180;

var junkObjectsArray = [];


function sphericalToCartesian(lat, lon, r) {
    return new THREE.Vector3(
        r * Math.sin(lon) * Math.sin(lat),
        r * Math.cos(lat),
        r * Math.cos(lon) * Math.sin(lat),
    );
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

    const old_lat = lat, old_lon = lon;

    pressedButtons.forEach(code => handleKey(code, delta));

    if (lat != old_lat || lon != old_lon) {
        updateSpaceShipPos();
        detectColisions();
    }
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

    createScene();
    createCameras();

    createPlanet();
    for(var i = 0; i < NUMBER_OF_SPACE_TRASH; i++) {
        const spaceJunk = new Junk();
        spaceJunk.addObjectToScene();
    }
    initSpaceShip();

    clock = new THREE.Clock();
}

function createSpaceTrash(size) {
    var geometry;
 
    let l, r, h;
    switch (generateRandoNumber(1,4)) {
        case 1:
            l = size / Math.sqrt(3);
            geometry = new THREE.BoxGeometry(l, l, l);
            break;

        case 2:
            h = size / Math.sqrt(2);
            r = h / 2;
            geometry = new THREE.CylinderGeometry(r, r, h);
            break;

        case 3:
            r = size / 2;
            geometry = new THREE.SphereGeometry(r);
            break;

        default:
            console.error("This space junk geometry does not exist.");
            break;
    }

    const material = new THREE.MeshBasicMaterial( { color: 0xBfBfBf } );
    const object = new THREE.Mesh( geometry, material );

    const vector = sphericalToCartesian(Math.PI * Math.random(), 2*Math.PI * Math.random(), 1.2 * R);
    object.position.x = vector.x;
    object.position.y = vector.y;
    object.position.z = vector.z;


    //scene.add( object );
    return object
}

function generateRandoNumber(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


function createPlanet() {
    const geometry = new THREE.SphereGeometry(R);
    const material = new THREE.MeshBasicMaterial({ color: 0xf03f3f, wireframe: true} );
    const planet = new THREE.Mesh(geometry, material);

    scene.add(planet);
}


function createCameras() {
    let aspect = window.innerWidth / window.innerHeight;
    let width, height;

    if (aspect > 1) {
        height = 3 * R;
        width = height * aspect;
    } else {
        width = 3 * R;
        height = width / aspect;
    }

    camera1 = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
    camera1.translateZ(2 * R).lookAt(scene.position);
    
    camera2 = new THREE.PerspectiveCamera( 45, aspect , 1, 1000 );
    camera2.translateZ(3 * R).lookAt(scene.position);

    camera3 = new THREE.PerspectiveCamera( 45, aspect , 1, 1000 );

    camera = camera1;
    return camera;
}


function addButtonToList(code) {
    if(!pressedButtons.includes(code)) {
        pressedButtons.push(code);
        //console.log("Add key: ", pressedButtons);
    }
}


function removeButtonFromList(code) {
    pressedButtons = pressedButtons.filter(c => c !== code);
    //console.log("Remove key: ", pressedButtons);
}


function handleKey(code, delta) {
    //console.log("Handle key: ", code);

    switch (code) {
        case "ArrowUp":
            lat += step * delta;;
            space_ship.rotation.z = degToRad(0);
            break;
        case "ArrowDown":
            lat -= step * delta;
            space_ship.rotation.z = degToRad(180);
            break;
        case "ArrowLeft":
            lon -= step * delta;
            space_ship.rotation.z = degToRad(-90);
            break;
        case "ArrowRight":
            lon += step * delta;
            space_ship.rotation.z = degToRad(90);
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


function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    let aspect = window.innerWidth / window.innerHeight;
    let width, height;

    if (aspect > 1) {
        height = 3 * R;
        width = height * aspect;
    } else {
        width = 3 * R;
        height = width / aspect;
    }

    camera1.left = width / - 2, camera1.right = width / 2, camera1.top = height / 2, camera1.bottom = height / - 2;
    camera1.updateProjectionMatrix();

    camera2.aspect = aspect;
    camera2.updateProjectionMatrix();

    camera3.aspect = aspect;
    camera3.updateProjectionMatrix();
}

/*
*   nose
*   section_1
*   section_2 () (window)
*   section_3 \\ (leg)
*   base       \\
*   nozzle
*             capsule
* */

function createSpaceShipObject() {
    const size_metric = R/10 / 2 / 3;

    const ship = new THREE.Object3D();

    const nose_matrial = new THREE.MeshBasicMaterial({color: 0xfb4934});
    const section_1_matrial = new THREE.MeshBasicMaterial( {color: 0xfbf1c7});
    const base_matrial = new THREE.MeshBasicMaterial( {color: 0xd3869b});
    const nozzle_matrial = new THREE.MeshBasicMaterial( {color: 0xfebd2f});

    //MAIN BODY
    const section_3_g = new THREE.CylinderGeometry( size_metric , size_metric, size_metric, 32 );
    const material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true} );
    const material3 = new THREE.MeshBasicMaterial( {color: 0x1e81b0, wireframe: true} );
    const section_3 = new THREE.Mesh( section_3_g, section_1_matrial );
    ship.add(section_3);

    //SECTION_2
    const section_2_g = new THREE.CylinderGeometry( size_metric/1.2 , size_metric, size_metric, 32 );
    const section_2 = new THREE.Mesh(section_2_g, section_1_matrial);
    section_2.position.y = size_metric;
    ship.add(section_2);


    //WINDOW OUTER
    const window_o_main_object = new THREE.Object3D();
    const window_o_g = new THREE.CylinderGeometry( size_metric/3 , size_metric/3, size_metric/ 8, 32 );
    const window_o = new THREE.Mesh(window_o_g, material2);
    window_o.position.y = 0.9 * size_metric;
    window_o_main_object.add(window_o)
    window_o_main_object.rotateX(degToRad(90)).rotateY(degToRad(-10)).rotateZ(degToRad(90));

    const window_inner_o = new THREE.CapsuleGeometry( size_metric/4, 0.5, 4, 8 );
    const window_inner = new THREE.Mesh(window_inner_o, material3);
    window_o.add(window_inner);
    section_2.add(window_o_main_object);

    //SECTION_1
    const section_1_g = new THREE.CylinderGeometry( size_metric/1.8 , size_metric/1.2, size_metric, 32 );
    const section_1 = new THREE.Mesh(section_1_g, section_1_matrial);
    section_1.position.y = 2 * size_metric;
    ship.add(section_1);

    //NOSE
    const nose_g = new THREE.CylinderGeometry( 0 , size_metric/1.8, size_metric, 32 );
    const nose = new THREE.Mesh(nose_g, nose_matrial);
    nose.position.y = 3 * size_metric;
    ship.add(nose);

    //BASE
    const base_g = new THREE.CylinderGeometry( size_metric , size_metric/1.2, size_metric, 32 );
    const base = new THREE.Mesh(base_g, base_matrial);
    base.position.y = -1 * size_metric;
    ship.add(base);

    //NOZZLE
    const nozzle_g = new THREE.CylinderGeometry( size_metric/1.5 , size_metric/1.5, size_metric/2, 32 );
    const nozzle = new THREE.Mesh(nozzle_g, nozzle_matrial);
    nozzle.position.y = -1.7 * size_metric;
    ship.add(nozzle);

    //LEGS
    const leg_object_1 = createLegObject(size_metric);
    const leg_object_2 = createLegObject(size_metric);
    leg_object_2.rotateY(degToRad(90));
    const leg_object_3 = createLegObject(size_metric);
    leg_object_3.rotateY(degToRad(180));
    const leg_object_4 = createLegObject(size_metric);
    leg_object_4.rotateY(degToRad(270));

    ship.add(leg_object_1);
    ship.add(leg_object_2);
    ship.add(leg_object_3);
    ship.add(leg_object_4);

    const initial_position = sphericalToCartesian(degToRad(lat), degToRad(lon), 1.2 * R);
    ship.position.x = initial_position.x;
    ship.position.y = initial_position.y;
    ship.position.z = initial_position.z;

    return ship;
}


function initSpaceShip() {
    space_ship = createSpaceShipObject();

    camera3.translateY(-R/2).translateZ(-R/4);
    camera3.up = new THREE.Vector3(0,0,-1);
    camera3.lookAt(0,1,0);
    space_ship.add(camera3);
    
    space_ship.rotation.order = ('YXZ');
    
    updateSpaceShipPos();

    scene.add(space_ship);
}


function createLegObject(size_metric) {
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} );

    const leg_material = new THREE.MeshBasicMaterial( {color: 0x665c54});
    const capsule_material = new THREE.MeshBasicMaterial( {color: 0xd79921});
    //capsule
    const leg_main_object = new THREE.Object3D();
    const leg_object = new THREE.Object3D();
    const leg_g = new THREE.CylinderGeometry( size_metric/8 , size_metric/8, size_metric * 2, 32 )
    const leg = new THREE.Mesh(leg_g, leg_material);

    leg_object.add(leg);
    leg_object.position.x = size_metric;
    leg_object.rotateZ(degToRad(30));
    leg.position.y= -0.7 * size_metric;


    //CAPSULE
    const capsule_g = new THREE.CapsuleGeometry( size_metric/4, 2 * size_metric, 4, 8 );
    const capsule = new THREE.Mesh(capsule_g, capsule_material);
    capsule.position.y= -size_metric;
    capsule.rotateZ(degToRad(-30));
    leg.add(capsule);

    leg_main_object.add(leg_object);
    return leg_main_object;
}


function getOctant(position) {
    return (position.x < 0) + (position.y < 0)*2 + (position.z < 0)*4;
}


class Junk {
    constructor() {
        this.size = generateRandoNumber(minJunkSize, maxJunkSize);
        this._junkObject = createSpaceTrash(this.size);
        this._x = this._junkObject.position.x;
        this._y = this._junkObject.position.y;
        this._z = this._junkObject.position.z;
        this._octant = getOctant(this._junkObject.position);
    }

    addObjectToScene() {
        scene.add(this._junkObject);
        junkObjectsArray.push(this);
    }
}


function detectColisions() {
    const space_ship_octant = getOctant(space_ship.position);

    junkObjectsArray.forEach(junk => {
        if(space_ship_octant !== junk._octant) return;
        const distance_between_2 = (junk._junkObject.position.x - space_ship.position.x)**2
        + (junk._junkObject.position.y - space_ship.position.y)**2
        + (junk._junkObject.position.z - space_ship.position.z)**2;

        if(Math.sqrt(distance_between_2) < R/10/2 + junk.size/2 ) {
            scene.remove(junk._junkObject);
            junkObjectsArray = junkObjectsArray.filter(elm => elm != junk);
        }
    })
}

function updateSpaceShipPos() {
    let new_pos = sphericalToCartesian(degToRad(lat), degToRad(lon), 1.2 * R);
    space_ship.position.copy(new_pos);
    space_ship.rotation.x = degToRad(lat + 90);
    space_ship.rotation.y = degToRad(lon);
}