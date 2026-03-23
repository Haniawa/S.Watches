import Link from 'next/link';

const footerLinks = [
  { href: '/available', label: 'Available items' },
  { href: '/sold', label: 'Sold items' },
  { href: '/stones', label: 'Stones & Amber' },
  { href: '/watches', label: 'Watches' },
];

export function Footer() {
  return (
    <footer className="bg-stone-900 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-400 text-xl">✦</span>
              <span className="text-white font-bold text-lg">Swatches</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              Unique, hand-picked antiques — stones, amber, jewelry and watches from Tradera.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Categories
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
              About
            </h4>
            <p className="text-stone-400 text-sm leading-relaxed mb-3">
              Samir has over 40 years of professional experience with watches and amber stones. 
              Expert knowledge in vintage timepieces and natural Baltic amber.
            </p>
            <p className="text-stone-400 text-sm leading-relaxed">
              Open to buy or sell watches and amber stones. Contact us for proposals.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:samirwatches80@gmail.com"
                className="text-stone-400 hover:text-amber-400 text-sm transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                samirwatches80@gmail.com
              </a>
              <p className="text-stone-400 text-sm leading-relaxed">
                Or contact us on Tradera
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 text-center text-stone-500 text-sm">
          © {new Date().getFullYear()} Swatches. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
