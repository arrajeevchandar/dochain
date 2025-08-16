'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/campaigns', label: 'Campaigns' },
  { href: '/create', label: 'Create' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  const buttonBaseStyles =
    'font-semibold text-cyan-300 border border-cyan-400 bg-black bg-opacity-50 hover:bg-cyan-400/20 transition-colors duration-200';

  return (
    <header className="sticky top-0 z-50">
      <nav className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between rounded-b-3xl bg-black/30 backdrop-blur-2xl shadow-2xl border-b-4 border-cyan-500">
        {/* Animated Glass Glow */}
        <div className="absolute left-0 top-0 w-[64px] h-full bg-cyan-400 opacity-10 blur-2xl pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-[64px] h-full bg-yellow-400 opacity-10 blur-2xl pointer-events-none"></div>
        <Link
          href="/"
          className="text-4xl font-black text-cyan-400 font-mono tracking-tighter z-10 drop-shadow-xl"
        >
          dochain
        </Link>
        <div className="hidden md:flex space-x-10 text-base font-bold z-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-1 rounded hover:bg-cyan-400/20 transition duration-150"
            >
              <span className="relative z-10 text-slate-100 hover:text-cyan-400">
                {link.label}
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-yellow-400 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-5 z-10">
          {session ? (
            <>
              <div className="flex items-center space-x-2">
                
                <span className="text-cyan-300 font-mono">{session.user?.name}</span>
              </div>
              <Button
                variant="outline"
                onClick={() => signOut({ callbackUrl: '/' })}
                className={`${buttonBaseStyles} px-4 py-1`}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/signin" passHref legacyBehavior>
                <Button variant="outline" className={`${buttonBaseStyles} px-4 py-1`}>
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup" passHref legacyBehavior>
                <Button variant="outline" className={`${buttonBaseStyles} px-4 py-1`}>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
        {/* Mobile hamburger */}
        <button
          className="md:hidden z-20 text-cyan-300 focus:outline-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="text-2xl">☰</span>
        </button>
      </nav>
      {/* Mobile menu glass panel */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl text-cyan-200 px-6 py-5 space-y-4 font-bold rounded-b-2xl shadow-lg z-40">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 hover:bg-cyan-400/20 rounded transition"
            >
              {link.label}
            </Link>
          ))}
          {session ? (
            <div className="mt-4 flex items-center space-x-3">
              
              <span>{session.user?.name}</span>
              <Button
                variant="outline"
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                  setMenuOpen(false);
                }}
                className="border-cyan-400 text-cyan-200 ml-1"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/auth/signin" passHref legacyBehavior>
                <Button variant="outline" className={`${buttonBaseStyles} px-4 py-1`}>
                  Sign In
                </Button>
              </Link>{' '}
              <br />
              <Link href="/auth/signup" passHref legacyBehavior>
                <Button variant="outline" className={`${buttonBaseStyles} px-4 py-1`}>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
