import React, { useRef , useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Card, Row, Col , Stack, Tab, Tabs} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';


// import {  useFrame  } from '@react-three/fiber';


function GUILine(props){
    return(
    <Row>
        <Col sm={4}>
            <Form.Label> {props.name} </Form.Label>
        </Col>
        <Col sm={3}>
            <Form.Control type="numeric" name={props.name} value={props.data[props.name]} onChange={(e) => props.setData(props.name, e.target.value)}/> 
        </Col>
        <Col sm={5}>
            <Form.Range   type="numeric" value={props.data[props.name]} onChange={(e) => props.setData(props.name, e.target.value)} {...props} />
        </Col>
    </Row>
    );
}



export function GUIControls(props) {

    // useFrame(({ clock }) => {
    //     const a = clock.getElapsedTime()
    //     console.log(a) // the value will be 0 at scene initialization and grow each frame
    //     // props.setData('clock',a);
    //     // laminographyRotation = a*10;
    //     // laminographyRotation.current.rotation.z = a*2;
    //     // laminographyTilt.current.rotation.x = tiltobj.rotation;
    //     // console.log(tiltobj.rotation);
    //   })




    return (
            <Card className="position-absolute top-0 end-0" style={{ width: '25rem' }}>
                <Card.Body>

                <GUILine data={props.data} setData={props.setData} name='tilt' min={0} max={60} />

                <Tabs className="mb-3" activeKey={props.data.coordinateSystem} onSelect={(k) => props.setData('coordinateSystem', k)} >
                <Tab eventKey="scan" title="Scan">
                        Move the sample in the scanning coordinate system
                        <GUILine data={props.data} setData={props.setData} name='scanX' min={-1} max={1} step={0.01}/>
                        <GUILine data={props.data} setData={props.setData} name='scanY' min={-1} max={1} step={0.01}/>
                        <GUILine data={props.data} setData={props.setData} name='rotation' min={-180} max={180} step={1}/>
                    </Tab>

                    {/* <Tab eventKey="scanPos" title="ScanPos">
                        <Form.Check type="switch" id="custom-switch" label="Scan" />
                        <GUILine data={props.data} setData={props.setData} name='scanPosX' min={-0.1} max={0.1} step={0.01}/>
                        <GUILine data={props.data} setData={props.setData} name='scanPosY' min={-0.1} max={0.1} step={0.01}/>

                        <GUILine data={props.data} setData={props.setData} name='scanPosXHome' min={-1} max={1} step={0.01}/>
                        <GUILine data={props.data} setData={props.setData} name='scanPosYHome' min={-1} max={1} step={0.01}/>

                    </Tab> */}

                    <Tab eventKey="sample" title="Sample">
                        Move the beam in the sample coordinate system
                        <GUILine data={props.data} setData={props.setData} name='sampleX' min={-1} max={1} step={0.01}/>
                        <GUILine data={props.data} setData={props.setData} name='sampleY' min={-1} max={1} step={0.01}/>
                        <GUILine data={props.data} setData={props.setData} name='sampleRotation' min={-180} max={180} step={1}/>
                    </Tab>
                </Tabs>
                
                

                </Card.Body>
              </Card>
    )
    
}




