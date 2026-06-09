import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';

function FloatingGrid() {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t / 4) * 0.2;
    meshRef.current.rotation.y = Math.cos(t / 4) * 0.2;
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
      <boxGeometry args={[3, 3, 3]} />
      <meshBasicMaterial color="#B3924B" wireframe opacity={0.15} transparent />
    </mesh>
  );
}

export default function HeroBackground() {
  const [isMounted, setIsMounted] = useState(false);

  // Prevents SSR or initial loading crashes in React 19 environments
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="absolute inset-0 -z-10 bg-[#111111]" />;
  }

  return (
    <div className="absolute inset-0 -z-10 bg-[#111111]">
      <Canvas 
        camera={{ position: [0, 0, 5] }}
        onCreated={({ gl }) => {
          gl.setClearColor('#111111');
        }}
      >
        <ambientLight intensity={0.5} />
        <FloatingGrid />
      </Canvas>
    </div>
  );
}