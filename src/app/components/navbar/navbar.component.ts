import { Component, input, output, signal } from '@angular/core';
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

        <nav [class.is-open]="mobileOpen()" class="nav-links" aria-label="Main navigation">
          <a
            href="#top"
            [class.is-active]="activePage() === 'home'"
            (click)="goToHome($event)"
          >Home</a>

          <!-- Platform Mega Menu Trigger -->
          <div
            class="platform-nav"
            (mouseenter)="open.set(true)"
            (mouseleave)="open.set(false)"
          >
            <button
              (click)="toggleOpen()"
              [attr.aria-expanded]="open()"
            >
              Platform <span>⌄</span>
            </button>

            @if (open()) {
              <div class="mega-menu">
                <div class="mega-col explore-col">
                  <p class="eyebrow">Stoccoz platform</p>
                  <h3>Explore Stoccoz Platform</h3>
                  @for (feat of exploreFeatures; track feat.title) {
                    <a
                      class="mega-feature"
                      [href]="feat.title === 'VanSales' ? '#vansales' : '#warehouse'"
                      (click)="handleSectionNav(feat.title === 'VanSales' ? 'vansales' : 'warehouse', $event)"
                    >
                      <span class="mega-icon"><app-line-icon [name]="feat.icon"></app-line-icon></span>
                      <span><b>{{ feat.title }}</b><small>{{ feat.copy }}</small></span>
                      <span class="arrow">›</span>
                    </a>
                  }
                  <a class="text-link" href="#platform" (click)="handleSectionNav('platform', $event)">Explore the Platform <span>→</span></a>
                </div>

                <div class="mega-col">
                  <p class="eyebrow">Core capabilities</p>
                  <h3>Manage Your Operations</h3>
                  @for (item of operations; track item; let idx = $index) {
                    <a class="mega-link" href="#warehouse" (click)="handleSectionNav('warehouse', $event)">
                      <app-line-icon [name]="idx === 5 ? 'chart' : idx === 3 ? 'order' : 'boxes'"></app-line-icon>
                      {{ item }}
                    </a>
                  }
                </div>

                <div class="mega-col">
                  <p class="eyebrow">Get started</p>
                  <h3>About Stoccoz</h3>
                  @for (item of started; track item; let idx = $index) {
                    <a class="mega-link" [href]="idx > 3 ? '#about' : '#platform'" (click)="idx > 3 ? goToAbout($event) : handleSectionNav('platform', $event)">
                      <app-line-icon [name]="idx > 3 ? 'user' : 'warehouse'"></app-line-icon>
                      {{ item }}
                    </a>
                  }
                </div>
              </div>
            }
          </div>

          <!-- Features Dropdown Trigger -->
          <div
            class="features-nav"
            (mouseenter)="featuresOpen.set(true)"
            (mouseleave)="featuresOpen.set(false)"
          >
            <button
              (click)="toggleFeatures()"
              [attr.aria-expanded]="featuresOpen()"
            >
              Features <span>⌄</span>
            </button>
            @if (featuresOpen()) {
              <div class="features-dropdown">
                <a href="#warehouse" (click)="featuresOpen.set(false); handleSectionNav('warehouse', $event)">
                  <span><app-line-icon name="warehouse"></app-line-icon></span>
                  <div><b>Warehouse</b><small>Inventory and warehouse operations</small></div>
                </a>
                <a href="#vansales" (click)="featuresOpen.set(false); handleSectionNav('vansales', $event)">
                  <span><app-line-icon name="van"></app-line-icon></span>
                  <div><b>VanSales</b><small>Field sales and distribution</small></div>
                </a>
                <a href="#top" (click)="featuresOpen.set(false); handleSectionNav('top', $event)">
                  <span><app-line-icon name="boxes"></app-line-icon></span>
                  <div><b>3PL</b><small>Third-party logistics management</small></div>
                </a>
              </div>
            }
          </div>

          <a
            href="#pricing"
            [class.is-active]="activePage() === 'pricing'"
            (click)="goToPricing($event)"
          >Pricing</a>

          <a
            href="#about"
            [class.is-active]="activePage() === 'about'"
            (click)="goToAbout($event)"
          >About Us</a>
        </nav>

        <a class="button button-navy nav-cta" href="#about" (click)="goToAbout($event)">Book a Demo <span>→</span></a>

        <button
          class="menu-toggle"
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
  activePage = input<'home' | 'about' | 'pricing'>('home');
  navigatePage = output<'home' | 'about' | 'pricing'>();

  open = signal(false);
  featuresOpen = signal(false);
  mobileOpen = signal(false);

  toggleOpen() {
    this.open.update((v) => !v);
  }

  toggleFeatures() {
    this.featuresOpen.update((v) => !v);
  }

  toggleMobile() {
    this.mobileOpen.update((v) => !v);
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
  }

  goToAbout(e: Event) {
    e.preventDefault();
    this.mobileOpen.set(false);
    this.open.set(false);
    this.featuresOpen.set(false);
    this.navigatePage.emit('about');
    window.location.hash = '#about';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToPricing(e: Event) {
    e.preventDefault();
    this.mobileOpen.set(false);
    this.open.set(false);
    this.featuresOpen.set(false);
    this.navigatePage.emit('pricing');
    window.location.hash = '#pricing';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleSectionNav(sectionId: string, e: Event) {
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
