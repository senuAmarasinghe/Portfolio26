"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useIsClient } from "@/hooks/use-is-client";
import { getLenis } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";
import type { NavItem, SocialLink } from "@/types";

interface MobileMenuProps {
  items: NavItem[];
  email?: string;
  socials?: SocialLink[];
  className?: string;
}

/**
 * Full-screen editorial menu for small screens, rendered into <body> through a
 * portal (a backdrop-filter on the header would otherwise trap a fixed overlay).
 * Accessible by default:
 * - the toggle reports its state (aria-expanded / aria-controls)
 * - focus moves into the menu on open and back to the toggle on close
 * - Escape closes it; the closed menu is `inert` (not focusable or clickable)
 * - page scrolling (native and Lenis) is locked while it's open
 */
export function MobileMenu({ items, email, socials = [], className }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const isClient = useIsClient();
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
    } else if (wasOpenRef.current) {
      toggleRef.current?.focus();
    }
    wasOpenRef.current = open;
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop(); // pause smooth scrolling too, if it's running

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      getLenis()?.start();
    };
  }, [open]);

  const close = () => setOpen(false);

  // Restart smooth scrolling *before* the link is followed: React's handler runs
  // before Lenis's anchor handler, so the page can glide to the chosen section.
  const followLink = () => {
    getLenis()?.start();
    close();
  };

  const overlay = (
    <div
      id={menuId}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-background px-5 pb-10 sm:px-8",
        "transition-[clip-path] duration-700 ease-out-expo",
        open ? "[clip-path:inset(0)]" : "[clip-path:inset(0_0_100%_0)]",
      )}
    >
      <div className="flex h-16 shrink-0 items-center justify-end">
        <button
          type="button"
          onClick={close}
          className="font-mono text-[0.7rem] tracking-[0.2em] uppercase"
        >
          Close <span className="ml-1 text-accent">×</span>
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 pt-10">
        <ol className="space-y-3">
          {items.map((item, i) => (
            <li
              key={item.href}
              className={cn(
                "transition-[opacity,translate] duration-700 ease-out-expo",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
              // Stagger: each link arrives a little after the previous one.
              style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}
            >
              <a
                ref={i === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={followLink}
                className="flex items-baseline gap-4"
              >
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-4xl font-semibold uppercase font-stretch-expanded">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div
        className={cn(
          "space-y-4 transition-opacity delay-500 duration-700",
          open ? "opacity-100" : "opacity-0",
        )}
      >
        {email && (
          <a
            href={`mailto:${email}`}
            className="block font-serif text-2xl break-all text-accent italic"
          >
            {email}
          </a>
        )}
        {socials.length > 0 && (
          <ul className="flex gap-6 font-mono text-[0.7rem] tracking-[0.2em] uppercase">
            {socials.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(true)}
        className={cn("font-mono text-[0.7rem] tracking-[0.2em] uppercase", className)}
      >
        Menu <span className="ml-1 text-accent">+</span>
      </button>
      {isClient && createPortal(overlay, document.body)}
    </>
  );
}
