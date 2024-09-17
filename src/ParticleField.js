// ParticleField.js
import React, { useMemo } from "react";
import Particle from "./Particle";
import * as THREE from "three";

const ParticleField = ({
  numParticles,
  twistAngle,
  falloffRadius,
  displaceFactor,
  gridWidth,
  gridHeight,
  globalRotation,
  particleSize,
}) => {
  const particles = useMemo(() => {
    const gridSizeX = Math.ceil(Math.sqrt(numParticles));
    const gridSizeY = Math.ceil(numParticles / gridSizeX);
    const spacingX = gridWidth / gridSizeX;
    const spacingY = gridHeight / gridSizeY;

    return Array.from({ length: numParticles }, (_, i) => {
      const x = (i % gridSizeX) * spacingX - gridWidth / 2;
      const y = Math.floor(i / gridSizeX) * spacingY - gridHeight / 2;
      const z = 0;
      const randColor = Math.random();
      return {
        id: `particle-${i}`,
        position: [x, y, z],
        color: [randColor, randColor, randColor],
      };
    });
  }, [numParticles, gridWidth, gridHeight]);

  // Convert degrees to radians for rotation
  const globalRotationRad = useMemo(
    () => [
      0,
      THREE.MathUtils.degToRad(globalRotation),
      THREE.MathUtils.degToRad(globalRotation),
    ],
    [globalRotation]
  );

  return (
    <group rotation={globalRotationRad}>
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          initialPosition={particle.position}
          color={particle.color}
          twistAngle={twistAngle}
          falloffRadius={falloffRadius}
          displaceFactor={displaceFactor}
          particleSize={particleSize}
        />
      ))}
    </group>
  );
};

export default ParticleField;
