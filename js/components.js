// sample

function SiN_membrane(){
    const sample = new THREE.Group();

    const frameMaterial = new THREE.MeshStandardMaterial( { color: 0xaaaaaa, roughness:0 } );
    sample.add( new THREE.Mesh( new THREE.BoxGeometry(1,3,0.2).translate( 1, 0, -0.1 ), frameMaterial ) );
    sample.add( new THREE.Mesh( new THREE.BoxGeometry(1,3,0.2).translate( -1, 0, -0.1 ), frameMaterial ) );
    sample.add( new THREE.Mesh( new THREE.BoxGeometry(1,1,0.2).translate( 0, 1, -0.1 ), frameMaterial ) );
    sample.add( new THREE.Mesh( new THREE.BoxGeometry(1,1,0.2).translate( 0, -1, -0.1 ), frameMaterial ) );

    sample.add( new THREE.Mesh( 
        new THREE.BoxGeometry(1,1,0.01).translate( 0, 0, -0.005 ), 
        new THREE.MeshStandardMaterial( { roughness: 0, opacity:0.8, transparent:true} )
    ));

    sample.add( new THREE.ArrowHelper( new THREE.Vector3( 1,0,0 ), new THREE.Vector3( -0, -0, 0.01 ), 0.5, 0xff00ff, 0.1, 0.1 ) );
    sample.add( new THREE.ArrowHelper( new THREE.Vector3( 0,1,0 ), new THREE.Vector3( -0, -0, 0.01 ), 0.5, 0xff00ff, 0.1, 0.1 ) );

    return sample
}




function square(size){
    var shape = new THREE.Shape();
    shape.moveTo( -size/2,-size/2 );
    shape.lineTo( -size/2, size/2 );
    shape.lineTo( size/2, size/2 );
    shape.lineTo( size/2, -size/2 );
    shape.lineTo( -size/2, -size/2 );
    return shape;
}

function ring(inner, outer){
    var ring = new THREE.Shape();
    ring.moveTo( outer/2 ,0);
    ring.absarc( 0, 0, outer/2, 0, Math.PI*2, true );
    ring.lineTo( inner/2,0 );
    ring.absarc( 0, 0, inner/2, 0, Math.PI*2, false );
    ring.lineTo( outer/2,0 );
    return ring;
}



function FZP() {
    const group = new THREE.Group();

    const frameSize=3;
    const frameMaterial = new THREE.MeshStandardMaterial( { color: 0xeeeeee, roughness:0 } );
    group.add( new THREE.Mesh( new THREE.BoxGeometry(frameSize,  frameSize/3,0.2).translate( 0, -frameSize/3, -0.1 ), frameMaterial ) ); // bottom
    group.add( new THREE.Mesh( new THREE.BoxGeometry(frameSize/3,frameSize/3,0.2).translate( -frameSize/3, 0, -0.1 ), frameMaterial ) ); // side
    group.add( new THREE.Mesh( new THREE.BoxGeometry(frameSize/3,frameSize/3,0.2).translate(  frameSize/3, 0, -0.1 ), frameMaterial ) ); // side
    // group.add( new THREE.Mesh( new THREE.BoxGeometry(frameSize,  frameSize/3/2,0.2).translate( 0, +frameSize/3/2, -0.1 ), frameMaterial ) ); // bottom


    shape = square(1);
    // shape.holes.push( ring(8,9) );
    // shape.holes.push( ring(6,7) );
    // shape.holes.push( ring(4,5) );

    shape.holes.push( ring(0.18,0.2) );
    shape.holes.push( ring(0.14,0.16) );
    shape.holes.push( ring(0.10,0.12) );
    
    var mesh = new THREE.Mesh(
        new THREE.ShapeBufferGeometry( shape ),
        new THREE.MeshStandardMaterial({ color: 0xaaaa00, side:THREE.DoubleSide})
    );
    group.add(mesh)
    return group;
}

function OSA() {
    const group = new THREE.Group();

    const frameSize=3;
    const frameMaterial = new THREE.MeshStandardMaterial( { color: 0xeeeeee, roughness:0 } );
    group.add( new THREE.Mesh( new THREE.BoxGeometry(frameSize,  frameSize/3,0.2).translate( 0, -frameSize/3, -0.1 ), frameMaterial ) ); // bottom
    group.add( new THREE.Mesh( new THREE.BoxGeometry(frameSize/3,frameSize/3,0.2).translate( -frameSize/3, 0, -0.1 ), frameMaterial ) ); // side
    group.add( new THREE.Mesh( new THREE.BoxGeometry(frameSize/3,frameSize/3,0.2).translate(  frameSize/3, 0, -0.1 ), frameMaterial ) ); // side


    shape = square(1);
    shape.holes.push( ring(0,0.1) );

    var mesh = new THREE.Mesh(
        new THREE.ShapeBufferGeometry( shape ),
        new THREE.MeshBasicMaterial({ color: 0x666600, side:THREE.DoubleSide})
    );
    group.add(mesh);
    return group;
}




