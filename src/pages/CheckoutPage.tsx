import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar, h2, img, wrap } from "../components/site";
import { useAuth } from "../context/AuthContext";
import OrderSuccessPopup from "../components/OrderSuccessPopup";
import { useCart, type Order } from "../context/CartContext";
import { isEmail } from "../lib/auth";
import { money } from "../lib/storage";

const field =
  "h-16 w-full rounded-2xl border border-transparent bg-field px-6 text-base outline-none transition placeholder:text-stone-400 focus:border-brand focus:bg-white " +
  "dark:bg-field-dark dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:bg-night sm:h-[74px] sm:px-8 sm:text-lg";
const heading = "text-xl font-semibold text-cocoa dark:text-white sm:text-2xl";

function RadioDot({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <label className="flex cursor-pointer items-center gap-4 text-base text-ink-soft dark:text-stone-300 sm:text-lg">
      <input type="radio" className="peer sr-only" checked={checked} onChange={onChange} />
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-stone-300 dark:border-stone-600">
        <span className="h-3 w-3 rounded-full bg-leaf transition" style={{ transform: checked ? "scale(1)" : "scale(0)" }} />
      </span>
      {children}
    </label>
  );
}

const COUNTRIES: Record<string, string> = {
  "+49": "linear-gradient(#000 33%,#e11 33% 66%,#fc0 66%)",
  "+62": "linear-gradient(#e11 50%,#fff 50%)",
  "+1": "linear-gradient(#b22 33%,#fff 33% 66%,#36c 66%)",
};
const PAYMENTS = ["Cash On Delivery", "BCA Virtual Account", "Credit Card"];

