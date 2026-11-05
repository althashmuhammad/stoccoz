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
        <!-- ABOUT US ACCORDION SECTION (Mission & Vision, Who We Are, Expertise, Why Choose Us, Commitment) -->
        <section class="about-container about-accordion-section">
          <div class="about-header-centered">
            <div class="about-pill-tag">
              <span>ABOUT STOCCOZ ERP</span>
            </div>
            <h2 class="about-title-large">
              Empowering Modern Warehouses<br />
              with <span class="highlight-gold">Intelligent ERP</span>
            </h2>
            <p class="about-desc-lead">
              Transforming logistics, distribution, and supply chain operations through cloud-native automation.
            </p>
          </div>

          <div class="about-accordion" role="tablist" aria-label="About Stoccoz Overview">
            <!-- 1. Our Mission & Vision -->
            <div class="about-accordion-item" [class.is-active]="activeAccordion() === 'mission'">
              <button
                type="button"
                class="about-accordion-trigger"
                (click)="toggleAccordion('mission')"
                [attr.aria-expanded]="activeAccordion() === 'mission'"
              >
                <h3 class="about-accordion-heading">Our Mission &amp; Vision</h3>
                <span class="about-accordion-chevron" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>

              @if (activeAccordion() === 'mission') {
                <div class="about-accordion-body">
                  <p>
                    At Stoccoz, we are dedicated to revolutionizing distribution and warehouse management through intelligent, cloud-native ERP solutions.
                  </p>
                  <p>
                    Our mission is to empower growing trade, wholesale, and van sales enterprises with technology that simplifies complex logistics, eliminates stock leakage, and powers profitable growth.
                  </p>
                </div>
              }
            </div>

            <!-- 2. Who We Are -->
            <div class="about-accordion-item" [class.is-active]="activeAccordion() === 'who'">
              <button
                type="button"
                class="about-accordion-trigger"
                (click)="toggleAccordion('who')"
                [attr.aria-expanded]="activeAccordion() === 'who'"
              >
                <h3 class="about-accordion-heading">Who We Are</h3>
                <span class="about-accordion-chevron" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>

              @if (activeAccordion() === 'who') {
                <div class="about-accordion-body">
                  <p>
                    Stoccoz is a leading provider of comprehensive ERP solutions specifically designed for modern warehouse management. Founded with a vision to transform how businesses handle inventory, sales, purchases, and production, we’ve built a platform that combines powerful automation with intuitive design.
                  </p>
                  <p>
                    Our team consists of experienced developers, logistics experts, and business strategists who understand the unique challenges faced by warehouse operations. We’re committed to continuous innovation and customer success.
                  </p>
                </div>
              }
            </div>

            <!-- 3. Our Expertise -->
            <div class="about-accordion-item" [class.is-active]="activeAccordion() === 'expertise'">
              <button
                type="button"
                class="about-accordion-trigger"
                (click)="toggleAccordion('expertise')"
                [attr.aria-expanded]="activeAccordion() === 'expertise'"
              >
                <h3 class="about-accordion-heading">Our Expertise</h3>
                <span class="about-accordion-chevron" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>

              @if (activeAccordion() === 'expertise') {
                <div class="about-accordion-body">
                  <p>
                    We specialize in end-to-end warehouse automation, real-time inventory tracking, procurement workflows, production management, and multi-warehouse distribution.
                  </p>
                  <p>
                    Our cloud-native architecture delivers seamless van-route stock sync, automated reordering, and deep business analytics to eliminate operational bottlenecks and elevate fulfillment accuracy.
                  </p>
                </div>
              }
            </div>

            <!-- 4. Why Choose Stoccoz -->
            <div class="about-accordion-item" [class.is-active]="activeAccordion() === 'why'">
              <button
                type="button"
                class="about-accordion-trigger"
                (click)="toggleAccordion('why')"
                [attr.aria-expanded]="activeAccordion() === 'why'"
              >
                <h3 class="about-accordion-heading">Why Choose Stoccoz</h3>
                <span class="about-accordion-chevron" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>

              @if (activeAccordion() === 'why') {
                <div class="about-accordion-body">
                  <p>
                    With over 500+ active users trusting Stoccoz for their warehouse operations, we deliver an enterprise-grade platform that combines intuitive design with bank-grade security.
                  </p>
                  <p>
                    Our 99.9% uptime guarantee, regular feature rollouts, and 24/7 dedicated support ensure your supply chain operates without interruption.
                  </p>
                </div>
              }
            </div>

            <!-- 5. Our Commitment -->
            <div class="about-accordion-item" [class.is-active]="activeAccordion() === 'commitment'">
              <button
                type="button"
                class="about-accordion-trigger"
                (click)="toggleAccordion('commitment')"
                [attr.aria-expanded]="activeAccordion() === 'commitment'"
              >
                <h3 class="about-accordion-heading">Our Commitment</h3>
                <span class="about-accordion-chevron" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>

              @if (activeAccordion() === 'commitment') {
                <div class="about-accordion-body">
                  <p>
                    We are committed to continuous innovation, unwavering system reliability, and customer success. Complex logistics deserve clean, transparent solutions.
                  </p>
                  <p>
                    We design our platform to be powerful yet effortless to adopt, ensuring rapid time-to-value, zero stock leakage, and sustained growth for your business.
                  </p>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- 5. GET IN TOUCH / CONTACT FORM -->
        <section class="about-container" id="contact">
          <div class="about-shell">
            <!-- Left Column: Contact Channels & Context -->
            <div class="about-left-col">
              <p class="about-eyebrow-simple">GET IN TOUCH</p>

              <h2 class="about-main-headline">
                We’d love to<br />
                hear from you.
              </h2>

              <p class="about-lead-copy">
                Whether you have questions about our platform, need support, or want to discuss how Stoccoz can transform your warehouse operations, we’re here to help.
              </p>

              <!-- Direct Reach Channels -->
              <div class="about-contact-channels">
                <div class="about-channel-row">
                  <div class="about-channel-icon-box" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div class="about-channel-details">
                    <small>EMAIL</small>
                    <strong><a href="mailto:info@stoccoz.com">info&#64;stoccoz.com</a></strong>
                  </div>
                </div>

                <div class="about-channel-row">
                  <div class="about-channel-icon-box" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div class="about-channel-details">
                    <small>PHONE</small>
                    <strong><a href="tel:+919633542550">+91 9633542550</a></strong>
                  </div>
                </div>

                <div class="about-channel-row">
                  <div class="about-channel-icon-box" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </div>
                  <div class="about-channel-details">
                    <small>LINKEDIN</small>
                    <strong><a href="https://linkedin.com/company/stoccoz" target="_blank" rel="noopener noreferrer">linkedin.com/company/stoccoz</a></strong>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Simple Contact / Demo Form (Exact Reference Design) -->
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
                      <label for="fname">First name *</label>
                      <input id="fname" type="text" required placeholder="Enter your first name" />
                    </div>
                    <div class="form-field">
                      <label for="lname">Last name *</label>
                      <input id="lname" type="text" required placeholder="Enter your last name" />
                    </div>
                  </div>

                  <div class="form-field">
                    <label for="email">Work email *</label>
                    <input id="email" type="email" required placeholder="Enter your work email" />
                  </div>

                  <div class="form-row-2">
                    <div class="form-field">
                      <label for="cname">Company name</label>
                      <input id="cname" type="text" placeholder="Your company" />
                    </div>

                    <div class="form-field">
                      <label for="phone">Phone number</label>
                      <input id="phone" type="tel" placeholder="Enter phone number" />
                    </div>
                  </div>

                  <div class="form-field">
                    <label for="message">How can we help? *</label>
                    <textarea id="message" required rows="4" placeholder="Tell us about your requirements, questions, or request a live demo..."></textarea>
                  </div>

                  <div class="form-checkbox-field">
                    <label class="checkbox-container">
                      <input type="checkbox" required />
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
  activeAccordion = signal<string>('mission');

  toggleAccordion(id: string) {
    this.activeAccordion.update(cur => (cur === id ? '' : id));
  }
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

