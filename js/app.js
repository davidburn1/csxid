const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;
const BrowserRouter = ReactRouterDOM.BrowserRouter;
const Router = ReactRouterDOM.HashRouter;
const Routes = ReactRouterDOM.Routes;
const Switch = ReactRouterDOM.Switch;

const Alert = ReactBootstrap.Alert;

const Container = ReactBootstrap.Container;
const Nav = ReactBootstrap.Nav;
const Navbar = ReactBootstrap.Navbar;
const NavDropdown = ReactBootstrap.NavDropdown;

const Table = ReactBootstrap.Table;


const Button = ReactBootstrap.Button;
const ToggleButton = ReactBootstrap.ToggleButton;
const Card = ReactBootstrap.Card;

const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;

const Form = ReactBootstrap.Form;

const useMemo = React.useMemo;


// import { Canvas, useFrame } from 'https://esm.sh/@react-three/fiber'


// import { Canvas, useFrame, useLoader, useThree,  } from '@react-three/fiber';

// import { OrbitControls } from '@react-three/drei'


import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.152.2/three.module.min.js";

// https://cdn.jsdelivr.net/npm/three-addons@1.2.0/build/three-addons.min.js

// import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three-addons@1.2.0/build/three-addons.min.js';
// import threeOrbitcontrols from 'https://cdn.jsdelivr.net/npm/three-orbitcontrols@2.110.3/+esm'
// import threeOrbitcontrols from 'https://cdn.jsdelivr.net/npm/three-orbitcontrols@2.110.3/+esm'

// import {OrbitControls} from "./js/OrbitControls2.js";
// import threeOrbitcontrols from 'https://cdn.jsdelivr.net/npm/three-orbitcontrols@2.110.3/+esm';
// console.log(threeOrbitcontrols);

// const OrbitControls = THREE.OrbitControls;
// const OrbitControls = threeOrbitControls;


const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffff00 );

