# GTA VI — Next.js

Production-ready landing page for a GTA VI–style experience, built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, **GSAP**, and **Lenis** smooth scrolling.

## Stack

- [Next.js](https://nextjs.org/) App Router (Webpack dev by default; Turbopack optional)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [GSAP](https://gsap.com/) + [@gsap/react](https://gsap.com/docs/v3/React)
- [Lenis](https://github.com/darkroomengineering/lenis) smooth scroll
- [Remix Icon](https://remixicon.com/)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Dev server (Webpack — stable) |
| `npm run dev:turbo` | Dev with Turbopack (faster HMR, can error) |
| `npm run dev:clean` | Clean cache + Webpack dev |
| `npm run build`| Production build         |
| `npm run start`| Run production server    |
| `npm run lint` | ESLint (Next.js config)  |

## Dev errors

**`_buildManifest.js.tmp` ENOENT`** — Turbopack loses track of temp files during hot reload. Stop the server (`Ctrl+C`), then run `npm run dev:clean`. Or use `npm run dev` (no `--turbopack`).

**`GET /bg.png 404`** — Splash only (`GtaExperience.tsx`). Needs `public/bg.png`. Restart dev after adding the file.

## Project structure

```
src/
  app/              # App Router pages & global styles
  components/       # UI sections (loader, hero, content)
  hooks/            # GSAP animation hooks
public/             # Static assets (`bg.png` splash, `hero.png` hero)
```

## Deploy

Deploy on [Vercel](https://vercel.com/) or any Node host:

```bash
npm run build
npm run start
```
