import { useLocation, useNavigate } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Footer, Navbar, h2, img } from "../components/site";

const TIMES = ["11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "4:00 pm", "5:00 pm", "6:00 pm", "7:00 pm", "8:00 pm"];
const SIZES = Array.from({ length: 10 }, (_, i) => `${i + 1} ${i ? "people" : "person"}`);

const box =
  "h-16 w-full appearance-none rounded-3xl border border-transparent bg-field px-6 text-base outline-none transition focus:border-brand focus:bg-white " +
  "dark:bg-field-dark dark:focus:bg-night sm:h-[100px] sm:px-[50px] sm:text-xl";

const Chevron = () => (
  <svg aria-hidden className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-cocoa dark:text-stone-200 sm:right-[46px]" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8l8 8 8-8" /></svg>
);

const todayISO = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };

export function ReservationHero() {
  const navigate = useNavigate();
  // "Modify" on the success page sends the previous booking back here to be edited.
  const prev = (useLocation().state ?? {}) as { date?: string; time?: string; size?: string };
  const [f, setF] = useState({ date: prev.date ?? "", time: prev.time ?? "", size: prev.size ?? "" });
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF((v) => ({ ...v, [e.target.name]: e.target.value }));
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: connect to your reservation API
    navigate("/reservation/confirm", { state: f });
  };
  const openPicker = (e: { currentTarget: HTMLInputElement }) => { try { e.currentTarget.showPicker?.(); } catch { /* not supported / needs gesture */ } };
  const tone = (v: string) => (v ? "text-cocoa dark:text-stone-100" : "text-stone-400 dark:text-stone-500");

  return (
      <section className="relative mt-6 md:mb-[8vw] md:mt-[6.7vw] md:min-h-[57.3vw]">
        {/* Rings: pill shapes bleeding off the left edge, concentric with the photo */}
        <div aria-hidden className="absolute left-0 top-0 hidden h-[57.3vw] w-[49.7vw] rounded-r-full bg-[#FAFAF8] dark:bg-white/[.03] md:block" />
        <div aria-hidden className="absolute left-0 top-[5.55vw] hidden h-[46.2vw] w-[44.1vw] rounded-r-full bg-[#F1F0EE] dark:bg-white/[.06] md:block" />
        <img src={img("reserve.webp")} alt="Set table with wine glasses" className="mx-auto h-64 w-64 rounded-full object-cover sm:h-80 sm:w-80 md:absolute md:left-[2.8vw] md:top-[10.4vw] md:h-[36.5vw] md:w-[36.5vw]" />

        <div className="relative mx-auto flex w-full max-w-[1110px] px-6 py-10 md:min-h-[57.3vw] md:items-center md:py-0">
          <form onSubmit={onSubmit} className="w-full max-w-[475px] md:ml-auto">
            <h1 className={`${h2} md:!text-7xl`}>Book a table</h1>
            <div className="mt-8 space-y-5 md:mt-12 md:space-y-10">
              <div className="relative">
                <label htmlFor="date" className="sr-only">Date</label>
                {/* Always a native date input (swapping type on focus is unreliable, esp. iOS Safari).
                    The "Date" label is drawn on top while empty; the native mm/dd/yyyy text is hidden. */}
                <input id="date" name="date" type="date" required min={todayISO()} value={f.date} onChange={onChange} onClick={openPicker}
                  className={`${box} ${f.date ? "text-cocoa dark:text-stone-100" : "text-transparent"} [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0`} />
                {!f.date && <span aria-hidden className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-base text-stone-400 dark:text-stone-500 sm:left-[50px] sm:text-xl">Date</span>}
                <Chevron />
              </div>
              <div className="relative">
                <label htmlFor="time" className="sr-only">Time</label>
                <select id="time" name="time" required value={f.time} onChange={onChange} className={`${box} ${tone(f.time)}`}>
                  <option value="" disabled>Time</option>
                  {TIMES.map((t) => <option key={t} value={t} className="text-cocoa">{t}</option>)}
                </select>
                <Chevron />
              </div>
              <div className="relative">
                <label htmlFor="size" className="sr-only">Party size</label>
                <select id="size" name="size" required value={f.size} onChange={onChange} className={`${box} ${tone(f.size)}`}>
                  <option value="" disabled>Party size</option>
                  {SIZES.map((t) => <option key={t} value={t} className="text-cocoa">{t}</option>)}
                </select>
                <Chevron />
              </div>
            </div>
            <button type="submit" className="mt-8 h-16 w-full rounded-3xl bg-brand text-lg font-semibold text-white transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:mt-10 sm:h-[100px] sm:text-[26px]">Book now</button>
          </form>
        </div>
      </section>
  );
}

export default function ReservationPage() {
  return (
    <div className="overflow-x-hidden bg-white font-sans text-cocoa transition-colors dark:bg-night dark:text-stone-100">
      <Navbar active="Reservation" />
      <ReservationHero />
      <Footer />
    </div>
  );
}
