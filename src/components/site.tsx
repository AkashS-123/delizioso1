import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { CATEGORY_TABS, filterByTab, type MenuItem } from "../data/menu";
import { useTheme } from "../hooks/useTheme";
import { money } from "../lib/storage";
import { Logo, ThemeToggle } from "./AuthLayout";
import DishImage, { Stars } from "./DishImage";
import DishModal from "./DishModal";

export { files, img } from "../lib/assets";

export const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sodales senectus dictum arcu sit tristique donec eget.";
export const LOREM_S = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis ultricies at eleifend proin. Congue nibh nulla ultricies nec quam";
export const wrap = "mx-auto w-full max-w-[1110px] px-6";
export const h2 = "font-serif text-4xl font-bold text-cocoa dark:text-white md:text-5xl lg:text-6xl";
export const body = "text-sm leading-7 text-ink-soft dark:text-stone-300 md:text-base md:leading-8";
export const btn = "inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-medium text-white transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:h-14 md:px-10 md:text-base";
/** Call-to-action buttons – real links, so they actually navigate. */
export const Orange = ({ to, children }: { to: string; children: ReactNode }) => <Link to={to} className={`${btn} bg-brand`}>{children}</Link>;
export const Green = ({ to, children }: { to: string; children: ReactNode }) => <Link to={to} className={`${btn} bg-leaf`}>{children}</Link>;

const ROUTES: Record<string, string> = { Home: "/", Menu: "/menu", "About us": "/about", "Order online": "/order-online", Reservation: "/reservation", "Contact us": "/contact" };
const NAV = ["Home", "Menu", "About us", "Order online", "Reservation", "Contact us"];

export function Navbar({ active = "Home" }: { active?: string }) {
  const { dark, toggle } = useTheme();
  const { user, logout } = useAuth();
  const { count } = useCart();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const loginLink = { to: "/login-art", state: { from: location.pathname } };
  return (
    <header className={`${wrap} relative z-20 flex items-center justify-between py-6`}>
      <Link to="/" className="flex items-center gap-2"><Logo /><span className="text-xs font-semibold text-cocoa dark:text-white">Deli<span className="text-brand">zioso</span></span></Link>
      <nav aria-label="Main" className={`${open ? "flex" : "hidden"} absolute inset-x-6 top-full flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg dark:bg-field-dark lg:static lg:flex lg:flex-row lg:gap-8 lg:bg-transparent lg:p-0 lg:shadow-none lg:dark:bg-transparent`}>
        {NAV.map((n) => (
          <Link key={n} to={ROUTES[n]} onClick={() => setOpen(false)} className={`whitespace-nowrap text-xs ${n === active ? "text-brand" : "text-cocoa dark:text-stone-200"} hover:text-brand`}>{n}</Link>
        ))}
        {/* The header's Log in button is hidden on phones – keep it reachable from the menu. */}
        <div className="border-t border-stone-200 pt-4 dark:border-white/10 sm:hidden lg:hidden">
          {user
            ? <button type="button" onClick={() => { logout(); setOpen(false); }} className="text-xs text-cocoa dark:text-stone-200">Log out ({user.name.split(" ")[0]})</button>
            : <Link {...loginLink} className="text-xs font-medium text-leaf">Log in</Link>}
        </div>
      </nav>
      <div className="flex items-center gap-3">
        <ThemeToggle dark={dark} onToggle={toggle} />
        <Link to="/order-online" aria-label={count ? `Order list, ${count} items` : "Order list"} className="relative flex h-9 w-9 items-center justify-center rounded-full bg-field text-cocoa dark:bg-field-dark dark:text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" /></svg>
          {count > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">{count}</span>}
        </Link>
        {user ? (
          <div className="hidden items-center gap-3 sm:flex">
            <span className="max-w-[110px] truncate text-xs text-cocoa dark:text-stone-200">Hi, {user.name.split(" ")[0]}</span>
            <button type="button" onClick={logout} className="h-9 rounded-full bg-leaf px-5 text-xs font-medium text-white">Log out</button>
          </div>
        ) : (
          <Link {...loginLink} className="hidden h-9 items-center whitespace-nowrap rounded-full bg-leaf px-6 text-xs font-medium text-white sm:flex">Log in</Link>
        )}
        <button type="button" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex h-9 w-9 items-center justify-center text-cocoa dark:text-white lg:hidden">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </div>
    </header>
  );
}

/** Real pagination: renders only the pages that exist, and nothing when there is one page. */
export function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (p: number) => void }) {
  if (pages <= 1) return null;
  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-3 text-xs">
      <button type="button" aria-label="Previous" disabled={page === 1} onClick={() => onChange(page - 1)} className="flex h-9 w-9 items-center justify-center rounded-lg bg-cocoa text-white disabled:opacity-40 dark:bg-brand">‹</button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <button type="button" key={n} aria-label={`Page ${n}`} aria-current={page === n ? "page" : undefined} onClick={() => onChange(n)} className={`h-9 w-9 rounded-lg ${page === n ? "bg-brand text-white" : "bg-brand/10 text-brand"}`}>{n}</button>
      ))}
      <button type="button" aria-label="Next" disabled={page === pages} onClick={() => onChange(page + 1)} className="flex h-9 w-9 items-center justify-center rounded-lg bg-cocoa text-white disabled:opacity-40 dark:bg-brand">›</button>
    </nav>
  );
}

