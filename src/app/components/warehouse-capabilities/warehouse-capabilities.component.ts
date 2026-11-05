import { Component, signal } from '@angular/core';
import { GeometricGridBackgroundComponent } from '../geometric-grid-background/geometric-grid-background.component';

type CapabilityCardId = 'inventory' | 'purchasing' | 'sales' | 'movements' | 'reports';

@Component({
  selector: 'app-warehouse-capabilities',
  standalone: true,
  imports: [GeometricGridBackgroundComponent],
  template: `
    <section class="capabilities-section section-shell" id="platform" data-reveal>
      <app-geometric-grid-background></app-geometric-grid-background>
      <span class="anchor-target" id="inventory"></span>
      <p class="eyebrow inventory-heading-eyebrow">INVENTORY MANAGEMENT SOFTWARE</p>
      <h2>STOCCOZ <em>Inventory Management</em></h2>
      <p class="section-lead">A complete platform for connected inventory operations.</p>

      <div
        class="capability-grid"
        [class.has-expanded-card]="expandedCard() !== null"
        [class.expanded-inventory]="expandedCard() === 'inventory'"
        [class.expanded-purchasing]="expandedCard() === 'purchasing'"
        [class.expanded-sales]="expandedCard() === 'sales'"
        [class.expanded-movements]="expandedCard() === 'movements'"
        [class.expanded-reports]="expandedCard() === 'reports'"
      >
        <!-- 1. Inventory Management Card -->
        <article
          class="cap-card cap-inventory"
          [class.is-expanded]="expandedCard() === 'inventory'"
          [class.is-compact]="expandedCard() !== null && expandedCard() !== 'inventory'"
          (click)="toggleCard('inventory')"
          role="region"
          aria-label="Inventory management"
        >
          <div class="cap-heading">
            <div>
              <h3>Inventory<br />Management</h3>
              <p>Gain complete control over your inventory with real-time stock visibility, intelligent tracking and seamless warehouse operations.</p>
            </div>
            <button
              type="button"
              class="cap-expand-btn"
              (click)="$event.stopPropagation(); toggleCard('inventory')"
              [attr.aria-expanded]="expandedCard() === 'inventory'"
              [attr.aria-label]="expandedCard() === 'inventory' ? 'Collapse inventory details' : 'Expand inventory management'"
            >
              <span class="btn-icon">{{ expandedCard() === 'inventory' ? '✕' : '↗' }}</span>
            </button>
          </div>

          <!-- DEFAULT / COLLAPSED STATE: 5 Core Capabilities -->
          <div class="inventory-default-content">
            <div class="inventory-quick-caps" aria-label="Core inventory capabilities">
              <span class="inv-quick-tag"><span class="inv-tag-dot"></span>Real-Time Stock Tracking</span>
              <span class="inv-quick-tag"><span class="inv-tag-dot"></span>Multi-Warehouse Management</span>
              <span class="inv-quick-tag"><span class="inv-tag-dot"></span>Batch &amp; Expiry Management</span>
              <span class="inv-quick-tag"><span class="inv-tag-dot"></span>Stock Movement &amp; Adjustments</span>
              <span class="inv-quick-tag"><span class="inv-tag-dot"></span>Low Stock Alerts &amp; Reordering</span>
            </div>
          </div>

          <!-- EXPANDED STATE: Microsoft Dynamics-inspired Interactive Accordion -->
          <div class="inventory-expanded-section">
            <div class="inventory-dynamics-header">
              <span class="dynamics-section-label">Core Capabilities Overview</span>
            </div>

            <div class="inventory-dynamics-accordion" role="tablist">
              <!-- 1. Real-Time Stock Tracking -->
              <div
                class="dynamics-item"
                [class.is-active]="activeInventoryItem() === 'tracking'"
                (click)="$event.stopPropagation(); setActiveInventoryItem('tracking')"
                role="tab"
                [attr.aria-selected]="activeInventoryItem() === 'tracking'"
              >
                <div class="dynamics-header">
                  <div class="dynamics-title-group">
                    <span class="dynamics-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                        <path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
                      </svg>
                    </span>
                    <strong>Real-Time Stock Tracking</strong>
                  </div>
                  <span class="dynamics-badge">Live Sync</span>
                  <span class="dynamics-arrow">{{ activeInventoryItem() === 'tracking' ? '−' : '+' }}</span>
                </div>
                @if (activeInventoryItem() === 'tracking') {
                  <div class="dynamics-body">
                    <p>Monitor inventory levels across multiple warehouses, stores and locations with instant stock updates and complete visibility.</p>
                  </div>
                }
              </div>

              <!-- 2. Multi-Warehouse Management -->
              <div
                class="dynamics-item"
                [class.is-active]="activeInventoryItem() === 'multiwh'"
                (click)="$event.stopPropagation(); setActiveInventoryItem('multiwh')"
                role="tab"
                [attr.aria-selected]="activeInventoryItem() === 'multiwh'"
              >
                <div class="dynamics-header">
                  <div class="dynamics-title-group">
                    <span class="dynamics-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 21h18M3 7l9-4 9 4v14H3V7z"/><path d="M9 21V11h6v10"/>
                      </svg>
                    </span>
                    <strong>Multi-Warehouse Management</strong>
                  </div>
                  <span class="dynamics-badge">Multi-Site</span>
                  <span class="dynamics-arrow">{{ activeInventoryItem() === 'multiwh' ? '−' : '+' }}</span>
                </div>
                @if (activeInventoryItem() === 'multiwh') {
                  <div class="dynamics-body">
                    <p>Manage stock across multiple warehouses with seamless stock transfers, centralized control and accurate inventory records.</p>
                  </div>
                }
              </div>

              <!-- 3. Batch & Expiry Management -->
              <div
                class="dynamics-item"
                [class.is-active]="activeInventoryItem() === 'batch'"
                (click)="$event.stopPropagation(); setActiveInventoryItem('batch')"
                role="tab"
                [attr.aria-selected]="activeInventoryItem() === 'batch'"
              >
                <div class="dynamics-header">
                  <div class="dynamics-title-group">
                    <span class="dynamics-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-4"/>
                      </svg>
                    </span>
                    <strong>Batch &amp; Expiry Management</strong>
                  </div>
                  <span class="dynamics-badge">FIFO / FEFO</span>
                  <span class="dynamics-arrow">{{ activeInventoryItem() === 'batch' ? '−' : '+' }}</span>
                </div>
                @if (activeInventoryItem() === 'batch') {
                  <div class="dynamics-body">
                    <p>Track products by batch number, manufacturing date and expiry date to ensure proper stock rotation and minimize wastage.</p>
                  </div>
                }
              </div>

              <!-- 4. Stock Movement & Adjustments -->
              <div
                class="dynamics-item"
                [class.is-active]="activeInventoryItem() === 'movements'"
                (click)="$event.stopPropagation(); setActiveInventoryItem('movements')"
                role="tab"
                [attr.aria-selected]="activeInventoryItem() === 'movements'"
              >
                <div class="dynamics-header">
                  <div class="dynamics-title-group">
                    <span class="dynamics-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>
                      </svg>
                    </span>
                    <strong>Stock Movement &amp; Adjustments</strong>
                  </div>
                  <span class="dynamics-badge">Full Audit</span>
                  <span class="dynamics-arrow">{{ activeInventoryItem() === 'movements' ? '−' : '+' }}</span>
                </div>
                @if (activeInventoryItem() === 'movements') {
                  <div class="dynamics-body">
                    <p>Record stock additions, reductions, transfers and adjustments with detailed movement history for better inventory control.</p>
                  </div>
                }
              </div>

              <!-- 5. Low Stock Alerts & Reordering -->
              <div
                class="dynamics-item"
                [class.is-active]="activeInventoryItem() === 'reorder'"
                (click)="$event.stopPropagation(); setActiveInventoryItem('reorder')"
                role="tab"
                [attr.aria-selected]="activeInventoryItem() === 'reorder'"
              >
                <div class="dynamics-header">
                  <div class="dynamics-title-group">
                    <span class="dynamics-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                      </svg>
                    </span>
                    <strong>Low Stock Alerts &amp; Reordering</strong>
                  </div>
                  <span class="dynamics-badge">Auto Trigger</span>
                  <span class="dynamics-arrow">{{ activeInventoryItem() === 'reorder' ? '−' : '+' }}</span>
                </div>
                @if (activeInventoryItem() === 'reorder') {
                  <div class="dynamics-body">
                    <p>Identify low-stock products, monitor stock availability and make timely purchasing decisions to prevent stock shortages.</p>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Subtle vertical divider in expanded state -->
          <div class="inventory-v-divider" aria-hidden="true"></div>

          <!-- Existing illustration (100% PRESERVED, UNCHANGED) -->
          <img class="cap-asset inventory-asset" src="/assets/capability-boxes.png" alt="Stacked warehouse boxes" />
        </article>

        <!-- 2. Purchasing Card -->
        <article
          class="cap-card cap-purchasing"
          [class.is-expanded]="expandedCard() === 'purchasing'"
          [class.is-compact]="expandedCard() !== null && expandedCard() !== 'purchasing'"
          (click)="toggleCard('purchasing')"
          role="region"
          aria-label="Purchasing"
        >
          <!-- Left Content (approx 42%) -->
          <div class="purchasing-col-left">
            <div class="cap-heading">
              <div>
                <h3>Purchasing</h3>
                <p>Manage suppliers, purchase orders and incoming stock with ease.</p>
              </div>
            </div>

            <!-- DEFAULT / COLLAPSED STATE: 3 Feature Labels Vertically Aligned -->
            <div class="purchasing-default-content">
              <div class="purchasing-feature-list" aria-label="Core purchasing capabilities">
                <div class="purchasing-feature-pill">
                  <span class="pill-dot"></span>
                  <span class="pill-text">Purchase Order Management</span>
                </div>
                <div class="purchasing-feature-pill">
                  <span class="pill-dot"></span>
                  <span class="pill-text">Supplier &amp; Vendor Management</span>
                </div>
                <div class="purchasing-feature-pill">
                  <span class="pill-dot"></span>
                  <span class="pill-text">Purchase Invoice &amp; Payment Tracking</span>
                </div>
              </div>
            </div>

            <!-- EXPANDED STATE: Interactive Accordion -->
            <div class="purchasing-expanded-section">
              <div class="inventory-dynamics-header">
                <span class="dynamics-section-label">Core Capabilities Overview</span>
              </div>

              <div class="inventory-dynamics-accordion" role="tablist">
                <!-- 1. Purchase Order Management -->
                <div
                  class="dynamics-item"
                  [class.is-active]="activePurchasingItem() === 'po'"
                  (click)="$event.stopPropagation(); setActivePurchasingItem('po')"
                  role="tab"
                  [attr.aria-selected]="activePurchasingItem() === 'po'"
                >
                  <div class="dynamics-header">
                    <div class="dynamics-title-group">
                      <span class="dynamics-icon">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                          <line x1="16" y1="13" x2="8" y2="13"/>
                          <line x1="16" y1="17" x2="8" y2="17"/>
                          <polyline points="10 9 9 9 8 9"/>
                        </svg>
                      </span>
                      <strong>Purchase Order Management</strong>
                    </div>
                    <span class="dynamics-badge">Automated POs</span>
                    <span class="dynamics-arrow">{{ activePurchasingItem() === 'po' ? '−' : '+' }}</span>
                  </div>
                  @if (activePurchasingItem() === 'po') {
                    <div class="dynamics-body">
                      <p>Create, manage, and track purchase orders with streamlined workflows, supplier details, and accurate order tracking.</p>
                    </div>
                  }
                </div>

                <!-- 2. Supplier & Vendor Management -->
                <div
                  class="dynamics-item"
                  [class.is-active]="activePurchasingItem() === 'vendor'"
                  (click)="$event.stopPropagation(); setActivePurchasingItem('vendor')"
                  role="tab"
                  [attr.aria-selected]="activePurchasingItem() === 'vendor'"
                >
                  <div class="dynamics-header">
                    <div class="dynamics-title-group">
                      <span class="dynamics-icon">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      </span>
                      <strong>Supplier &amp; Vendor Management</strong>
                    </div>
                    <span class="dynamics-badge">Vendor Catalog</span>
                    <span class="dynamics-arrow">{{ activePurchasingItem() === 'vendor' ? '−' : '+' }}</span>
                  </div>
                  @if (activePurchasingItem() === 'vendor') {
                    <div class="dynamics-body">
                      <p>Maintain supplier information, manage vendor relationships, and track purchase history for better procurement control.</p>
                    </div>
                  }
                </div>

                <!-- 3. Purchase Invoice & Payment Tracking -->
                <div
                  class="dynamics-item"
                  [class.is-active]="activePurchasingItem() === 'invoice'"
                  (click)="$event.stopPropagation(); setActivePurchasingItem('invoice')"
                  role="tab"
                  [attr.aria-selected]="activePurchasingItem() === 'invoice'"
                >
                  <div class="dynamics-header">
                    <div class="dynamics-title-group">
                      <span class="dynamics-icon">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="2" y="5" width="20" height="14" rx="2"/>
                          <line x1="2" y1="10" x2="22" y2="10"/>
                          <path d="m7 15 2 2 4-4"/>
                        </svg>
                      </span>
                      <strong>Purchase Invoice &amp; Payment Tracking</strong>
                    </div>
                    <span class="dynamics-badge">3-Way Match</span>
                    <span class="dynamics-arrow">{{ activePurchasingItem() === 'invoice' ? '−' : '+' }}</span>
                  </div>
                  @if (activePurchasingItem() === 'invoice') {
                    <div class="dynamics-body">
                      <p>Generate purchase invoices, manage supplier payments, and monitor outstanding balances with accurate financial records.</p>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>

          <!-- Right Content (approx 58%) -->
          <div class="purchasing-col-right">
            <button
              type="button"
              class="cap-expand-btn purchasing-arrow-btn"
              (click)="$event.stopPropagation(); toggleCard('purchasing')"
              [attr.aria-expanded]="expandedCard() === 'purchasing'"
              [attr.aria-label]="expandedCard() === 'purchasing' ? 'Collapse purchasing details' : 'Expand purchasing'"
            >
              <span class="btn-icon">{{ expandedCard() === 'purchasing' ? '✕' : '↗' }}</span>
            </button>

            <div class="purchase-live-stage-embed">
              <iframe
                class="purchase-live-iframe"
                src="/assets/purchase-orders-live.html"
                title="New Purchase Order Live Simulation"
                loading="eager"
                scrolling="no"
              ></iframe>
            </div>
          </div>

          <!-- Subtle vertical divider in expanded state -->
          <div class="purchasing-v-divider" aria-hidden="true"></div>
        </article>

        <!-- 3. Sales Orders Card with 3D Live Simulation -->
        <article
          class="cap-card cap-sales"
          [class.is-expanded]="expandedCard() === 'sales'"
          [class.is-compact]="expandedCard() !== null && expandedCard() !== 'sales'"
          (click)="toggleCard('sales')"
          role="region"
          aria-label="Sales orders"
        >
          <div class="cap-heading">
            <div>
              <h3>Sales orders</h3>
              <p>Create, manage and fulfil customer orders seamlessly.</p>
            </div>
            <button
              type="button"
              class="cap-expand-btn"
              (click)="$event.stopPropagation(); toggleCard('sales')"
              [attr.aria-expanded]="expandedCard() === 'sales'"
              [attr.aria-label]="expandedCard() === 'sales' ? 'Collapse sales orders details' : 'Expand sales orders'"
            >
              <span class="btn-icon">{{ expandedCard() === 'sales' ? '✕' : '↗' }}</span>
            </button>
          </div>

          <!-- DEFAULT / COLLAPSED STATE: 3 Core Capabilities -->
          <div class="sales-default-content">
            <div class="sales-quick-caps" aria-label="Core sales capabilities">
              <span class="inv-quick-tag"><span class="inv-tag-dot"></span>Sales Order Creation</span>
              <span class="inv-quick-tag"><span class="inv-tag-dot"></span>Order Tracking &amp; Management</span>
              <span class="inv-quick-tag"><span class="inv-tag-dot"></span>Sales Order to Invoice Conversion</span>
            </div>
          </div>

          <!-- EXPANDED STATE: Interactive Accordion -->
          <div class="sales-expanded-section">
            <div class="inventory-dynamics-header">
              <span class="dynamics-section-label">Core Capabilities Overview</span>
            </div>

            <div class="inventory-dynamics-accordion" role="tablist">
              <!-- 1. Sales Order Creation -->
              <div
                class="dynamics-item"
                [class.is-active]="activeSalesItem() === 'create'"
                (click)="$event.stopPropagation(); setActiveSalesItem('create')"
                role="tab"
                [attr.aria-selected]="activeSalesItem() === 'create'"
              >
                <div class="dynamics-header">
                  <div class="dynamics-title-group">
                    <span class="dynamics-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                      </svg>
                    </span>
                    <strong>Sales Order Creation</strong>
                  </div>
                  <span class="dynamics-badge">Quick Order</span>
                  <span class="dynamics-arrow">{{ activeSalesItem() === 'create' ? '−' : '+' }}</span>
                </div>
                @if (activeSalesItem() === 'create') {
                  <div class="dynamics-body">
                    <p>Create and manage sales orders efficiently with customer details, product selection, pricing, and order specifications.</p>
                  </div>
                }
              </div>

              <!-- 2. Order Tracking & Management -->
              <div
                class="dynamics-item"
                [class.is-active]="activeSalesItem() === 'tracking'"
                (click)="$event.stopPropagation(); setActiveSalesItem('tracking')"
                role="tab"
                [attr.aria-selected]="activeSalesItem() === 'tracking'"
              >
                <div class="dynamics-header">
                  <div class="dynamics-title-group">
                    <span class="dynamics-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        <path d="m9 12 2 2 4-4"/>
                      </svg>
                    </span>
                    <strong>Order Tracking &amp; Management</strong>
                  </div>
                  <span class="dynamics-badge">Live Status</span>
                  <span class="dynamics-arrow">{{ activeSalesItem() === 'tracking' ? '−' : '+' }}</span>
                </div>
                @if (activeSalesItem() === 'tracking') {
                  <div class="dynamics-body">
                    <p>Monitor order status, track pending and completed orders, and manage the entire sales process from one place.</p>
                  </div>
                }
              </div>

              <!-- 3. Sales Order to Invoice Conversion -->
              <div
                class="dynamics-item"
                [class.is-active]="activeSalesItem() === 'conversion'"
                (click)="$event.stopPropagation(); setActiveSalesItem('conversion')"
                role="tab"
                [attr.aria-selected]="activeSalesItem() === 'conversion'"
              >
                <div class="dynamics-header">
                  <div class="dynamics-title-group">
                    <span class="dynamics-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="12" y1="18" x2="12" y2="12"/>
                        <line x1="9" y1="15" x2="15" y2="15"/>
                      </svg>
                    </span>
                    <strong>Sales Order to Invoice Conversion</strong>
                  </div>
                  <span class="dynamics-badge">1-Click Billing</span>
                  <span class="dynamics-arrow">{{ activeSalesItem() === 'conversion' ? '−' : '+' }}</span>
                </div>
                @if (activeSalesItem() === 'conversion') {
                  <div class="dynamics-body">
                    <p>Convert confirmed sales orders into sales invoices seamlessly, ensuring accurate billing and smooth order processing.</p>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Subtle vertical divider in expanded state -->
          <div class="sales-v-divider" aria-hidden="true"></div>

          <div class="sales-live-stage-embed">
            <iframe
              class="sales-live-iframe"
              src="/assets/sales-orders-live.html"
              title="Sales Orders Live Simulation"
              loading="eager"
              scrolling="no"
            ></iframe>
          </div>
        </article>

        <!-- 4. Stock Movements Card -->
        <article
          class="cap-card cap-movements"
          [class.is-expanded]="expandedCard() === 'movements'"
          [class.is-compact]="expandedCard() !== null && expandedCard() !== 'movements'"
          (click)="toggleCard('movements')"
          role="region"
          aria-label="Stock movements"
        >
          <div class="cap-heading">
            <div>
              <h3>Stock movements</h3>
              <p>Track every movement from receipt to dispatch in real time.</p>
            </div>
            <button
              type="button"
              class="cap-expand-btn"
              (click)="$event.stopPropagation(); toggleCard('movements')"
              [attr.aria-expanded]="expandedCard() === 'movements'"
              [attr.aria-label]="expandedCard() === 'movements' ? 'Collapse stock movements details' : 'Expand stock movements'"
            >
              <span class="btn-icon">{{ expandedCard() === 'movements' ? '✕' : '↗' }}</span>
            </button>
          </div>

          <!-- DEFAULT / COLLAPSED STATE: 2 Core Capabilities -->
          <div class="movements-default-content">
            <div class="movements-quick-caps" aria-label="Core stock movement capabilities">
              <span class="inv-quick-tag"><span class="inv-tag-dot"></span>Stock Transfer Management</span>
              <span class="inv-quick-tag"><span class="inv-tag-dot"></span>Stock Inward &amp; Outward Management</span>
            </div>
          </div>

          <!-- EXPANDED STATE: Interactive Accordion -->
          <div class="movements-expanded-section">
            <div class="inventory-dynamics-header">
              <span class="dynamics-section-label">Core Capabilities Overview</span>
            </div>

            <div class="inventory-dynamics-accordion" role="tablist">
              <!-- 1. Stock Transfer Management -->
              <div
                class="dynamics-item"
                [class.is-active]="activeMovementsItem() === 'transfers'"
                (click)="$event.stopPropagation(); setActiveMovementsItem('transfers')"
                role="tab"
                [attr.aria-selected]="activeMovementsItem() === 'transfers'"
              >
                <div class="dynamics-header">
                  <div class="dynamics-title-group">
                    <span class="dynamics-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17 2l4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>
                      </svg>
                    </span>
                    <strong>Stock Transfer Management</strong>
                  </div>
                  <span class="dynamics-badge">Multi-Node Sync</span>
                  <span class="dynamics-arrow">{{ activeMovementsItem() === 'transfers' ? '−' : '+' }}</span>
                </div>
                @if (activeMovementsItem() === 'transfers') {
                  <div class="dynamics-body">
                    <p>Manage stock transfers between warehouses, stores, and vans while tracking every movement in real time with complete visibility.</p>
                  </div>
                }
              </div>

              <!-- 2. Stock Inward & Outward Management -->
              <div
                class="dynamics-item"
                [class.is-active]="activeMovementsItem() === 'inout'"
                (click)="$event.stopPropagation(); setActiveMovementsItem('inout')"
                role="tab"
                [attr.aria-selected]="activeMovementsItem() === 'inout'"
              >
                <div class="dynamics-header">
                  <div class="dynamics-title-group">
                    <span class="dynamics-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                        <path d="M12 12v10"/><path d="m16 7-4-4-4 4"/><path d="m8 17 4 4 4-4"/>
                      </svg>
                    </span>
                    <strong>Stock Inward &amp; Outward Management</strong>
                  </div>
                  <span class="dynamics-badge">Full Audit</span>
                  <span class="dynamics-arrow">{{ activeMovementsItem() === 'inout' ? '−' : '+' }}</span>
                </div>
                @if (activeMovementsItem() === 'inout') {
                  <div class="dynamics-body">
                    <p>Record and monitor all stock additions, sales, returns, and adjustments with detailed movement history and accurate inventory records.</p>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Subtle vertical divider in expanded state -->
          <div class="movements-v-divider" aria-hidden="true"></div>

          <img class="cap-asset movement-asset" src="/assets/capability-pallet.png" alt="Yellow pallet truck carrying boxes" />
        </article>

        <!-- 5. Reports & Insights Card -->
        <article
          class="cap-card cap-reports"
          [class.is-expanded]="expandedCard() === 'reports'"
          [class.is-compact]="expandedCard() !== null && expandedCard() !== 'reports'"
          (click)="toggleCard('reports')"
          role="region"
          aria-label="Reports & insights"
        >
          <div class="cap-heading">
            <div>
              <h3>Reports &amp; insights</h3>
              <p>Get real-time insights with powerful reports and analytics.</p>
            </div>
            <button
              type="button"
              class="cap-expand-btn"
              (click)="$event.stopPropagation(); toggleCard('reports')"
              [attr.aria-expanded]="expandedCard() === 'reports'"
              [attr.aria-label]="expandedCard() === 'reports' ? 'Collapse reports and insights details' : 'Expand reports and insights'"
            >
              <span class="btn-icon">{{ expandedCard() === 'reports' ? '✕' : '↗' }}</span>
            </button>
          </div>

          <!-- DEFAULT / COLLAPSED STATE: 2 Core Capabilities -->
          <div class="reports-default-content">
            <div class="reports-quick-caps" aria-label="Core reports and insights capabilities">
              <span class="inv-quick-tag"><span class="inv-tag-dot"></span>Comprehensive Business Reports</span>
              <span class="inv-quick-tag"><span class="inv-tag-dot"></span>Real-Time Analytics &amp; Insights</span>
            </div>
          </div>

          <!-- EXPANDED STATE: Interactive Accordion -->
          <div class="reports-expanded-section">
            <div class="inventory-dynamics-header">
              <span class="dynamics-section-label">Core Capabilities Overview</span>
            </div>

            <div class="inventory-dynamics-accordion" role="tablist">
              <!-- 1. Comprehensive Business Reports -->
              <div
                class="dynamics-item"
                [class.is-active]="activeReportsItem() === 'reports'"
                (click)="$event.stopPropagation(); setActiveReportsItem('reports')"
                role="tab"
                [attr.aria-selected]="activeReportsItem() === 'reports'"
              >
                <div class="dynamics-header">
                  <div class="dynamics-title-group">
                    <span class="dynamics-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </span>
                    <strong>Comprehensive Business Reports</strong>
                  </div>
                  <span class="dynamics-badge">Full Visibility</span>
                  <span class="dynamics-arrow">{{ activeReportsItem() === 'reports' ? '−' : '+' }}</span>
                </div>
                @if (activeReportsItem() === 'reports') {
                  <div class="dynamics-body">
                    <p>Generate detailed reports on sales, purchases, inventory, payments, and financial performance to gain complete business visibility.</p>
                  </div>
                }
              </div>

              <!-- 2. Real-Time Analytics & Insights -->
              <div
                class="dynamics-item"
                [class.is-active]="activeReportsItem() === 'analytics'"
                (click)="$event.stopPropagation(); setActiveReportsItem('analytics')"
                role="tab"
                [attr.aria-selected]="activeReportsItem() === 'analytics'"
              >
                <div class="dynamics-header">
                  <div class="dynamics-title-group">
                    <span class="dynamics-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 3v18h18" />
                        <path d="m19 9-5 5-4-4-3 3" />
                      </svg>
                    </span>
                    <strong>Real-Time Analytics &amp; Insights</strong>
                  </div>
                  <span class="dynamics-badge">Live Analytics</span>
                  <span class="dynamics-arrow">{{ activeReportsItem() === 'analytics' ? '−' : '+' }}</span>
                </div>
                @if (activeReportsItem() === 'analytics') {
                  <div class="dynamics-body">
                    <p>Monitor key business metrics, track performance trends, and make data-driven decisions with clear insights and customizable dashboards.</p>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Subtle vertical divider in expanded state -->
          <div class="reports-v-divider" aria-hidden="true"></div>

          <div class="reports-preview-art" aria-hidden="true">
            <div class="chart-bars-art">
              <span style="height: 48%;"></span>
              <span style="height: 72%;"></span>
              <span style="height: 100%;"></span>
              <span style="height: 64%;"></span>
            </div>
            <div class="chart-donut-art"></div>
          </div>
        </article>
      </div>

      <!-- Outside Spread Section: Sales Order Management Accordion -->
      @if (expandedCard() === 'sales') {
        <div class="sales-outside-showcase" id="sales-expanded-section" aria-label="Sales Order Management Details">
          <div class="sales-showcase-header">
            <div class="sales-showcase-header-left">
              <span class="sales-showcase-kicker">07 Features</span>
              <h3 class="sales-showcase-title">Sales Order Management</h3>
              <p class="sales-showcase-subtitle">Complete Control Over Every Customer Order</p>
              <p class="sales-showcase-lead">
                Create, manage and track customer orders seamlessly — from order creation to final delivery.
              </p>
            </div>
            <div class="sales-showcase-header-right">
              <span class="sales-showcase-hint">Click each heading to explore the functionality</span>
              <button
                type="button"
                class="sales-showcase-close"
                (click)="toggleCard('sales')"
                aria-label="Close sales order section"
              >
                Close section ✕
              </button>
            </div>
          </div>

          <div class="sales-accordion" role="tablist">
            @for (feat of salesFeatures; track feat.num; let idx = $index) {
              <div class="sales-acc-item" [class.is-open]="openSalesAccordion() === idx">
                <button
                  type="button"
                  class="sales-acc-trigger"
                  (click)="toggleSalesAccordion(idx)"
                  [attr.aria-expanded]="openSalesAccordion() === idx"
                >
                  <span class="sales-acc-title">
                    <span class="sales-acc-num">{{ feat.num }}.</span> {{ feat.title }}
                  </span>
                  <span class="sales-acc-chevron" [class.is-rotated]="openSalesAccordion() === idx" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>

                @if (openSalesAccordion() === idx) {
                  <div class="sales-acc-body">
                    <p class="sales-acc-desc">{{ feat.desc }}</p>
                    <ul class="sales-acc-bullets">
                      @for (pt of feat.points; track pt) {
                        <li>
                          <span class="bullet-dash">—</span>
                          <span>{{ pt }}</span>
                        </li>
                      }
                    </ul>
                    <a href="#contact" class="sales-acc-action-link">
                      Explore sales order workflow <span>→</span>
                    </a>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      }
    </section>
  `
})
export class WarehouseCapabilitiesComponent {
  expandedCard = signal<CapabilityCardId | null>(null);
  activeInventoryItem = signal<string>('tracking');

