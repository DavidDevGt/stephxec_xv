# Copilot Instructions

## Project Overview
This is a **React + TypeScript + Vite** event invitation app for a 15th birthday celebration. It features an interactive envelope-to-invitation flow with animations using Framer Motion and Lucide icons.

## Architecture & Data Flow

### Component Hierarchy
```
App.tsx (state manager: isEnvelopeOpen)
├── Envelope.tsx (intro screen, click to open)
└── Invitation.tsx (full invitation details)
```

**Key Pattern**: Uses `AnimatePresence` with `mode="wait"` for smooth transitions between envelope and invitation screens. The App.tsx holds the single state (`isEnvelopeOpen`) that toggles which component renders.

### Data Flow
- **Constants** ([constants.ts](src/constants.ts)): `EVENT_DETAILS` (event info) and `GUEST_INFO` (family name & guest count) are defined here
- **Types** ([types.ts](src/types.ts)): `GuestData` interface and `ThemeColors` enum for type safety
- **Components** consume constants directly (no API calls or context in current design)

## Component Responsibilities

### Envelope.tsx
- **Purpose**: Decorative intro screen with animated envelope that opens on click
- **Key mechanics**: 
  - `rotateX: 180` animation on flap when `isOpening` is true
  - 1200ms delay before calling `onOpen()` callback to let animation complete
  - Wax seal with "XV" (quinceanera age) rendered with absolute positioning
  - Dark burgundy background with texture overlay
- **Customization entry points**: `GUEST_INFO.family`, `GUEST_INFO.passes` shown above envelope

### Invitation.tsx
- **Purpose**: Main content screen after envelope opens
- **Composition**: Multiple sections with staggered animations (fadeInUp variant + staggerContainer)
- **Decorative components** (local to this file):
  - `Butterfly`: Floating animated SVG with infinite y + rotate loop
  - `GoldDivider`: Horizontal separator with gradient and centered star
  - `SubtleGoldPattern`: Background texture overlay (very low opacity)
- **Uses Countdown.tsx** to display days/hours/minutes/seconds until event
- **Icon set**: Uses lucide-react (MapPin, Gift, Gem, Shirt, CircleSlash, Heart, Camera, Star)

### Countdown.tsx
- **Purpose**: Displays time remaining with four time units
- **Logic**: Calculates difference between target date and now, updates every 1000ms
- **Styling**: Circular borders (gold 30% opacity) with serif numbers, Spanish labels

## Styling & Theme

