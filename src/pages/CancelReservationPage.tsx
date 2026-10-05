import { useLocation, useNavigate } from "react-router-dom";
import ModalShell from "../components/ModalShell";
import { img } from "../components/site";
import { Icon, prettyDate, heading } from "./ConfirmReservationPage";

const bookingId = Math.floor(100000 + Math.random() * 900000);

export default function CancelReservationPage() {
  const { state } = useLocation() as { state: { date?: string; time?: string; size?: string } | null };
  const nav = useNavigate();

  const onCancel = () => {
    // TODO: connect to your reservation-cancellation API
    console.log("Cancel reservation:", { bookingId, ...state });
    nav("/reservation", { replace: true });
  };

  return (
    <ModalShell>
      {/* Warning banner (bleeds to the modal's edges) */}
      <div className="relative -mx-5 mt-8 overflow-hidden bg-brand px-6 py-10 text-white sm:-mx-10 sm:px-10 md:-mx-[60px] md:px-[60px] md:py-14">
        <span aria-hidden className="absolute -left-6 top-6 h-16 w-16 rounded-full bg-white/10" />
        <span aria-hidden className="absolute right-[8%] top-[15%] h-24 w-24 rounded-full bg-white/10" />
        <span aria-hidden className="absolute bottom-4 right-[22%] h-14 w-14 rounded-full bg-white/10" />
        <h1 className="relative max-w-xl font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">Are you sure you want to cancel the reservation?</h1>
        <p className="relative mt-6 flex items-center gap-3 text-sm sm:text-base">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/25"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg></span>
          Booking ID : #{bookingId}
        </p>
      </div>

      <div className="grid gap-10 pt-10 md:grid-cols-[auto_1fr] md:items-center md:pt-14">
        <div className="relative mx-auto h-48 w-48 sm:h-56 sm:w-56">
          <div className="absolute inset-0 rounded-full bg-[#FAFAF8] dark:bg-white/[.03]" />
          <img src={img("reserve.webp")} alt="Set table with wine glasses" className="absolute inset-[12%] h-[76%] w-[76%] rounded-full object-cover" />
        </div>

        <div>
          <h2 className={heading}>Reservation detail</h2>
          <ul className="mt-6 space-y-4 text-base text-ink-soft dark:text-stone-300 sm:text-lg">
            <li className="flex items-center gap-4"><Icon><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></Icon>{prettyDate(state?.date)}</li>
            <li className="flex items-center gap-4"><Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>{state?.time ?? "04:30 pm"}</li>
            <li className="flex items-center gap-4"><Icon><circle cx="12" cy="8" r="4" /><path d="M4 21c0-3 3-5 8-5s8 2 8 5z" /></Icon>{state?.size ? `${state.size} (Standar seating)` : "2 people (Standar seating)"}</li>
          </ul>

          <div className="mt-14 flex justify-end">
            <button type="button" onClick={onCancel} className="h-16 w-full max-w-[380px] rounded-xl bg-red-500 text-lg font-semibold text-white transition hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">Cancel reservation</button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
