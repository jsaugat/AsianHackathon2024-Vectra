import 'aframe';
import React, { useState } from 'react';
import { Box, Text, Scene, Sky, Camera, Cursor } from 'react-aframe-ar';

const Signup = () => {
  const questions = [
    'Is the sky blue?',
    'Is the grass green?',
    'Is the sun hot?',
    'Do birds fly?',
    'Is water wet?'
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleClick = (type) => {
    console.log(type + ' button clicked!');
    setCurrentQuestion((currentQuestion + 1) % questions.length);

    if (type === 'yes') {
      console.log('User answered Yes');
    } else {
      console.log('User answered No');
    }
  };

  return (
    <Scene>
      {/* Yes Button */}
      <Box
        position="-1 1.5 -3"
        color="#4CC3D9"
        scale="0.5 0.5 0.5"
        events={{
          click: () => handleClick('yes'),
          mouseenter: (e) => (e.target.setAttribute('scale', '0.6 0.6 0.6')),
          mouseleave: (e) => (e.target.setAttribute('scale', '0.5 0.5 0.5'))
        }}
        class="clickable"
      />

      {/* No Button */}
      <Box
        position="1 1.5 -3"
        color="#EF2D5E"
        scale="0.5 0.5 0.5"
        events={{
          click: () => handleClick('no'),
          mouseenter: (e) => (e.target.setAttribute('scale', '0.6 0.6 0.6')),
          mouseleave: (e) => (e.target.setAttribute('scale', '0.5 0.5 0.5'))
        }}
        class="clickable"
      />

      {/* Question Text */}
      <Text
        value={questions[currentQuestion]}
        position="0 2 -3"
        align="center"
      />

      {/* Camera */}
      <Camera>
        <Cursor raycaster="objects: .clickable" />
      </Camera>

      <Sky color="#828282" />
    </Scene>
  );
};

export default Signup;
