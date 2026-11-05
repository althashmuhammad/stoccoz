import {
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';

interface Point {
  x: number;
  y: number;
}

interface GridLine {
  id: number;
  pts: Point[];
  path2D: Path2D;
  totalLength: number;
  trailLen: number;
  speed: number;
  distance: number;
  maxDistance: number;
  intersectionsCrossed: Set<number>;
}

interface PulseDot {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  decay: number;
}

@Component({
  selector: 'app-geometric-grid-background',
  standalone: true,
  host: {
    style: 'display: block; position: absolute; inset: 0; pointer-events: none; z-index: 0;',
  },
  template: `
    <div #container class="geometric-grid-bg-container" aria-hidden="true">
      <canvas #canvas class="geometric-grid-canvas"></canvas>
    </div>
  `,
})
export class GeometricGridBackgroundComponent implements OnInit, OnDestroy {
  @Input() gridSize = 80;
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ngZone = inject(NgZone);
  private animFrameId: number | null = null;
  private lastTime = 0;
  private lines: GridLine[] = [];
  private dots: PulseDot[] = [];
  private nextLineId = 1;
  private isVisible = true;
  private lastHoverTime = 0;
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private targetEl: HTMLElement | null = null;
  private cards: HTMLElement[] = [];
  private boundPointerMove: ((e: PointerEvent) => void) | null = null;
  private boundCardEnter: ((e: Event) => void) | null = null;

  private size = {
    width: 0,
    height: 0,
    cols: 0,
    rows: 0,
  };

  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    const container = this.containerRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getIntersectionCoord = (c: number, r: number): Point => {
      const originX = (this.size.width % this.gridSize) / 2;
      const originY = 0;
      return {
        x: Math.round(originX + c * this.gridSize),
        y: Math.round(originY + r * this.gridSize),
      };
    };

    const createPath2D = (pts: Point[], cornerRadius = 12): { path: Path2D; length: number } => {
      const path = new Path2D();
      if (pts.length === 0) return { path, length: 0 };

      path.moveTo(pts[0].x, pts[0].y);
      let length = 0;

      for (let i = 1; i < pts.length; i++) {
        const pPrev = pts[i - 1];
        const pCurr = pts[i];
        const pNext = pts[i + 1];

        const legDist = Math.hypot(pCurr.x - pPrev.x, pCurr.y - pPrev.y);
        length += legDist;

        if (pNext) {
          path.arcTo(pCurr.x, pCurr.y, pNext.x, pNext.y, cornerRadius);
        } else {
          path.lineTo(pCurr.x, pCurr.y);
        }
      }

      return { path, length };
    };

    const spawnLine = (startCol?: number, startRow?: number, initialDir?: 'H' | 'V') => {
      const { cols, rows } = this.size;
      if (cols < 2 || rows < 2) return;

      let c = startCol !== undefined ? Math.max(0, Math.min(cols - 1, startCol)) : Math.floor(Math.random() * cols);
      let r = startRow !== undefined ? Math.max(0, Math.min(rows - 1, startRow)) : Math.floor(Math.random() * rows);

      const pts: Point[] = [getIntersectionCoord(c, r)];
      let currentDir = initialDir || (Math.random() < 0.5 ? 'H' : 'V');
      const numTurns = 2 + Math.floor(Math.random() * 3);

      for (let leg = 0; leg < numTurns; leg++) {
        const step = 1 + Math.floor(Math.random() * 3); // 1 to 3 squares (80-240px)
        if (currentDir === 'H') {
          const dirX = Math.random() < 0.5 ? 1 : -1;
          c = Math.max(0, Math.min(cols - 1, c + dirX * step));
          pts.push(getIntersectionCoord(c, r));
          currentDir = 'V';
        } else {
          const dirY = Math.random() < 0.5 ? 1 : -1;
          r = Math.max(0, Math.min(rows - 1, r + dirY * step));
          pts.push(getIntersectionCoord(c, r));
          currentDir = 'H';
        }
      }

      const { path, length } = createPath2D(pts);
      if (length < 80) return;

      const trailLen = Math.min(220, Math.max(100, length * 0.38));
      const speed = 100 + Math.random() * 65; // px/sec

      this.lines.push({
        id: this.nextLineId++,
        pts,
        path2D: path,
        totalLength: length,
        trailLen,
        speed,
        distance: 0,
        maxDistance: length + trailLen + 20,
        intersectionsCrossed: new Set(),
      });
    };

    const spawnScrollBurst = () => {
      const count = 3 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          if (this.isVisible) spawnLine();
        }, i * 220);
      }
    };

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(300, Math.floor(rect.width));
      const height = Math.max(300, Math.floor(rect.height));

      if (Math.abs(this.size.width - width) < 2 && Math.abs(this.size.height - height) < 2) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const cols = Math.ceil(width / this.gridSize) + 1;
      const rows = Math.ceil(height / this.gridSize) + 1;
      this.size = { width, height, cols, rows };

      if (this.lines.length < 3 && !prefersReducedMotion) {
        for (let i = 0; i < 4; i++) {
          spawnLine();
        }
      }
    };

    resizeCanvas();
    this.resizeObserver = new ResizeObserver(() => resizeCanvas());
    this.resizeObserver.observe(container);

    this.intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = this.isVisible;
        this.isVisible = entry.isIntersecting;
        if (entry.isIntersecting && !wasVisible && !prefersReducedMotion) {
          spawnScrollBurst();
        }
      },
      { threshold: 0.12 }
    );
    this.intersectionObserver.observe(container);

    const getPointAtDist = (pts: Point[], targetDist: number): Point => {
      let accumulated = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        const dx = pts[i + 1].x - pts[i].x;
        const dy = pts[i + 1].y - pts[i].y;
        const segLen = Math.hypot(dx, dy);
        if (accumulated + segLen >= targetDist) {
          const t = segLen > 0 ? (targetDist - accumulated) / segLen : 0;
          return {
            x: pts[i].x + dx * t,
            y: pts[i].y + dy * t,
          };
        }
        accumulated += segLen;
      }
      return pts[pts.length - 1];
    };

    const draw = (now: number) => {
      if (!this.lastTime) this.lastTime = now;
      const dt = Math.min(0.05, (now - this.lastTime) / 1000);
      this.lastTime = now;

      const ctx = canvas.getContext('2d');
      if (ctx && this.isVisible) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const { width, height, cols, rows } = this.size;

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, width, height);

        // 1. Subtle light-grey square grid with reduced transparency (crisper contrast)
        const originX = (width % this.gridSize) / 2;
        const originY = 0;

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(8, 18, 45, 0.08)'; // reduced transparency (crisper visible lines)
        ctx.lineWidth = 1;

        for (let c = 0; c <= cols; c++) {
          const x = Math.round(originX + c * this.gridSize) + 0.5;
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }

        for (let r = 0; r <= rows; r++) {
          const y = Math.round(originY + r * this.gridSize) + 0.5;
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();

        if (!prefersReducedMotion) {
          // 2. Animated golden-yellow lines with reduced opacity
          for (let i = this.lines.length - 1; i >= 0; i--) {
            const line = this.lines[i];
            line.distance += line.speed * dt;

            if (line.distance >= line.maxDistance) {
              this.lines.splice(i, 1);
              continue;
            }

            const headDist = line.distance;
            const tailDist = Math.max(0, headDist - line.trailLen);

            // Crossing intersections
            for (let j = 0; j < line.pts.length; j++) {
              if (!line.intersectionsCrossed.has(j)) {
                let distToPt = 0;
                for (let k = 0; k < j; k++) {
                  distToPt += Math.hypot(line.pts[k + 1].x - line.pts[k].x, line.pts[k + 1].y - line.pts[k].y);
                }
                if (headDist >= distToPt) {
                  line.intersectionsCrossed.add(j);
                  if (Math.random() < 0.6) {
                    this.dots.push({
                      x: line.pts[j].x,
                      y: line.pts[j].y,
                      radius: 2.2,
                      alpha: 0.45,
                      decay: 0.018,
                    });
                  }
                }
              }
            }

            ctx.save();
            ctx.strokeStyle = 'rgba(245, 180, 0, 0.42)'; // reduced line animation opacity
            ctx.lineWidth = 1.6;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowColor = 'rgba(245, 180, 0, 0.22)';
            ctx.shadowBlur = 4;
            ctx.setLineDash([line.trailLen, line.totalLength + line.trailLen]);
            ctx.lineDashOffset = -tailDist;
            ctx.stroke(line.path2D);
            ctx.restore();

            if (headDist > 0 && headDist < line.totalLength) {
              const head = getPointAtDist(line.pts, headDist);
              ctx.save();
              ctx.fillStyle = 'rgba(245, 180, 0, 0.55)';
              ctx.shadowColor = 'rgba(245, 180, 0, 0.3)';
              ctx.shadowBlur = 5;
              ctx.beginPath();
              ctx.arc(head.x, head.y, 2.2, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }

          if (this.lines.length < 4 && Math.random() < 0.035) {
            spawnLine();
          }

          // 3. Pulse dots with reduced opacity
          for (let i = this.dots.length - 1; i >= 0; i--) {
            const dot = this.dots[i];
            ctx.save();
            ctx.fillStyle = `rgba(245, 180, 0, ${dot.alpha})`;
            ctx.shadowColor = `rgba(245, 180, 0, ${dot.alpha * 0.5})`;
            ctx.shadowBlur = 4;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            dot.alpha -= dot.decay;
            dot.radius += 0.025;
            if (dot.alpha <= 0) {
              this.dots.splice(i, 1);
            }
          }
        }

        ctx.restore();
      }

      this.animFrameId = requestAnimationFrame(draw);
    };

    this.ngZone.runOutsideAngular(() => {
      this.animFrameId = requestAnimationFrame(draw);
    });

    this.targetEl = (container.closest('.capabilities-section, .connected') as HTMLElement) || container.parentElement || container;

    this.boundPointerMove = (e: PointerEvent) => {
      if (prefersReducedMotion || !this.isVisible) return;
      const now = performance.now();
      if (now - this.lastHoverTime < 280) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const { width, cols, rows } = this.size;
      if (cols < 2 || rows < 2) return;

      const originX = (width % this.gridSize) / 2;
      const nearestCol = Math.round((x - originX) / this.gridSize);
      const nearestRow = Math.round(y / this.gridSize);

      if (nearestCol >= 0 && nearestCol < cols && nearestRow >= 0 && nearestRow < rows) {
        this.lastHoverTime = now;
        spawnLine(nearestCol, nearestRow, Math.random() < 0.5 ? 'H' : 'V');
      }
    };

    this.targetEl.addEventListener('pointermove', this.boundPointerMove, { passive: true });

    this.boundCardEnter = (e: Event) => {
      if (prefersReducedMotion || !this.isVisible) return;
      const target = e.currentTarget as HTMLElement;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      const corners = [
        { x: rect.left - cRect.left, y: rect.top - cRect.top },
        { x: rect.right - cRect.left, y: rect.top - cRect.top },
        { x: rect.left - cRect.left, y: rect.bottom - cRect.top },
        { x: rect.right - cRect.left, y: rect.bottom - cRect.top },
      ];
      const corner = corners[Math.floor(Math.random() * corners.length)];
      const originX = (this.size.width % this.gridSize) / 2;
      const nearestCol = Math.round((corner.x - originX) / this.gridSize);
      const nearestRow = Math.round(corner.y / this.gridSize);
      spawnLine(nearestCol, nearestRow, Math.random() < 0.5 ? 'H' : 'V');
    };

    this.cards = Array.from(this.targetEl.querySelectorAll<HTMLElement>('.cap-card'));
    this.cards.forEach((card) => card.addEventListener('mouseenter', this.boundCardEnter!, { passive: true }));
  }

  ngOnDestroy(): void {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    if (this.targetEl && this.boundPointerMove) {
      this.targetEl.removeEventListener('pointermove', this.boundPointerMove);
    }
    if (this.cards.length && this.boundCardEnter) {
      this.cards.forEach((card) => card.removeEventListener('mouseenter', this.boundCardEnter!));
    }
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.intersectionObserver) this.intersectionObserver.disconnect();
  }
}

