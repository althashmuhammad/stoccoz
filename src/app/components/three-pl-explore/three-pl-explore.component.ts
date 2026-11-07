import { Component, signal, output } from '@angular/core';

export interface ThreePLFeature {
  title: string;
  desc: string;
}

export interface ThreePLModule {
  id: string;
  shortName: string;
  icon: string;
  heading: string;
  subtitle: string;
  features: ThreePLFeature[];
  benefits: string[];
}

@Component({
  selector: 'app-three-pl-explore',
  standalone: true,
  template: `
    <div class="warehouse-explore-page three-pl-explore-page" id="three-pl-explore-top">
      <!-- 1. Hero Section: Clean White Design & Engineer Visual (Matches Image 1 UI Header) -->
      <section
        class="explore-hero-section three-pl-hero-section"
        id="explore-hero"
      >
        <div class="explore-hero-shell three-pl-hero-shell">
          <div class="explore-hero-copy three-pl-hero-copy">
            <h1 class="explore-hero-title three-pl-hero-title">
              Explore the Complete<br />
              Third-Party Logistics<br />
              (3PL) Solution
            </h1>
            <p class="explore-hero-subtitle three-pl-hero-subtitle">
              From multi-client onboarding and dock receiving to segregated WMS inventory, wave fulfilment, delivery fleet tracking, and automated 3PL billing — all in one unified platform.
            </p>
          </div>
          <div class="three-pl-hero-visual" aria-hidden="true">
            <img
              src="/assets/three-pl-engineer-tablet.png"
              alt="3PL Logistics Manager with Warehouse Tablet"
              class="three-pl-hero-img"
            />
          </div>
        </div>

        <!-- 2. Horizontal Scroll 12-Module Navigation Bar -->
        <div class="explore-tabs-outer" id="explore-modules-nav">
          <div class="explore-tabs-scroll" role="tablist" aria-label="3PL modules">
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
                    @case ('clients') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    }
                    @case ('warehouse') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 10 12 4l9 6v10H3Z" />
                        <path d="M7 20v-6h10v6M7 10h2m3 0h2m3 0h1" />
                      </svg>
                    }
                    @case ('inbound') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
                      </svg>
                    }
                    @case ('inventory') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m12 3 8 4-8 4-8-4zM4 7v9l8 5 8-5V7M12 11v10"/>
                      </svg>
                    }
                    @case ('replenishment') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/>
                      </svg>
                    }
                    @case ('fulfilment') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                      </svg>
                    }
                    @case ('fleet') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 7h11v10H3zM14 10h4l3 4v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>
                      </svg>
                    }
                    @case ('returns') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
                      </svg>
                    }
                    @case ('billing') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><path d="m7 15 2 2 4-4"/>
                      </svg>
                    }
                    @case ('portal') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                    }
                    @case ('api') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                      </svg>
                    }
                    @case ('analytics') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
                      </svg>
                    }
                    @default {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
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

      <!-- 3. Main Expandable Accordion List for All 12 Modules (Exact VanSales & Warehouse Design) -->
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

              <!-- Accordion Body (Expanded Content with Smooth CSS Grid Transition) -->
              <div
                class="explore-accordion-collapse"
                [class.is-open]="activeModule() === mod.id"
                [attr.aria-hidden]="activeModule() !== mod.id"
              >
                <div class="explore-accordion-collapse-inner">
                  <div class="explore-accordion-body">
                    <!-- Left Column: 2-Column Responsive Features Grid -->
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

                    <!-- Right Column: Key Benefits Card ("Why It Matters?") -->
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
                            alt="3PL pallet ready for distribution"
                            class="pallet-boxes-img"
                          />
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </article>
          }
        </div>

        <!-- 4. Connected 12-Step 3PL Logistics Workflow Section -->
        <section class="explore-workflow-section" id="explore-workflow">
          <div class="workflow-card">
            <div class="workflow-left-intro">
              <div class="workflow-icon-box" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#08122d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <div class="workflow-text">
                <h3 class="workflow-title">Complete 12-Step 3PL Logistics Lifecycle</h3>
                <p class="workflow-desc">Seamless operational connectivity from client onboarding and stock receiving to billing and reporting.</p>
              </div>
            </div>

            <!-- Clickable Workflow Steps Chain -->
            <div class="workflow-steps-chain" role="navigation" aria-label="Connected 3PL workflow steps">
              @for (step of lifecycleSteps; track step.num; let last = $last) {
                <button type="button" class="workflow-step-btn" (click)="selectModuleAndScroll(step.modId)">
                  <span class="step-num">{{ step.num }}</span>
                  <span class="step-title">{{ step.name }}</span>
                </button>
                @if (!last) {
                  <span class="workflow-arrow" aria-hidden="true">→</span>
                }
              }
            </div>
          </div>
        </section>
      </section>
    </div>
  `,
  styles: [`
    .three-pl-hero-section {
      background: #ffffff !important;
      background-image: none !important;
    }
  `]
})
export class ThreePLExploreComponent {
  navigateAbout = output<void>();
  navigateDemo = output<void>();
  navigateHome = output<void>();
  navigatePricing = output<void>();
  navigateWarehouse = output<void>();
  navigateVans = output<void>();

