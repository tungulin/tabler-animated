---
name: animated-icon
description: Use when adding a new animated React icon component to this repo's icon library (packages/core/src/icons). Covers naming the icon after its Tabler (tabler.io/icons) counterpart with an "Icon" suffix, the motion/react hover + imperative-ref animation pattern, and registering the export. Triggers on "add icon", "new icon", "animate icon", "create icon component".
---

# Writing an animated icon for tabler-animated

This repo re-implements Tabler icons (https://tabler.io/icons) as animated React
components. Every icon plays a short animation on hover, and can also be
triggered imperatively via a ref (`icon.current.startAnimation()`), which is how
`packages/docs/app/_components/icon-card.tsx` drives it with `useHover`.

## 1. Naming

- **File name**: the icon's exact kebab-case name from tabler.io/icons, e.g.
  `brand-github`, `ease-in-out-control-points`, `bell`.
  Path: `packages/core/src/icons/<name>.tsx`
- **Component name**: PascalCase the kebab-case name, then append `Icon`.
  - `bell` → `BellIcon`
  - `brand-github` → `BrandGithubIcon`
  - `ease-in-out-control-points` → `EaseInOutControlPointsIcon`
- Do **not** prefix the file with `icon-` (see `icon-star.tsx` in this repo —
  that's a naming mistake, not a pattern to copy; the tabler icon is just
  `star`, so it should have been `star.tsx` / `StarIcon`).

## 2. Get the source SVG

Find the icon on tabler.io/icons (outline variant) and copy its `<path>`
(and `<circle>`/`<rect>` if any) data. It's always a 24x24 viewBox, stroke-based
icon with a hidden hit-area path `<path stroke='none' d='M0 0h24v24H0z' fill='none' />`
first. If a static (non-animated) version already exists in this repo
(`check.tsx`, `copy.tsx`, `brand-github.tsx`), reuse its paths as-is instead of
re-copying from tabler.

## 3. Design the animation

Pick 1–3 elements worth animating — don't animate everything. Look at existing
icons for the vocabulary of motion already used here:

- **Whole-icon gesture** (`bell.tsx`): wrap the `<svg>` itself in `motion.svg`
  and animate a property like `rotate` as a keyframe array for a shake/wobble.
- **Single-part transform** (`contrast.tsx`): turn one `<path>` into
  `motion.path` and animate `rotate` around a `transformOrigin`, using a
  spring transition for a snappy feel.
- **Draw-in stagger** (`ease-in-out-control-points.tsx`): animate
  `pathLength`/`opacity`/`pathOffset` from 0→1 on multiple `motion.path`/
  `motion.circle` elements, staggering each one's `transition.delay` (e.g. a
  `CALCULATE_DELAY(i)` helper) so the shape appears to draw itself.

Define each animated element's states as a `Variants` object with exactly two
keys, `normal` and `animate` — nothing else references these names.

## 4. Component template

```tsx
'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import type { IconHandle, IconProps } from '../types';

const SOME_PART_VARIANTS: Variants = {
  normal: { /* resting state */ },
  animate: { /* keyframes / target state */ }
};

const <ComponentName> = forwardRef<IconHandle, IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal')
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start('animate');
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start('normal');
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={size}
          height={size}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          {/* static paths stay plain <path> */}
          <motion.path
            animate={controls}
            initial='normal'
            d='...'
            variants={SOME_PART_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

<ComponentName>.displayName = '<ComponentName>';

export { <ComponentName> };
```

Notes on the template — these are load-bearing, not style choices:

- `isControlledRef` flips to `true` the moment a consumer takes a `ref`. That
  is what makes hover a no-op once something calls `startAnimation`/
  `stopAnimation` directly, and is why `onMouseEnter`/`onMouseLeave` are still
  forwarded to props in that branch instead of being swallowed.
- `size` defaults to `28` (not `24`) for animated icons — matches every
  existing animated icon in this repo.
- Only the parts you're animating become `motion.*` with
  `animate={controls} initial='normal' variants={...}`. Everything else
  (background hit-area path, unanimated strokes) stays a plain element.
- `displayName` must equal the exported component name exactly, including the
  `Icon` suffix (`ease-in-out-control-points.tsx` currently sets it to
  `'EaseInOutControlPoints'` without the suffix — that's a bug, don't copy it).

## 5. Register the export

Add a line to `packages/core/src/index.ts`:

```ts
export { <ComponentName> } from './icons/<name>';
```

Double-check the symbol you export here is the **exact** name the icon file
exports. This file currently has two stale entries that don't match their
file's real export (`EaseInOutControlPoints` should be
`EaseInOutControlPointsIcon`, `IconStar` should be `StarIcon`) — that's an
existing bug to be aware of, not a precedent to follow.

## 6. Checklist

- [ ] File at `packages/core/src/icons/<tabler-kebab-name>.tsx`
- [ ] Component name is `PascalCase(name) + 'Icon'`
- [ ] `'use client'` at the top of the file
- [ ] `forwardRef<IconHandle, IconProps>`, hover handlers, imperative handle — copied from the template, not reinvented
- [ ] Only meaningful parts are animated; everything else stays static
- [ ] `displayName` === exported component name
- [ ] Named export (no default export)
- [ ] Added to `packages/core/src/index.ts` with the matching symbol name
