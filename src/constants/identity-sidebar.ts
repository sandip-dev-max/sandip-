export type IdentitySidebarItem = {
  id: string;
  number: string;
  label: string;
  href: string;
  accent: "writer" | "mountaineer";
};

export const IDENTITY_SIDEBAR_ITEMS: IdentitySidebarItem[] = [
  {
    id: "writer",
    number: "01",
    label: "Writer",
    href: "/blog",
    accent: "writer",
  },
  {
    id: "mountaineer",
    number: "02",
    label: "Mountaineer",
    href: "/passion",
    accent: "mountaineer",
  },
];
