"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-700">
          Dochain
        </Link>

        <div className="hidden md:flex space-x-8 font-semibold text-gray-700">
          <Link href="/">Home</Link>
          <Link href="/campaigns">Campaigns</Link>
          <Link href="/create">Create</Link>
          <Link href="/about">About</Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <>
              <span className="font-medium text-gray-800">{session.user?.email}</span>
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <Link href="/auth/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
          )}
        </div>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {/* Hamburger / Close icons */}
          {menuOpen ? (
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-white px-6 pb-4 space-y-4 font-semibold text-gray-700">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/campaigns" onClick={() => setMenuOpen(false)}>
            Campaigns
          </Link>
          <Link href="/create" onClick={() => setMenuOpen(false)}>
            Create
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <div>
            {session ? (
              <>
                <span className="block mb-2">{session.user?.email}</span>
                <Button variant="outline" onClick={() => { signOut(); setMenuOpen(false); }}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/auth/signin" onClick={() => setMenuOpen(false)}>
                <Button variant="outline">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
