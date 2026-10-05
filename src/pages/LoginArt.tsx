import { Link } from "react-router-dom";
import ArtLayout from "../components/ArtLayout";
import { Checkbox, Field, FormError, GoogleButton, PrimaryButton } from "../components/ui";
import { useLoginForm } from "../hooks/useAuthForms";

/** Login – pasta artwork variant. */
export default function LoginArt() {
  const { form, errors, busy, onChange, onSubmit, google } = useLoginForm();
  // The design shows the "Log in" button in its lighter (disabled) state while the form is empty.
  const canSubmit = form.email.trim() !== "" && form.password !== "";

  return (
    <ArtLayout variant="login">
      <h1 className="text-4xl font-semibold leading-tight text-ink dark:text-white sm:text-5xl">
        Login
      </h1>
      <p className="mt-5 text-base text-ink-soft dark:text-stone-300 sm:text-xl">
        Don&apos;t have an account?{" "}
        <Link to="/signup-art" className="text-link hover:underline">
          Sign up
        </Link>
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-10 sm:mt-[47px]">
        <div className="space-y-6 sm:space-y-10">
          <Field large hideLabel id="email" label="Email address" type="email" placeholder="Email address" autoComplete="email" value={form.email} onChange={onChange} error={errors.email} required />
          <Field large hideLabel id="password" label="Password" type="password" placeholder="Password" autoComplete="current-password" value={form.password} onChange={onChange} error={errors.password} required />
        </div>

        <div className="mt-8 flex items-center justify-between text-base text-ink-soft dark:text-stone-300 sm:mt-[45px] sm:text-xl">
          <Checkbox large label="Remember me" name="remember" checked={form.remember} onChange={onChange} />
          <Link to="/forgot-password" className="hover:underline">Forget Password?</Link>
        </div>

        <FormError>{errors.form}</FormError>
        <PrimaryButton large disabled={!canSubmit || busy}>{busy ? "Logging in…" : "Log in"}</PrimaryButton>
        <GoogleButton large onClick={google}>Log in with google</GoogleButton>
      </form>
    </ArtLayout>
  );
}
