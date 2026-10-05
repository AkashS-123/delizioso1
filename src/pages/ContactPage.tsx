import { useState, type ChangeEvent, type FormEvent } from "react";
import { Footer, Navbar, h2, img, wrap } from "../components/site";

const field =
  "h-16 w-full rounded-2xl border border-transparent bg-field px-6 text-base outline-none transition placeholder:text-stone-400 focus:border-brand focus:bg-white " +
  "dark:bg-field-dark dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:bg-night sm:h-[70px] sm:px-8 sm:text-lg";

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "" });
  const [pinOpen, setPinOpen] = useState(true);

  const set = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: connect to your contact-form API
    console.log("Contact:", form);
  };

  return (
    <div className="overflow-x-hidden bg-white font-sans text-cocoa transition-colors dark:bg-night dark:text-stone-100">
      <Navbar active="Contact us" />

      <section className={`${wrap} pb-16 pt-10 text-center md:pb-24 md:pt-16`}>
        <h1 className={`${h2} md:!text-7xl`}>Contact us</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-ink-soft dark:text-stone-300 sm:text-xl">
          We love hearing from our customers. Feel free to share your experience or ask any questions you may have.
        </p>

        <form onSubmit={onSubmit} className="mx-auto mt-14 max-w-[985px] text-left">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-8">
            <input className={field} name="firstName" placeholder="First name" autoComplete="given-name" required value={form.firstName} onChange={set} />
            <input className={field} name="lastName" placeholder="Last name" autoComplete="family-name" required value={form.lastName} onChange={set} />
            <input type="email" className={field} name="email" placeholder="Email address" autoComplete="email" required value={form.email} onChange={set} />
            <input className={field} name="subject" placeholder="Subject" required value={form.subject} onChange={set} />
          </div>
          <textarea className={`${field} mt-5 h-64 resize-none py-6 sm:mt-8 sm:h-80 sm:py-8`} name="message" placeholder="Message" required value={form.message} onChange={set} />
          <button type="submit" className="mt-8 h-16 w-full rounded-2xl bg-brand text-lg font-medium text-white transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:mt-10 sm:h-[74px] sm:text-xl">Submit</button>
        </form>
      </section>

      {/* Map */}
      <section className="relative h-[420px] w-full sm:h-[520px] md:h-[620px]">
        <img src={img("mapbg.jpg")} alt="Map showing the Bronx, NY area" className="h-full w-full object-cover" />
        <div aria-hidden className="absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-full">
          <svg width="46" height="58" viewBox="0 0 46 58" fill="none"><path d="M23 0C10.3 0 0 10.3 0 23c0 17.3 23 35 23 35s23-17.7 23-35C46 10.3 35.7 0 23 0z" fill="#F0402C" /><circle cx="23" cy="23" r="10" fill="#fff" /></svg>
        </div>

        {pinOpen && (
          <div className="absolute left-1/2 top-[38%] flex w-[92%] max-w-[640px] -translate-x-1/2 items-center gap-4 rounded-2xl bg-white/95 p-3 shadow-xl backdrop-blur dark:bg-[#241D18]/95 sm:gap-5 sm:p-4">
            <img src={img("storefront.jpg")} alt="Delizioso restaurant storefront at night" className="h-20 w-24 shrink-0 rounded-xl object-cover sm:h-24 sm:w-28" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold text-cocoa dark:text-white sm:text-lg">Delizioso Restaurant</p>
              <p className="mt-1 text-xs text-ink-soft dark:text-stone-300 sm:text-sm">Bronx, NY 10463, Amerika Serikat</p>
              <p className="text-xs text-ink-soft dark:text-stone-300 sm:text-sm">40.885147,-73.9220459</p>
            </div>
            <a href="https://maps.google.com/?q=40.885147,-73.9220459" target="_blank" rel="noreferrer" aria-label="Get directions" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cocoa text-white transition hover:bg-black sm:h-14 sm:w-14">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
            </a>
            <button type="button" onClick={() => setPinOpen(false)} aria-label="Close" className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white shadow-md transition hover:bg-brand-dark">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
