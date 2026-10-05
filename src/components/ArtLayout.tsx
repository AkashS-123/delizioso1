import type { ReactNode } from "react";
import pasta from "../assets/pasta.webp";
import pastaLight from "../assets/pasta-light.webp";
import { useTheme } from "../hooks/useTheme";
import { Logo, ThemeToggle } from "./AuthLayout";

/**
 * Layout for the pasta design: form on the left, orange-plate artwork bleeding
 * off the top-right corner. Below xl the artwork becomes a banner above the form.
 */
export default function ArtLayout({
  children,
  variant = "signup",
}: {
  children: ReactNode;
  /** signup = deep orange ring, login = lighter ring (as in the designs) */
  variant?: "signup" | "login";
}) {
  const { dark, toggle } = useTheme();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white font-sans transition-colors dark:bg-night xl:block">
      {/* Artwork */}
      <div className="h-48 w-full shrink-0 sm:h-64 md:h-80 xl:absolute xl:inset-y-0 xl:right-0 xl:h-auto xl:w-[52.8%]">
        <img
          src={variant === "login" ? pastaLight : pasta}
          alt="Spaghetti with basil and tomato on a white plate"
          className="h-full w-full object-cover object-[50%_42%] xl:object-contain xl:object-right-top"
        />
      </div>

      <header className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-6 sm:px-10 xl:px-[39px] xl:pt-[39px]">
        <Logo />
        <div className="relative z-10 xl:hidden">
          <ThemeToggle dark={dark} onToggle={toggle} />
        </div>
      </header>

      <main className="relative flex flex-1 items-center px-6 py-10 sm:px-10 xl:min-h-screen xl:pl-[10.1%] xl:pr-0">
        <div className="mx-auto w-full max-w-[491px] xl:mx-0">{children}</div>
      </main>

      {/* Desktop toggle: bottom-left, clear of the artwork */}
      <div className="absolute bottom-6 left-[39px] hidden xl:block">
        <ThemeToggle dark={dark} onToggle={toggle} />
      </div>
    </div>
  );
}
