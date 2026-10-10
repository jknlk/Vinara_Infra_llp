"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { siteRect, type LaidOutBuilding } from "./layout";
import { rnd } from "./planKit";

const CAB_COLOURS = ["#1f4e9c", "#b3261e", "#f4f5f6", "#2f6b3a", "#e0a020", "#3b4350"];
const CAR_COLOURS = ["#e9ebed", "#c7ccd1", "#2b2f34", "#9c2b22", "#1f4e9c", "#8d949b"];
const SHIRT_COLOURS = ["#f2b01e", "#e8731a", "#f4f5f6", "#2f5f9e", "#3d7a4f", "#a8452f", "#2b2f34", "#f2b01e"];
// public road: half its length, and how far the two carriageways sit from the centre line
const ROAD_HALF = 55;
const ROAD_LANE = 0.2;

// articulated truck, modelled driving towards +x
export function Truck({ colour }: { colour: string }) {
  return (
    <>
      <mesh position={[-0.045, 0.078, 0]} castShadow>
        <boxGeometry args={[0.36, 0.09, 0.07]} />
        <meshStandardMaterial color="#f1f3f4" roughness={0.45} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.018, 0]}>
        <boxGeometry args={[0.46, 0.03, 0.058]} />
        <meshStandardMaterial color="#1c1f22" roughness={0.9} />
      </mesh>
      <mesh position={[0.19, 0.05, 0]} castShadow>
        <boxGeometry args={[0.085, 0.088, 0.066]} />
        <meshStandardMaterial color={colour} roughness={0.35} metalness={0.4} />
      </mesh>
      <mesh position={[0.226, 0.066, 0]}>
        <boxGeometry args={[0.016, 0.034, 0.06]} />
        <meshStandardMaterial color="#1a2229" roughness={0.1} metalness={0.8} />
      </mesh>
    </>
  );
}

function Car({ colour }: { colour: string }) {
  return (
    <>
      <mesh position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[0.12, 0.026, 0.048]} />
        <meshStandardMaterial color={colour} roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[-0.006, 0.043, 0]}>
        <boxGeometry args={[0.06, 0.02, 0.043]} />
        <meshStandardMaterial color="#1a2229" roughness={0.1} metalness={0.8} />
      </mesh>
    </>
  );
}

// person walking towards +x: legs and arms swing with their own clock
export function Walker({
  from,
  to,
  y,
  z,
  speed,
  phase,
  vest,
  carry,
}: {
  from: number;
  to: number;
  y: number;
  z: number;
  speed: number;
  phase: number;
  vest: string;
  // holds a carton on the outward leg and walks back empty-handed
  carry?: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const legA = useRef<THREE.Mesh>(null);
  const legB = useRef<THREE.Mesh>(null);
  const armA = useRef<THREE.Mesh>(null);
  const armB = useRef<THREE.Mesh>(null);
  const load = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const span = Math.max(to - from, 0.01);
    const t = (clock.getElapsedTime() * speed + phase * span * 2) % (span * 2);
    const forward = t < span;
    ref.current.position.x = forward ? from + t : to - (t - span);
    ref.current.rotation.y = forward ? 0 : Math.PI;
    const swing = Math.sin(clock.getElapsedTime() * 9 + phase * 10) * 0.55;
    if (legA.current) legA.current.rotation.z = swing;
    if (legB.current) legB.current.rotation.z = -swing;
    if (armA.current) armA.current.rotation.z = -swing * 0.8;
    if (armB.current) armB.current.rotation.z = swing * 0.8;
    if (load.current) load.current.visible = forward;
  });

  // limbs pivot from their top end
  const leg = useMemo(() => new THREE.BoxGeometry(0.0045, 0.023, 0.0045).translate(0, -0.0115, 0), []);
  const arm = useMemo(() => new THREE.BoxGeometry(0.0035, 0.018, 0.0035).translate(0, -0.009, 0), []);

  return (
    <group ref={ref} position={[from, y, z]}>
      <mesh ref={legA} geometry={leg} position={[0, 0.023, 0.003]}>
        <meshStandardMaterial color="#2a3442" roughness={0.9} />
      </mesh>
      <mesh ref={legB} geometry={leg} position={[0, 0.023, -0.003]}>
        <meshStandardMaterial color="#2a3442" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.032, 0]}>
        <boxGeometry args={[0.007, 0.018, 0.011]} />
        <meshStandardMaterial color={vest} roughness={0.7} />
      </mesh>
      <mesh ref={armA} geometry={arm} position={[0, 0.04, 0.0075]}>
        <meshStandardMaterial color={vest} roughness={0.7} />
      </mesh>
      <mesh ref={armB} geometry={arm} position={[0, 0.04, -0.0075]}>
        <meshStandardMaterial color={vest} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.0455, 0]}>
        <sphereGeometry args={[0.0042, 10, 8]} />
        <meshStandardMaterial color="#c99b77" roughness={0.8} />
      </mesh>
      {carry ? (
        <mesh ref={load} position={[0.0095, 0.033, 0]}>
          <boxGeometry args={[0.012, 0.012, 0.016]} />
          <meshStandardMaterial color="#c9a36b" roughness={0.9} />
        </mesh>
      ) : null}
      {/* hard hat */}
      <mesh position={[0, 0.0485, 0]}>
        <sphereGeometry args={[0.0046, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#f4f5f6" roughness={0.4} />
      </mesh>
    </group>
  );
}

