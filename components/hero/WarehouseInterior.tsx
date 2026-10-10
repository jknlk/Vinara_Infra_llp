"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { DOCK_PITCH, FLOOR, Instanced, ORBIT_HOME, dockXs, rnd, seedOf, textures, worldBox, type Item } from "./planKit";
import type { LaidOutBuilding } from "./layout";
import { Walker } from "./SiteLife";

// back-to-back rack pair plus one aisle
const MODULE = 0.156;
const RACK_DEPTH = 0.03;
const BAY = 0.075;
const LEVEL = 0.072;
const LEVELS = 5;
const EYE = FLOOR + 0.055;
const WALK_SPEED = 0.3;
const LOAD_COLOURS = ["#c9a36b", "#b98d55", "#d2b07c", "#c9a36b", "#e9ecee", "#dfe6ea", "#2f5f9e", "#a8452f", "#3d7a4f"];

type Box2 = { minX: number; maxX: number; minZ: number; maxZ: number };

export interface InteriorPlan {
  iw: number;
  id: number;
  front: number;
  crossZ: number;
  rackZ0: number;
  rackZ1: number;
  moduleXs: number[];
  colliders: Box2[];
  // entry point and heading, in building-local coordinates
  start: { x: number; z: number; yaw: number };
}

export function interiorPlan(b: LaidOutBuilding): InteriorPlan {
  const iw = b.width - 0.04;
  const id = b.depth - 0.04;
  const front = id / 2;
  const crossZ = front - 0.47;
  const rackZ1 = crossZ - 0.07;
  const rackZ0 = -front + 0.1;
  const count = Math.max(1, Math.floor((iw - 0.3) / MODULE));
  const moduleXs = Array.from({ length: count }, (_, i) => (i - (count - 1) / 2) * MODULE);
  const colliders = moduleXs.map((x) => ({ minX: x - 0.04, maxX: x + 0.04, minZ: rackZ0 - 0.01, maxZ: rackZ1 + 0.01 }));
  return { iw, id, front, crossZ, rackZ0, rackZ1, moduleXs, colliders, start: { x: iw / 2 - 0.22, z: crossZ, yaw: Math.PI / 2 } };
}

export function Forklift({ loaded }: { loaded?: boolean }) {
  return (
    <group>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.05, 0.026, 0.03]} />
        <meshStandardMaterial color="#f2b01e" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[-0.02, 0.018, 0]}>
        <boxGeometry args={[0.016, 0.03, 0.031]} />
        <meshStandardMaterial color="#2a2d31" roughness={0.8} />
      </mesh>
      {[-0.012, 0.012].map((z) => (
        <mesh key={z} position={[0.028, 0.045, z]}>
          <boxGeometry args={[0.004, 0.09, 0.004]} />
          <meshStandardMaterial color="#2a2d31" roughness={0.6} metalness={0.5} />
        </mesh>
      ))}
      {[-0.009, 0.009].map((z) => (
        <mesh key={z} position={[0.05, 0.006, z]}>
          <boxGeometry args={[0.04, 0.002, 0.005]} />
          <meshStandardMaterial color="#3b3f44" roughness={0.5} metalness={0.7} />
        </mesh>
      ))}
      {/* overhead guard */}
      <mesh position={[-0.004, 0.066, 0]}>
        <boxGeometry args={[0.036, 0.003, 0.03]} />
        <meshStandardMaterial color="#2a2d31" roughness={0.7} />
      </mesh>
      {[
        [-0.02, -0.013],
        [-0.02, 0.013],
        [0.012, -0.013],
        [0.012, 0.013],
      ].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 0.049, z]}>
          <boxGeometry args={[0.003, 0.032, 0.003]} />
          <meshStandardMaterial color="#2a2d31" roughness={0.7} />
        </mesh>
      ))}
      {loaded ? (
        <mesh position={[0.05, 0.03, 0]}>
          <boxGeometry args={[0.032, 0.044, 0.034]} />
          <meshStandardMaterial color="#c9a36b" roughness={0.9} />
        </mesh>
      ) : null}
    </group>
  );
}

// reach truck shuttling along the cross aisle
function MovingForklift({ from, to, z }: { from: number; to: number; z: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const span = to - from;
    const t = (clock.getElapsedTime() * 0.14) % (span * 2);
    const forward = t < span;
    ref.current.position.x = forward ? from + t : to - (t - span);
    ref.current.rotation.y = forward ? 0 : Math.PI;
  });
  return (
    <group ref={ref} position={[from, FLOOR, z]}>
      <Forklift loaded />
    </group>
  );
}

