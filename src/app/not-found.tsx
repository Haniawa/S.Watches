import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-amber-400 text-6xl font-bold mb-4">404</p>
      <h1 className="font-display text-3xl font-bold text-stone-800 mb-3">
        Page not found
      </h1>
      <p className="text-stone-500 mb-8 max-w-md">
        The item or page you are looking for does not seem to exist. It may have been removed or
        never existed.
      </p>
      <Link
        href="/"
        className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
