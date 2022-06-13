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
    //createFigure3();

    const base = createBase(30, 150, 150);
    base.rotateX(degToRad(-10));
    base.rotateY(degToRad(-10));



    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.7 ).translateX(170)
                                                                        .translateY(50)
                                                                        .translateZ(150);
    scene.add( directionalLight );
    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );

    //createFigure1();
    //createFigure1Buffer();
    //createFigure1Test();
    clock = new THREE.Clock();
}


function createBase(h, w, l) {
    const heigth = h/3;

    //Base degree
    const geometryB = new THREE.BoxGeometry( w, heigth, l );
    const material = new THREE.MeshPhongMaterial({color: 0xffe6cc} );
    const cube = new THREE.Mesh( geometryB, material );

    const geometryM = new THREE.BoxGeometry( w, heigth, l * 2/3 );
    const cubeM = new THREE.Mesh( geometryM, material );
    cubeM.translateY(heigth);
    cubeM.translateZ(l * 1/6);

    const geometryT = new THREE.BoxGeometry(w, heigth, l * 1/3);
    const cubeT = new THREE.Mesh(geometryT, material);
    cubeT.translateZ(l * 1/6);
    cubeT.translateY(heigth);

    cubeM.add(cubeT);
    cube.add(cubeM);

    cube.rotateY(degToRad(180));

    //*********************************************************
    //      Figure 1
    //*********************************************************
    const figure1 = createFigure2(0.3);
    figure1.position.z += l * 1/3;
    figure1.position.x += w*-0.2;
    figure1.position.y += 3*heigth;
    cube.add(figure1);

    //*********************************************************
    //      Figure 2
    //*********************************************************
    const figure2 = createFigure3(0.3);
    figure2.position.y += 2*heigth;
    cube.add(figure2);

    //*********************************************************
    //      Figure 3
    //*********************************************************
    const figure3 = createFigure4(0.3);
    figure3.position.y += heigth;
    figure3.position.z += -l * 1.3/3;
    figure3.translateX(w*0.1);
    figure3.position.x += w*0.05;
    figure3.rotateY(degToRad(-45))

    cube.add(figure3);
    globalMainObject = cube;


    scene.add( cube );
    return cube;
}