type Vehicle = {
  kind: "truck" | "car";
  // "loop" drives the internal service circuit, the others the public road in each direction
  route: "loop" | "east" | "west";
  offset: number;
  speed: number;
  colour: string;
};

type Pedestrian = { ax: number; az: number; bx: number; bz: number; y: number; speed: number; phase: number; colour: string };

export default function SiteLife({ laid, reduced, mobile }: { laid: LaidOutBuilding[]; reduced: boolean; mobile: boolean }) {
  const vehicleRefs = useRef<(THREE.Group | null)[]>([]);
  const bodies = useRef<THREE.InstancedMesh>(null);
  const heads = useRef<THREE.InstancedMesh>(null);
  const time = useRef(0);

  const world = useMemo(() => {
    const rect = siteRect(laid);
    const roadZ = rect.maxZ + 0.85;

    // service circuit: out along the first dock road, back along the last, joined by the two side roads
    const lanes = Array.from(new Set(laid.map((b) => b.z)))
      .sort((a, b) => a - b)
      .map((z) => z + Math.max(...laid.filter((b) => b.z === z).map((b) => b.depth)) / 2 + 1.2);
    const z1 = lanes[lanes.length - 1] ?? 0;
    const z0 = lanes.length > 1 ? lanes[0] : rect.minZ + 0.6;
    const x0 = rect.minX + 0.58;
    const x1 = rect.maxX - 0.6;
    const loop = [
      new THREE.Vector2(x0, z1),
      new THREE.Vector2(x1, z1),
      new THREE.Vector2(x1, z0),
      new THREE.Vector2(x0, z0),
    ];
    const loopLength = 2 * (x1 - x0) + 2 * (z1 - z0);

    const vehicles: Vehicle[] = [];
    const onRoad = mobile ? 10 : 24;
    for (let i = 0; i < onRoad; i++) {
      const truck = rnd(i * 2.3 + 1) < 0.55;
      vehicles.push({
        kind: truck ? "truck" : "car",
        route: i % 2 ? "east" : "west",
        offset: rnd(i * 5.1 + 2) * ROAD_HALF * 2,
        speed: (truck ? 0.5 : 0.75) + rnd(i + 7) * 0.2,
        colour: (truck ? CAB_COLOURS : CAR_COLOURS)[Math.floor(rnd(i * 3.3 + 4) * 6)],
      });
    }
    const onSite = mobile ? 2 : 4;
    for (let i = 0; i < onSite; i++) {
      vehicles.push({
        kind: "truck",
        route: "loop",
        offset: (i / onSite) * loopLength + rnd(i + 11) * 1.5,
        speed: 0.26,
        colour: CAB_COLOURS[Math.floor(rnd(i * 2.7 + 9) * CAB_COLOURS.length)],
      });
    }

    // pedestrians: along each dock front, beside each car park, and on the pavement outside the wall
    const people: Pedestrian[] = [];
    let n = 1;
    const walk = (ax: number, az: number, bx: number, bz: number, y: number) => {
      people.push({
        ax,
        az,
        bx,
        bz,
        y,
        speed: 0.035 + rnd(n) * 0.02,
        phase: rnd(n + 3),
        colour: SHIRT_COLOURS[Math.floor(rnd(n + 6) * SHIRT_COLOURS.length)],
      });
      n++;
    };
    laid.forEach((b) => {
      if (b.status === "upcoming") return;
      const front = b.z + b.depth / 2;
      for (let k = 0; k < (mobile ? 1 : 3); k++) {
        walk(b.x - b.width / 2, front + 0.86 + k * 0.03, b.x + b.width / 2, front + 0.86 + k * 0.03, 0);
      }
      const side = b.x + b.width / 2 + 0.34;
      walk(side, b.z - b.depth / 2 + 0.1, side, front - b.depth * 0.42, 0);
      walk(side + 0.03, front - b.depth * 0.42, side + 0.03, b.z - b.depth / 2 + 0.1, 0);
    });
    for (let k = 0; k < (mobile ? 3 : 8); k++) {
      const a = rect.minX + rnd(k + 20) * (rect.maxX - rect.minX - 3);
      walk(a, rect.maxZ + 0.2 + (k % 2) * 0.05, a + 3, rect.maxZ + 0.2 + (k % 2) * 0.05, -0.04);
    }

    return { roadZ, loop, loopLength, vehicles, people };
  }, [laid, mobile]);

  useLayoutEffect(() => {
    const colour = new THREE.Color();
    world.people.forEach((p, i) => bodies.current?.setColorAt(i, colour.set(p.colour)));
    if (bodies.current?.instanceColor) bodies.current.instanceColor.needsUpdate = true;
  }, [world]);

  useFrame((_, delta) => {
    // with reduced motion everything is placed once and then left still
    if (!reduced || time.current === 0) time.current += Math.min(delta, 0.05) || 0.016;
    const t = time.current;
    const m = new THREE.Matrix4();
    const p = new THREE.Vector3();
    const s = new THREE.Vector3();
    const q = new THREE.Quaternion();

    const onLoop = (dist: number) => {
      let d = ((dist % world.loopLength) + world.loopLength) % world.loopLength;
      for (let i = 0; i < 4; i++) {
        const a = world.loop[i];
        const b = world.loop[(i + 1) % 4];
        const len = a.distanceTo(b);
        if (d <= len) return a.clone().lerp(b, len === 0 ? 0 : d / len);
        d -= len;
      }
      return world.loop[0].clone();
    };

    world.vehicles.forEach((v, i) => {
      const g = vehicleRefs.current[i];
      if (!g) return;
      if (v.route === "loop") {
        // heading from a point slightly ahead, which eases the truck round each corner
        const here = onLoop(v.offset + t * v.speed);
        const ahead = onLoop(v.offset + t * v.speed + 0.2);
        g.position.set(here.x, 0, here.y);
        g.rotation.y = -Math.atan2(ahead.y - here.y, ahead.x - here.x);
      } else {
        const dir = v.route === "east" ? 1 : -1;
        const travelled = (v.offset + t * v.speed) % (ROAD_HALF * 2);
        g.position.set(dir * (travelled - ROAD_HALF), -0.01, world.roadZ + dir * ROAD_LANE);
        g.rotation.y = dir === 1 ? 0 : Math.PI;
      }
    });

    if (bodies.current && heads.current) {
      world.people.forEach((w, i) => {
        const len = Math.hypot(w.bx - w.ax, w.bz - w.az) || 1;
        const d = (t * w.speed + w.phase * len * 2) % (len * 2);
        const f = (d < len ? d : len * 2 - d) / len;
        const x = w.ax + (w.bx - w.ax) * f;
        const z = w.az + (w.bz - w.az) * f;
        const bob = Math.abs(Math.sin(t * 9 + w.phase * 10)) * 0.0015;
        q.identity();
        bodies.current!.setMatrixAt(i, m.compose(p.set(x, w.y + 0.019 + bob, z), q, s.set(0.011, 0.038, 0.009)));
        heads.current!.setMatrixAt(i, m.compose(p.set(x, w.y + 0.043 + bob, z), q, s.set(0.0105, 0.0105, 0.0105)));
      });
      bodies.current.instanceMatrix.needsUpdate = true;
      heads.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      {world.vehicles.map((v, i) => (
        <group
          key={`${v.route}${i}`}
          ref={(el) => {
            vehicleRefs.current[i] = el;
          }}
        >
          {v.kind === "truck" ? <Truck colour={v.colour} /> : <Car colour={v.colour} />}
        </group>
      ))}

      <instancedMesh key={`b${world.people.length}`} ref={bodies} args={[undefined, undefined, world.people.length]} castShadow frustumCulled={false}>
        <boxGeometry />
        <meshStandardMaterial roughness={0.8} />
      </instancedMesh>
      <instancedMesh key={`h${world.people.length}`} ref={heads} args={[undefined, undefined, world.people.length]} frustumCulled={false}>
        <sphereGeometry args={[0.5, 8, 6]} />
        <meshStandardMaterial color="#c99b77" roughness={0.8} />
      </instancedMesh>
    </>
  );
}
