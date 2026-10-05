import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DishImage, { Stars } from "../components/DishImage";
import DishModal from "../components/DishModal";
import { CategoryTabs, Footer, Navbar, PAGE_SIZE, Pagination, h2, wrap } from "../components/site";
import { useCart } from "../context/CartContext";
import { SECTIONS, filterByTab, type MenuItem, type Section } from "../data/menu";
import { money } from "../lib/storage";

function DishCard({ dish, featured, onOpen, onAdd }: { dish: MenuItem; featured: boolean; onOpen: () => void; onAdd: () => void }) {
  return (
    <article onClick={onOpen} className={`flex cursor-pointer flex-col items-center rounded-[32px] px-5 pb-7 pt-6 text-center transition hover:-translate-y-1 hover:shadow-lg ${featured ? "bg-brand text-white" : "bg-field text-cocoa dark:bg-field-dark dark:text-stone-100"}`}>
      <button type="button" onClick={(e) => { e.stopPropagation(); onOpen(); }} aria-haspopup="dialog" aria-label={`View ${dish.name}`} className="flex flex-col items-center rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
        <DishImage item={dish} order className="h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32" />
        <h3 className="mt-5 text-base font-semibold">{dish.name}</h3>
      </button>
      <Stars n={dish.rating} className="mt-2" on={featured ? "text-white" : "text-brand"} off={featured ? "text-white/40" : "text-stone-200 dark:text-stone-600"} />
      <p className={`mt-3 text-xs leading-5 ${featured ? "text-white/85" : "text-ink-soft dark:text-stone-400"}`}>{dish.description}</p>
      <div className="mt-5 flex w-full items-center justify-between">
        <span className="font-semibold">{money(dish.price)}</span>
        <button type="button" onClick={(e) => { e.stopPropagation(); onAdd(); }} aria-label={`Add ${dish.name} to cart`} className={`h-9 rounded-full px-5 text-xs font-medium transition ${featured ? "bg-white text-brand hover:bg-stone-100" : "bg-brand text-white hover:bg-brand-dark"}`}>Add to cart</button>
      </div>
    </article>
  );
}

function DishSection({ title, dishes, onOpen, onAdd }: { title: Section; dishes: MenuItem[]; onOpen: (d: MenuItem) => void; onAdd: (d: MenuItem) => void }) {
  const [page, setPage] = useState(1);
  const pages = Math.ceil(dishes.length / PAGE_SIZE);
  const visible = dishes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <div className="mt-16 first:mt-0">
      <h2 className="inline-block border-b-4 border-brand pb-2 text-2xl font-bold uppercase text-cocoa dark:text-white">{title}</h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {visible.map((d) => <DishCard key={d.id} dish={d} featured={d === dishes[0]} onOpen={() => onOpen(d)} onAdd={() => onAdd(d)} />)}
      </div>
      <Pagination page={page} pages={pages} onChange={setPage} />
    </div>
  );
}

