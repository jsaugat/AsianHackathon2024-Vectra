// import React, { useState } from 'react';
// import { Entity, Box, Sphere, Cylinder, Plane, Sky, Text, Scene } from 'react-aframe-ar';

// // Helper function to render the geometric shape based on the selected value
// const renderShape = (value) => {
//   switch (value) {
//     case 'cube':
//       return <Box position="0 1.5 -5" rotation="0 45 0" color="#4CC3D9" shadow />;
//     case 'sphere':
//       return <Sphere position="0 2.25 -5" radius="1.25" color="#EF2D5E" shadow />;
//     case 'doughnut':
//       return (
//         <>
//           <Entity
//             geometry={{ primitive: 'torus', radius: 2, tube: 0.2 }} // Adjust radius and tube
//             position="0 3 -5"
//             color="#4CC3D9"
//           />
//           <Entity particle-system={{ preset: 'snow' }} />
//         </>
//       );
//     case 'cylinder':
//       return (
//         <Cylinder
//           position="0 2.25 -5"
//           radius="1.5"
//           height="2.5"
//           color="#FFC65D"
//           style={{ fontWeight: "800" }}
//           shadow
//           animation__position="property: position; to: 0 3.5 -5; dur: 4000; easing: easeInOutQuad; loop: true"
//         />
//       );
//     case 'all':
//       return (
//         <>
//           <Text value="CUBE" align="center" position="0 1.5 1" color="black" style={{ fontWeight: "800" }} />
//           <Box position="0 1.5 0" color="#4CC3D9" shadow />
//           <Text value="SPHERE" align="center" position="3 1.5 -7" color="black" />
//           <Sphere position="3 1.5 -10" radius="1.25" color="#EF2D5E" shadow />

//           <Text value="GEOMETRY" align="center" position="0 2.3 -1.5" color="black" shadow />
//           <Text value="CYLINDER" align="center" position="0 1.7 -16" color="black" shadow />
//           <Cylinder
//             position="0 2.3 -20"
//             radius="1.5"
//             height="2.5"
//             color="#FFC65D"
//             shadow
//           />
//           <Text value="TORUS" align="center" position="0.5 2.3 -31" color="black" shadow />
//           <Entity
//             geometry={{ primitive: 'torus', radius: 2, tube: 0.2 }} // Adjust radius and tube
//             position="0 3.5 -35"
//             color="#4CC3D9"
//             shadow
//           />
//           <Entity
//             geometry={{ primitive: 'box', width: 2 }}
//             material={{ color: "#B2B2B2", roughness: 0.5 }}
//             scale={{ x: 2, y: 2, z: 2 }}
//             position={{ x: -20, y: 0, z: -50 }} />
//           <Entity
//             geometry={{ primitive: 'box', width: 6 }}
//             material={{ color: "#B2B2B2", roughness: 0.5 }}
//             scale={{ x: 2, y: 4, z: 2 }}
//             position={{ x: -6, y: 0, z: -50 }} />
//           <Entity mixin="boldFont" text-geometry="value: What's up" position={{ x: -6, y: 0, z: -50 }} />
//           <Entity text-geometry="value: Dog?; font: #optimerBoldFont" position={{ x: -6, y: 0, z: -50 }} />
//           <Plane src="https://as2.ftcdn.net/v2/jpg/03/63/69/27/1000_F_363692799_3doLOkDBrNjOVOKlXQvCPgdmZtbBPgCI.jpg" position="0 0 -4" rotation="-90 0 0" width="100" height="100" color="#b2b2b2" opacity="0.2" shadow />
//         </>
//       );
//     default:
//       return null;
//   }
// };

// // Helper function to render the sky based on the selected value
// const renderSky = (value) => {
//   if (value === 'backroom') {
//     return <Sky src="https://weloobe.github.io/vr360expo/static_assets/chess-world.jpg" />;
//   }
//   if (value === 'scene1') {
//     return <Sky src="https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg" />;
//   }
//   if (value === 'scene4') {
//     return <Sky src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f110c028-627b-4e5a-a0fc-54fd9ed17ca4/da6uf3d-a64d7599-febc-4b02-87af-85fa85b82a26.jpg" />;
//   }
//   return <Sky src="" color="#8cdeff" />;
// };

// // Helper function to render the plane and texts if the value is not "backroom"
// const renderEnvironment = (value) => {
//   const isNotScene = value !== 'backroom' && value !== 'scene1' && value !== 'scene2' && value !== 'scene3' && value !== 'scene4' && value !== 'scene5';
//   if (isNotScene) {
//     return (
//       <>
//         <Plane position="0 0 -4" rotation="-90 0 0" width="100" height="100" color="#70b3b3" shadow />
//         {value !== 'all' &&
//           <Text value="GEOMETRY" align="center" position="0 2.3 -1.5" color="black" />
//         }
//       </>
//     );
//   }
//   return null;
// };

// export default function Marketplace() {
//   const [value, setValue] = useState("sphere");

//   return (
//     <div style={{ width: '50%', height: '50vh', zIndex: "-1" }}>
//       <Scene className="w-full h-full">
//         {renderShape(value)}
//         {renderSky(value)}
//         {renderEnvironment(value)}
//       </Scene>
//       <p>hello</p>
//     </div>
//   );
// };