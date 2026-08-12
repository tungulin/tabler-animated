> [!NOTE]
> We prefer English language for all communication.

# Contributing to tabler-animated

Thanks for your interest in contributing to **tabler-animated**. This document explains how to report issues, set up the project locally, and submit a pull request.

## Creating an issue

Before creating an issue, please make sure the problem is not [already reported](https://github.com/tungulin/tabler-animated/issues).

- **Bug report** - describe expected vs actual behavior, and include a screenshot or short clip of the animation if it's visual. Mention your browser and OS.
- **Icon request** - link the icon on [tabler.io/icons](https://tabler.io/icons) you'd like animated, and describe the motion you have in mind (or point to a similar animation already in the library).

## Sending a Pull Request

1. fork and clone the repository
2. create a development branch from `main`
3. install the required tooling:

- `Node.js 20+`
- `pnpm 9+`

4. install dependencies from the root of the repo:

```bash
pnpm install
```

> Note: this is a pnpm workspace (monorepo). The command installs dependencies for all packages under `packages/*`.

5. build the package you are editing from the root of the repo:

```bash
pnpm --dir <PACKAGE_PATH> run build
```

Replace `<PACKAGE_PATH>` with the relevant package path. The packages are:

- `packages/core` - the animated icon library
- `packages/docs` - the documentation site

6. make changes, then run the checks locally:

```bash
pnpm --dir packages/core exec eslint .   # lint the icon library
pnpm --dir packages/docs run lint        # lint the docs site
pnpm --dir packages/docs run typecheck   # typecheck the docs site
```

7. commit your changes (the `husky` pre-commit hook will lint and format staged files automatically via `lint-staged`)
8. push your feature branch and open a [Pull Request](https://github.com/tungulin/tabler-animated/compare) targeting `main`
9. link your PR to the issue using a [closing keyword](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) or describe the motivation and changes in the comment (example: `fix #12`)
10. wait until a maintainer reviews it

## Creating a new icon

The goal of tabler-animated is to re-implement every [Tabler](https://tabler.io/icons) icon as a small React component that plays a short animation on hover (or imperatively via a ref). Adding a new icon follows the same flow as sending a pull request, plus a few conventions:

- each icon is a single file inside `packages/core/src/icons`, named after its exact kebab-case name on tabler.io/icons (for example `bell.tsx`, `brand-github.tsx`)
- the component name is the PascalCase version of that name with an `Icon` suffix (`bell` → `BellIcon`), and `displayName` must match it exactly
- copy the source SVG paths from the outline variant on tabler.io/icons (24x24 viewBox, stroke-based); reuse an existing static icon's paths if one is already in the repo instead of re-copying
- pick 1-3 elements worth animating, define their states as a `Variants` object with exactly `normal` and `animate` keys, and drive them with the shared hover + `useImperativeHandle` pattern used by every other icon in the folder
- export the new icon from `packages/core/src/index.ts` so it ships with the library and shows up in the docs registry (`pnpm --dir packages/docs run generate-registry`)

See `.claude/skills/animated-icon/SKILL.md` for the full component template and animation vocabulary already in use (whole-icon gesture, single-part transform, draw-in stagger).