export default function OrderOnlinePage() {
  const navigate = useNavigate();
  const cart = useCart();
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState<MenuItem | null>(null);

  // Category tab filters the dishes, then they are grouped into their sections.
  const sections = useMemo(() => {
    const items = filterByTab(tab);
    return SECTIONS.map((s) => ({ name: s, dishes: items.filter((i) => i.section === s) })).filter((s) => s.dishes.length);
  }, [tab]);

  return (
    <div className="overflow-x-hidden bg-white font-sans text-cocoa transition-colors dark:bg-night dark:text-stone-100">
      <Navbar active="Order online" />

      <section className={`${wrap} pb-16 pt-10 md:pb-24`}>
        <h1 className={`${h2} text-center md:!text-7xl`}>Menu</h1>

        <CategoryTabs tab={tab} onChange={setTab} className="-mx-6 mt-10 flex gap-3 overflow-x-auto px-6 pb-2 md:mx-0 md:mt-16 md:justify-center md:px-0" />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-8">
          <div className="min-w-0">
            {sections.map((s) => (
              <DishSection key={`${tab}-${s.name}`} title={s.name} dishes={s.dishes} onOpen={setSelected} onAdd={(d) => cart.add(d.id)} />
            ))}
          </div>

          {/* Order list — sticky beside the menu on large screens */}
          <aside aria-label="Order list" className="rounded-3xl bg-field p-6 dark:bg-field-dark lg:sticky lg:top-6">
            <div className="rounded-2xl bg-[#6C3FAE] py-4 text-center text-base font-semibold text-white">Order list</div>

            <ul className="mt-6 divide-y divide-stone-200 dark:divide-white/10">
              {cart.lines.length === 0 && <li className="py-6 text-center text-sm text-ink-soft dark:text-stone-400">Your cart is empty.</li>}
              {cart.lines.map(({ item, qty }) => (
                <li key={item.id} className="py-5 first:pt-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-cocoa dark:text-white">{item.name}</span>
                    <button type="button" aria-label={`Remove ${item.name}`} onClick={() => cart.remove(item.id)} className="text-red-500 transition hover:text-red-600">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13" /></svg>
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button type="button" aria-label={`Decrease ${item.name}`} onClick={() => cart.setQty(item.id, qty - 1)} className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-cocoa shadow-sm dark:bg-night dark:text-white">−</button>
                      <span className="w-4 text-center text-sm" aria-label={`${item.name} quantity`}>{qty}</span>
                      <button type="button" aria-label={`Increase ${item.name}`} onClick={() => cart.setQty(item.id, qty + 1)} className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-cocoa shadow-sm dark:bg-night dark:text-white">+</button>
                    </div>
                    <span className="font-medium text-brand">{money(qty * item.price)}</span>
                  </div>
                </li>
              ))}
            </ul>

            <label htmlFor="voucher" className="mt-8 block text-sm font-semibold text-cocoa dark:text-white">Voucher Code</label>
            <div className="mt-3 flex gap-2">
              <input id="voucher" value={cart.voucher} onChange={(e) => cart.setVoucher(e.target.value)} onKeyDown={(e) => e.key === "Enter" && cart.applyVoucher()} placeholder="Voucher code" className="h-11 min-w-0 flex-1 rounded-xl bg-white px-4 text-sm text-sky-600 outline-none dark:bg-night dark:text-sky-300" />
              <button type="button" onClick={cart.applyVoucher} aria-label="Apply voucher" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-lg text-white transition hover:bg-sky-600">+</button>
            </div>
            {cart.voucherMessage && <p role="status" className={`mt-2 text-xs ${cart.voucherApplied ? "text-leaf" : "text-red-500"}`}>{cart.voucherMessage}</p>}

            <dl className="mt-8 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="font-semibold text-cocoa dark:text-white">Subtotal</dt><dd className="text-brand">{money(cart.subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="font-semibold text-cocoa dark:text-white">Tax fee</dt><dd className="text-brand">{money(cart.taxFee)}</dd></div>
              <div className="flex justify-between"><dt className="font-semibold text-cocoa dark:text-white">Voucher</dt><dd className="text-brand">{cart.discount ? `−${money(cart.discount)}` : money(0)}</dd></div>
              <div className="flex justify-between border-t border-stone-200 pt-3 text-base dark:border-white/10"><dt className="font-semibold text-cocoa dark:text-white">Total</dt><dd className="font-semibold text-brand">{money(cart.total)}</dd></div>
            </dl>

            <button type="button" disabled={cart.lines.length === 0} onClick={() => navigate("/order-online/checkout")} className="mt-8 h-14 w-full rounded-full bg-leaf text-base font-semibold text-white transition enabled:hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50">Order now</button>
          </aside>
        </div>
      </section>

      {selected && <DishModal item={selected} cta="Add to cart" onClose={() => setSelected(null)} onOrder={(qty) => { cart.add(selected.id, qty); setSelected(null); }} />}
      <Footer />
    </div>
  );
}