//Figura 3 RENOMEAR DEPOIS
function createFigure4(u) {
    const vertices = [

        //R PART ====================================================
        //BODY
            //B1 top (V)
        { pos: [  0,  0,  0], norm: [ 0,  0,  1], uv: [0, 1], },
        { pos: [  100*u, -35*u,  10*u], norm: [ 0,  0,  1], uv: [0.5, 0], },
        { pos: [120*u,   0,  0], norm: [ 0,  0,  1], uv: [1, 1], },
            //B1 bot (V)
        { pos: [  0,  0,  0], norm: [ 0,  0,  1], uv: [0, 0], },
        { pos: [  100*u,  -35*u,  10*u], norm: [ 0,  0,  1], uv: [0, 0], },
        { pos: [  20*u,  -30*u,  10*u], norm: [ 0,  0,  1], uv: [0, 0], },

        //B2 top
        { pos: [  0,  0,  0], norm: [ 0,  0,  1], uv: [0, 1], },
        { pos: [  20*u,  -30*u,  10*u], norm: [ 0,  0,  1], uv: [0, 0], },
        { pos: [  70*u,  0,  10*u], norm: [ 0,  0,  1], uv: [1, 1], },

        //B2 bot
        { pos: [  70*u,  0*u,  10*u], norm: [ 0,  0,  1], uv: [0.5, 1], },
        { pos: [  20*u,  -30*u,  10*u], norm: [ 0,  0,  1], uv: [0, 0], },
        { pos: [  100*u,  -35*u,  10*u], norm: [ 0,  0,  1], uv: [1, 0], },

        //NECK
            //N back
        { pos: [  20*u,  -30*u,  10*u], norm: [ 0,  0,  1], uv: [1, 0], },
        { pos: [  20*u,  80*u,  10*u], norm: [ 0,  0,  1], uv: [1, 1], },
        { pos: [  0,  0,  0], norm: [ 0,  0,  1], uv: [0, 0.25], },
            //N front
        { pos: [  0,  0,  0], norm: [ 0,  0,  1], uv: [0, 0], },
        { pos: [  20*u,  80*u,  10*u], norm: [ 0,  0,  1], uv: [1, 0.5], },
        { pos: [  15*u,  85*u,  0], norm: [ 0,  0,  1], uv: [0.5, 1], },

        //HEAD
        { pos: [  20*u,  80*u,  10*u], norm: [ 0,  0,  1], uv: [1, 1], },
        { pos: [  15*u,  85*u,  0], norm: [ 0,  0,  1], uv: [0.5, 1], },
        { pos: [  -10*u,  60*u,  0], norm: [ 0,  0,  1], uv: [0, 0], },

        //L PART ====================================================
        //BODY
        //B1 top
        { pos: [  0,  0,  0], norm: [ 0,  0,  1], uv: [1, 1], },
        { pos: [  100*u, -35*u,  -10*u], norm: [ 0,  0,  1], uv: [0.5, 0], },
        { pos: [120*u,   0,  0], norm: [ 0,  0,  1], uv: [0, 1], },
        //B1 bot
        { pos: [  0,  0,  0], norm: [ 0,  0,  1], uv: [1, 1], },
        { pos: [  100*u,  -35*u,  -10*u], norm: [ 0,  0,  1], uv: [0, 0], },
        { pos: [  20*u,  -30*u,  -10*u], norm: [ 0,  0,  1], uv: [0.5, 0], },

        //B2 top
        { pos: [  0,  0,  0], norm: [ 0,  0,  1], uv: [1, 1], },
        { pos: [  20*u,  -30*u,  -10*u], norm: [ 0,  0,  1], uv: [0.7, 0], },
        { pos: [  70*u,  0,  -10*u], norm: [ 0,  0,  1], uv: [0, 1], },
        //B2 bot
        { pos: [  70*u,  0,  -10*u], norm: [ 0,  0,  1], uv: [0.5, 1], },
        { pos: [  20*u,  -30*u, -10*u], norm: [ 0,  0,  1], uv: [1, 0], },
        { pos: [  100*u,  -35*u,  -10*u], norm: [ 0,  0,  1], uv: [0, 0], },

        //NECK
            //N back
        { pos: [  20*u,  -30*u,  -10*u], norm: [ 0,  0,  1], uv: [0, 0], },
        { pos: [  20*u,  80*u,  -10*u], norm: [ 0,  0,  1], uv: [0, 1], },
        { pos: [  0,  0,  0], norm: [ 0,  0,  1], uv: [1, 0.2], },
            //N front
        { pos: [  0,  0,  0], norm: [ 0,  0,  1], uv: [1, 0], },
        { pos: [  20*u,  80*u,  -10*u], norm: [ 0,  0,  1], uv: [0.5, 1], },
        { pos: [  15*u,  85*u,  0], norm: [ 0,  0,  1], uv: [0, 1], },

        //HEAD
        { pos: [  20*u,  80*u,  -10*u], norm: [ 0,  0,  1], uv: [1, 1], },
        { pos: [  15*u,  85*u,  0*u], norm: [ 0,  0,  1], uv: [0.5, 1], },
        { pos: [  -10*u,  60*u,  0], norm: [ 0,  0,  1], uv: [0, 0], },
    ];

    const geometry = getGeometry(vertices);

    let sprite = new THREE.TextureLoader().load("https://previews.123rf.com/images/akiyoko/akiyoko1809/akiyoko180900051/108410284-traditional-japanese-pattern-origami-paper-texture-background.jpg");
    //var material = new THREE.MeshBasicMaterial( {map: sprite, side: THREE.DoubleSide });
    var material = new THREE.MeshPhongMaterial( { side: THREE.DoubleSide, wireframe: false, map: sprite, shading: THREE.FlatShading});
    var object = new THREE.Mesh( geometry, material );

    globalMainObject = object;
    object.translateY(15*u);
    scene.add(object);
    return object;
}

function getPositions(vertices) {
    var positions = [];
    for (const vertex of vertices) {
        positions.push(...vertex.pos);
    }
    return positions;
}


function getNormals(vertices) {
    const normals = [];
    for (const vertex of vertices) {
        normals.push(...vertex.norm);
    }
    return normals;
}

function getUvs(vertices) {
    const uvs = [];
    for (const vertex of vertices) {
        uvs.push(...vertex.uv);
    }
    return uvs;
}

function getGeometry(vertices) {
    const positions = getPositions(vertices);
    const normals = getNormals(vertices);
    const uvs = getUvs(vertices);

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

    return geometry;
}


