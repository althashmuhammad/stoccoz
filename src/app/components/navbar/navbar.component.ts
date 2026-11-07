import { Component, ElementRef, ViewChild, HostListener, afterNextRender, effect, input, output, signal } from '@angular/core';
import { LineIconComponent } from '../line-icon/line-icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LineIconComponent],
  template: `
    <header class="site-header" [class.theme-about]="activePage() === 'about'">
      <div class="nav-shell">
        <a class="brand" href="#top" (click)="goToHome($event)" aria-label="Stoccoz home">
          <img class="brand-logo-image" src="/assets/stoccoz-mark.png" alt="" />
          <span class="brand-name">Stoccoz</span>
        </a>

        <nav
          [class.is-open]="mobileOpen()"
          class="nav-links"
          #navLinksRef
          (mouseleave)="onNavLeave()"
          aria-label="Main navigation"
        >
          <a
            #homeLink
            class="nav-root-link"
            href="#top"
            [class.is-active]="activePage() === 'home'"
            (click)="goToHome($event)"
            (mouseenter)="onNavHover(homeLink)"
          >Home</a>

          <!-- Platform Mega Menu Trigger -->
          <div
            class="platform-nav"
            (mouseenter)="onPlatformEnter()"
            (mouseleave)="onPlatformLeave()"
          >
            <button
              #platformBtn
              (click)="toggleOpen()"
              (mouseenter)="onNavHover(platformBtn)"
              [attr.aria-expanded]="open()"
            >
              Platform <span>⌄</span>
            </button>

            <div
              class="mega-menu"
              [class.is-open]="open()"
              (mouseenter)="onPlatformEnter()"
              (mouseleave)="onPlatformLeave()"
            >
              <div class="mega-col explore-col">
                <p class="eyebrow">Stoccoz platform</p>
                <h3>Explore Stoccoz Platform</h3>
                @for (feat of exploreFeatures; track feat.title) {
                  <a
                    class="mega-feature"
                    [href]="feat.title === 'Warehouse Management' ? '#explore-warehouse' : (feat.title === 'VanSales' ? '#explore-vans' : '#explore-3pl')"
                    (click)="feat.title === 'Warehouse Management' ? goToExploreWarehouse($event) : (feat.title === 'VanSales' ? goToExploreVans($event) : goToExplore3pl($event))"
                  >
                    <span class="mega-icon"><app-line-icon [name]="feat.icon"></app-line-icon></span>
                    <span><b>{{ feat.title }}</b><small>{{ feat.copy }}</small></span>
                    <span class="arrow">›</span>
                  </a>
                }
                <a class="text-link" href="#explore-warehouse" (click)="goToExploreWarehouse($event)">Explore the Platform <span>→</span></a>
              </div>

              <div class="mega-col">
                <p class="eyebrow">Core capabilities</p>
                <h3>Manage Your Operations</h3>
                @for (item of operations; track item; let idx = $index) {
                  <a
                    class="mega-link"
                    [href]="item === 'Multi-Warehouse Management' ? '#explore-warehouse' : '#warehouse'"
                    (click)="item === 'Multi-Warehouse Management' ? goToExploreWarehouse($event) : handleSectionNav('warehouse', $event)"
                  >
                    <app-line-icon [name]="idx === 5 ? 'chart' : idx === 3 ? 'order' : 'boxes'"></app-line-icon>
                    {{ item }}
                  </a>
                }
              </div>

              <div class="mega-col">
                <p class="eyebrow">Get started</p>
                <h3>About Stoccoz</h3>
                @for (item of started; track item; let idx = $index) {
                  <a class="mega-link" [href]="idx > 3 ? '#demo' : '#about'" (click)="idx > 3 ? goToDemo($event) : goToAbout($event)">
                    <app-line-icon [name]="idx > 3 ? 'user' : 'warehouse'"></app-line-icon>
                    {{ item }}
                  </a>
                }
              </div>
            </div>
          </div>

          <!-- Features Dropdown Trigger -->
          <div
            class="features-nav"
            (mouseenter)="onFeaturesEnter()"
            (mouseleave)="onFeaturesLeave()"
          >
            <button
              #featuresBtn
              (click)="toggleFeatures()"
              (mouseenter)="onNavHover(featuresBtn)"
              [attr.aria-expanded]="featuresOpen()"
            >
              Features <span>⌄</span>
            </button>
            <div
              class="features-dropdown"
              [class.is-open]="featuresOpen()"
              (mouseenter)="onFeaturesEnter()"
              (mouseleave)="onFeaturesLeave()"
            >
              <a href="#explore-warehouse" (click)="featuresOpen.set(false); goToExploreWarehouse($event)">
                <span><app-line-icon name="warehouse"></app-line-icon></span>
                <div><b>Warehouse</b><small>Inventory and warehouse operations</small></div>
              </a>
              <a href="#explore-vans" (click)="featuresOpen.set(false); goToExploreVans($event)">
                <span><app-line-icon name="van"></app-line-icon></span>
                <div><b>VanSales</b><small>Field sales and distribution</small></div>
              </a>
              <a href="#explore-3pl" (click)="featuresOpen.set(false); goToExplore3pl($event)">
                <span><app-line-icon name="boxes"></app-line-icon></span>
                <div><b>3PL</b><small>Third-party logistics management</small></div>
              </a>
            </div>
          </div>

          <a
            #pricingLink
            class="nav-root-link"
            href="#pricing"
            [class.is-active]="activePage() === 'pricing'"
            (click)="goToPricing($event)"
            (mouseenter)="onNavHover(pricingLink)"
          >Pricing</a>

          <a
            #aboutLink
            class="nav-root-link"
            href="#about"
            [class.is-active]="activePage() === 'about'"
            (click)="goToAbout($event)"
            (mouseenter)="onNavHover(aboutLink)"
          >About Us</a>

          <!-- Smooth Apple-Style Gliding Active Underline -->
          <span
            class="nav-active-indicator"
            [style.transform]="'translate3d(' + indicatorLeft() + 'px, 0, 0)'"
            [style.width.px]="indicatorWidth()"
            [style.opacity]="indicatorOpacity()"
            aria-hidden="true"
          ></span>
        </nav>

        <a class="button button-navy nav-cta" href="#demo" [class.is-demo-active]="activePage() === 'demo'" (click)="goToDemo($event)">Book a Demo <span>→</span></a>

        <button
          class="menu-toggle"
          [class.is-active]="mobileOpen()"
          (click)="toggleMobile()"
          aria-label="Toggle menu"
        >
          <i></i><i></i><i></i>
        </button>
      </div>
    </header>
  `
})
export class NavbarComponent {
  activePage = input<'home' | 'about' | 'pricing' | 'explore-warehouse' | 'explore-vans' | 'explore-3pl' | 'demo'>('home');
  navigatePage = output<'home' | 'about' | 'pricing' | 'explore-warehouse' | 'explore-vans' | 'explore-3pl' | 'demo'>();

