import { Link } from "react-router-dom";
import { Footer, MenuSection, Navbar, Orange, Green, body, h2, img, wrap, LOREM, LOREM_S, btn } from "../components/site";

const CHEFS = [["Betran Komar", "Head chef"], ["Ferry Sauwi", "Chef"], ["Iswan Dracho", "Chef"]];
const DOTS = ["left-[6%] top-[8%] h-10 w-10 bg-emerald-200", "left-[30%] top-[22%] h-5 w-5 bg-sky-200", "right-[6%] top-[26%] h-8 w-8 bg-rose-200", "left-[3%] top-[45%] h-7 w-7 bg-orange-300", "right-0 top-[52%] h-9 w-9 bg-fuchsia-200", "right-[15%] bottom-[8%] h-5 w-5 bg-stone-200"];

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-white font-sans text-cocoa transition-colors dark:bg-night dark:text-stone-100">
      <Navbar />

      <section className={`${wrap} grid items-center gap-10 pb-16 pt-6 md:grid-cols-2 md:pb-28 md:pt-10`}>
        <div>
          <span className="inline-block rounded-full bg-brand/15 px-5 py-2 text-xs text-brand">Restauran</span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.1] text-cocoa dark:text-white md:text-6xl">Italian<br />Cuisine</h1>
          <p className={`${body} mt-6 max-w-md`}>{LOREM}</p>
          <div className="mt-10 flex flex-wrap gap-4"><Orange to="/order-online">Order now</Orange><Green to="/reservation">Reservation</Green></div>
        </div>
        <img src={img("hero.webp")} alt="Spaghetti with feta and basil" className="mx-auto w-full max-w-[520px] drop-shadow-2xl" />
      </section>

      <section id="about-us" className="bg-mint dark:bg-[#12201A]">
        <div className={`${wrap} grid items-center gap-10 py-16 md:grid-cols-2 md:py-24`}>
          <img src={img("salad.webp")} alt="Fresh garden salad" className="mx-auto w-full max-w-[460px] drop-shadow-2xl" />
          <div>
            <h2 className={h2}>Welcome to <span className="block text-brand">delizioso</span></h2>
            <p className={`${body} mt-6 max-w-md`}>{LOREM_S}</p>
            <div className="mt-8"><Orange to="/menu">See our menu</Orange></div>
          </div>
        </div>
      </section>

      <MenuSection title="Our popular menu" />

      <section id="reservation" className="overflow-hidden bg-cream dark:bg-[#1B1712]">
        <div className={`${wrap} grid items-center gap-12 py-16 md:grid-cols-2 md:py-24`}>
          <div className="relative mx-auto aspect-square w-full max-w-[440px]">
            <div className="absolute -inset-8 rounded-full border border-brand/15" />
            <div className="absolute inset-0 rounded-full bg-[#F6EFE3] dark:bg-white/5" />
            <img src={img("table.webp")} alt="Guests sharing dishes at a table" className="absolute inset-[5%] h-[90%] w-[90%] rounded-full object-cover" />
            <img src={img("table-s1.webp")} alt="" className="absolute -right-6 -top-10 h-20 w-20 rounded-full ring-8 ring-white/70 dark:ring-white/10" />
            <img src={img("table-s2.webp")} alt="" className="absolute -bottom-6 -left-8 h-16 w-16 rounded-full ring-8 ring-white/70 dark:ring-white/10" />
          </div>
          <div>
            <h2 className={h2}>Let&apos;s reserve <span className="block">a table</span></h2>
            <p className={`${body} mt-6 max-w-md`}>{LOREM_S}</p>
            <div className="mt-8"><Orange to="/reservation">Reservation</Orange></div>
          </div>
        </div>
      </section>

      <section className={`${wrap} py-16 text-center md:py-24`}>
        <h2 className={h2}>Our greatest chef</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {CHEFS.map(([name, role], i) => (
            <figure key={name}>
              <img src={img(`chef${i + 1}.jpg`)} alt={name} className="aspect-[3/4] w-full rounded-3xl object-cover" />
              <figcaption className="mt-6"><p className="text-base font-semibold text-cocoa dark:text-white">{name}</p><p className="mt-3 text-sm text-stone-400">{role}</p></figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12"><Orange to="/about">View all</Orange></div>
      </section>

      <section className="relative overflow-hidden bg-[#FAFAF8] py-16 text-center dark:bg-[#1A1613] md:py-24">
        {DOTS.map((d) => <span key={d} aria-hidden className={`absolute rounded-full opacity-80 ${d}`} />)}
        <div className={`${wrap} relative`}>
          <h2 className={h2}>Our customers say</h2>
          <div className="mx-auto mt-12 h-32 w-32 rounded-full bg-stone-300 dark:bg-stone-600 md:h-40 md:w-40" />
          <p className="mt-6 text-base font-semibold text-cocoa dark:text-white">Starla Virgoun</p>
          <p className="mt-1 text-xs text-stone-400">Financial advisor</p>
          <blockquote className="relative mx-auto mt-10 max-w-lg px-8">
            <span aria-hidden className="absolute left-0 top-0 font-serif text-4xl text-cocoa dark:text-white">“</span>
            <p className={body}>{LOREM_S}</p>
            <span aria-hidden className="absolute bottom-0 right-0 font-serif text-4xl text-cocoa dark:text-white">”</span>
          </blockquote>
          <div className="mt-12 flex items-center justify-center gap-4">
            {["h-8 w-8", "h-14 w-14", "h-16 w-16"].map((c, i) => <span key={i} className={`${c} rounded-full bg-stone-300 dark:bg-stone-600`} />)}
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-brand/20 p-2"><span className="h-full w-full rounded-full bg-brand/40" /></span>
            <img src={img("avatar.webp")} alt="Customer" className="h-14 w-14 rounded-full object-cover" />
            <span className="h-16 w-16 rounded-full bg-stone-300 dark:bg-stone-600" />
            <span className="hidden h-8 w-8 rounded-full bg-stone-300 dark:bg-stone-600 sm:block" />
          </div>
        </div>
      </section>

      <section id="contact-us" className={`${wrap} py-16 md:py-24`}>
        <div className="relative overflow-hidden rounded-[48px] px-6 py-14 text-center text-white md:py-20">
          <img src={img("open.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative">
            <h2 className="font-serif text-3xl font-bold md:text-5xl">we are open from</h2>
            <p className="mt-4 text-xl font-semibold md:text-2xl">Monday–Sunday</p>
            <p className="mt-6 text-xs leading-6 md:text-sm">Launch: Mon-Sun : 11:00am-02:00pm<br />Dinner : sunday , 04:00pm-08:00pm<br />04:00pm-09:00pm</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Orange to="/order-online">Order now</Orange>
              <Link to="/reservation" className={`${btn} bg-white !text-cocoa`}>Reservation</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