  setActiveInventoryItem(id: string) {
    this.activeInventoryItem.update(cur => (cur === id ? '' : id));
  }

  activePurchasingItem = signal<string>('po');

  setActivePurchasingItem(id: string) {
    this.activePurchasingItem.update(cur => (cur === id ? '' : id));
  }

  activeSalesItem = signal<string>('create');

  setActiveSalesItem(id: string) {
    this.activeSalesItem.update(cur => (cur === id ? '' : id));
  }

  activeMovementsItem = signal<string>('transfers');

  setActiveMovementsItem(id: string) {
    this.activeMovementsItem.update(cur => (cur === id ? '' : id));
  }

  activeReportsItem = signal<string>('reports');

  setActiveReportsItem(id: string) {
    this.activeReportsItem.update(cur => (cur === id ? '' : id));
  }
  openSalesAccordion = signal<number | null>(0);

  salesFeatures = [
    {
      num: '01',
      title: 'Sales Order Creation',
      desc: 'Create accurate customer orders with flexible product selection and automated calculations.',
      points: [
        'Quick customer selection and registration',
        'Add multiple products and variants',
        'Quantity and pricing management',
        'Discounts and tax calculations (GST/VAT)',
        'Delivery address and payment terms',
        'Automatic order total calculation',
      ],
    },
    {
      num: '02',
      title: 'Customer Management',
      desc: 'Manage customer information and maintain a complete history of business transactions.',
      points: [
        'Centralized customer information',
        'Customer contact and billing details',
        'Multiple delivery addresses',
        'Customer-specific pricing',
        'Previous order history',
        'Outstanding order tracking',
      ],
    },
    {
      num: '03',
      title: 'Stock Allocation & Availability',
      desc: 'Connect sales orders directly with warehouse inventory for accurate stock management.',
      points: [
        'Real-time stock availability',
        'Product and warehouse-level stock checks',
        'Stock reservation for confirmed orders',
        'Available and reserved quantity tracking',
        'Low-stock identification',
        'Prevent accidental overselling',
      ],
    },
    {
      num: '04',
      title: 'Order Tracking & Status',
      desc: 'Monitor every order throughout its lifecycle with clear status visibility.',
      points: [
        'Draft and pending orders',
        'Confirmed orders',
        'Processing orders',
        'Partially delivered orders',
        'Completed and cancelled orders',
        'Complete order activity history',
      ],
    },
    {
      num: '05',
      title: 'Sales Invoice Conversion',
      desc: 'Convert confirmed sales orders into invoices without repeatedly entering transaction details.',
      points: [
        'One-click sales order to invoice conversion',
        'Automatic customer and product information transfer',
        'Quantity and pricing synchronization',
        'Automatic GST/VAT calculation',
        'Backend-generated invoice numbering',
        'Linked sales order and invoice history',
      ],
    },
    {
      num: '06',
      title: 'Delivery & Dispatch Management',
      desc: 'Manage order fulfillment and coordinate warehouse dispatch operations.',
      points: [
        'Warehouse-based order fulfillment',
        'Product picking and dispatch preparation',
        'Partial delivery management',
        'Vehicle and van assignment',
        'Dispatched quantity tracking',
        'Delivery completion status',
      ],
    },
    {
      num: '07',
      title: 'Order History & Reporting',
      desc: 'Access complete order records and gain visibility into sales operations.',
      points: [
        'Search by order number and customer',
        'Date-wise order filtering',
        'Order value and quantity summaries',
        'Customer purchase history',
        'Order modification history',
        'Sales order reports and exports',
      ],
    },
  ];

  toggleCard(id: CapabilityCardId) {
    this.expandedCard.update(current => (current === id ? null : id));
  }

  toggleSalesAccordion(index: number) {
    this.openSalesAccordion.update(cur => (cur === index ? null : index));
  }
}
