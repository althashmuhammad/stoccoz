import { Component, OnDestroy, afterNextRender, ElementRef } from '@angular/core';

interface ClientLogo {
  name: string;
  src: string;
}

interface CellRef {
  box: HTMLElement;
  cur: HTMLElement;
}

@Component({
  selector: 'app-clients',
  standalone: true,
  template: `
    <section class="clients-section section-shell" id="clients" data-reveal>
      <div class="clients-header">
        <div class="clients-eyebrow">
          <span class="eyebrow-dash"></span>
          <span>OUR CLIENTS</span>
          <span class="eyebrow-dash"></span>
        </div>
        <h2>Trusted by <em>Leading Brands</em></h2>
        <p class="clients-lead">
          We are proud to work with innovative companies across various industries,
          helping them grow with reliable and efficient solutions.
        </p>
      </div>

      <!-- 3x2 Matrix Grid with Logo Roll Shuffle Animation -->
      <div
        class="clients-grid"
        (mouseenter)="pauseAutoChange()"
        (mouseleave)="resumeAutoChange()"
      >
        @for (client of visibleClients; track client.name; let idx = $index) {
          <div class="client-card">
            <div class="client-roll-box">
              <div class="client-slide">
                <img [src]="client.src" [alt]="client.name" loading="lazy" />
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  `
})
export class ClientsComponent implements OnDestroy {
  readonly allClients: ClientLogo[] = [
    { name: 'Vajram', src: '/assets/clients/client-vajram.png' },
    { name: 'Milkivia Dairy Products', src: '/assets/clients/client-milkivia.png' },
    { name: 'Green Arch', src: '/assets/clients/client-green-arch.png' },
    { name: 'NPK Bread & Butter', src: '/assets/clients/client-npk.png' },
    { name: 'Faso Bakes', src: '/assets/clients/client-faso-bakes.png' },
    { name: 'Black and White KSA', src: '/assets/clients/client-black-white.png' },
    { name: 'Delight Distributors', src: '/assets/clients/client-delight-distributors.png' },
    { name: 'Milkana', src: '/assets/clients/client-milkana.png' },
    { name: 'Moto Master Car Care', src: '/assets/clients/client-moto-master.png' },
  ];

  readonly visibleClients: ClientLogo[] = this.allClients.slice(0, 6);

  private timer: any = null;
  private isPaused = false;
  private state: number[] = [0, 1, 2, 3, 4, 5];
  private cells: CellRef[] = [];

  constructor(private el: ElementRef) {
    afterNextRender(() => {
      this.initAnimation();
    });
  }

  private initAnimation() {
    const grid = this.el.nativeElement.querySelector('.clients-grid');
    if (!grid) return;

    const boxes = Array.from(grid.querySelectorAll('.client-roll-box')) as HTMLElement[];
    this.cells = boxes.map(box => ({
      box,
      cur: box.querySelector('.client-slide') as HTMLElement
    }));

    this.startLoop();
  }

  private startLoop() {
    this.stopLoop();
    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.shuffle();
      }
    }, 3000);
  }

  private stopLoop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private getNextState(): number[] {
    const total = this.allClients.length;
    const numCells = this.cells.length || 6;
    const currentActive = new Set(this.state);
    
    // Inactive logos that are not currently displayed
    const inactive = [...Array(total).keys()].filter(i => !currentActive.has(i));
    
    // Select candidates: rotate in all inactive logos first, and fill the remaining spots from active ones
    const neededFromActive = numCells - inactive.length;
    const shuffledActive = Array.from(currentActive).sort(() => Math.random() - 0.5);
    const chosenFromActive = shuffledActive.slice(0, Math.max(0, neededFromActive));
    
    const candidateLogos = [...inactive, ...chosenFromActive];
    let nextState = [...candidateLogos];
    let attempts = 0;
    while (attempts < 60) {
      attempts++;
      for (let i = nextState.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nextState[i], nextState[j]] = [nextState[j], nextState[i]];
      }
      if (nextState.every((val, idx) => val !== this.state[idx])) {
        return nextState;
      }
    }
    return nextState;
  }

  private roll(c: number, logoIdx: number, delay: number) {
    const o = this.cells[c];
    if (!o || !o.box || !o.cur) return;

    const dir = Math.random() < 0.5 ? 1 : -1;
    const logo = this.allClients[logoIdx];

    const nxt = document.createElement('div');
    nxt.className = 'client-slide';
    const img = document.createElement('img');
    img.src = logo.src;
    img.alt = logo.name;
    img.loading = 'lazy';
    nxt.appendChild(img);
    nxt.style.transform = `translateY(${dir * 100}%)`;
    o.box.appendChild(nxt);

    const ease = 'cubic-bezier(.7, 0, .2, 1)';
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dur = reduce ? 1 : 900;

    const a = o.cur.animate(
      [
        { transform: 'translateY(0)', filter: 'blur(0)' },
        { transform: `translateY(${-dir * 100}%)`, filter: 'blur(4px)' }
      ],
      { duration: dur, delay, easing: ease, fill: 'both' }
    );

    const b = nxt.animate(
      [
        { transform: `translateY(${dir * 100}%)`, filter: 'blur(4px)' },
        { transform: 'translateY(0)', filter: 'blur(0)' }
      ],
      { duration: dur, delay, easing: ease, fill: 'both' }
    );

    b.onfinish = () => {
      a.cancel();
      b.cancel();
      nxt.style.transform = '';
      if (o.cur && o.cur.parentNode) {
        o.cur.remove();
      }
      o.cur = nxt;
    };
  }

  private shuffle() {
    const nextState = this.getNextState();
    this.state = nextState;
    this.state.forEach((logoIdx, c) => {
      this.roll(c, logoIdx, Math.random() * 600);
    });
  }

  pauseAutoChange() {
    this.isPaused = true;
  }

  resumeAutoChange() {
    this.isPaused = false;
  }

  ngOnDestroy() {
    this.stopLoop();
  }
}
