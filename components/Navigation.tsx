"use client";

import { useState } from "react";
import { Menu, X, Shield } from "lucide-react";

const links = [
  { label: "Pierwsza Pomoc", href: "/#pierwsza-pomoc" },
  { label: "Generator Pism", href: "/generator-pism" },
  { label: "Skrypt Rozmowy", href: "/skrypt-rozmowy" },
  { label: "Wiedza", href: "/wiedza" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-700 transition-colors">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-stone-900 text-lg tracking-tight">
              Windykator<span className="text-teal-600">Stop</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm font-medium text-stone-600 rounded-lg hover:text-teal-600 hover:bg-teal-50 transition-all"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/generator-pism"
              className="ml-3 px-5 py-2 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors shadow-sm"
            >
              Zacznij tutaj
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-stone-100 bg-white px-4 pb-4 pt-2 space-y-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-base font-medium text-stone-700 rounded-xl hover:bg-teal-50 hover:text-teal-600 transition-all"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/generator-pism"
            onClick={() => setOpen(false)}
            className="block mt-2 px-4 py-3 bg-orange-500 text-white text-base font-semibold rounded-xl text-center hover:bg-orange-600 transition-colors"
          >
            Zacznij tutaj — za darmo
          </a>
        </div>
      )}
    </nav>
  );
}
