import { Component, signal, output } from '@angular/core';

interface VanFeature {
  title: string;
  desc: string;
}

interface VanModule {
  id: string;
  shortName: string;
  icon: 'van' | 'driver' | 'route' | 'boxes' | 'receipt' | 'wallet' | 'distribution' | 'chart' | 'gear';
  heading: string;
  subtitle: string;
  features: VanFeature[];
  benefits: string[];
}

@Component({
  selector: 'app-vans-explore',
  standalone: true,
  template: `
    <div class="warehouse-explore-page vans-explore-page" id="vans-explore-top">
      <!-- Hero Section with Background -->
      <section class="explore-hero-section vans-hero-section" id="explore-hero">
        <div class="explore-hero-bg-overlay" aria-hidden="true"></div>
        <div class="explore-hero-shell">
          <div class="explore-hero-copy">
            <div class="explore-pill-tag">
              <span>VANSALES &amp; FLEET ERP</span>
            </div>
            <h1 class="explore-hero-title">
              Explore the Complete<br />
              <span class="hero-highlight-gold">Van Sales &amp; Fleet Solution</span>
            </h1>
            <p class="explore-hero-subtitle">
              A unified system to manage fleet vehicles, driver assignments, route distribution, van stock, on-the-go invoicing, and real-time payment collections — all in one connected platform.
            </p>
          </div>
        </div>

        <!-- Horizontal 9-Module Navigation Bar -->
        <div class="explore-tabs-outer" id="explore-modules-nav">
          <div class="explore-tabs-scroll" role="tablist" aria-label="Van Sales modules">
            @for (mod of modules; track mod.id) {
              <button
                type="button"
                class="explore-module-tab"
                [class.is-active]="activeModule() === mod.id"
                (click)="selectModuleAndScroll(mod.id)"
                role="tab"
                [attr.aria-selected]="activeModule() === mod.id"
              >
                <span class="tab-icon">
                  @switch (mod.icon) {
                    @case ('van') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 7h11v10H3zM14 10h4l3 4v3h-7z" />
                        <circle cx="7" cy="18" r="2" />
                        <circle cx="18" cy="18" r="2" />
                      </svg>
                    }
                    @case ('driver') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="7" r="4" />
                        <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" />
                      </svg>
                    }
                    @case ('route') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="6" cy="19" r="3" />
                        <circle cx="18" cy="5" r="3" />
                        <path d="M12 19h4.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H12" />
                      </svg>
                    }
                    @case ('boxes') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m12 3 8 4-8 4-8-4zM4 7v9l8 5 8-5V7M12 11v10" />
                      </svg>
                    }
                    @case ('receipt') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="4" y="2" width="16" height="20" rx="2" />
                        <line x1="8" y1="7" x2="16" y2="7"></line>
                        <line x1="8" y1="11" x2="16" y2="11"></line>
                        <line x1="8" y1="15" x2="12" y2="15"></line>
                      </svg>
                    }
                    @case ('wallet') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <path d="M2 10h20" />
                        <circle cx="17" cy="14" r="1.5" />
                      </svg>
                    }
                    @case ('distribution') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M10 17h4V2H10zM3 17h4v-7H3zM17 17h4v-11h-4z" />
                        <path d="M2 21h20" />
                      </svg>
                    }
                    @case ('chart') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 3v18h18" />
                        <path d="m19 9-5 5-4-4-3 3" />
                      </svg>
                    }
                    @case ('gear') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                    }
                  }
                </span>
                <span class="tab-label">{{ mod.shortName }}</span>
              </button>
            }
          </div>
        </div>
      </section>

      <!-- Main Expandable Accordion Sections for All 9 Modules -->
      <section class="explore-content-container" id="explore-accordion-section">
        <div class="explore-accordion-list" role="tablist">
          @for (mod of modules; track mod.id) {
            <article
              class="explore-accordion-card"
              [id]="'module-' + mod.id"
              [class.is-expanded]="activeModule() === mod.id"
            >
              <!-- Accordion Header Button -->
              <button
                type="button"
                class="explore-accordion-header"
                (click)="toggleModule(mod.id)"
                [attr.aria-expanded]="activeModule() === mod.id"
              >
                <div class="header-text-group">
                  <h2 class="module-title">{{ mod.heading }}</h2>
                  <div class="module-subtitle-wrap">
                    <span class="explore-yellow-bar" aria-hidden="true"></span>
                    <p class="module-subtitle">{{ mod.subtitle }}</p>
                  </div>
                </div>

                <div class="header-action-group">
                  <span class="explore-chevron-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
              </button>

              <!-- Accordion Body (Expanded Content) -->
              @if (activeModule() === mod.id) {
                <div class="explore-accordion-body">
                  <!-- Left Side: 2-Column Responsive Features Grid -->
                  <div class="explore-features-col">
                    <div class="features-2col-grid">
                      @for (feat of mod.features; track feat.title; let idx = $index) {
                        <div class="feature-item-box">
                          <div class="feature-icon-badge" aria-hidden="true">
                            <span class="badge-index">{{ (idx + 1) < 10 ? '0' + (idx + 1) : (idx + 1) }}</span>
                          </div>
                          <div class="feature-text">
                            <h4 class="feature-name">{{ feat.title }}</h4>
                            <p class="feature-desc">{{ feat.desc }}</p>
                          </div>
                        </div>
                      }
                    </div>
                  </div>

                  <!-- Right Side: Key Benefits Card ("Why It Matters?") -->
                  <aside class="explore-benefits-col" aria-label="Module key benefits">
                    <div class="benefits-card">
                      <div class="benefits-card-header">
                        <span class="benefits-tag">KEY BENEFITS</span>
                        <h3 class="benefits-title">Why It Matters?</h3>
                      </div>

                      <ul class="benefits-list">
                        @for (ben of mod.benefits; track ben) {
                          <li class="benefit-item">
                            <span class="benefit-check" aria-hidden="true">✓</span>
                            <span class="benefit-text">{{ ben }}</span>
                          </li>
                        }
                      </ul>

                      <div class="benefits-pallet-art" aria-hidden="true">
                        <img
                          src="/assets/capability-pallet.png"
                          alt="Van distribution stock ready for dispatch"
                          class="pallet-boxes-img"
                        />
                      </div>
                    </div>
                  </aside>
                </div>
              }
            </article>
          }
        </div>

        <!-- Connected STOCCOZ Van Management Workflow Section -->
        <section class="explore-workflow-section" id="explore-workflow">
          <div class="workflow-card">
            <div class="workflow-left-intro">
              <div class="workflow-icon-box" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#08122d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 7h11v10H3zM14 10h4l3 4v3h-7z" />
                  <circle cx="7" cy="18" r="2" />
                  <circle cx="18" cy="18" r="2" />
                </svg>
              </div>
              <div class="workflow-text">
                <h3 class="workflow-title">Complete STOCCOZ Van Management Workflow</h3>
                <p class="workflow-desc">This illustrates how the major van operations connect within STOCCOZ.</p>
              </div>
            </div>

            <!-- Clickable Workflow Steps Chain -->
            <div class="workflow-steps-chain" role="navigation" aria-label="Connected van workflow steps">
              <button type="button" class="workflow-step-btn" (click)="selectModuleAndScroll('fleet-vehicle')">
                <span class="step-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 7h11v10H3zM14 10h4l3 4v3h-7z" />
                    <circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" />
                  </svg>
                </span>
                <span class="step-title">Fleet Management</span>
              </button>

              <span class="workflow-arrow" aria-hidden="true">→</span>

              <button type="button" class="workflow-step-btn" (click)="selectModuleAndScroll('driver-mgmt')">
                <span class="step-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="7" r="4" /><path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" />
                  </svg>
                </span>
                <span class="step-title">Driver &amp; Route</span>
              </button>

              <span class="workflow-arrow" aria-hidden="true">→</span>

              <button type="button" class="workflow-step-btn" (click)="selectModuleAndScroll('van-stock')">
                <span class="step-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m12 3 8 4-8 4-8-4zM4 7v9l8 5 8-5V7M12 11v10" />
                  </svg>
                </span>
                <span class="step-title">Van Stock</span>
              </button>

              <span class="workflow-arrow" aria-hidden="true">→</span>

              <button type="button" class="workflow-step-btn" (click)="selectModuleAndScroll('van-sales')">
                <span class="step-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="8" y1="7" x2="16" y2="7"></line>
                  </svg>
                </span>
                <span class="step-title">Van Sales</span>
              </button>

              <span class="workflow-arrow" aria-hidden="true">→</span>

              <button type="button" class="workflow-step-btn" (click)="selectModuleAndScroll('distribution-ops')">
                <span class="step-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10 17h4V2H10zM3 17h4v-7H3zM17 17h4v-11h-4z" /><path d="M2 21h20" />
                  </svg>
                </span>
                <span class="step-title">Reconciliation</span>
              </button>

              <span class="workflow-arrow" aria-hidden="true">→</span>

              <button type="button" class="workflow-step-btn" (click)="selectModuleAndScroll('reports-insights')">
                <span class="step-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </span>
                <span class="step-title">Reports &amp; Insights</span>
              </button>
            </div>
          </div>
        </section>
      </section>
    </div>
  `
})
export class VansExploreComponent {
  navigateAbout = output<void>();
  navigateDemo = output<void>();
  navigateHome = output<void>();
  navigatePricing = output<void>();
  navigateWarehouse = output<void>();

