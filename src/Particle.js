// Particle.js
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Particle = ({
  initialPosition,
  color,
  twistAngle,
  falloffRadius,
  displaceFactor,
  particleSize,
}) => {
  const ref = useRef();

  // Predefine vectors to avoid creating new instances every frame
  const ctr = new THREE.Vector3(0, 0, 0); // Center point
  const position = new THREE.Vector3(...initialPosition);
  const offset = new THREE.Vector3();
  const displacement = new THREE.Vector3();
  const displacedPosition = new THREE.Vector3();
  const rotatedVector = new THREE.Vector3();
  const axisY = new THREE.Vector3(0, 1, 0);
  const axisZ = new THREE.Vector3(0, 0, 1);

  useFrame(() => {
    if (!ref.current) return;

    // Calculate offset from center
    offset.copy(position).sub(ctr);

    // Calculate distance from center
    const d = offset.length();

    // Calculate falloff factor
    const falloffFactor = THREE.MathUtils.clamp(
      (falloffRadius - d) / falloffRadius,
      0,
      1
    );

    // Calculate brightness of the color
    const brightness = 0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2];

    // Apply displacement before twist
    displacement.set(0, 0, -brightness * displaceFactor);

    // New position after displacement
    displacedPosition.copy(position).add(displacement);

    // Calculate rotation angle based on falloff
    const angleRadians = THREE.MathUtils.degToRad(twistAngle * falloffFactor);

    // Apply rotations
    rotatedVector.copy(displacedPosition);
    rotatedVector.applyAxisAngle(axisY, angleRadians);
    rotatedVector.applyAxisAngle(axisZ, angleRadians);

    // Update particle position
    ref.current.position.set(rotatedVector.x, rotatedVector.y, rotatedVector.z);

    // Update particle color
    ref.current.material.color.setRGB(color[0], color[1], color[2]);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[particleSize, 16, 16]} />
      <meshStandardMaterial />
    </mesh>
  );
};

export default Particle;
