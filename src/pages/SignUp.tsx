import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import FormHeading from "../components/FormHeading";
import { Checkbox, Field, FormError, GoogleButton, PrimaryButton } from "../components/ui";
import { useSignUpForm } from "../hooks/useAuthForms";

export default function SignUp() {
  const { form, errors, busy, onChange, onSubmit, google } = useSignUpForm();

  return (
    <AuthLayout>
      {/* Design copy is kept as-is: sign-up page reads "Don't have an account? Log in" */}
      <FormHeading title="Sign up" linkText="Log in" linkTo="/login" />

      <form onSubmit={onSubmit} noValidate className="mt-14 lg:mt-[58px]">
        <div className="space-y-[26px]">
          <Field id="fullName" label="Full name" type="text" autoComplete="name" placeholder="Robert Martine" value={form.fullName} onChange={onChange} error={errors.fullName} required />
          <Field id="email" label="Email address" type="email" autoComplete="email" placeholder="Robertmartine@gmail.com" value={form.email} onChange={onChange} error={errors.email} required />
          <Field id="password" label="Password" type="password" autoComplete="new-password" placeholder="••••••••••••••" value={form.password} onChange={onChange} error={errors.password} required />
        </div>

        <div className="mt-8 flex items-center justify-between text-sm text-ink-soft dark:text-stone-300">
          <Checkbox label="Remember me" name="remember" checked={form.remember} onChange={onChange} />
          <Link to="/forgot-password" className="hover:underline">Forget Password?</Link>
        </div>

        <FormError>{errors.form}</FormError>
        <PrimaryButton disabled={busy}>{busy ? "Creating account…" : "Sign up"}</PrimaryButton>
        <GoogleButton onClick={google}>Sign up with google</GoogleButton>
      </form>
    </AuthLayout>
  );
}
