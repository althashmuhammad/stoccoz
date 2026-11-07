import { Component, ElementRef, ViewChild, afterNextRender, signal, output, OnDestroy } from '@angular/core';

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

          <!-- Right Column: Seamless Integrated Media Stage (Plays every 10s & on hover) -->
          <div class="three-pl-visual-col">
            <div
              class="three-pl-media-stage"
              (mouseenter)="onStageHover()"
              (click)="onStageHover()"
            >
              <!-- Base Still Image: Always in DOM, zero flicker, instantaneous paint -->
              <img
                src="/assets/three-pl-hub.jpg"
                alt="Third-Party Logistics operations hub with delivery vehicles and docking bays"
                class="three-pl-still-img"
                loading="eager"
                decoding="sync"
              />

              <!-- Overlaid Video: Plays every 10s and on hover, smooth zero-flash fade -->
              <video
                #videoPlayer
                class="three-pl-video-element"
                [class.is-playing]="videoPlaying()"
                src="/assets/three-pl-animation.mp4"
                poster="/assets/three-pl-hub.jpg"
                muted
                playsinline
                preload="auto"
                [loop]="false"
                (playing)="onVideoPlaying()"
                (ended)="onVideoEnded()"
                (pause)="onVideoPause()"
              ></video>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ThreePlIntroComponent implements OnDestroy {
  navigateExplore = output<void>();

  @ViewChild('sectionRef') sectionRef?: ElementRef<HTMLElement>;
  @ViewChild('videoPlayer') videoPlayer?: ElementRef<HTMLVideoElement>;

  videoPlaying = signal<boolean>(false);
  private intervalId: any = null;
  private isVisible = false;
  private cleanupObserver: (() => void) | null = null;

  constructor() {
    afterNextRender(() => {
      this.initIntersectionPlayback();
    });
  }

  playVideo() {
    const video = this.videoPlayer?.nativeElement;
    if (!video) return;
    try {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } catch {}
  }

  onStageHover() {
    this.playVideo();
    this.restartInterval();
  }

  onVideoPlaying() {
    this.videoPlaying.set(true);
  }

  onVideoEnded() {
    // Smoothly fade video out so base image shows cleanly
    this.videoPlaying.set(false);
  }

  onVideoPause() {
    if (this.videoPlayer?.nativeElement?.ended) {
      this.videoPlaying.set(false);
    }
  }

  private startInterval() {
    this.stopInterval();
    this.intervalId = setInterval(() => {
      if (this.isVisible) {
        this.playVideo();
      }
    }, 10000);
  }

  private stopInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private restartInterval() {
    this.startInterval();
  }

  private initIntersectionPlayback() {
    if (typeof window === 'undefined') return;

    if ('IntersectionObserver' in window && this.sectionRef?.nativeElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.isVisible = true;
              this.playVideo();
              this.startInterval();
            } else {
              this.isVisible = false;
              this.stopInterval();
              const video = this.videoPlayer?.nativeElement;
              if (video && !video.paused) {
                video.pause();
                this.videoPlaying.set(false);
              }
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(this.sectionRef.nativeElement);
      this.cleanupObserver = () => observer.disconnect();
    } else {
      this.isVisible = true;
      this.playVideo();
      this.startInterval();
    }
  }

  onExploreClick(e: Event) {
    e.preventDefault();
    window.location.hash = '#explore-3pl';
    this.navigateExplore.emit();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  ngOnDestroy() {
    this.stopInterval();
    if (this.cleanupObserver) {
      this.cleanupObserver();
    }
  }
}
