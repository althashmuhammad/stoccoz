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

          <!-- Right Column: Seamless Integrated Media Stage (No card frame, No border, No shadow) -->
          <div class="three-pl-visual-col">
            <div class="three-pl-media-stage">
              <!-- Base Still Image: Always in DOM, zero flicker, instantaneous paint -->
              <img
                src="/assets/three-pl-hub.jpg"
                alt="Third-Party Logistics operations hub with delivery vehicles and docking bays"
                class="three-pl-still-img"
                loading="eager"
                decoding="sync"
              />

              <!-- Overlaid Video: Initialized silently, fades in only when active frames render, fades out on end -->
              @if (!videoEnded()) {
                <video
                  #videoPlayer
                  class="three-pl-video-element"
                  [class.is-playing]="videoPlaying() && !videoEnded()"
                  src="/assets/three-pl-animation.mp4"
                  poster="/assets/three-pl-hub.jpg"
                  muted
                  playsinline
                  preload="auto"
                  [loop]="false"
                  (playing)="onVideoPlaying()"
                  (ended)="onVideoEnded()"
                ></video>
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

  videoPlaying = signal<boolean>(false);
  videoEnded = signal<boolean>(false);
  private hasPlayed = false;

  constructor() {
    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem('stoccoz_3pl_video_played') === 'true') {
        this.videoEnded.set(true);
        this.hasPlayed = true;
      }
    } catch {}

    afterNextRender(() => {
      this.initIntersectionPlayback();
    });
  }

  onVideoPlaying() {
    if (!this.videoEnded()) {
      this.videoPlaying.set(true);
    }
  }

  onVideoEnded() {
    // Smoothly fade video out to show underlying base image with zero flash
    this.videoPlaying.set(false);
    setTimeout(() => {
      this.videoEnded.set(true);
      try {
        sessionStorage.setItem('stoccoz_3pl_video_played', 'true');
      } catch {}
    }, 350);
  }

  onExploreClick(e: Event) {
    e.preventDefault();
    try {
      sessionStorage.setItem('stoccoz_3pl_video_played', 'true');
    } catch {}
    window.location.hash = '#explore-3pl';
    this.navigateExplore.emit();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  private initIntersectionPlayback() {
    if (typeof window === 'undefined') return;
    if (this.videoEnded()) return;

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
