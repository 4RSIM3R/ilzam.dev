import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { MenuIcon, PhoneCallIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { label: "How it works", href: "#team" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

// The phone menu has room for every section.
const menuLinks = [
  ...links.slice(0, 3),
  { label: "Proof", href: "#proof" },
  { label: "Working together", href: "#process" },
  ...links.slice(3),
  { label: "Notes", href: "#notes" },
];

const AVATAR_SIZE = 36;

// Whichever section crosses the middle of the screen is the one being read.
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const id of ["top", ...ids]) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const sectionIds = links.map((link) => link.href.slice(1));

function scrollToSection(hash: string) {
  window.dispatchEvent(new CustomEvent("journey:scroll-to", { detail: hash }));
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<string | null>(null);

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
      // The sheet locks scrolling while it is open, so jump after it closes.
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen && pending) {
          scrollToSection(pending);
          setPending(null);
        }
      }}
    >
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            className="rounded-full md:hidden"
            aria-label="Open menu"
          />
        }
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="right" className="p-6">
        <SheetTitle className="text-sm font-medium text-muted-foreground">
          Navigate
        </SheetTitle>
        <nav aria-label="Mobile navigation" className="flex flex-col">
          {menuLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setPending(link.href);
                setOpen(false);
              }}
              className="border-b py-3 text-lg font-light transition-transform active:scale-98"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Button
          variant="outline"
          size="lg"
          className="mt-auto rounded-full"
          render={<a href="mailto:ilzammulkhaq85@gmail.com" />}
        >
          <MailIcon data-icon="inline-start" />
          Email me
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export function LandingNav() {
  const { scrollY } = useScroll();
  const active = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setScrolled(window.scrollY > 16), []);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  return (
    <header className="journey-enter fixed inset-x-0 top-3 z-40 px-3 md:top-4">
      <div
        data-scrolled={scrolled || undefined}
        className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-2 rounded-full border border-transparent px-2.5 transition duration-300 ease-out-strong data-scrolled:border-border data-scrolled:bg-background/80 data-scrolled:shadow-lg data-scrolled:shadow-black/5 data-scrolled:backdrop-blur-md"
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-full pr-2"
          aria-label="Ilzam, back to top"
        >
          <span className="size-9 shrink-0 overflow-hidden rounded-full bg-brand-tint ring-1 ring-brand/10">
            <img
              src="/wave-full.webp"
              alt=""
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              className="size-full object-cover"
            />
          </span>
          <span className="text-sm font-semibold">Ilzam</span>
        </a>

        <nav aria-label="Site navigation" className="hidden md:block">
          <ul className="flex items-center">
            {links.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-active={isActive || undefined}
                    aria-current={isActive ? "location" : undefined}
                    className="relative isolate block rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground data-active:text-foreground"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{
                          type: "spring",
                          duration: 0.4,
                          bounce: 0.15,
                        }}
                        className="absolute inset-0 -z-10 rounded-full bg-muted"
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="brand"
            className="h-9 rounded-full px-4"
            render={
              <a
                href="https://cal.com/ilzam/intro"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <PhoneCallIcon data-icon="inline-start" />
            Book a call
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
