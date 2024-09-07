import React from 'react';
import { Entity, Box, Sphere, Cylinder, Plane, Sky, Text, Scene } from 'react-aframe-ar';

const Environment = () => {
  return (
    <div style={{ width: '100%', height: '100vh', zIndex: "-1" }}>
      <Scene className="w-full h-full">
        {/* Cube */}
        <Text value="CUBE" align="center" position="-5 4.5 -5" color="black" style={{ fontWeight: "800", fontSize: "50px" }} />
        <Box position="-5 1.5 -5" rotation="0 45 0" color="#4CC3D9" shadow />

        {/* Sphere */}
        <Text value="SPHERE" align="center" position="-2 4.5 -5" color="black" style={{ fontWeight: "800", fontSize: "50px" }} />
        <Sphere position="-2 2.25 -5" radius="1.25" color="#EF2D5E" shadow />

        {/* Cylinder */}
        <Text value="CYLINDER" align="center" position="2 4.5 -5" color="black" style={{ fontWeight: "800", fontSize: "50px" }} />
        <Cylinder position="2 2.25 -5" radius="1.5" height="2.5" color="#FFC65D" shadow />

        {/* Torus (Doughnut) */}
        <Text value="TORUS" align="center" position="5 4.5 -5" color="black" style={{ fontWeight: "800", fontSize: "50px" }} />
        <Entity geometry={{ primitive: 'torus', radius: 1.5, tube: 0.2 }} position="5 2.25 -5" color="#4CC3D9" shadow />

        {/* Ground Plane */}
        <Plane position="0 0 -4" rotation="-90 0 0" width="100" height="100" color="#70b3b3" shadow />

        {/* Sky */}
        <Sky color="#8cdeff" />
      </Scene>
    </div>
  );
};

export default Environment