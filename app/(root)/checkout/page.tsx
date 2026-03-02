"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function CheckoutContent() {
  const params = useSearchParams();
  const movie = params.get("movie");
  const time = params.get("time");

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Checkout
          </h1>
          <p className="text-gray-400 text-sm">
            Review your booking details before confirming
          </p>
        </header>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center bg-gray-900 rounded-lg px-4 py-3">
            <span className="text-gray-400 text-sm">Movie</span>
            <span className="text-white font-medium text-right">
              {movie || "N/A"}
            </span>
          </div>

          <div className="flex justify-between items-center bg-gray-900 rounded-lg px-4 py-3">
            <span className="text-gray-400 text-sm">Showtime</span>
            <span className="text-white font-medium">
              {time || "N/A"}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Confirm booking"
          >
            Confirm Booking
          </button>

          <Link
            href="/movies"
            className="block text-center py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Back to Movies
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-xs text-gray-500">
          Secure checkout • No payment required yet
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}