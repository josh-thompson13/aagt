import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[60vh] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-base font-semibold text-gray-500">404</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for. It may have been
          moved, renamed, or no longer exists.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-4">
          <Link
            href="/"
            className="rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Go home
          </Link>
          <Link
            href="/contact/"
            className="text-sm font-semibold text-gray-900 hover:underline"
          >
            Contact us<span aria-hidden> →</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

