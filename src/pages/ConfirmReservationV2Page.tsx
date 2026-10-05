import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../components/AuthLayout";
import { Footer, Navbar, body, img } from "../components/site";
import { ReservationHero } from "./ReservationPage";
import { HoldBanner, useHoldTimer } from "../components/ModalShell";

const OCCASIONS = ["Birthday", "Anniversary", "Business meal", "Date night", "Other"];
const COUNTRIES: Record<string, string> = {
  "+49": "linear-gradient(#000 33%,#e11 33% 66%,#fc0 66%)",
  "+62": "linear-gradient(#e11 50%,#fff 50%)",
  "+1": "linear-gradient(#b22 33%,#fff 33% 66%,#36c 66%)",
  "+91": "linear-gradient(#f93 33%,#fff 33% 66%,#193 66%)",
};

const field =
  "h-16 w-full rounded-2xl border border-transparent bg-field px-6 text-base outline-none transition placeholder:text-stone-400 focus:border-brand focus:bg-white " +
  "dark:bg-field-dark dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:bg-night sm:h-[76px] sm:px-8 sm:text-lg";
const heading = "text-xl font-semibold text-cocoa dark:text-white sm:text-2xl";

const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-cocoa dark:text-stone-200" aria-hidden>{children}</svg>
);
const Chevron = () => (
  <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-cocoa dark:text-stone-200"><path d="M4 8l8 8 8-8" /></svg>
);

function prettyDate(v?: string) {
  if (!v) return "Saturday, 28 february 2022";
  const d = new Date(`${v}T00:00`);
  if (isNaN(+d)) return v;
  const l = (o: Intl.DateTimeFormatOptions) => d.toLocaleDateString("en-US", o);
  return `${l({ weekday: "long" })}, ${d.getDate()} ${l({ month: "long" }).toLowerCase()} ${d.getFullYear()}`;
}

function RadioRow({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <label className="flex cursor-pointer items-start gap-5 text-base leading-7 text-ink-soft dark:text-stone-300 sm:text-lg">
      <input type="radio" className="peer sr-only" checked={checked} onChange={onChange} />
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-stone-400 dark:border-stone-500">
        <span className="h-3.5 w-3.5 scale-0 rounded-full bg-brand transition peer-checked:scale-100" />
      </span>
      {children}
    </label>
  );
}

/**
 * V2 differs from the first confirmation design: the photo and "Reservation detail" sit
 * centered at the top (above the hold-timer banner), the form is a two-column grid, and
 * there are three selectable agreement rows instead of one checkbox.
 */
