import {
  SITE_CONTACT_EMAIL,
  SITE_LOCATION,
  SITE_PHONE_DISPLAY,
} from "@/constants/site";

export const WHO_WE_ARE_IMAGE = {
  src: "/about-mountain.png",
  alt: "Snow-capped Himalayan peaks above clouds at sunrise",
} as const;

export const WHO_WE_ARE_CREATIVE_IMAGE = {
  src: "/about-creative-hero.png",
  alt: "Laptop showing a bold digital experience design with warm orange lighting",
} as const;

export const WHO_WE_ARE_WRITING_IMAGE = {
  src: "/about-writing-hand.png",
  alt: "Illustrated hand writing with a pen — storytelling and craft",
} as const;

export const WHO_WE_ARE_NAV = {
  indexLabel: "Index",
  indexHref: "#work",
  infoLabel: "Info",
  journalLabel: "Field",
  journalHref: "/passion#image-field",
} as const;

export const WHO_WE_ARE_BIO = {
  name: "Sandip Bhatta",
  headline: "Building technology, brands, and businesses",
  lead:
    "My name is Sandip Bhatta — a Full Stack Developer, Entrepreneur, Founder, and IT student from Nepal. I enjoy building modern web applications, digital products, and business solutions that blend technology, creativity, and innovation.",
  trail: `Based in ${SITE_LOCATION}, I'm passionate about full stack development, entrepreneurship, UI/UX, and creating products that solve real-world problems.`,
  readMoreLabel: "Read my story",
  readMoreHref: "/passion",
  contactLabel: "Let's connect",
  contactHref: "#contact",
} as const;

export const WHO_WE_ARE_STAT = {
  value: "3+",
  label: "projects shipped",
  note: "Real products for real users — design, code, and polish in one loop.",
} as const;

export const WHO_WE_ARE_CONTACT_CARD = {
  name: "Sandip",
  role: "Developer & Founder",
  phone: SITE_PHONE_DISPLAY,
  email: SITE_CONTACT_EMAIL,
  coordinates: "27°42′ N, 85°19′ E",
} as const;

export const WHO_WE_ARE_STAMP_LABEL = "Design Dev";
