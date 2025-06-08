import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AnimalModel() {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const legRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }

    // Tail wagging animation
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.3;
    }

    // Head bobbing
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }

    // Leg movement simulation
    legRefs.current.forEach((leg, index) => {
      if (leg) {
        leg.rotation.x = Math.sin(state.clock.elapsedTime * 2 + index * Math.PI / 2) * 0.2;
      }
    });
  });

  return (
    <group ref={groupRef} scale={[1.2, 1.2, 1.2]} position={[0, -0.5, 0]}>
      {/* Dog Body */}
      <mesh ref={bodyRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 1, 0.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Dog Head */}
      <mesh ref={headRef} position={[1.2, 0.3, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.6]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>

      {/* Dog Snout */}
      <mesh position={[1.8, 0.1, 0]}>
        <boxGeometry args={[0.4, 0.3, 0.3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Dog Ears */}
      <mesh position={[1.1, 0.7, -0.3]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.3, 0.6, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[1.1, 0.7, 0.3]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.3, 0.6, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Dog Eyes */}
      <mesh position={[1.5, 0.5, -0.2]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[1.5, 0.5, 0.2]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Dog Nose */}
      <mesh position={[2, 0.2, 0]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Dog Legs */}
      <mesh 
        ref={(el) => { if (el) legRefs.current[0] = el; }} 
        position={[0.6, -0.8, -0.3]}
      >
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh 
        ref={(el) => { if (el) legRefs.current[1] = el; }} 
        position={[0.6, -0.8, 0.3]}
      >
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh 
        ref={(el) => { if (el) legRefs.current[2] = el; }} 
        position={[-0.6, -0.8, -0.3]}
      >
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh 
        ref={(el) => { if (el) legRefs.current[3] = el; }} 
        position={[-0.6, -0.8, 0.3]}
      >
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Dog Tail */}
      <mesh 
        ref={tailRef} 
        position={[-1.2, 0.2, 0]} 
        rotation={[0, 0, 0.5]}
      >
        <boxGeometry args={[0.6, 0.2, 0.2]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Dog Collar */}
      <mesh position={[0.8, 0.6, 0]}>
        <torusGeometry args={[0.45, 0.05, 8, 16]} />
        <meshStandardMaterial color="#FF0000" />
      </mesh>

      {/* Collar Tag */}
      <mesh position={[0.8, 0.4, 0.4]}>
        <boxGeometry args={[0.1, 0.15, 0.02]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
}