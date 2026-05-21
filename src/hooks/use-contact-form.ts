"use client";

import type { FormEvent } from "react";
import { useCallback, useState } from "react";
import { SITE_CONTACT_EMAIL } from "@/constants/site";

type ContactStatus = "idle" | "sending" | "sent" | "error";

export function useContactForm() {
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (
      form.elements.namedItem("name") as HTMLInputElement | null
    )?.value?.trim();
    const email = (
      form.elements.namedItem("email") as HTMLInputElement | null
    )?.value?.trim();
    const message = (
      form.elements.namedItem("message") as HTMLTextAreaElement | null
    )?.value?.trim();

    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      setStatus("error");
      return;
    }

    setError(null);
    setStatus("sending");

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );

    window.location.href = `mailto:${SITE_CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }, []);

  return { status, error, handleSubmit };
}
