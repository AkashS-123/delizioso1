import { Link } from "react-router-dom";
import ArtLayout from "../components/ArtLayout";
import { Checkbox, Field, FormError, GoogleButton, PrimaryButton } from "../components/ui";
import { useSignUpForm } from "../hooks/useAuthForms";

/** Sign up – pasta artwork variant. Copy is kept exactly as in the design. */
export default function SignUpArt() {
  const { form, errors, busy, onChange, onSubmit, google } = useSignUpForm();

  return (
    <ArtLayout>
      <h1 className="text-4xl font-semibold leading-tight text-ink dark:text-white sm:text-5xl">
        Sign up
      </h1>
      <p className="mt-5 text-base text-ink-soft dark:text-stone-300 sm:text-xl">
        Don&apos;t have an account?{" "}
        <Link to="/login-art" className="text-link hover:underline">
          Log in
        </Link>
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-12 sm:mt-[66px]">
        <div className="space-y-6 sm:space-y-10">
          <Field large hideLabel id="fullName" label="Full name" placeholder="Full name" autoComplete="name" value={form.fullName} onChange={onChange} error={errors.fullName} required />
          <Field large hideLabel id="email" label="Email address" type="email" placeholder="Email address" autoComplete="email" value={form.email} onChange={onChange} error={errors.email} required />
          <Field large hideLabel id="password" label="Password" type="password" placeholder="Password" autoComplete="new-password" value={form.password} onChange={onChange} error={errors.password} required />
        </div>

        <div className="mt-8 flex items-center justify-between text-base sm:mt-[45px] text-ink-soft dark:text-stone-300 sm:text-xl">
          <Checkbox large label="Remember me" name="remember" checked={form.remember} onChange={onChange} />
          <Link to="/forgot-password" className="hover:underline">Forget Password?</Link>
        </div>

        <FormError>{errors.form}</FormError>
        {/* Button copy matches the design ("Log in" on the sign-up screen) */}
        <PrimaryButton large disabled={busy}>{busy ? "Creating account…" : "Log in"}</PrimaryButton>
        <GoogleButton large onClick={google}>Log in with google</GoogleButton>
      </form>
    </ArtLayout>
  );
}
