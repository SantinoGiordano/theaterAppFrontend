"use client";

import { FoodItem } from "@/types/page";
import { useEffect, useState } from "react";

export default function FoodAndDrink() {
  const [food, setFood] = useState<FoodItem[]>([]); // always start as array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/concession")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Make sure data is an array
        if (Array.isArray(data)) {
          setFood(data);
        } else {
          setFood([]);
          console.error("Concession API returned non-array:", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch food items:", err);
        setFood([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-red-600 tracking-tight">
        Food & Drinks
      </h1>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : !food || food.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">
          No food items available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {food.map((item: FoodItem) => (
            <div
              key={item._id}
              className="card bg-white p-4 shadow-lg rounded-xl flex flex-col"
            >
              <img
                src={item.img || "https://placehold.co/100"}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />

              <h2 className="text-xl font-semibold text-red-600">{item.name}</h2>
              <p className="text-sm opacity-70 mb-2">{item.category}</p>

              {/* Display sizes if they exist */}
              {item.sizes && item.sizes.length > 0 ? (
                <div className="flex flex-col gap-2 mt-2">
                  {item.sizes.map((size, index) => (
                    <div
                      key={index}
                      className="p-2 bg-gray-100 rounded-md shadow flex justify-between items-center"
                    >
                      <span>{size.size}</span>
                      <span>${size.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2 font-medium">
                  ${item.price?.toFixed(2) || "N/A"}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