function lighting() {
    const lights = new THREE.Group();
    			// Lights

                lights.add( new THREE.AmbientLight( 0x404040 ) );

    // spotLight = new THREE.SpotLight( 0xffffff );
    // spotLight.name = 'Spot Light';
    // spotLight.angle = Math.PI / 5;
    // spotLight.penumbra = 0.3;
    // spotLight.position.set( 10, 10, 5 );
    // spotLight.castShadow = true;
    // spotLight.shadow.camera.near = 8;
    // spotLight.shadow.camera.far = 30;
    // spotLight.shadow.mapSize.width = 1024;
    // spotLight.shadow.mapSize.height = 1024;
    // scene.add( spotLight );

    // scene.add( new THREE.CameraHelper( spotLight.shadow.camera ) );

    dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.name = 'Dir. Light';
    dirLight.position.set( 0, 10, 10 );
    dirLight.castShadow = true;
    // dirLight.shadow.camera.near = 1;
    // dirLight.shadow.camera.far = 10;
    // dirLight.shadow.camera.right = 15;
    // dirLight.shadow.camera.left = - 15;
    // dirLight.shadow.camera.top	= 15;
    // dirLight.shadow.camera.bottom = - 15;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    lights.add( dirLight );

    // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

    return lights;
}


function beam(beamSizeAtSample){
    const out = new THREE.Group();
    var beamSizeAtZonePlate = 0.1; // diameter (mm)


    // beam
    const beamMaterial = new THREE.MeshBasicMaterial( {color: 0xbbff00, opacity:0.4, transparent:true} );

    // beam before the zone plate
    var geometry = new THREE.CylinderGeometry( beamSizeAtZonePlate*2, beamSizeAtZonePlate*2, 3, 32 ); // radius1, radius2, height, radius segments,
    var mesh = new THREE.Mesh( geometry.rotateX(-Math.PI/2), beamMaterial );
    out.add( mesh.translateZ(-1.5-3 -0.1) );

    // const geometry7 = new THREE.ConeGeometry( 0.2/2, 2.9, 32 ); // 200 um diameter zone plate
    const geometry7 = new THREE.CylinderGeometry( 0.2/2, beamSizeAtSample, 3, 32 ); // radius1, radius2, height, radius segments,
    const cone7 = new THREE.Mesh( geometry7.rotateX(-Math.PI/2), beamMaterial );
    out.add( cone7.translateZ(-1.5) );

    // beam out - 10 degrees half angle
    const exitBeamAngle = Math.PI/180*10
    const exitBeamLength = 70 // mm
    const geometry8 = new THREE.CylinderGeometry( beamSizeAtSample, exitBeamLength * Math.tan(exitBeamAngle), exitBeamLength, 32 ); // radius1, radius2, height, radius segments,
    // const geometry8 = new THREE.ConeGeometry( exitBeamLength * Math.tan(exitBeamAngle), exitBeamLength , 32 ); // radius, length , segments
    const cone8 = new THREE.Mesh( geometry8.rotateX(-Math.PI/2), beamMaterial );
    out.add( cone8.translateZ(exitBeamLength/2) );

    // detector
    var detector = new THREE.Mesh(
            new THREE.ShapeBufferGeometry( square(25) ),
            new THREE.MeshBasicMaterial({ color: 0x220000, opacity:0.5, transparent:true, side:THREE.DoubleSide})
    );
    out.add( detector.translateZ(exitBeamLength+0.5) );

    return out;
}


function hallbachMagnets(){
    const out = new THREE.Group();

    var magnetDiameter = 10; //  (mm)
    var magnetLength = 30;
    var magnetSeparation = 20;

    const material = new THREE.MeshStandardMaterial( {color: 0x709998} );

    var geometry = new THREE.CylinderGeometry( magnetDiameter/2, magnetDiameter/2, magnetLength, 32 ); // radius1, radius2, height, radius segments,
    var magnet1 = new THREE.Mesh( geometry, material );
    magnet1.position.x = magnetSeparation/2;
    magnet1.position.z = magnetSeparation/2;
    out.add( magnet1 );
    var magnet2 = new THREE.Mesh( geometry, material );
    magnet2.position.x = -magnetSeparation/2;
    magnet2.position.z = magnetSeparation/2;
    out.add( magnet2 );
    var magnet3 = new THREE.Mesh( geometry, material );
    magnet3.position.x = magnetSeparation/2;
    magnet3.position.z = -magnetSeparation/2;
    out.add( magnet3 );
    var magnet4 = new THREE.Mesh( geometry, material );
    magnet4.position.x = -magnetSeparation/2;
    magnet4.position.z = -magnetSeparation/2;
    out.add( magnet4 );

    return out;
}

// .rotateX(-Math.PI/2)
