export type WhoWeAreChatMessage = {
  id: string;
  text: string;
  side: "left" | "right";
  time?: string;
};

export const WHO_WE_ARE_EYEBROW = "(About me)";

export const WHO_WE_ARE_HEADLINE =
  "I design and ship web products with clarity, speed, and intent.";

/** Left-top card — portfolio / delivery highlights. */
export const WHO_WE_ARE_HIGHLIGHT = {
  count: "4+",
  label: "projects shipped for real users",
  eyebrow: "Selected work",
  avatarInitials: ["EX", "KK", "SW", "PF"],
  extraCount: "",
} as const;

/** Left-bottom card — how you work + CTA. */
export const WHO_WE_ARE_APPROACH = {
  eyebrow: "How I work",
  title: "From idea to launch — design, code, and polish",
  ctaLabel: "View services",
  ctaHref: "#services",
  stats: [
    { label: "Stack", value: "Next.js · TypeScript" },
    { label: "Focus", value: "UI · Motion · SEO" },
  ],
} as const;

export const WHO_WE_ARE_COLLAB = {
  eyebrow: "Client feedback",
  messages: [
    { id: "1", text: "Can we make the hero feel more premium?", side: "left" },
    { id: "2", text: "Love the direction so far.", side: "left" },
    { id: "3", text: "Timeline still works for next week?", side: "left" },
    { id: "4", text: "Yes — on track.", side: "right", time: "Today 17:01" },
    { id: "5", text: "I'll send the updated build tonight.", side: "right" },
    { id: "6", text: "Perfect. Let's ship it.", side: "left" },
  ] satisfies WhoWeAreChatMessage[],
} as const;
