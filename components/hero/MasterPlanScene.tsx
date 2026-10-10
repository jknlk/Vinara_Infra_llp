"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { ArrowRight, LogOut, Maximize2, Minimize2, X } from "lucide-react";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import { PROJECTS, type Building } from "@/data/buildings";
import { layoutBuildings, siteRect, type LaidOutBuilding } from "./layout";
import { DOCK_PITCH, Instanced, ORBIT_HOME, dockXs, isActiveDock, rnd, seedOf, textures, worldBox, type Item, type Vec3 } from "./planKit";
import { Interior, WalkControls, interiorPlan } from "./WarehouseInterior";
import SiteLife from "./SiteLife";
import DockActivity from "./DockActivity";

const STATUS_HEX: Record<Building["status"], string> = {
  completed: "#1e7a4b",
  wip: "#f2841f",
  upcoming: "#7fb6e8",
};

const SKY_HORIZON = "#dbe9f4";
const SUN: Vec3 = [-7, 11, 9];
const CAB_COLOURS = ["#1f4e9c", "#b3261e", "#f4f5f6", "#2f6b3a", "#e0a020"];
const CAR_COLOURS = ["#e9ebed", "#c7ccd1", "#2b2f34", "#8d949b", "#9c2b22", "#1f4e9c", "#e9ebed", "#5c6670"];

function TowerCrane({ position, rotation }: { position: Vec3; rotation: number }) {
  const mast = 1.5;
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[0.2, 0.04, 0.2]} />
        <meshStandardMaterial color="#9a9a94" roughness={0.9} />
      </mesh>
      <mesh position={[0, mast / 2, 0]} castShadow>
        <boxGeometry args={[0.05, mast, 0.05]} />
        <meshStandardMaterial color="#f2b01e" roughness={0.6} />
      </mesh>
      <mesh position={[0.55, mast, 0]} castShadow>
        <boxGeometry args={[1.7, 0.035, 0.035]} />
        <meshStandardMaterial color="#f2b01e" roughness={0.6} />
      </mesh>
      <mesh position={[0, mast + 0.1, 0]}>
        <boxGeometry args={[0.03, 0.2, 0.03]} />
        <meshStandardMaterial color="#f2b01e" roughness={0.6} />
      </mesh>
      <mesh position={[-0.26, mast - 0.04, 0]} castShadow>
        <boxGeometry args={[0.14, 0.09, 0.08]} />
        <meshStandardMaterial color="#6f7479" roughness={0.9} />
      </mesh>
      <mesh position={[0.06, mast - 0.06, 0.04]}>
        <boxGeometry args={[0.07, 0.07, 0.06]} />
        <meshStandardMaterial color="#e9edf0" roughness={0.4} />
      </mesh>
      {/* hoist line */}
      <mesh position={[0.95, mast - 0.35, 0]}>
        <boxGeometry args={[0.006, 0.7, 0.006]} />
        <meshStandardMaterial color="#2b2f33" />
      </mesh>
    </group>
  );
}

