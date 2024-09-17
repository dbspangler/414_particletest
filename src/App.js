// App.js
import React, { useState } from "react";
import CanvasScene from "./CanvasScene";
import ControlWithButtons from "./ControlWithButtons";
import "./App.css";

const App = () => {
  // State variables for various controls
  const [twistAngle, setTwistAngle] = useState(900); // Degrees
  const [falloffRadius, setFalloffRadius] = useState(20);
  const [displaceFactor, setDisplaceFactor] = useState(0.4);
  const [globalRotation, setGlobalRotation] = useState(0); // Degrees
  const [particleSize, setParticleSize] = useState(0.02); // Default particle size
  const [numParticles, setNumParticles] = useState(6000); // Actual number of particles
  const [numParticlesInput, setNumParticlesInput] = useState(numParticles); // Input field value

  return (
    <div className="App">
      {/* Canvas Scene Rendering the Particle Field */}
      <CanvasScene
        twistAngle={twistAngle}
        falloffRadius={falloffRadius}
        displaceFactor={displaceFactor}
        gridWidth={10}
        gridHeight={10}
        globalRotation={globalRotation}
        particleSize={particleSize}
        numParticles={numParticles} // Pass numParticles to CanvasScene
      />

      {/* UI Controls */}
      <div className="controls">
        {/* Twist Angle Control with Automatic Increment on Load */}
        <ControlWithButtons
          label="Twist Angle"
          value={twistAngle}
          min={-2000}
          max={2000}
          step={0.4}
          onChange={setTwistAngle}
          unit="°"
          initialDirection={1} // Starts incrementing on load
        />

        {/* Global Rotation Control with Wrap-Around Behavior */}
        <ControlWithButtons
          label="Global Rotation"
          value={globalRotation}
          min={-360}
          max={360}
          step={0.4} // Reduced step size to 75% of 1
          onChange={setGlobalRotation}
          unit="°"
          wrapAround={true} // Enables wrap-around from 360 to -360
        />

        {/* Falloff Radius Control */}
        <ControlWithButtons
          label="Falloff Radius"
          value={falloffRadius}
          min={1}
          max={100}
          step={0.05} // Reduced step size to 50% of 1
          onChange={setFalloffRadius}
        />

        {/* Displace Factor Control */}
        <ControlWithButtons
          label="Displace Factor"
          value={displaceFactor}
          min={-10}
          max={10}
          step={0.05}
          onChange={setDisplaceFactor}
        />

        {/* Particle Size Control with Single-Step Buttons */}
        <ControlWithButtons
          label="Particle Size"
          value={particleSize}
          min={0.01}
          max={0.1}
          step={0.01}
          onChange={setParticleSize}
          continuous={false} // Enables single-click increment/decrement
        />

        {/* Number of Particles Control with Input Field */}
        <div className="control-group">
          <label className="control-label">
            Number of Particles: {numParticles}
          </label>
          <div className="control-wrapper">
            <input
              type="number"
              className={`control-input ${
                numParticlesInput !== "" &&
                (isNaN(parseInt(numParticlesInput, 10)) ||
                  parseInt(numParticlesInput, 10) <= 0)
                  ? "invalid"
                  : ""
              }`}
              value={numParticlesInput}
              onChange={(e) => setNumParticlesInput(e.target.value)}
              onBlur={() => {
                const parsedValue = parseInt(numParticlesInput, 10);
                if (!isNaN(parsedValue) && parsedValue > 0) {
                  setNumParticles(parsedValue);
                } else {
                  // Reset to previous valid value if input is invalid
                  setNumParticlesInput(numParticles);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const parsedValue = parseInt(numParticlesInput, 10);
                  if (!isNaN(parsedValue) && parsedValue > 0) {
                    setNumParticles(parsedValue);
                  } else {
                    // Reset to previous valid value if input is invalid
                    setNumParticlesInput(numParticles);
                  }
                }
              }}
              min={1}
              step={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
