import { Component, signal, output } from '@angular/core';

export interface ThreePLFeature {
  title: string;
  desc: string;
}

export interface ThreePLMockScreen {
  url: string;
  crumb: string[];
  title: string;
  tabs?: string[];
  activeTab?: number;
  filters?: string[];
  actions?: string[];
  cols: string[];
  rows: string[][];
  kpis?: [string, string][];
  dialog?: {
    title: string;
    fields?: [string, string][];
    cols?: string[];
    rows?: string[][];
    buttons: string[];
  };
  extra?: string;
}

export interface ThreePLModule {
  id: string;
  shortName: string;
  icon: string;
  heading: string;
  subtitle: string;
  features: ThreePLFeature[];
  benefits: string[];
  statusChain?: { label: string; type?: 'ok' | 'warn' | 'info' | 'bad' | 'default' }[];
  routeTag?: string;
  mockScreen?: ThreePLMockScreen;
}

@Component({
  selector: 'app-three-pl-explore',
  standalone: true,
  template: `
    <div class="warehouse-explore-page three-pl-explore-page" id="three-pl-explore-top">
      <!-- 1. Hero Section with Logistics & 3PL Background (Matches Image 2 UI Header) -->
      <section
        class="explore-hero-section three-pl-hero-section"
        id="explore-hero"
        style="background: #ffffff url('/assets/three-pl-distribution-center.jpg') no-repeat right bottom / cover !important;"
      >
        <div class="explore-hero-bg-overlay" aria-hidden="true"></div>
        <div class="explore-hero-shell">
          <div class="explore-hero-copy">
            <h1 class="explore-hero-title">
              Explore the Complete<br />
              Third-Party Logistics<br />
              (3PL) Solution
            </h1>
            <p class="explore-hero-subtitle">
              From multi-client onboarding and dock receiving to segregated WMS inventory, wave fulfillment, delivery fleet costing, automated rate-card
            </p>
          </div>
        </div>

        <!-- 2. Horizontal Scroll Module Tabs Bar -->
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
                    @case ('setup') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    }
                    @case ('inbound') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 10h18M3 14h18M3 6h18M3 18h18"/><path d="m14 2 4 4-4 4"/>
                      </svg>
                    }
                    @case ('receiving') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
                      </svg>
                    }
                    @case ('returns') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
                      </svg>
                    }
                    @case ('inventory') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m12 3 8 4-8 4-8-4zM4 7v9l8 5 8-5V7M12 11v10"/>
                      </svg>
                    }
                    @case ('replen') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/>
                      </svg>
                    }
                    @case ('pickfaces') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                      </svg>
                    }
                    @case ('orders') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                      </svg>
                    }
                    @case ('shipping') {
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 7h11v10H3zM14 10h4l3 4v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>
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

      <!-- 3. Main Expandable Accordions for All 11 Modules -->
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
                  <div class="title-with-route">
                    <h2 class="module-title">{{ mod.heading }}</h2>
                    @if (mod.routeTag) {
                      <span class="route-tag-pill">{{ mod.routeTag }}</span>
                    }
                  </div>
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

              <!-- Accordion Body (Expanded Content with Apple iOS-Inspired Smooth Grid Animation) -->
              <div
                class="explore-accordion-collapse"
                [class.is-open]="activeModule() === mod.id"
                [attr.aria-hidden]="activeModule() !== mod.id"
              >
                <div class="explore-accordion-collapse-inner">
                  <div class="explore-accordion-body">
                    <!-- Left Side: 2-Column Responsive Features Grid + Status Chain -->
                  <div class="explore-features-col">
                    @if (mod.statusChain && mod.statusChain.length > 0) {
                      <div class="status-chain-banner">
                        <span class="chain-label">LIFECYCLE STATUSES:</span>
                        <div class="chain-pills">
                          @for (step of mod.statusChain; track step.label; let last = $last) {
                            <span class="status-step-pill" [class]="'pill-' + (step.type || 'default')">{{ step.label }}</span>
                            @if (!last) {
                              <span class="chain-arr">→</span>
                            }
                          }
                        </div>
                      </div>
                    }

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

                    <!-- Screen Mock-Up Toggle & View -->
                    @if (mod.mockScreen) {
                      <div class="mockup-container">
                        <div class="mockup-header-bar">
                          <span class="mockup-tag">LIVE SCREEN SYSTEM MOCK-UP</span>
                          <span class="mockup-url">stoccoz.app{{ mod.mockScreen.url }}</span>
                        </div>

                        <div class="mockup-window">
                          <div class="chrome-bar">
                            <span class="chrome-dot red"></span>
                            <span class="chrome-dot yellow"></span>
                            <span class="chrome-dot green"></span>
                            <div class="chrome-address">{{ mod.mockScreen.url }}</div>
                          </div>

                          <div class="mockup-content">
                            <!-- Breadcrumb & Title -->
                            <div class="mockup-crumb-row">
                              <div>
                                <span class="mockup-page-title">{{ mod.mockScreen.title }}</span>
                                <span class="mockup-crumb-path">Dashboard › {{ mod.mockScreen.crumb.join(' › ') }}</span>
                              </div>
                              @if (mod.mockScreen.actions && mod.mockScreen.actions.length > 0) {
                                <div class="mockup-actions">
                                  @for (act of mod.mockScreen.actions; track act; let isLast = $last) {
                                    <span class="mockup-btn" [class.primary]="isLast">{{ act }}</span>
                                  }
                                </div>
                              }
                            </div>

                            <!-- Tabs if present -->
                            @if (mod.mockScreen.tabs) {
                              <div class="mockup-tab-strip">
                                @for (tab of mod.mockScreen.tabs; track tab; let tidx = $index) {
                                  <span class="mockup-tab" [class.active]="tidx === (mod.mockScreen.activeTab || 0)">{{ tab }}</span>
                                }
                              </div>
                            }

                            <!-- KPIs if present -->
                            @if (mod.mockScreen.kpis) {
                              <div class="mockup-kpis-grid">
                                @for (kpi of mod.mockScreen.kpis; track kpi[0]) {
                                  <div class="mockup-kpi-card">
                                    <span class="kpi-label">{{ kpi[0] }}</span>
                                    <span class="kpi-value">{{ kpi[1] }}</span>
                                  </div>
                                }
                              </div>
                            }

                            <!-- Data Table -->
                            <div class="mockup-table-wrap">
                              <table class="mockup-table">
                                <thead>
                                  <tr>
                                    @for (col of mod.mockScreen.cols; track col) {
                                      <th>{{ col }}</th>
                                    }
                                  </tr>
                                </thead>
                                <tbody>
                                  @for (row of mod.mockScreen.rows; track $index) {
                                    <tr>
                                      @for (cell of row; track $index) {
                                        <td>
                                          @if (isPill(cell)) {
                                            <span [class]="getPillClass(cell)">{{ getPillText(cell) }}</span>
                                          } @else if (isActionBtn(cell)) {
                                            <span class="mockup-row-btn">{{ getActionBtnText(cell) }}</span>
                                          } @else if (isNum(cell)) {
                                            <span class="cell-num">{{ getNumText(cell) }}</span>
                                          } @else {
                                            {{ cell }}
                                          }
                                        </td>
                                      }
                                    </tr>
                                  }
                                </tbody>
                              </table>
                            </div>

                            <!-- Dialog Preview if present -->
                            @if (mod.mockScreen.dialog) {
                              <div class="mockup-dialog-box">
                                <div class="dialog-header">
                                  <span>{{ mod.mockScreen.dialog.title }}</span>
                                  <span class="dialog-close">✕</span>
                                </div>
                                @if (mod.mockScreen.dialog.fields) {
                                  <div class="dialog-fields-grid">
                                    @for (field of mod.mockScreen.dialog.fields; track field[0]) {
                                      <div class="dialog-field">
                                        <label>{{ field[0] }}</label>
                                        <div class="dialog-field-val">{{ field[1] }}</div>
                                      </div>
                                    }
                                  </div>
                                }
                                @if (mod.mockScreen.dialog.cols && mod.mockScreen.dialog.rows) {
                                  <div class="mockup-table-wrap dialog-table">
                                    <table class="mockup-table">
                                      <thead>
                                        <tr>
                                          @for (col of mod.mockScreen.dialog.cols; track col) {
                                            <th>{{ col }}</th>
                                          }
                                        </tr>
                                      </thead>
                                      <tbody>
                                        @for (row of mod.mockScreen.dialog.rows; track $index) {
                                          <tr>
                                            @for (cell of row; track $index) {
                                              <td>
                                                @if (isNum(cell)) {
                                                  <span class="cell-num">{{ getNumText(cell) }}</span>
                                                } @else {
                                                  {{ cell }}
                                                }
                                              </td>
                                            }
                                          </tr>
                                        }
                                      </tbody>
                                    </table>
                                  </div>
                                }
                                <div class="dialog-footer">
                                  @for (btn of mod.mockScreen.dialog.buttons; track btn; let lastBtn = $last) {
                                    <span class="mockup-btn" [class.primary]="lastBtn">{{ btn }}</span>
                                  }
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Right Side: Key Benefits Card ("Why It Matters?") -->
                  <aside class="explore-benefits-col" aria-label="3PL module key benefits">
                    <div class="benefits-card">
                      <div class="benefits-card-header">
                        <span class="benefits-tag">KEY 3PL BENEFITS</span>
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
                          alt="Stacked boxes on pallet"
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

        <!-- 4. Connected 12-Step End-to-End 3PL Workflow Section -->
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
                <p class="workflow-desc">Click any step to view how data flows seamlessly from client setup to billing.</p>
              </div>
            </div>

            <!-- Clickable Workflow Steps Chain -->
            <div class="workflow-steps-chain" role="navigation" aria-label="Connected 3PL logistics workflow">
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

        <!-- 5. Interactive Reference Data Matrices (Statuses & Charge Types) -->
        <section class="three-pl-reference-section" id="explore-reference">
          <div class="reference-tabs-card">
            <div class="ref-header">
              <h3 class="ref-title">3PL Reference Specifications &amp; Billing Triggers</h3>
              <div class="ref-tabs">
                <button
                  type="button"
                  class="ref-tab-btn"
                  [class.is-active]="activeRefTab() === 'statuses'"
                  (click)="activeRefTab.set('statuses')"
                >System Statuses</button>
                <button
                  type="button"
                  class="ref-tab-btn"
                  [class.is-active]="activeRefTab() === 'charges'"
                  (click)="activeRefTab.set('charges')"
                >13 Billable Charge Types</button>
                <button
                  type="button"
                  class="ref-tab-btn"
                  [class.is-active]="activeRefTab() === 'api'"
                  (click)="activeRefTab.set('api')"
                >Client API &amp; Webhooks</button>
              </div>
            </div>

            <!-- Tab 1: All Statuses Matrix -->
            @if (activeRefTab() === 'statuses') {
              <div class="ref-table-wrap">
                <table class="ref-table">
                  <thead>
                    <tr>
                      <th>Document Type</th>
                      <th>Allowed Status Lifecycle</th>
                      <th>Operational Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (st of statusList; track st.doc) {
                      <tr>
                        <td><code>{{ st.doc }}</code></td>
                        <td>
                          <div class="chain-pills">
                            @for (pill of st.statuses; track pill) {
                              <span class="status-step-pill pill-default">{{ pill }}</span>
                            }
                          </div>
                        </td>
                        <td class="ref-desc">{{ st.desc }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }

            <!-- Tab 2: All 13 Charge Types -->
            @if (activeRefTab() === 'charges') {
              <div class="ref-table-wrap">
                <table class="ref-table">
                  <thead>
                    <tr>
                      <th>Charge Code</th>
                      <th>Captured From Action</th>
                      <th>Billing Unit</th>
                      <th>Automated Pricing Mechanism</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (ch of chargesList; track ch.code) {
                      <tr>
                        <td><code>{{ ch.code }}</code></td>
                        <td><span class="capture-badge">{{ ch.source }}</span></td>
                        <td><strong>{{ ch.unit }}</strong></td>
                        <td class="ref-desc">{{ ch.pricing }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }

            <!-- Tab 3: Client API & Webhook Specifications -->
            @if (activeRefTab() === 'api') {
              <div class="ref-api-wrap">
                <div class="api-meta-cards">
                  <div class="api-card">
                    <h4>REST API Endpoint</h4>
                    <code>POST /api/v1/3pl/[orders|asns|stock|shipments]</code>
                    <p>Authenticated with <code>X-Api-Key: sk_live_...</code> header. Scoped per client credentials.</p>
                  </div>
                  <div class="api-card">
                    <h4>Webhook Cryptographic Signature</h4>
                    <code>X-Stoccoz-Signature: t=1730000000,v1=sha256_hmac</code>
                    <p>Clients verify payloads using HMAC-SHA256 signature with automated 8-stage exponential retries.</p>
                  </div>
                </div>

                <table class="ref-table" style="margin-top: 16px;">
                  <thead>
                    <tr>
                      <th>Webhook Event</th>
                      <th>Dispatch Trigger</th>
                      <th>Key Payload Fields</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><code>asn.received</code></td><td>Warehouse posts goods receipt on dock</td><td>asn_id, client_code, good_qty, damaged_qty, timestamp</td></tr>
                    <tr><td><code>order.shipped</code></td><td>Shipment is dispatched from loading bay</td><td>order_id, tracking_number, carrier_name, packages_count</td></tr>
                    <tr><td><code>order.cancelled</code></td><td>Order cancelled before dispatch</td><td>order_id, reason, released_stock_units</td></tr>
                    <tr><td><code>shipment.delivered</code></td><td>Driver marks stop Delivered with e-POD</td><td>stop_id, recipient_name, timestamp, proof_notes</td></tr>
                    <tr><td><code>shipment.delivery_failed</code></td><td>Driver marks stop Failed with reason</td><td>stop_id, failure_reason, reschedule_suggested</td></tr>
                    <tr><td><code>return.received</code></td><td>Customer return received and triaged</td><td>rma_id, good_restocked, damaged_units, quarantine_held</td></tr>
                  </tbody>
                </table>
              </div>
            }
          </div>
        </section>
      </section>
    </div>
  `,
  styles: [`
    .three-pl-hero-section {
      background: #08122d url('/assets/final-cta-warehouse.jpg') no-repeat center center !important;
      background-size: cover !important;
    }
    .title-with-route {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .route-tag-pill {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      background: #f1f5f9;
      color: #475569;
      padding: 2px 8px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    }
    .status-chain-banner {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 8px 12px;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .chain-label {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: #64748b;
    }
    .chain-pills {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }
    .chain-arr {
      color: #94a3b8;
      font-size: 11px;
      font-weight: bold;
    }
    .status-step-pill {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 999px;
      white-space: nowrap;
    }
    .pill-ok { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
    .pill-warn { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
    .pill-info { background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; }
    .pill-bad { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }
    .pill-default { background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; }

    /* Mockup Screen Visuals */
    .mockup-container {
      margin-top: 20px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 14px rgba(8, 18, 45, 0.03);
    }
    .mockup-header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 12px;
      background: #edf2f7;
      border-bottom: 1px solid #e2e8f0;
    }
    .mockup-tag {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: #08122d;
    }
    .mockup-url {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      color: #64748b;
    }
    .mockup-window {
      background: #ffffff;
    }
    .chrome-bar {
      background: #f1f5f9;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-bottom: 1px solid #e2e8f0;
    }
    .chrome-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    .chrome-dot.red { background: #ef4444; }
    .chrome-dot.yellow { background: #f59e0b; }
    .chrome-dot.green { background: #10b981; }
    .chrome-address {
      flex: 1;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 1px 10px;
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      color: #64748b;
      margin-left: 8px;
    }
    .mockup-content {
      padding: 14px;
    }
    .mockup-crumb-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      gap: 12px;
      flex-wrap: wrap;
    }
    .mockup-page-title {
      font-weight: 800;
      font-size: 15px;
      color: #08122d;
      margin-right: 12px;
    }
    .mockup-crumb-path {
      font-size: 11.5px;
      color: #64748b;
    }
    .mockup-actions {
      display: flex;
      gap: 6px;
    }
    .mockup-btn {
      font-size: 11.5px;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 4px;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      color: #334155;
      cursor: pointer;
    }
    .mockup-btn.primary {
      background: #08122d;
      color: #ffffff;
      border-color: #08122d;
    }
    .mockup-tab-strip {
      display: flex;
      gap: 4px;
      border-bottom: 1px solid #e2e8f0;
      margin-bottom: 12px;
    }
    .mockup-tab {
      padding: 4px 10px;
      font-size: 11.5px;
      font-weight: 600;
      color: #64748b;
      border-bottom: 2px solid transparent;
      cursor: pointer;
    }
    .mockup-tab.active {
      color: #08122d;
      border-bottom-color: #ffc400;
    }
    .mockup-kpis-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
      gap: 8px;
      margin-bottom: 12px;
    }
    .mockup-kpi-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 6px 10px;
    }
    .kpi-label {
      display: block;
      font-size: 10.5px;
      color: #64748b;
    }
    .kpi-value {
      display: block;
      font-size: 15px;
      font-weight: 800;
      color: #08122d;
    }
    .mockup-table-wrap {
      overflow-x: auto;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
    }
    .mockup-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11.5px;
    }
    .mockup-table th {
      background: #f8fafc;
      text-align: left;
      padding: 6px 10px;
      color: #475569;
      font-weight: 700;
      border-bottom: 1px solid #e2e8f0;
      white-space: nowrap;
    }
    .mockup-table td {
      padding: 6px 10px;
      border-bottom: 1px solid #f1f5f9;
      color: #1e293b;
      white-space: nowrap;
    }
    .cell-num {
      font-family: 'DM Mono', monospace;
      font-weight: 600;
    }
    .mockup-row-btn {
      font-size: 10.5px;
      background: #e2e8f0;
      padding: 2px 6px;
      border-radius: 3px;
      color: #1e293b;
      font-weight: 600;
    }

    /* Dialog Box */
    .mockup-dialog-box {
      margin-top: 14px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.06);
    }
    .dialog-header {
      display: flex;
      justify-content: space-between;
      font-weight: 800;
      font-size: 13px;
      color: #08122d;
      margin-bottom: 10px;
    }
    .dialog-fields-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 8px;
      margin-bottom: 10px;
    }
    .dialog-field label {
      display: block;
      font-size: 10px;
      color: #64748b;
      margin-bottom: 2px;
    }
    .dialog-field-val {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 3px 8px;
      font-size: 11px;
      color: #08122d;
    }
    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 6px;
      margin-top: 10px;
    }

    /* Reference Section */
    .three-pl-reference-section {
      margin-top: 36px;
    }
    .reference-tabs-card {
      background: #ffffff;
      border: 1px solid #edf0f5;
      border-radius: 14px;
      padding: 22px;
      box-shadow: 0 4px 16px rgba(8, 18, 45, 0.03);
    }
    .ref-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 18px;
      flex-wrap: wrap;
    }
    .ref-title {
      font-family: 'Manrope', sans-serif;
      font-size: 18px;
      font-weight: 800;
      color: #08122d;
      margin: 0;
    }
    .ref-tabs {
      display: flex;
      gap: 6px;
      background: #f1f5f9;
      padding: 3px;
      border-radius: 999px;
    }
    .ref-tab-btn {
      border: none;
      background: transparent;
      padding: 5px 14px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .ref-tab-btn.is-active {
      background: #08122d;
      color: #ffffff;
    }
    .ref-table-wrap {
      overflow-x: auto;
    }
    .ref-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12.5px;
    }
    .ref-table th {
      background: #f8fafc;
      text-align: left;
      padding: 8px 12px;
      color: #08122d;
      font-weight: 700;
      border-bottom: 2px solid #e2e8f0;
    }
    .ref-table td {
      padding: 9px 12px;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
    }
    .capture-badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 600;
      background: #f1f5f9;
      color: #0f172a;
      border-radius: 4px;
      padding: 2px 8px;
    }
    .ref-desc {
      font-size: 12px;
      color: #64748b;
    }
    .api-meta-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 14px;
    }
    .api-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 14px;
    }
    .api-card h4 {
      font-size: 13px;
      font-weight: 700;
      color: #08122d;
      margin: 0 0 4px;
    }
    .api-card code {
      display: block;
      background: #08122d;
      color: #f1f5f9;
      padding: 6px 10px;
      border-radius: 4px;
      font-family: 'DM Mono', monospace;
      font-size: 11.5px;
      margin: 6px 0;
    }
    .api-card p {
      font-size: 11.5px;
      color: #64748b;
      margin: 0;
    }
    .step-num {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #ffc400;
      color: #08122d;
      font-size: 10px;
      font-weight: 800;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 4px;
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

  activeModule = signal<string>('setup');
  activeRefTab = signal<'statuses' | 'charges' | 'api'>('statuses');

  selectModuleAndScroll(id: string) {
    this.activeModule.set(id);
    setTimeout(() => {
      const el = document.getElementById('module-' + id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }

  toggleModule(id: string) {
    if (this.activeModule() === id) {
      this.activeModule.set('');
    } else {
      this.activeModule.set(id);
    }
  }

  isPill(val: string): boolean {
    return val.startsWith('@');
  }

  getPillClass(val: string): string {
    const colon = val.indexOf(':');
    const type = val.substring(1, colon);
    return 'status-step-pill pill-' + type;
  }

  getPillText(val: string): string {
    const colon = val.indexOf(':');
    return val.substring(colon + 1);
  }

  isActionBtn(val: string): boolean {
    return val.startsWith('!');
  }

  getActionBtnText(val: string): string {
    return val.substring(1).replace(/\|/g, ' · ');
  }

  isNum(val: string): boolean {
    return val.startsWith('#');
  }

  getNumText(val: string): string {
    return val.substring(1);
  }

  lifecycleSteps = [
    { num: '1', name: 'Onboard Client', modId: 'setup' },
    { num: '2', name: 'ASN Inbound', modId: 'inbound' },
    { num: '3', name: 'Dock Booking', modId: 'inbound' },
    { num: '4', name: 'Receive & QC', modId: 'receiving' },
    { num: '5', name: 'Put-Away', modId: 'receiving' },
    { num: '6', name: 'WMS Stock', modId: 'inventory' },
    { num: '7', name: 'Client Order', modId: 'orders' },
    { num: '8', name: 'Wave & Pick', modId: 'orders' },
    { num: '9', name: 'Pack & Ship', modId: 'shipping' },
    { num: '10', name: 'Delivery Run', modId: 'shipping' },
    { num: '11', name: 'Returns (RMA)', modId: 'returns' },
    { num: '12', name: 'Billing Run', modId: 'billing' }
  ];

  statusList = [
    { doc: 'Client', statuses: ['Active', 'OnHold', 'Inactive'], desc: 'Only Active clients can receive stock, order fulfillment, or raise RMAs.' },
    { doc: 'Inbound ASN', statuses: ['Draft', 'Submitted', 'Receiving', 'Received', 'Cancelled'], desc: 'Advance Shipping Notice matching inbound carrier deliveries.' },
    { doc: 'Dock Appointment', statuses: ['Booked', 'Arrived', 'Completed', 'NoShow', 'Cancelled'], desc: 'Scheduled loading bay windows to eliminate yard truck congestion.' },
    { doc: 'Warehouse Task', statuses: ['Open', 'InProgress', 'Completed', 'Cancelled'], desc: 'Covers directed PUTAWAY, PICK, and REPLEN worker actions.' },
    { doc: 'Return (RMA)', statuses: ['Requested', 'Authorised', 'PartiallyReceived', 'Received', 'Closed', 'Rejected', 'Cancelled'], desc: 'Triage customer returns into Good (restock), Damaged, or Hold.' },
    { doc: 'Purchase Requisition', statuses: ['Approved', 'Ordered', 'Closed', 'Cancelled'], desc: 'Replenishment order converted to ASN and auto-closed upon receipt.' },
    { doc: 'Cycle Count', statuses: ['Open', 'Counting', 'Review', 'Approved', 'Cancelled'], desc: 'Periodic and blind physical inventory checks with variance adjustments.' },
    { doc: 'Fulfilment Order', statuses: ['Draft', 'Released', 'PartiallyAllocated', 'Allocated', 'Picking', 'Picked', 'Packed', 'Dispatched', 'Cancelled'], desc: 'End-to-end client sales order processing and reservation lifecycle.' },
    { doc: 'Wave', statuses: ['Picking', 'Completed', 'Cancelled'], desc: 'Consolidated multi-order picking route across warehouse aisles.' },
    { doc: 'Shipment', statuses: ['Packed', 'Dispatched', 'Cancelled'], desc: 'Consolidated packages leaving loading dock with delivery challan.' },
    { doc: 'Delivery Run', statuses: ['Planned', 'InTransit', 'Completed', 'Cancelled'], desc: 'Multi-stop delivery route operated by fleet or 3PL courier.' },
    { doc: 'Delivery Stop', statuses: ['Pending', 'Delivered', 'Failed'], desc: 'Individual delivery milestone with electronic proof of delivery.' },
    { doc: '3PL Invoice', statuses: ['Draft', 'Approved', 'Posted', 'Cancelled'], desc: 'Monthly billing run priced from captured billable events.' },
    { doc: 'Invoice Dispute', statuses: ['Open', 'Accepted', 'Rejected'], desc: 'Client portal billing query resolved with optional credit note.' }
  ];

  chargesList = [
    { code: 'INBOUND_RECEIPT', source: 'Dock Receiving', unit: 'per receipt', pricing: 'Fixed fee for receiving and inspecting carrier truck arrival' },
    { code: 'INBOUND_UNIT', source: 'Dock Receiving', unit: 'per unit received', pricing: 'Per-piece count fee applied to every unit accepted into dock' },
    { code: 'PUTAWAY_UNIT', source: 'Put-Away to Bins', unit: 'per unit moved', pricing: 'Direct transport from dock staging to dedicated storage bin' },
    { code: 'STORAGE_UNIT_DAY', source: 'Nightly Storage Job', unit: 'per unit per day', pricing: 'Automated nightly snapshot billing per active stored piece' },
    { code: 'STORAGE_LOCATION_DAY', source: 'Nightly Storage Job', unit: 'per pallet slot / day', pricing: 'Nightly charge for every dedicated or occupied bin/pallet slot' },
    { code: 'ORDER_FEE', source: 'Order Processing', unit: 'per fulfillment order', pricing: 'Base order processing and administrative documentation fee' },
    { code: 'PICK_LINE', source: 'Wave Picking', unit: 'per picked line', pricing: 'Fee for picking individual SKUs across warehouse pick faces' },
    { code: 'PICK_UNIT', source: 'Wave Picking', unit: 'per picked piece', pricing: 'Piece-level handling fee for items gathered during pick waves' },
    { code: 'PACKAGE', source: 'Packing & Dispatch', unit: 'per parcel / carton', pricing: 'Cartonization, labeling, and packing station consumable charge' },
    { code: 'DELIVERY_FEE', source: 'Deliveries', unit: 'per delivered stop', pricing: 'Last-mile transport calculated from delivery zone and weight bands' },
    { code: 'RETURN_ORDER', source: 'Returns (RMA)', unit: 'per return', pricing: 'Administration fee charged on first receipt day of returned goods' },
    { code: 'RETURN_UNIT', source: 'Returns (RMA)', unit: 'per unit triaged', pricing: 'Inspection fee for sorting returns into good, damaged, or quarantine' },
    { code: 'CYCLE_COUNT_LINE', source: 'Cycle Counts', unit: 'per counted line', pricing: 'Applied exclusively for client-requested manual stock inventory counts' }
  ];

  modules: ThreePLModule[] = [
    {
      id: 'setup',
      shortName: '1. Setup & Clients',
      icon: 'setup',
      heading: '1. 3PL Setup, Clients & Storage Hierarchy',
      subtitle: 'Manage client accounts, segregated accounting ledgers, storage zones, carrier tariffs, and API access.',
      routeTag: '3PL Setup · /three-pl/clients',
      statusChain: [
        { label: 'Active', type: 'ok' },
        { label: 'OnHold', type: 'warn' },
        { label: 'Inactive', type: 'default' }
      ],
      features: [
        { title: 'Client Profiles & Credit Terms', desc: 'Maintain client codes, contacts, billing addresses, tax IDs, credit terms (days), and preferred warehouse hubs.' },
        { title: 'Granular Staff Access Control', desc: 'Restrict warehouse operators to specific clients via Client User Access rules, preventing unauthorized visibility.' },
        { title: 'Automated Accounting Ledgers', desc: 'Automatically create and initialize client-segregated financial ledgers upon first operational transaction.' },
        { title: 'Storage Location Hierarchy', desc: 'Model warehouse zones, aisles, racks, and bins with max weight (kg), volume (CBM), and temperature ratings.' },
        { title: 'Pickable & Mixed-Owner Bins', desc: 'Designate pick-face bins, quarantine locations, or allow multiple clients to share high-bay reserve bins.' },
        { title: 'Delivery Zones & Carrier Tariffs', desc: 'Map city zones, fuel surcharges, per-stop fees, and weight bands for automated delivery freight costing.' }
      ],
      benefits: [
        'Strict multi-tenant data segregation per client',
        'Automatic accounting ledger creation per client',
        'Accurate location dimension & weight safety limits',
        'Fast client onboarding with portal self-service'
      ],
      mockScreen: {
        url: '/three-pl/clients',
        crumb: ['3PL Setup', 'Clients'],
        title: '3PL Clients',
        filters: ['Search', 'All Statuses'],
        actions: ['+ New 3PL Client'],
        cols: ['Code', 'Client Name', 'Contact Person', 'Phone', 'Credit Terms', 'Preferred Warehouse', 'Status', 'Actions'],
        rows: [
          ['CL-001', 'Al Noor Trading', 'Sameer K.', '050 111 2233', '#30 days', 'Main DC', '@ok:Active', '!Edit|View'],
          ['CL-002', 'Gulf Home Goods', 'Rana M.', '055 444 9988', '#45 days', 'Main DC', '@ok:Active', '!Edit|View'],
          ['CL-003', 'Desert Bloom Cosmetics', 'Faisal A.', '052 777 1200', '#15 days', 'North Hub', '@warn:On Hold', '!Edit|View']
        ]
      }
    },
    {
      id: 'inbound',
      shortName: '2. Inbound & ASNs',
      icon: 'inbound',
      heading: '2. Advance Shipping Notices (ASN) & Dock Scheduling',
      subtitle: 'Streamline incoming freight with client pre-alerts, dock door appointment booking, and automated gate control.',
      routeTag: '3PL Inbound · /three-pl/asns',
      statusChain: [
        { label: 'Draft', type: 'default' },
        { label: 'Submitted', type: 'info' },
        { label: 'Receiving', type: 'warn' },
        { label: 'Received', type: 'ok' }
      ],
      features: [
        { title: 'Comprehensive ASN Ingestion', desc: 'Receive inbound pre-alerts with line details, quantities, expected arrival dates, container numbers, and vehicle IDs.' },
        { title: 'Purchase Requisition Linkage', desc: 'Link client ASNs to approved replenishment requisitions, automatically closing requisitions upon full receipt.' },
        { title: 'Intelligent Dock Door Booking', desc: 'Reserve designated dock bays and time windows to eliminate truck idling and yard congestion.' },
        { title: 'Gate Arrival & Check-In', desc: 'Real-time tracking of carrier truck arrivals, dock assignments, and unload turnaround times.' },
        { title: 'Multi-Session Inbound Support', desc: 'Allow large incoming shipments to be received across multiple dock sessions without losing track of counts.' },
        { title: 'Automated Status Progression', desc: 'Transition smoothly from Draft → Submitted → Receiving → Received, broadcasting webhooks to the client.' }
      ],
      benefits: [
        'Zero dock bottlenecks with pre-scheduled arrival windows',
        'Real-time inbound visibility for both 3PL and client',
        'Direct linkage between purchase requisitions and ASNs',
        'Automatic webhook alerts (asn.received) upon dock arrival'
      ],
      mockScreen: {
        url: '/three-pl/asns',
        crumb: ['3PL Inbound', 'ASNs'],
        title: 'Inbound Notices (ASN)',
        filters: ['Search', 'All Clients', 'All Statuses'],
        actions: ['+ New ASN'],
        cols: ['ASN #', 'Client', 'Warehouse', 'Expected Date', 'Carrier', 'Lines', 'Expected Qty', 'Dock Slot', 'Status', 'Actions'],
        rows: [
          ['ASN-2026-0142', 'Al Noor Trading', 'Main DC', '25 Oct 2026', 'Swift Freight', '#4', '#1,200', 'D1 · 09:00–10:00', '@info:Submitted', '!Book Dock|Edit'],
          ['ASN-2026-0141', 'Gulf Home Goods', 'Main DC', '24 Oct 2026', 'Own truck', '#2', '#300', 'D2 · 14:00–15:00', '@warn:Receiving', '!View|Receive'],
          ['ASN-2026-0139', 'Al Noor Trading', 'Main DC', '22 Oct 2026', 'Swift Freight', '#6', '#2,400', 'Completed', '@ok:Received', '!View Ledger']
        ]
      }
    },
    {
      id: 'receiving',
      shortName: '3. Receiving & QC',
      icon: 'receiving',
      heading: '3. Quality Control, Receiving & Directed Put-Away',
      subtitle: 'Verify incoming goods against ASNs, perform QC quarantine inspections, and direct put-away to optimal storage bins.',
      routeTag: '3PL Inbound · /three-pl/receiving',
      statusChain: [
        { label: 'Open', type: 'info' },
        { label: 'InProgress', type: 'warn' },
        { label: 'Completed', type: 'ok' }
      ],
      features: [
        { title: 'Line-by-Line ASN Verification', desc: 'Display expected, previously received, and outstanding quantities to catch short or over-shipments instantly.' },
        { title: 'Good, Damaged & Hold Sorting', desc: 'Separate goods into Available (ready for sale), Damaged (unsellable), and Quarantine for quality inspection.' },
        { title: 'Dedicated QC Inspection Queue', desc: 'Inspect held products and apply definitive Pass or Fail results to release or condemn inventory.' },
        { title: 'System-Directed Put-Away Tasks', desc: 'Auto-generate put-away tasks with intelligent bin suggestions based on product velocity and dimensions.' },
        { title: 'Partial Put-Away Confirmation', desc: 'Confirm partial pallet movements while keeping the task active for remaining quantities.' },
        { title: 'Automatic Ledger & Billing Events', desc: 'Post RECEIPT stock movements directly to the client ledger and log billable INBOUND_RECEIPT and PUTAWAY_UNIT events.' }
      ],
      benefits: [
        '100% receiving accuracy matched against electronic ASNs',
        'Strict defect containment prevents bad stock reaching clients',
        'Minimized travel time with AI-assisted put-away bin suggestions',
        'Immediate billable event capture protects logistics revenue'
      ],
      mockScreen: {
        url: '/three-pl/receiving',
        crumb: ['3PL Inbound', 'Receiving'],
        title: 'Receiving Goods',
        actions: ['Post Receipt'],
        cols: ['#', 'Product', 'Unit', 'Expected', 'Received', 'Outstanding', 'Good', 'Damaged', 'Batch #', 'QC Hold'],
        rows: [
          ['#1', 'Ceramic Plate Set 6pc', 'Box', '#200', '#0', '#200', '#196', '#4', 'L-2610A', 'No'],
          ['#2', 'Glass Tumbler 12pc', 'Box', '#100', '#0', '#100', '#90', '#0', 'L-2610B', '@warn:Held for QC']
        ],
        dialog: {
          title: 'Put-Away Task Allocation · Task #T-5521',
          fields: [
            ['Product', 'Ceramic Plate Set 6pc (196 units)'],
            ['From Location', 'RCV-01 (Dock 1 Staging)'],
            ['Suggested Bin', 'A-03-01 (Aisle A, Bay 3, Tier 1)'],
            ['Remaining', '196 Boxes']
          ],
          buttons: ['Close', 'Confirm Put-Away']
        }
      }
    },
    {
      id: 'returns',
      shortName: '4. Returns & RMA',
      icon: 'returns',
      heading: '4. Customer Returns & RMA Management',
      subtitle: 'Process customer returns, refused shipments, and damaged goods with strict authorization and stock sorting.',
      routeTag: '3PL Inbound · /three-pl/returns',
      statusChain: [
        { label: 'Requested', type: 'info' },
        { label: 'Authorised', type: 'ok' },
        { label: 'PartiallyReceived', type: 'warn' },
        { label: 'Received', type: 'ok' }
      ],
      features: [
        { title: 'Dispatched Order Validation', desc: 'Enforce that returns must originate from an existing dispatched order, preventing illegitimate or duplicate returns.' },
        { title: 'Reason Classification Engine', desc: 'Categorize returns by DAMAGED, WRONG_ITEM, NOT_WANTED, REFUSED, EXPIRED, or DEFECTIVE.' },
        { title: 'Portal RMA Initiation & Approval', desc: 'Enable clients to submit return authorization requests through the portal for warehouse review.' },
        { title: 'Inspection & Triage Sorting', desc: 'Receive returns at dock staging and split goods into sound stock, damaged stock, or quarantine hold.' },
        { title: 'Return Put-Away Workflows', desc: 'Generate dedicated put-away tasks to return approved sound goods back to active pick faces.' },
        { title: 'Strict Return Limits Enforcement', desc: 'Block attempts to return more items than were originally shipped (accounting for previous returns).' }
      ],
      benefits: [
        'Fraud prevention: cannot return items never shipped',
        'Rapid restocking turns valid customer returns back into cash',
        'Transparent return notes visible to both warehouse and client',
        'Captures RETURN_ORDER and RETURN_UNIT charges automatically'
      ],
      mockScreen: {
        url: '/three-pl/returns',
        crumb: ['3PL Inbound', 'Returns'],
        title: '3PL Returns (RMA)',
        filters: ['Search returns', 'All Clients', 'Open returns'],
        actions: ['+ New Return'],
        cols: ['RMA #', 'Client', 'Order Ref', 'Reason', 'Status', 'Expected', 'Good', 'Damaged', 'Hold', 'Actions'],
        rows: [
          ['RMA-2026-0031', 'Al Noor Trading', 'ORD-2026-1180', 'REFUSED', '@info:Requested', '#6', '#0', '#0', '#0', '!Authorise|Reject'],
          ['RMA-2026-0030', 'Gulf Home Goods', 'ORD-2026-1162', 'DAMAGED', '@ok:Authorised', '#4', '#0', '#0', '#0', '!Receive|Edit'],
          ['RMA-2026-0028', 'Al Noor Trading', 'ORD-2026-1149', 'WRONG_ITEM', '@warn:PartiallyReceived', '#10', '#5', '#1', '#0', '!Receive|Close']
        ],
        dialog: {
          title: 'Receive RMA-2026-0028 · Split & Inspect Units',
          fields: [
            ['Receiving Location', 'RCV-02 (Returns Staging)'],
            ['Client', 'Al Noor Trading']
          ],
          cols: ['Product', 'Line Reason', 'Expected', 'Good (Restock)', 'Damaged', 'Batch #', 'Expiry'],
          rows: [
            ['Olive Oil 1L', 'WRONG_ITEM', '#6', '#2', '#0', 'L-2607', '30 Jun 2027'],
            ['Sunflower Oil 2L', 'WRONG_ITEM', '#4', '#1', '#1', 'L-2603', '31 Mar 2027']
          ],
          buttons: ['Cancel', 'Confirm Receipt']
        }
      }
    },
    {
      id: 'inventory',
      shortName: '5. Multi-Client Stock',
      icon: 'inventory',
      heading: '5. Multi-Client Inventory, Stock Ledger & Cycle Counts',
      subtitle: 'Segregated multi-client stock tracking with batch/expiry controls, pick face replenishment, and cycle counts.',
      routeTag: '3PL Inventory · /three-pl/stock-overview',
      statusChain: [
        { label: 'Open', type: 'info' },
        { label: 'Counting', type: 'warn' },
        { label: 'Review', type: 'warn' },
        { label: 'Approved', type: 'ok' }
      ],
      features: [
        { title: 'One-Page WMS Stock Matrix', desc: 'Unified view of all clients stock across warehouses, bins, batches, and expiries with 30/60/90-day filters.' },
        { title: 'Immutable Client Stock Ledger', desc: 'Real-time transaction history logging every single receipt, transfer, pick, dispatch, and adjustment.' },
        { title: 'Batch & Expiry FIFO/FEFO Enforcement', desc: 'Guarantee proper stock rotation by automatically prioritizing lots with nearest expiration dates.' },
        { title: 'Automated Stock Verification', desc: 'Run Verify Stock to audit live inventory balances against historic ledger entries and surface discrepancies.' },
        { title: 'Cycle Counting & Blind Audits', desc: 'Conduct periodic and client-requested blind counts with variance adjustment workflows.' },
        { title: 'Nightly Storage Fee Capture', desc: 'Automated nightly cron captures STORAGE_UNIT_DAY and STORAGE_LOCATION_DAY snapshots for billing.' }
      ],
      benefits: [
        'Absolute segregation between client balances prevents mix-ups',
        'Automatic nightly storage capture (per unit or occupied location)',
        'FEFO rotation minimizes stock write-downs and expiration waste',
        'Fast cycle counting eliminates disruptive annual shutdowns'
      ],
      mockScreen: {
        url: '/three-pl/stock-overview',
        crumb: ['3PL Inventory', 'Stock Overview'],
        title: 'WMS Multi-Client Stock Matrix',
        kpis: [
          ['Active Clients', '3 clients'],
          ['Tracked SKUs', '148'],
          ['Total On Hand', '42,610 units'],
          ['Expiring < 60d', '7 lines']
        ],
        filters: ['Search', 'All Warehouses', 'Expiring within 60 days'],
        actions: ['Verify Stock', 'Export CSV'],
        cols: ['Client', 'Product Name', 'Warehouse', 'Bin', 'Batch #', 'Expiry Date', 'Status', 'On Hand', 'Reserved', 'Available'],
        rows: [
          ['Al Noor Trading', 'Basmati Rice 5kg', 'Main DC', 'R-02-04', 'L-2609', '12 Dec 2026', '@ok:Available', '#480', '#120', '#360'],
          ['Desert Bloom', 'Hand Cream 50ml', 'North Hub', 'B-07-01', 'L-2512', '05 Nov 2026', '@warn:Available', '#96', '#0', '#96'],
          ['Gulf Home Goods', 'Ceramic Plate Set 6pc', 'Main DC', 'RCV-01', 'L-2610A', '—', '@bad:Damaged', '#4', '#0', '#0']
        ]
      }
    },
    {
      id: 'replen',
      shortName: '6. Replenishment',
      icon: 'replen',
      heading: '6. Automated Replenishment & Demand Planning',
      subtitle: 'Forecast demand, monitor safety stock, and automate transfer orders and purchase requisitions.',
      routeTag: '3PL Inventory · /three-pl/replenishment',
      statusChain: [
        { label: 'Proposed', type: 'info' },
        { label: 'Approved', type: 'ok' },
        { label: 'Ordered', type: 'info' },
        { label: 'Closed', type: 'default' }
      ],
      features: [
        { title: 'Dynamic Reorder Rules Engine', desc: 'Configure Min, Max, Reorder Point (ROP), Target stock, review cycles, and pack multiples per client, warehouse, and SKU.' },
        { title: 'Multi-Site Source Optimization', desc: 'Establish source fulfillment sites with priority rankings, transportation costs, and geographical distance.' },
        { title: 'Planning Simulation Engine', desc: 'Project future stock deficits: Projected Stock = On Hand − Committed + Inbound − Lead-Time Demand.' },
        { title: 'Site Transfer Generation', desc: 'Turn approved reorder suggestions into inter-warehouse transfers with dual sign-off.' },
        { title: 'Requisition to ASN Bridge', desc: 'Convert approved replenishment requisitions directly into inbound ASNs.' },
        { title: 'Proactive Shortage Alerts', desc: 'Broadcast shortage alerts to warehouse teams and client portal dashboards.' }
      ],
      benefits: [
        'Eliminates stockouts on high-velocity client SKUs',
        'Data-driven reorder formulas replace guesswork',
        'Smooth transfer coordination between hub and satellite depots',
        'Automated order hold releases once replenishment completes'
      ],
      mockScreen: {
        url: '/three-pl/replenishment',
        crumb: ['3PL Inventory', 'Replenishment'],
        title: 'Replenishment Planning',
        tabs: ['Suggestions', 'Reorder rules', 'Source sites', 'Transfers', 'Requisitions', 'Alerts'],
        actions: ['Simulate', 'Run Planning'],
        cols: ['Client', 'Warehouse', 'Product', 'On Hand', 'Committed', 'Inbound', 'Projected', 'ROP / Target', 'Source', 'Order Qty', 'Actions'],
        rows: [
          ['Al Noor Trading', 'Main DC', 'Basmati Rice 5kg', '#480', '#360', '#0', '#-180', '#400 / 1,200', 'Supplier PO', '#1,380', '!Approve|Reject'],
          ['Gulf Home Goods', 'Main DC', 'Glass Tumbler 12pc', '#90', '#20', '#100', '#110', '#120 / 300', 'North Hub Transfer', '#190', '!Approve|Reject']
        ]
      }
    },
    {
      id: 'pickfaces',
      shortName: '7. Pick Point Storage',
      icon: 'pickfaces',
      heading: '7. Pick Point Storage & Pick Face Management',
      subtitle: 'Maintain active pick faces in accessible lower racks, automatically refilled from bulk reserve pallet racking.',
      routeTag: 'Replenishment · Pick Point Storage',
      statusChain: [
        { label: 'Below Min', type: 'warn' },
        { label: 'Move Created', type: 'info' },
        { label: 'Refilled (OK)', type: 'ok' }
      ],
      features: [
        { title: 'Pick Point Configuration', desc: 'Map dedicated pick face bins per client SKU with Min, Max, and multiple carton thresholds.' },
        { title: 'On-Demand Pick Point Refills', desc: 'Automatically trigger refill tasks when customer order lines exceed available pick face inventory.' },
        { title: 'Automated Top-Up System', desc: 'Proactively create replenishment tasks whenever a pick face falls below its configured Min threshold.' },
        { title: 'Directed Refill Move Tasks', desc: 'Direct operators to specific bulk reserve bins, require product barcode scans, and record refill quantities.' },
        { title: 'Exception & Shortage Logging', desc: 'Capture operator reason codes when moving less than requested, flagging the reserve bin for inspection.' },
        { title: 'Waiting Order Visibility', desc: 'Track fulfillment orders paused waiting for pick face replenishment to complete.' }
      ],
      benefits: [
        'Pickers stay in fast-pick zones; bulk equipment stays in reserve',
        'Up to 50% faster order picking cycle times',
        'Zero order delays caused by empty pick face bins',
        'Free inter-bin replenishment moves are not charged to the client'
      ],
      mockScreen: {
        url: '/three-pl/replenishment#pickfaces',
        crumb: ['3PL Inventory', 'Replenishment', 'Pick point storage'],
        title: 'Pick Point Storage Matrix',
        filters: ['24 Pick Points Active', '2 Below Min', '3 Moves Open'],
        actions: ['Check Pick Points', '+ Add Pick Point'],
        cols: ['Bin', 'Client', 'Product Name', 'On Hand', 'Min', 'Max', 'Free', 'Reserve Stock', 'Status', 'Pending Move'],
        rows: [
          ['A-01-05', 'Al Noor Trading', 'Basmati Rice 5kg', '#12', '#40', '#160', '#4', '#440', '@warn:Below Min', 'R-02-04 → 120'],
          ['A-02-01', 'Gulf Home Goods', 'Glass Tumbler 12pc', '#30', '#10', '#40', '#30', '#60', '@ok:OK', 'None'],
          ['A-01-02', 'Al Noor Trading', 'Olive Oil 1L', '#0', '#24', '#96', '#0', '#0', '@bad:No Reserve', 'Replenishment Alert']
        ]
      }
    },
    {
      id: 'orders',
      shortName: '8. Orders & Waves',
      icon: 'orders',
      heading: '8. Fulfilment Orders, Wave Picking & Barcode Verification',
      subtitle: 'Allocate inventory, generate optimized wave picks, and verify items using mobile barcode scanners.',
      routeTag: '3PL Outbound · /three-pl/orders',
      statusChain: [
        { label: 'Draft', type: 'default' },
        { label: 'Released', type: 'info' },
        { label: 'Allocated', type: 'info' },
        { label: 'Picking', type: 'warn' },
        { label: 'Picked', type: 'info' },
        { label: 'Dispatched', type: 'ok' }
      ],
      features: [
        { title: 'Multi-Channel Order Ingestion', desc: 'Ingest client customer orders via client portal, REST API, or bulk CSV batch import.' },
        { title: 'Intelligent Stock Allocation', desc: 'Reserve specific batch lots in pickable bins based on FEFO rules, priority tiers (1–9), and order due dates.' },
        { title: 'Backorder Splitting', desc: 'Automatically separate unallocated items into backorders while releasing available stock for immediate fulfillment.' },
        { title: 'Wave Picking Consolidation', desc: 'Group multiple compatible orders into optimized picking waves to minimize total warehouse travel distance.' },
        { title: 'Two-Step Barcode Verification', desc: 'Pickers scan the location barcode, then scan the item barcode to ensure 100% item accuracy.' },
        { title: 'Short-Pick Discrepancy Reporting', desc: 'Record short reasons immediately, unreserving remaining items and triggering cycle count investigations.' }
      ],
      benefits: [
        'Massive reduction in warehouse walking time via wave picking',
        '99.9% picking accuracy with strict double-scan validation',
        'Clear visibility into allocated, picked, and backordered quantities',
        'Captures ORDER_FEE, PICK_LINE, and PICK_UNIT billing charges'
      ],
      mockScreen: {
        url: '/three-pl/orders',
        crumb: ['3PL Outbound', 'Orders'],
        title: 'Fulfilment Orders',
        filters: ['Search', 'All Clients', 'Open orders'],
        actions: ['Import CSV', '+ New Order'],
        cols: ['Order #', 'Client', 'Client Ref', 'Ship To', 'Required Date', 'Priority', 'Lines', 'Status', 'Actions'],
        rows: [
          ['ORD-2026-1192', 'Al Noor Trading', 'WEB-55821', 'Ahmed R., Deira', '25 Oct 2026', '#3', '#2', '@info:Allocated', '!View|Wave'],
          ['ORD-2026-1191', 'Gulf Home Goods', 'PO-7781', 'Home Plus, Al Barsha', '26 Oct 2026', '#5', '#4', '@warn:PartiallyAllocated', '!View'],
          ['ORD-2026-1188', 'Al Noor Trading', 'WEB-55790', 'Lina S., Karama', '24 Oct 2026', '#1', '#1', '@warn:Picking', '!View Task'],
          ['ORD-2026-1180', 'Al Noor Trading', 'WEB-55702', 'Omar T., Jebel Ali', '23 Oct 2026', '#5', '#3', '@ok:Dispatched', '!Challan']
        ]
      }
    },
    {
      id: 'shipping',
      shortName: '9. Shipping & Fleet',
      icon: 'shipping',
      heading: '9. Packing, Dispatch & Delivery Fleet Operations',
      subtitle: 'Pack shipments, generate delivery challans, organize driver routes, and capture electronic proof of delivery.',
      routeTag: '3PL Outbound · /three-pl/shipping',
      statusChain: [
        { label: 'Packed', type: 'info' },
        { label: 'InTransit', type: 'warn' },
        { label: 'Delivered', type: 'ok' },
        { label: 'Completed', type: 'ok' }
      ],
      features: [
        { title: 'Parcel Packaging & Weight Capture', desc: 'Group picked lines into parcels, enter package dimensions, gross weight, and print shipping labels.' },
        { title: 'Delivery Challan Generation', desc: 'Instantly generate official delivery challans and packing slips upon shipment dispatch.' },
        { title: 'Delivery Run Route Planning', desc: 'Build multi-stop delivery routes by assigning pending shipments to drivers and vehicles in sequential order.' },
        { title: 'Electronic Proof of Delivery (e-POD)', desc: 'Mark stops Delivered with recipient name and signature or Failed with structured reason codes.' },
        { title: 'Carrier Freight Cost Calculation', desc: 'Compute carrier freight expenses using tariff versions, delivery zones, weight brackets, and fuel surcharges.' },
        { title: 'Failed Delivery Rescheduling', desc: 'Automatically return failed deliveries to the pool for replanning on subsequent delivery runs.' }
      ],
      benefits: [
        'Real-time milestone tracking for both clients and their customers',
        'Accurate carrier expense calculation with automatic expense voucher creation',
        'Guaranteed delivery accountability with digital sign-offs',
        'Automated webhooks (order.shipped, shipment.delivered) keep clients updated'
      ],
      mockScreen: {
        url: '/three-pl/deliveries',
        crumb: ['3PL Outbound', 'Deliveries'],
        title: '3PL Deliveries & Runs',
        tabs: ['Delivery runs', 'Carriers'],
        actions: ['+ Plan Run'],
        cols: ['Run #', 'Date', 'Warehouse', 'Carrier', 'Driver', 'Stops', 'Delivered', 'Failed', 'Run Cost', 'Status', 'Actions'],
        rows: [
          ['RUN-2026-0071', '24 Oct 2026', 'Main DC', 'Own fleet', 'Yusuf H.', '#6', '#4', '#1', '#132.40 AED', '@warn:InTransit', '!Record POD'],
          ['RUN-2026-0072', '25 Oct 2026', 'Main DC', 'Swift Couriers', '—', '#4', '#0', '#0', '#96.00 AED', '@info:Planned', '!Start|Edit'],
          ['RUN-2026-0068', '23 Oct 2026', 'Main DC', 'Own fleet', 'Yusuf H.', '#5', '#5', '#0', '#118.75 AED', '@ok:Completed', '!Run Cost']
        ]
      }
    },
    {
      id: 'billing',
      shortName: '10. Billing & Rates',
      icon: 'billing',
      heading: '10. Automated 3PL Billing, Rate Cards & Invoicing',
      subtitle: 'Capture 13+ billable activity types automatically, run monthly billing batches, and handle disputes and credit notes.',
      routeTag: '3PL Billing · /three-pl/billing',
      statusChain: [
        { label: 'Draft', type: 'default' },
        { label: 'Approved', type: 'info' },
        { label: 'Posted', type: 'ok' },
        { label: 'Collected', type: 'ok' }
      ],
      features: [
        { title: 'Client-Specific Rate Cards', desc: 'Configure dated rate cards per client and warehouse, setting prices for all 13 billable activity types.' },
        { title: 'Automated Billable Events Engine', desc: 'Capture billable events automatically from receipts, storage, picks, packs, returns, and deliveries.' },
        { title: 'Monthly Billing Run Automation', desc: 'Generate consolidated monthly draft invoices with automated top-ups to agreed minimum monthly fees.' },
        { title: 'General Ledger Double-Entry Posting', desc: 'Post invoices directly to the accounting system: debit client ledger, credit 3PL revenue and tax.' },
        { title: 'Payment Application & Aging', desc: 'Record payments, apply against oldest invoices, and generate 30/60/90+ day aged debtor statements.' },
        { title: 'Dispute Management & Credit Notes', desc: 'Process client invoice disputes from the portal with accepted credit adjustments or explanations.' }
      ],
      benefits: [
        'Eliminates 100% of revenue leakage from missed warehouse charges',
        'Cuts monthly invoicing time from days to just minutes',
        'Complete transparency with line-item detail matching every warehouse action',
        'Seamless accounts integration with credit terms and credit note tracking'
      ],
      mockScreen: {
        url: '/three-pl/billing',
        crumb: ['3PL Billing', 'Invoices'],
        title: '3PL Billing & Accounts Receivable',
        tabs: ['Invoices', 'Accounts', 'Payments', 'Unbilled Events', 'Billing runs', 'Rates', 'Disputes'],
        actions: ['Capture Now', '+ Manual Charge', 'Run Monthly Billing'],
        cols: ['Invoice #', 'Client Name', 'Period', 'Due Date', 'Subtotal', 'Tax', 'Total Amount', 'Paid', 'Balance Due', 'Status', 'Actions'],
        rows: [
          ['TPL-INV-0094', 'Al Noor Trading', 'Sep 2026', '31 Oct 2026', '#8,420.00', '#421.00', '#8,841.00', '#5,000.00', '#3,841.00', '@ok:Posted', '!Credit Note|Pay'],
          ['TPL-INV-0101', 'Gulf Home Goods', 'Oct 2026', '30 Nov 2026', '#3,150.00', '#157.50', '#3,307.50', '#0.00', '#3,307.50', '@info:Approved', '!Post Invoice'],
          ['TPL-INV-0102', 'Desert Bloom', 'Oct 2026', '15 Nov 2026', '#1,200.00', '#60.00', '#1,260.00', '#0.00', '#1,260.00', '@default:Draft', '!Approve|Cancel']
        ]
      }
    },
    {
      id: 'portal',
      shortName: '11. Portal & APIs',
      icon: 'portal',
      heading: '11. "My Warehouse" Customer Portal & Developer APIs',
      subtitle: 'Provide clients with real-time stock dashboards, order submission, returns management, and webhook integrations.',
      routeTag: 'Customer Portal · /customer/my-warehouse',
      statusChain: [
        { label: 'Connected', type: 'ok' },
        { label: 'Authorized', type: 'info' },
        { label: 'Synchronized', type: 'ok' }
      ],
      features: [
        { title: 'My Warehouse Customer Portal', desc: 'Dedicated portal where clients monitor on-hand inventory, submit orders, and track shipments in real time.' },
        { title: 'Portal Return & ASN Management', desc: 'Clients submit inbound ASNs and request return authorisations directly from their portal dashboard.' },
        { title: 'Scoped REST API Access', desc: 'Issue API keys with granular scopes (orders, asns, stock, shipments) for direct e-commerce/ERP sync.' },
        { title: 'HMAC-Signed Webhook Feeds', desc: 'Broadcast instant cryptographically signed webhooks for freight receipts, dispatches, and deliveries.' },
        { title: 'Reliable Webhook Delivery Retries', desc: 'Exponential retry schedule across 720 minutes (up to 8 attempts) with automatic dead-letter protection.' },
        { title: 'Embedded Operational Dashboards', desc: 'Five real-time widgets: 3PL At a Glance, Warehouse Workload, Stock Alerts, and Client Receivables.' }
      ],
      benefits: [
        '24/7 client self-service slashes inbound inquiries by over 80%',
        'Seamless connection to client Shopify, WooCommerce, Magento, or ERP systems',
        'End-to-end cryptographic trust with HMAC-SHA256 request signatures',
        'Clients enjoy an enterprise-grade digital logistics experience'
      ],
      mockScreen: {
        url: '/customer/my-warehouse',
        crumb: ['Customer Portal', 'My Warehouse'],
        title: 'Client Self-Service Portal · My Warehouse',
        tabs: ['My Stock', 'Inbound Notices', 'Orders', 'Deliveries', 'Returns', 'Reorder Alerts', 'Invoices'],
        activeTab: 2,
        actions: ['+ New Order', 'Export Stock CSV'],
        cols: ['Order #', 'Your Client Ref', 'Ship To Customer', 'Ordered', 'Allocated', 'Shipped', 'Backorder', 'Created', 'Status'],
        rows: [
          ['ORD-2026-1192', 'WEB-55821', 'Ahmed R., Deira', '#4', '#4', '#0', '#0', '24 Oct 2026', '@info:Allocated'],
          ['ORD-2026-1180', 'WEB-55702', 'Omar T., Jebel Ali', '#12', '#12', '#12', '#0', '22 Oct 2026', '@ok:Dispatched']
        ],
        dialog: {
          title: 'Request Customer Return (RMA) · Self-Service',
          fields: [
            ['Order Reference', 'ORD-2026-1180 · Dispatched 22 Oct'],
            ['Reason for Return', 'Customer Refused at Door'],
            ['Customer Name', 'Omar T.']
          ],
          cols: ['Product Name', 'Delivered Qty', 'Returning Qty'],
          rows: [
            ['Basmati Rice 5kg', '#6', '#6'],
            ['Olive Oil 1L', '#6', '#0']
          ],
          buttons: ['Cancel', 'Submit Return Request']
        }
      }
    }
  ];
}