  // Initially expand 3PL Client Management (first module)
  activeModule = signal<string>('clients');

  lifecycleSteps = [
    { num: '01', name: 'Client Onboard', modId: 'clients' },
    { num: '02', name: 'Facility Setup', modId: 'warehouse' },
    { num: '03', name: 'Inbound & ASN', modId: 'inbound' },
    { num: '04', name: 'Client Inventory', modId: 'inventory' },
    { num: '05', name: 'Replenishment', modId: 'replenishment' },
    { num: '06', name: 'Wave Picking', modId: 'fulfilment' },
    { num: '07', name: 'Fleet Dispatch', modId: 'fleet' },
    { num: '08', name: 'Returns & QC', modId: 'returns' },
    { num: '09', name: '3PL Billing', modId: 'billing' },
    { num: '10', name: 'Client Portal', modId: 'portal' },
    { num: '11', name: 'API Sync', modId: 'api' },
    { num: '12', name: 'Analytics', modId: 'analytics' }
  ];

  modules: ThreePLModule[] = [
    {
      id: 'clients',
      shortName: '1. Client Mgmt',
      icon: 'clients',
      heading: '1. 3PL Client Management',
      subtitle: 'Manage multiple logistics clients with dedicated accounts, warehouse assignments and access controls.',
      features: [
        {
          title: 'Client Onboarding',
          desc: 'Quickly register new third-party logistics clients with customized contracts, contacts, and dedicated service tiers.'
        },
        {
          title: 'Client Management',
          desc: 'Centralized operational directory to oversee client profiles, active contracts, service levels, and performance.'
        },
        {
          title: 'Dedicated Accounts',
          desc: 'Segregate financial ledgers, inventory records, and warehouse operations for each independent client.'
        },
        {
          title: 'Client Access Control',
          desc: 'Role-based permissions ensuring client personnel access only their authorized accounts and data.'
        },
        {
          title: 'Credit Management',
          desc: 'Set credit limits, monitor receivables exposure, and configure automated credit-hold thresholds.'
        }
      ],
      benefits: [
        'Multi-tenant client architecture with complete financial and inventory data isolation',
        'Streamlined onboarding with pre-configured client templates and contracts',
        'Granular role-based security preventing cross-client data exposure',
        'Automated credit risk monitoring and proactive receivables alerts'
      ]
    },
    {
      id: 'warehouse',
      shortName: '2. Warehouse',
      icon: 'warehouse',
      heading: '2. Warehouse Management',
      subtitle: 'Organise warehouse spaces, storage locations and operations across multiple facilities.',
      features: [
        {
          title: 'Multi-Warehouse Support',
          desc: 'Manage multiple regional facilities, distribution hubs, and client-dedicated storage centres.'
        },
        {
          title: 'Zone & Bin Management',
          desc: 'Define zones, aisles, racks, shelves, and bin locations with specific physical constraints.'
        },
        {
          title: 'Storage Capacity Tracking',
          desc: 'Monitor volumetric utilization, pallet capacity, and floor occupancy across all facilities.'
        },
        {
          title: 'Location Barcoding',
          desc: 'Generate and scan GS1-standard 2D/1D barcodes for rapid, error-free location validation.'
        },
        {
          title: 'Storage Optimisation',
          desc: 'Algorithmic placement rules grouping high-velocity SKUs near dispatch docks for faster retrieval.'
        }
      ],
      benefits: [
        'Maximize storage density and reduce empty space across every facility',
        'Instant barcode verification eliminating misplacements and lost pallets',
        'Seamless multi-facility coordination from a unified administrative hub',
        'Dynamic slotting optimization reducing travel time for warehouse pickers'
      ]
    },
    {
      id: 'inbound',
      shortName: '3. Inbound',
      icon: 'inbound',
      heading: '3. Inbound Logistics',
      subtitle: 'Manage incoming goods from shipment scheduling to quality inspection and storage.',
      features: [
        {
          title: 'Advance Shipping Notices (ASN)',
          desc: 'Receive electronic ASNs from clients or suppliers to forecast arrival volumes and labor.'
        },
        {
          title: 'Dock Scheduling',
          desc: 'Reserve unloading bays and time slots to prevent dock congestion and demurrage charges.'
        },
        {
          title: 'Goods Receiving',
          desc: 'Streamlined dock receipt with pallet counting, packing slip verification, and mobile scan capture.'
        },
        {
          title: 'Quality Inspection',
          desc: 'Conduct rigorous multi-parameter quality checks, damage reporting, and defect quarantine.'
        },
        {
          title: 'Automated Put-Away',
          desc: 'System-directed put-away recommendations matching pallet dimensions and storage rules.'
        }
      ],
      benefits: [
        'Predictable dock operations eliminating turnaround delays and demurrage',
        'Strict quality compliance isolating damaged shipments before put-away',
        'Automated put-away routing maximizing warehouse floor efficiency',
        'Instant electronic ASN reconciliation with live discrepancy reports'
      ]
    },
    {
      id: 'inventory',
      shortName: '4. Inventory',
      icon: 'inventory',
      heading: '4. Inventory Management',
      subtitle: 'Monitor client inventory with real-time stock visibility and complete movement tracking.',
      features: [
        {
          title: 'Real-Time Stock Tracking',
          desc: 'Live visibility into available, allocated, reserved, and in-transit stock per client.'
        },
        {
          title: 'Batch & Expiry Tracking',
          desc: 'Full FEFO/FIFO tracking with lot numbers, production dates, and strict expiry controls.'
        },
        {
          title: 'Multi-Location Inventory',
          desc: 'Unified view of client inventory distributed across racks, rooms, and multiple hubs.'
        },
        {
          title: 'Stock Adjustments',
          desc: 'Audit-logged manual or cycle-count adjustments with reason codes and approval workflows.'
        },
        {
          title: 'Stock Movement History',
          desc: 'Complete chronological traceability of every pallet, carton, and unit movement.'
        },
        {
          title: 'Stock Verification',
          desc: 'Routine perpetual inventory verification and blind cycle-count discrepancy resolution.'
        }
      ],
      benefits: [
        '100% inventory accuracy preventing stockouts and over-commitments',
        'Complete lot-level audit trails for end-to-end regulatory compliance',
        'Automated FIFO/FEFO picking rules eliminating expired stock write-offs',
        'Transparent client stock reporting building trust and confidence'
      ]
    },
    {
      id: 'replenishment',
      shortName: '5. Replenish',
      icon: 'replenishment',
      heading: '5. Smart Replenishment',
      subtitle: 'Maintain optimal inventory levels with automated reorder planning and stock alerts.',
      features: [
        {
          title: 'Automated Reordering',
          desc: 'Trigger replenishment orders automatically when stock levels breach configured thresholds.'
        },
        {
          title: 'Minimum & Maximum Levels',
          desc: 'Define dynamic Min/Max buffer rules based on seasonal velocity and supplier lead times.'
        },
        {
          title: 'Low Stock Alerts',
          desc: 'Proactive email and dashboard notifications when critical items approach safety stock limits.'
        },
        {
          title: 'Demand-Based Planning',
          desc: 'Predict future inventory needs using historical consumption rates and seasonal spikes.'
        },
        {
          title: 'Warehouse Transfers',
          desc: 'Coordinate inter-facility stock transfers to balance regional client inventory levels.'
        },
        {
          title: 'Pick Face Replenishment',
          desc: 'Automate top-up moves from bulk reserve racking to active pick faces before picking runs.'
        }
      ],
      benefits: [
        'Zero picking interruptions caused by empty forward-pick bins',
        'Intelligent safety stock buffers preventing sudden client stockouts',
        'Balanced inventory across all regional distribution centres',
        'Data-driven demand forecasts optimizing reorder quantities'
      ]
    },
    {
      id: 'fulfilment',
      shortName: '6. Fulfilment',
      icon: 'fulfilment',
      heading: '6. Order Fulfilment',
      subtitle: 'Process customer orders efficiently from stock allocation to picking, packing and dispatch.',
      features: [
        {
          title: 'Order Management',
          desc: 'Centralized intake and status tracking for B2B, wholesale, and D2C multi-channel client orders.'
        },
        {
          title: 'Automatic Stock Allocation',
          desc: 'Intelligent allocation engine reserving stock based on FEFO, proximity, and priority rules.'
        },
        {
          title: 'Wave-Based Picking',
          desc: 'Consolidate multiple orders into optimized picking waves to minimize picker travel distance.'
        },
        {
          title: 'Barcode Scanning',
          desc: 'Mobile handheld verification ensuring 100% pick accuracy for every SKU and quantity.'
        },
        {
          title: 'Packing & Shipping',
          desc: 'Integrated pack-station workflows with weight checks, cartonization, and shipping label generation.'
        },
        {
          title: 'Backorder Management',
          desc: 'Automate backorder queues with instant order release upon stock receipt.'
        }
      ],
      benefits: [
        'Rapid order turnaround times meeting stringent client SLAs',
        '99.9% order pick accuracy with mandatory mobile barcode validation',
        'Reduced travel distance and labor costs via optimized wave picking',
        'Automated multi-carrier shipping labels generated at pack stations'
      ]
    },
    {
      id: 'fleet',
      shortName: '7. Fleet & Delivery',
      icon: 'fleet',
      heading: '7. Fleet & Delivery Management',
      subtitle: 'Coordinate transportation, manage carriers and track deliveries from dispatch to completion.',
      features: [
        {
          title: 'Carrier Management',
          desc: 'Maintain rates, service levels, and operational contracts for third-party freight carriers.'
        },
        {
          title: 'Driver & Vehicle Assignment',
          desc: 'Assign delivery runs, vehicles, and schedules to internal drivers or contract fleets.'
        },
        {
          title: 'Delivery Route Planning',
          desc: 'Generate optimized multi-stop delivery routes to save fuel and ensure timely arrivals.'
        },
        {
          title: 'Multi-Stop Deliveries',
          desc: 'Organize drop-off sequences with time windows, customer instructions, and stop prioritization.'
        },
        {
          title: 'Delivery Tracking',
          desc: 'Real-time GPS dispatch tracking providing milestone updates to both clients and consignees.'
        },
        {
          title: 'Proof of Delivery',
          desc: 'Capture digital signatures, timestamped photos, and geo-coordinates at the point of delivery.'
        }
      ],
      benefits: [
        'Optimized delivery routes cutting fuel consumption and transit time',
        'Real-time shipment visibility reducing customer where-is-my-order inquiries',
        'Irrefutable electronic Proof of Delivery (e-POD) preventing dispute claims',
        'Flexible combination of in-house vehicles and external carrier networks'
      ]
    },
    {
      id: 'returns',
      shortName: '8. Returns',
      icon: 'returns',
      heading: '8. Returns Management',
      subtitle: 'Handle customer returns with structured approval, inspection and inventory updates.',
      features: [
        {
          title: 'Return Authorisation',
          desc: 'Generate and validate Return Merchandise Authorisations (RMA) against original order records.'
        },
        {
          title: 'Order-Based Returns',
          desc: 'Link returned items directly to invoices and orders to verify eligibility and pricing.'
        },
        {
          title: 'Quality Inspection',
          desc: 'Examine returned merchandise against strict physical grading and condition criteria.'
        },
        {
          title: 'Good & Damaged Classification',
          desc: 'Triage goods into resalable stock, repair hold, return-to-vendor, or scrap quarantine.'
        },
        {
          title: 'Return Stock Processing',
          desc: 'System-guided restock into active bins or disposal routing with automated inventory adjustment.'
        },
        {
          title: 'Return Tracking',
          desc: 'Monitor returns turnaround velocity and pinpoint high-return SKUs and root causes.'
        }
      ],
      benefits: [
        'Accelerated return processing putting sellable stock back on the shelf faster',
        'Strict quality triage preventing defective goods from re-entering active inventory',
        'Seamless RMA reconciliation linking returns directly to client billing credits',
        'Root-cause analytics to identify recurring product defect patterns'
      ]
    },
    {
      id: 'billing',
      shortName: '9. 3PL Billing',
      icon: 'billing',
      heading: '9. 3PL Billing & Finance',
      subtitle: 'Automate logistics billing with client-specific pricing, activity charges and payment tracking.',
      features: [
        {
          title: 'Client Rate Cards',
          desc: 'Configure multi-tier pricing contracts for storage, handling, picking, and freight services.'
        },
        {
          title: 'Automated Service Billing',
          desc: 'Capture billable warehouse activities in real time directly from operational events.'
        },
        {
          title: 'Storage & Handling Charges',
          desc: 'Calculate pallet-day storage, bin cubic fees, inbound receiving, and pallet-in/pallet-out fees.'
        },
        {
          title: 'Invoice Generation',
          desc: 'Generate detailed client invoices automatically with complete itemized activity breakdowns.'
        },
        {
          title: 'Payment Management',
          desc: 'Track invoice settlement, partial payments, overdue balances, and automated reminders.'
        },
        {
          title: 'Credit Notes & Disputes',
          desc: 'Streamlined handling of client billing inquiries, adjustments, and approved credit notes.'
        }
      ],
      benefits: [
        'Eliminate revenue leakage by capturing 100% of billable warehouse activities',
        'Transparent, itemized billing reports reducing client payment disputes',
        'Automated periodic billing cycles saving countless accounting hours',
        'Custom rate structures matching unique contract terms for every client'
      ]
    },
    {
      id: 'portal',
      shortName: '10. Client Portal',
      icon: 'portal',
      heading: '10. Customer Self-Service Portal',
      subtitle: 'Give clients complete visibility and control over their warehouse operations through a dedicated portal.',
      features: [
        {
          title: 'Dedicated Client Login',
          desc: 'Secure, branded web portal allowing clients 24/7 access to their logistics data.'
        },
        {
          title: 'Stock Visibility',
          desc: 'Real-time visibility into inventory levels, batch status, reserved quantities, and location counts.'
        },
        {
          title: 'Order Management',
          desc: 'Empower clients to create, review, track, and manage outbound dispatch orders directly.'
        },
        {
          title: 'Inbound Shipment Requests',
          desc: 'Enable clients to submit ASNs, upload packing lists, and schedule inbound deliveries.'
        },
        {
          title: 'Delivery Tracking',
          desc: 'Live shipment milestone tracking with carrier details and electronic Proof of Delivery access.'
        },
        {
          title: 'Returns & Invoice Access',
          desc: 'Self-service submission of RMAs, historical invoice downloads, and statement reviews.'
        }
      ],
      benefits: [
        'Dramatically reduce customer service overhead and manual status inquiries',
        'Provide enterprise-grade transparency that wins and retains logistics clients',
        'Empower clients to self-manage orders and ASNs without email back-and-forth',
        'Immediate access to verified delivery proofs and downloadable tax invoices'
      ]
    },
    {
      id: 'api',
      shortName: '11. API & Connect',
      icon: 'api',
      heading: '11. API & Integrations',
      subtitle: 'Connect client platforms and business systems with secure APIs and automated data synchronisation.',
      features: [
        {
          title: 'Secure API Access',
          desc: 'Modern RESTful endpoints secured with scoped API keys, rate limiting, and SSL encryption.'
        },
        {
          title: 'ERP Integration',
          desc: 'Bi-directional connectors for SAP, Oracle, Microsoft Dynamics, Tally, and custom ERPs.'
        },
        {
          title: 'E-commerce Integration',
          desc: 'Direct sync with Shopify, WooCommerce, Amazon, Magento, and regional marketplaces.'
        },
        {
          title: 'Order Synchronisation',
          desc: 'Instant automated order ingestion eliminating manual data entry and transmission errors.'
        },
        {
          title: 'Stock Data Access',
          desc: 'Real-time stock level synchronization preventing overselling across client sales channels.'
        },
        {
          title: 'Webhook Notifications',
          desc: 'Instant event-driven webhooks for ASN receipts, dispatch confirmations, and delivery completion.'
        }
      ],
      benefits: [
        'Plug-and-play connectivity with leading e-commerce platforms and ERP systems',
        'Eliminate manual data entry errors with real-time automated data exchange',
        'Event-driven webhooks keeping client systems immediately up to date',
        'Enterprise-grade API security with dedicated client tokens and audit logging'
      ]
    },
    {
      id: 'analytics',
      shortName: '12. Analytics',
      icon: 'analytics',
      heading: '12. Analytics & Reporting',
      subtitle: 'Gain operational insights through centralised dashboards and detailed warehouse performance reports.',
      features: [
        {
          title: 'Operations Dashboard',
          desc: 'Real-time visual KPIs for dock throughput, pick rates, order backlog, and dispatch progress.'
        },
        {
          title: 'Inventory Reports',
          desc: 'Detailed valuation summaries, stock turnover velocities, and space utilization metrics.'
        },
        {
          title: 'Warehouse Performance',
          desc: 'Measure employee productivity, wave completion times, and dock turnaround efficiency.'
        },
        {
          title: 'Order & Delivery Reports',
          desc: 'Track on-time dispatch rates, carrier SLA adherence, and delivery completion percentages.'
        },
        {
          title: 'Stock Ageing & Expiry',
          desc: 'Identify slow-moving lots, shelf-life degradation, and upcoming expiry risks in advance.'
        },
        {
          title: 'Billing & Receivables Reports',
          desc: 'Analyze profitability by client, revenue by service category, and outstanding AR aging.'
        }
      ],
      benefits: [
        'Executive dashboards delivering real-time visibility into warehouse productivity',
        'Proactive expiry alerts protecting client stock value from obsolescence',
        'Accurate carrier performance benchmarks ensuring top-tier service delivery',
        'Comprehensive client profitability analytics optimizing contract pricing'
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