const camera = new THREE.PerspectiveCamera( 2, window.innerWidth / window.innerHeight, 0.1, 10000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

// const controls = new OrbitControls( camera, renderer.domElement );
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( -100, 50, -100 );
camera.position.set( -100, 50, 100 );
// controls.update();



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

  const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
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

scene.add(lighting());

// scene.add(lighting());

const axesHelper = new THREE.AxesHelper( 200 );
scene.add( axesHelper );

var arrowPos = new THREE.Vector3( 0,0,0.01 );
scene.add( new THREE.ArrowHelper( new THREE.Vector3( 1,0,0 ), arrowPos, 2, 0x7F2020, 0.1, 0.1 ) ); // dir, origin, length, hex
scene.add( new THREE.ArrowHelper( new THREE.Vector3( 0,1,0 ), arrowPos, 2, 0x7F2020, 0.1, 0.1 ) );
scene.add( new THREE.ArrowHelper( new THREE.Vector3( 0,0,1 ), arrowPos, 2, 0x7F2020, 0.1, 0.1 ) );






const animate = function () {
  requestAnimationFrame( animate );
          // controls.update();
  // table.rotation.z += 0.005;

          // if (settings.scanEnabled) {
          //     rasterCounter = parseInt(Date.now()/1000*settings.scanSpeed) % (rasterPositions.length * 360/settings.rotationStepSize);

          //     sampleScanner.position.set((rasterPositions[rasterCounter% rasterPositions.length][0]), (rasterPositions[rasterCounter% rasterPositions.length][1] ), 0);


          //     sampleRotation.rotation.z = parseInt(rasterCounter / rasterPositions.length)  * settings.rotationStepSize * Math.PI/180;
          //     sampleCoursePositioning.position.x = settings.courseX * Math.cos(sampleRotation.rotation.z) - settings.courseY * Math.sin(sampleRotation.rotation.z);
          //     sampleCoursePositioning.position.y = settings.courseY * Math.cos(sampleRotation.rotation.z) + settings.courseX * Math.sin(sampleRotation.rotation.z);;
          //     // sampleCoursePositioning.position.x = settings.courseX;
          //     // sampleCoursePositioning.position.y = settings.courseY;


          // }

  // cube.rotation.y += 0.01;
  renderer.render( scene, camera );
};

animate();








import { GUI } from 'https://threejs.org/examples/jsm/libs/lil-gui.module.min.js';

const gui2 = new GUI()

const parameters = 
{
    tilt: 40,
    rotation: 0,
    x: 0, y: 30, z: 0,
    color: "#ff0000", // color (change "#" to "0x")
    opacity: 1, 
    visible: true,
    material: "Phong",
    reset: function() { resetCube() }
};

var folder1 = gui2.addFolder('Position');
var tilt = folder1.add( parameters, 'tilt' ).min(0).max(60).step(1).listen(console.log("tilt listen"));

var rotation = folder1.add( parameters, 'rotation' ).min(0).max(100).step(1).listen();
var cubeZ = folder1.add( parameters, 'z' ).min(-200).max(200).step(1).listen();
folder1.open();


tilt.onChange(function(value) {   
    table.rotation.x = -value*Math.PI/180;
});

rotation.onChange(function(value) {   
    sampleRotation.rotation.z = value*Math.PI/180;
    console.log(tilt);
    // tilt.set(0);
    parameters.tilt = 0;
});






function Heating() {

  

  // const context = React.useContext(myContext);
  // const data = context.data;
  // const updateData = context.updateData;
  
  // if (data == null){ return (<h1>loading</h1>) };
    
  return ( 
  <Container>
    <h1>Heating</h1>

    {/* <Canvas camera={{fov:80,  position: [-30, 0, 20], up:[0,0,1], near:2}} shadowMap style={{'height':1000+'px'}}>



    </Canvas> */}

  </Container> 
  );

}








const myContext = React.createContext(1);

class DataProvider extends React.Component {
  state = { data: null, loading: false, error: null, updateData:this.updateData };

  constructor(props) {
    super(props);
  }
  

  componentDidMount() {
  }

  render (){
    const { children } = this.props;
    return( <myContext.Provider value={this.state}> {children} </myContext.Provider>  );
  }
}










// function Navigation() {
//   const data = React.useContext(myContext).data;

//   return ( 
//   <Navbar bg="light" expand="md">
//   <Container fluid>

//     <Nav.Link as={Link} to="/"><Navbar.Brand >
//     <Switch>
//       <Route exact path="/"> 4 Mayotts Rd </Route>
//       <Route> <span className="d-none d-md-inline"> 4 Mayotts Rd</span> <i className="d-md-none  fa-solid fa-xl fa-chevron-left"></i> </Route>
//     </Switch>
//     </Navbar.Brand></Nav.Link>
    
//     <Navbar.Collapse id="basic-navbar-nav">
//       <Nav className="me-auto">
//           <Nav.Link as={Link} to="/heating">Heating</Nav.Link>
//           <Nav.Link as={Link} to="/hotWater">Hot water</Nav.Link>
//           <Nav.Link as={Link} to="/thaiLamps">Thai Lamps</Nav.Link>
//           <Nav.Link as={Link} to="/graphs">Graphs</Nav.Link>
//           <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
//           <Nav.Link as={Link} to="/meter">Meter</Nav.Link>
//       </Nav>
//     </Navbar.Collapse>

//     <div>
//       { (data==null) ?  <i className="fa-solid fa-xl fa-wifi text-danger"></i> : <i className="fa-solid fa-xl fa-wifi text-success"></i> }
//       &nbsp;
//     </div>
//   </Container>
//   </Navbar>
// );
// }



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
      return (
          <DataProvider>
            <Router>
              {/* <Navigation /> */}
              <Container fluid>
                <Switch>
                  <Route exact path="/"> <Heating /> </Route>
                </Switch>
              </Container>
            </Router>
          </DataProvider>
      );
    }
  }

const root = ReactDOM.createRoot( document.getElementById('root') );
root.render(<App />);
