import type { ReactNode } from "react";
import pancakes from "../assets/pancakes.jpg";
import { useTheme } from "../hooks/useTheme";

export function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand dark:text-stone-100 dark:hover:bg-white/10"
    >
      {dark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}

export function Logo() {
  return (
    <div
      aria-label="Delizioso"
      className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-brand text-sm font-medium text-white"
    >
      D
    </div>
  );
}

/** Shared shell: image banner/side panel + form panel with logo, theme toggle and footer. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  const { dark, toggle } = useTheme();

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans transition-colors dark:bg-night lg:flex-row">
      {/* Image: banner on small screens, side panel on lg+ */}
      <div className="h-44 w-full shrink-0 sm:h-64 md:h-80 lg:order-2 lg:h-auto lg:w-[55.8%]">
        <img
          src={pancakes}
          alt="Stack of blueberry pancakes with honey on a blue plate"
          className="h-full w-full object-cover object-[50%_40%] lg:object-center"
        />
      </div>

      <main className="relative flex flex-1 flex-col px-6 pb-8 pt-6 sm:px-10 lg:order-1 lg:w-[44.2%] lg:flex-none lg:px-10 lg:py-[39px]">
        <header className="flex items-center justify-between">
          <Logo />
          <ThemeToggle dark={dark} onToggle={toggle} />
        </header>

        <div className="mx-auto flex w-full max-w-[414px] flex-1 flex-col justify-center py-10 lg:py-6">
          {children}
        </div>

        <footer className="text-center text-sm text-stone-300 dark:text-stone-500">
          Copyright © 2022 Delizioso
        </footer>
      </main>
    </div>
  );
}
