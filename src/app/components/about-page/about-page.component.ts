import { Component, ElementRef, AfterViewInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-about-page',
  standalone: true,
  template: `
    <div class="about-page-root" id="about">
      <!-- HERO SECTION: 3D Parallax with Texts Behind Mobile Phone -->
      <section class="about-hero-section" id="hero">
        <!-- Glowing Double Orbit Layer -->
        <svg class="about-hero-layer about-hero-orbit" data-depth=".4" viewBox="0 0 1500 520" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0" stop-color="#fff" stop-opacity="0" />
              <stop offset=".25" stop-color="#ffb347" stop-opacity=".9" />
              <stop offset=".6" stop-color="#fff" stop-opacity=".15" />
              <stop offset="1" stop-color="#fff" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="g2" x1="1" x2="0">
              <stop offset="0" stop-color="#fff" stop-opacity="0" />
              <stop offset=".3" stop-color="#ffcf6b" stop-opacity=".95" />
              <stop offset=".7" stop-color="#fff" stop-opacity=".1" />
              <stop offset="1" stop-color="#fff" stop-opacity="0" />
            </linearGradient>
            <filter id="heroBlur"><feGaussianBlur stdDeviation="3" /></filter>
          </defs>
          <ellipse cx="750" cy="270" rx="470" ry="150" transform="rotate(-6 750 270)" stroke="url(#g1)" stroke-width="2.5" />
          <ellipse cx="750" cy="270" rx="470" ry="150" transform="rotate(-6 750 270)" stroke="url(#g1)" stroke-width="8" filter="url(#heroBlur)" opacity=".7" />
          <ellipse cx="750" cy="240" rx="560" ry="120" transform="rotate(5 750 240)" stroke="url(#g2)" stroke-width="2" />
          <ellipse cx="750" cy="240" rx="560" ry="120" transform="rotate(5 750 240)" stroke="url(#g2)" stroke-width="7" filter="url(#heroBlur)" opacity=".6" />
        </svg>

        <!-- Ambient Center Glow Layer -->
        <div class="about-hero-layer about-hero-glow" data-depth=".15" aria-hidden="true"></div>

        <!-- TEXT LAYER: Cleanly positioned above the phone (z-index: 5) -->
        <div class="about-hero-copy" data-scroll=".22">
          <h1 class="about-hero-title">We build technology that moves businesses <em>forward.</em></h1>
          <p class="about-hero-sub">A product of Triasoft, Stoccoz delivers a connected platform for warehouse,<br class="hidden md:inline" /> inventory, purchasing, sales, and distribution operations.</p>
        </div>

        <!-- MOBILE PHONE LAYER: Positioned IN FRONT OF the text (z-index: 4) -->
        <div class="about-hero-layer about-hero-phone" data-depth=".7" data-scroll="-.08">
          <img
            src="/assets/about-hero-hand-phone.png"
            alt="Stoccoz mobile app dashboard held in a hand"
          />
        </div>

        <!-- 4 FLOATING GLASS CARDS: Positioned in front (z-index: 5) -->
        <div class="about-hero-layer about-hero-c1" data-depth="1.3" data-scroll="-.14">
          <div class="about-hero-card">
            <svg viewBox="0 0 40 40"><path d="M20 4 34 11v18L20 36 6 29V11z"/><path d="M6 11l14 7 14-7M20 18v18"/></svg>
            <span>Warehouse<br>Management</span>
          </div>
        </div>

        <div class="about-hero-layer about-hero-c2" data-depth="1.6" data-scroll="-.2">
          <div class="about-hero-card">
            <svg viewBox="0 0 40 40"><path d="M20 6 36 14 20 22 4 14z"/><path d="M4 21l16 8 16-8M4 28l16 8 16-8"/></svg>
            <span>Inventory<br>Control</span>
          </div>
        </div>

        <div class="about-hero-layer about-hero-c3" data-depth="1.3" data-scroll="-.14">
          <div class="about-hero-card">
            <svg viewBox="0 0 40 40"><path d="M4 7h5l4 20h18l4-14H11"/><circle cx="16" cy="33" r="2.5"/><circle cx="29" cy="33" r="2.5"/></svg>
            <span>Purchasing<br>&amp; Sales</span>
          </div>
        </div>

        <div class="about-hero-layer about-hero-c4" data-depth="1.7" data-scroll="-.2">
          <div class="about-hero-card">
            <svg viewBox="0 0 40 40"><path d="M3 10h20v18H3zM23 16h8l6 6v6H23z"/><circle cx="11" cy="30" r="3"/><circle cx="30" cy="30" r="3"/></svg>
            <span>Distribution<br>Operations</span>
          </div>
        </div>

        <!-- SILKY DUNE BOTTOM WAVE (z-index: 3) -->
        <svg class="about-hero-layer about-hero-wave" data-depth=".1" viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="w1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#fff" stop-opacity=".18" />
              <stop offset="1" stop-color="#fff" stop-opacity=".7" />
            </linearGradient>
          </defs>
          <path d="M0 150C220 70 420 40 640 110S1100 230 1440 90V300H0z" fill="url(#w1)" />
          <path d="M0 220C260 150 520 150 760 200S1200 270 1440 190V300H0z" fill="#f8fafc" fill-opacity=".95" />
        </svg>
      </section>

      <!-- ENTERPRISE CONTENT SECTIONS -->
      <div class="about-sections-wrapper">
        <!-- 1. MISSION & VISION + WHO WE ARE -->
        <section class="about-container">
          <div class="about-header-centered">
            <div class="about-pill-tag">
              <span class="pill-dot"></span>
              <span>About Stoccoz ERP</span>
            </div>
            <h2 class="about-title-large">Empowering Modern Warehouses with <em>Intelligent ERP</em></h2>
            <p class="about-desc-lead">
              Transforming logistics, distribution, and supply chain operations through cloud-native automation.
            </p>
          </div>

          <div class="about-split-cards">
            <!-- Mission & Vision Card -->
            <div class="about-split-card">
              <span class="about-card-tag">Our Mission &amp; Vision</span>
              <h3>Revolutionizing Logistics and Growth</h3>
              <p>
                At Stoccoz, we are dedicated to revolutionizing distribution and warehouse management through intelligent, cloud-native ERP solutions.
              </p>
              <p>
                Our mission is to empower growing trade, wholesale, and van sales enterprises with technology that simplifies complex logistics, eliminates stock leakage, and powers profitable growth.
              </p>
            </div>

            <!-- Who We Are Card -->
            <div class="about-split-card">
              <span class="about-card-tag">Who We Are</span>
              <h3>Leading Provider of Warehouse ERP Solutions</h3>
              <p>
                Stoccoz is a leading provider of comprehensive ERP solutions specifically designed for modern warehouse management. Founded with a vision to transform how businesses handle inventory, sales, purchases, and production, we’ve built a platform that combines powerful automation with intuitive design.
              </p>
              <p>
                Our team consists of experienced developers, logistics experts, and business strategists who understand the unique challenges faced by warehouse operations. We’re committed to continuous innovation and customer success.
              </p>
            </div>
          </div>

          <!-- 3 Stats Highlights -->
          <div class="about-stats-grid">
            <div class="about-stat-box">
              <div class="about-stat-big">500+</div>
              <div class="about-stat-title">Active Users</div>
              <div class="about-stat-desc">Trusting Stoccoz across trade &amp; distribution</div>
            </div>

            <div class="about-stat-box">
              <div class="about-stat-big">99.9%</div>
              <div class="about-stat-title">Uptime Guarantee</div>
              <div class="about-stat-desc">Reliable cloud-native enterprise service</div>
            </div>

            <div class="about-stat-box">
              <div class="about-stat-big">24/7</div>
              <div class="about-stat-title">Dedicated Support</div>
              <div class="about-stat-desc">Always here to help your warehouse operations</div>
            </div>
          </div>
        </section>

        <!-- 2. WHAT WE DO -->
        <section class="about-container">
          <div class="about-header-centered">
            <div class="about-pill-tag">
              <span class="pill-dot"></span>
              <span>What We Do</span>
            </div>
            <h2 class="about-title-large">Complete ERP Solution for <em>Warehouse Management</em></h2>
            <p class="about-desc-lead">
              Stoccoz provides a comprehensive ERP solution that covers all aspects of warehouse and distribution operations.
            </p>
          </div>

          <div class="about-modules-grid">
            <!-- 1. Stock Management -->
            <div class="about-module-card">
              <div class="about-module-icon-wrap">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                  <path d="m3.3 7 8.7 5 8.7-5"/>
                  <path d="M12 22V12"/>
                </svg>
              </div>
              <h4>Stock Management</h4>
              <p>Real-time inventory tracking, multi-warehouse batch controls, and automated stock reordering.</p>
            </div>

            <!-- 2. Sales Management -->
            <div class="about-module-card">
              <div class="about-module-icon-wrap">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
              </div>
              <h4>Sales Management</h4>
              <p>Streamlined order processing, client-tier pricing, and customer relationship management.</p>
            </div>

            <!-- 3. Purchase Management -->
            <div class="about-module-card">
              <div class="about-module-icon-wrap">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <h4>Purchase Management</h4>
              <p>Efficient procurement workflows, automated vendor comparisons, and purchase order tracking.</p>
            </div>

            <!-- 4. Production Management -->
            <div class="about-module-card">
              <div class="about-module-icon-wrap">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
                  <path d="M17 18h1"/>
                  <path d="M12 18h1"/>
                  <path d="M7 18h1"/>
                </svg>
              </div>
              <h4>Production Management</h4>
              <p>End-to-end production planning, bill of materials (BOM), batch tracking, and assembly execution.</p>
            </div>

            <!-- 5. Analytics & Reporting -->
            <div class="about-module-card">
              <div class="about-module-icon-wrap">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
                </svg>
              </div>
              <h4>Analytics &amp; Reporting</h4>
              <p>Comprehensive insights, distribution profit analytics, and data-driven executive decision support.</p>
            </div>

            <!-- 6. Automation -->
            <div class="about-module-card">
              <div class="about-module-icon-wrap">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h4>Automation</h4>
              <p>Intelligent workflow triggers, van-route stock sync, and eliminating repetitive human error.</p>
            </div>
          </div>
        </section>

        <!-- 3. OUR VALUES -->
        <section class="about-container">
          <div class="about-header-centered">
            <div class="about-pill-tag">
              <span class="pill-dot"></span>
              <span>Our Values</span>
            </div>
            <h2 class="about-title-large">What Drives Us <em>Every Day</em></h2>
            <p class="about-desc-lead">The principles that guide everything we build and deliver.</p>
          </div>

          <div class="about-values-grid">
            <div class="about-value-card">
              <div class="about-value-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>
                </svg>
              </div>
              <h4>Innovation</h4>
              <p>We continuously push the boundaries of warehouse technology, staying ahead of industry trends and operational needs.</p>
            </div>

            <div class="about-value-card">
              <div class="about-value-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h4>Reliability</h4>
              <p>With 99.9% uptime, we ensure your operations run smoothly 24/7. Your business depends on us, and we honor that trust.</p>
            </div>

            <div class="about-value-card">
              <div class="about-value-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h4>Customer Success</h4>
              <p>Your success is our success. We’re committed to providing proactive support ensuring you achieve maximum ROI.</p>
            </div>

            <div class="about-value-card">
              <div class="about-value-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <h4>Simplicity</h4>
              <p>Complex logistics deserve clean solutions. We design our platform to be powerful yet intuitive, reducing onboarding friction.</p>
            </div>
          </div>
        </section>

        <!-- 4. WHY CHOOSE US -->
        <section class="about-container">
          <div class="about-why-shell">
            <div class="about-header-centered" style="margin-bottom: 24px;">
              <div class="about-pill-tag">
                <span class="pill-dot"></span>
                <span>Why Choose Us</span>
              </div>
              <h2 class="about-title-large">What Sets Us <em>Apart</em></h2>
            </div>
            <p class="about-why-lead">
              With over 500+ active users trusting Stoccoz for their warehouse operations, we’ve proven our commitment to excellence.
            </p>

            <div class="about-why-grid">
              <div class="about-why-item">
                <span class="about-why-check">✓</span>
                <span class="about-why-text">Comprehensive solution covering all warehouse management needs</span>
              </div>
              <div class="about-why-item">
                <span class="about-why-check">✓</span>
                <span class="about-why-text">User-friendly interface designed for teams of all technical levels</span>
              </div>
              <div class="about-why-item">
                <span class="about-why-check">✓</span>
                <span class="about-why-text">Scalable platform that grows seamlessly with your business</span>
              </div>
              <div class="about-why-item">
                <span class="about-why-check">✓</span>
                <span class="about-why-text">24/7 customer support to assist your dispatch whenever you need it</span>
              </div>
              <div class="about-why-item">
                <span class="about-why-check">✓</span>
                <span class="about-why-text">Regular updates and new features based on real customer feedback</span>
              </div>
              <div class="about-why-item">
                <span class="about-why-check">✓</span>
                <span class="about-why-text">Bank-grade security and compliant with international industry standards</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 5. GET IN TOUCH / CONTACT FORM -->
        <section class="about-container" id="contact">
          <div class="about-shell">
            <!-- Left Column: Contact Channels & Context -->
            <div class="about-left-col">
              <div class="about-pill-tag">
                <span class="pill-dot"></span>
                <span>Get in Touch</span>
              </div>

              <h2 class="about-main-headline">
                We’d love to<br />
                hear from<br />
                <span class="about-highlight">you.</span>
              </h2>

              <p class="about-lead-copy">
                Whether you have questions about our platform, need support, or want to discuss how Stoccoz can transform your warehouse operations, we’re here to help.
              </p>

              <!-- Direct Reach Channels -->
              <div class="about-contact-channels">
                <div class="about-channel-card">
                  <div class="about-channel-icon-box">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div class="about-channel-details">
                    <small>Email</small>
                    <strong><a href="mailto:info@stoccoz.com">info&#64;stoccoz.com</a></strong>
                  </div>
                </div>

                <div class="about-channel-card">
                  <div class="about-channel-icon-box">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div class="about-channel-details">
                    <small>Phone</small>
                    <strong><a href="tel:+919633542550">+91 9633542550</a></strong>
                  </div>
                </div>

                <div class="about-channel-card">
                  <div class="about-channel-icon-box">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </div>
                  <div class="about-channel-details">
                    <small>LinkedIn</small>
                    <strong><a href="https://linkedin.com/company/stoccoz" target="_blank" rel="noopener noreferrer">linkedin.com/company/stoccoz</a></strong>
                  </div>
                </div>
              </div>

              <!-- 3 Floating Badges along Curved Connection Path -->
              <div class="about-nodes-container" aria-label="Core operational pillars">
                <svg class="nodes-curved-arc" viewBox="0 0 160 280" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M 30 20 Q 90 140 30 260" stroke="#E2E8F0" stroke-width="1.8" stroke-dasharray="4 4" />
                  <circle cx="30" cy="20" r="4.5" fill="#FFC400" stroke="#FFFFFF" stroke-width="2" />
                  <circle cx="75" cy="140" r="4.5" fill="#FFC400" stroke="#FFFFFF" stroke-width="2" />
                  <circle cx="30" cy="260" r="4.5" fill="#FFC400" stroke="#FFFFFF" stroke-width="2" />
                </svg>

                <div class="about-node-item node-warehouse">
                  <div class="node-icon-box">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#08122d" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 10L12 3l9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10z" />
                      <rect x="9" y="13" width="6" height="8" fill="#FFC400" stroke="#08122d" stroke-width="1.8" />
                    </svg>
                  </div>
                  <span class="node-label">Warehouse<br />Management</span>
                </div>

                <div class="about-node-item node-fleet">
                  <div class="node-icon-box">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#08122d" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="7" r="4" fill="#FFEAA0" />
                      <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2" fill="#FFC400" stroke="#08122d" />
                      <path d="M8 7h8" stroke="#08122d" stroke-width="2" />
                    </svg>
                  </div>
                  <span class="node-label">Drivers &amp;<br />Fleet</span>
                </div>

                <div class="about-node-item node-inventory">
                  <div class="node-icon-box">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#08122d" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 8l-9-5-9 5 9 5 9-5z" fill="#FFEAA0" />
                      <path d="M3 8v8l9 5 9-5V8" />
                      <path d="M12 13v8" />
                      <path d="M7.5 5.5l9 5" stroke="#FFC400" stroke-width="2.5" />
                    </svg>
                  </div>
                  <span class="node-label">Inventory &amp;<br />Distribution</span>
                </div>
              </div>
            </div>

            <!-- Right Column: High-Impact Contact / Demo Form -->
            <div class="about-right-col">
              <div class="get-in-touch-card">
                <h3 class="card-main-title">Send Us a Message</h3>
                <p class="card-subtitle">
                  Fill in your details and our warehouse ERP specialists will get back to you within 24 hours.
                </p>

                @if (submitted()) {
                  <div class="form-success-banner" role="alert">
                    <span class="success-icon">✓</span>
                    <div>
                      <strong>Thank you! Your message has been sent.</strong>
                      <p>Our team will reach out to you within 24 hours.</p>
                    </div>
                  </div>
                }

                <form class="about-contact-form" (submit)="onSubmit($event)">
                  <div class="form-row-2">
                    <div class="form-field">
                      <label for="fname">First name <em>*</em></label>
                      <input id="fname" type="text" required placeholder="Enter your first name" />
                    </div>
                    <div class="form-field">
                      <label for="lname">Last name <em>*</em></label>
                      <input id="lname" type="text" required placeholder="Enter your last name" />
                    </div>
                  </div>

                  <div class="form-field">
                    <label for="email">Work email <em>*</em></label>
                    <div class="input-with-icon">
                      <span class="input-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </span>
                      <input id="email" type="email" required placeholder="name&#64;company.com" />
                    </div>
                  </div>

                  <div class="form-row-2">
                    <div class="form-field">
                      <label for="cname">Company name</label>
                      <div class="input-with-icon">
                        <span class="input-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="4" y="2" width="16" height="20" rx="2" />
                            <path d="M9 22v-4h6v4" />
                            <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
                          </svg>
                        </span>
                        <input id="cname" type="text" placeholder="Your company" />
                      </div>
                    </div>

                    <div class="form-field">
                      <label for="phone">Phone number</label>
                      <div class="input-with-icon phone-input-group">
                        <span class="input-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </span>
                        <div class="country-prefix">+91 <span>⌄</span></div>
                        <input id="phone" type="tel" placeholder="96335 42550" />
                      </div>
                    </div>
                  </div>

                  <div class="form-field">
                    <label for="message">How can we help? <em>*</em></label>
                    <textarea id="message" required rows="4" placeholder="Tell us about your requirements, questions, or request a live demo..."></textarea>
                  </div>

                  <div class="form-checkbox-field">
                    <label class="checkbox-container">
                      <input type="checkbox" required />
                      <span class="checkbox-custom"></span>
                      <span class="checkbox-text">
                        I agree to the <a href="#privacy">Privacy Policy</a> and <a href="#terms">Terms of Service</a>.
                      </span>
                    </label>
                  </div>

                  <button type="submit" class="button-submit-send">
                    Send Message <span>→</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="about-parallax-bg-wrapper" style="display: none;" aria-hidden="true">
        <iframe
          class="about-parallax-bg-iframe"
          src="/assets/forklift-van-animation.html"
          title="Forklift loading van auto-playing parallax animation background"
          loading="lazy"
          scrolling="no"
          tabindex="-1"
        ></iframe>
      </div>
    </div>
  `
})
export class AboutPageComponent implements AfterViewInit, OnDestroy {
  submitted = signal(false);
  private rafId: number | null = null;
  private pointerHandler: ((e: PointerEvent) => void) | null = null;
  private scrollHandler: (() => void) | null = null;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const heroEl = this.el.nativeElement.querySelector('.about-hero-section');
    if (!heroEl) return;
    const items = Array.from(heroEl.querySelectorAll('[data-depth],[data-scroll]')) as HTMLElement[];
    if (!items.length) return;

    let tx = 0, ty = 0, mx = 0, my = 0, sy = 0;
    this.pointerHandler = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    this.scrollHandler = () => {
      sy = Math.min(window.scrollY, window.innerHeight * 1.2);
    };

    window.addEventListener('pointermove', this.pointerHandler, { passive: true });
    window.addEventListener('scroll', this.scrollHandler, { passive: true });

    const tick = () => {
      mx += (tx - mx) * 0.07;
      my += (ty - my) * 0.07;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const d = parseFloat(item.dataset['depth'] || '0');
        const s = parseFloat(item.dataset['scroll'] || '0');
        item.style.transform = `translate3d(${(-mx * d * 22).toFixed(2)}px, ${(-my * d * 14 + sy * s).toFixed(2)}px, 0)`;
      }
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  ngOnDestroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.pointerHandler && typeof window !== 'undefined') {
      window.removeEventListener('pointermove', this.pointerHandler);
    }
    if (this.scrollHandler && typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.submitted.set(true);
  }
}

