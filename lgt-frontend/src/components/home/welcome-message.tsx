"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { VisitorMessage } from "@/components/home/visitor-notifications";

const DISMISSAL_KEY = "tlg-word-welcome-dismissed";

export function WelcomeMessage({ firstVisit, message }: { firstVisit: boolean; message: VisitorMessage }) {
  const [open, setOpen] = useState(true);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElementTagNameMap["section"]>(null);
  const dismiss = useCallback(() => {
    window.sessionStorage.setItem(DISMISSAL_KEY, "true");
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    if (window.sessionStorage.getItem(DISMISSAL_KEY) === "true") {
      setOpen(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        dismiss();
        return;
      }

      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [dismiss, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex min-h-dvh items-center justify-center overflow-y-auto bg-[#10241b]/95 px-4 py-6 text-white backdrop-blur-sm sm:px-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="word-welcome-title"
        aria-describedby="word-welcome-scripture"
        className="relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-[radial-gradient(ellipse_at_50%_0%,rgba(195,148,58,0.2),transparent_46%),linear-gradient(150deg,#1c4434_0%,#10291f_58%,#0d2119_100%)] px-6 py-12 text-center shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:px-12 sm:py-16 lg:px-20 lg:py-20"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={dismiss}
          aria-label="Close welcome message"
          className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-2xl leading-none text-white/80 transition hover:border-white/50 hover:bg-white/10 hover:text-white focus-visible:outline-white sm:right-6 sm:top-6"
        >
          ×
        </button>

        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e4c47f] sm:text-xs">
          The Living God Tabernacle
        </p>
        <div className="mx-auto mt-6 h-px w-14 bg-[#d1a84f]" />
        <h1
          id="word-welcome-title"
          className="mt-7 font-[family-name:var(--font-heading)] text-5xl leading-[0.98] text-white sm:text-6xl lg:text-7xl"
        >
          {firstVisit ? <>Take a moment<br className="hidden sm:block" /> with the Word.</> : message.heading}
        </h1>
        <p className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-white/65">
          {firstVisit ? "The End Time Message · Scripture first" : "A moment in the Word · Scripture first"}
        </p>

        <blockquote id="word-welcome-scripture" className="mx-auto mt-9 max-w-2xl">
          <p className="font-[family-name:var(--font-heading)] text-2xl leading-relaxed text-[#f4e8cb] sm:text-3xl">
            “{message.verse}”
          </p>
          <cite className="mt-4 block text-xs font-semibold not-italic uppercase tracking-[0.2em] text-[#e4c47f]">
            {message.reference}
          </cite>
        </blockquote>

        <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
          {message.reflection}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/sermons"
            onClick={dismiss}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#d0a64f] px-6 py-3 text-sm font-bold text-[#17271e] shadow-lg shadow-black/10 transition hover:bg-[#e1bc6a] focus-visible:outline-white sm:w-auto"
          >
            Explore the sermons <span aria-hidden="true" className="ml-2">→</span>
          </Link>
          <button
            type="button"
            onClick={dismiss}
            className="min-h-12 w-full rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white focus-visible:outline-white sm:w-auto"
          >
            Continue to the site
          </button>
        </div>
        <p className="mt-6 text-[11px] text-white/45">{firstVisit ? "Welcome. This first-visit message is shown once per browser." : "A new Scripture reflection is shown each day."}</p>
      </section>
    </div>
  );
}
