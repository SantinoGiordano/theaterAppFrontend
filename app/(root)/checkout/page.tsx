'use client'

import { useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const params = useSearchParams();
  const movie = params.get("movie");
  const time = params.get("time");

  return (
    <div>
      <h1>Checkout</h1>
      <p>Movie: {movie}</p>
      <p>Showtime: {time}</p>
    </div>
  );
}