  @ViewChild('navLinksRef') navLinksRef?: ElementRef<HTMLElement>;
  @ViewChild('homeLink') homeLink?: ElementRef<HTMLAnchorElement>;
  @ViewChild('pricingLink') pricingLink?: ElementRef<HTMLAnchorElement>;
  @ViewChild('aboutLink') aboutLink?: ElementRef<HTMLAnchorElement>;
  @ViewChild('featuresBtn') featuresBtn?: ElementRef<HTMLButtonElement>;
  @ViewChild('platformBtn') platformBtn?: ElementRef<HTMLButtonElement>;

  open = signal(false);
  featuresOpen = signal(false);
  mobileOpen = signal(false);

  indicatorLeft = signal(0);
  indicatorWidth = signal(0);
  indicatorOpacity = signal(0);

  private platformTimer: any = null;
  private featuresTimer: any = null;

  constructor(private elRef: ElementRef) {
    afterNextRender(() => {
      this.updateIndicatorToActive();
    });

    effect(() => {
      this.activePage();
      this.updateIndicatorToActive();
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.elRef && !this.elRef.nativeElement.contains(target)) {
      this.open.set(false);
      this.featuresOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.open.set(false);
    this.featuresOpen.set(false);
  }

  @HostListener('window:resize')
  onResize() {
    this.updateIndicatorToActive();
  }

  onPlatformEnter() {
    clearTimeout(this.platformTimer);
    clearTimeout(this.featuresTimer);
    this.featuresOpen.set(false);
    this.open.set(true);
    if (this.platformBtn?.nativeElement) {
      this.onNavHover(this.platformBtn.nativeElement);
    } else if (this.navLinksRef) {
      const btn = this.navLinksRef.nativeElement.querySelector<HTMLElement>('.platform-nav>button');
      if (btn) this.onNavHover(btn);
    }
  }

  onPlatformLeave() {
    clearTimeout(this.platformTimer);
    this.platformTimer = setTimeout(() => {
      this.open.set(false);
    }, 220);
  }

  onFeaturesEnter() {
    clearTimeout(this.featuresTimer);
    clearTimeout(this.platformTimer);
    this.open.set(false);
    this.featuresOpen.set(true);
    if (this.featuresBtn?.nativeElement) {
      this.onNavHover(this.featuresBtn.nativeElement);
    } else if (this.navLinksRef) {
      const btn = this.navLinksRef.nativeElement.querySelector<HTMLElement>('.features-nav>button');
      if (btn) this.onNavHover(btn);
    }
  }

  onFeaturesLeave() {
    clearTimeout(this.featuresTimer);
    this.featuresTimer = setTimeout(() => {
      this.featuresOpen.set(false);
    }, 220);
  }

  toggleOpen() {
    clearTimeout(this.platformTimer);
    if (this.open()) {
      this.open.set(false);
    } else {
      this.featuresOpen.set(false);
      this.open.set(true);
    }
  }

  toggleFeatures() {
    clearTimeout(this.featuresTimer);
    if (this.featuresOpen()) {
      this.featuresOpen.set(false);
    } else {
      this.open.set(false);
      this.featuresOpen.set(true);
    }
  }

  toggleMobile() {
    this.mobileOpen.update((v) => !v);
  }

  onNavHover(el: HTMLElement) {
    if (typeof window !== 'undefined' && window.innerWidth <= 900) return;
    if (!this.navLinksRef || !el) return;
    const nav = this.navLinksRef.nativeElement;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    this.indicatorLeft.set(Math.round(elRect.left - navRect.left));
    this.indicatorWidth.set(Math.round(elRect.width));
    this.indicatorOpacity.set(1);
  }

  onNavLeave() {
    this.updateIndicatorToActive();
  }

  updateIndicatorToActive() {
    if (typeof window === 'undefined' || window.innerWidth <= 900 || !this.navLinksRef) {
      this.indicatorOpacity.set(0);
      return;
    }

    const nav = this.navLinksRef.nativeElement;
    let targetEl: HTMLElement | null = null;

    if (this.activePage() === 'home') {
      targetEl = this.homeLink?.nativeElement || nav.querySelector<HTMLElement>('a.nav-root-link[href="#top"]') || nav.querySelector<HTMLElement>(':scope > a[href="#top"]');
    } else if (this.activePage() === 'pricing') {
      targetEl = this.pricingLink?.nativeElement || nav.querySelector<HTMLElement>('a.nav-root-link[href="#pricing"]') || nav.querySelector<HTMLElement>(':scope > a[href="#pricing"]');
    } else if (this.activePage() === 'about') {
      targetEl = this.aboutLink?.nativeElement || nav.querySelector<HTMLElement>('a.nav-root-link[href="#about"]') || nav.querySelector<HTMLElement>(':scope > a[href="#about"]');
    } else if (this.activePage() === 'explore-warehouse' || this.activePage() === 'explore-vans' || this.activePage() === 'explore-3pl') {
      targetEl = this.featuresBtn?.nativeElement || this.platformBtn?.nativeElement || nav.querySelector<HTMLElement>(':scope > .features-nav>button');
    }

    if (targetEl) {
      const navRect = nav.getBoundingClientRect();
      const elRect = targetEl.getBoundingClientRect();
      this.indicatorLeft.set(Math.round(elRect.left - navRect.left));
      this.indicatorWidth.set(Math.round(elRect.width));
      this.indicatorOpacity.set(1);
    } else {
      this.indicatorOpacity.set(0);
    }
  }

  goToHome(e: Event) {
    e.preventDefault();
    this.mobileOpen.set(false);
    this.open.set(false);
    this.featuresOpen.set(false);
    if (this.activePage() !== 'home') {
      this.navigatePage.emit('home');
      window.location.hash = '#top';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => this.updateIndicatorToActive(), 50);
  }

  goToExploreWarehouse(e?: Event) {
    if (e) e.preventDefault();
    this.mobileOpen.set(false);
    this.open.set(false);
    this.featuresOpen.set(false);
    this.navigatePage.emit('explore-warehouse');
    window.location.hash = '#explore-warehouse';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => this.updateIndicatorToActive(), 50);
  }

  goToExploreVans(e?: Event) {
    if (e) e.preventDefault();
    this.mobileOpen.set(false);
    this.open.set(false);
    this.featuresOpen.set(false);
    this.navigatePage.emit('explore-vans');
    window.location.hash = '#explore-vans';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => this.updateIndicatorToActive(), 50);
  }

