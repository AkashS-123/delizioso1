import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import FormHeading from "../components/FormHeading";
import { Checkbox, Field, FormError, GoogleButton, PrimaryButton } from "../components/ui";
import { useLoginForm } from "../hooks/useAuthForms";

export default function Login() {
  const { form, errors, busy, onChange, onSubmit, google } = useLoginForm();

  return (
    <AuthLayout>
      <FormHeading title="Login" linkText="Sign up" linkTo="/signup" />

      <form onSubmit={onSubmit} noValidate className="mt-14 lg:mt-[58px]">
        <div className="space-y-[26px]">
          <Field id="email" label="Email address" type="email" autoComplete="email" placeholder="Robertmartine@gmail.com" value={form.email} onChange={onChange} error={errors.email} required />
          <Field id="password" label="Password" type="password" autoComplete="current-password" placeholder="••••••••••••••" value={form.password} onChange={onChange} error={errors.password} required />
        </div>

        <div className="mt-8 flex items-center justify-between text-sm text-ink-soft dark:text-stone-300">
          <Checkbox label="Remember me" name="remember" checked={form.remember} onChange={onChange} />
          <Link to="/forgot-password" className="hover:underline">Forget Password?</Link>
        </div>

        <FormError>{errors.form}</FormError>
        <PrimaryButton disabled={busy}>{busy ? "Logging in…" : "Log in"}</PrimaryButton>
        <GoogleButton onClick={google}>Log in with google</GoogleButton>
      </form>
    </AuthLayout>
  );
}
