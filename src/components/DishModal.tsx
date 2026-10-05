import { useEffect, useRef, useState } from "react";
import type { MenuItem } from "../data/menu";
import { money } from "../lib/storage";
import DishImage, { Stars } from "./DishImage";

/** Dish detail popup – opens when a dish card is clicked. Esc / backdrop / × close it. */
export default function DishModal({ item, onClose, onOrder, cta = "Order now" }: { item: MenuItem; onClose: () => void; onOrder: (qty: number) => void; cta?: string }) {
  const [qty, setQty] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-cocoa/70 p-0 sm:items-center sm:p-6" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="dish-title" onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-[32px] bg-white p-6 text-center shadow-2xl dark:bg-[#1B1712] sm:rounded-[32px] sm:p-8">
        <button ref={closeRef} type="button" aria-label="Close" onClick={onClose} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-field text-cocoa transition hover:bg-stone-200 dark:bg-field-dark dark:text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
        </button>
        <DishImage item={item} className="mx-auto h-48 w-48 object-contain drop-shadow-lg sm:h-56 sm:w-56" />
        <h2 id="dish-title" className="mt-6 text-2xl font-semibold text-cocoa dark:text-white">{item.name}</h2>
        <Stars n={item.rating} className="mt-2 justify-center" />
        <p className="mt-4 text-sm leading-7 text-ink-soft dark:text-stone-300">{item.description}</p>
        <p className="mt-2 text-xs uppercase tracking-wide text-stone-400">{item.categories.join(" · ")}</p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-2xl font-semibold text-cocoa dark:text-white">{money(item.price * qty)}</span>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-9 w-9 items-center justify-center rounded-lg bg-field text-cocoa dark:bg-field-dark dark:text-white">−</button>
            <span aria-live="polite" className="w-6 text-center font-medium">{qty}</span>
            <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(20, q + 1))} className="flex h-9 w-9 items-center justify-center rounded-lg bg-field text-cocoa dark:bg-field-dark dark:text-white">+</button>
          </div>
        </div>
        <button type="button" onClick={() => onOrder(qty)} className="mt-6 h-14 w-full rounded-full bg-brand text-base font-semibold text-white transition hover:bg-brand-dark">{cta}</button>
      </div>
    </div>
  );
}
