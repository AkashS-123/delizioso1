import { Link } from "react-router-dom";

export default function FormHeading({
  title,
  linkText,
  linkTo,
}: {
  title: string;
  linkText: string;
  linkTo: string;
}) {
  return (
    <>
      <h1 className="text-4xl font-semibold leading-tight text-ink dark:text-white sm:text-[40px]">
        {title}
      </h1>
      <p className="mt-6 text-sm text-ink-soft dark:text-stone-300">
        Don&apos;t have an account?{" "}
        <Link to={linkTo} className="text-link hover:underline">
          {linkText}
        </Link>
      </p>
    </>
  );
}
