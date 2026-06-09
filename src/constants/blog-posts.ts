export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  publishedAt: string;
  image: string;
  imageAlt: string;
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "transparent-admissions-beats-black-box-consultancies",
    title: "Transparent admissions beats black-box consultancies",
    excerpt:
      "When families compare education platforms, clarity wins. Here is how open pricing, timelines, and outcomes turned a skeptical audience into confident applicants.",
    date: "November 11, 2025",
    publishedAt: "2025-11-11",
    image: "/project1.png",
    imageAlt: "Education platform dashboard with clear admissions flow",
    content: [
      "Most education consultancies still hide their process behind PDFs and vague promises. Applicants are asked to trust a brand without seeing how decisions get made, what success actually looks like, or where their money goes.",
      "The platform I helped shape took the opposite route: every stage of admissions is visible from the first visit. Requirements, document checklists, review timelines, and fee breakdowns live on the same screen — no login required to understand the basics.",
      "That transparency did more than reduce support tickets. It changed the tone of conversations. Families arrived already informed, which meant sales calls became working sessions instead of persuasion marathons.",
      "The lesson for product teams is simple: if your service involves anxiety, design for proof. Show the steps, show the dates, and show what happens when something goes wrong. Trust is not a marketing line — it is an interface pattern.",
      "Black-box consultancies may still win on prestige, but transparent systems win on momentum. And in a market where applicants compare five options in one evening, momentum is the real conversion metric.",
    ],
  },
  {
    id: "2",
    slug: "designing-wholesale-marketplaces-people-trust",
    title: "Designing wholesale marketplaces people trust",
    excerpt:
      "B2B buyers do not need flash — they need confidence. A wholesale marketplace only works when pricing, stock, and fulfillment feel dependable at every click.",
    date: "July 10, 2025",
    publishedAt: "2025-07-10",
    image: "/project2.png",
    imageAlt: "Clean wholesale marketplace product listing interface",
    content: [
      "Wholesale buyers are not impulse shoppers. They are operators running tight margins, and every unclear label or mystery fee erodes confidence faster than a slow page load.",
      "When I redesigned this marketplace, the goal was not to make it feel consumer-friendly. It needed to feel operationally serious: bulk units visible at a glance, tiered pricing that updates in real time, and fulfillment windows that do not change after checkout.",
      "We stripped decorative UI in favor of scan-friendly tables, persistent order summaries, and account-level defaults that remember how each buyer prefers to work. Repeat orders became a two-click flow instead of a fifteen-minute chore.",
      "Trust in B2B is cumulative. One accurate invoice matters less than ten consistent experiences. So we invested heavily in empty states, error copy, and status tracking — the unglamorous surfaces that decide whether someone reorders.",
      "The result was not viral growth. It was retention: fewer abandoned carts, faster reorders, and support conversations that started with expansion instead of damage control.",
    ],
  },
  {
    id: "3",
    slug: "industrial-brands-online-clarity-over-clutter",
    title: "Industrial brands online: clarity over clutter",
    excerpt:
      "Heavy industry websites often drown visitors in specs. The better move is to lead with outcomes, then let technical depth reveal itself only when someone asks for it.",
    date: "May 10, 2025",
    publishedAt: "2025-05-10",
    image: "/project3.png",
    imageAlt: "Industrial brand website with structured materials catalog",
    content: [
      "Industrial buyers know their domain. They do not need a homepage that shouts every certification at once. They need a fast path to the material, machine, or service that solves today's problem.",
      "This project started with a content audit that was brutally honest: eighty percent of the navigation existed for internal politics, not user tasks. We rebuilt the IA around jobs — source, compare, quote, support — instead of org charts.",
      "Visually, we leaned on strong typography and photography of real environments. No stock workers in hard hats pointing at screens. The brand needed to feel grounded, not generic.",
      "Technical depth did not disappear. It moved behind progressive disclosure: summary cards on listing pages, expandable spec sheets on detail pages, and downloadable PDFs for engineers who want the full dataset.",
      "Clarity is a conversion strategy for industrial brands. When visitors find what they need without calling sales first, sales teams spend time on qualified conversations — which is exactly where they create value.",
    ],
  },
  {
    id: "4",
    slug: "scroll-storytelling-with-lenis-and-gsap",
    title: "Scroll storytelling with Lenis and GSAP",
    excerpt:
      "Smooth scroll is not decoration. Paired with GSAP, it becomes a pacing tool — one that can guide attention through a story without making the site feel like a gimmick.",
    date: "April 10, 2025",
    publishedAt: "2025-04-10",
    image: "/project4.png",
    imageAlt: "Portfolio layout with bold typography and scroll-driven motion",
    content: [
      "Scroll-driven sites get a bad reputation because many of them prioritize motion over message. The fix is not to remove animation — it is to tie every movement to a narrative beat.",
      "Lenis handles the baseline: consistent inertia, predictable stop points, and a single source of truth for scroll position. GSAP ScrollTrigger then maps those positions to reveals, pins, and handoffs between sections.",
      "On this portfolio, each major section owns one idea. Hero introduces identity, work demonstrates proof, services explain capability, and testimonials add social validation. Scroll effects reinforce that sequence instead of interrupting it.",
      "Performance matters as much as choreography. We lazy-load heavy assets, respect prefers-reduced-motion, and avoid pinning more than one full-viewport layer at a time. Smooth scroll should feel premium, not sluggish.",
      "If you are experimenting with this stack, start with structure before effects. Define what each section must communicate, then add motion only where it clarifies hierarchy or emotion. The best scroll stories feel inevitable — not impressive for their own sake.",
    ],
  },
];
