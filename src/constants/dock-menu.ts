export type DockMenuItem = {
  id: string;
  label: string;
  href: string;
};

export const DOCK_MENU_LEFT: DockMenuItem[] = [
  { id: "home", label: "Home", href: "#hero" },
  { id: "work", label: "Work", href: "#work" },
];

export const DOCK_MENU_RIGHT: DockMenuItem[] = [
  { id: "services", label: "Services", href: "#services" },
  { id: "contact", label: "Contact", href: "#contact" },
];

/** Section ids observed for active-state highlighting. */
export const DOCK_SECTION_IDS = [
  "hero",
  "work",
  "services",
  "testimonials",
  "contact",
] as const;

export type DockSectionId = (typeof DOCK_SECTION_IDS)[number];
