'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Hem' },
  { href: '/available', label: 'Tillgängligt' },
  { href: '/sold', label: 'Sålda' },
  { href: '/stones', label: 'Stenar & Bärnsten' },
  { href: '/watches', label: 'Klockor' },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-sm border-b border-stone-700/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-amber-400 text-xl leading-none">✦</span>
            <span className="text-white font-bold text-xl tracking-wide group-hover:text-amber-400 transition-colors">
              Swatches
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-amber-400 bg-stone-800'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-stone-300 hover:text-white p-2 rounded-lg hover:bg-stone-800 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Öppna meny"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden py-3 border-t border-stone-700/60 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-amber-400 bg-stone-800'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
