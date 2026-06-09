import {
  SITE_BRAND_NAME,
  SITE_CONTACT_EMAIL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_LINKEDIN_URL,
} from "@/constants/site";

export const PASSION_FIELD_FOOTER = {
  headline: "Have a project in mind? Let's talk about it!",
  sitemapLabel: "Sitemap",
  sitemap: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/#work" },
    { label: "Passion", href: "/passion" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ],
  nextPage: {
    eyebrow: "Next page",
    title: "Work",
    href: "/#work",
    cta: "Discover",
  },
  creditsLabel: "Infos & credits",
  creditsHref: "/#contact",
} as const;

export const PASSION_FIELD_SOCIAL = [
  {
    label: "LinkedIn",
    href: SITE_LINKEDIN_URL,
    icon: "ri-linkedin-fill",
  },
  {
    label: "GitHub",
    href: SITE_GITHUB_URL,
    icon: "ri-github-fill",
  },
  {
    label: "Instagram",
    href: SITE_INSTAGRAM_URL,
    icon: "ri-instagram-fill",
  },
  {
    label: "Email",
    href: `mailto:${SITE_CONTACT_EMAIL}`,
    icon: "ri-mail-fill",
  },
] as const;

export const PASSION_FIELD_COPYRIGHT = SITE_BRAND_NAME;
