import { useState, type FormEvent, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ModalShell, { HoldBanner, useHoldTimer } from "../components/ModalShell";
import { body, h2 } from "../components/site";

export const OCCASIONS = ["Birthday", "Anniversary", "Business meal", "Date night", "Other"];
export const COUNTRIES: Record<string, string> = {
  "+49": "linear-gradient(#000 33%,#e11 33% 66%,#fc0 66%)",
  "+62": "linear-gradient(#e11 50%,#fff 50%)",
  "+1": "linear-gradient(#b22 33%,#fff 33% 66%,#36c 66%)",
  "+91": "linear-gradient(#f93 33%,#fff 33% 66%,#193 66%)",
};

export const field =
  "h-16 w-full rounded-3xl border border-transparent bg-field px-6 text-base outline-none transition placeholder:text-stone-400 focus:border-brand focus:bg-white " +
  "dark:bg-field-dark dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:bg-night sm:h-[100px] sm:px-[48px] sm:text-xl";
export const heading = "text-xl font-semibold text-cocoa dark:text-white sm:text-2xl";

export const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-cocoa dark:text-stone-200" aria-hidden>{children}</svg>
);
export const Chevron = ({ className = "" }: { className?: string }) => (
  <svg aria-hidden width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`pointer-events-none text-cocoa dark:text-stone-200 ${className}`}><path d="M4 8l8 8 8-8" /></svg>
);

export function prettyDate(v?: string) {
  if (!v) return "Saturday, 28 february 2022";
  const d = new Date(`${v}T00:00`);
  if (isNaN(+d)) return v;
  const l = (o: Intl.DateTimeFormatOptions) => d.toLocaleDateString("en-US", o);
  return `${l({ weekday: "long" })}, ${d.getDate()} ${l({ month: "long" }).toLowerCase()} ${d.getFullYear()}`;
}

function DetailCard({ state }: { state: { date?: string; time?: string; size?: string } | null }) {
  return (
    <div className="rounded-3xl bg-field p-6 dark:bg-field-dark sm:p-10">
      <h3 className={heading}>Reservation detail</h3>
      <ul className="mt-6 space-y-5 text-base text-ink-soft dark:text-stone-300 sm:mt-8 sm:text-lg">
        <li className="flex items-center gap-4 sm:gap-6"><Icon><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></Icon><span className="min-w-0">{prettyDate(state?.date)}</span></li>
        <li className="flex items-center gap-4 sm:gap-6"><Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon><span className="min-w-0">{state?.time ?? "04:30 pm"}</span></li>
        <li className="flex items-center gap-4 sm:gap-6"><Icon><circle cx="12" cy="8" r="4" /><path d="M4 21c0-3 3-5 8-5s8 2 8 5z" /></Icon><span className="min-w-0">{state?.size ? `${state.size} (Standar seating)` : "2 people (Standar seating)"}</span></li>
      </ul>
    </div>
  );
}

export default function ConfirmReservationPage() {
  const { state } = useLocation() as { state: { date?: string; time?: string; size?: string } | null };
  const nav = useNavigate();
  const secs = useHoldTimer();
  const [dial, setDial] = useState("+49");
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", occasion: "", request: "", offers: false });

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: connect to your reservation API
    console.log("Confirm reservation:", { ...form, phone: `${dial} ${form.phone}`, ...state });
    nav("/reservation/success", { state });
  };

  return (
    <ModalShell>

            <h1 className={`${h2} mt-10 text-center md:mt-16 md:!text-7xl`}>Reservation</h1>

            <HoldBanner secs={secs} className="mt-10" />

            {/* Small screens: the booking summary sits right under the timer, before the form */}
            <div className="mt-10 lg:hidden"><DetailCard state={state} /></div>

            <h2 className={`${heading} mt-12 lg:mt-[70px]`}>Data order</h2>

            {/* Two columns only from lg – at md the columns were ~250px wide and squeezed the content */}
            <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)] lg:gap-10">
              <div className="min-w-0 space-y-6 sm:space-y-10">
                <input className={field} placeholder="First name" aria-label="First name" autoComplete="given-name" required value={form.firstName} onChange={(e) => set("firstName", e.target.value)} />
                <input className={field} placeholder="Last name" aria-label="Last name" autoComplete="family-name" required value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />
                <div className="flex h-16 items-center gap-4 rounded-3xl bg-field px-3 dark:bg-field-dark sm:h-[100px] sm:px-[15px]">
                  <label className="relative flex h-12 shrink-0 items-center gap-3 rounded-xl bg-white px-4 dark:bg-night sm:h-[60px] sm:px-6">
                    <span aria-hidden className="h-8 w-8 rounded-full ring-1 ring-black/10 sm:h-10 sm:w-10" style={{ background: COUNTRIES[dial] }} />
                    <Chevron className="!h-5 !w-5" />
                    <select aria-label="Country code" value={dial} onChange={(e) => setDial(e.target.value)} className="absolute inset-0 cursor-pointer opacity-0">
                      {Object.keys(COUNTRIES).map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </label>
                  <input type="tel" aria-label="Phone number" placeholder="Phone number" autoComplete="tel-national" required value={form.phone} onChange={(e) => set("phone", e.target.value)} className="h-full min-w-0 flex-1 bg-transparent px-2 text-base text-cocoa outline-none placeholder:text-stone-400 dark:text-stone-100 dark:placeholder:text-stone-500 sm:px-6 sm:text-xl" />
                </div>
                <input type="email" className={field} placeholder="Email address" aria-label="Email address" autoComplete="email" required value={form.email} onChange={(e) => set("email", e.target.value)} />
                <div className="relative">
                  <select aria-label="Occasion" value={form.occasion} onChange={(e) => set("occasion", e.target.value)} className={`${field} appearance-none ${form.occasion ? "text-cocoa" : "text-stone-400 dark:text-stone-500"}`}>
                    <option value="" disabled>Select an accasion</option>
                    {OCCASIONS.map((o) => <option key={o} className="text-cocoa">{o}</option>)}
                  </select>
                  <Chevron className="absolute right-6 top-1/2 -translate-y-1/2 sm:right-[46px]" />
                </div>
                <textarea className={`${field} h-56 resize-none py-6 sm:h-[325px] sm:py-[34px]`} placeholder="Add a special request" aria-label="Special request" value={form.request} onChange={(e) => set("request", e.target.value)} />

                <label className="flex cursor-pointer items-start gap-5 pt-4 text-base leading-7 text-ink-soft dark:text-stone-300 sm:text-lg">
                  <input type="checkbox" className="peer sr-only" checked={form.offers} onChange={(e) => set("offers", e.target.checked)} />
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-stone-400 text-transparent peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand dark:border-stone-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                  </span>
                  Sign me up to receive dining offers and news from this restaurant by email.
                </label>

                <button type="submit" className="!mt-14 h-16 w-full rounded-3xl bg-brand text-lg text-white transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:h-[100px] sm:text-2xl lg:!mt-[80px]">Confirm reservation</button>
              </div>

              <aside>
                <div className="hidden lg:block"><DetailCard state={state} /></div>
                <h3 className={`${heading} px-1 lg:mt-12`}>Restaurant informations</h3>
                <div className={`${body} mt-6 space-y-6 px-1 md:!leading-8 lg:mt-8`}>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                  <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam.</p>
                </div>
              </aside>
            </form>
    </ModalShell>
  );
}