export function CategoryTabs({ tab, onChange, className = "" }: { tab: number; onChange: (i: number) => void; className?: string }) {
  return (
    <div role="tablist" aria-label="Menu categories" className={className}>
      {CATEGORY_TABS.map((t, i) => (
        <button type="button" role="tab" aria-selected={tab === i} key={t} onClick={() => onChange(i)} className={`h-12 shrink-0 whitespace-nowrap rounded-full px-6 text-sm md:flex-1 md:max-w-[190px] md:px-4 ${tab === i ? "bg-cocoa font-medium text-white dark:bg-brand" : "bg-field text-cocoa dark:bg-field-dark dark:text-stone-200"}`}>{t}</button>
      ))}
    </div>
  );
}

export const PAGE_SIZE = 6;

export function MenuSection({ title, page: asPage = false }: { title: string; page?: boolean }) {
  const navigate = useNavigate();
  const { add } = useCart();
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<MenuItem | null>(null);

  const items = useMemo(() => filterByTab(tab), [tab]);
  const pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  // /menu paginates the full catalogue; the Home teaser only shows the first row of results.
  const visible = asPage ? items.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE) : items.slice(0, PAGE_SIZE);

  useEffect(() => setPage(1), [tab]);

  const orderNow = (item: MenuItem, qty = 1) => { add(item.id, qty); setSelected(null); navigate("/order-online/checkout"); };

  return (
    <section id="menu" className={`${wrap} ${asPage ? "pb-16 pt-10 md:pb-24 md:pt-16" : "py-16 md:py-24"}`}>
      {asPage ? <h1 className={`${h2} text-center md:!text-7xl`}>{title}</h1> : <h2 className={`${h2} text-center`}>{title}</h2>}
      <CategoryTabs tab={tab} onChange={setTab} className="-mx-6 mt-10 flex gap-3 overflow-x-auto px-6 pb-2 md:mx-0 md:mt-16 md:justify-between md:overflow-visible md:px-0" />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((d) => (
          <article key={d.id} onClick={() => setSelected(d)} className="flex cursor-pointer flex-col items-center rounded-[40px] bg-field px-6 pb-8 pt-6 text-center transition hover:-translate-y-1 hover:shadow-lg dark:bg-field-dark">
            {/* Real button so keyboard users can open the dish too */}
            <button type="button" onClick={(e) => { e.stopPropagation(); setSelected(d); }} aria-haspopup="dialog" aria-label={`View ${d.name}`} className="flex flex-col items-center rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
              <DishImage item={d} className="h-44 w-44 object-contain drop-shadow-lg" />
              <h3 className="mt-6 text-lg font-semibold text-cocoa dark:text-white">{d.name}</h3>
            </button>
            <Stars n={d.rating} className="mt-2" />
            <p className="mt-4 text-[11px] leading-6 text-ink-soft dark:text-stone-400">{d.description}</p>
            <div className="mt-6 flex w-full items-center justify-between">
              <span className="text-lg font-semibold text-cocoa dark:text-white">{money(d.price)}</span>
              <button type="button" onClick={(e) => { e.stopPropagation(); orderNow(d); }} aria-label={`Order ${d.name} now`} className="h-9 rounded-full bg-brand px-6 text-xs font-medium text-white hover:bg-brand-dark">Order now</button>
            </div>
          </article>
        ))}
      </div>
      {visible.length === 0 && <p className="mt-10 text-center text-sm text-ink-soft dark:text-stone-400">Nothing in this category yet.</p>}

      {asPage ? <Pagination page={safePage} pages={pages} onChange={setPage} /> : (
        <div className="mt-12 text-center"><Orange to="/menu">See full menu</Orange></div>
      )}

      {selected && <DishModal item={selected} onClose={() => setSelected(null)} onOrder={(qty) => orderNow(selected, qty)} />}
    </section>
  );
}