  goToExplore3pl(e?: Event) {
    if (e) e.preventDefault();
    this.mobileOpen.set(false);
    this.open.set(false);
    this.featuresOpen.set(false);
    this.navigatePage.emit('explore-3pl');
    window.location.hash = '#explore-3pl';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => this.updateIndicatorToActive(), 50);
  }

  goToDemo(e?: Event) {
    if (e) e.preventDefault();
    this.mobileOpen.set(false);
    this.open.set(false);
    this.featuresOpen.set(false);
    this.navigatePage.emit('demo');
    window.location.hash = '#demo';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => this.updateIndicatorToActive(), 50);
  }

  goToAbout(e: Event) {
    e.preventDefault();
    this.mobileOpen.set(false);
    this.open.set(false);
    this.featuresOpen.set(false);
    this.navigatePage.emit('about');
    window.location.hash = '#about';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => this.updateIndicatorToActive(), 50);
  }

  goToPricing(e: Event) {
    e.preventDefault();
    this.mobileOpen.set(false);
    this.open.set(false);
    this.featuresOpen.set(false);
    this.navigatePage.emit('pricing');
    window.location.hash = '#pricing';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => this.updateIndicatorToActive(), 50);
  }

  handleSectionNav(sectionId: string, e: Event) {
    this.open.set(false);
    this.featuresOpen.set(false);
    if (sectionId === 'warehouse') {
      this.goToExploreWarehouse(e);
      return;
    }
    if (sectionId === 'vansales' || sectionId === 'vans') {
      this.goToExploreVans(e);
      return;
    }
    if (sectionId === '3pl' || sectionId === 'three-pl') {
      this.goToExplore3pl(e);
      return;
    }
    if (this.activePage() !== 'home') {
      e.preventDefault();
      this.navigatePage.emit('home');
      window.location.hash = '#' + sectionId;
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    }
  }

  exploreFeatures = [
    { icon: 'warehouse', title: 'Warehouse Management', copy: 'Complete control over products, stock and warehouse operations.' },
    { icon: 'van', title: 'VanSales', copy: 'Manage field sales, van inventory and customer operations.' },
    { icon: 'boxes', title: '3PL Management', copy: 'Streamline warehousing and third-party logistics.' },
  ];

  operations = [
    'Inventory & Stock Control',
    'Multi-Warehouse Management',
    'Purchase & Procurement',
    'Sales & Invoicing',
    'Order & Dispatch Management',
    'Reports & Analytics',
  ];

  started = [
    'Platform Overview',
    'Integrations',
    'Implementation & Onboarding',
    'Security & Access Control',
    'Request a Demo',
    'Contact Sales',
  ];
}
