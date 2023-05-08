import * as THREE from "three";



export function ScanPositionMarkers(props) {
    var scanSize = 0.08 + 0.00001;
    var scanSizeY = scanSize /(Math.cos(props.tilt*Math.PI/180));
    var scanStepX = 0.01;
    var scanStepY = scanStepX /(Math.cos(props.tilt*Math.PI/180));;

    var beamSizeAtSample = 0.005;

    var scanPositions = [];
    for (var i=-scanSizeY/2; i<scanSizeY/2; i+=scanStepY) {
        for (var j=-scanSize/2; j<scanSize/2; j+=scanStepX) {
            scanPositions.push([j,i]);
        }
    }

    const scanPositionMarkers = new THREE.Group();

    // scan points
    const circle = new THREE.Shape();
    circle.absellipse(0, 0, beamSizeAtSample, beamSizeAtSample/(Math.cos(props.tilt*Math.PI/180)), 0,  2 * Math.PI, ); //x,y r1, r2
    const points = circle.getPoints( 32 );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

    for (i=0; i<scanPositions.length; i++) {
        const ellipse = new THREE.Line( geometry, material );
        ellipse.position.x = scanPositions[i][0] ;
        ellipse.position.y = scanPositions[i][1] ;
        scanPositionMarkers.add(ellipse);
    }

    return(
        <primitive object={scanPositionMarkers} />
    );
}



export function Sample(props) {
    // var membraneSize = 1;
    var sampleSize = 3;
    // var frameWidth = (sampleSize - membraneSize) / 2;
    var frameThickness = 0.2;
    var membraneThickness = 0.01;
  
    const sample = new THREE.Group();
  
    const frameMaterial = new THREE.MeshStandardMaterial( { color: 0xaaaaff, roughness:0 } );
    sample.add( new THREE.Mesh( new THREE.BoxGeometry(1,3,0.2).translate( 1, 0, -(membraneThickness + frameThickness/2) ), frameMaterial ) );
    sample.add( new THREE.Mesh( new THREE.BoxGeometry(1,3,0.2).translate( -1, 0, -(membraneThickness + frameThickness/2) ), frameMaterial ) );
    sample.add( new THREE.Mesh( new THREE.BoxGeometry(1,1,0.2).translate( 0, 1, -(membraneThickness + frameThickness/2) ), frameMaterial ) );
    sample.add( new THREE.Mesh( new THREE.BoxGeometry(1,1,0.2).translate( 0, -1, -(membraneThickness + frameThickness/2) ), frameMaterial ) );
  
    sample.add( new THREE.Mesh( 
        new THREE.BoxGeometry(sampleSize,sampleSize,membraneThickness).translate( 0, 0, -membraneThickness/2 ), 
        new THREE.MeshStandardMaterial( { color: 0xaaaaff, roughness: 0, opacity:0.8, transparent:true} )
    ));
  
    return (
        <primitive object={sample} {...props} />
    )
    
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


export function FZP(props) {
    const group = new THREE.Group();

    const frameSize=3;
    const frameMaterial = new THREE.MeshStandardMaterial( { color: 0xeeeeee, roughness:0 } );
    group.add( new THREE.Mesh( new THREE.BoxGeometry(frameSize,  frameSize/3,0.2).translate( 0, -frameSize/3, -0.1 ), frameMaterial ) ); // bottom
    group.add( new THREE.Mesh( new THREE.BoxGeometry(frameSize/3,frameSize/3,0.2).translate( -frameSize/3, 0, -0.1 ), frameMaterial ) ); // side
    group.add( new THREE.Mesh( new THREE.BoxGeometry(frameSize/3,frameSize/3,0.2).translate(  frameSize/3, 0, -0.1 ), frameMaterial ) ); // side
    // group.add( new THREE.Mesh( new THREE.BoxGeometry(frameSize,  frameSize/3/2,0.2).translate( 0, +frameSize/3/2, -0.1 ), frameMaterial ) ); // bottom


    const shape = square(1);
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

    return (
        <primitive object={group} {...props} />
    )
    
}


export function OSA(props) {
    const group = new THREE.Group();

    const frameSize=3;
    const frameMaterial = new THREE.MeshStandardMaterial( { color: 0xeeeeee, roughness:0 } );
    group.add( new THREE.Mesh( new THREE.BoxGeometry(frameSize,  frameSize/3,0.2).translate( 0, -frameSize/3, -0.1 ), frameMaterial ) ); // bottom
    group.add( new THREE.Mesh( new THREE.BoxGeometry(frameSize/3,frameSize/3,0.2).translate( -frameSize/3, 0, -0.1 ), frameMaterial ) ); // side
    group.add( new THREE.Mesh( new THREE.BoxGeometry(frameSize/3,frameSize/3,0.2).translate(  frameSize/3, 0, -0.1 ), frameMaterial ) ); // side


    const shape = square(1);
    shape.holes.push( ring(0,0.1) );

    var mesh = new THREE.Mesh(
        new THREE.ShapeBufferGeometry( shape ),
        new THREE.MeshBasicMaterial({ color: 0x666600, side:THREE.DoubleSide})
    );
    group.add(mesh);
    return (
        <primitive object={group} {...props} />
    )    
}


