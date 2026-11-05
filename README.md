# Stoccoz — Angular Conversion

This is an exact, 1:1 conversion of the Stoccoz React website to modern **Angular 19** using Standalone Components, Signals, and the native Control Flow syntax (`@if`, `@for`, `@switch`).

## What's Included

- **Standalone Angular Architecture**: No `NgModule` boilerplate. Every component is standalone and tree-shakeable.
- **Angular Signals**: Replaced React `useState` hooks with Angular `signal()` and `computed()` for clean reactivity.
- **High-Performance RAF Scroll & Tilt**: Replicated the smooth lerp requestAnimationFrame loops, 3D tilt pointer trackers, IntersectionObserver reveals, and iframe postMessage bridges.
- **Full Static Assets**: All assets, images, and embedded iframe experiences (`warehouse-approach.html`, `vansales-scroll-reveal.html`) are in `public/assets/` and `src/assets/`.
- **CSS & Design Tokens**: Full Tailwind CSS and custom properties matching the original design system.

## Project Structure

```text
angular-stoccoz/
├── public/
│   ├── assets/                 # SVGs, images, and iframe HTML experiences
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── connected-operations/
│   │   │   ├── footer/
│   │   │   ├── hero/
│   │   │   ├── line-icon/
│   │   │   ├── navbar/
│   │   │   ├── supporting-sections/
│   │   │   ├── vansales-transition/
│   │   │   ├── warehouse-capabilities/
│   │   │   └── warehouse-intro/
│   │   ├── app.component.html
│   │   └── app.component.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
└── tsconfig.json
```

## Getting Started

1. **Navigate to the Angular folder**:
   ```bash
   cd angular-stoccoz
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run development server**:
   ```bash
   npm start
   # or
   ng serve
   ```
   Open `http://localhost:4200` in your browser.

4. **Production Build**:
   ```bash
   npm run build
   ```
   The compiled output will be generated in `dist/stoccoz-angular`.

