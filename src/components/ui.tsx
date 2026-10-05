import type { InputHTMLAttributes } from "react";

/** `large` = the bigger 70px sizing used by the pasta sign-up design. */
type Size = { large?: boolean };

export function Field({
  label,
  id,
  hideLabel,
  large,
  error,
  ...props
}: { label: string; id: string; hideLabel?: boolean; error?: string } & Size &
  InputHTMLAttributes<HTMLInputElement>) {
  const input =
    `w-full border bg-field text-ink outline-none transition focus:bg-white ${error ? "border-red-500 focus:border-red-500" : "border-transparent focus:border-brand"} ` +
    "dark:bg-field-dark dark:text-stone-100 dark:focus:border-brand dark:focus:bg-night " +
    (large
      ? "h-14 rounded-xl px-6 text-sm placeholder:text-stone-400 sm:h-[70px] sm:px-10 sm:text-[15px] dark:placeholder:text-stone-500"
      : "h-[59px] rounded-xl px-[31px] text-sm placeholder:text-ink dark:placeholder:text-stone-300");
  return (
    <div>
      <label
        htmlFor={id}
        className={
          hideLabel
            ? "sr-only"
            : "mb-3.5 block text-sm font-medium text-ink dark:text-stone-100"
        }
      >
        {label}
      </label>
      <input id={id} name={id} className={input} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} {...props} />
      {error && <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export function Checkbox({
  label,
  large,
  ...props
}: { label: string } & Size & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label
      className={`flex cursor-pointer items-center ${
        large ? "gap-4 text-base sm:gap-5 sm:text-xl" : "gap-[18px]"
      }`}
    >
      <input type="checkbox" className="peer sr-only" {...props} />
      <span
        className={`flex items-center justify-center border border-stone-200 bg-white text-transparent transition peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand dark:border-stone-600 dark:bg-field-dark ${
          large ? "h-[30px] w-[30px] rounded-lg" : "h-6 w-6 rounded-lg"
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </span>
      {label}
    </label>
  );
}

export function PrimaryButton({
  children,
  large,
  disabled,
}: { children: string; disabled?: boolean } & Size) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full rounded-lg bg-brand font-medium text-white transition enabled:hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.99] ${
        large ? "mt-8 h-14 text-base sm:mt-[45px] sm:h-[70px] sm:text-xl" : "mt-8 h-[59px] text-sm"
      }`}
    >
      {children}
    </button>
  );
}

export function GoogleButton({ children, large, onClick }: { children: string; onClick?: () => void } & Size) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mt-5 flex w-full items-center justify-center rounded-lg border border-stone-300 bg-white font-medium text-ink transition hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-stone-600 dark:bg-transparent dark:text-stone-100 dark:hover:bg-white/5 ${
        large ? "h-14 gap-5 text-base sm:h-[70px] sm:text-xl" : "h-[59px] gap-5 text-sm"
      }`}
    >
      <svg width={large ? 36 : 26} height={large ? 36 : 26} viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
        <path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z" />
        <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
      </svg>
      {children}
    </button>
  );
}

/** Form-level message (wrong password, duplicate email, …). */
export function FormError({ children }: { children?: string }) {
  if (!children) return null;
  return <p role="alert" className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-300">{children}</p>;
}
