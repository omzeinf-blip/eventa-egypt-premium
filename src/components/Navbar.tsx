import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "الرئيسية", to: "/", hash: undefined as string | undefined },
  { label: "الإيفنتات", to: "/", hash: "events" },
  { label: "عن المنصة", to: "/", hash: "about" },
  { label: "تواصل معنا", to: "/", hash: "contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-lg font-black text-primary-foreground glow-ring">
            E
          </span>
          <span className="text-xl font-extrabold tracking-tight">EVENTA</span>
        </Link>


        <ul className="hidden items-center gap-8 text-sm font-semibold text-muted-foreground md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                {...(l.hash ? { hash: l.hash } : {})}
                className="transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button className="btn-hero hidden !px-5 !py-2 text-sm sm:inline-flex">
            تسجيل الدخول
          </button>
          <button
            aria-label="القائمة"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background/95 md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 text-sm font-semibold">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  {...(l.hash ? { hash: l.hash } : {})}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <button className="btn-hero w-full text-sm">تسجيل الدخول</button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
