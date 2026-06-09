"use client";

import { useEffect, useState } from "react";
import { HERO_TYPEWRITER_ROLES } from "@/constants/hero";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const TYPE_MS = 72;
const DELETE_MS = 42;
const PAUSE_TYPED_MS = 2200;
const PAUSE_DELETED_MS = 420;

export function useHeroTypewriter(
  roles: readonly string[] = HERO_TYPEWRITER_ROLES,
) {
  const reducedMotion = usePrefersReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setText(roles[0] ?? "");
      return;
    }

    const currentRole = roles[roleIndex] ?? "";
    let timeoutId: number;

    if (!isDeleting && text.length < currentRole.length) {
      timeoutId = window.setTimeout(() => {
        setText(currentRole.slice(0, text.length + 1));
      }, TYPE_MS);
    } else if (!isDeleting && text.length === currentRole.length) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(true);
      }, PAUSE_TYPED_MS);
    } else if (isDeleting && text.length > 0) {
      timeoutId = window.setTimeout(() => {
        setText(currentRole.slice(0, text.length - 1));
      }, DELETE_MS);
    } else {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, PAUSE_DELETED_MS);
    }

    return () => window.clearTimeout(timeoutId);
  }, [text, isDeleting, roleIndex, roles, reducedMotion]);

  return { text, reducedMotion };
}
