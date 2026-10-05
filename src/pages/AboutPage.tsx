import { Footer, Navbar, body, img, wrap } from "../components/site";

const title = "font-serif text-5xl font-bold leading-[1.15] text-cocoa dark:text-white md:text-6xl lg:text-7xl";
const para = `${body} md:!leading-[2.1]`;

/** Photo inside two concentric soft rings, as in the design. */
function Rings({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative aspect-square ${className}`}>
      <div className="absolute inset-0 rounded-full bg-[#FAFAF8] dark:bg-white/[.03]" />
      <div className="absolute inset-[9.7%] rounded-full bg-[#F3F2F0] dark:bg-white/[.06]" />
      <img src={src} alt={alt} className="absolute inset-[18%] h-[64%] w-[64%] rounded-full object-cover" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden bg-white font-sans text-cocoa transition-colors dark:bg-night dark:text-stone-100">
      <Navbar active="About us" />

      {/* Our restaurant */}
      <section className="relative md:min-h-[58vw]">
        <Rings src={img("about1.webp")} alt="Chef plating dishes in the kitchen" className="mx-auto mt-6 w-[88%] max-w-[460px] md:absolute md:-left-[5.3%] md:top-[2vw] md:mt-0 md:w-[59.6%] md:max-w-none" />
        <div className={`${wrap} md:grid md:grid-cols-2`}>
          <div className="pb-12 pt-10 md:col-start-2 md:pb-0 md:pl-[8%] md:pt-[6vw]">
            <h1 className={title}><span className="text-brand">Our</span><br />restautant</h1>
            <p className={`${para} mt-10 max-w-[420px]`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br />Duis aute irure dolor in reprehenderit in voluptate velit esse.</p>
          </div>
        </div>
      </section>

      {/* Second story */}
      <section className="relative md:min-h-[62vw]">
        <Rings src={img("about2.webp")} alt="Hands serving a plated dish" className="mx-auto w-[88%] max-w-[460px] md:absolute md:-right-[5.3%] md:top-0 md:w-[59.6%] md:max-w-none" />
        <div className={`${wrap} md:grid md:grid-cols-2`}>
          <p className={`${para} max-w-[360px] py-10 md:mt-[14vw] md:py-0`}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
        </div>
      </section>

      {/* Owner */}
      <section className={`${wrap} grid items-center gap-10 pb-20 pt-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:pb-28`}>
        <img src={img("owner.jpg")} alt="Ismail Marzuki, owner and executive chef" className="aspect-[345/517] w-full max-w-[420px] object-cover md:max-w-none" />
        <div>
          <h2 className={title}><span className="text-brand">Owner</span> &amp;<br />Executive Chef</h2>
          <p className="mt-8 text-2xl font-semibold text-cocoa dark:text-white md:text-3xl">Ismail Marzuki</p>
          <blockquote className="relative mt-10 max-w-md pt-10">
            <span aria-hidden className="absolute left-0 top-0 font-serif text-6xl leading-none text-brand/30">“</span>
            <p className="text-xl font-light italic leading-[1.9] text-ink-soft dark:text-stone-300 md:text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <span aria-hidden className="mt-2 block text-right font-serif text-6xl leading-none text-brand/30">”</span>
          </blockquote>
        </div>
      </section>

      <Footer />
    </div>
  );
}
