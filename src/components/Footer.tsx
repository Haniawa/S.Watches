import Link from 'next/link';

const footerLinks = [
  { href: '/available', label: 'Tillgängliga objekt' },
  { href: '/sold', label: 'Sålda objekt' },
  { href: '/stones', label: 'Stenar & Bärnsten' },
  { href: '/watches', label: 'Klockor' },
];

export function Footer() {
  return (
    <footer className="bg-stone-900 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-400 text-xl">✦</span>
              <span className="text-white font-bold text-lg">Swatches</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              Unika, handplockade antikviteter — stenar, bärnsten, smycken och klockor från Tradera.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Kategorier
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone-400 hover:text-amber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Om Swatches
            </h4>
            <p className="text-stone-400 text-sm leading-relaxed">
              Alla objekt säljs via Tradera. Klicka på ett objekt för att läsa mer och hitta annonsen.
            </p>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 text-center text-stone-500 text-sm">
          © {new Date().getFullYear()} Swatches. Alla rättigheter förbehållna.
        </div>
      </div>
    </footer>
  );
}
