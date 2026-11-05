import { Component, signal, output, ElementRef } from '@angular/core';

export interface ModuleFeature {
  title: string;
  desc: string;
}

export interface ExploreModule {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  heading: string;
  subtitle: string;
  features: ModuleFeature[];
  benefits: string[];
}

@Component({
  selector: 'app-warehouse-explore',
  standalone: true,
  template: `
    <div class="warehouse-explore-page" id="warehouse-explore-top">
      <!-- Hero Section with Real 3D Warehouse Background -->
      <section class="explore-hero-section" id="explore-hero">
        <div class="explore-hero-bg-overlay" aria-hidden="true"></div>
        <div class="explore-hero-shell">
          <div class="explore-hero-copy">
            <div class="explore-pill-tag">
              <span>WAREHOUSE ERP</span>
            </div>
            <h1 class="explore-hero-title">
              Explore the Complete<br />
              <span class="hero-highlight-gold">Warehouse Solution</span>
            </h1>
            <p class="explore-hero-subtitle">
              A unified ERP to manage warehouses, inventory, purchasing, sales, fleet, and business insights — all in one place.
            </p>
          </div>
        </div>

        <!-- 3. Horizontal 9-Module Navigation Bar (Overlapping Hero Bottom) -->
        <div class="explore-tabs-outer" id="explore-modules-nav">
          <div class="explore-tabs-scroll" role="tablist" aria-label="Warehouse modules">
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
                    @case ('warehouse') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 10 12 4l9 6v10H3Z" />
                        <path d="M7 20v-6h10v6M7 10h2m3 0h2m3 0h1" />
                      </svg>
                    }
                    @case ('boxes') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m12 3 8 4-8 4-8-4zM4 7v9l8 5 8-5V7M12 11v10" />
                      </svg>
                    }
                    @case ('cart') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="8" cy="21" r="1"></circle>
                        <circle cx="19" cy="21" r="1"></circle>
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                      </svg>
                    }
                    @case ('order') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
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
                    @case ('swap') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17 2l4 4-4 4" />
                        <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                        <path d="M7 22l-4-4 4-4" />
                        <path d="M21 13v1a4 4 0 0 1-4 4H3" />
                      </svg>
                    }
                    @case ('van') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 7h11v10H3zM14 10h4l3 4v3h-7z" />
                        <circle cx="7" cy="18" r="2" />
                        <circle cx="18" cy="18" r="2" />
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

      <!-- 4. Main Expandable Accordion Sections for All 9 Modules -->
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
                          src="/assets/capability-boxes.png"
                          alt="Warehouse pallet loaded with boxed inventory"
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

        <!-- 5. Connected Warehouse Workflow Section -->
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
                <h3 class="workflow-title">Complete Warehouse Workflow</h3>
                <p class="workflow-desc">See how all modules work together in STOCCOZ.</p>
              </div>
            </div>

            <!-- Clickable Workflow Steps Chain -->
            <div class="workflow-steps-chain" role="navigation" aria-label="Connected warehouse workflow steps">
              <button type="button" class="workflow-step-btn" (click)="selectModuleAndScroll('purchasing')">
                <span class="step-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                  </svg>
                </span>
                <span class="step-title">Purchasing</span>
              </button>

              <span class="workflow-arrow" aria-hidden="true">→</span>

              <button type="button" class="workflow-step-btn" (click)="selectModuleAndScroll('inventory')">
                <span class="step-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m12 3 8 4-8 4-8-4zM4 7v9l8 5 8-5V7M12 11v10"/>
                  </svg>
                </span>
                <span class="step-title">Inventory</span>
              </button>

              <span class="workflow-arrow" aria-hidden="true">→</span>

              <button type="button" class="workflow-step-btn" (click)="selectModuleAndScroll('sales-orders')">
                <span class="step-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </span>
                <span class="step-title">Sales</span>
              </button>

              <span class="workflow-arrow" aria-hidden="true">→</span>

              <button type="button" class="workflow-step-btn" (click)="selectModuleAndScroll('movements')">
                <span class="step-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 2l4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/>
                    <path d="M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>
                  </svg>
                </span>
                <span class="step-title">Stock Movements</span>
              </button>

              <span class="workflow-arrow" aria-hidden="true">→</span>

              <button type="button" class="workflow-step-btn" (click)="selectModuleAndScroll('fleet')">
                <span class="step-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 7h11v10H3zM14 10h4l3 4v3h-7z"/>
                    <circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>
                  </svg>
                </span>
                <span class="step-title">Fleet &amp; Vans</span>
              </button>

              <span class="workflow-arrow" aria-hidden="true">→</span>

              <button type="button" class="workflow-step-btn" (click)="selectModuleAndScroll('reports')">
                <span class="step-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
                  </svg>
                </span>
                <span class="step-title">Reports</span>
              </button>
            </div>
          </div>
        </section>
      </section>
    </div>
  `
})
export class WarehouseExploreComponent {
  navigateAbout = output<void>();
  navigateHome = output<void>();
  navigatePricing = output<void>();

