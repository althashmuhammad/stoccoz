import { Component } from '@angular/core';
import { GeometricGridBackgroundComponent } from '../geometric-grid-background/geometric-grid-background.component';
import { LineIconComponent } from '../line-icon/line-icon.component';

@Component({
  selector: 'app-connected-operations',
  standalone: true,
  imports: [GeometricGridBackgroundComponent, LineIconComponent],
  template: `
    <section class="connected section-shell" id="about" data-reveal>
      <app-geometric-grid-background></app-geometric-grid-background>
      <p class="eyebrow">One platform. Every operation.</p>
      <h2>One connected operation.<br /><em>A clearer view of everything.</em></h2>
      <p class="section-lead">Bring warehouse, field sales and customer operations into one connected flow.</p>
      <div class="connected-map">
        <svg class="connection-lines" viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true">
          <path class="connection-line-base" d="M500 210 245 80" />
          <path class="connection-line-base" d="M500 210 755 80" />
          <path class="connection-line-base" d="M500 210 245 340" />
          <path class="connection-line-base" d="M500 210 755 340" />
          <path class="connection-line-glow glow-one" d="M500 210 245 80" />
          <path class="connection-line-glow glow-two" d="M500 210 755 80" />
          <path class="connection-line-glow glow-three" d="M500 210 245 340" />
          <path class="connection-line-glow glow-four" d="M500 210 755 340" />
        </svg>
        <div class="connection-mark">
          <img src="/assets/stoccoz-mark.png" alt="Stoccoz" />
        </div>
        @for (item of items; track item[0]; let idx = $index) {
          <article [class]="'connection connection-' + (idx + 1)">
            <span><app-line-icon [name]="idx % 2 ? 'chart' : 'boxes'"></app-line-icon></span>
            <div>
              <h3>{{ item[0] }}</h3>
              <p>{{ item[1] }}</p>
            </div>
          </article>
        }
      </div>
    </section>
  `
})
export class ConnectedOperationsComponent {
  items = [
    ['Centralized visibility', 'See inventory, sales and fulfilment together.'],
    ['Connected teams', 'Keep the warehouse and field synchronized.'],
    ['Faster decisions', 'Act on clear operational data in real time.'],
    ['Scalable operations', 'Grow locations, clients and routes with confidence.'],
  ];
}
