"use client";

import { FoodItem, FoodSize } from "@/types/page";
import { API_Route } from "@/utils/routes";
import { useEffect, useState } from "react";

export default function FoodAndDrink() {
  const [food, setFood] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_Route}/api/concession`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setFood(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch food items:", err);
        setFood([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black px-6 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-red-600">
          Food & Drinks
        </h1>
        <p className="mt-2 text-gray-400">
          Classic theater snacks & refreshments
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <span className="loading loading-spinner loading-lg text-red-600"></span>
        </div>
      ) : food.length === 0 ? (
        <p className="text-center text-gray-400 mt-20">
          No food items available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {food.map((item) => {
            // 👉 derive a fallback display price (lowest size price)
            const displayPrice =
              item.sizes && item.sizes.length > 0
                ? Math.min(...item.sizes.map((s) => s.price)).toFixed(2)
                : null;

            return (
              <div
                key={item._id}
                className="group rounded-2xl bg-gray-900 border border-gray-800 shadow-xl overflow-hidden transition hover:border-red-600 hover:shadow-red-600/20"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.img || "https://placehold.co/400x300"}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-2">
                  <h2 className="text-xl font-bold text-white">
                    {item.name}
                  </h2>
                  <p className="text-sm uppercase tracking-wide text-gray-400">
                    {item.category}
                  </p>

                  {/* Sizes */}
                  {item.sizes && item.sizes.length > 0 ? (
                    <div className="mt-3 flex flex-col gap-2">
                      {item.sizes.map((size: FoodSize, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center rounded-lg bg-gray-800 px-3 py-2 text-sm"
                        >
                          <span className="text-gray-300">
                            {size.size}
                          </span>
                          <span className="font-semibold text-red-500">
                            ${size.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-lg font-semibold text-red-500">
                      {displayPrice ? `$${displayPrice}` : "N/A"}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