function BuildingMesh({
  b,
  selected,
  inside,
  interactive,
  onSelect,
}: {
  b: LaidOutBuilding;
  selected: boolean;
  // the camera is walking around inside this building
  inside: boolean;
  interactive: boolean;
  onSelect: (id: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const tex = textures();
  const isUpcoming = b.status === "upcoming";
  const color = STATUS_HEX[b.status];
  const w = b.width;
  const d = b.depth;
  const h = b.height;
  const rise = d * 0.055;

  const geo = useMemo(() => {
    const body = worldBox(w, h, d);
    const halfSpan = (d * 1.04) / 2;
    const slopeLen = Math.hypot(halfSpan, rise);
    // gable infill under the roof sheets: ridge runs along the long side (x)
    const shape = new THREE.Shape();
    shape.moveTo(-d / 2, 0);
    shape.lineTo(d / 2, 0);
    shape.lineTo(0, rise);
    shape.closePath();
    const gable = new THREE.ExtrudeGeometry(shape, { depth: w, bevelEnabled: false });
    gable.translate(0, 0, -w / 2);
    gable.rotateY(Math.PI / 2);
    const bays = Math.max(2, Math.floor(w / 0.55));
    return {
      body,
      edges: new THREE.EdgesGeometry(body),
      gable,
      slope: worldBox(w * 1.03, 0.014, slopeLen),
      slopeLen,
      pitch: Math.atan2(rise, halfSpan),
      halfSpan,
      office: worldBox(0.42, h * 0.62, d * 0.42),
      bays,
      solar: worldBox((w / bays - 0.075) * 0.8, 0.004, slopeLen * 0.62),
    };
  }, [w, h, d, rise]);

  const parts = useMemo(() => {
    const seed = seedOf(b.id);
    const front = d / 2;
    const xs = dockXs(w);

    const doors: Item[] = [];
    const seals: Item[] = [];
    const trailers: Item[] = [];
    const chassis: Item[] = [];
    const cabs: Item[] = [];
    const activeXs: number[] = [];
    xs.forEach((x, i) => {
      seals.push({ p: [x, 0.105, front + 0.003], s: [0.15, 0.15, 0.008] });
      // docks in use get an animated shutter and their own truck from DockActivity
      if (isActiveDock(i)) {
        activeXs.push(x);
        return;
      }
      doors.push({ p: [x, 0.1, front + 0.007], s: [0.12, 0.125, 0.008] });
      const r = rnd(seed + i * 3.7);
      if (r < 0.42) {
        trailers.push({ p: [x, 0.076, front + 0.2], s: [0.07, 0.088, 0.36] });
        chassis.push({ p: [x, 0.018, front + 0.21], s: [0.058, 0.03, 0.32] });
        if (r < 0.26) {
          cabs.push({
            p: [x, 0.046, front + 0.43],
            s: [0.066, 0.086, 0.085],
            c: CAB_COLOURS[Math.floor(rnd(seed + i) * CAB_COLOURS.length)],
          });
        }
      }
    });

    // rainwater downpipes between every third dock, front and rear
    const pipes: Item[] = [];
    for (let i = 0; i <= xs.length; i += 3) {
      const x = xs[0] + (i - 0.5) * DOCK_PITCH;
      pipes.push({ p: [x, h / 2, front + 0.008], s: [0.014, h, 0.014] });
      pipes.push({ p: [x, h / 2, -front - 0.008], s: [0.014, h, 0.014] });
    }

    // translucent roof-light strips down each slope, ridge ventilators, and PV arrays between the roof-lights
    const lights: Item[] = [];
    const vents: Item[] = [];
    const solar: Vec3[] = [];
    for (let i = 0; i < geo.bays; i++) {
      const x = -w / 2 + ((i + 0.5) * w) / geo.bays;
      lights.push({ p: [x, 0.009, 0], s: [0.075, 0.006, geo.slopeLen * 0.7] });
      if (i < geo.bays - 1) {
        vents.push({ p: [x + w / geo.bays / 2, h + rise + 0.022, 0], s: [0.05, 0.04, 0.05] });
        solar.push([x + w / geo.bays / 2, 0.01, 0]);
      }
    }

    // drive-in doors on the rear elevation
    const rearDoors: Item[] = [-0.3, 0, 0.3].map((f) => ({ p: [w * f, 0.085, -front - 0.005], s: [0.15, 0.17, 0.01] }));

    // staff car park along the gable end, behind the office annex
    const cars: Item[] = [];
    const cabins: Item[] = [];
    const bayLines: Item[] = [];
    const cx = w / 2 + 0.2;
    let n = 0;
    for (let z = -front + 0.16; z < front - d * 0.42 - 0.1; z += 0.075) {
      bayLines.push({ p: [cx, 0.003, z - 0.0375], s: [0.15, 0.004, 0.005] });
      if (rnd(seed + n * 4.1) < 0.62) {
        const c = CAR_COLOURS[Math.floor(rnd(seed + n * 1.9) * CAR_COLOURS.length)];
        cars.push({ p: [cx, 0.02, z], s: [0.12, 0.026, 0.048], c });
        cabins.push({ p: [cx + 0.006, 0.043, z], s: [0.06, 0.02, 0.043] });
      }
      n++;
    }

    return { activeXs, doors, seals, trailers, chassis, cabs, pipes, lights, vents, solar, rearDoors, cars, cabins, bayLines, dockRun: xs.length * DOCK_PITCH };
  }, [b.id, w, d, h, rise, geo.slopeLen, geo.bays]);

  useEffect(() => {
    if (!groupRef.current) return;
    gsap.fromTo(groupRef.current.scale, { y: 0.001 }, { y: 1, duration: 0.9, ease: "expo.out", delay: 0.05 * Math.random() });
  }, [b.id]);

  const pointer = interactive
    ? {
        onClick: (e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          onSelect(b.id);
        },
        onPointerOver: (e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        },
        onPointerOut: () => {
          document.body.style.cursor = "auto";
        },
      }
    : {};

  if (isUpcoming) {
    // plot reserved for a future building: pegged-out slab only
    return (
      <group ref={groupRef} position={[b.x, 0, b.z]} {...pointer}>
        <mesh geometry={geo.body} position={[0, h / 2, 0]} receiveShadow>
          <meshStandardMaterial color="#c9c4b6" roughness={1} transparent opacity={0.75} />
        </mesh>
        <lineSegments geometry={geo.edges} position={[0, h / 2, 0]}>
          <lineBasicMaterial color={selected ? "#ffa94d" : color} />
        </lineSegments>
      </group>
    );
  }

  return (
    <group ref={groupRef} position={[b.x, 0, b.z]}>
      {/* concrete dock apron in front of the loading bays */}
      <mesh position={[0, 0.008, d / 2 + 0.3]} receiveShadow>
        <boxGeometry args={[w + 0.3, 0.016, 0.6]} />
        <meshStandardMaterial color="#b9b7ae" roughness={0.95} />
      </mesh>

      <group {...pointer}>
        {/* profiled metal cladding */}
        <mesh geometry={geo.body} position={[0, h / 2, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#e6eaed" map={tex.cladding} roughness={0.5} metalness={0.25} />
        </mesh>

        {/* these run through the volume, so they are dropped while the camera is inside */}
        {!inside ? (
          <>
            {/* dock-height concrete dado wall */}
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
              <boxGeometry args={[w + 0.012, 0.1, d + 0.012]} />
              <meshStandardMaterial color="#a5a39b" roughness={0.95} />
            </mesh>
            {/* high-level polycarbonate daylight band on the long elevations */}
            <mesh position={[0, h * 0.74, 0]}>
              <boxGeometry args={[w * 0.95, h * 0.09, d + 0.008]} />
              <meshStandardMaterial color="#a9cde3" roughness={0.15} metalness={0.3} emissive="#3d6f8f" emissiveIntensity={0.12} />
            </mesh>
            {/* eave fascia, coloured by construction status */}
            <mesh position={[0, h - 0.02, 0]}>
              <boxGeometry args={[w + 0.03, 0.04, d + 0.03]} />
              <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
            <mesh geometry={geo.gable} position={[0, h, 0]}>
              <meshStandardMaterial color="#dfe4e8" roughness={0.6} />
            </mesh>
          </>
        ) : null}

        {/* roof: two sheeted slopes with roof-lights, PV on the rear slope of finished buildings, ridge cap */}
        {[1, -1].map((side) => (
          <group key={side} position={[0, h + rise / 2 + 0.006, (side * geo.halfSpan) / 2]} rotation={[side * geo.pitch, 0, 0]}>
            <mesh geometry={geo.slope} castShadow receiveShadow>
              <meshStandardMaterial color="#c3ccd3" map={tex.roof} roughness={0.4} metalness={0.55} />
            </mesh>
            <Instanced items={parts.lights}>
              <boxGeometry />
              <meshStandardMaterial color="#eef6fb" roughness={0.3} emissive="#9fc4de" emissiveIntensity={0.2} />
            </Instanced>
            {side === -1 && b.status === "completed"
              ? parts.solar.map((p) => (
                  <mesh key={p[0]} geometry={geo.solar} position={p}>
                    <meshStandardMaterial color="#17305e" map={tex.solar} roughness={0.2} metalness={0.6} />
                  </mesh>
                ))
              : null}
          </group>
        ))}
        <mesh position={[0, h + rise + 0.008, 0]}>
          <boxGeometry args={[w * 1.03, 0.014, 0.06]} />
          <meshStandardMaterial color="#aab4bc" roughness={0.5} metalness={0.4} />
        </mesh>
        <Instanced items={parts.vents}>
          <cylinderGeometry args={[0.5, 0.5, 1, 10]} />
          <meshStandardMaterial color="#b9c2c9" roughness={0.4} metalness={0.6} />
        </Instanced>

        {/* loading docks: seals, sectional doors, canopy */}
        <Instanced items={parts.seals}>
          <boxGeometry />
          <meshStandardMaterial color="#16191d" roughness={0.9} />
        </Instanced>
        <Instanced items={parts.doors}>
          <boxGeometry />
          <meshStandardMaterial color="#5d6873" map={tex.door} roughness={0.6} metalness={0.3} />
        </Instanced>
        <mesh position={[0, 0.215, d / 2 + 0.085]} castShadow>
          <boxGeometry args={[parts.dockRun + 0.06, 0.012, 0.17]} />
          <meshStandardMaterial color="#56616c" roughness={0.6} metalness={0.3} />
        </mesh>
        <Instanced items={parts.rearDoors}>
          <boxGeometry />
          <meshStandardMaterial color="#5d6873" map={tex.door} roughness={0.6} metalness={0.3} />
        </Instanced>
        <Instanced items={parts.pipes}>
          <boxGeometry />
          <meshStandardMaterial color="#6d7780" roughness={0.6} />
        </Instanced>

        {/* two-storey glazed office annex on the gable end */}
        <group position={[w / 2 + 0.21, 0, d / 2 - d * 0.21]}>
          <mesh geometry={geo.office} position={[0, h * 0.31, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#3f7396" map={tex.glazing} roughness={0.08} metalness={0.75} />
          </mesh>
          <mesh position={[0, h * 0.62 + 0.012, 0]} castShadow>
            <boxGeometry args={[0.45, 0.024, d * 0.42 + 0.03]} />
            <meshStandardMaterial color="#eef1f3" roughness={0.7} />
          </mesh>
          <mesh position={[0.24, 0.1, 0]} castShadow>
            <boxGeometry args={[0.1, 0.01, 0.16]} />
            <meshStandardMaterial color="#eef1f3" roughness={0.7} />
          </mesh>
        </group>
      </group>

      <DockActivity b={b} xs={parts.activeXs} />

      {/* trailers on the docks, some with tractor units still coupled */}
      <Instanced items={parts.trailers}>
        <boxGeometry />
        <meshStandardMaterial color="#f1f3f4" roughness={0.45} metalness={0.1} />
      </Instanced>
      <Instanced items={parts.chassis}>
        <boxGeometry />
        <meshStandardMaterial color="#1c1f22" roughness={0.9} />
      </Instanced>
      <Instanced items={parts.cabs}>
        <boxGeometry />
        <meshStandardMaterial roughness={0.35} metalness={0.4} />
      </Instanced>

      <Instanced items={parts.bayLines} shadows={false}>
        <boxGeometry />
        <meshStandardMaterial color="#eceae2" roughness={0.8} />
      </Instanced>
      <Instanced items={parts.cars}>
        <boxGeometry />
        <meshStandardMaterial roughness={0.3} metalness={0.5} />
      </Instanced>
      <Instanced items={parts.cabins}>
        <boxGeometry />
        <meshStandardMaterial color="#1a2229" roughness={0.1} metalness={0.8} />
      </Instanced>

      {b.status === "wip" ? (
        <TowerCrane position={[-w / 2 - 0.35, 0, -d / 2 - 0.4]} rotation={0.5 + rnd(seedOf(b.id)) * 0.8} />
      ) : null}

      {selected ? (
        <lineSegments geometry={geo.edges} position={[0, h / 2, 0]} scale={1.01}>
          <lineBasicMaterial color="#ffa94d" />
        </lineSegments>
      ) : null}
    </group>
  );
}

function Site({ laid }: { laid: LaidOutBuilding[] }) {
  const tex = textures();
  const rect = useMemo(() => siteRect(laid), [laid]);

  const site = useMemo(() => {
    const sx = rect.maxX - rect.minX;
    const sz = rect.maxZ - rect.minZ;
    const cx = (rect.minX + rect.maxX) / 2;
    const cz = (rect.minZ + rect.maxZ) / 2;

    // compound wall and the landscaped strip just inside it
    const walls: Item[] = [
      { p: [cx, 0.05, rect.minZ], s: [sx, 0.1, 0.03] },
      { p: [cx, 0.05, rect.maxZ], s: [sx, 0.1, 0.03] },
      { p: [rect.minX, 0.05, cz], s: [0.03, 0.1, sz] },
      { p: [rect.maxX, 0.05, cz], s: [0.03, 0.1, sz] },
    ];
    const verges: Item[] = [
      { p: [cx, 0.012, rect.minZ + 0.22], s: [sx - 0.1, 0.024, 0.34] },
      { p: [cx, 0.012, rect.maxZ - 0.22], s: [sx - 0.1, 0.024, 0.34] },
      { p: [rect.minX + 0.22, 0.012, cz], s: [0.34, 0.024, sz - 0.1] },
      { p: [rect.maxX - 0.22, 0.012, cz], s: [0.34, 0.024, sz - 0.1] },
    ];

    // trees: trunk plus two overlapping crowns
    const crowns: Item[] = [];
    const trunks: Item[] = [];
    const greens = ["#3f6b34", "#4c7a3d", "#58873f", "#35602f"];
    const plant = (px: number, pz: number, n: number) => {
      const r = 0.11 + rnd(n) * 0.08;
      const x = px + (rnd(n + 9) - 0.5) * 0.12;
      const z = pz + (rnd(n + 5) - 0.5) * 0.12;
      const trunk = 0.1 + rnd(n + 3) * 0.06;
      const c = greens[Math.floor(rnd(n + 2) * greens.length)];
      trunks.push({ p: [x, trunk / 2, z], s: [0.022, trunk, 0.022] });
      crowns.push({ p: [x, trunk + r * 0.9, z], s: [r, r * 1.2, r], c });
      crowns.push({ p: [x + r * 0.45, trunk + r * 1.5, z - r * 0.3], s: [r * 0.7, r * 0.8, r * 0.7], c });
    };
    let n = 1;
    for (let x = rect.minX + 0.4; x < rect.maxX - 0.3; x += 0.6) {
      plant(x, rect.minZ + 0.22, n++);
      plant(x, rect.maxZ - 0.22, n++);
    }
    for (let z = rect.minZ + 1.0; z < rect.maxZ - 0.9; z += 0.6) {
      plant(rect.minX + 0.22, z, n++);
      plant(rect.maxX - 0.22, z, n++);
    }

    // per row of docks: dashed centre line on the service road, and yard lighting columns
    const dashes: Item[] = [];
    const poles: Item[] = [];
    const lamps: Item[] = [];
    const rows = new Map<number, number>();
    laid.forEach((b) => rows.set(b.z, Math.max(rows.get(b.z) ?? 0, b.depth)));
    rows.forEach((depth, z) => {
      const lane = z + depth / 2 + 1.2;
      for (let x = rect.minX + 0.7; x < rect.maxX - 0.7; x += 0.55) {
        dashes.push({ p: [x, 0.006, lane], s: [0.26, 0.012, 0.02] });
      }
      for (let x = rect.minX + 1.1; x < rect.maxX - 0.8; x += 1.5) {
        poles.push({ p: [x, 0.19, lane + 0.42], s: [0.012, 0.38, 0.012] });
        lamps.push({ p: [x, 0.385, lane + 0.37], s: [0.03, 0.008, 0.11] });
      }
    });
    // public road outside the front wall
    for (let x = -60; x < 60; x += 0.9) dashes.push({ p: [x, -0.004, rect.maxZ + 0.85], s: [0.4, 0.012, 0.025] });

    return { sx, sz, cx, cz, walls, verges, crowns, trunks, dashes, poles, lamps };
  }, [rect, laid]);

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]} receiveShadow>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color="#7f9a5c" map={tex.grass} roughness={1} />
      </mesh>
      {/* paved compound */}
      <mesh position={[site.cx, -0.05, site.cz]} receiveShadow>
        <boxGeometry args={[site.sx, 0.1, site.sz]} />
        <meshStandardMaterial color="#5a5e64" map={tex.asphalt} roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.02, rect.maxZ + 0.85]} receiveShadow>
        <boxGeometry args={[400, 0.02, 0.9]} />
        <meshStandardMaterial color="#4a4e54" roughness={0.9} />
      </mesh>
      <Instanced items={site.walls}>
        <boxGeometry />
        <meshStandardMaterial color="#d9d6cc" roughness={0.9} />
      </Instanced>
      <Instanced items={site.verges}>
        <boxGeometry />
        <meshStandardMaterial color="#6f9550" roughness={1} />
      </Instanced>
      <Instanced items={site.dashes} shadows={false}>
        <boxGeometry />
        <meshStandardMaterial color="#eceae2" roughness={0.8} />
      </Instanced>
      <Instanced items={site.poles}>
        <cylinderGeometry args={[0.5, 0.5, 1, 8]} />
        <meshStandardMaterial color="#8d959c" roughness={0.5} metalness={0.6} />
      </Instanced>
      <Instanced items={site.lamps}>
        <boxGeometry />
        <meshStandardMaterial color="#dfe3e6" roughness={0.4} metalness={0.4} />
      </Instanced>
      <Instanced items={site.trunks}>
        <cylinderGeometry args={[0.5, 0.5, 1, 6]} />
        <meshStandardMaterial color="#5b4a3a" roughness={1} />
      </Instanced>
      <Instanced items={site.crowns}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial roughness={0.95} flatShading />
      </Instanced>
    </>
  );
}

function Scene({
  laid,
  selectedId,
  insideId,
  reduced,
  mobile,
  zoom,
  shift,
  onSelect,
}: {
  laid: LaidOutBuilding[];
  selectedId: string | null;
  insideId: string | null;
  reduced: boolean;
  mobile: boolean;
  // wheel / pinch zoom; off where the page itself needs the scroll wheel
  zoom: boolean;
  // fraction of the width to push the site sideways, clearing room for overlaid copy
  shift: number;
  onSelect: (id: string) => void;
}) {
  const gotoRef = useRef<{ x: number; z: number } | null>(null);
  const insideBuilding = laid.find((b) => b.id === insideId) ?? null;
  const plan = useMemo(() => (insideBuilding ? interiorPlan(insideBuilding) : null), [insideBuilding]);

  const reach = useMemo(() => {
    const r = siteRect(laid);
    return Math.max(-r.minX, r.maxX, -r.minZ, r.maxZ) + 3;
  }, [laid]);

  return (
    <>
      {/* outdoors: distance haze to the horizon; indoors: a light dust haze down the length of the shed */}
      <fog attach="fog" args={insideId ? ["#dfe6ea", 0.8, 13] : [SKY_HORIZON, 22, 70]} />
      {/* sky-lit reflections on glass, metal sheeting and the warehouse floor */}
      <Environment resolution={128} frames={1} environmentIntensity={0.3}>
        <Sky sunPosition={SUN} turbidity={5} rayleigh={1.4} />
      </Environment>
      <hemisphereLight args={["#dcebfb", "#7d7a66", insideId ? 0.3 : 0.6]} />
      <directionalLight
        position={SUN}
        intensity={2.2}
        color="#fff3df"
        castShadow
        shadow-mapSize={mobile ? [1024, 1024] : [2048, 2048]}
        shadow-camera-left={-reach}
        shadow-camera-right={reach}
        shadow-camera-top={reach}
        shadow-camera-bottom={-reach}
        shadow-camera-near={1}
        shadow-camera-far={45}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      />

      <Site laid={laid} />
      <SiteLife laid={laid} reduced={reduced} mobile={mobile} />

      {laid.map((b) => (
        <BuildingMesh
          key={b.id}
          b={b}
          selected={selectedId === b.id && !insideId}
          inside={insideId === b.id}
          interactive={!insideId}
          onSelect={onSelect}
        />
      ))}

      {insideBuilding && plan ? (
        <>
          <Interior
            b={insideBuilding}
            plan={plan}
            onFloorClick={(x, z) => {
              gotoRef.current = { x, z };
            }}
          />
          <WalkControls b={insideBuilding} plan={plan} gotoRef={gotoRef} />
        </>
      ) : (
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={zoom}
          target={[0, 0, 0.5]}
          autoRotate={!reduced && !selectedId}
          autoRotateSpeed={0.4}
          minDistance={2.2}
          maxDistance={30}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.12}
          enableDamping
          dampingFactor={0.08}
        />
      )}
      {!insideBuilding && shift ? <ViewShift amount={shift} /> : null}
      {!insideBuilding ? <PortraitFit /> : null}
    </>
  );
}

