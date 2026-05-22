export type BlogPost = {
  id: string;
  title: string;
  date: string;
  image: string;
  imageAlt: string;
  href: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Transparent admissions beats black-box consultancies",
    date: "November 11, 2025",
    image: "/project1.png",
    imageAlt: "Article cover — education platform UI",
    href: "#",
  },
  {
    id: "2",
    title: "Designing wholesale marketplaces people trust",
    date: "July 10, 2025",
    image: "/project2.png",
    imageAlt: "Article cover — clean B2B storefront",
    href: "#",
  },
  {
    id: "3",
    title: "Industrial brands online: clarity over clutter",
    date: "May 10, 2025",
    image: "/project3.png",
    imageAlt: "Article cover — materials and construction web UI",
    href: "#",
  },
  {
    id: "4",
    title: "Scroll storytelling with Lenis and GSAP",
    date: "April 10, 2025",
    image: "/project4.png",
    imageAlt: "Article cover — bold portfolio typography",
    href: "#",
  },
];
