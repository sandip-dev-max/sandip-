export type IdentitySidebarItem = {
  id: string;
  number: string;
  label: string;
  href: string;
  accent: "Developer" | "Founder";
};

export const IDENTITY_SIDEBAR_ITEMS: IdentitySidebarItem[] = [
  {
    id: "Developer",
    number: "01",
    label: "Developer",
    href: "/Developer",
    accent: "Developer",
  },
  {
    id: "Founder",
    number: "02",
    label: "Founder",
    href: "/passion",
    accent: "Founder",
  },
];
