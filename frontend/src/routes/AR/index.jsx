import React from 'react';

export default function AR() {
  return (
    <main className="flex flex-col items-center justify-center p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Additional models or content can go here */}
      </div>

      {/* 3D Models */}
      <div className="mt-24 grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <div className="border rounded-lg shadow-lg p-5">
          <model-viewer
            src="/file/ship.glb"
            ar
            ar-modes="scene-viewer webxr quick-look"
            camera-controls
            tone-mapping="neutral"
            poster="poster.png"
            shadow-intensity="1">
          </model-viewer>
          <h1 className="text-xl font-semibold mt-3">Spaceship</h1>
          <p className="text-gray-600">Explore the galaxy with this futuristic spaceship model.</p>
        </div>
        
        <div className="border rounded-lg shadow-lg p-5">
          <model-viewer
            src="/file/Eye.glb"
            ar
            ar-modes="scene-viewer webxr quick-look"
            camera-controls
            tone-mapping="neutral"
            poster="poster.png"
            shadow-intensity="1">
          </model-viewer>
          <h1 className="text-xl font-semibold mt-3">Human Eye</h1>
          <p className="text-gray-600">A detailed model of the human eye, perfect for anatomy lessons.</p>
        </div>
        
        <div className="border rounded-lg shadow-lg p-5">
          <model-viewer
            src="/file/skull.glb"
            ar
            ar-modes="scene-viewer webxr quick-look"
            camera-controls
            tone-mapping="neutral"
            poster="poster.png"
            shadow-intensity="1">
          </model-viewer>
          <h1 className="text-xl font-semibold mt-3">Human Skull</h1>
          <p className="text-gray-600">A realistic human skull model, useful for studying human anatomy.</p>
        </div>
        <div className="border rounded-lg shadow-lg p-5">
          <model-viewer
            src="/file/tank.glb"
            ar
            ar-modes="scene-viewer webxr quick-look"
            camera-controls
            tone-mapping="neutral"
            poster="poster.png"
            shadow-intensity="1">
          </model-viewer>
          <h1 className="text-xl font-semibold mt-3">Military Tank</h1>
          <p className="text-gray-600">A powerful and robust military tank for battle simulations.</p>
        </div>

      </div>
    </main>
  );
}