export function Interior({
  b,
  plan,
  onFloorClick,
}: {
  b: LaidOutBuilding;
  plan: InteriorPlan;
  onFloorClick: (x: number, z: number) => void;
}) {
  const tex = textures();
  const h = b.height;
  const { iw, id, front, crossZ, rackZ0, rackZ1, moduleXs } = plan;
  const wallH = h - FLOOR;

  const geo = useMemo(() => {
    const rise = b.depth * 0.055;
    const shape = new THREE.Shape();
    shape.moveTo(-id / 2, 0);
    shape.lineTo(id / 2, 0);
    shape.lineTo(0, rise);
    shape.closePath();
    const liner = new THREE.ExtrudeGeometry(shape, { depth: iw, bevelEnabled: false });
    liner.translate(0, 0, -iw / 2);
    liner.rotateY(Math.PI / 2);
    return {
      rise,
      liner,
      floor: worldBox(iw, 0.01, id),
      longWall: worldBox(iw, wallH, 0.004),
      endWall: worldBox(0.004, wallH, id),
      slopeLen: Math.hypot(id / 2, rise),
      pitch: Math.atan2(rise, id / 2),
    };
  }, [b.depth, iw, id, wallH]);

  const parts = useMemo(() => {
    const seed = seedOf(b.id);
    const { rise, slopeLen, pitch } = geo;

    // portal frames: columns on both long walls, rafters following the roof pitch
    const steel: Item[] = [];
    const frames = Math.max(2, Math.round(iw / 0.22));
    for (let i = 0; i <= frames; i++) {
      const x = -iw / 2 + (i * iw) / frames;
      for (const side of [1, -1]) {
        steel.push({ p: [x, FLOOR + wallH / 2, side * (front - 0.012)], s: [0.014, wallH, 0.02] });
        steel.push({ p: [x, h - 0.014 + rise / 2, (side * front) / 2], s: [0.012, 0.02, slopeLen], r: [side * pitch, 0, 0] });
      }
    }
    for (const side of [1, -1]) {
      for (let k = 1; k <= 5; k++) {
        const t = k / 6;
        steel.push({ p: [0, h - 0.012 + rise * t, side * front * (1 - t)], s: [iw, 0.006, 0.008] });
      }
    }

    // translucent roof-lights (same bays as the exterior) and high-bay luminaires
    const roofLights: Item[] = [];
    const bays = Math.max(2, Math.floor(b.width / 0.55));
    for (let i = 0; i < bays; i++) {
      const x = -b.width / 2 + ((i + 0.5) * b.width) / bays;
      for (const side of [1, -1]) {
        roofLights.push({ p: [x, h - 0.007 + rise / 2, (side * front) / 2], s: [0.075, 0.002, slopeLen * 0.7], r: [side * pitch, 0, 0] });
      }
    }
    const luminaires: Item[] = [];
    for (let x = -iw / 2 + 0.2; x < iw / 2 - 0.1; x += 0.3) {
      for (let k = 0; k < 4; k++) {
        luminaires.push({ p: [x, h - 0.03, -front + (id * (k + 0.5)) / 4], s: [0.035, 0.006, 0.035] });
      }
    }

    // selective pallet racking, runs perpendicular to the dock wall
    const uprights: Item[] = [];
    const beams: Item[] = [];
    const loads: Item[] = [];
    const pallets: Item[] = [];
    const lines: Item[] = [];
    // darker slab under the racking, standing in for the shadow it casts
    const shade: Item[] = [];
    const rackBays = Math.max(1, Math.floor((rackZ1 - rackZ0) / BAY));
    const run = rackBays * BAY;
    const rackH = LEVELS * LEVEL + 0.06;
    moduleXs.forEach((mx, m) => {
      for (const half of [-1, 1]) {
        const rx = mx + half * (RACK_DEPTH / 2 + 0.003);
        for (let j = 0; j <= rackBays; j++) {
          uprights.push({ p: [rx, FLOOR + rackH / 2, rackZ0 + j * BAY], s: [RACK_DEPTH, rackH, 0.004] });
        }
        for (let level = 1; level <= LEVELS; level++) {
          for (const face of [-1, 1]) {
            beams.push({ p: [rx + (face * RACK_DEPTH) / 2, FLOOR + level * LEVEL, rackZ0 + run / 2], s: [0.003, 0.007, run] });
          }
        }
        for (let j = 0; j < rackBays; j++) {
          for (let level = 0; level <= LEVELS; level++) {
            const n = seed + m * 131 + (half + 1) * 17 + j * 7.3 + level * 3.1;
            if (rnd(n) > 0.84) continue;
            const sy = 0.03 + rnd(n + 1) * 0.028;
            const y = FLOOR + level * LEVEL + (level > 0 ? 0.0035 : 0);
            const z = rackZ0 + (j + 0.5) * BAY;
            pallets.push({ p: [rx, y + 0.002, z], s: [0.027, 0.004, 0.064] });
            loads.push({
              p: [rx, y + 0.004 + sy / 2, z],
              s: [0.025, sy, 0.052 + rnd(n + 2) * 0.012],
              c: LOAD_COLOURS[Math.floor(rnd(n + 3) * LOAD_COLOURS.length)],
            });
          }
        }
      }
      shade.push({ p: [mx, FLOOR + 0.0006, rackZ0 + run / 2], s: [0.09, 0.001, run + 0.02] });
      // aisle edge lines either side of the module
      for (const edge of [-1, 1]) {
        lines.push({ p: [mx + edge * 0.042, FLOOR + 0.001, rackZ0 + run / 2], s: [0.004, 0.002, run] });
      }
    });
    lines.push({ p: [0, FLOOR + 0.001, rackZ1 + 0.02], s: [iw - 0.2, 0.002, 0.005] });

    // dock wall: sectional doors (some open to daylight), levellers, staging lanes and staged pallets
    const doors: Item[] = [];
    const openDoors: Item[] = [];
    const levellers: Item[] = [];
    const staged: Item[] = [];
    dockXs(b.width).forEach((x, i) => {
      const open = rnd(seed + i * 5.3) < 0.28;
      (open ? openDoors : doors).push({ p: [x, FLOOR + 0.0625, front - 0.004], s: [0.12, 0.125, 0.006] });
      levellers.push({ p: [x, FLOOR + 0.001, front - 0.05], s: [0.09, 0.002, 0.08] });
      lines.push({ p: [x + DOCK_PITCH / 2, FLOOR + 0.001, front - 0.2], s: [0.005, 0.002, 0.3] });
      const stack = Math.floor(rnd(seed + i * 2.9) * 5);
      for (let k = 0; k < stack; k++) {
        const sy = 0.03 + rnd(seed + i + k * 1.7) * 0.03;
        staged.push({
          p: [x + (k % 2 ? 0.04 : -0.04), FLOOR + sy / 2, front - 0.14 - Math.floor(k / 2) * 0.075],
          s: [0.03, sy, 0.036],
          c: LOAD_COLOURS[Math.floor(rnd(seed + i * 3 + k) * LOAD_COLOURS.length)],
        });
      }
    });

    return { steel, roofLights, luminaires, uprights, beams, loads, pallets, lines, shade, doors, openDoors, levellers, staged };
  }, [b.id, b.width, geo, h, iw, id, front, wallH, rackZ0, rackZ1, moduleXs]);

  const floorClick = (e: ThreeEvent<MouseEvent>) => {
    // a drag is a look-around, not a walk command
    if (e.delta > 6) return;
    e.stopPropagation();
    onFloorClick(e.point.x - b.x, e.point.z - b.z);
  };

  return (
    <group position={[b.x, 0, b.z]}>
      <mesh geometry={geo.floor} position={[0, FLOOR - 0.005, 0]} onClick={floorClick}>
        <meshStandardMaterial color="#9fa3a3" map={tex.slab} roughness={0.3} metalness={0.05} />
      </mesh>

      {/* inner liner: walls, pitched ceiling, daylight bands */}
      {[1, -1].map((side) => (
        <mesh key={`l${side}`} geometry={geo.longWall} position={[0, FLOOR + wallH / 2, side * front]}>
          <meshStandardMaterial color="#d9dee1" map={tex.cladding} roughness={0.7} />
        </mesh>
      ))}
      {[1, -1].map((side) => (
        <mesh key={`e${side}`} geometry={geo.endWall} position={[(side * iw) / 2, FLOOR + wallH / 2, 0]}>
          <meshStandardMaterial color="#d9dee1" map={tex.cladding} roughness={0.7} />
        </mesh>
      ))}
      <mesh geometry={geo.liner} position={[0, h - 0.004, 0]}>
        <meshStandardMaterial color="#c4cbd0" roughness={0.8} side={THREE.BackSide} />
      </mesh>
      {[1, -1].map((side) => (
        <mesh key={`d${side}`} position={[0, h * 0.74, side * (front - 0.004)]}>
          <boxGeometry args={[iw * 0.95, h * 0.09, 0.004]} />
          <meshStandardMaterial color="#eaf4fb" emissive="#dcecf8" emissiveIntensity={1.1} />
        </mesh>
      ))}

      <Instanced items={parts.steel} shadows={false}>
        <boxGeometry />
        <meshStandardMaterial color="#b9c1c7" roughness={0.6} metalness={0.3} />
      </Instanced>
      <Instanced items={parts.roofLights} shadows={false}>
        <boxGeometry />
        <meshStandardMaterial color="#ffffff" emissive="#eaf5ff" emissiveIntensity={1.6} />
      </Instanced>
      <Instanced items={parts.luminaires} shadows={false}>
        <boxGeometry />
        <meshStandardMaterial color="#ffffff" emissive="#fff6e0" emissiveIntensity={2.2} />
      </Instanced>

      <Instanced items={parts.uprights} shadows={false}>
        <boxGeometry />
        <meshStandardMaterial color="#1f4e9c" roughness={0.55} metalness={0.3} />
      </Instanced>
      <Instanced items={parts.beams} shadows={false}>
        <boxGeometry />
        <meshStandardMaterial color="#e8731a" roughness={0.55} metalness={0.3} />
      </Instanced>
      <Instanced items={parts.pallets} shadows={false}>
        <boxGeometry />
        <meshStandardMaterial color="#a98452" roughness={0.9} />
      </Instanced>
      <Instanced items={parts.loads} shadows={false}>
        <boxGeometry />
        <meshStandardMaterial roughness={0.8} />
      </Instanced>
      <Instanced items={parts.staged} shadows={false}>
        <boxGeometry />
        <meshStandardMaterial roughness={0.8} />
      </Instanced>

      <Instanced items={parts.shade} shadows={false}>
        <boxGeometry />
        <meshStandardMaterial color="#6f7375" roughness={0.6} />
      </Instanced>
      <Instanced items={parts.lines} shadows={false}>
        <boxGeometry />
        <meshStandardMaterial color="#f0c419" roughness={0.6} />
      </Instanced>
      {/* pedestrian walkway along the cross aisle */}
      <mesh position={[0, FLOOR + 0.001, crossZ + 0.09]}>
        <boxGeometry args={[iw - 0.2, 0.002, 0.03]} />
        <meshStandardMaterial color="#2f8f5b" roughness={0.6} />
      </mesh>

      <Instanced items={parts.doors} shadows={false}>
        <boxGeometry />
        <meshStandardMaterial color="#8a949d" map={tex.door} roughness={0.6} metalness={0.3} />
      </Instanced>
      <Instanced items={parts.openDoors} shadows={false}>
        <boxGeometry />
        <meshStandardMaterial color="#ffffff" emissive="#eef6ff" emissiveIntensity={2.4} />
      </Instanced>
      <Instanced items={parts.levellers} shadows={false}>
        <boxGeometry />
        <meshStandardMaterial color="#3a3f45" roughness={0.5} metalness={0.6} />
      </Instanced>

      <MovingForklift from={-iw / 2 + 0.3} to={iw / 2 - 0.6} z={crossZ - 0.02} />
      {/* staff on the pedestrian walkway and across the dock staging area */}
      {[0.1, 0.35, 0.6, 0.85].map((f, i) => (
        <Walker
          key={f}
          from={-iw / 2 + 0.2}
          to={iw / 2 - 0.3}
          y={FLOOR}
          z={i % 2 ? crossZ + 0.095 : front - 0.36 - i * 0.012}
          speed={0.04 + i * 0.006}
          phase={f}
          vest={i % 2 ? "#f2b01e" : "#e8731a"}
        />
      ))}
      <group position={[-iw / 2 + 0.16, FLOOR, front - 0.3]} rotation={[0, 0.6, 0]}>
        <Forklift />
      </group>
      <group position={[iw * 0.18, FLOOR, front - 0.24]} rotation={[0, -1.9, 0]}>
        <Forklift loaded />
      </group>

      {[-0.375, -0.125, 0.125, 0.375].map((f) => (
        <pointLight key={f} position={[iw * f, h * 0.8, crossZ * 0.4]} intensity={0.07} distance={3} decay={2} color="#fff4e2" />
      ))}
    </group>
  );
}

