import { Component, ElementRef, ViewChild, afterNextRender, OnDestroy, output } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero" id="top" #heroRef>
      <div class="hero-sticky">
        <div class="hero-video" aria-hidden="true">
          <iframe #animationRef src="/assets/warehouse-approach.html" title="" tabIndex="-1"></iframe>
        </div>
        <div class="hero-wash"></div>
        <div class="hero-dots" aria-hidden="true">
          <i class="hero-dot-field dots-left-top"></i>
          <i class="hero-dot-field dots-left-bottom"></i>
          <i class="hero-dot-field dots-right-top"></i>
          <i class="hero-dot-field dots-right-bottom"></i>
        </div>
        <div class="hero-content">
          <span class="hero-kicker-line"></span>
          <p class="eyebrow">Connected distribution operations</p>
          <h1>Every warehouse.<br />Every client. Every<br />movement. <em>Connected.</em></h1>
          <p>The intelligence behind connected logistics.</p>
          <div class="button-row">
            <a class="button button-yellow" href="#warehouse">Enter warehouse <span>→</span></a>
          </div>
          <div class="hero-benefits">
            <span><i>✓</i>Real-time stock visibility</span>
            <span><i>✓</i>Simpler van sales</span>
            <span><i>✓</i>Connected operations</span>
          </div>
        </div>

        <!-- Downside Client Logos Auto-Slide: Faded on both sides, 3 visible, disappears on scroll -->
        <div class="hero-clients-dock" aria-label="Clients">
          <span class="hero-clients-label">Trusted by industry leaders</span>
          <div class="hero-clients-fade-shell">
            <div class="hero-clients-track">
              @for (logo of duplicatedLogos; track $index) {
                <div class="hero-client-item">
                  <img [src]="logo.src" [alt]="logo.name" loading="eager" />
                </div>
              }
            </div>
          </div>
        </div>

        <div class="hero-exit-wash" aria-hidden="true"></div>
      </div>
    </section>
  `
})
export class HeroComponent implements OnDestroy {
  navigateAbout = output<void>();
  navigateDemo = output<void>();

  goToDemo(e: Event) {
    e.preventDefault();
    this.navigateDemo.emit();
    window.location.hash = '#demo';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToAbout(e: Event) {
    e.preventDefault();
    this.navigateAbout.emit();
    window.location.hash = '#about';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @ViewChild('heroRef') heroRef!: ElementRef<HTMLElement>;
  @ViewChild('animationRef') animationRef!: ElementRef<HTMLIFrameElement>;

  logos = [
    { name: 'Vajram', src: '/assets/clients/client-vajram.png' },
    { name: 'Milkivia Dairy Products', src: '/assets/clients/client-milkivia.png' },
    { name: 'Green Arch', src: '/assets/clients/client-green-arch.png' },
    { name: 'NPK Bread & Butter', src: '/assets/clients/client-npk.png' },
    { name: 'Faso Bakes', src: '/assets/clients/client-faso-bakes.png' },
    { name: 'Black and White', src: '/assets/clients/client-black-white.png' },
    { name: 'Delight Distributors', src: '/assets/clients/client-delight-distributors.png' },
    { name: 'Milkana', src: '/assets/clients/client-milkana.png' },
    { name: 'Moto Master Car Care', src: '/assets/clients/client-moto-master.png' },
  ];

  duplicatedLogos = [...this.logos, ...this.logos];

  private cleanups: (() => void)[] = [];
  private frame = 0;

  constructor() {
    afterNextRender(() => {
      this.initHeroInteractions();
    });
  }

  private initHeroInteractions() {
    const hero = this.heroRef.nativeElement;
    const animation = this.animationRef?.nativeElement;
    if (!hero) return;

    let current = 0;
    let target = 0;
    let tiltX = 0;
    let tiltY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;

    const render = () => {
      current += (target - current) * 0.11;
      tiltX += (targetTiltX - tiltX) * 0.09;
      tiltY += (targetTiltY - tiltY) * 0.09;
      const blurProgress = Math.max(0, Math.min(1, (current - 0.5) / 0.42));
      const exitProgress = Math.max(0, Math.min(1, (current - 0.84) / 0.16));

      // Disappear/fade client logos when scroll starts (active only on top / idle)
      const clientsOpacity = Math.max(0, Math.min(1, 1 - current * 7.5));
      const clientsY = current * 30;

      hero.style.setProperty('--hero-progress', current.toFixed(4));
      hero.style.setProperty('--hero-blur', blurProgress.toFixed(4));
      hero.style.setProperty('--hero-exit', exitProgress.toFixed(4));
      hero.style.setProperty('--hero-clients-opacity', clientsOpacity.toFixed(4));
      hero.style.setProperty('--hero-clients-y', `${clientsY.toFixed(2)}px`);
      hero.style.setProperty('--hero-tilt-x', `${tiltX.toFixed(3)}deg`);
      hero.style.setProperty('--hero-tilt-y', `${tiltY.toFixed(3)}deg`);

      animation?.contentWindow?.postMessage(
        { type: 'warehouse-progress', progress: current },
        window.location.origin
      );

      if (
        Math.abs(target - current) > 0.001 ||
        Math.abs(targetTiltX - tiltX) > 0.01 ||
        Math.abs(targetTiltY - tiltY) > 0.01
      ) {
        this.frame = requestAnimationFrame(render);
      } else {
        this.frame = 0;
      }
    };

    const update = () => {
      const rect = hero.getBoundingClientRect();
      const scrollDistance = hero.offsetHeight - window.innerHeight;
      target = Math.max(0, Math.min(1, -rect.top / Math.max(scrollDistance, 1)));
      if (!this.frame) {
        this.frame = requestAnimationFrame(render);
      }
    };

    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const rect = hero.getBoundingClientRect();
      targetTiltY = ((event.clientX - rect.left) / rect.width - 0.5) * 2.2;
      targetTiltX = -((event.clientY - rect.top) / Math.min(rect.height, window.innerHeight) - 0.5) * 1.5;
      if (!this.frame) {
        this.frame = requestAnimationFrame(render);
      }
    };

    const resetPointer = () => {
      targetTiltX = 0;
      targetTiltY = 0;
      if (!this.frame) {
        this.frame = requestAnimationFrame(render);
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    hero.addEventListener('pointermove', updatePointer, { passive: true });
    hero.addEventListener('pointerleave', resetPointer);

    this.cleanups.push(() => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      hero.removeEventListener('pointermove', updatePointer);
      hero.removeEventListener('pointerleave', resetPointer);
      if (this.frame) {
        cancelAnimationFrame(this.frame);
      }
    });
  }

  ngOnDestroy() {
    this.cleanups.forEach((cleanup) => cleanup());
  }
}