### Tailwind Configuration
Theme colors are used as CSS class names, **not** imported from TypeScript:
- `text-burgundy`, `bg-burgundy` (use #800020)
- `text-gold`, `border-gold` (use #D4AF37)
- `bg-cream` (use #FDFBF7)

**Note**: The TypeScript `ThemeColors` enum exists for documentation but isn't actively used in classes.

### Common Patterns
- Gold dividers with gradient: `bg-gradient-to-r from-transparent via-gold to-transparent`
- Transparency with backdrops: `bg-white/50 backdrop-blur-sm` or `bg-red-900/20`
- Responsive sizing: Use `md:` prefix for tablet+ breakpoints (seen in Countdown)

## Developer Workflows

### Local Setup
```bash
npm install
npm run dev    # Runs Vite dev server on localhost:5173
npm run build  # Builds to dist/ for production
npm run preview # Preview production build locally
```

### Updating Event Details
Edit [constants.ts](src/constants.ts):
- `EVENT_DETAILS.date`: Change event date (triggers countdown recalculation)
- `EVENT_DETAILS.address`: Venue address
- `GUEST_INFO.family`: Family name displayed on envelope
- `GUEST_INFO.passes`: Number of guests (displayed on envelope)

### Adding New Sections
1. Add new content to `Invitation.tsx` inside the `staggerContainer` motion.div
2. Apply `fadeInUp` variant to individual sections for consistent animation
3. Use `Butterfly` or `GoldDivider` for decoration between sections

## Key Dependencies & Patterns

- **framer-motion**: AnimatePresence, motion, Variants, whileInView animations
- **lucide-react**: Icon imports (always plural, e.g., `MapPin`, not `mapPin`)
- **React 19**: Functional components, no class components

## Frontend Best Practices

### Performance Optimization
- **Memoization**: Use `React.memo()` for decorative components (`Butterfly`, `GoldDivider`) that don't depend on parent state changes
- **Animation Performance**: Prefer `transform` and `opacity` in Framer Motion (GPU-accelerated) over layout properties
- **Code Splitting**: Extract decorative SVG components to separate files if they grow beyond 50 lines
- **Image Optimization**: Use SVG inline for icons; external images should use `<picture>` with responsive srcsets for mobile-first design

### Accessibility (a11y)
- **Semantic HTML**: Envelope and Invitation sections use `<motion.div>` correctly; consider `<section>` for major content blocks
- **Color Contrast**: Verify burgundy (#800020) + white text passes WCAG AA (current: 9.4:1 ratio ✓)
- **Animation Preferences**: Add `prefers-reduced-motion` media query to respect user settings—currently ALL animations run unconditionally
- **Keyboard Navigation**: Envelope click handler should respond to `Enter`/`Space` keys, not just clicks
- **Aria Labels**: Countdown timer units ("Días", "Hrs") should have `aria-label` attributes for screen readers

### Type Safety
- **Strict Typing**: Keep `tsconfig.json` settings (`strict: true`); all function props must have explicit types
- **Avoid `any`**: Never use `any` type; use `unknown` with type guards if necessary
- **Interface over Type**: Use `interface` for React component props (e.g., `EnvelopeProps`, `CountdownProps`)

### Component Composition
- **Single Responsibility**: Each component handles one concern (Envelope = open animation, Countdown = timer logic)
- **Extract Magic Numbers**: Define animation durations as constants (`const ENVELOPE_OPEN_DELAY = 1200`)
- **Prop Drilling Avoidance**: Consider Context API if feature branches require passing data through 3+ levels
- **Custom Hooks**: Extract countdown logic into `useCountdown(targetDate)` hook for reusability

### Error Handling
- **Countdown Edge Cases**: Handle `new Date()` parsing errors; validate `EVENT_DETAILS.date` is a valid future date
- **Fallback Content**: If event date is invalid, show error message or hardcoded fallback text
- **Animation Completion**: Ensure `setTimeout` in Envelope.tsx always fires (add cleanup in unmount)

### Code Organization
- **Naming Consistency**: Component names = PascalCase, files = PascalCase, functions/constants = camelCase
- **Export Pattern**: Default exports for components, named exports for utilities/constants
- **File Structure**: Keep decorative components in separate files if reused across multiple pages:
  ```
  src/components/
    ├── decorative/
    │   ├── Butterfly.tsx
    │   ├── GoldDivider.tsx
    │   └── SubtleGoldPattern.tsx
    ├── Envelope.tsx
    ├── Invitation.tsx
    └── Countdown.tsx
  ```

### Responsive Design
- **Mobile-First**: Tailwind approach already correct (mobile → `md:` → larger screens)
- **Touch Targets**: Envelope clickable area should be ≥48px×48px (currently OK with aspect-[4/3])
- **Font Sizing**: Use `text-sm`, `text-base`, `text-lg` instead of hardcoded px; scale with `md:text-xl` for readability on larger screens
- **Viewport Meta**: Verify `index.html` has `<meta name="viewport" content="width=device-width, initial-scale=1">`

### Testing Strategy
- **Unit Tests**: Test Countdown calculation with mocked `Date` using Jest
- **Visual Regression**: Screenshot test key animation milestones (Envelope.tsx at 0%, 50%, 100% open)
- **Accessibility Testing**: Use axe-core or Lighthouse CI in CI/CD pipeline
- **Component Props**: Verify type safety by testing invalid props throw TS errors

### Build & Deployment
- **Bundle Analysis**: Run `vite build` and inspect `dist/` size; aim for <100KB gzip
- **Environment Variables**: If scaling, use `import.meta.env.VITE_*` for API endpoints, not hardcoded URLs
- **Caching Headers**: Deploy with 1-year cache for `dist/assets/*.js`, 24h for `index.html`

## Conventions & Gotchas

1. **Animation Delays**: Envelope open triggers a 1200ms timeout before state change—if changing animation speed, update timeout value
2. **Locale**: Spanish labels (Días, Hrs, Min, Seg) are hardcoded in components
3. **Dark Mode**: No dark mode detected; app assumes light theme
4. **Guest Info**: Currently uses placeholder constants—future enhancement: pass via URL params or API
5. **Responsive**: Mobile-first with `md:` breakpoints; no desktop-specific breakpoints beyond md

## Files NOT to Edit Casually
- `vite.config.ts`: Only modify if changing build/dev settings
- `tsconfig.json`: Strict type checking enabled; don't weaken
- `index.html`: Minimal template, references main.tsx entry point

