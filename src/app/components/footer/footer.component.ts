import { Component, ElementRef, ViewChild, afterNextRender, OnDestroy, output } from '@angular/core';

interface PixelTile {
  x: number;
  ty: number;
  y: number;
  vy: number;
  delay: number;
  color: string;
  done: boolean;
  bounced: boolean;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer" #footerRef id="footer">
      <canvas #canvasRef id="px" aria-hidden="true"></canvas>
      <div class="inner">
        <div class="logo">TRIASOFT</div>
        <h2>Ready to transform your business?</h2>
        <a class="cta" href="#demo" (click)="goToDemo($event)">Contact us</a>
        <div class="cols">
          <div>
            <h3>Newsletter</h3>
            <p>We’d love to share product updates, practical ideas, and company news with you.</p>
            <form class="news" (submit)="$event.preventDefault()">
              <input type="email" placeholder="Enter your email" aria-label="Email address" />
              <button type="button">Subscribe</button>
            </form>
          </div>
          <div>
            <h3>Useful Link</h3>
            <ul>
              <li><a href="#top" (click)="goToHome($event)">Home</a></li>
              <li><a href="#about" (click)="goToAbout($event)">About Us</a></li>
              <li><a href="#warehouse">Our Services</a></li>
              <li><a href="#vansales">Our Products</a></li>
              <li><a href="#pricing" (click)="goToPricing($event)">Pricing</a></li>
              <li><a href="#demo" (click)="goToDemo($event)">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3>Get In Touch</h3>
            <div class="contact">
              <a href="tel:+919605885550">+91 96058 85550</a>
              <a href="tel:+916235919219">+91 62359 19219</a>
              <a href="mailto:info&#64;triasoftware.com">info&#64;triasoftware.com</a>
              <a href="mailto:support&#64;triasoftware.com">support&#64;triasoftware.com</a>
              <address>Sai Arcade, Panamaram,<br />Wayanad, Kerala</address>
            </div>
          </div>
        </div>
        <div class="legal">Copyright © 2025 Triasoft. All rights reserved.</div>
      </div>
    </footer>
  `
})
export class FooterComponent implements OnDestroy {
  navigateAbout = output<void>();
  navigatePricing = output<void>();
  navigateHome = output<void>();
  navigateDemo = output<void>();

  goToDemo(e: Event) {
    e.preventDefault();
    this.navigateDemo.emit();
    window.location.hash = '#demo';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToHome(e: Event) {
    e.preventDefault();
    this.navigateHome.emit();
    window.location.hash = '#top';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToAbout(e: Event) {
    e.preventDefault();
    this.navigateAbout.emit();
    window.location.hash = '#about';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToPricing(e: Event) {
    e.preventDefault();
    this.navigatePricing.emit();
    window.location.hash = '#pricing';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @ViewChild('footerRef') footerRef!: ElementRef<HTMLElement>;
  @ViewChild('canvasRef') canvasRef!: ElementRef<HTMLCanvasElement>;

  private raf = 0;
  private resizeTimer: any;
  private observer?: IntersectionObserver;
  private cleanupResize?: () => void;

  constructor() {
    afterNextRender(() => {
      this.initPixelDrop();
    });
  }

  private initPixelDrop() {
    const footer = this.footerRef?.nativeElement;
    const cv = this.canvasRef?.nativeElement;
    if (!footer || !cv) return;

    footer.classList.add('ready');

    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const shades = ['#0a2259', '#0b2a66', '#08204f', '#0c2d6b', '#071a43', '#0a2457', '#09214f', '#0d3074'];
    let tiles: PixelTile[] = [];
    let W = 0;
    let H = 0;
    let cell = 0;
    let dpr = 1;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = footer.clientWidth;
      H = footer.clientHeight;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cell = Math.max(56, Math.round(W / 16));
      const cols = Math.ceil(W / cell);
      const rows = Math.ceil(H / cell);
      tiles = [];
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          tiles.push({
            x: c * cell,
            ty: r * cell,
            y: r * cell, // Static background, no dropping animation!
            vy: 0,
            delay: 0,
            color: shades[Math.floor(Math.random() * shades.length)],
            done: true,
            bounced: true
          });
        }
      }
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < tiles.length; i++) {
        const t = tiles[i];
        ctx.fillStyle = t.color;
        ctx.fillRect(t.x, Math.round(t.y), cell + 1, cell + 1);
      }
    };

    // Render the static mosaic pixel tiles immediately as the background
    build();
    draw();
    footer.classList.add('ready');

    const onResize = () => {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        build();
        draw();
        footer.classList.add('ready');
      }, 150);
    };

    window.addEventListener('resize', onResize);
    this.cleanupResize = () => window.removeEventListener('resize', onResize);
  }

  ngOnDestroy() {
    if (this.raf) {
      cancelAnimationFrame(this.raf);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }
    if (this.cleanupResize) {
      this.cleanupResize();
    }
  }
}