  // Initially expand Fleet & Vehicle Management (first module)
  activeModule = signal<string>('fleet-vehicle');

  modules: VanModule[] = [
    {
      id: 'fleet-vehicle',
      shortName: 'Fleet & Vehicles',
      icon: 'van',
      heading: '1. Fleet & Vehicle Management',
      subtitle: 'Register, configure, and monitor delivery vans, trucks, and all business vehicles across operations.',
      features: [
        {
          title: 'Vehicle Registration',
          desc: 'Add and manage delivery vans, trucks, and other business vehicles.'
        },
        {
          title: 'Vehicle Details',
          desc: 'Maintain vehicle numbers, names, types, and registration information.'
        },
        {
          title: 'Fleet Overview',
          desc: 'View all registered vehicles and their current assignments.'
        },
        {
          title: 'Vehicle-Wise Operations',
          desc: 'Monitor stock, sales, and operational activities for each vehicle.'
        },
        {
          title: 'Vehicle Availability',
          desc: 'Identify assigned and unassigned vehicles.'
        },
        {
          title: 'Fleet Configuration',
          desc: 'Manage vehicle-related settings and operational preferences.'
        }
      ],
      benefits: [
        'Centralized control over your entire distribution fleet',
        'Real-time visibility into vehicle availability and assignment status',
        'Accurate vehicle-level tracking of stock, sales, and field operations',
        'Reduced vehicle downtime and optimized maintenance scheduling'
      ]
    },
    {
      id: 'driver-mgmt',
      shortName: 'Driver Management',
      icon: 'driver',
      heading: '2. Driver Management',
      subtitle: 'Manage driver profiles, route assignments, reassignments, and field sales performance.',
      features: [
        {
          title: 'Driver Registration',
          desc: 'Create and maintain driver profiles and contact information.'
        },
        {
          title: 'Driver Assignment',
          desc: 'Assign drivers to specific vans or vehicles.'
        },
        {
          title: 'Driver Reassignment',
          desc: 'Change driver assignments whenever operational requirements change.'
        },
        {
          title: 'Unassign Driver',
          desc: 'Remove driver assignments when vehicles or drivers are no longer assigned.'
        },
        {
          title: 'Driver-Wise Sales Tracking',
          desc: 'Review sales generated by individual drivers.'
        },
        {
          title: 'Driver Assignment History',
          desc: 'Maintain visibility into driver and vehicle assignments.'
        }
      ],
      benefits: [
        'Total accountability for every vehicle and driver in the field',
        'Effortless driver reassignments and shift updates in real time',
        'Transparent driver sales performance and cash collection tracking',
        'Comprehensive historical records of vehicle assignments'
      ]
    },
    {
      id: 'route-mgmt',
      shortName: 'Route Management',
      icon: 'route',
      heading: '3. Route Management',
      subtitle: 'Create, assign, update, and manage delivery and distribution routes with complete operational control.',
      features: [
        {
          title: 'Route Creation',
          desc: 'Create and manage delivery and distribution routes.'
        },
        {
          title: 'Route Assignment',
          desc: 'Assign specific routes to drivers and vehicles.'
        },
        {
          title: 'Route-Wise Operations',
          desc: 'Organize vehicle activities based on assigned routes.'
        },
        {
          title: 'Route Management Overview',
          desc: 'View and manage available routes centrally.'
        },
        {
          title: 'Route Reassignment',
          desc: 'Update route assignments according to operational requirements.'
        }
      ],
      benefits: [
        'Structured and predictable delivery schedules for maximum route density',
        'Seamless route reassignment when customer demands change',
        'Route-level sales analysis to pinpoint high-performing distribution channels',
        'Minimized fuel costs and eliminated overlapping distribution trips'
      ]
    },
    {
      id: 'van-stock',
      shortName: 'Van Stock',
      icon: 'boxes',
      heading: '4. Van Stock Management',
      subtitle: 'Maintain accurate vehicle inventory, manage warehouse-to-van transfers, and reconcile unsold stock.',
      features: [
        {
          title: 'Van-Wise Inventory',
          desc: 'Maintain separate stock records for each van.'
        },
        {
          title: 'Stock Allocation',
          desc: 'Assign products and quantities to individual vehicles.'
        },
        {
          title: 'Warehouse-to-Van Transfer',
          desc: 'Transfer stock from warehouses to delivery vans.'
        },
        {
          title: 'Van-to-Warehouse Transfer',
          desc: 'Return unsold stock from vans to warehouses.'
        },
        {
          title: 'Van Stock Overview',
          desc: 'Monitor available stock across all assigned vehicles.'
        },
        {
          title: 'Product-Wise Stock Tracking',
          desc: 'Check individual product quantities in each van.'
        },
        {
          title: 'Stock Reconciliation',
          desc: 'Verify physical stock against recorded van inventory.'
        }
      ],
      benefits: [
        'Zero stock leakage between warehouse dispatch and customer delivery',
        'Live visibility into van stock levels during delivery runs',
        'Smooth return process for unsold stock back to central storage',
        'Daily stock reconciliation to eliminate discrepancies instantly'
      ]
    },
    {
      id: 'van-sales',
      shortName: 'Van Sales',
      icon: 'receipt',
      heading: '5. Van Sales Management',
      subtitle: 'Create direct sales transactions from vehicles, select products, and generate instant customer invoices.',
      features: [
        {
          title: 'Direct Van Sales',
          desc: 'Create sales transactions directly from vehicles while visiting customers.'
        },
        {
          title: 'Customer Management',
          desc: 'Select existing customers and maintain customer transaction details.'
        },
        {
          title: 'Product & Pricing Selection',
          desc: 'Select products, quantities, and applicable selling prices.'
        },
        {
          title: 'Instant Invoice Generation',
          desc: 'Generate sales invoices directly for van transactions.'
        },
        {
          title: 'Real-Time Stock Deduction',
          desc: 'Automatically update van inventory when products are sold.'
        },
        {
          title: 'Sales Returns',
          desc: 'Record returned products and update stock accordingly.'
        },
        {
          title: 'Sold Today',
          desc: 'Monitor daily sales generated through van operations.'
        },
        {
          title: 'Van-Wise Sales History',
          desc: 'Review previous transactions for each vehicle.'
        }
      ],
      benefits: [
        'Accelerated customer billing right at the customer’s doorstep',
        'Automatic van stock deduction on every completed sale',
        'Real-time synchronization of customer purchase history and credit limits',
        'Instant processing of customer returns and credit notes in the field'
      ]
    },
    {
      id: 'van-payments',
      shortName: 'Van Payments',
      icon: 'wallet',
      heading: '6. Van Payment Management',
      subtitle: 'Record customer payments, cash collections, credit sales, and driver balances with full auditability.',
      features: [
        {
          title: 'Multiple Payment Methods',
          desc: 'Record customer payments through supported payment methods.'
        },
        {
          title: 'Cash Collection',
          desc: 'Record cash collected by drivers during sales.'
        },
        {
          title: 'Credit Sales',
          desc: 'Manage sales made on credit and outstanding customer balances.'
        },
        {
          title: 'Payment Tracking',
          desc: 'Monitor received and pending payments.'
        },
        {
          title: 'Driver-Wise Collections',
          desc: 'Review payments collected by individual drivers.'
        },
        {
          title: 'Payment History',
          desc: 'Maintain transaction-wise payment records.'
        }
      ],
      benefits: [
        'Accurate driver cash settlement at the end of every distribution shift',
        'Clear visibility into credit sales and aging customer receivables',
        'Instant generation of payment receipts for visiting customers',
        'Elimination of cash handling discrepancies and lost collection records'
      ]
    },
    {
      id: 'distribution-ops',
      shortName: 'Distribution',
      icon: 'distribution',
      heading: '7. Distribution & Delivery Operations',
      subtitle: 'Streamline route deliveries, organize customer visits, manage order fulfilment, and handle returns.',
      features: [
        {
          title: 'Vehicle-Based Distribution',
          desc: 'Organize product distribution through assigned vehicles.'
        },
        {
          title: 'Route-Based Deliveries',
          desc: 'Manage deliveries according to assigned routes.'
        },
        {
          title: 'Customer Visits',
          desc: 'Organize customer transactions around delivery routes.'
        },
        {
          title: 'Order Fulfilment',
          desc: 'Manage customer orders using available van stock.'
        },
        {
          title: 'Delivery Stock Tracking',
          desc: 'Monitor products allocated, sold, and remaining.'
        },
        {
          title: 'Return Stock Handling',
          desc: 'Record unsold and returned inventory.'
        }
      ],
      benefits: [
        'Maximum on-time delivery rates across all scheduled customer stops',
        'Structured customer visit sequences to optimize driver working hours',
        'Higher first-attempt order fulfilment using live on-board inventory',
        'Seamless end-of-day return stock handling with warehouse integration'
      ]
    },
    {
      id: 'reports-insights',
      shortName: 'Reports & Insights',
      icon: 'chart',
      heading: '8. Reports & Business Insights',
      subtitle: 'In-depth reporting on vehicle sales, driver performance, stock transfers, and daily revenue collections.',
      features: [
        {
          title: 'Van-Wise Sales Reports',
          desc: 'Analyze sales performance across individual vehicles.'
        },
        {
          title: 'Driver-Wise Sales Reports',
          desc: 'Compare sales generated by different drivers.'
        },
        {
          title: 'Van Stock Reports',
          desc: 'View available and remaining stock in each vehicle.'
        },
        {
          title: 'Stock Transfer Reports',
          desc: 'Review warehouse-to-van and van-to-warehouse transfers.'
        },
        {
          title: 'Daily Sales Reports',
          desc: 'Monitor daily van sales and transaction totals.'
        },
        {
          title: 'Payment Collection Reports',
          desc: 'Track cash collections and outstanding payments.'
        },
        {
          title: 'Route-Wise Performance',
          desc: 'Analyze sales and operational performance across routes.'
        },
        {
          title: 'Sales Return Reports',
          desc: 'Review returned products and associated transactions.'
        }
      ],
      benefits: [
        'Data-driven visibility into high-margin delivery routes and top sales drivers',
        'Instant detection of shrinkage, slow-moving items, or stock variances',
        'Daily executive summaries of cash collected and pending customer dues',
        'Actionable business intelligence for continuous fleet expansion'
      ]
    },
    {
      id: 'settings-config',
      shortName: 'Settings',
      icon: 'gear',
      heading: '9. Van & Fleet Settings',
      subtitle: 'Configure vehicle parameters, driver preferences, route rules, invoice templates, and warehouse sync.',
      features: [
        {
          title: 'Vehicle Settings',
          desc: 'Configure vehicle information and fleet-related options.'
        },
        {
          title: 'Driver Settings',
          desc: 'Manage driver records and assignments.'
        },
        {
          title: 'Route Settings',
          desc: 'Configure and maintain delivery routes.'
        },
        {
          title: 'Van Stock Settings',
          desc: 'Manage vehicle inventory operations.'
        },
        {
          title: 'Sales Configuration',
          desc: 'Configure van sales and applicable invoice settings.'
        },
        {
          title: 'Warehouse Integration',
          desc: 'Connect van operations with warehouse inventory workflows.'
        }
      ],
      benefits: [
        'Tailored configuration to match your business’s specific operational workflows',
        'Automated synchronization between field vans and central warehouse databases',
        'Customizable invoice formats, tax rules, and currency settings',
        'Robust access permissions safeguarding critical fleet and customer pricing data'
      ]
    }
  ];

  toggleModule(id: string) {
    if (this.activeModule() === id) {
      this.activeModule.set('');
    } else {
      this.activeModule.set(id);
    }
  }

  selectModuleAndScroll(id: string) {
    this.activeModule.set(id);
    if (typeof document !== 'undefined') {
      setTimeout(() => {
        const el = document.getElementById('module-' + id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  }
}

