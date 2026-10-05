import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "./site";
import { Logo } from "./AuthLayout";
import { ReservationHero } from "../pages/ReservationPage";

/** 5-minute table hold. Returns remaining seconds; sends the guest back to /reservation at 0. */
export function useHoldTimer(start = 300) {
  const nav = useNavigate();
  const [secs, setSecs] = useState(start);
  useEffect(() => {
    if (secs <= 0) return nav("/reservation", { replace: true });
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secs, nav]);
  return secs;
}

export function HoldBanner({ secs, className = "" }: { secs: number; className?: string }) {
  return (
    <p className={`rounded-3xl bg-[#D0F5FC] px-6 py-10 text-center text-base text-cocoa dark:bg-sky-900/40 dark:text-stone-100 sm:py-[50px] sm:text-xl ${className}`}>
      Due to limited availability, we can hold this table for you for{" "}
      <strong className="font-semibold">{Math.floor(secs / 60)}:{String(secs % 60).padStart(2, "0")} minutes</strong>
    </p>
  );
}

/** Dimmed reservation page + white modal panel (logo, sign in / sign up) + footer. */
export default function ModalShell({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-hidden bg-white font-sans text-cocoa transition-colors dark:bg-night dark:text-stone-100">
      <div className="relative bg-white dark:bg-night">
        <div aria-hidden className="absolute inset-x-0 top-0" {...({ inert: "" } as object)}>
          <Navbar active="Reservation" />
          <ReservationHero />
        </div>
        <div className="absolute inset-0 bg-cocoa/80 dark:bg-black/75" />

        <div className="relative mx-auto mb-16 mt-28 w-full max-w-[1110px] px-4 sm:px-6 md:mb-[10vw] md:mt-[13vw]">
          <Link to="/reservation" aria-label="Close" className="absolute -top-[88px] left-1/2 z-10 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-white text-cocoa shadow-md transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand md:-top-[110px] md:h-20 md:w-20">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
          </Link>
          <div className="bg-white px-5 pb-16 pt-8 dark:bg-[#1B1712] sm:px-10 md:px-[60px] md:pb-[90px] md:pt-[60px]">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Logo /><span className="text-xs font-semibold text-cocoa dark:text-white">Deli<span className="text-brand">zioso</span></span></div>
              <div className="flex gap-3">
                <Link to="/login-art" className="flex h-10 items-center rounded-full bg-brand px-5 text-xs font-medium text-white">Sign in</Link>
                <Link to="/signup-art" className="flex h-10 items-center rounded-full bg-leaf px-5 text-xs font-medium text-white">Sign up</Link>
              </div>
            </header>
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
