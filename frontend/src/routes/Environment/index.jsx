import 'aframe';
import React from 'react';
import { Box, Sphere, Cylinder, Plane, Sky, Text, Scene } from 'react-aframe-ar';

const Marketplace = () => {
  return (
    <div className="size-[50vh] overflow-hidden">
      <Scene>
        <Box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" shadow />
        <Sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" shadow />
        <Cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" shadow />
        <Plane position="0 0 -4" rotation="-90 0 0" width="100" height="100" color="#00732b" shadow />
        <Sky color="#6bb3ff" />
        <Text value="Hello world" align="center" position="0 2.3 -1.5" color="#003815" />
      </Scene>
    </div>
  );
};

export default Marketplace;