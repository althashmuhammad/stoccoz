import { Component, signal, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PricingPlan {
  id: 'silver' | 'gold' | 'platinum' | 'enterprise';
  name: string;
  role: string;
  tag: string;
  desc: string;
  monthly: number;
  from?: boolean;
  setup: string;
  users?: string;
  wh?: string;
  vans?: string;
  custom?: string;
  popular?: boolean;
  inherits?: 'silver' | 'gold' | 'platinum' | null;
  cta: string;
  features: string[];
}

const PLANS: PricingPlan[] = [
  {
    id: 'silver',
    name: 'Silver',
    role: 'Starter',
    tag: 'Essential ERP for small operations',
    desc: 'Ideal for small wholesalers and traders getting started with stock and sales.',
    monthly: 99,
    setup: '$299 once',
    users: '3',
    wh: '1',
    vans: '—',
    inherits: null,
    cta: 'Start Free Trial',
    features: [
      'Inventory management',
      'Purchasing & supplier management',
      'Sales orders & quotations',
      'Invoicing & returns',
      'Customer & supplier balances',
      'Basic operational reports'
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    role: 'Distribution',
    tag: 'Complete system for growing distributors',
    popular: true,
    desc: 'Designed for expanding distribution operations needing van sales and tracking.',
    monthly: 249,
    setup: '$799 once',
    users: '5',
    wh: '2',
    vans: '3',
    inherits: 'silver',
    cta: 'Start Free Trial',
    features: [
      'Van sales automation',
      'Driver tracking & GPS logs',
      'Delivery & order collections',
      'Inter-warehouse transfers',
      'Distribution reports & analytics'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum',
    role: 'Growth',
    tag: 'Advanced ERP for scaling operations',
    desc: 'For high-volume operations requiring production control and multi-tiered approvals.',
    monthly: 499,
    setup: '$1,499 once',
    users: '15',
    wh: '5',
    vans: '10',
    inherits: 'gold',
    cta: 'Start Free Trial',
    features: [
      'Production & BOM management',
      'Approval workflows & controls',
      'Advanced analytics & custom reports',
      'Priority 24/7 support & onboarding'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    role: '',
    tag: 'Tailored multi-location deployment',
    desc: 'Custom architecture for complex corporate operations & high scalability requirements.',
    monthly: 999,
    from: true,
    setup: 'Custom quotation',
    custom: 'Agreed multi-location deployment & custom capacity',
    inherits: null,
    cta: 'Contact Sales',
    features: [
      'Agreed multi-location deployment',
      'Integration requirements (API / ERP)',
      'Dedicated onboarding & training',
      'Support arrangements & SLA',
      'Dedicated cloud infrastructure'
    ]
  }
];

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="pricing-section section-shell"
      id="pricing"
      [class.has-expanded-card]="selectedPlan() !== null"
      [attr.data-mode]="selectedPlan() ? 'detail' : 'grid'"
      data-reveal
    >
      <div class="inner">
        <!-- Header -->
        <header class="head">
          <span class="bar" aria-hidden="true"></span>
          <p class="eyebrow">TRANSPARENT PRICING PLANS</p>
          <h2 id="pricing-title">Choose Your Perfect <em>ERP Plan</em></h2>
          <p class="sub">
            Scale your inventory, warehouses, and distribution fleet with flexible, transparent pricing.
            All plans include a 30-day trial with full feature access.
          </p>

          <!-- Monthly / Yearly Billing Switch -->
          <div class="switch-row">
            <span
              class="lbl"
              [class.on]="!yearly()"
              (click)="setYearly(false)"
              role="button"
              tabindex="0"
              (keydown.enter)="setYearly(false)"
            >
              Monthly Billing
            </span>

            <button
              type="button"
              class="switch"
              [attr.aria-checked]="yearly()"
              (click)="toggleYearly()"
              aria-label="Toggle yearly upfront billing with ~17% discount"
            ></button>

            <span
              class="lbl"
              [class.on]="yearly()"
              (click)="setYearly(true)"
              role="button"
              tabindex="0"
              (keydown.enter)="setYearly(true)"
            >
              Yearly Payment Upfront <em>Save ~17%</em>
            </span>
          </div>

          <!-- 3 Guarantees -->
          <ul class="checks">
            <li><i aria-hidden="true"></i>30-day trial</li>
            <li><i aria-hidden="true"></i>Full feature access</li>
            <li><i aria-hidden="true"></i>Setup fee paid once</li>
          </ul>
        </header>

        <!-- Stage Container -->
        <div class="stage">
          <!-- Detail Breadcrumbs when a plan is expanded -->
          <div class="crumbs" [class.is-visible]="selectedPlan() !== null">
            @if (selectedPlan(); as selId) {
              <button type="button" class="back" (click)="collapsePlan($event)">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M2 8h12M9 3l5 5-5 5"/>
                </svg>
                All plans
              </button>
              <span>{{ getPlan(selId)?.name }}{{ getPlan(selId)?.role ? ' — ' + getPlan(selId)?.role : '' }}</span>
            }
          </div>

          <!-- Grid of Plans with Smooth Column Transition -->
          <ul
            class="plans"
            [class.has-expanded-card]="selectedPlan() !== null"
            [class.expanded-silver]="selectedPlan() === 'silver'"
            [class.expanded-gold]="selectedPlan() === 'gold'"
            [class.expanded-platinum]="selectedPlan() === 'platinum'"
            [class.expanded-enterprise]="selectedPlan() === 'enterprise'"
          >
            @for (plan of plans; track plan.id; let i = $index) {
              <li
                class="pc tone-{{ plan.id }}"
                [class.is-expanded]="selectedPlan() === plan.id"
                [class.is-compact]="selectedPlan() !== null && selectedPlan() !== plan.id"
                [attr.data-plan]="plan.id"
                (click)="onCardClick(plan.id)"
                role="region"
                [attr.aria-label]="plan.name + ' plan'"
              >
                <!-- Glowing Radial Background & Sheen Layers -->
                <span class="bg" aria-hidden="true"></span>
                <span class="arc" aria-hidden="true"></span>
                <span class="arc b" aria-hidden="true"></span>
                <span class="sheen" aria-hidden="true"></span>

                <div class="pc-in">
                  <!-- Plan Card Top Header -->
                  <header class="pc-top">
                    <div class="pc-title-grp">
                      <h3 class="pc-name">{{ plan.name }}</h3>
                      @if (plan.role) {
                        <span class="pc-role">{{ plan.role }}</span>
                      }
                    </div>

                    <div class="chips">
                      @if (plan.popular) {
                        <span class="chip">Most Popular</span>
                      }
                      @if (selectedPlan() === plan.id) {
                        <span class="chip soft">Selected</span>
                      }
                    </div>
                  </header>

                  <!-- Plan Tagline -->
                  <p class="pc-tag">{{ plan.tag }}</p>

                  <!-- Price Block -->
                  <p class="pc-from" [class.ph]="!plan.from">From</p>
                  <div class="pc-price">
                    @if (plan.from && selectedPlan() === plan.id) {
                      <small>From</small>
                    }
                    <b>{{ getPriceInfo(plan).amt }}</b>
                    <span>{{ getPriceInfo(plan).per }}</span>
                  </div>
                  <p class="pc-note">{{ getPriceInfo(plan).note }}</p>

                  <!-- UNEXPANDED VIEW SECTION (Smoothly fades & collapses on expansion) -->
                  <div class="pc-unexpanded-details">
                    <p class="pc-meta pc-cap">{{ getCapacitySummary(plan) }}</p>
                    <p class="pc-meta">Setup fee · {{ plan.setup }}</p>

                    <button
                      type="button"
                      class="pc-btn"
                      (click)="onSelectButtonClick(plan.id, $event)"
                      [attr.aria-label]="'View the ' + plan.name + ' plan details'"
                    >
                      {{ plan.cta }} →
                    </button>

                    <ul class="chk">
                      @if (plan.inherits) {
                        <li class="inc">Everything in {{ getPlan(plan.inherits)?.name }}, plus:</li>
                      }
                      @for (feat of plan.features; track feat) {
                        <li>{{ feat }}</li>
                      }
                    </ul>
                  </div>

                  <!-- EXPANDED INSIDE VIEW SECTION (Smoothly slides open like STOCCOZ Inventory Management) -->
                  <div class="pc-expanded-details">
                    <p class="pc-desc">{{ plan.desc }}</p>

                    <!-- Action CTAs -->
                    <div class="acts">
                      <button
                        type="button"
                        class="act"
                        (click)="onStamp(plan.id, $event)"
                      >
                        {{ stampedPlan() === plan.id ? 'Plan selected ✓' : plan.cta + ' →' }}
                      </button>
                      <a href="#demo" class="act ghost" (click)="goToDemo($event)">
                        Book a demo →
                      </a>
                    </div>

                    <hr class="hr" />

                    <!-- Included Capacity Tiles -->
                    <p class="lab">INCLUDED CAPACITY</p>
                    @if (plan.custom) {
                      <div class="tiles">
                        <div class="tile custom">
                          <b>{{ plan.custom }}</b>
                          <span>Scoped with you</span>
                        </div>
                      </div>
                    } @else {
                      <div class="tiles">
                        <div class="tile">
                          <b>{{ plan.users }}</b>
                          <span>Office users</span>
                        </div>
                        <div class="tile">
                          <b>{{ plan.wh }}</b>
                          <span>{{ plan.wh === '1' ? 'Warehouse' : 'Warehouses' }}</span>
                        </div>
                        <div class="tile">
                          <b>{{ plan.vans }}</b>
                          <span>Vans</span>
                        </div>
                      </div>
                    }

                    <hr class="hr" />

                    <!-- Tiered Feature Breakdown -->
                    <div class="grp">
                      <p class="lab">{{ plan.inherits ? 'New in ' + plan.name : 'Key features' }}</p>
                      <ul class="chk">
                        @for (feat of plan.features; track feat) {
                          <li>{{ feat }}</li>
                        }
                      </ul>
                    </div>

                    @for (inherited of getInheritedChain(plan); track inherited.id) {
                      <div class="grp">
                        <p class="lab">Included from {{ inherited.name }}</p>
                        <ul class="chk">
                          @for (feat of inherited.features; track feat) {
                            <li class="muted">{{ feat }}</li>
                          }
                        </ul>
                      </div>
                    }

                    <hr class="hr" />

                    <!-- Summary Box -->
                    <div class="sum">
                      <p class="lab">Summary</p>
                      <p>
                        <span class="k">Subscription</span>
                        <i></i>
                        <span class="v">{{ getPriceInfo(plan).amt }} {{ getPriceInfo(plan).per }}</span>
                      </p>
                      <p>
                        <span class="k">Setup fee</span>
                        <i></i>
                        <span class="v">{{ plan.setup }}</span>
                      </p>
                      @if (yearly()) {
                        <p>
                          <span class="k">Yearly saving</span>
                          <i></i>
                          <span class="v">{{ getYearlySaving(plan) }}</span>
                        </p>
                      }
                      <p>
                        <span class="k">Trial</span>
                        <i></i>
                        <span class="v">30 days · full access</span>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `
})
export class PricingComponent {
  navigateAbout = output<void>();
  navigateDemo = output<void>();

  goToDemo(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.navigateDemo.emit();
    window.location.hash = '#demo';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToAbout(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.navigateAbout.emit();
    window.location.hash = '#about';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  plans: PricingPlan[] = PLANS;
  yearly = signal<boolean>(false);
  selectedPlan = signal<string | null>(null);
  stampedPlan = signal<string | null>(null);

  getPlan(id: string | null): PricingPlan | undefined {
    return id ? this.plans.find(p => p.id === id) : undefined;
  }

  toggleYearly(): void {
    this.yearly.update(v => !v);
  }

  setYearly(val: boolean): void {
    this.yearly.set(val);
  }

  togglePlan(id: string): void {
    if (this.selectedPlan() === id) {
      this.selectedPlan.set(null);
    } else {
      this.selectedPlan.set(id);
    }
  }

  onCardClick(id: string): void {
    this.togglePlan(id);
  }

  onSelectButtonClick(id: string, e: Event): void {
    e.stopPropagation();
    this.togglePlan(id);
  }

  collapsePlan(e?: Event): void {
    if (e) {
      e.stopPropagation();
    }
    this.selectedPlan.set(null);
  }

  onStamp(id: string, e: Event): void {
    e.stopPropagation();
    this.stampedPlan.set(id);
  }

  getPriceInfo(plan: PricingPlan): { amt: string; per: string; note: string } {
    const isYearly = this.yearly();
    const rawAmt = isYearly ? plan.monthly * 10 : plan.monthly;
    const formattedAmt = '$' + rawAmt.toLocaleString('en-US');
    const per = isYearly ? '/year' : '/month';

    const note = isYearly
      ? '≈ $' + (Math.round((plan.monthly * 10 / 12) * 100) / 100).toFixed(2) + '/mo · save $' + (plan.monthly * 2).toLocaleString('en-US')
      : 'Billed monthly';

    return { amt: formattedAmt, per, note };
  }

  getYearlySaving(plan: PricingPlan): string {
    return '$' + (plan.monthly * 2).toLocaleString('en-US');
  }

  getCapacitySummary(plan: PricingPlan): string {
    if (plan.custom) {
      return 'Multi-location deployment · custom capacity';
    }
    const whStr = plan.wh === '1' ? '1 warehouse' : `${plan.wh} warehouses`;
    const vanStr = plan.vans === '—' ? 'no vans' : `${plan.vans} vans`;
    return `${plan.users} office users · ${whStr} · ${vanStr}`;
  }

  getInheritedChain(plan: PricingPlan): PricingPlan[] {
    const chain: PricingPlan[] = [];
    let curId = plan.inherits;
    while (curId) {
      const parent = this.getPlan(curId);
      if (parent) {
        chain.push(parent);
        curId = parent.inherits;
      } else {
        break;
      }
    }
    return chain;
  }
}
