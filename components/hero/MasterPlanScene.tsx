"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, Html, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import { PROJECTS, type Building } from "@/data/buildings";
import { boundaryPoints, layoutBuildings, type LaidOutBuilding } from "./layout";

const STATUS_HEX: Record<Building["status"], string> = {
  completed: "#1e7a4b",
  wip: "#f2841f",
  upcoming: "#7fb6e8",
};

function BuildingMesh({
  b,
  selected,
  onSelect,
}: {
  b: LaidOutBuilding;
  selected: boolean;
  onSelect: (b: LaidOutBuilding | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const geometry = useMemo(() => new THREE.BoxGeometry(b.width, b.height, b.depth), [b.width, b.height, b.depth]);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useEffect(() => {
    if (!groupRef.current) return;
    gsap.fromTo(
      groupRef.current.scale,
      { y: 0.001 },
      { y: 1, duration: 0.9, ease: "expo.out", delay: 0.05 * Math.random() }
    );
  }, [b.id]);

  const isUpcoming = b.status === "upcoming";

  return (
    <group ref={groupRef} position={[b.x, 0, b.z]}>
      <mesh
        geometry={geometry}
        position={[0, b.height / 2, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(b);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <meshStandardMaterial
          color={STATUS_HEX[b.status]}
          wireframe={isUpcoming}
          transparent={isUpcoming || selected}
          opacity={isUpcoming ? 0.35 : selected ? 0.92 : 1}
          emissive={!isUpcoming ? new THREE.Color(STATUS_HEX[b.status]) : undefined}
          emissiveIntensity={b.status === "completed" ? 0.25 : b.status === "wip" ? 0.15 : 0}
          roughness={0.55}
          metalness={0.1}
        />
      </mesh>
      <lineSegments geometry={edges} position={[0, b.height / 2, 0]}>
        <lineBasicMaterial color={selected ? "#ffa94d" : "#0b2a5b"} />
      </lineSegments>
      {selected ? (
        <Html position={[0, b.height + 0.6, 0]} center distanceFactor={12} occlude>
          <div className="pointer-events-none w-56 rounded-[4px] border border-navy-500 bg-ink/95 p-3 text-left shadow-lg">
            <p className="text-caption font-semibold text-white">{b.name}</p>
            <p className="mt-1 tabular text-caption text-grey-300">
              {b.builtUpSqft > 0
                ? `${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(b.builtUpSqft)} sq.ft`
                : "Area not yet released"}
            </p>
            <p className="mt-1 text-caption" style={{ color: STATUS_HEX[b.status] }}>
              {b.statusLabel}
            </p>
          </div>
        </Html>
      ) : null}
    </group>
  );
}

function ScanLine({ extent, active }: { extent: number; active: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!active || !ref.current) return;
    const t = clock.getElapsedTime() * 0.08;
    ref.current.position.x = ((t % 1) - 0.5) * extent * 2;
  });
  if (!active) return null;
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
      <planeGeometry args={[0.25, extent * 2.4]} />
      <meshBasicMaterial color="#f2841f" transparent opacity={0.15} depthWrite={false} />
    </mesh>
  );
}

function Scene({
  slug,
  reduced,
  mobile,
}: {
  slug: string;
  reduced: boolean;
  mobile: boolean;
}) {
  const project = PROJECTS.find((p) => p.slug === slug) ?? PROJECTS[0];
  const laid = useMemo(() => layoutBuildings(project.buildings), [project]);
  const bounds = useMemo(() => boundaryPoints(laid), [laid]);
  const [selected, setSelected] = useState<LaidOutBuilding | null>(null);

  useEffect(() => setSelected(null), [slug]);

  const extent = useMemo(
    () => Math.max(...laid.map((b) => Math.abs(b.x)), Math.max(...laid.map((b) => Math.abs(b.z)), 10)) + 6,
    [laid]
  );

  return (
    <>
      <color attach="background" args={["#050f24"]} />
      <fog attach="fog" args={["#050f24", 14, 42]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[10, 14, 6]} intensity={1.1} />
      <directionalLight position={[-8, 6, -6]} intensity={0.3} />

      <Grid
        position={[0, 0, 0]}
        args={[100, 100]}
        cellSize={1.5}
        cellThickness={0.5}
        cellColor="#12386f"
        sectionSize={7.5}
        sectionThickness={0.8}
        sectionColor="#3e86d0"
        fadeDistance={38}
        fadeStrength={1.5}
        infiniteGrid
      />

      <Line points={bounds} color="#3e86d0" lineWidth={1.4} transparent opacity={0.8} />

      {laid.map((b) => (
        <BuildingMesh key={b.id} b={b} selected={selected?.id === b.id} onSelect={setSelected} />
      ))}

      {!reduced && !mobile ? <ScanLine extent={extent} active /> : null}

      <OrbitControls
        makeDefault
        enablePan={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.5}
        minDistance={10}
        maxDistance={34}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.15}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  );
}

function VisibilityGate({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full" data-lenis-prevent>
      {active ? children : <div className="h-full w-full" />}
    </div>
  );
}

export default function MasterPlanScene({ activeSlug }: { activeSlug: string }) {
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMobile(window.innerWidth < 768);
  }, []);

  return (
    <VisibilityGate>
      <Canvas
        camera={{ position: [16, 12, 20], fov: 42 }}
        dpr={mobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Scene slug={activeSlug} reduced={reduced} mobile={mobile} />
      </Canvas>
    </VisibilityGate>
  );
}