const ICONS: Record<string, ReactNode> = {
  Twitter: <path fill="currentColor" d="M23.95 4.57a10 10 0 0 1-2.82.78 4.96 4.96 0 0 0 2.16-2.72c-.95.56-2 .96-3.13 1.18a4.92 4.92 0 0 0-8.38 4.48A13.98 13.98 0 0 1 1.64 3.16a4.82 4.82 0 0 0-.67 2.48c0 1.71.87 3.21 2.19 4.1a4.9 4.9 0 0 1-2.23-.62v.06a4.92 4.92 0 0 0 3.95 4.83 5 5 0 0 1-2.21.08 4.94 4.94 0 0 0 4.6 3.42A9.87 9.87 0 0 1 0 19.54a14 14 0 0 0 7.56 2.2c9.05 0 14-7.5 14-13.98 0-.21 0-.42-.02-.63A9.94 9.94 0 0 0 24 4.59z" />,
  Instagram: <g fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></g>,
  Facebook: <path fill="currentColor" d="M9 8H6v4h3v12h5V12h3.64L18 8h-4V6.33C14 5.38 14.19 5 15.12 5H18V0h-3.81C10.6 0 9 1.58 9 4.62z" />,
};

const FOOTER_ROUTES: Record<string, string> = { Home: "/", Menu: "/menu", "Order online": "/order-online", Reservation: "/reservation", "About us": "/about" };

export function Footer() {
  return (
    <footer className="bg-cocoa text-stone-200">
        <div className={`${wrap} grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]`}>
          <div>
            <div className="flex items-center gap-2"><Logo /><span className="text-xs font-semibold text-white">Deli<span className="text-brand">zioso</span></span></div>
            <p className="mt-6 max-w-[260px] text-sm leading-7">Viverra gravida morbi egestas facilisis tortor netus non duis tempor.</p>
            <div className="mt-6 flex gap-3">
              {Object.entries(ICONS).map(([s, path]) => <a key={s} href="#" aria-label={s} className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-cocoa transition hover:bg-brand hover:text-white"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>{path}</svg></a>)}
            </div>
          </div>
          {[["Page", ["Home", "Menu", "Order online", "Catering", "Reservation"]], ["Information", ["About us", "Testimonial", "Event"]]].map(([t, links]) => (
            <div key={t as string}>
              <h3 className="text-base font-semibold text-brand">{t as string}</h3>
              <ul className="mt-4 space-y-3 text-sm">{(links as string[]).map((l) => <li key={l}>{FOOTER_ROUTES[l] ? <Link to={FOOTER_ROUTES[l]} className="hover:text-brand">{l}</Link> : <a href="#" className="hover:text-brand">{l}</a>}</li>)}</ul>
            </div>
          ))}
          <div>
            <h3 className="text-base font-semibold text-brand">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm"><li>3247 Johnson Ave, Bronx, NY 10463, Amerika Serikat</li><li>deliozso@gmail.com</li><li>+123 4567 890</li></ul>
          </div>
        </div>
        <p className="pb-8 text-center text-xs">Copyright © 2022 Delizioso</p>
      </footer>
  );
}
