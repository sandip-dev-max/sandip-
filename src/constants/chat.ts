export const CHAT_INTRO =
  "Hey — I'm Yudeat. Got a project, collab, or question? What's your name?";

export const CHAT_PROMPTS = {
  email: (name: string) =>
    `Nice to meet you, ${name}. What's the best email to reach you?`,
  message: "What would you like to work on?",
  done:
    "Thanks — I'll open your email client with everything filled in. Hit send there and I'll reply soon.",
} as const;

export const CHAT_PLACEHOLDERS = {
  name: "First and last name",
  email: "you@example.com",
  message: "Tell me about your idea, timeline, or budget…",
} as const;
