
import * as THREE from "three";

import './App.css';

import React, { useRef, useState } from "react";



import { Canvas, useFrame, useLoader, useThree,  } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';


import { Sample, FZP, OSA, ScanPositionMarkers } from './components/sample.js';
import { Beam } from './components/beam.js';
import { GUIControls } from './components/controls.js';




function PlotAxes(props) {
  const group = new THREE.Group();
  const length = 0.4;
  const headLength = 0.08;
  const headWdith = 0.08;
  group.add( new THREE.ArrowHelper( new THREE.Vector3( 1,0,0 ), new THREE.Vector3( -0, -0, 0.01 ), length, 0xff0000, headLength, headWdith ) ); 
  group.add( new THREE.ArrowHelper( new THREE.Vector3( 0,1,0 ), new THREE.Vector3( -0, -0, 0.01 ), length, 0x00ff00, headLength, headWdith ) );
  group.add( new THREE.ArrowHelper( new THREE.Vector3( 0,0,1 ), new THREE.Vector3( -0, -0, 0.01 ), length, 0x0000ff, headLength, headWdith ) );
  return (<primitive object={group}  {...props} />);
}



function QMI(props) {


  const laminographyRotation = useRef();


  useFrame(({ clock }) => {
    const a = clock.getElapsedTime()
    // console.log(a) // the value will be 0 at scene initialization and grow each frame
    // props.setData('clock',a);
    // laminographyRotation = a*10;
    // laminographyRotation.current.rotation.z = a*2;
    // laminographyTilt.current.rotation.x = tiltobj.rotation;
    // console.log(tiltobj.rotation);
  })

  // console.log(laminographyRotation);

  console.log("qmi render");

  return (
    <group>
      {/* <PlotAxes/> */}
      <group rotation={[(-props.data.tilt * Math.PI / 180), 0, 0]} >


        <group  position={[props.data.scanPosX, props.data.scanPosY,0]}> 


          <PlotAxes/> 
          {/* {(props.data.coordinateSystem == 'scan') ?  <PlotAxes/> : ''}
          {(props.data.coordinateSystem == 'sample') ?  <PlotAxes rotation={[0, 0, (props.data.rotation * Math.PI / 180)]}/> : ''} */}

            <group  position={[props.data.scanX, props.data.scanY,0]}>

            {/* {(props.data.coordinateSystem == 'scan') ?  <PlotAxes/> : ''} */}
            {/* {(props.data.coordinateSystem == 'sample') ?  <PlotAxes rotation={[0, 0, (props.data.rotation * Math.PI / 180)]}/> : ''}  */}

              <group  rotation={[0, 0, (props.data.rotation * Math.PI / 180)]} ref={laminographyRotation}>
                <PlotAxes/> 
                <Sample  />
              </group>
            </group>
          </group>
          </group>


      <group rotation={[(-props.data.tilt * Math.PI / 180), 0, 0]} >
        <group  position={[props.data.scanPosX, props.data.scanPosY,0]}> 
          {/* <PlotAxes/> */}
          <ScanPositionMarkers tilt={props.data.tilt} />
        </group>
      </group>
   


      <FZP position={[0, 0, -3]}/>
      <OSA position={[0, 0, -1.5]}/>

      <Beam />

    </group>
  );
}






function App() {

  var tilt=60;
  var scanSize = 0.08 + 0.00001;
  var scanSizeY = scanSize /(Math.cos(tilt*Math.PI/180));
  var scanStepX = 0.01;
  var scanStepY = scanStepX /(Math.cos(tilt*Math.PI/180));;

  var scanPositionList = [];
  for (var i=-scanSizeY/2; i<scanSizeY/2; i+=scanStepY) {
      for (var j=-scanSize/2; j<scanSize/2; j+=scanStepX) {
        scanPositionList.push([j,i]);
      }
  }



  const [data, setData] = useState({ 
    coordinateSystem: 'scan',
    tilt: 60, 
    rotation:0,
    sampleRotation:0, 
    scanX:0, scanY:0,
    scanPosX:0, scanPosY:0,
    scanPosXHome:0, scanPosYHome:0,
    scanPositionList:scanPositionList,


    sampleX:0, sampleY:0 });






  function rotate(th,x,y){
    th = th * Math.PI/180
    var newX = Math.cos(th)*x - Math.sin(th)*y;
    var newY = Math.sin(th)*x + Math.cos(th)*y;
    return [newX, newY];
  }



  const handleChange = (key, value) => {  
    var updates = {...data};


    if (key == "sampleX"){  
      [updates['scanX'], updates['scanY']] = rotate(data.sampleRotation, value, data.sampleY);
    } 
    if (key == "sampleY"){  
      [updates['scanX'], updates['scanY']] = rotate(data.sampleRotation, data.sampleX, value);
    } 
    if (key == "sampleRotation"){  
      [updates['scanX'], updates['scanY']] = rotate(value, data.sampleX, data.sampleY);
      updates['rotation'] = value;
    } 

    if (key == "scanX"){  
      [updates['sampleX'], updates['sampleY']] = rotate(-data.rotation, value, data.scanY);
    } 
    if (key == "scanY"){  
      [updates['sampleX'], updates['sampleY']] = rotate(-data.rotation, data.scanX, value);
    } 
    if (key == "rotation"){  
      [updates['sampleX'], updates['sampleY']] = rotate(-value, data.scanX, data.scanY);
      updates['sampleRotation'] = value;
    } 

    updates[key] = value;
    setData(updates);
  };


  return (

    <div className="App">

      <Canvas camera={{fov:80,  position: [-20, 10, 10], up:[0,1,0], near:0.1, far:10000}} shadowMap style={{'height':1000+'px'}}>
        <ambientLight args={[0x333333]}/>
        <pointLight args={[0x888888, 1, 0]} position={[0, 0, 40]} castShadow={true} />


        <gridHelper args={[100,10]} rotation={[0,0,0]} position={[0,0,0]}/>
        {/* <axesHelper args={[5]} />    */}
        {/* RGB XYZ */}

        <QMI data={data} setData={handleChange}/>
        <OrbitControls />
      </Canvas>

      <GUIControls data={data} setData={handleChange}/>

    </div>
  );
}

export default App;
