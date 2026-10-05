import { useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ModalShell from "../components/ModalShell";
import { img } from "../components/site";

const heading = "text-xl font-semibold text-cocoa dark:text-white sm:text-2xl";

function RadioDot({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <label className="flex cursor-pointer items-center gap-4 text-base text-ink-soft dark:text-stone-300 sm:text-lg">
      <input type="radio" className="peer sr-only" checked={checked} onChange={onChange} />
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-stone-300 dark:border-stone-600">
        <span className="h-3 w-3 scale-0 rounded-full bg-leaf transition peer-checked:scale-100" style={{ transform: checked ? "scale(1)" : "scale(0)" }} />
      </span>
      {children}
    </label>
  );
}

const PAYMENTS = ["Cash On Delivery", "BCA Virtual Account", "Credit Card", "Transfer Bank"];

export default function ShippingAddressPage() {
  const navigate = useNavigate();
  const { setDraft } = useCart();
  const [address, setAddress] = useState("");
  const [pinOpen, setPinOpen] = useState(true);
  const [orderTime, setOrderTime] = useState<"now" | "later">("now");
  const [method, setMethod] = useState<"delivery" | "takeaway">("delivery");
  const [payment, setPayment] = useState(PAYMENTS[0]);
  const [agree, setAgree] = useState(false);

  const canOrder = useMemo(() => agree, [agree]);

  const onOrder = () => {
    if (!canOrder) return;
    // Hand the delivery choices to the checkout page, which collects contact details and places the order.
    setDraft({ address, orderTime, method, payment });
    navigate("/order-online/checkout");
  };

  return (
    <ModalShell>
      <h1 className="text-2xl font-semibold text-cocoa dark:text-white sm:text-3xl">Shipping address</h1>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Please type your address"
          className="h-16 w-full min-w-0 rounded-2xl border border-transparent bg-field px-6 sm:flex-1 text-base outline-none transition placeholder:text-stone-400 focus:border-brand focus:bg-white dark:bg-field-dark dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:bg-night sm:h-[74px] sm:px-8 sm:text-lg"
        />
        <button type="button" className="h-16 shrink-0 rounded-2xl bg-sky-500 px-10 text-base font-semibold text-white transition hover:bg-sky-600 sm:h-[74px] sm:text-lg">Search</button>
      </div>

      <button
        type="button"
        onClick={() => setAddress("Current location")}
        className="mt-4 flex h-16 w-full items-center gap-4 rounded-2xl bg-field px-6 text-base font-medium text-red-500 transition hover:bg-stone-200 dark:bg-field-dark dark:hover:bg-white/10 sm:h-[74px] sm:px-8 sm:text-lg"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
        Use your current location
      </button>

      {/* Map */}
      <div className="relative -mx-5 mt-8 h-[340px] sm:-mx-10 sm:h-[420px] md:-mx-[60px] md:h-[480px]">
        <img src={img("shipmap.jpg")} alt="Map of the Bronx, NY area" className="h-full w-full object-cover" />
        <div aria-hidden className="absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-full">
          <svg width="40" height="50" viewBox="0 0 46 58" fill="none"><path d="M23 0C10.3 0 0 10.3 0 23c0 17.3 23 35 23 35s23-17.7 23-35C46 10.3 35.7 0 23 0z" fill="#F0402C" /><circle cx="23" cy="23" r="10" fill="#fff" /></svg>
        </div>

        {pinOpen && (
          <div className="absolute left-1/2 top-4 flex w-[92%] max-w-[540px] -translate-x-1/2 flex-col gap-3 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur dark:bg-[#241D18]/95 sm:top-[40%] sm:flex-row sm:items-center sm:gap-4">
            <img src={img("highbridge.jpg")} alt="Highbridge House" className="hidden h-28 w-full shrink-0 rounded-xl object-cover sm:block sm:w-32" />
            <div className="min-w-0 flex-1">
              <p className="text-base font-semibold text-cocoa dark:text-white sm:text-lg">Highbridge House</p>
              <p className="mt-1 text-xs text-ink-soft dark:text-stone-300 sm:text-sm">1131 Ogden Ave, Bronx, NY 10452, Amerika Serikat</p>
              <p className="text-xs text-ink-soft dark:text-stone-300 sm:text-sm">40.885147,-73.9220459</p>
              <button type="button" onClick={() => setPinOpen(false)} className="mt-3 h-11 w-full rounded-xl bg-red-500 text-sm font-semibold text-white transition hover:bg-red-600 sm:w-40">Confirmation</button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-14">
        <h2 className={heading}>Order time</h2>
        <div className="mt-6 flex flex-wrap gap-10">
          <RadioDot checked={orderTime === "now"} onChange={() => setOrderTime("now")}>Order now</RadioDot>
          <RadioDot checked={orderTime === "later"} onChange={() => setOrderTime("later")}>
            <span className="flex items-center gap-2">Order later<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg></span>
          </RadioDot>
        </div>
      </div>

      <div className="mt-12">
        <h2 className={heading}>Order method</h2>
        <div className="mt-6 flex flex-wrap gap-10">
          <RadioDot checked={method === "delivery"} onChange={() => setMethod("delivery")}>Delivery</RadioDot>
          <RadioDot checked={method === "takeaway"} onChange={() => setMethod("takeaway")}>Take a way</RadioDot>
        </div>
      </div>

      <div className="mt-12">
        <h2 className={heading}>Payment method</h2>
        <div className="mt-6 grid gap-x-16 gap-y-6 sm:grid-cols-2">
          {PAYMENTS.map((p) => <RadioDot key={p} checked={payment === p} onChange={() => setPayment(p)}>{p}</RadioDot>)}
        </div>
      </div>

      <label className="mt-14 flex cursor-pointer items-start gap-4 text-base leading-7 text-ink-soft dark:text-stone-300 sm:text-lg">
        <input type="checkbox" className="peer sr-only" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-cocoa text-transparent peer-checked:text-white dark:bg-white/10">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </span>
        Choose to indicate that you have read and agree to our Terms of use &amp; Privacy Policy.
      </label>

      <button
        type="button"
        onClick={onOrder}
        disabled={!canOrder}
        className="mx-auto mt-10 block h-16 w-full max-w-[540px] rounded-2xl bg-brand text-lg font-semibold text-white transition enabled:hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50 sm:h-[74px] sm:text-xl"
      >
        Order now
      </button>
    </ModalShell>
  );
}
