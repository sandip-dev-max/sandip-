export type TestimonialPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  detail: string;
  initials: string;
  position: TestimonialPosition;
  /** Tailwind classes for avatar gradient (static strings for compiler). */
  avatarClass: string;
  /** Subtle tilt on large screens for a scattered layout. */
  tiltClass: string;
  floatDelay: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "Delivered the full site ahead of schedule — and it still feels polished months later.",
    name: "Nina",
    detail: "34",
    initials: "N",
    position: "top-left",
    avatarClass:
      "bg-gradient-to-br from-rose-100 via-rose-50 to-orange-50 text-rose-900/80 ring-rose-200/80",
    tiltClass: "lg:-rotate-[2.5deg]",
    floatDelay: "0s",
  },
  {
    id: "2",
    quote:
      "The first developer who understood our brand before writing a single line of code.",
    name: "Sara",
    detail: "27",
    initials: "S",
    position: "top-center",
    avatarClass:
      "bg-gradient-to-br from-sky-100 via-sky-50 to-indigo-50 text-sky-900/80 ring-sky-200/80",
    tiltClass: "lg:rotate-[1.5deg]",
    floatDelay: "0.6s",
  },
  {
    id: "3",
    quote:
      "I recommended Yudeat to my whole team before the end of the week.",
    name: "Mia",
    detail: "29",
    initials: "M",
    position: "top-right",
    avatarClass:
      "bg-gradient-to-br from-violet-100 via-violet-50 to-fuchsia-50 text-violet-900/80 ring-violet-200/80",
    tiltClass: "lg:rotate-[2deg]",
    floatDelay: "1.2s",
  },
  {
    id: "4",
    quote:
      "Finally a build that doesn't feel like a template — it actually reflects us.",
    name: "Tom",
    detail: "31",
    initials: "T",
    position: "bottom-left",
    avatarClass:
      "bg-gradient-to-br from-emerald-100 via-emerald-50 to-teal-50 text-emerald-900/80 ring-emerald-200/80",
    tiltClass: "lg:-rotate-[1deg]",
    floatDelay: "0.3s",
  },
  {
    id: "5",
    quote:
      "Couldn't explain why it works so well — I just keep sending people the link.",
    name: "Jake",
    detail: "25",
    initials: "J",
    position: "bottom-right",
    avatarClass:
      "bg-gradient-to-br from-amber-100 via-amber-50 to-yellow-50 text-amber-900/80 ring-amber-200/80",
    tiltClass: "lg:-rotate-[2deg]",
    floatDelay: "0.9s",
  },
];

const POSITION_CLASSES: Record<TestimonialPosition, string> = {
  "top-left": "lg:absolute lg:left-[1%] lg:top-[6%] xl:left-[3%]",
  "top-center": "lg:absolute lg:left-1/2 lg:top-[0%] lg:-translate-x-1/2",
  "top-right": "lg:absolute lg:right-[1%] lg:top-[8%] xl:right-[3%]",
  "bottom-left": "lg:absolute lg:bottom-[12%] lg:left-[2%] xl:left-[5%]",
  "bottom-right": "lg:absolute lg:bottom-[10%] lg:right-[2%] xl:right-[5%]",
};

export function getTestimonialPositionClass(position: TestimonialPosition): string {
  return POSITION_CLASSES[position];
}
