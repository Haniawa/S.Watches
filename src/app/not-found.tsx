import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-amber-400 text-6xl font-bold mb-4">404</p>
      <h1 className="font-display text-3xl font-bold text-stone-800 mb-3">
        Sidan hittades inte
      </h1>
      <p className="text-stone-500 mb-8 max-w-md">
        Det objekt eller den sida du letar efter verkar inte finnas. Det kan ha tagits bort eller
        aldrig funnits.
      </p>
      <Link
        href="/"
        className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        Tillbaka till startsidan
      </Link>
    </div>
  );
}
