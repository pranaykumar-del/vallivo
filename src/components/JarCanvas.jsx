import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function Jar() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Glass jar body */}
      <mesh>
        <cylinderGeometry args={[1.0, 0.92, 2.8, 64]} />
        <meshStandardMaterial
          color="#cdc8be"
          roughness={0.12}
          metalness={0.05}
          transparent
          opacity={0.82}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Navy label band */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[1.015, 1.015, 1.3, 64, 1, true]} />
        <meshStandardMaterial color="#1E3A5F" roughness={0.65} side={THREE.DoubleSide} />
      </mesh>

      {/* Cream lower band */}
      <mesh position={[0, -0.65, 0]}>
        <cylinderGeometry args={[1.015, 1.015, 0.9, 64, 1, true]} />
        <meshStandardMaterial color="#F0EBE0" roughness={0.8} side={THREE.DoubleSide} />
      </mesh>

      {/* Gold separator ring top */}
      <mesh position={[0, 1.21, 0]}>
        <torusGeometry args={[1.015, 0.022, 16, 64]} />
        <meshStandardMaterial color="#C9A96E" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* Gold separator ring bottom */}
      <mesh position={[0, -0.11, 0]}>
        <torusGeometry args={[1.015, 0.022, 16, 64]} />
        <meshStandardMaterial color="#C9A96E" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* Navy lid */}
      <mesh position={[0, 1.62, 0]}>
        <cylinderGeometry args={[1.06, 1.01, 0.42, 64]} />
        <meshStandardMaterial color="#1E3A5F" roughness={0.28} metalness={0.08} />
      </mesh>

      {/* Lid top */}
      <mesh position={[0, 1.84, 0]}>
        <cylinderGeometry args={[1.06, 1.06, 0.02, 64]} />
        <meshStandardMaterial color="#142947" roughness={0.3} />
      </mesh>

      {/* Gold ring at lid base */}
      <mesh position={[0, 1.41, 0]}>
        <torusGeometry args={[1.04, 0.022, 16, 64]} />
        <meshStandardMaterial color="#C9A96E" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* Bottom disk */}
      <mesh position={[0, -1.4, 0]}>
        <cylinderGeometry args={[0.92, 0.86, 0.06, 64]} />
        <meshStandardMaterial color="#c8c4bc" roughness={0.5} />
      </mesh>
    </group>
  )
}

function JarScene() {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 10, 5]} intensity={2} />
      <directionalLight position={[-5, 5, -3]} intensity={0.4} color="#C9A96E" />
      <pointLight position={[0, -5, 5]} intensity={0.3} color="#ffffff" />
      <Suspense fallback={null}>
        <Jar />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  )
}

export default function JarCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 1, 5], fov: 42 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true, failIfMajorPerformanceCaveat: false }}
    >
      <JarScene />
    </Canvas>
  )
}
