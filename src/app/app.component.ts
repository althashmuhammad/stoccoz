import { Component, ElementRef, ViewChild, afterNextRender, OnDestroy, signal } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { WarehouseIntroComponent } from './components/warehouse-intro/warehouse-intro.component';
import { WarehouseCapabilitiesComponent } from './components/warehouse-capabilities/warehouse-capabilities.component';
import { VanSalesTransitionComponent } from './components/vansales-transition/vansales-transition.component';
import { ConnectedOperationsComponent } from './components/connected-operations/connected-operations.component';
import { ClientsComponent } from './components/clients/clients.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    WarehouseIntroComponent,
    WarehouseCapabilitiesComponent,
    VanSalesTransitionComponent,
    ConnectedOperationsComponent,
    ClientsComponent,
    PricingComponent,
    AboutPageComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  @ViewChild('mainRef') mainRef!: ElementRef<HTMLElement>;

  activePage = signal<'home' | 'about' | 'pricing'>('home');
  private cleanups: (() => void)[] = [];
  private frame = 0;

  constructor() {
    afterNextRender(() => {
      this.initPageMotion();
      this.initHashRouting();
    });
  }

  onNavigate(page: 'home' | 'about' | 'pricing') {
    this.activePage.set(page);
    if (page === 'home') {
      setTimeout(() => this.initPageMotion(), 50);
    }
  }

  private initHashRouting() {
    const handleHash = () => {
      const h = window.location.hash;
      if (h === '#about' || h === '#/about' || h === '#about-us' || h === '#contact' || h === '#demo') {
        this.activePage.set('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (h === '#pricing' || h === '#/pricing' || h === '#plans') {
        this.activePage.set('pricing');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (this.activePage() !== 'home') {
        this.activePage.set('home');
        setTimeout(() => this.initPageMotion(), 50);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    this.cleanups.push(() => window.removeEventListener('hashchange', handleHash));
  }

  private initPageMotion() {
    const main = this.mainRef?.nativeElement;
    if (!main) return;

    const revealItems = Array.from(main.querySelectorAll<HTMLElement>('[data-reveal]'));
    const parallaxItems = Array.from(main.querySelectorAll<HTMLElement>('[data-parallax]'));
    const tiltItems = Array.from(main.querySelectorAll<HTMLElement>('[data-tilt]'));
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

    const revealAll = () => {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    };

    if (reduceMotion.matches) {
      revealAll();
      return;
    }

    main.classList.add('motion-ready');

    // Immediate visibility scan: any section in or near the viewport is immediately visible
    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight + 350) {
        item.classList.add('is-visible');
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '250px 0px 250px 0px', threshold: 0.01 }
    );
    revealItems.forEach((item) => observer.observe(item));

    // Safety fallback: ensure nothing stays permanently hidden under any circumstances
    const fallbackTimer = setTimeout(revealAll, 500);

    const updateParallax = () => {
      parallaxItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;
        const distance = (window.innerHeight * 0.5 - (rect.top + rect.height * 0.5)) / window.innerHeight;
        item.style.setProperty('--parallax-y', `${Math.max(-1, Math.min(1, distance)) * 18}px`);
      });
      this.frame = 0;
    };

    const onScroll = () => {
      if (!this.frame) this.frame = requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    const tiltCleanups = tiltItems.map((item) => {
      const move = (event: PointerEvent) => {
        if (event.pointerType === 'touch') return;
        const rect = item.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        item.style.setProperty('--tilt-x', `${(-y * 4).toFixed(2)}deg`);
        item.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`);
      };
      const reset = () => {
        item.style.setProperty('--tilt-x', '0deg');
        item.style.setProperty('--tilt-y', '0deg');
      };

      item.addEventListener('pointermove', move, { passive: true });
      item.addEventListener('pointerleave', reset);

      return () => {
        item.removeEventListener('pointermove', move);
        item.removeEventListener('pointerleave', reset);
      };
    });

    this.cleanups.push(
      () => clearTimeout(fallbackTimer),
      () => observer.disconnect(),
      () => window.removeEventListener('scroll', onScroll),
      () => window.removeEventListener('resize', onScroll),
      () => tiltCleanups.forEach((c) => c()),
      () => cancelAnimationFrame(this.frame)
    );
  }

  ngOnDestroy() {
    this.cleanups.forEach((fn) => fn());
  }
}

