import { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { Mesh } from "three";

function MeshComponent() {
  const fileUrl = "/blue_mecha.glb";
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);

  const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
  const center = boundingBox.getCenter(new THREE.Vector3());

  useEffect(() => {
    mesh.current.position.x = -center.x;
    mesh.current.position.y = -center.y;
    mesh.current.position.z = -center.z;
  }, [center]);

  useFrame(() => {
    mesh.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}

export function Objekt() {
  return (
    <div className="flex justify-center items-center lg:mb-16 sm:mb-0 h-[60vh]">
      <Canvas className="w-full h-2xl sm:w-2xl sm:h-2xl">
        <PerspectiveCamera makeDefault position={[0, 900, 0]} />
        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <directionalLight
          position={[0, 10, 0]}
          intensity={10}
          castShadow={true}
        />
        <MeshComponent />
      </Canvas>
    </div>
  );
}

export default Objekt;
