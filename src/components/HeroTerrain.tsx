import { useEffect, useRef } from "react";
import "./HeroTerrain.css";

type HeroTerrainProps = {
  active?: boolean;
};

const COLS = 42;
const ROWS = 28;

export default function HeroTerrain({ active = true }: HeroTerrainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let phase = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrap.getBoundingClientRect();
      w = Math.max(2, Math.floor(rect.width));
      h = Math.max(2, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const heightAt = (nx: number, nz: number, t: number) => {
      // nx,nz roughly in world units
      return (
        Math.sin(nx * 0.55 + t) * Math.cos(nz * 0.4 + t * 0.7) * 1.15 +
        Math.sin(nx * 0.25 - nz * 0.35 + t * 0.8) * 0.75 +
        Math.cos((nx + nz) * 0.2 - t * 0.45) * 0.45
      );
    };

    const draw = () => {
      if (!running) return;
      if (w < 2 || h < 2) {
        raf = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      // Soft violet field under the mesh
      const field = ctx.createLinearGradient(0, h * 0.1, 0, h);
      field.addColorStop(0, "rgba(139, 92, 246, 0)");
      field.addColorStop(0.25, "rgba(139, 92, 246, 0.1)");
      field.addColorStop(0.65, "rgba(99, 102, 241, 0.14)");
      field.addColorStop(1, "rgba(6, 182, 212, 0.08)");
      ctx.fillStyle = field;
      ctx.fillRect(0, 0, w, h);

      const horizon = h * 0.12;
      const pts: { x: number; y: number; elev: number; z: number }[][] = [];

      for (let r = 0; r <= ROWS; r++) {
        const row: { x: number; y: number; elev: number; z: number }[] = [];
        const zNorm = r / ROWS; // 0 far → 1 near
        // Perspective: rows denser near horizon, expand toward camera
        const depthScale = 0.22 + zNorm * zNorm * 1.15;
        const yBase = horizon + Math.pow(zNorm, 1.55) * (h * 0.88);

        for (let c = 0; c <= COLS; c++) {
          const xNorm = c / COLS - 0.5; // -0.5 .. 0.5
          const worldX = xNorm * 16;
          const worldZ = 2 + zNorm * 14;
          const elev = heightAt(worldX, worldZ, phase);
          const amp = 18 + zNorm * 52;
          const sx = w * 0.5 + xNorm * w * 1.15 * depthScale;
          const sy = yBase - elev * amp;
          row.push({ x: sx, y: sy, elev, z: zNorm });
        }
        pts.push(row);
      }

      // Horizontal grid lines (along x)
      for (let r = 0; r <= ROWS; r++) {
        const z = r / ROWS;
        const alpha = 0.28 + z * 0.55;
        ctx.beginPath();
        for (let c = 0; c <= COLS; c++) {
          const p = pts[r][c];
          if (c === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
        ctx.lineWidth = 1 + z * 1.1;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // Vertical grid lines (into depth)
      for (let c = 0; c <= COLS; c++) {
        const edge = Math.abs(c / COLS - 0.5) * 2;
        ctx.beginPath();
        for (let r = 0; r <= ROWS; r++) {
          const p = pts[r][c];
          if (r === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(109, 40, 217, ${0.22 + (1 - edge) * 0.35})`;
        ctx.lineWidth = 0.95;
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      // Vertex nodes
      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          if ((r + c) % 2 === 1 && r < 6) continue;
          const p = pts[r][c];
          const size = 1.4 + p.z * 2.8 + Math.max(0, p.elev) * 0.35;
          const alpha = 0.35 + p.z * 0.55;

          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3.2);
          glow.addColorStop(0, `rgba(196, 181, 253, ${alpha})`);
          glow.addColorStop(0.4, `rgba(139, 92, 246, ${alpha * 0.55})`);
          glow.addColorStop(1, "rgba(139, 92, 246, 0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 3.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha + 0.2)})`;
          ctx.arc(p.x, p.y, Math.max(1, size * 0.42), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (active) phase += 0.016;
      raf = requestAnimationFrame(draw);
    };

    resize();
    // ensure first paint after layout
    requestAnimationFrame(() => {
      resize();
      draw();
    });

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(wrap);
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return (
    <div className="hero-terrain" ref={wrapRef}>
      <div className="hero-terrain__glow" />
      <canvas className="hero-terrain__canvas" ref={canvasRef} />
    </div>
  );
}
