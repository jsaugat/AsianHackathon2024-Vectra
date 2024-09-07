import React, { useState } from 'react';
import axios from 'axios';
import { Entity, Box, Sphere, Cylinder, Plane, Sky, Text, Scene } from 'react-aframe-ar';

const Environment = () => {
  const [info, setInfo] = useState('');
  const [showInfoBoard, setShowInfoBoard] = useState(false);

  const fetchInfo = async (shape) => {
    try {
      const command = `A brief, interesting description of a ${shape} for a class 1 student kid:`;
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
        {
          inputs: command,
          parameters: { max_new_tokens: 100 }
        },
        {
          headers: {
            Authorization: 'Bearer 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',  // Replace with your actual Hugging Face token
            'Content-Type': 'application/json'
          }
        }
      );
      setInfo(response.data[0].generated_text);
      setShowInfoBoard(true);
    } catch (error) {
      console.error('Error fetching info:', error);
      setInfo('Error fetching information.');
      setShowInfoBoard(true);
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh', zIndex: "-1" }}>
      <Scene className="w-full h-full">
        {/* Cube */}
        <Text 
          value="CUBE" 
          align="center" 
          position="-5 4.5 -5" 
          color="black" 
          style={{ fontWeight: "800", fontSize: "50px" }} 
        />
        <Box 
          position="-5 1.5 -5" 
          rotation="0 45 0" 
          color="#4CC3D9" 
          shadow
          events={{ 
            click: () => fetchInfo('cube'),
            mouseenter: (e) => e.target.setAttribute('scale', '1.1 1.1 1.1'),
            mouseleave: (e) => e.target.setAttribute('scale', '1 1 1')
          }}
          class="clickable"
        />

        {/* Sphere */}
        <Text 
          value="SPHERE" 
          align="center" 
          position="-2 4.5 -5" 
          color="black" 
          style={{ fontWeight: "800", fontSize: "50px" }} 
        />
        <Sphere 
          position="-2 2.25 -5" 
          radius="1.25" 
          color="#EF2D5E" 
          shadow
          events={{ 
            click: () => fetchInfo('sphere'),
            mouseenter: (e) => e.target.setAttribute('scale', '1.1 1.1 1.1'),
            mouseleave: (e) => e.target.setAttribute('scale', '1 1 1')
          }}
          class="clickable"
        />

        {/* Cylinder */}
        <Text 
          value="CYLINDER" 
          align="center" 
          position="2 4.5 -5" 
          color="black" 
          style={{ fontWeight: "800", fontSize: "50px" }} 
        />
        <Cylinder 
          position="2 2.25 -5" 
          radius="1.5" 
          height="2.5" 
          color="#FFC65D" 
          shadow
        />

        {/* Torus (Doughnut) */}
        <Text 
          value="TORUS" 
          align="center" 
          position="5 4.5 -5" 
          color="black" 
          style={{ fontWeight: "800", fontSize: "50px" }} 
        />
        <Entity 
          geometry={{ primitive: 'torus', radius: 1.5, tube: 0.2 }} 
          position="5 2.25 -5" 
          color="#4CC3D9" 
          shadow
        />

        {/* Ground Plane */}
        <Plane 
          position="0 0 -4" 
          rotation="-90 0 0" 
          width="100" 
          height="100" 
          color="#70b3b3" 
          shadow 
        />

        {/* Sky */}
        <Sky color="#8cdeff" />

        {/* Info Board */}
        {showInfoBoard && (
          <Entity position="0 6 -3"
          rotation="20 0 0">
            <Box
              width="6"
              height="3"
              depth="0.1"
              color="#FFFFFF"
            />
            <Text
              value={info}
              align="center"
              color="#000000"
              width="5"
              wrapCount="40"
              position="0 0 0.1"
            />
            <Entity
              geometry={{primitive: 'plane'}}
              material={{color: 'red'}}
              position="2.8 1.4 0.1"
              scale="0.3 0.3 0.3"
              events={{
                click: () => setShowInfoBoard(false),
                mouseenter: (e) => e.target.setAttribute('scale', '0.35 0.35 0.35'),
                mouseleave: (e) => e.target.setAttribute('scale', '0.3 0.3 0.3')
              }}
              class="clickable"
            >
              <Text
                value="X"
                align="center"
                color="#FFFFFF"
                position="0 0 0.1"
              />
            </Entity>
          </Entity>
        )}

        {/* Camera and Cursor */}
        <Entity camera look-controls position="0 1.6 0">
          <Entity cursor="fuse: true; fuseTimeout: 500"
                  position="0 0 -1"
                  geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
                  material="color: black; shader: flat">
          </Entity>
        </Entity>
      </Scene>
    </div>
  );
};

export default Environment;