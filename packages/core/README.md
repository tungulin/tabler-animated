<div align="center">
  <img src="packages/docs/public/logo-fill.png" alt="tabler-animated logo" width="120" />
</div>

<h1 align="center">tabler-animated</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/tabler-animated"><img src="https://img.shields.io/npm/v/tabler-animated" alt="NPM version" /></a>
  <a href="https://github.com/tungulin/tabler-animated/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/tabler-animated" alt="License" /></a>
  <a href="https://github.com/tungulin/tabler-animated"><img src="https://img.shields.io/github/stars/tungulin/tabler-animated?style=social" alt="Join the community on GitHub" /></a>
</p>

<p align="center">
  tabler-animated re-implements the <a href="https://tabler.io/icons">Tabler</a> icon set as drop-in animated React components. Every icon plays a short, buttery-smooth animation on hover - powered by <a href="https://motion.dev">Motion</a> - and can also be triggered imperatively via a ref. Open-source, tree-shakeable, and ready to ship 📦.
</p>

## Documentation

Visit https://tabler-animated-docs.vercel.app/ to browse every icon and view the full documentation.

## Getting Started

```bash
npm install tabler-animated
```

```tsx
import { IconHeart } from 'tabler-animated';

const App = () => {
  return <IconHeart size={32} />;
};
```

Hovering the icon plays its animation automatically - no extra setup required.

## Imperative control

Every icon also exposes a ref handle, so you can trigger the animation yourself (loop it, play it on mount, sync it to some other event, etc.):

```tsx
import { useEffect, useRef } from 'react';
import { IconHeart, type IconHandle } from 'tabler-animated';

const App = () => {
  const iconRef = useRef<IconHandle>(null);

  useEffect(() => {
    iconRef.current?.startAnimation();
  }, []);

  return <IconHeart ref={iconRef} size={32} />;
};
```

## Contributing

Contributions are always welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to report issues, set up the project locally, and add a new icon.
