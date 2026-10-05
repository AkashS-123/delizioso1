import { useState, type ChangeEvent, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isEmail } from "../lib/auth";

type Errors = Partial<Record<"fullName" | "email" | "password" | "form", string>>;

export const GOOGLE_MSG = "Google sign-in isn't set up yet – please use your email and password.";

function useFields<T extends Record<string, string | boolean>>(initial: T) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setErrors((er) => ({ ...er, [name]: undefined, form: undefined })); // clear as the user fixes it
  };
  return { form, errors, setErrors, busy, setBusy, onChange };
}

/** Where to go after authenticating: the page the user came from, else Home. */
function useAfterAuth() {
  const navigate = useNavigate();
  const from = (useLocation().state as { from?: string } | null)?.from;
  return () => navigate(from && !from.startsWith("/login") && !from.startsWith("/signup") ? from : "/", { replace: true });
}

export function useLoginForm() {
  const { login } = useAuth();
  const done = useAfterAuth();
  const f = useFields({ email: "", password: "", remember: false });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Errors = {};
    if (!f.form.email.trim()) errs.email = "Enter your email address.";
    else if (!isEmail(f.form.email)) errs.email = "Enter a valid email address.";
    if (!f.form.password) errs.password = "Enter your password.";
    f.setErrors(errs);
    if (Object.keys(errs).length) return;
    f.setBusy(true);
    try {
      await login(f.form.email, f.form.password, f.form.remember);
      done();
    } catch (err) {
      f.setErrors({ form: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    } finally {
      f.setBusy(false);
    }
  };
  return { ...f, onSubmit, google: () => f.setErrors({ form: GOOGLE_MSG }) };
}

export function useSignUpForm() {
  const { signup } = useAuth();
  const done = useAfterAuth();
  const f = useFields({ fullName: "", email: "", password: "", remember: false });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Errors = {};
    if (!f.form.fullName.trim()) errs.fullName = "Enter your full name.";
    if (!f.form.email.trim()) errs.email = "Enter your email address.";
    else if (!isEmail(f.form.email)) errs.email = "Enter a valid email address.";
    if (f.form.password.length < 8) errs.password = "Use at least 8 characters.";
    f.setErrors(errs);
    if (Object.keys(errs).length) return;
    f.setBusy(true);
    try {
      await signup(f.form.fullName, f.form.email, f.form.password, f.form.remember);
      done();
    } catch (err) {
      f.setErrors({ form: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    } finally {
      f.setBusy(false);
    }
  };
  return { ...f, onSubmit, google: () => f.setErrors({ form: GOOGLE_MSG }) };
}