export default function ConfirmReservationV2Page() {
  const nav = useNavigate();
  const { state } = useLocation() as { state: { date?: string; time?: string; size?: string } | null };
  const secs = useHoldTimer();
  const [dial, setDial] = useState("+49");
  const [agree, setAgree] = useState<0 | 1 | 2 | null>(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", occasion: "", request: "" });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: connect to your reservation API
    console.log("Confirm reservation (v2):", { ...form, phone: `${dial} ${form.phone}`, agree, ...state });
    nav("/reservation/success", { state });
  };

  return (
    <div className="overflow-x-hidden bg-white font-sans text-cocoa transition-colors dark:bg-night dark:text-stone-100">
      <div className="relative bg-white dark:bg-night">
        <div aria-hidden className="absolute inset-x-0 top-0" {...({ inert: "" } as object)}>
          <Navbar active="Reservation" />
          <ReservationHero />
        </div>
        <div className="absolute inset-0 bg-cocoa/80 dark:bg-black/75" />

        <div className="relative mx-auto mb-16 mt-28 w-full max-w-[950px] px-4 sm:px-6 md:mb-[10vw] md:mt-[13vw]">
          <Link to="/reservation" aria-label="Close" className="absolute -top-[88px] left-1/2 z-10 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-white text-cocoa shadow-md transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand md:-top-[110px] md:h-20 md:w-20">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
          </Link>

          <div className="bg-white px-5 pb-16 pt-8 dark:bg-[#1B1712] sm:px-10 md:px-[70px] md:pb-[80px] md:pt-[52px]">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Logo /><span className="text-xs font-semibold text-cocoa dark:text-white">Deli<span className="text-brand">zioso</span></span></div>
              <div className="flex gap-3">
                <Link to="/login-art" className="flex h-10 items-center rounded-full bg-brand px-5 text-xs font-medium text-white">Sign in</Link>
                <Link to="/signup-art" className="flex h-10 items-center rounded-full bg-leaf px-5 text-xs font-medium text-white">Sign up</Link>
              </div>
            </header>

            <div className="mt-10 flex flex-col items-center gap-6 md:mt-14 md:flex-row md:items-start md:justify-between">
              <div className="hidden shrink-0 gap-4 sm:flex md:flex-col md:pt-8">
                {["Twitter", "Instagram", "Facebook"].map((s) => <span key={s} aria-hidden className="h-9 w-9 rounded-full bg-field dark:bg-field-dark" />)}
              </div>
              <img src={img("reserve.webp")} alt="Set table with wine glasses" className="h-48 w-48 shrink-0 rounded-full object-cover sm:h-56 sm:w-56" />
              <div className="hidden w-9 shrink-0 md:block" aria-hidden />
            </div>

            <div className="mt-10 text-center md:mt-12">
              <h2 className={heading}>Reservation detail</h2>
              <ul className="mt-7 flex flex-col items-center gap-4 text-base text-ink-soft dark:text-stone-300 sm:text-lg lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-10">
                <li className="flex items-center gap-3"><Icon><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></Icon>{prettyDate(state?.date)}</li>
                <li className="flex items-center gap-3"><Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>{state?.time ?? "04:30 pm"}</li>
                <li className="flex items-center gap-3"><Icon><circle cx="12" cy="8" r="4" /><path d="M4 21c0-3 3-5 8-5s8 2 8 5z" /></Icon>{state?.size ? `${state.size} (Standar seating)` : "2 people (Standar seating)"}</li>
              </ul>
            </div>

            <HoldBanner secs={secs} className="mt-10 !py-8 sm:!py-10" />

            <h2 className={`${heading} mt-12 md:mt-16`}>Data order</h2>

            <form onSubmit={onSubmit} className="mt-8 md:mt-10">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                <input className={field} placeholder="First name" aria-label="First name" autoComplete="given-name" required value={form.firstName} onChange={(e) => set("firstName", e.target.value)} />
                <input className={field} placeholder="Last name" aria-label="Last name" autoComplete="family-name" required value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />

                <div className="flex h-16 items-center gap-3 rounded-2xl bg-field px-3 dark:bg-field-dark sm:h-[76px]">
                  <label className="relative flex h-11 shrink-0 items-center gap-2 rounded-xl bg-white px-3 dark:bg-night sm:h-[52px] sm:px-4">
                    <span aria-hidden className="h-7 w-7 rounded-full ring-1 ring-black/10" style={{ background: COUNTRIES[dial] }} />
                    <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8l8 8 8-8" /></svg>
                    <select aria-label="Country code" value={dial} onChange={(e) => setDial(e.target.value)} className="absolute inset-0 cursor-pointer opacity-0">
                      {Object.keys(COUNTRIES).map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </label>
                  <input type="tel" aria-label="Phone number" placeholder="Phone number" autoComplete="tel-national" required value={form.phone} onChange={(e) => set("phone", e.target.value)} className="h-full min-w-0 flex-1 bg-transparent px-1 text-base text-cocoa outline-none placeholder:text-stone-400 dark:text-stone-100 dark:placeholder:text-stone-500 sm:text-lg" />
                </div>
                <input type="email" className={field} placeholder="Email address" aria-label="Email address" autoComplete="email" required value={form.email} onChange={(e) => set("email", e.target.value)} />

                <div className="relative">
                  <select aria-label="Occasion (optional)" value={form.occasion} onChange={(e) => set("occasion", e.target.value)} className={`${field} appearance-none pr-12 ${form.occasion ? "text-cocoa" : "text-stone-400 dark:text-stone-500"}`}>
                    <option value="">Select an accasion (optional)</option>
                    {OCCASIONS.map((o) => <option key={o} className="text-cocoa">{o}</option>)}
                  </select>
                  <Chevron />
                </div>
                <input className={field} placeholder="Add a special request" aria-label="Special request" value={form.request} onChange={(e) => set("request", e.target.value)} />
              </div>

              <div className="mt-10 space-y-5 sm:mt-12">
                <RadioRow checked={agree === 0} onChange={() => setAgree(0)}>I agree with what is stated above</RadioRow>
                <RadioRow checked={agree === 1} onChange={() => setAgree(1)}>Sign me up to receive dining offers and news from this restaurant by email.</RadioRow>
                <RadioRow checked={agree === 2} onChange={() => setAgree(2)}>Sign me up to receive dining offers and news from this restaurant by email.</RadioRow>
              </div>

              <h2 className={`${heading} mt-12 md:mt-16`}>Restaurant informations</h2>
              <div className={`${body} mt-6 space-y-6 md:!leading-8`}>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam.</p>
              </div>

              <button type="submit" className="mt-10 h-16 w-full rounded-2xl bg-brand text-lg text-white transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:mt-12 sm:h-[76px] sm:text-xl md:max-w-[430px]">Confirm reservation</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