function createFigure3(u) {
    const vertices = [
        //Back L
            //Up T
        { pos: [  0,  20*u,  -5*u], norm: [ 0,  0,  1], uv: [0, 0], },
        { pos: [-20*u,   0,  0], norm: [ 0,  0,  1], uv: [1, 0], },
        { pos: [  0, -10*u,  -5*u], norm: [ 0,  0,  1], uv: [0, 1], },
            //Bot T
        { pos: [  0,   -10*u,  -5*u], norm: [ 0,  0,  1], uv: [0.5, 1], },
        { pos: [  -20*u, 0,  0], norm: [ 0,  0,  1], uv: [0, 1], },
        { pos: [  0,   -70*u,  -5*u], norm: [ 0,  0,  1], uv: [1, 0], },

        //Back R
            //Up T
        { pos: [  0,  20*u,  -5*u], norm: [ 0,  0,  1], uv: [0, 0], },
        { pos: [20*u,   0,  0], norm: [ 0,  0,  1], uv: [1, 0], },
        { pos: [  0, -10*u,  -5*u], norm: [ 0,  0,  1], uv: [0, 1], },
            //Bot T
        { pos: [  0,   -10*u,  -5*u], norm: [ 0,  0,  1], uv: [0.5, 1], },
        { pos: [  20*u, 0,  0], norm: [ 0,  0,  1], uv: [0, 1], },
        { pos: [  0,   -70*u,  -5*u], norm: [ 0,  0,  1], uv: [0.5, 0], },


        //Front 1 L
        { pos: [  -20*u,  0,  0], norm: [ 0,  0,  1], uv: [0, 1], },
        { pos: [   0,  -70*u,  -5*u], norm: [ 0,  0,  1], uv: [0.5, 0], },
        { pos: [    -3*u,  -10*u,  -10*u], norm: [ 0,  0,  1], uv: [0.5, 1], },

        //Front 2 L
        { pos: [  -3*u,  -10*u,  -10*u], norm: [ 0,  0,  1], uv: [0.5, 1], },
        { pos: [  -15*u,  -15*u,  -2*u], norm: [ 0,  0,  1], uv: [0, 1], },
        { pos: [  0,  -70*u,  -5*u], norm: [ 0,  0,  1], uv: [0.5, 0], },

        //Front 1 R
        { pos: [  20*u,  0,  0], norm: [ 0,  0,  1], uv: [1, 1], },
        { pos: [   0,  -70*u,  -5*u], norm: [ 0,  0,  1], uv: [0.5, 0], },
        { pos: [    3*u,  -10*u,  -10*u], norm: [ 0,  0,  1], uv: [0.5, 1], },

        //Front 2 R
        { pos: [  3*u,  -10*u,  -10*u], norm: [ 0,  0,  1], uv: [0.5, 1], },
        { pos: [  15*u,  -15*u,  -2*u], norm: [ 0,  0,  1], uv: [0, 1], },
        { pos: [  0,  -70*u,  -5*u], norm: [ 0,  0,  1], uv: [0.5, 0], },
    ];

    const geometry = getGeometry(vertices);

    let sprite = new THREE.TextureLoader().load("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/86f34523-ed7d-4609-9030-10454cdeb829/d2m48nr-9730f9d7-cbf3-4047-89bd-62b8255fd114.png");
    //var material = new THREE.MeshBasicMaterial( {map: sprite, side: THREE.DoubleSide });
    var material = new THREE.MeshPhongMaterial( { side: THREE.DoubleSide, wireframe: false, map: sprite, shading: THREE.FlatShading});
    var object = new THREE.Mesh( geometry, material );

    globalMainObject = object;
    object.translateY(50*u);
    scene.add(object);
    return object;
}






function createFigure2(u) {
    const vertices = [
        { pos: [  0,  20*u,  -5*u], norm: [ 0,  0,  1], uv: [0, 0], },
        { pos: [-20*u,   0,  1*u], norm: [ 0,  0,  1], uv: [1, 0], },
        { pos: [  0, -20*u,  -5*u], norm: [ 0,  0,  1], uv: [0, 1], },

        { pos: [ 0,  20*u,  -5*u], norm: [ 0,  0,  1], uv: [0, 1], },
        { pos: [ 0, -20*u,  -5*u], norm: [ 0,  0,  1], uv: [1, 0], },
        { pos: [ 20*u,  0,  1*u], norm: [ 0,  0,  1], uv: [1, 1], },

    ];

    const geometry = getGeometry(vertices);
    let sprite = new THREE.TextureLoader().load("https://previews.123rf.com/images/akiyoko/akiyoko1809/akiyoko180900074/108428809-traditional-japanese-pattern-origami-paper-texture-background.jpg");
    //var material = new THREE.MeshBasicMaterial( {map: sprite, side: THREE.DoubleSide });
    var material = new THREE.MeshPhongMaterial( { side: THREE.DoubleSide, wireframe: false, map: sprite, shading: THREE.FlatShading});
    var object = new THREE.Mesh( geometry, material );

    globalMainObject = object;
    object.translateY(10*u);
    scene.add(object);
    return object;
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
    camera1.translateZ(150).lookAt(scene.position);
    
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
                globalMainObject.rotateX(degToRad(10));

            }
            break;
        case "KeyS":
            if (addKey(e.code)) {
                //TODO
                globalMainObject.rotateX(degToRad(-10));

            }
            break;
        case "KeyD":
            if (addKey(e.code)) {
                //TODO
            }
            break;
        case "KeyZ":
            if (addKey(e.code)) {
                globalMainObject.rotateY(degToRad(10));
                //TODO
            }
            break;
        case "KeyX":
            if (addKey(e.code)) {
                globalMainObject.rotateY(degToRad(-10));
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