// first-person walk: drag to look, WASD / arrows to move, or tap the floor to walk there
export function WalkControls({
  b,
  plan,
  gotoRef,
}: {
  b: LaidOutBuilding;
  plan: InteriorPlan;
  gotoRef: React.RefObject<{ x: number; z: number } | null>;
}) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const dom = useThree((s) => s.gl.domElement);
  const view = useRef({ yaw: plan.start.yaw, pitch: -0.03, x: plan.start.x, z: plan.start.z, bob: 0 });
  const keys = useRef(new Set<string>());

  useEffect(() => {
    const v = view.current;
    v.yaw = plan.start.yaw;
    v.pitch = -0.03;
    v.x = plan.start.x;
    v.z = plan.start.z;
    gotoRef.current = null;

    const prev = { near: camera.near, far: camera.far, fov: camera.fov };
    camera.near = 0.008;
    camera.far = 120;
    camera.fov = 68;
    camera.updateProjectionMatrix();
    camera.rotation.order = "YXZ";
    const touchAction = dom.style.touchAction;
    dom.style.touchAction = "none";

    let drag: { x: number; y: number } | null = null;
    let hover = false;
    const down = (e: PointerEvent) => {
      drag = { x: e.clientX, y: e.clientY };
      dom.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      v.yaw -= (e.clientX - drag.x) * 0.0045;
      v.pitch = THREE.MathUtils.clamp(v.pitch - (e.clientY - drag.y) * 0.0045, -1.1, 1.1);
      drag = { x: e.clientX, y: e.clientY };
    };
    const up = () => {
      drag = null;
    };
    const enter = () => {
      hover = true;
    };
    const leave = () => {
      hover = false;
      keys.current.clear();
    };
    const keyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (!["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(k)) return;
      // only take the arrow keys from the page while the pointer is on the viewer
      if (!hover && !document.fullscreenElement) return;
      e.preventDefault();
      keys.current.add(k);
    };
    const keyUp = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase());

    dom.addEventListener("pointerdown", down);
    dom.addEventListener("pointermove", move);
    dom.addEventListener("pointerup", up);
    dom.addEventListener("pointercancel", up);
    dom.addEventListener("pointerenter", enter);
    dom.addEventListener("pointerleave", leave);
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    const held = keys.current;

    return () => {
      dom.removeEventListener("pointerdown", down);
      dom.removeEventListener("pointermove", move);
      dom.removeEventListener("pointerup", up);
      dom.removeEventListener("pointercancel", up);
      dom.removeEventListener("pointerenter", enter);
      dom.removeEventListener("pointerleave", leave);
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      held.clear();
      dom.style.touchAction = touchAction;
      camera.near = prev.near;
      camera.far = prev.far;
      camera.fov = prev.fov;
      camera.updateProjectionMatrix();
      camera.rotation.order = "XYZ";
      camera.position.set(ORBIT_HOME[0], ORBIT_HOME[1], ORBIT_HOME[2]);
    };
  }, [camera, dom, plan, gotoRef]);

  useFrame((_, delta) => {
    const v = view.current;
    const dt = Math.min(delta, 0.05);
    const k = keys.current;
    const fwd = (k.has("w") || k.has("arrowup") ? 1 : 0) - (k.has("s") || k.has("arrowdown") ? 1 : 0);
    const strafe = (k.has("d") ? 1 : 0) - (k.has("a") ? 1 : 0);
    const turn = (k.has("arrowleft") ? 1 : 0) - (k.has("arrowright") ? 1 : 0);
    v.yaw += turn * 1.6 * dt;

    let dx = 0;
    let dz = 0;
    if (fwd || strafe) {
      gotoRef.current = null;
      dx = (-Math.sin(v.yaw) * fwd + Math.cos(v.yaw) * strafe) * WALK_SPEED * dt;
      dz = (-Math.cos(v.yaw) * fwd - Math.sin(v.yaw) * strafe) * WALK_SPEED * dt;
    } else if (gotoRef.current) {
      const tx = gotoRef.current.x - v.x;
      const tz = gotoRef.current.z - v.z;
      const dist = Math.hypot(tx, tz);
      if (dist < 0.02) gotoRef.current = null;
      else {
        const step = Math.min(dist, WALK_SPEED * dt);
        dx = (tx / dist) * step;
        dz = (tz / dist) * step;
      }
    }

    const free = (x: number, z: number) => {
      if (Math.abs(x) > plan.iw / 2 - 0.05 || Math.abs(z) > plan.front - 0.05) return false;
      return !plan.colliders.some((c) => x > c.minX && x < c.maxX && z > c.minZ && z < c.maxZ);
    };
    const moved = dx !== 0 || dz !== 0;
    const ox = v.x;
    const oz = v.z;
    if (free(v.x + dx, v.z)) v.x += dx;
    if (free(v.x, v.z + dz)) v.z += dz;
    // walked into racking or a wall: give up on the tapped target
    if (moved && v.x === ox && v.z === oz) gotoRef.current = null;
    if (moved) v.bob += dt * 9;

    camera.position.set(b.x + v.x, EYE + (moved ? Math.sin(v.bob) * 0.0012 : 0), b.z + v.z);
    camera.rotation.set(v.pitch, v.yaw, 0);
  });

  return null;
}
