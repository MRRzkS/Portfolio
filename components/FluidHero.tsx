"use client";

import { useEffect, useRef } from "react";

// Real-time incompressible fluid on a coarse grid: advection, a short
// Jacobi pressure solve, and dye transport. Full-bleed (spans the whole
// viewport width). Replaced with a static gradient under reduced-motion.
export default function FluidHero({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const N = 200;
    let M = 90, cw = 0, ch = 0;
    let u: Float32Array, v: Float32Array, u0: Float32Array, v0: Float32Array;
    let dye: Float32Array, dye0: Float32Array, p: Float32Array, div: Float32Array;
    let img: ImageData;
    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d")!;
    let raf = 0;

    const I = (x: number, y: number) => x + y * N;

    function alloc() {
      const size = N * M;
      u = new Float32Array(size); v = new Float32Array(size);
      u0 = new Float32Array(size); v0 = new Float32Array(size);
      dye = new Float32Array(size); dye0 = new Float32Array(size);
      p = new Float32Array(size); div = new Float32Array(size);
      off.width = N; off.height = M;
      img = offCtx.createImageData(N, M);
    }

    function drawStatic() {
      const g = ctx!.createRadialGradient(cw * 0.35, ch * 0.4, 60, cw * 0.35, ch * 0.4, cw * 0.7);
      g.addColorStop(0, "#16294f"); g.addColorStop(1, "#09090B");
      ctx!.fillStyle = g; ctx!.fillRect(0, 0, cw, ch);
    }

    function resize() {
      cw = canvas!.width = host!.clientWidth;
      ch = canvas!.height = host!.clientHeight;
      M = Math.max(64, Math.round((N * ch) / cw));
      alloc();
      seed();
      if (reduced) drawStatic();
    }

    function splat(gx: number, gy: number, du: number, dv: number, amount: number) {
      const r = 7;
      for (let y = Math.max(1, gy - r); y < Math.min(M - 1, gy + r); y++) {
        for (let x = Math.max(1, gx - r); x < Math.min(N - 1, gx + r); x++) {
          const dx = x - gx, dyy = y - gy;
          const fall = Math.exp(-(dx * dx + dyy * dyy) / (r * 1.7));
          const i = I(x, y);
          u[i] += du * fall; v[i] += dv * fall; dye[i] += amount * fall;
        }
      }
    }

    // Seed several swirls spread across the full width so the field is
    // alive edge to edge, not just in the middle.
    function seed() {
      if (reduced) return;
      const pts = [
        [0.12, 0.5, 2.0, -1.0], [0.3, 0.7, -1.4, 1.5], [0.5, 0.4, 1.6, 1.2],
        [0.68, 0.65, -1.8, -0.9], [0.86, 0.45, 1.3, 1.6], [0.42, 0.28, -1.2, 1.0],
      ];
      for (const [fx, fy, du, dv] of pts) {
        splat((N * fx) | 0, (M * fy) | 0, du, dv, 0.85);
      }
    }

    function advect(dst: Float32Array, src: Float32Array, uu: Float32Array, vv: Float32Array, dt: number, diss: number) {
      for (let y = 1; y < M - 1; y++) {
        for (let x = 1; x < N - 1; x++) {
          const i = I(x, y);
          let px = x - dt * uu[i], py = y - dt * vv[i];
          px = Math.min(N - 1.5, Math.max(0.5, px));
          py = Math.min(M - 1.5, Math.max(0.5, py));
          const x0 = px | 0, y0 = py | 0, fx = px - x0, fy = py - y0;
          const a = src[I(x0, y0)], b = src[I(x0 + 1, y0)];
          const c = src[I(x0, y0 + 1)], d = src[I(x0 + 1, y0 + 1)];
          dst[i] = diss * ((a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy);
        }
      }
    }

    function project() {
      let x, y, i;
      for (y = 1; y < M - 1; y++) for (x = 1; x < N - 1; x++) {
        i = I(x, y);
        div[i] = -0.5 * (u[I(x + 1, y)] - u[I(x - 1, y)] + v[I(x, y + 1)] - v[I(x, y - 1)]);
        p[i] = 0;
      }
      for (let k = 0; k < 12; k++)
        for (y = 1; y < M - 1; y++) for (x = 1; x < N - 1; x++) {
          i = I(x, y);
          p[i] = (div[i] + p[I(x - 1, y)] + p[I(x + 1, y)] + p[I(x, y - 1)] + p[I(x, y + 1)]) * 0.25;
        }
      for (y = 1; y < M - 1; y++) for (x = 1; x < N - 1; x++) {
        i = I(x, y);
        u[i] -= 0.5 * (p[I(x + 1, y)] - p[I(x - 1, y)]);
        v[i] -= 0.5 * (p[I(x, y + 1)] - p[I(x, y - 1)]);
      }
    }

    // Transparent where there is no dye, so the page bg + glow shows through
    // and there is no hard black rectangle. Dye ramps navy -> blue -> light.
    function render() {
      const d = img.data;
      for (let i = 0; i < N * M; i++) {
        const t = Math.min(1, dye[i]);
        let r, g, bl;
        if (t < 0.5) { const k = t / 0.5; r = 12 + 25 * k; g = 18 + 81 * k; bl = 40 + 195 * k; }
        else { const k = (t - 0.5) / 0.5; r = 37 + 200 * k; g = 99 + 140 * k; bl = 235 + 20 * k; }
        d[i * 4] = r; d[i * 4 + 1] = g; d[i * 4 + 2] = bl;
        d[i * 4 + 3] = Math.min(255, t * 320); // fade to transparent
      }
      offCtx.putImageData(img, 0, 0);
      ctx!.clearRect(0, 0, cw, ch);
      ctx!.imageSmoothingEnabled = true;
      ctx!.drawImage(off, 0, 0, cw, ch);
    }

    let last = 0, ambientT = 0;
    function frame(t: number) {
      const dt = Math.min(32, t - last) * 0.06; last = t;
      ambientT += dt;
      if (ambientT > 34) {
        ambientT = 0;
        const gx = ((0.08 + 0.84 * Math.random()) * N) | 0;
        const gy = ((0.2 + 0.6 * Math.random()) * M) | 0;
        const ang = Math.random() * 6.283;
        splat(gx, gy, Math.cos(ang) * 1.7, Math.sin(ang) * 1.7, 0.5);
      }
      u0.set(u); v0.set(v);
      advect(u, u0, u0, v0, dt, 0.9975);
      advect(v, v0, u0, v0, dt, 0.9975);
      project();
      dye0.set(dye);
      advect(dye, dye0, u, v, dt, 0.995);
      render();
      raf = requestAnimationFrame(frame);
    }

    let lastPX: number | null = null, lastPY: number | null = null;
    function onMove(e: PointerEvent) {
      if (reduced) return;
      const rect = host!.getBoundingClientRect();
      const gx = (((e.clientX - rect.left) / cw) * N) | 0;
      const gy = (((e.clientY - rect.top) / ch) * M) | 0;
      if (lastPX !== null && lastPY !== null) {
        splat(gx, gy, (e.clientX - lastPX) * 0.11, (e.clientY - lastPY) * 0.11, 0.85);
      }
      lastPX = e.clientX; lastPY = e.clientY;
    }
    function onLeave() { lastPX = lastPY = null; }

    resize();
    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    if (!reduced) raf = requestAnimationFrame(frame);
    else drawStatic();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={hostRef}
      aria-label="Interactive fluid simulation banner"
      className="full-bleed relative flex min-h-[88vh] items-center overflow-hidden"
      style={{ touchAction: "pan-y" }}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      {/* fade the bottom edge into the page so there is no hard seam */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }}
      />
      <div className="relative mx-auto w-full max-w-5xl px-6">
        {children}
        <p className="eyebrow mt-10 hidden items-center gap-2 text-[var(--muted)] md:flex">
          <span aria-hidden="true">&#8596;</span> Drag the field
        </p>
      </div>
    </section>
  );
}
