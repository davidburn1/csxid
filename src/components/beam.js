import * as THREE from "three";


export function Beam(props) {

    //diameter
    var beamSizeAtZonePlate = 0.1/2; // diameter (mm)
    var beamSizeAtSample = 0.01 /2;


    const beam = new THREE.Group();

    const beamMaterial = new THREE.MeshBasicMaterial( {color: 0xbbff00, opacity:0.4, transparent:true} );

    // beam before the zone plate
    var geometry = new THREE.CylinderGeometry( beamSizeAtZonePlate*2, beamSizeAtZonePlate*2, 3, 32 ); // radius1, radius2, height, radius segments,
    var mesh = new THREE.Mesh( geometry.rotateX(-Math.PI/2), beamMaterial );
    beam.add( mesh.translateZ(-1.5-3 ) );

    const geometry7 = new THREE.CylinderGeometry( 0.2/2, beamSizeAtSample, 3, 32 ); // radius1, radius2, height, radius segments,
    const cone7 = new THREE.Mesh( geometry7.rotateX(-Math.PI/2), beamMaterial );
    beam.add( cone7.translateZ(-1.5) );

    // beam scatter after sample - 10 degrees half angle
    const exitBeamAngle = Math.PI/180 * 10;
    const exitBeamLength = 70; // mm
    const geometry8 = new THREE.CylinderGeometry( beamSizeAtSample, exitBeamLength * Math.tan(exitBeamAngle), exitBeamLength, 32 ); // radius1, radius2, height, radius segments,
    const cone8 = new THREE.Mesh( geometry8.rotateX(-Math.PI/2), beamMaterial );
    beam.add( cone8.translateZ(exitBeamLength/2) );


    // detector
    // var detector = new THREE.Mesh(
    //         new THREE.ShapeBufferGeometry( square(25) ),
    //         new THREE.MeshBasicMaterial({ color: 0x220000, opacity:0.5, transparent:true, side:THREE.DoubleSide})
    // );
    // beam.add( detector.translateZ(exitBeamLength+0.5) );

   
    return (
        <primitive object={beam} {...props} />
    )
    
}


