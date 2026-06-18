"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import {
  CHAT_INTRO,
  CHAT_PLACEHOLDERS,
} from "@/constants/chat";
import { useLenis } from "@/components/providers/LenisProvider";
import { usePortfolioChat } from "@/hooks/use-portfolio-chat";
import { setScrollLocked } from "@/lib/scroll-lock";

type PortfolioChatProps = {
  open: boolean;
  onClose: () => void;
};

export function PortfolioChat({ open, onClose }: PortfolioChatProps) {
  const { lenis } = useLenis();
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLLIElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const { step, messages, error, sendUserMessage, reset } = usePortfolioChat();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    setScrollLocked(true);
    lenis?.stop();

    return () => {
      setScrollLocked(false);
      lenis?.start();
    };
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      reset();
      setInput("");
    }
  }, [open, reset]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open && step !== "done") {
      inputRef.current?.focus();
    }
  }, [open, step, messages]);

  const placeholder =
    step === "name"
      ? CHAT_PLACEHOLDERS.name
      : step === "email"
        ? CHAT_PLACEHOLDERS.email
        : step === "message"
          ? CHAT_PLACEHOLDERS.message
          : "";

  const handleSubmit = useCallback(() => {
    if (step === "done") return;
    sendUserMessage(input);
    setInput("");
  }, [input, sendUserMessage, step]);

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleSubmit();
    },
    [handleSubmit],
  );

  if (!mounted) return null;

  const allMessages: { id: string; role: "bot" | "user"; text: string }[] = [
    { id: "intro", role: "bot", text: CHAT_INTRO },
    ...messages,
  ];

  const overlayClass = `fixed inset-0 z-[215] flex flex-col transition-opacity duration-300 ${
    open
      ? "pointer-events-auto opacity-100"
      : "pointer-events-none opacity-0"
  }`;

  const chatPanel = (
    <>
      <button
        type="button"
        className="absolute inset-0 bg-brutal-fg/40 backdrop-blur-sm"
        aria-label="Close chat"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Message Sandip"
        className={`relative z-[1] mx-auto flex h-full w-full max-w-lg flex-col bg-white shadow-[0_40px_100px_-20px_rgba(17,17,17,0.35)] transition-transform duration-500 ease-out sm:my-6 sm:h-[calc(100%-3rem)] sm:rounded-[1.75rem] sm:ring-1 sm:ring-brutal-fg/[0.08] ${
          open ? "translate-y-0" : "translate-y-8"
        }`}
      >
        <header className="relative shrink-0 overflow-hidden bg-[#e85d4c] px-6 pb-16 pt-8 text-white sm:rounded-t-[1.75rem] sm:px-8 sm:pb-20 sm:pt-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                Direct line
              </p>
              <h2 className="mt-2 font-sans text-[clamp(2.5rem,10vw,3.5rem)] font-semibold leading-none tracking-[-0.04em]">
                Message
              </h2>
              <p className="mt-2 font-sans text-sm text-white/75">
                I&apos;ll take care of your project.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full border border-white/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white transition-colors hover:bg-white/10"
            >
              Close
            </button>
          </div>
        </header>

        <div className="relative -mt-10 flex min-h-0 flex-1 flex-col rounded-t-[1.25rem] bg-white sm:-mt-12">
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-4 pt-6 sm:px-7 sm:pt-8">
            <ul className="space-y-4" aria-live="polite">
              {allMessages.map((message) =>
                message.role === "bot" ? (
                  <li key={message.id} className="flex items-end gap-2.5">
                    <span className="relative size-8 shrink-0 overflow-hidden rounded-full ring-2 ring-brutal-fg/10">
                      <Image
                        src="/dock-mark.png"
                        alt=""
                        fill
                        sizes="32px"
                        className="object-cover object-center"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="max-w-[85%] rounded-[1.1rem] rounded-bl-md border border-brutal-fg/10 bg-white px-4 py-3 font-sans text-[0.875rem] leading-snug tracking-[-0.01em] text-brutal-fg shadow-[0_8px_24px_-12px_rgba(17,17,17,0.15)]">
                      {message.text}
                    </span>
                  </li>
                ) : (
                  <li key={message.id} className="flex items-end justify-end gap-2.5">
                    <span className="max-w-[85%] rounded-[1.1rem] rounded-br-md bg-brutal-fg px-4 py-3 font-sans text-[0.875rem] leading-snug text-white">
                      {message.text}
                    </span>
                    <span
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brutal-fg/8 font-mono text-[10px] font-medium text-brutal-fg/60"
                      aria-hidden="true"
                    >
                      You
                    </span>
                  </li>
                ),
              )}
              <li ref={messagesEndRef} />
            </ul>
          </div>

          <footer className="shrink-0 border-t border-brutal-fg/8 px-5 py-4 sm:px-7 sm:py-5">
            {step === "done" ? (
              <p className="text-center font-sans text-sm text-brutal-fg/60" role="status">
                Conversation complete. Check your email app to send.
              </p>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                className={`flex gap-3 ${step === "message" ? "items-end" : "items-center"}`}
              >
                <label className="sr-only" htmlFor="portfolio-chat-input">
                  {placeholder}
                </label>
                {step === "message" ? (
                  <textarea
                    ref={inputRef as RefObject<HTMLTextAreaElement>}
                    id="portfolio-chat-input"
                    rows={2}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        handleSubmit();
                      }
                    }}
                    placeholder={placeholder}
                    className="min-h-[2.75rem] min-w-0 flex-1 resize-none border-0 bg-transparent font-sans text-[0.9375rem] leading-snug tracking-[-0.01em] text-brutal-fg outline-none placeholder:text-brutal-fg/35"
                  />
                ) : step === "email" ? (
                  <input
                    ref={inputRef as RefObject<HTMLInputElement>}
                    id="portfolio-chat-input"
                    type="email"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={placeholder}
                    autoComplete="email"
                    className="min-w-0 flex-1 border-0 bg-transparent font-sans text-[0.9375rem] tracking-[-0.01em] text-brutal-fg outline-none placeholder:text-brutal-fg/35"
                  />
                ) : (
                  <input
                    ref={inputRef as RefObject<HTMLInputElement>}
                    id="portfolio-chat-input"
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={placeholder}
                    autoComplete="name"
                    className="min-w-0 flex-1 border-0 bg-transparent font-sans text-[0.9375rem] tracking-[-0.01em] text-brutal-fg outline-none placeholder:text-brutal-fg/35"
                  />
                )}
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brutal-fg font-mono text-sm text-white transition-opacity disabled:opacity-30"
                  aria-label="Send message"
                >
                  ↵
                </button>
              </form>
            )}
            {error ? (
              <p className="mt-2 text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}
          </footer>
        </div>
      </div>
    </>
  );

  return createPortal(
    open ? (
      <div className={overlayClass} aria-hidden="false">
        {chatPanel}
      </div>
    ) : (
      <div className={overlayClass} aria-hidden="true">
        {chatPanel}
      </div>
    ),
    document.body,
  );
}
