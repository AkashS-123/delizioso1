import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { Field, PrimaryButton } from "../components/ui";
import { isEmail } from "../lib/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isEmail(email)) return setError("Enter a valid email address.");
    // TODO: call your password-reset API here (this build has no email backend).
    setSent(true);
  };

  return (
    <AuthLayout>
      <h1 className="text-4xl font-semibold leading-tight text-ink dark:text-white sm:text-[40px]">Forgot password</h1>
      {sent ? (
        <p role="status" className="mt-6 text-sm leading-7 text-ink-soft dark:text-stone-300">If an account exists for <strong>{email.trim()}</strong>, a reset link is on its way.</p>
      ) : (
        <>
          <p className="mt-6 text-sm text-ink-soft dark:text-stone-300">Enter your email and we&apos;ll send you a link to reset your password.</p>
          <form onSubmit={onSubmit} noValidate className="mt-10">
            <Field id="email" label="Email address" type="email" autoComplete="email" placeholder="Robertmartine@gmail.com" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} error={error} required />
            <PrimaryButton>Send reset link</PrimaryButton>
          </form>
        </>
      )}
      <p className="mt-8 text-sm text-ink-soft dark:text-stone-300"><Link to="/login" className="text-link hover:underline">Back to login</Link></p>
    </AuthLayout>
  );
}
