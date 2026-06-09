"use client";

import { useCallback, useState } from "react";
import { CHAT_PROMPTS } from "@/constants/chat";
import { SITE_CONTACT_EMAIL } from "@/constants/site";

export type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
};

export type ChatStep = "name" | "email" | "message" | "done";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function usePortfolioChat() {
  const [step, setStep] = useState<ChatStep>("name");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStep("name");
    setName("");
    setEmail("");
    setMessages([]);
    setError(null);
  }, []);

  const appendMessage = useCallback((role: ChatMessage["role"], text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-${prev.length}`, role, text },
    ]);
  }, []);

  const sendUserMessage = useCallback(
    (raw: string) => {
      const value = raw.trim();
      if (!value) return;

      setError(null);
      appendMessage("user", value);

      if (step === "name") {
        setName(value);
        appendMessage("bot", CHAT_PROMPTS.email(value));
        setStep("email");
        return;
      }

      if (step === "email") {
        if (!isValidEmail(value)) {
          setError("Please enter a valid email address.");
          return;
        }
        setEmail(value);
        appendMessage("bot", CHAT_PROMPTS.message);
        setStep("message");
        return;
      }

      if (step === "message") {
        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\n\n${value}`,
        );
        window.location.href = `mailto:${SITE_CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        appendMessage("bot", CHAT_PROMPTS.done);
        setStep("done");
      }
    },
    [appendMessage, email, name, step],
  );

  return {
    step,
    messages,
    error,
    sendUserMessage,
    reset,
  };
}
