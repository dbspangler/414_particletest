// CanvasScene.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ParticleField from "./ParticleField";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const CanvasScene = ({
  twistAngle,
  falloffRadius,
  displaceFactor,
  gridWidth,
  gridHeight,
  globalRotation,
  particleSize,
  numParticles,
}) => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 20],
        fov: 30,
        near: 0.1,
        far: 1000,
      }}
      style={{ background: "#222222" }} // Dark Gray background
    >
      {/* Ambient Light */}
      <ambientLight intensity={1} />

      {/* Particle Field */}
      <ParticleField
        key={`particlefield-${numParticles}`}
        numParticles={numParticles}
        twistAngle={twistAngle}
        falloffRadius={falloffRadius}
        displaceFactor={displaceFactor}
        gridWidth={gridWidth}
        gridHeight={gridHeight}
        globalRotation={globalRotation}
        particleSize={particleSize}
      />

      {/* Orbit Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        zoomSpeed={1.0}
        rotateSpeed={1.0}
        minDistance={10}
        maxDistance={100}
        enableDamping={true}
        dampingFactor={0.1}
      />

      {/* Post-Processing Effects */}
      <EffectComposer>
        {/* Bloom Effect */}
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={0.1}
          height={1000}
          opacity={1}
          kernelSize={3}
          blendFunction={BlendFunction.ADD} // Adjust blend mode
        />
      </EffectComposer>
    </Canvas>
  );
};

export default CanvasScene;
