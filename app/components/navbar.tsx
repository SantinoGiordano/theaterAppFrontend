"use client";


import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
          {/* Logo / Title */}
          <div className="text-red-600 font-bold text-2xl">Movies </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-8 text-red-600 text-lg font-medium">
            <li>
              <Link className="hover:text-red-400 transition" href="/home">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-red-400 transition" href="/movies">
                Movies
              </Link>
            </li>
            <li>
              <Link className="hover:text-red-400 transition" href="/foodItems">
                Food and Drinks
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-red-400 transition"
                href="/comingSoon"
              >
                Comming Soon
              </Link>
            </li>
            <li>
              <Link className="hover:text-red-400 transition" href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="hover:text-red-400 transition" href="/">
                Sign Out
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-red-600 hover:text-red-400 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-md border-t border-gray-200 flex flex-col items-center gap-6 py-6 z-40 text-red-600 font-medium">
            <Link
              onClick={() => setIsOpen(false)}
              className="hover:text-red-400"
              href="/home"
            >
              Home
            </Link>
            <Link className="hover:text-red-400 transition" href="/comingSoon">
              Comming Soon
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              className="hover:text-red-400"
              href="/home"
            >
              Movies
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              className="hover:text-red-400"
              href="/foodItems"
            >
              Food and Drinks
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              className="hover:text-red-400"
              href="/contact"
            >
              Contact
            </Link>
            <Link className="hover:text-red-400 transition" href="/">
              Sign Out
            </Link>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content being hidden under the fixed navbar */}
      <div className="h-20"></div>
    </>
  );
}
