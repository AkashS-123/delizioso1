import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const REDIRECT_SECONDS = 4;

/** "Order Successfully" popup. Counts down, then sends the guest to the Menu page. */
export default function OrderSuccessPopup({ orderId }: { orderId: string }) {
  const navigate = useNavigate();
  const [secs, setSecs] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (secs <= 0) { navigate("/menu", { replace: true }); return; }
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secs, navigate]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/70 p-4">
      <div role="alertdialog" aria-modal="true" aria-labelledby="order-ok-title" aria-describedby="order-ok-desc" className="w-full max-w-sm rounded-[32px] bg-white p-8 text-center shadow-2xl dark:bg-[#1B1712]">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-leaf text-white">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </div>
        <h2 id="order-ok-title" className="mt-6 text-2xl font-semibold text-cocoa dark:text-white">Order Successfully</h2>
        <p id="order-ok-desc" className="mt-3 text-sm leading-7 text-ink-soft dark:text-stone-300">
          Thank you! Your order <strong>#{orderId}</strong> has been placed.<br />
          Taking you to the menu in {secs}s…
        </p>
        <button type="button" onClick={() => navigate("/menu", { replace: true })} className="mt-6 h-12 w-full rounded-full bg-brand text-sm font-semibold text-white transition hover:bg-brand-dark">Go to menu now</button>
      </div>
    </div>
  );
}
