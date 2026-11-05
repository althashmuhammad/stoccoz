import { Component, ElementRef, ViewChild, afterNextRender, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-vansales-transition',
  standalone: true,
  template: `
    <section class="vansales-experience-section" id="vansales">
      <div class="van-transition" #trackRef>
        <div class="van-sticky">
          <!-- Centered intro headline positioned in the upper stage area; fades away on scroll -->
          <div class="vansales-reveal-intro">
            <p class="eyebrow">Van sales software</p>
            <h2>STOCCOZ <em>VanSales</em></h2>
            <p>Everything a sales van needs in the field, from the first route to the final payment.</p>
          </div>

          <iframe
            #experienceRef
            class="van-experience"
            src="/assets/vansales-scroll-reveal.html"
            title="Scroll-driven VanSales feature reveal"
            tabIndex="-1"
            (load)="onIframeLoad()"
          ></iframe>
          <div class="transition-progress" aria-hidden="true"><i></i></div>
        </div>
      </div>

      <div class="vansales-reveal-outro section-shell">
        <h3>Back on the road.</h3>
        <p>Every route, order and payment stays connected.</p>
      </div>
    </section>
  `
})
export class VanSalesTransitionComponent implements OnDestroy {
  @ViewChild('trackRef') trackRef!: ElementRef<HTMLDivElement>;
  @ViewChild('experienceRef') experienceRef!: ElementRef<HTMLIFrameElement>;

  private progress = 0;
  private frame = 0;
  private cleanups: (() => void)[] = [];

  constructor() {
    afterNextRender(() => {
      this.initScrollTracking();
    });
  }

  onIframeLoad() {
    this.postProgress(this.progress);
  }

  private postProgress(val: number) {
    this.experienceRef?.nativeElement?.contentWindow?.postMessage(
      { type: 'vansales-reveal-progress', progress: val },
      window.location.origin
    );
  }

  private initScrollTracking() {
    const track = this.trackRef.nativeElement;
    if (!track) return;

    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let current = 0;
    let target = 0;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));

    const render = () => {
      current += (target - current) * 0.14;
      this.progress = current;
      this.postProgress(current);
      track.style.setProperty('--transition-progress', `${current * 100}%`);

      // Smoothly fade out intro as user scrolls down and tiles start assembling
      const introP = Math.min(1, Math.max(0, current / 0.14));
      const introOpacity = 1 - introP;
      const introY = -24 * introP;
      track.style.setProperty('--intro-opacity', introOpacity.toFixed(3));
      track.style.setProperty('--intro-y', `${introY.toFixed(1)}px`);
      track.style.setProperty('--intro-visibility', introOpacity <= 0.005 ? 'hidden' : 'visible');

      if (Math.abs(target - current) > 0.0007) {
        this.frame = requestAnimationFrame(render);
      } else {
        this.frame = 0;
      }
    };

    const update = () => {
      if (reduceMotion.matches) return;
      const rect = track.getBoundingClientRect();
      const available = track.offsetHeight - window.innerHeight;
      target = clamp(-rect.top / Math.max(available, 1));
      if (!this.frame) this.frame = requestAnimationFrame(render);
    };

    const setReducedState = () => {
      if (reduceMotion.matches) {
        target = current = 0.5;
        this.progress = current;
        this.postProgress(current);
        track.style.setProperty('--intro-opacity', '0');
        track.style.setProperty('--intro-visibility', 'hidden');
      } else {
        update();
      }
    };

    setReducedState();
    reduceMotion.addEventListener('change', setReducedState);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    this.cleanups.push(
      () => reduceMotion.removeEventListener('change', setReducedState),
      () => window.removeEventListener('scroll', update),
      () => window.removeEventListener('resize', update),
      () => cancelAnimationFrame(this.frame)
    );
  }

  ngOnDestroy() {
    this.cleanups.forEach((fn) => fn());
  }
}

