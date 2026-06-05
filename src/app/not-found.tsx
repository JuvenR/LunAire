import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#0A85C8]">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-md bg-[#0A85C8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#07517C]"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
