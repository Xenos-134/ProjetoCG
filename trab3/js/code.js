//*********************************************************
//      Global Variables
//*********************************************************
var camera, camera1, camera2, scene, renderer;
var pressedKeys = []
var clock;

const step = 50;
const degToRad = THREE.Math.degToRad, cos = Math.cos, sin = Math.sin, PI = Math.PI;


//UNIDADE DE DIMENSAO
const unit = 1;

var globalMainObject = new THREE.Object3D();

function animate() {

<<<<<<< HEAD
    globalMainObject.rotateY(THREE.Math.degToRad(1));
=======
    globalMainObject.rotateX(degToRad(1));
>>>>>>> a9d62575c096fafc39a647e8b250a452cd318a9d
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
<<<<<<< HEAD
    createFigure3();    //createFigure1Test();
=======
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 ).translateX(10)
                                                                        .translateY(10)
                                                                        .translateZ(10);
    scene.add( directionalLight );
    //createFigure1();
    createFigure1Buffer();
    //createFigure1Test();
>>>>>>> a9d62575c096fafc39a647e8b250a452cd318a9d
    clock = new THREE.Clock();
}



function createFigure3() {
    const vertices = [
        //Back L
            //Up T
        { pos: [  0,  20,  -5], norm: [ 0,  0,  1], uv: [0, 0], },
        { pos: [-20,   0,  0], norm: [ 0,  0,  1], uv: [1, 0], },
        { pos: [  0, -10,  -5], norm: [ 0,  0,  1], uv: [0, 1], },
            //Bot T
        { pos: [  0,   -10,  -5], norm: [ 0,  0,  1], uv: [0.5, 1], },
        { pos: [  -20, 0,  0], norm: [ 0,  0,  1], uv: [0, 1], },
        { pos: [  0,   -70,  -5], norm: [ 0,  0,  1], uv: [1, 0], },

        //Back R
            //Up T
        { pos: [  0,  20,  -5], norm: [ 0,  0,  1], uv: [0, 0], },
        { pos: [20,   0,  0], norm: [ 0,  0,  1], uv: [1, 0], },
        { pos: [  0, -10,  -5], norm: [ 0,  0,  1], uv: [0, 1], },
            //Bot T
        { pos: [  0,   -10,  -5], norm: [ 0,  0,  1], uv: [0.5, 1], },
        { pos: [  20, 0,  0], norm: [ 0,  0,  1], uv: [0, 1], },
        { pos: [  0,   -70,  -5], norm: [ 0,  0,  1], uv: [0.5, 0], },


        //Front 1 L
        { pos: [  -20,  0,  0], norm: [ 0,  0,  1], uv: [0, 1], },
        { pos: [   0,  -70,  -5], norm: [ 0,  0,  1], uv: [0.5, 0], },
        { pos: [    -3,  -10,  -10], norm: [ 0,  0,  1], uv: [0.5, 1], },

        //Front 2 L
        { pos: [  -3,  -10,  -10], norm: [ 0,  0,  1], uv: [0.5, 1], },
        { pos: [  -15,  -15,  -2], norm: [ 0,  0,  1], uv: [0, 1], },
        { pos: [  0,  -70,  -5], norm: [ 0,  0,  1], uv: [0.5, 0], },

        //Front 1 R
        { pos: [  20,  0,  0], norm: [ 0,  0,  1], uv: [1, 1], },
        { pos: [   0,  -70,  -5], norm: [ 0,  0,  1], uv: [0.5, 0], },
        { pos: [    3,  -10,  -10], norm: [ 0,  0,  1], uv: [0.5, 1], },

        //Front 2 R
        { pos: [  3,  -10,  -10], norm: [ 0,  0,  1], uv: [0.5, 1], },
        { pos: [  15,  -15,  -2], norm: [ 0,  0,  1], uv: [0, 1], },
        { pos: [  0,  -70,  -5], norm: [ 0,  0,  1], uv: [0.5, 0], },






    ];

    const positions = [];
    const normals = [];
    const uvs = [];
    for (const vertex of vertices) {
        positions.push(...vertex.pos);
        normals.push(...vertex.norm);
        uvs.push(...vertex.uv);
    }

    const geometry = new THREE.BufferGeometry();
    const positionNumComponents = 3;
    const normalNumComponents = 3;
    const uvNumComponents = 2;
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
    geometry.setAttribute(
        'normal',
        new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
    geometry.setAttribute(
        'uv',
        new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));

    let sprite = new THREE.TextureLoader().load("https://previews.123rf.com/images/akiyoko/akiyoko1809/akiyoko180900051/108410284-traditional-japanese-pattern-origami-paper-texture-background.jpg");

    //var material = new THREE.MeshBasicMaterial( {map: sprite, side: THREE.DoubleSide });
    var material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, map: sprite });
    var object = new THREE.Mesh( geometry, material );

    globalMainObject = object;

    scene.add(object);
}





