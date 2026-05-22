export type BlogPost = {
  id: string;
  title: string;
  date: string;
  image: string;
  imageAlt: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The power of simplicity in modern real brand design",
    date: "November 11, 2025",
    image: "https://images.unsplash.com/photo-1610701596007-11534563df4c?w=800&q=80",
    imageAlt: "Minimal product packaging on a neutral surface",
  },
  {
    id: "2",
    title: "From idea to execution: building products that last",
    date: "July 10, 2025",
    image: "https://images.unsplash.com/photo-1565688534245-05d1bfb46719?w=800&q=80",
    imageAlt: "Industrial metal component on a red backdrop",
  },
  {
    id: "3",
    title: "Why great brands are built on clarity, not complexity",
    date: "May 10, 2025",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c1f58b?w=800&q=80",
    imageAlt: "Dark electronic device with subtle indicator lights",
  },
  {
    id: "4",
    title: "Designing digital systems that scale your business",
    date: "April 10, 2025",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    imageAlt: "Smartwatch on a wrist against a blue sky",
  },
];
