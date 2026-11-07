import { Component, ElementRef, ViewChild, afterNextRender, OnDestroy, signal } from '@angular/core';
import Lenis from 'lenis';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { WarehouseIntroComponent } from './components/warehouse-intro/warehouse-intro.component';
import { WarehouseCapabilitiesComponent } from './components/warehouse-capabilities/warehouse-capabilities.component';
import { VanSalesTransitionComponent } from './components/vansales-transition/vansales-transition.component';
import { ConnectedOperationsComponent } from './components/connected-operations/connected-operations.component';
import { ClientsComponent } from './components/clients/clients.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { BookDemoPageComponent } from './components/book-demo-page/book-demo-page.component';
import { WarehouseExploreComponent } from './components/warehouse-explore/warehouse-explore.component';
import { VansExploreComponent } from './components/vans-explore/vans-explore.component';
import { ThreePLExploreComponent } from './components/three-pl-explore/three-pl-explore.component';
import { ThreePlIntroComponent } from './components/three-pl-intro/three-pl-intro.component';
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
    ThreePlIntroComponent,
    ConnectedOperationsComponent,
    ClientsComponent,
    PricingComponent,
    AboutPageComponent,
    BookDemoPageComponent,
    WarehouseExploreComponent,
    VansExploreComponent,
    ThreePLExploreComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  @ViewChild('mainRef') mainRef!: ElementRef<HTMLElement>;

  activePage = signal<'home' | 'about' | 'pricing' | 'explore-warehouse' | 'explore-vans' | 'explore-3pl' | 'demo'>('home');
  private cleanups: (() => void)[] = [];
  private frame = 0;
  private lenis: Lenis | null = null;
  private lenisRafId = 0;

  constructor() {
    afterNextRender(() => {
      this.initSmoothScroll();
      this.initPageMotion();
      this.initHashRouting();
    });
  }

  private initSmoothScroll() {
    if (typeof window === 'undefined') return;

    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) return;

    try {
      this.lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 1,
        syncTouch: false,
        infinite: false,
      });

      const raf = (time: number) => {
        this.lenis?.raf(time);
        this.lenisRafId = requestAnimationFrame(raf);
      };

      this.lenisRafId = requestAnimationFrame(raf);

      const handleAnchorClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest('a');
        if (!target) return;
        const href = target.getAttribute('href');
        if (!href || !href.startsWith('#') || href.length <= 1) return;

        const isPageRoute =
          href === '#demo' ||
          href === '#/demo' ||
          href === '#book-a-demo' ||
          href === '#contact' ||
          href === '#about' ||
          href === '#/about' ||
          href === '#about-us' ||
          href === '#pricing' ||
          href === '#/pricing' ||
          href.startsWith('#explore');

        if (isPageRoute) return;

        if (href === '#top') {
          e.preventDefault();
          this.lenis?.scrollTo(0, { duration: 1.15 });
          return;
        }

        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          this.lenis?.scrollTo(el as HTMLElement, { offset: -70, duration: 1.15 });
        }
      };

      document.addEventListener('click', handleAnchorClick);

      this.cleanups.push(() => {
        document.removeEventListener('click', handleAnchorClick);
        if (this.lenisRafId) cancelAnimationFrame(this.lenisRafId);
        this.lenis?.destroy();
        this.lenis = null;
      });
    } catch (err) {
      console.warn('Lenis initialization skipped:', err);
    }
  }

  onNavigate(page: 'home' | 'about' | 'pricing' | 'explore-warehouse' | 'explore-vans' | 'explore-3pl' | 'demo') {
    if (this.activePage() === page) {
      if (this.lenis) {
        this.lenis.scrollTo(0, { duration: 0.8 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    this.activePage.set(page);
    if (this.lenis) {
      this.lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (page === 'home') {
      setTimeout(() => this.initPageMotion(), 50);
    }
  }

  private initHashRouting() {
    const handleHash = () => {
      const h = window.location.hash;
      const resetScroll = () => {
        if (this.lenis) {
          this.lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      };

      if (h === '#demo' || h === '#/demo' || h === '#book-a-demo' || h === '#/book-a-demo' || h === '#contact' || h === '#/contact' || h === '#book-demo') {
        this.activePage.set('demo');
        resetScroll();
      } else if (h === '#about' || h === '#/about' || h === '#about-us') {
        this.activePage.set('about');
        resetScroll();
      } else if (h === '#pricing' || h === '#/pricing' || h === '#plans') {
        this.activePage.set('pricing');
        resetScroll();
      } else if (h === '#explore-warehouse' || h === '#/explore-warehouse' || h === '#warehouse-explore' || h === '#/warehouse') {
        this.activePage.set('explore-warehouse');
        resetScroll();
      } else if (h === '#explore-vans' || h === '#/explore-vans' || h === '#explore-vansales' || h === '#vansales-explore' || h === '#vans') {
        this.activePage.set('explore-vans');
        resetScroll();
      } else if (h === '#explore-3pl' || h === '#/explore-3pl' || h === '#3pl' || h === '#/3pl' || h === '#three-pl') {
        this.activePage.set('explore-3pl');
        resetScroll();
      } else if (this.activePage() !== 'home') {
        this.activePage.set('home');
        resetScroll();
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