function createFigure2() {
    const vertices = [
        { pos: [  0,  20,  -5], norm: [ 0,  0,  1], uv: [0, 0], },
        { pos: [-20,   0,  1], norm: [ 0,  0,  1], uv: [1, 0], },
        { pos: [  0, -20,  -5], norm: [ 0,  0,  1], uv: [0, 1], },

        { pos: [ 0,  20,  -5], norm: [ 0,  0,  1], uv: [0, 1], },
        { pos: [ 0, -20,  -5], norm: [ 0,  0,  1], uv: [1, 0], },
        { pos: [ 20,  0,  1], norm: [ 0,  0,  1], uv: [1, 1], },

    ];

    const positions = [];
    const normals = [];
    const uvs = [];
    for (const vertex of vertices) {
        positions.push(...vertex.pos);
        normals.push(...vertex.norm);
        uvs.push(...vertex.uv);
    }

    const geometry = new THREE.BufferGeometry();
    const positionNumComponents = 3;
    const normalNumComponents = 3;
    const uvNumComponents = 2;
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
    geometry.setAttribute(
        'normal',
        new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
    geometry.setAttribute(
        'uv',
        new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));

    let sprite = new THREE.TextureLoader().load("https://previews.123rf.com/images/akiyoko/akiyoko1809/akiyoko180900051/108410284-traditional-japanese-pattern-origami-paper-texture-background.jpg");

    //var material = new THREE.MeshBasicMaterial( {map: sprite, side: THREE.DoubleSide });
    var material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, map: sprite });
    var object = new THREE.Mesh( geometry, material );

    globalMainObject = object;

    scene.add(object);
}


function createFigure1() {
    const parentObject = new THREE.Object3D();

    const trianglePlane1 = new TrianglePlaneGeometry(20, 10, 20);
    trianglePlane1.object.rotateZ(degToRad(90));
    trianglePlane1.object.rotateX(degToRad(30));
    trianglePlane1.object.position.x = -cos(degToRad(30)) * 10;

    const trianglePlane2 = new TrianglePlaneGeometry(20, 10, 20);
    trianglePlane2.setTexture("https://previews.123rf.com/images/akiyoko/akiyoko1809/akiyoko180900074/108428809-traditional-japanese-pattern-origami-paper-texture-background.jpg");

    trianglePlane2.object.rotateZ(degToRad(-90));
    trianglePlane2.object.rotateX(degToRad(30));
    trianglePlane2.object.position.x = cos(degToRad(30)) * 10;


    parentObject.add(trianglePlane1.object);
    parentObject.add(trianglePlane2.object);
    globalMainObject = parentObject;
    scene.add(parentObject);
}

<<<<<<< HEAD
=======

//Dado que o enunciado nao 'e claro em relacao se podemos utilizar custom object gerado com shape geometry estou a fazer assim
function createFigure1Test() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 20); //Left Corner
    shape.lineTo(-20, 0);   //Bottom Right Corner
    shape.lineTo(0, -20);   //Top          Corner
    shape.lineTo(20, 0);   //Top          Corner

    const geometry = new THREE.ShapeGeometry(shape);

    const default_material = new THREE.MeshBasicMaterial( {
        wireframe: false,
        side: THREE.DoubleSide ,
    });
    const object = new THREE.Mesh( geometry, default_material);
    globalMainObject = object;
    scene.add(object);
}


function createFigure1Buffer() {
    const geometry = new THREE.BufferGeometry()
    const vertices = new Float32Array( [
          0,           -20,  0,
         20*cos(PI/6),   0, 20*sin(PI/6),
          0,            20,  0,

          0,            20,  0,
        -20*cos(PI/6),   0, 20*sin(PI/6),
          0,           -20,  0
    ] );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

    const material = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );

    const figure = new THREE.Mesh( geometry, material );

    globalMainObject = figure;
    scene.add(figure);
}




>>>>>>> a9d62575c096fafc39a647e8b250a452cd318a9d
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
    object_material;

    constructor(c1, c2, c3, custom_material) {
        const shape = new THREE.Shape();
        shape.moveTo(- c1, - c2); //Bottom Left  Corner
        shape.lineTo(c3, - c2);   //Bottom Right Corner
        shape.lineTo(0, c2);   //Top          Corner

        this.geometry = new THREE.ShapeGeometry(shape);

        const material2 = this.genarateTextureMaterialFromUrl();

        if(custom_material) {
            this.object = new THREE.Mesh( this.geometry, custom_material);
            this.object_material = custom_material;
        } else {
            const default_material = new THREE.MeshBasicMaterial( {
                wireframe: false,
                side: THREE.DoubleSide ,
            });
            this.object = new THREE.Mesh( this.geometry, material2);
            this.object_material = default_material;
        }

    }

    setMaterial(new_material) {
        this.object = new THREE.Mesh( this.geometry, new_material);
    }

    setTexture(textureLink) {
        const material = this.genarateTextureMaterialFromUrl(textureLink);
        this.setMaterial(material);
    }

    //Gera e retorna um material com uma textura
    genarateTextureMaterialFromUrl(textureLink) {
        var texture
        if(textureLink) {
            texture = new THREE.TextureLoader().load( textureLink );
        } else { //Default Case
            texture = new THREE.TextureLoader().load( "https://previews.123rf.com/images/akiyoko/akiyoko1809/akiyoko180900051/108410284-traditional-japanese-pattern-origami-paper-texture-background.jpg" );

        }

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 1 / 50, 1 / 50 );
        texture.offset.set( 0.1, 0.1 );
        var material = new THREE.MeshBasicMaterial( {
            map: texture,
            side: THREE.DoubleSide
        });
        return material
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