type Errors = Partial<Record<"firstName" | "lastName" | "phone" | "email" | "address", string>>;
const Err = ({ id, children }: { id: string; children?: string }) => children ? <p id={id} role="alert" className="mt-2 px-2 text-sm text-red-500">{children}</p> : null;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const cart = useCart();
  const { user } = useAuth();
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", note: "" });
  const [dial, setDial] = useState("+49");
  const [orderTime, setOrderTime] = useState<"now" | "later">(cart.draft.orderTime ?? "now");
  const [method, setMethod] = useState<"delivery" | "takeaway">(cart.draft.method ?? "delivery");
  const [payment, setPayment] = useState(cart.draft.payment ?? PAYMENTS[0]);
  const [address, setAddress] = useState(cart.draft.address ?? "");
  const [pinOpen, setPinOpen] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [placed, setPlaced] = useState<Order | null>(null);

  // Pre-fill from the logged-in account (only fills empty fields).
  useEffect(() => {
    if (!user) return;
    const [first, ...rest] = user.name.split(" ");
    setForm((f) => ({ ...f, firstName: f.firstName || first, lastName: f.lastName || rest.join(" "), email: f.email || user.email }));
  }, [user]);

  const set = (k: keyof typeof form, v: string) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })); };
  const bad = (k: keyof Errors) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `${k}-error` } : {});
  const ring = (k: keyof Errors) => (errors[k] ? " !border-red-500" : "");

  const onOrder = () => {
    const errs: Errors = {};
    if (!form.firstName.trim()) errs.firstName = "Enter your first name.";
    if (!form.lastName.trim()) errs.lastName = "Enter your last name.";
    if (form.phone.replace(/\D/g, "").length < 6) errs.phone = "Enter a valid phone number.";
    if (!isEmail(form.email)) errs.email = "Enter a valid email address.";
    if (method === "delivery" && !address.trim()) errs.address = "Enter a delivery address.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(first)?.focus();
      return;
    }
    // TODO: send the order to your API here, then clear the cart on success.
    // placeOrder() also empties the cart, so the navbar count resets to zero.
    const order = cart.placeOrder({
      customer: { name: `${form.firstName.trim()} ${form.lastName.trim()}`, email: form.email.trim(), phone: `${dial} ${form.phone.trim()}`, note: form.note.trim() },
      orderTime: orderTime === "now" ? "Order now" : "Order later",
      method: method === "delivery" ? "Delivery" : "Take a way",
      payment,
      address: method === "delivery" ? address.trim() : "",
    });
    setPlaced(order); // the popup then redirects to /menu
  };

  // After the order is placed the cart is empty on purpose – show the popup instead of "empty cart".
  if (placed) {
    return (
      <div className="overflow-x-hidden bg-white font-sans text-cocoa transition-colors dark:bg-night dark:text-stone-100">
        <Navbar active="Order online" />
        <div className="min-h-[60vh]" />
        <Footer />
        <OrderSuccessPopup orderId={placed.id} />
      </div>
    );
  }

  if (cart.lines.length === 0) {
    return (
      <div className="overflow-x-hidden bg-white font-sans text-cocoa transition-colors dark:bg-night dark:text-stone-100">
        <Navbar active="Order online" />
        <section className={`${wrap} py-24 text-center`}>
          <h1 className={h2}>Checkout</h1>
          <p className="mt-8 text-ink-soft dark:text-stone-300">Your order list is empty.</p>
          <Link to="/order-online" className="mt-8 inline-flex h-14 items-center rounded-full bg-brand px-10 font-medium text-white hover:bg-brand-dark">Browse the menu</Link>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden bg-white font-sans text-cocoa transition-colors dark:bg-night dark:text-stone-100">
      <Navbar active="Order online" />

      <section className={`${wrap} relative pb-16 pt-6 md:pb-24 md:pt-10`}>
        <button type="button" onClick={() => navigate(-1)} aria-label="Go back" className="absolute left-6 top-8 flex h-12 w-12 items-center justify-center rounded-full bg-cocoa text-white transition hover:bg-black dark:bg-brand md:left-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <h1 className={`${h2} text-center`}>Checkout</h1>

        <h2 className={`${heading} mt-14 md:mt-20`}>Order data</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          <div className="min-w-0"><input id="firstName" aria-label="First name" className={field + ring("firstName")} {...bad("firstName")} placeholder="First name" autoComplete="given-name" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} /><Err id="firstName-error">{errors.firstName}</Err></div>
          <div className="min-w-0"><input id="lastName" aria-label="Last name" className={field + ring("lastName")} {...bad("lastName")} placeholder="Last name" autoComplete="family-name" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} /><Err id="lastName-error">{errors.lastName}</Err></div>

          <div className="min-w-0">
          <div className={`flex h-16 items-center gap-3 rounded-2xl border border-transparent bg-field px-3 dark:bg-field-dark sm:h-[74px]${errors.phone ? " !border-red-500" : ""}`}>
            <label className="relative flex h-11 shrink-0 items-center gap-2 rounded-xl bg-white px-3 dark:bg-night sm:h-[52px] sm:px-4">
              <span aria-hidden className="h-7 w-7 rounded-full ring-1 ring-black/10" style={{ background: COUNTRIES[dial] }} />
              <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8l8 8 8-8" /></svg>
              <select aria-label="Country code" value={dial} onChange={(e) => setDial(e.target.value)} className="absolute inset-0 cursor-pointer opacity-0">
                {Object.keys(COUNTRIES).map((d) => <option key={d}>{d}</option>)}
              </select>
            </label>
            <input id="phone" {...bad("phone")} type="tel" aria-label="Phone number" placeholder="Phone number" autoComplete="tel-national" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="h-full min-w-0 flex-1 bg-transparent px-1 text-base text-cocoa outline-none placeholder:text-stone-400 dark:text-stone-100 dark:placeholder:text-stone-500 sm:text-lg" />
          </div>
          <Err id="phone-error">{errors.phone}</Err>
          </div>
          <div className="min-w-0"><input id="email" aria-label="Email address" type="email" className={field + ring("email")} {...bad("email")} placeholder="Email address" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} /><Err id="email-error">{errors.email}</Err></div>
        </div>
        <textarea aria-label="Note" className={`${field} mt-5 h-40 resize-none py-6 sm:mt-6 sm:h-48`} placeholder="Note" value={form.note} onChange={(e) => set("note", e.target.value)} />

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
          <div className="mt-6 max-w-md space-y-4">
            {PAYMENTS.map((p) => (
              <label key={p} className="flex h-16 cursor-pointer items-center gap-4 rounded-2xl bg-field px-6 dark:bg-field-dark sm:h-[70px]">
                <input type="radio" className="peer sr-only" checked={payment === p} onChange={() => setPayment(p)} />
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-stone-300 dark:border-stone-600">
                  <span className="h-3 w-3 rounded-full bg-leaf transition" style={{ transform: payment === p ? "scale(1)" : "scale(0)" }} />
                </span>
                <span className="text-base text-ink-soft dark:text-stone-300 sm:text-lg">{p}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className={heading}>Shipping address</h2>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <input id="address" aria-label="Shipping address" {...bad("address")} value={address} onChange={(e) => { setAddress(e.target.value); setErrors((er) => ({ ...er, address: undefined })); }} placeholder="Please type your address" className={`${field} sm:flex-1${ring("address")}`} />
            <button type="button" className="h-16 shrink-0 rounded-2xl bg-sky-500 px-10 text-base font-semibold text-white transition hover:bg-sky-600 sm:h-[74px] sm:text-lg">Search</button>
          </div>
          <Err id="address-error">{errors.address}</Err>
          <button type="button" onClick={() => { setAddress("Current location"); setErrors((er) => ({ ...er, address: undefined })); }} className="mt-4 flex h-16 w-full items-center gap-4 rounded-2xl bg-field px-6 text-base font-medium text-red-500 transition hover:bg-stone-200 dark:bg-field-dark dark:hover:bg-white/10 sm:h-[74px] sm:px-8 sm:text-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
            Use your current location
          </button>

          <div className="relative mt-6 h-[340px] overflow-hidden rounded-3xl sm:h-[420px] md:h-[480px]">
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
        </div>

        <div className="mt-14 rounded-3xl bg-field p-6 dark:bg-field-dark sm:p-8">
          <h2 className={heading}>Order summary</h2>
          <ul className="mt-6 divide-y divide-stone-200 dark:divide-white/10">
            {cart.lines.map(({ item, qty }) => (
              <li key={item.id} className="flex items-center justify-between py-3 text-base"><span>{qty} × {item.name}</span><span className="font-medium text-brand">{money(qty * item.price)}</span></li>
            ))}
          </ul>
          <dl className="mt-6 space-y-3 border-t border-stone-200 pt-5 text-base dark:border-white/10">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(cart.subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Tax fee</dt><dd>{money(cart.taxFee)}</dd></div>
            {cart.discount > 0 && <div className="flex justify-between"><dt>Voucher</dt><dd>−{money(cart.discount)}</dd></div>}
            <div className="flex justify-between text-lg font-semibold"><dt>Total</dt><dd className="text-brand">{money(cart.total)}</dd></div>
          </dl>
        </div>

        <button type="button" onClick={onOrder} className="mx-auto mt-10 block h-16 w-full max-w-[540px] rounded-2xl bg-brand text-lg font-semibold text-white transition hover:bg-brand-dark sm:h-[74px] sm:text-xl">Order now</button>
      </section>

      <Footer />
    </div>
  );
}
