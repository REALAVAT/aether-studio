# Aether Studio

A cinematic, scroll-driven website for Aether — a fictional creative and product studio headquartered in Dubai Design District. One sculpted object of light carries the story: it turns, drifts and re-frames itself as you scroll from manifesto to selected work to first contact.

**Live:** [studio.ahmadkhajeh.com](https://studio.ahmadkhajeh.com)

Demo project by Ahmad Khajeh — [ahmadkhajeh.com](https://ahmadkhajeh.com)

![Aether Studio hero with the real-time 3D sculpture](docs/screenshots/hero.jpg)

## Highlights

- **Scroll-driven 3D hero** — a real-time React Three Fiber sculpture whose position, rotation and camera are choreographed by scroll across three pinned, crossfading chapters.
- **A studio rooted in Dubai** — d3 headquarters, a DIFC client lounge, Gulf and global case studies, live Dubai time and pricing in AED with USD equivalents.
- **Pinned horizontal work gallery** — six case studies glide sideways with image parallax, collapsing into a simple grid on phones.
- **Buttery smooth scrolling** — Lenis and GSAP ScrollTrigger share a single ticker, so every animation stays in sync.
- **Performance first** — the 3D canvas loads only after the page is interactive, adapts its resolution to the device, pauses off-screen and runs a lighter scene on mobile.
- **Respectful motion** — with reduced motion enabled, the site swaps to a static, art-directed hero and native scrolling.
- **Accessible and searchable** — keyboard-friendly navigation with visible focus, semantic landmarks, structured data, Open Graph images, sitemap and robots.
- **Validated contact flow** — a typed form with inline errors, budget ranges in AED and a polished success state.

![Pinned horizontal case-study gallery](docs/screenshots/work.jpg)

<p align="center">
  <img src="docs/screenshots/mobile.jpg" alt="Aether Studio on mobile with the lightweight 3D hero" width="320" />
</p>

## Tech stack

- [Next.js](https://nextjs.org) (App Router) and TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com)
- [React Three Fiber](https://r3f.docs.pmnd.rs), [drei](https://drei.docs.pmnd.rs) and [three.js](https://threejs.org)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) and [Lenis](https://lenis.darkroom.engineering)
- [React Hook Form](https://react-hook-form.com) and [Zod](https://zod.dev)

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).