// on tall, narrow screens the camera starts further back so the whole site fits across the width
function PortraitFit() {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const aspect = size.width / size.height;
  const pullBack = aspect < 1 ? Math.min(2, 1.15 / aspect) : 1;
  useEffect(() => {
    camera.position.set(ORBIT_HOME[0] * pullBack, ORBIT_HOME[1] * pullBack, ORBIT_HOME[2] * pullBack);
  }, [camera, pullBack]);
  return null;
}

// on wide screens, renders the scene off-centre so the site sits beside the hero copy instead of under it
function ViewShift({ amount }: { amount: number }) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  useEffect(() => {
    if (size.width < 1024) return;
    camera.setViewOffset(size.width, size.height, -size.width * amount, 0, size.width, size.height);
    return () => camera.clearViewOffset();
  }, [camera, size, amount]);
  return null;
}

function VisibilityGate({
  children,
  overlay,
  capturesWheel,
  containerProps,
}: {
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  children: (isFullscreen: boolean) => React.ReactNode;
  overlay: (toggleFullscreen: () => void, isFullscreen: boolean) => React.ReactNode;
  // false lets the page keep scrolling when the wheel is over the scene
  capturesWheel: boolean;
}) {
  const [active, setActive] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    const onChange = () => setIsFullscreen(document.fullscreenElement === el);
    document.addEventListener("fullscreenchange", onChange);
    return () => {
      io.disconnect();
      document.removeEventListener("fullscreenchange", onChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void ref.current?.requestFullscreen?.();
  };

  return (
    <div
      ref={ref}
      className="relative h-full w-full"
      style={{ background: SKY_HORIZON }}
      {...containerProps}
      {...(capturesWheel || isFullscreen ? { "data-lenis-prevent": true } : {})}
    >
      {active ? children(isFullscreen) : <div className="h-full w-full" />}
      {overlay(toggleFullscreen, isFullscreen)}
    </div>
  );
}

const chip = "rounded-full bg-ink/75 px-3 py-1 text-caption text-white backdrop-blur-sm";
const iconButton =
  "flex h-9 w-9 items-center justify-center rounded-full bg-ink/75 text-white backdrop-blur-sm transition hover:bg-ink";

export default function MasterPlanScene({
  activeSlug,
  hero = false,
  embedded = false,
  onInsideChange,
}: {
  activeSlug: string;
  // inline section inside a longer page: the page keeps its scroll wheel until the visitor goes full screen
  embedded?: boolean;
  // full-bleed page hero: controls clear the site navigation, the page keeps its scroll wheel, the site sits right of centre
  hero?: boolean;
  onInsideChange?: (inside: boolean) => void;
}) {
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [insideId, setInsideId] = useState<string | null>(null);
  const [fading, setFading] = useState(false);
  // embedded: the wheel zooms only after the visitor clicks the scene, so the page still scrolls past it
  const [engaged, setEngaged] = useState(false);

  const project = PROJECTS.find((p) => p.slug === activeSlug) ?? PROJECTS[0];
  const laid = useMemo(() => layoutBuildings(project.buildings), [project]);
  const selected = laid.find((b) => b.id === selectedId) ?? null;
  const insideBuilding = laid.find((b) => b.id === insideId) ?? null;

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    setSelectedId(null);
    setInsideId(null);
  }, [activeSlug]);

  useEffect(() => {
    onInsideChange?.(insideId !== null);
  }, [insideId, onInsideChange]);

  // cut through a short fade so the camera is never seen passing through a wall
  const travel = (to: string | null) => {
    setFading(true);
    window.setTimeout(() => {
      setInsideId(to);
      setSelectedId(null);
      document.body.style.cursor = "auto";
      window.setTimeout(() => setFading(false), 180);
    }, 320);
  };

  return (
    <VisibilityGate
      capturesWheel={(!hero && !embedded) || engaged}
      containerProps={
        embedded
          ? { onPointerDown: () => setEngaged(true), onPointerLeave: () => setEngaged(false) }
          : undefined
      }
      overlay={(toggleFullscreen, isFullscreen) => {
        // in the hero the top controls sit below the floating site navigation
        const low = hero && !isFullscreen;
        return (
        <>
          <div
            className={`pointer-events-none absolute inset-0 bg-ink transition-opacity duration-300 ${fading ? "opacity-100" : "opacity-0"}`}
          />

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit full screen" : "Full screen"}
            className={`absolute right-3 ${low ? "top-28" : "top-3"} ${iconButton}`}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          {insideBuilding ? (
            <div className={`absolute left-3 ${low ? "top-28" : "top-3"} flex items-center gap-2`}>
              <span className={chip}>Inside {insideBuilding.name}</span>
              <button
                type="button"
                onClick={() => travel(null)}
                className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-caption font-semibold text-ink shadow transition hover:opacity-90"
              >
                <LogOut size={14} /> Exit to site
              </button>
            </div>
          ) : null}

          {selected && !insideBuilding ? (
            <div className={`absolute right-3 ${low ? "top-40" : "top-14"} w-60 rounded-xl border border-navy-500 bg-ink/90 p-3 text-left shadow-lg backdrop-blur-sm`}>
              <div className="flex items-start justify-between gap-2">
                <p className="text-caption font-semibold text-white">{selected.name}</p>
                <button type="button" onClick={() => setSelectedId(null)} aria-label="Close" className="text-grey-300 hover:text-white">
                  <X size={14} />
                </button>
              </div>
              <p className="mt-1 tabular text-caption text-grey-300">
                {selected.builtUpSqft > 0
                  ? `${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(selected.builtUpSqft)} sq.ft`
                  : "Area not yet released"}
              </p>
              <p className="mt-1 text-caption" style={{ color: STATUS_HEX[selected.status] }}>
                {selected.statusLabel}
              </p>
              {selected.status !== "upcoming" ? (
                <button
                  type="button"
                  onClick={() => travel(selected.id)}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-caption font-semibold text-ink transition hover:opacity-90"
                >
                  Walk inside <ArrowRight size={14} />
                </button>
              ) : null}
            </div>
          ) : null}

          <p
            className={`pointer-events-none absolute ${
              hero ? `bottom-4 right-4 ${insideBuilding ? "" : "hidden lg:block"}` : "bottom-3 left-3"
            } ${chip}`}
          >
            {insideBuilding
              ? mobile
                ? "Drag to look · tap the floor to walk"
                : "Drag to look · W A S D or arrow keys to walk · click the floor to go there"
              : low || (embedded && !isFullscreen)
                ? embedded
                  ? mobile
                    ? "Drag to orbit · tap a building to enter"
                    : "Drag to orbit · click, then scroll to zoom · tap a building to walk inside"
                  : "Drag to orbit · tap a building to walk inside · full screen to zoom"
                : "Drag to orbit · scroll to zoom · tap a building to walk inside"}
          </p>
        </>
        );
      }}
    >
      {(isFullscreen) => (
      <Canvas
        shadows="soft"
        camera={{ position: ORBIT_HOME, fov: 38, near: 0.5, far: 300 }}
        dpr={mobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onPointerMissed={() => setSelectedId(null)}
      >
        <Scene
          laid={laid}
          selectedId={selectedId}
          insideId={insideId}
          reduced={reduced}
          mobile={mobile}
          zoom={(!hero && !embedded) || engaged || isFullscreen}
          shift={hero && !isFullscreen ? 0.17 : 0}
          onSelect={setSelectedId}
        />
      </Canvas>
      )}
    </VisibilityGate>
  );
}
