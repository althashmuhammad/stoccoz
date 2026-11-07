import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-book-demo-page',
  standalone: true,
  template: `
    <div class="demo-page-root" id="demo">
      <div class="demo-page-container">
        <div class="about-shell demo-shell">
          <!-- Left Column: Contact Channels & Context -->
          <div class="about-left-col">
            <p class="about-eyebrow-simple">GET IN TOUCH</p>

            <h1 class="about-main-headline">
              We’d love to<br />
              hear from you.
            </h1>

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

          <!-- Right Column: Contact / Demo Form (Image 2 Reference) -->
          <div class="about-right-col">
            <div class="get-in-touch-card">
              <h2 class="card-main-title">Send Us a Message</h2>
              <p class="card-subtitle">
                Fill in your details and our warehouse ERP specialists will get back to you within 24 hours.
              </p>

              @if (submitted()) {
                <div class="form-success-banner" role="alert">
                  <span class="success-icon">✓</span>
                  <div>
                    <strong>Thank you! Your demo request has been received.</strong>
                    <p>Our warehouse ERP specialists will reach out to you within 24 hours.</p>
                  </div>
                </div>
              }

              <form class="about-contact-form" (submit)="onSubmit($event)">
                <div class="form-row-2">
                  <div class="form-field">
                    <label for="demo-fname">First name *</label>
                    <input id="demo-fname" type="text" required placeholder="Enter your first name" />
                  </div>
                  <div class="form-field">
                    <label for="demo-lname">Last name *</label>
                    <input id="demo-lname" type="text" required placeholder="Enter your last name" />
                  </div>
                </div>

                <div class="form-field">
                  <label for="demo-email">Work email *</label>
                  <input id="demo-email" type="email" required placeholder="Enter your work email" />
                </div>

                <div class="form-row-2">
                  <div class="form-field">
                    <label for="demo-cname">Company name</label>
                    <input id="demo-cname" type="text" placeholder="Your company" />
                  </div>

                  <div class="form-field">
                    <label for="demo-phone">Phone number</label>
                    <input id="demo-phone" type="tel" placeholder="Enter phone number" />
                  </div>
                </div>

                <div class="form-field">
                  <label for="demo-message">How can we help? *</label>
                  <textarea id="demo-message" required rows="4" placeholder="Tell us about your requirements, questions, or request a live demo..."></textarea>
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
      </div>
    </div>
  `
})
export class BookDemoPageComponent {
  submitted = signal(false);

  onSubmit(e: Event) {
    e.preventDefault();
    this.submitted.set(true);
  }
}

