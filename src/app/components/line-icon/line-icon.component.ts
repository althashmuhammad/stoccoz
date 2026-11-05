import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-line-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      @switch (name) {
        @case ('warehouse') {
          <path d="M3 10 12 4l9 6v10H3Z" />
          <path d="M7 20v-6h10v6M7 10h2m3 0h2m3 0h1" />
        }
        @case ('van') {
          <path d="M3 7h11v10H3zM14 10h4l3 4v3h-7z" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
        }
        @case ('chart') {
          <path d="M4 20V9m5 11V4m6 16v-7m5 7V7" />
        }
        @case ('order') {
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 8h6M9 12h6M9 16h4" />
        }
        @case ('user') {
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c1-5 4-7 8-7s7 2 8 7" />
        }
        @case ('route') {
          <circle cx="5" cy="18" r="2" />
          <circle cx="19" cy="6" r="2" />
          <path d="M7 18c7 0 2-12 10-12" />
        }
        @case ('payment') {
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <path d="M3 10h18M7 15h4" />
        }
        @default {
          <!-- boxes -->
          <path d="m12 3 8 4-8 4-8-4zM4 7v9l8 5 8-5V7M12 11v10" />
        }
      }
    </svg>
  `
})
export class LineIconComponent {
  @Input() name: string = 'boxes';
}

