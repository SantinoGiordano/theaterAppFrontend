"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(""); // clear previous errors

    // FRONTEND VALIDATION
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/home");
    } catch (err) {
      setError("Server error. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0e0e] px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-white mb-6 tracking-wide">
          Sign In
        </h1>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-600/20 border border-red-600 text-red-300 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full bg-white text-black border-red-500 focus:border-red-600"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full bg-white text-black border-red-500 focus:border-red-600"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            className="btn w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg border-none flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-lg"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-5">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-red-400 hover:text-red-300 cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