  // Initially expand Warehouse & Location Management (first module)
  activeModule = signal<string>('warehouse');

  constructor(private el: ElementRef) {}

  toggleModule(id: string) {
    this.activeModule.update(cur => (cur === id ? '' : id));
  }

  selectModuleAndScroll(id: string) {
    this.activeModule.set(id);
    setTimeout(() => {
      const el = document.getElementById('module-' + id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }

  scrollToSection(section: 'hero' | 'accordion' | 'workflow') {
    if (section === 'hero') {
      const el = document.getElementById('explore-hero');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'accordion') {
      const el = document.getElementById('explore-accordion-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'workflow') {
      const el = document.getElementById('explore-workflow');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onHomeClick(e: Event) {
    e.preventDefault();
    window.location.hash = '#top';
    this.navigateHome.emit();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onBookDemoClick(e: Event) {
    e.preventDefault();
    window.location.hash = '#about';
    this.navigateAbout.emit();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  modules: ExploreModule[] = [
    {
      id: 'warehouse',
      name: 'Warehouse & Location Management',
      shortName: 'Warehouse & Location',
      icon: 'warehouse',
      heading: 'Warehouse & Location Management',
      subtitle: 'Centralize and streamline your warehouse operations across multiple locations.',
      features: [
        {
          title: 'Multi-Warehouse Management',
          desc: 'Create and manage multiple warehouses from a centralized system.'
        },
        {
          title: 'Warehouse Configuration',
          desc: 'Maintain warehouse names, addresses, contact details, and operational settings.'
        },
        {
          title: 'Warehouse-Wise Inventory',
          desc: 'View available stock and inventory levels separately for each warehouse.'
        },
        {
          title: 'Warehouse Transfers',
          desc: 'Transfer products between warehouses with proper tracking.'
        },
        {
          title: 'Warehouse Stock Overview',
          desc: 'Monitor total stock, available quantities, and stock distribution.'
        }
      ],
      benefits: [
        'Centralized control across all warehouse locations',
        'Accurate and real-time stock visibility',
        'Easy and traceable stock transfers',
        'Better inventory distribution and planning'
      ]
    },
    {
      id: 'inventory',
      name: 'Inventory Management',
      shortName: 'Inventory',
      icon: 'boxes',
      heading: 'Inventory Management',
      subtitle: 'Monitor stock availability, batches, and valuations in real time.',
      features: [
        {
          title: 'Real-Time Stock Tracking',
          desc: 'Monitor stock availability and inventory changes in real time.'
        },
        {
          title: 'Product & Variant Management',
          desc: 'Manage products, categories, units, and product variations.'
        },
        {
          title: 'Batch-Wise Stock Management',
          desc: 'Track inventory based on individual product batches.'
        },
        {
          title: 'Expiry Date Tracking',
          desc: 'Monitor product expiry dates and manage expiring inventory.'
        },
        {
          title: 'Opening Stock Management',
          desc: 'Record initial stock quantities for warehouses.'
        },
        {
          title: 'Stock Adjustments',
          desc: 'Correct inventory discrepancies through stock adjustments.'
        },
        {
          title: 'Low Stock Monitoring',
          desc: 'Identify products that require replenishment.'
        },
        {
          title: 'Stock Valuation',
          desc: 'Monitor the value of available inventory.'
        }
      ],
      benefits: [
        'Zero stock discrepancies with live audit logs',
        'Proactive expiration tracking (FIFO/FEFO)',
        'Automated reorder point alerts',
        'Multi-tier SKU variant and unit precision'
      ]
    },
    {
      id: 'purchasing',
      name: 'Purchasing Management',
      shortName: 'Purchasing',
      icon: 'cart',
      heading: 'Purchasing Management',
      subtitle: 'Streamline procurement workflows and maintain transparent vendor relationships.',
      features: [
        {
          title: 'Purchase Order Management',
          desc: 'Create and manage purchase orders.'
        },
        {
          title: 'Supplier Management',
          desc: 'Maintain supplier information and purchase history.'
        },
        {
          title: 'Purchase Invoice Management',
          desc: 'Generate and manage supplier invoices.'
        },
        {
          title: 'Purchase Returns',
          desc: 'Record and manage returned products.'
        },
        {
          title: 'Purchase Payment Tracking',
          desc: 'Monitor supplier payments and outstanding balances.'
        },
        {
          title: 'Purchase History',
          desc: 'Review previous purchasing transactions.'
        }
      ],
      benefits: [
        '3-way PO matching to avoid billing errors',
        'Consolidated vendor catalogs and price tiers',
        'Real-time supplier payment tracking',
        'Streamlined goods receipt and stock inwarding'
      ]
    },
    {
      id: 'sales-orders',
      name: 'Sales Order Management',
      shortName: 'Sales Orders',
      icon: 'order',
      heading: 'Sales Order Management',
      subtitle: 'Capture, confirm, and fulfill customer orders with end-to-end traceability.',
      features: [
        {
          title: 'Sales Order Creation',
          desc: 'Create orders with customer, product, quantity, and pricing details.'
        },
        {
          title: 'Order Processing',
          desc: 'Track pending, confirmed, and completed orders.'
        },
        {
          title: 'Sales Order Conversion',
          desc: 'Convert sales orders into sales invoices.'
        },
        {
          title: 'Customer Management',
          desc: 'Maintain customer information and transaction history.'
        },
        {
          title: 'Order Fulfilment',
          desc: 'Manage product availability and order fulfilment.'
        }
      ],
      benefits: [
        'Rapid order capture across all channels',
        'Instant stock reservation upon confirmation',
        'One-click order to invoice generation',
        'Complete order milestone tracking'
      ]
    },
    {
      id: 'invoices',
      name: 'Sales & Invoice Management',
      shortName: 'Sales & Invoices',
      icon: 'receipt',
      heading: 'Sales & Invoice Management',
      subtitle: 'Accelerate customer billing, manage tax compliance, and reconcile payments seamlessly.',
      features: [
        {
          title: 'Sales Invoice Creation',
          desc: 'Generate invoices for customer transactions.'
        },
        {
          title: 'Multiple Invoice Types',
          desc: 'Support standard, common/VAN, and sales-order-based invoicing.'
        },
        {
          title: 'VAT & GST Management',
          desc: 'Handle tax calculations based on the configured tax system.'
        },
        {
          title: 'Invoice Number Configuration',
          desc: 'Manage invoice numbering sequences.'
        },
        {
          title: 'Sales Returns',
          desc: 'Manage returned products and corresponding transactions.'
        },
        {
          title: 'Payment Management',
          desc: 'Track cash, bank transfers, and other payment methods.'
        },
        {
          title: 'Invoice PDF & QR Code',
          desc: 'Generate printable invoices with QR code support.'
        }
      ],
      benefits: [
        '100% compliant GST/VAT invoicing with QR codes',
        'Multi-channel billing: counter, van, and credit',
        'Real-time customer outstanding balances',
        'Automated payment receipts and reconciliations'
      ]
    },
    {
      id: 'movements',
      name: 'Stock Movement Management',
      shortName: 'Stock Movements',
      icon: 'swap',
      heading: 'Stock Movement Management',
      subtitle: 'Track inward, outward, and transfer movements with complete audit records.',
      features: [
        {
          title: 'Stock Inward Management',
          desc: 'Record incoming stock from purchases and other stock additions.'
        },
        {
          title: 'Stock Outward Management',
          desc: 'Track stock issued through sales and other operations.'
        },
        {
          title: 'Inter-Warehouse Transfers',
          desc: 'Move products between different warehouses.'
        },
        {
          title: 'Stock Adjustments',
          desc: 'Record stock corrections and discrepancies.'
        },
        {
          title: 'Movement History',
          desc: 'Maintain detailed records of inventory movements.'
        }
      ],
      benefits: [
        'Complete audit trail for every item moved',
        'Inter-warehouse transfer dispatch & receipt sync',
        'Immediate adjustment logging with reason codes',
        'Real-time visibility into transit stock'
      ]
    },
    {
      id: 'fleet',
      name: 'Fleet & Van Management',
      shortName: 'Fleet & Vans',
      icon: 'van',
      heading: 'Fleet & Van Management',
      subtitle: 'Connect distribution routes, mobile van stock, and field sales teams.',
      features: [
        {
          title: 'Fleet Management',
          desc: 'Manage vehicles used for inventory distribution and deliveries.'
        },
        {
          title: 'Van Stock Management',
          desc: 'Track stock assigned to individual vehicles.'
        },
        {
          title: 'Driver Assignment',
          desc: 'Assign drivers to vehicles.'
        },
        {
          title: 'Route Management',
          desc: 'Organize delivery routes and manage route assignments.'
        },
        {
          title: 'Van Stock Transfers',
          desc: 'Transfer stock between warehouses and vans.'
        },
        {
          title: 'Van Sales Management',
          desc: 'Manage sales transactions directly from vans.'
        },
        {
          title: 'Driver & Vehicle Tracking',
          desc: 'Monitor driver assignments and vehicle-related operations.'
        }
      ],
      benefits: [
        'Real-time mobile van inventory visibility',
        'On-the-go cash and invoice collection',
        'Route dispatch optimization and tracking',
        'Instant van-to-warehouse day-end reconciliation'
      ]
    },
    {
      id: 'reports',
      name: 'Reports & Business Insights',
      shortName: 'Reports',
      icon: 'chart',
      heading: 'Reports & Business Insights',
      subtitle: 'Transform operational data into actionable intelligence and strategic business clarity.',
      features: [
        {
          title: 'Inventory Reports',
          desc: 'Analyze available stock, stock valuation, and warehouse-wise inventory.'
        },
        {
          title: 'Sales Reports',
          desc: 'Monitor sales transactions and overall sales performance.'
        },
        {
          title: 'Purchase Reports',
          desc: 'Review purchasing activity and supplier transactions.'
        },
        {
          title: 'Stock Movement Reports',
          desc: 'Analyze inward, outward, and transfer activities.'
        },
        {
          title: 'Van Sales Reports',
          desc: 'Review vehicle-wise and driver-wise sales performance.'
        },
        {
          title: 'Payment Reports',
          desc: 'Track received payments and outstanding balances.'
        },
        {
          title: 'Sales Transaction Reports',
          desc: 'Review detailed sales transaction records.'
        }
      ],
      benefits: [
        'Comprehensive 360° business health dashboard',
        'Deadstock and fast-moving inventory analytics',
        'Route-wise and salesperson profitability reports',
        'Exportable CSV/PDF reports for accounting'
      ]
    },
    {
      id: 'settings',
      name: 'Settings & Configuration',
      shortName: 'Settings',
      icon: 'gear',
      heading: 'Settings & Configuration',
      subtitle: 'Tailor system parameters, tax rates, print templates, and operational policies.',
      features: [
        {
          title: 'General Settings',
          desc: 'Configure system-wide business preferences.'
        },
        {
          title: 'Tax Configuration',
          desc: 'Set up GST or VAT according to business requirements.'
        },
        {
          title: 'Invoice Settings',
          desc: 'Configure invoice numbering and document templates.'
        },
        {
          title: 'Warehouse Settings',
          desc: 'Manage warehouse-specific configurations.'
        },
        {
          title: 'Stock Management Settings',
          desc: 'Enable or disable features such as batch-wise stock management.'
        },
        {
          title: 'Payment Account Settings',
          desc: 'Configure bank accounts and payment methods.'
        }
      ],
      benefits: [
        'Role-based permissions and enterprise security',
        'Flexible multi-tax rules (GST / VAT / State cess)',
        'Customizable invoice numbering sequences',
        'Modular toggle for advanced features (batches, expiry)'
      ]
    }
  ];
}

