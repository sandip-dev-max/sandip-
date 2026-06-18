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
    slug: "building-local-ecommerce-brands-that-feel-modern",
    title: "Building local e-commerce brands that feel modern",
    excerpt:
      "Customers judge an online store within seconds. Great e-commerce experiences combine trust, speed, and a memorable brand identity.",
    date: "June 18, 2026",
    publishedAt: "2026-06-18",
    image: "/naulomart.png",
    imageAlt: "Naulo Mart modern e-commerce interface",
    content: [
      "Naulo Mart was built with a simple vision: create an online shopping experience that feels modern, intuitive, and accessible for local customers.",
      "The platform focuses on reducing friction throughout the buying journey. Clear navigation, organized product categories, and streamlined checkout flows help customers find what they need quickly.",
      "Strong branding was a priority throughout the design process. Consistent visuals, thoughtful typography, and engaging product displays work together to create a memorable shopping experience.",
      "Performance matters just as much as aesthetics. Responsive layouts and optimized assets ensure that customers enjoy a smooth experience across desktop and mobile devices.",
      "Modern e-commerce is ultimately about trust. When users can browse, compare, and purchase products with confidence, they become long-term customers instead of one-time visitors.",
    ],
  },

  {
    id: "2",
    slug: "creating-digital-spaces-for-local-cafes",
    title: "Creating digital spaces for local cafés",
    excerpt:
      "A café website should capture atmosphere as much as information, turning online visitors into in-person customers.",
    date: "June 18, 2026",
    publishedAt: "2026-06-18",
    image: "/rdfriendshipcafe.png",
    imageAlt: "RD Friendship Cafe branding website",
    content: [
      "RD Friendship Cafe was designed around the idea that hospitality begins before someone enters the café.",
      "The website emphasizes storytelling through warm visuals, inviting layouts, and carefully crafted branding that reflects the café's personality.",
      "Practical features remain essential. Customers can easily explore the menu, learn about the café, and find important information without unnecessary complexity.",
      "Every design decision supports the brand's identity, creating a digital experience that feels welcoming and authentic.",
      "For hospitality businesses, a website serves as a first impression. A thoughtful online presence helps build stronger relationships with both new and returning customers.",
    ],
  },

  {
    id: "3",
    slug: "building-trust-for-consultancy-brands-online",
    title: "Building trust for consultancy brands online",
    excerpt:
      "Professional services rely on credibility, and strong digital experiences help establish that trust from the first interaction.",
    date: "June 18, 2026",
    publishedAt: "2026-06-18",
    image: "/everestglobalnetwork.png",
    imageAlt: "Everest Global Network consultancy website",
    content: [
      "Everest Global Network required a professional online presence that reflects expertise, reliability, and confidence.",
      "The website focuses on clear communication by presenting services, company values, and business solutions in an organized structure.",
      "A clean navigation system allows visitors to quickly understand the company's offerings and connect with the right services.",
      "Consistent branding, premium layouts, and purposeful imagery reinforce the consultancy's professional identity.",
      "A consultancy website is more than a digital brochure. It builds credibility and helps establish meaningful business relationships before the first conversation takes place.",
    ],
  },

  {
    id: "4",
    slug: "connecting-talent-and-opportunity-digitally",
    title: "Connecting talent and opportunity digitally",
    excerpt:
      "Modern recruitment platforms simplify hiring by creating efficient connections between employers and job seekers.",
    date: "June 18, 2026",
    publishedAt: "2026-06-18",
    image: "/pathibhara.png",
    imageAlt: "Pathibhara Job Link Solution recruitment platform",
    content: [
      "Pathibhara Job Link Solution was created to make recruitment more accessible and efficient for both employers and job seekers.",
      "The platform organizes job opportunities into a simple and structured experience, helping candidates discover relevant positions with ease.",
      "For employers, streamlined workflows and clear job listings reduce hiring complexity and improve communication with applicants.",
      "Trust is essential in recruitment. Transparent information and user-friendly interfaces encourage long-term engagement from both sides of the marketplace.",
      "As digital hiring continues to evolve, platforms that prioritize simplicity, accessibility, and reliability will play an increasingly important role in connecting talent with opportunity.",
    ],
  },
];
