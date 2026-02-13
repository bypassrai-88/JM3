"use client";

import { useState } from "react";
import Link from "next/link";
import { places } from "@/data/places";

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-white/80 text-xs font-medium hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-200"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span>Menu</span>
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-full mt-1.5 min-w-[8rem] rounded-lg border border-white/15 bg-white/5 backdrop-blur-2xl shadow-xl py-1 z-50">
            <Link
              href="/"
              className="block px-3 py-1.5 text-xs text-white/90 hover:bg-white/10 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              ← Back to Start
            </Link>
            <Link
              href="/shop"
              className="block px-3 py-1.5 text-xs text-white/90 hover:bg-white/10 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Shop All
            </Link>
            <div className="my-1 border-t border-white/10" />
            {places.map((place) => (
              <Link
                key={place.id}
                href={`/rooms/${place.slug}`}
                className="block px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {place.name}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
