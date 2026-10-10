"use client";

import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

export type Vec3 = [number, number, number];
// r is an optional XYZ euler rotation
export type Item = { p: Vec3; s: Vec3; c?: string; r?: Vec3 };

// one scene unit is roughly 36 m
export const DOCK_PITCH = 0.26;
// warehouse floor sits at dock height, above the yard
export const FLOOR = 0.04;
export const ORBIT_HOME: Vec3 = [8.5, 3.5, 10.5];

// deterministic pseudo-random so the site looks the same on every render
export function rnd(n: number) {
  const v = Math.sin(n * 127.1) * 43758.5453;
  return v - Math.floor(v);
}

export function seedOf(id: string) {
  let s = 0;
  for (let i = 0; i < id.length; i++) s += id.charCodeAt(i) * (i + 1);
  return s;
}

// x positions of the loading docks along the front elevation, shared by exterior and interior
export function dockXs(width: number) {
  const docks = Math.max(3, Math.floor((width - 0.5) / DOCK_PITCH));
  const x0 = (-(docks - 1) * DOCK_PITCH) / 2;
  return Array.from({ length: docks }, (_, i) => x0 + i * DOCK_PITCH);
}

// docks shown in use: shutter cycling open, with a truck being loaded off the apron
export function isActiveDock(index: number) {
  return index % 8 === 3;
}

function canvasTexture(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void, rx: number, ry: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (ctx) draw(ctx);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(rx, ry);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function ribs(ctx: CanvasRenderingContext2D, w: number, h: number, vertical: boolean) {
  const g = vertical ? ctx.createLinearGradient(0, 0, w, 0) : ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#b4b4b4");
  g.addColorStop(0.14, "#ffffff");
  g.addColorStop(0.8, "#ececec");
  g.addColorStop(1, "#a8a8a8");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function speckle(ctx: CanvasRenderingContext2D, size: number, low: number) {
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < size * size; i++) {
    const v = low + Math.floor(rnd(i + 1) * (255 - low));
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
}

function grid(ctx: CanvasRenderingContext2D, line: string, width: number) {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 64, 64);
  ctx.strokeStyle = line;
  ctx.lineWidth = width;
  ctx.strokeRect(0, 0, 64, 64);
}

function buildTextures() {
  return {
    // profiled metal wall cladding, ribs per scene unit
    cladding: canvasTexture(32, 4, (c) => ribs(c, 32, 4, true), 16, 1),
    // standing-seam roof sheeting
    roof: canvasTexture(32, 4, (c) => ribs(c, 32, 4, true), 9, 1),
    // sectional dock door panels
    door: canvasTexture(4, 32, (c) => ribs(c, 4, 32, false), 1, 4),
    // curtain-wall mullions
    glazing: canvasTexture(64, 64, (c) => grid(c, "#22313d", 7), 11, 9),
    // photovoltaic module joints
    solar: canvasTexture(64, 64, (c) => grid(c, "#9fb4d6", 3), 18, 12),
    asphalt: canvasTexture(128, 128, (c) => speckle(c, 128, 205), 18, 18),
    grass: canvasTexture(128, 128, (c) => speckle(c, 128, 228), 90, 90),
    // power-floated slab with saw-cut joints
    slab: canvasTexture(
      128,
      128,
      (c) => {
        speckle(c, 128, 236);
        c.strokeStyle = "rgba(90,90,90,0.55)";
        c.lineWidth = 1;
        c.strokeRect(0, 0, 128, 128);
      },
      6,
      6
    ),
  };
}

let TEXTURES: ReturnType<typeof buildTextures> | null = null;

export function textures() {
  if (!TEXTURES) TEXTURES = buildTextures();
  return TEXTURES;
}

// box whose UVs are in scene units, so shared textures tile evenly on every face
export function worldBox(w: number, h: number, d: number) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const uv = geo.attributes.uv;
  const dims = [
    [d, h],
    [d, h],
    [w, d],
    [w, d],
    [w, h],
    [w, h],
  ];
  for (let f = 0; f < 6; f++) {
    for (let v = 0; v < 4; v++) {
      const i = f * 4 + v;
      uv.setXY(i, uv.getX(i) * dims[f][0], uv.getY(i) * dims[f][1]);
    }
  }
  return geo;
}

export function Instanced({
  items,
  children,
  shadows = true,
}: {
  items: Item[];
  children: React.ReactNode;
  shadows?: boolean;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const pos = new THREE.Vector3();
    const scale = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    const euler = new THREE.Euler();
    const colour = new THREE.Color();
    items.forEach((it, i) => {
      pos.set(it.p[0], it.p[1], it.p[2]);
      scale.set(it.s[0], it.s[1], it.s[2]);
      if (it.r) quat.setFromEuler(euler.set(it.r[0], it.r[1], it.r[2]));
      else quat.identity();
      mesh.setMatrixAt(i, m.compose(pos, quat, scale));
      if (it.c) mesh.setColorAt(i, colour.set(it.c));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [items]);

  if (items.length === 0) return null;
  return (
    <instancedMesh
      key={items.length}
      ref={ref}
      args={[undefined, undefined, items.length]}
      castShadow={shadows}
      receiveShadow={shadows}
    >
      {children}
    </instancedMesh>
  );
}
