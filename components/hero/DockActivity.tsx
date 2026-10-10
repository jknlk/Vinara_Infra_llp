"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { LaidOutBuilding } from "./layout";
import { rnd, seedOf, textures } from "./planKit";
import { Truck, Walker } from "./SiteLife";
import { Forklift } from "./WarehouseInterior";

// apron surface, and how far off the dock face the truck being loaded stands
const APRON = 0.016;
const TRUCK_GAP = 0.3;
// seconds: shutter rolls up, stays open while the crew loads, rolls down, then rests shut
const CYCLE = 32;
const ROLL = 2.5;
const OPEN_UNTIL = 25;
const CARGO = ["#c9a36b", "#b98d55", "#d2b07c", "#e9ecee"];

// forklift running pallets between the dock and the truck (local +x points away from the building)
function Shuttle({ from, to, z, speed, children }: { from: number; to: number; z: number; speed: number; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const span = to - from;
    const t = (clock.getElapsedTime() * speed) % (span * 2);
    const out = t < span;
    ref.current.position.x = out ? from + t : to - (t - span);
    ref.current.rotation.y = out ? 0 : Math.PI;
  });
  return (
    <group ref={ref} position={[from, 0, z]}>
      {children}
    </group>
  );
}

// loading bays in use: the shutter cycles open, and a crew carries cartons out to a waiting truck
export default function DockActivity({ b, xs }: { b: LaidOutBuilding; xs: number[] }) {
  const tex = textures();
  const front = b.depth / 2;
  const seed = seedOf(b.id);
  const shutters = useRef<(THREE.Mesh | null)[]>([]);
  const crews = useRef<(THREE.Group | null)[]>([]);

  // hung from its top edge so scaling rolls it upwards
  const shutterGeo = useMemo(() => new THREE.BoxGeometry(0.12, 0.125, 0.004).translate(0, -0.0625, 0), []);

  useFrame(({ clock }) => {
    xs.forEach((_, i) => {
      const t = (clock.getElapsedTime() + rnd(seed + i * 1.3) * CYCLE) % CYCLE;
      const open =
        t < ROLL ? t / ROLL : t < OPEN_UNTIL ? 1 : t < OPEN_UNTIL + ROLL ? 1 - (t - OPEN_UNTIL) / ROLL : 0;
      const shutter = shutters.current[i];
      if (shutter) shutter.scale.y = 1 - open * 0.9;
      const crew = crews.current[i];
      if (crew) crew.visible = open > 0.95;
    });
  });

  return (
    <>
      {xs.map((x, i) => (
        <group key={x} position={[x, 0, 0]}>
          {/* cartons stacked just inside the opening */}
          {[-0.034, 0.002, 0.036].map((dx, k) => {
            const sy = 0.04 + rnd(seed + i * 7 + k) * 0.05;
            return (
              <mesh key={dx} position={[dx, 0.0375 + sy / 2, front + 0.0095]}>
                <boxGeometry args={[0.032, sy, 0.004]} />
                <meshStandardMaterial color={CARGO[Math.floor(rnd(seed + i + k * 3) * CARGO.length)]} roughness={0.9} />
              </mesh>
            );
          })}
          <mesh
            ref={(el) => {
              shutters.current[i] = el;
            }}
            geometry={shutterGeo}
            position={[0, 0.1625, front + 0.014]}
          >
            <meshStandardMaterial color="#5d6873" map={tex.door} roughness={0.6} metalness={0.3} />
          </mesh>

          {/* truck stood off the dock, tail towards the door */}
          <group position={[0, 0, front + TRUCK_GAP + 0.225]} rotation={[0, -Math.PI / 2, 0]}>
            <Truck colour={["#1f4e9c", "#b3261e", "#2f6b3a", "#e0a020"][i % 4]} />
          </group>
          {/* cartons already set down at the tail */}
          {[-0.055, 0.055].map((dx, k) => (
            <mesh key={dx} position={[dx, APRON + 0.016, front + TRUCK_GAP - 0.03 - k * 0.02]} castShadow>
              <boxGeometry args={[0.03, 0.032, 0.03]} />
              <meshStandardMaterial color={CARGO[k]} roughness={0.9} />
            </mesh>
          ))}

          {/* crew: local +x runs from the door out to the truck */}
          <group
            ref={(el) => {
              crews.current[i] = el;
            }}
            position={[0, APRON, 0]}
            rotation={[0, -Math.PI / 2, 0]}
          >
            <Walker from={front + 0.03} to={front + TRUCK_GAP - 0.02} y={0} z={0.022} speed={0.05} phase={rnd(seed + i)} vest="#f2b01e" carry />
            <Walker from={front + 0.03} to={front + TRUCK_GAP - 0.02} y={0} z={-0.022} speed={0.045} phase={rnd(seed + i) + 0.5} vest="#e8731a" carry />
            {i === 0 ? (
              <Shuttle from={front + 0.07} to={front + TRUCK_GAP - 0.07} z={-0.085} speed={0.06}>
                <Forklift loaded />
              </Shuttle>
            ) : null}
          </group>
        </group>
      ))}
    </>
  );
}
