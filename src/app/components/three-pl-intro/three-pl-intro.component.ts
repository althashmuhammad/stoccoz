import { Component, ElementRef, ViewChild, afterNextRender, signal, output } from '@angular/core';

@Component({
  selector: 'app-three-pl-intro',
  standalone: true,
  template: `
    <section class="three-pl-intro-section" id="three-pl-intro" #sectionRef data-reveal>
      <div class="three-pl-intro-shell">
        <!-- Top Centered Eyebrow / Section Title -->
        <div class="three-pl-header-center">
          <h2 class="three-pl-center-eyebrow">
            Third-Party Logistics <span class="highlight-yellow">Operations</span>
          </h2>
        </div>

        <!-- 2-Column Content Row -->
        <div class="three-pl-content-row">
          <!-- Left Column: Copy & Explore CTA -->
          <div class="three-pl-copy-col">
            <h3 class="three-pl-main-heading">
              From Inbound to<br />
              Delivery. Every Step<br />
              Connected.
            </h3>
            <p class="three-pl-lead-text">
              Manage the complete third-party logistics lifecycle with one connected platform. From client onboarding and warehouse receiving to order fulfilment, delivery, returns, and automated billing — every operation is tracked, traceable, and connected.
            </p>
            <div class="three-pl-action-wrap">
              <a
                href="#explore-3pl"
                class="three-pl-explore-btn"
                (click)="onExploreClick($event)"
              >
                Explore 3PL
              </a>
            </div>
          </div>

          <!-- Right Column: Visual Stage (Video plays once -> still image) -->
          <div class="three-pl-visual-col">
            <div class="three-pl-media-card">
              @if (!videoEnded()) {
                <video
                  #videoPlayer
                  class="three-pl-video-element"
                  src="/assets/three-pl-animation.mp4"
                  poster="/assets/three-pl-hub.jpg"
                  muted
                  playsinline
                  [loop]="false"
                  (ended)="onVideoEnded()"
                ></video>
              } @else {
                <img
                  src="/assets/three-pl-hub.jpg"
                  alt="Third-Party Logistics operations hub with delivery vehicles and docking bays"
                  class="three-pl-still-img"
                />
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ThreePlIntroComponent {
  navigateExplore = output<void>();

  @ViewChild('sectionRef') sectionRef?: ElementRef<HTMLElement>;
  @ViewChild('videoPlayer') videoPlayer?: ElementRef<HTMLVideoElement>;

  videoEnded = signal<boolean>(false);
  private hasPlayed = false;

  constructor() {
    afterNextRender(() => {
      this.initIntersectionPlayback();
    });
  }

  onVideoEnded() {
    this.videoEnded.set(true);
  }

  onExploreClick(e: Event) {
    e.preventDefault();
    window.location.hash = '#explore-3pl';
    this.navigateExplore.emit();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private initIntersectionPlayback() {
    if (typeof window === 'undefined') return;

    if ('IntersectionObserver' in window && this.sectionRef?.nativeElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.hasPlayed && !this.videoEnded()) {
              this.hasPlayed = true;
              if (this.videoPlayer?.nativeElement) {
                this.videoPlayer.nativeElement.play().catch(() => {
                  // Fallback if browser policy blocks autoplay
                });
              }
              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(this.sectionRef.nativeElement);
    } else {
      // Fallback: autoplay if observer not available
      if (this.videoPlayer?.nativeElement) {
        this.videoPlayer.nativeElement.play().catch(() => {});
      }
    }
  }
}

