import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import ModalShell from "../components/ModalShell";
import { body, img } from "../components/site";

const heading = "text-xl font-semibold text-cocoa dark:text-white sm:text-2xl";
const field =
  "h-16 w-full rounded-2xl border border-transparent bg-field px-6 text-base outline-none transition placeholder:text-stone-400 focus:border-brand focus:bg-white " +
  "dark:bg-field-dark dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:bg-night sm:h-[76px] sm:px-8 sm:text-lg";

const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-cocoa dark:text-stone-200" aria-hidden>{children}</svg>
);

function prettyDate(v?: string) {
  if (!v) return "Saturday, 28 february 2022";
  const d = new Date(`${v}T00:00`);
  if (isNaN(+d)) return v;
  const l = (o: Intl.DateTimeFormatOptions) => d.toLocaleDateString("en-US", o);
  return `${l({ weekday: "long" })}, ${d.getDate()} ${l({ month: "long" }).toLowerCase()} ${d.getFullYear()}`;
}

/** Stable-per-mount "confirmation" booking id, as shown in the design. */
const bookingId = Math.floor(100000 + Math.random() * 900000);

export default function ReservationSuccessPage() {
  const { state } = useLocation() as { state: { date?: string; time?: string; size?: string } | null };
  const [request, setRequest] = useState("");
  const [occasion, setOccasion] = useState("");

  return (
    <ModalShell>
        {/* Success banner (bleeds to the modal's edges, so it sits outside the padded header area) */}
        <div className="relative -mx-5 mt-8 overflow-hidden bg-leaf px-6 py-10 text-white sm:-mx-10 sm:px-10 md:-mx-[60px] md:px-[60px] md:py-14">
          <span aria-hidden className="absolute -left-6 top-6 h-16 w-16 rounded-full bg-white/10" />
          <span aria-hidden className="absolute right-[8%] top-[15%] h-24 w-24 rounded-full bg-white/10" />
          <span aria-hidden className="absolute bottom-4 right-[22%] h-14 w-14 rounded-full bg-white/10" />
          <h1 className="relative font-serif text-3xl font-bold sm:text-4xl md:text-5xl">Reservation has been confirmed</h1>
          <ul className="relative mt-6 space-y-3 text-sm sm:text-base">
            <li className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/25"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>The confirmation result has been sent to your email</li>
            <li className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/25"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg></span>Booking ID : #{bookingId}</li>
          </ul>
        </div>

        <div className="grid gap-8 pt-10 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10 lg:pt-14">
          <div className="relative mx-auto h-48 w-48 sm:h-56 sm:w-56">
            <div className="absolute inset-0 rounded-full bg-[#FAFAF8] dark:bg-white/[.03]" />
            <img src={img("reserve.webp")} alt="Set table with wine glasses" className="absolute inset-[12%] h-[76%] w-[76%] rounded-full object-cover" />
          </div>

          <div>
            <h2 className={heading}>Reservation detail</h2>
            <ul className="mt-6 space-y-4 text-base text-ink-soft dark:text-stone-300 sm:text-lg">
              <li className="flex items-center gap-4"><Icon><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></Icon>{prettyDate(state?.date)}</li>
              <li className="flex items-center gap-4"><Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>{state?.time ?? "04:30 pm"}</li>
              <li className="flex items-center gap-4"><Icon><circle cx="12" cy="8" r="4" /><path d="M4 21c0-3 3-5 8-5s8 2 8 5z" /></Icon>{state?.size ? `${state.size} (Standar seating)` : "2 people (Standar seating)"}</li>
            </ul>
          </div>

          <div className="flex gap-4 lg:flex-col">
            <Link to="/reservation" state={state} className="flex h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-sky-100 px-6 font-medium text-sky-700 transition hover:bg-sky-200 dark:bg-sky-900/40 dark:text-sky-300 lg:w-52">
              Modify
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>
            </Link>
            <Link to="/reservation/cancel" state={state} className="flex h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-rose-100 px-6 font-medium text-rose-600 transition hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300 lg:w-52">
              Cancel
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:mt-16 md:grid-cols-2">
          <div className="space-y-6">
            <div className="relative">
              <select aria-label="Occasion (optional)" value={occasion} onChange={(e) => setOccasion(e.target.value)} className={`${field} appearance-none pr-12 ${occasion ? "text-cocoa" : "text-stone-400 dark:text-stone-500"}`}>
                <option value="">Select an accasion (optional)</option>
                {["Birthday", "Anniversary", "Business meal", "Date night", "Other"].map((o) => <option key={o} className="text-cocoa">{o}</option>)}
              </select>
              <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-cocoa dark:text-stone-200"><path d="M4 8l8 8 8-8" /></svg>
            </div>
            <textarea value={request} onChange={(e) => setRequest(e.target.value)} placeholder="Add a special request" aria-label="Special request" className={`${field} h-56 resize-none py-6 sm:h-[300px] sm:py-8`} />
          </div>
          <div>
            <h2 className={heading}>Restaurant informations</h2>
            <div className={`${body} mt-6 space-y-6 md:!leading-8`}>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam.</p>
            </div>
          </div>
        </div>
    </ModalShell>
  );
}
