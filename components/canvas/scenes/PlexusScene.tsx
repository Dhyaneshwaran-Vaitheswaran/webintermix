"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * PlexusScene — Interconnected network / constellation effect.
 *
 * Architecture:
 * - N floating nodes drift slowly through 3D space.
 * - Lines are drawn between nodes within CONNECTION_DIST.
 * - A small % of nodes are accent red (#FF3B3B), the rest are white.
 * - Mouse movement gently repels nearby nodes.
 * - Uses LineSegments for connections (no per-frame geometry recreation).
 */

const NODE_COUNT = 70;
const CONNECTION_DIST = 3.2; // World-space units
const REPEL_RADIUS = 2.5;
const REPEL_STRENGTH = 0.018;
const DRIFT_SPEED = 0.0004;
const BOUNDS = 8; // Half-size of the bounding box
const RED_FRACTION = 0.06; // 6% of nodes are red

export function PlexusScene() {
  const mousePosRef = useRef({ x: -9999, y: -9999 });
  const smoothedCursor = useRef(new THREE.Vector3(-9999, -9999, 0));

  // Node data
  const nodes = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    const velocities: THREE.Vector3[] = [];
    const colors = new Float32Array(NODE_COUNT * 3);
    const isRed: boolean[] = [];

    const white = new THREE.Color(0xffffff);
    const red = new THREE.Color(0xff3b3b);

    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * BOUNDS * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * DRIFT_SPEED * 2,
          (Math.random() - 0.5) * DRIFT_SPEED * 2,
          (Math.random() - 0.5) * DRIFT_SPEED * 0.5
        )
      );

      const nodeIsRed = Math.random() < RED_FRACTION;
      isRed.push(nodeIsRed);
      const c = nodeIsRed ? red : white;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return { positions, velocities, colors, isRed };
  }, []);

  // Pre-allocate line segment buffer: worst case N*(N-1)/2 connections
  const MAX_CONNECTIONS = Math.floor((NODE_COUNT * (NODE_COUNT - 1)) / 2);
  const linePositions = useMemo(
    () => new Float32Array(MAX_CONNECTIONS * 6),
    [MAX_CONNECTIONS]
  );
  const lineColors = useMemo(
    () => new Float32Array(MAX_CONNECTIONS * 6),
    [MAX_CONNECTIONS]
  );

  const pointsGeoRef = useRef<THREE.BufferGeometry>(null);
  const linesGeoRef = useRef<THREE.BufferGeometry>(null);

  // Track cursor in DOM space
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    const { positions, velocities, colors, isRed } = nodes;
    const t = state.clock.getElapsedTime();

    // --- Convert DOM cursor to world space ---
    const ndcX = (mousePosRef.current.x / window.innerWidth) * 2 - 1;
    const ndcY = -(mousePosRef.current.y / window.innerHeight) * 2 + 1;
    const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
    vec.unproject(state.camera);
    const dir = vec.sub(state.camera.position).normalize();
    const dist = -state.camera.position.z / dir.z;
    const worldCursor = state.camera.position
      .clone()
      .add(dir.multiplyScalar(dist));
    worldCursor.z = 0;
    smoothedCursor.current.lerp(worldCursor, 0.08);

    const cursor = smoothedCursor.current;

    // --- Update node positions ---
    for (let i = 0; i < NODE_COUNT; i++) {
      const idx = i * 3;

      // Drift
      positions[idx] += velocities[i].x;
      positions[idx + 1] += velocities[i].y;
      positions[idx + 2] += velocities[i].z;

      // Boundary wrap
      if (positions[idx] > BOUNDS) positions[idx] = -BOUNDS;
      if (positions[idx] < -BOUNDS) positions[idx] = BOUNDS;
      if (positions[idx + 1] > BOUNDS) positions[idx + 1] = -BOUNDS;
      if (positions[idx + 1] < -BOUNDS) positions[idx + 1] = BOUNDS;

      // Mouse repulsion
      const dx = positions[idx] - cursor.x;
      const dy = positions[idx + 1] - cursor.y;
      const dSq = dx * dx + dy * dy;
      const repelRadSq = REPEL_RADIUS * REPEL_RADIUS;

      if (dSq < repelRadSq && dSq > 0.001) {
        const d = Math.sqrt(dSq);
        const force = (1 - d / REPEL_RADIUS) * REPEL_STRENGTH;
        positions[idx] += (dx / d) * force;
        positions[idx + 1] += (dy / d) * force;
      }

      // Subtle sinusoidal breathing
      const breathe = Math.sin(t * 0.3 + i * 0.5) * 0.002;
      positions[idx] += breathe;
      positions[idx + 1] += breathe * 0.7;
    }

    // Update point geometry
    if (pointsGeoRef.current) {
      const posAttr =
        pointsGeoRef.current.attributes.position as THREE.BufferAttribute;
      posAttr.array.set(positions);
      posAttr.needsUpdate = true;
    }

    // --- Build connection lines ---
    if (!linesGeoRef.current) return;

    let lineIdx = 0;
    const white = new THREE.Color(0xffffff);
    const red = new THREE.Color(0xff3b3b);

    for (let a = 0; a < NODE_COUNT; a++) {
      for (let b = a + 1; b < NODE_COUNT; b++) {
        const ax = positions[a * 3];
        const ay = positions[a * 3 + 1];
        const az = positions[a * 3 + 2];
        const bx = positions[b * 3];
        const by = positions[b * 3 + 1];
        const bz = positions[b * 3 + 2];

        const dx2 = ax - bx;
        const dy2 = ay - by;
        const dz2 = az - bz;
        const distSq = dx2 * dx2 + dy2 * dy2 + dz2 * dz2;

        if (distSq < CONNECTION_DIST * CONNECTION_DIST) {
          if (lineIdx + 5 < linePositions.length / 3) {
            const base = lineIdx * 3;

            linePositions[base] = ax;
            linePositions[base + 1] = ay;
            linePositions[base + 2] = az;
            linePositions[base + 3] = bx;
            linePositions[base + 4] = by;
            linePositions[base + 5] = bz;

            // Line color: red if either node is red, else white
            const alpha =
              1 - Math.sqrt(distSq) / CONNECTION_DIST;
            const lineColor =
              isRed[a] || isRed[b]
                ? red.clone().multiplyScalar(alpha * 0.8)
                : white.clone().multiplyScalar(alpha * 0.2);

            lineColors[base] = lineColor.r;
            lineColors[base + 1] = lineColor.g;
            lineColors[base + 2] = lineColor.b;
            lineColors[base + 3] = lineColor.r;
            lineColors[base + 4] = lineColor.g;
            lineColors[base + 5] = lineColor.b;

            lineIdx += 2;
          }
        }
      }
    }

    const posAttr =
      linesGeoRef.current.attributes.position as THREE.BufferAttribute;
    const colAttr =
      linesGeoRef.current.attributes.color as THREE.BufferAttribute;
    posAttr.array.set(linePositions);
    colAttr.array.set(lineColors);
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
    linesGeoRef.current.setDrawRange(0, lineIdx);
  });

  return (
    <group>
      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry ref={linesGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
            count={lineColors.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Nodes */}
      <points>
        <bufferGeometry ref={pointsGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[nodes.positions, 3]}
            count={NODE_COUNT}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[nodes.colors, 3]}
            count={NODE_COUNT}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.4}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
