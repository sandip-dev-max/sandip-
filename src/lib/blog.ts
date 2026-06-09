import { BLOG_POSTS, type BlogPost } from "@/constants/blog-posts";

export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogPostSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}

export function getRelatedBlogPosts(
  slug: string,
  limit = 2,
): BlogPost[] {
  return getAllBlogPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, limit);
}

export function getBlogPostPath(slug: string): string {
  return `/blog/${slug}`;
}
