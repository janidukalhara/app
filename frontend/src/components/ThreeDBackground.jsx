import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

// Animated particles component
function AnimatedParticles(props) {
  const ref = useRef();
  const [sphere] = useState(() => 
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// Floating geometric shapes
function FloatingShapes() {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) / 8;
    meshRef.current.rotation.y = Math.sin(t / 2) / 4;
    meshRef.current.position.y = Math.sin(t / 1.5) / 10;
  });
  
  return (
    <mesh ref={meshRef} position={[2, 0, 0]}>
      <icosahedronGeometry args={[0.3, 1]} />
      <meshBasicMaterial color="#6366f1" wireframe />
    </mesh>
  );
}

// Animated rings
function AnimatedRings() {
  const group = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.x = t / 10;
    group.current.rotation.y = t / 5;
  });
  
  return (
    <group ref={group}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, (i * Math.PI) / 3]}>
          <ringGeometry args={[1.5 + i * 0.5, 1.7 + i * 0.5, 64]} />
          <meshBasicMaterial 
            color={i === 0 ? "#3b82f6" : i === 1 ? "#6366f1" : "#8b5cf6"} 
            transparent 
            opacity={0.1}
            side={2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Floating cubes with different animations
function FloatingCubes() {
  const cubes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 15; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: Math.random() * 0.5 + 0.5
      });
    }
    return temp;
  }, []);
  
  return (
    <>
      {cubes.map((cube, index) => (
        <AnimatedCube key={index} {...cube} index={index} />
      ))}
    </>
  );
}

function AnimatedCube({ position, rotation, scale, index }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = rotation[0] + t / (2 + index * 0.1);
    meshRef.current.rotation.y = rotation[1] + t / (3 + index * 0.1);
    meshRef.current.position.y = position[1] + Math.sin(t + index) / 4;
  });
  
  return (
    <mesh ref={meshRef} position={position} scale={scale * 0.3}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial 
        color={`hsl(${220 + index * 20}, 70%, ${50 + index * 3}%)`} 
        transparent 
        opacity={0.6}
        wireframe
      />
    </mesh>
  );
}

// Main 3D Background component
const ThreeDBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{
          position: [0, 0, 1],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        style={{
          background: 'radial-gradient(ellipse at bottom, #1e293b 0%, #0f172a 100%)'
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6366f1" />
        
        {/* 3D Elements */}
        <AnimatedParticles />
        <FloatingShapes />
        <AnimatedRings />
        <FloatingCubes />
        
        {/* Additional atmospheric elements */}
        <Sphere args={[50, 32, 16]} position={[0, 0, -30]}>
          <meshBasicMaterial 
            color="#1e293b" 
            transparent 
            opacity={0.1}
            side={1}
          />
        </Sphere>
      </Canvas>
    </div>
  );
};

export default ThreeDBackground;