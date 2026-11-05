import { Component } from '@angular/core';

@Component({
  selector: 'app-warehouse-intro',
  standalone: true,
  template: `
    <section class="warehouse-intro section-shell" id="warehouse" data-reveal>
      <div class="intro-copy">
        <p class="eyebrow">Warehouse management</p>
        <h2 style="font-size: 47px;">Know what you have.<br /><em>Know where it moves.</em></h2>
        <p>Control inventory, purchases, sales orders and stock movement in real time—across every warehouse and location.</p>
        <a class="button button-yellow" href="#inventory">Explore Warehouse <span>→</span></a>
      </div>
      <div class="intro-visual" data-parallax data-tilt>
        <img src="/assets/image_391.png" alt="A modern warehouse aisle rendered in the Stoccoz yellow line-art style" />
      </div>
    </section>
  `
})
export class WarehouseIntroComponent {}

