"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useRef } from "react";

function BikeModel({ onClick }) {
  const { scene } = useGLTF("/bike/old_german_bicycle_ww2.glb");
  const meshRef = useRef();

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <Canvas shadows camera={{ position: [0, 2, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight
        intensity={1.0}
        position={[10, 10, 5]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      <directionalLight
        intensity={0.3}
        position={[-10, 10, -5]}
        color="orange"
      />
      <primitive object={scene} ref={meshRef} onClick={onClick} />
      <OrbitControls />
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.5, 0]} receiveShadow>
        <MeshReflectorMaterial
          color="#F5DD61"
          opacity={0.5}
          mirror={0.5}
          depthScale={1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Environment files="/hdr/environment.hdr" background={true} />
      <EffectComposer>
        <Bloom intensity={1.5} />
      </EffectComposer>
    </Canvas>
  );
}

export default BikeModel;
