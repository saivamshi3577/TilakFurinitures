import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

function FuturisticParticles() {
  const pointsRef = useRef(null);
  const count = 300;

  // Generate random particles coords
  const [positions] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return [positions];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    // Rotate particle cloud gently
    pointsRef.current.rotation.y = t * 0.03;
    pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.05;
    
    // Animate positions to simulate floating dust
    const positionsArr = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 1; // Y position
      positionsArr[idx] += Math.sin(t * 0.5 + i) * 0.0015;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#B3924B"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}

function CyberRing() {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.05;
    meshRef.current.rotation.y = t * 0.08;
    meshRef.current.rotation.z = Math.sin(t * 0.1) * 0.3;
  });

  return (
    <group ref={meshRef}>
      {/* Outer ring */}
      <mesh>
        <torusGeometry args={[2.5, 0.015, 12, 80]} />
        <meshBasicMaterial color="#B3924B" opacity={0.2} transparent />
      </mesh>
      {/* Inner ring */}
      <mesh rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <torusGeometry args={[1.9, 0.008, 8, 60]} />
        <meshBasicMaterial color="#B3924B" opacity={0.12} transparent wireframe />
      </mesh>
      {/* Small Core box */}
      <mesh>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshBasicMaterial color="#B3924B" wireframe opacity={0.15} transparent />
      </mesh>
    </group>
  );
}

export default function HeroBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="absolute inset-0 -z-10 bg-[#0D0D0D]" />;
  }

  return (
    <div className="absolute inset-0 -z-10 bg-[#0D0D0D]">
      <Canvas 
        camera={{ position: [0, 0, 5] }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0D0D0D');
        }}
      >
        <ambientLight intensity={0.6} />
        <FuturisticParticles />
        <CyberRing />
      </Canvas>
    </div>
  );
}