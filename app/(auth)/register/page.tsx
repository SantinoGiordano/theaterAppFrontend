"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      setSuccess("Account created successfully!");
      // Wait a moment so the success message is visible
      setTimeout(() => {
        router.push("/");
      }, 500);

    } catch (err) {
      setError("Server error. Please try again later.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0e0e] px-4">
    <div className="w-full max-w-md p-6  rounded-xl shadow-lg mx-auto mt-16">
      <h1 className="text-2xl font-bold mb-4 text-center text-red-600">
        Create an Account
      </h1>

      {error && (
        <p className="text-red-500 text-center mb-3 font-medium">{error}</p>
      )}

      {success && (
        <p className="text-green-500 text-center mb-3 font-medium">{success}</p>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full bg-white text-black placeholder-black"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full bg-white text-black placeholder-black"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full bg-white text-black placeholder-black"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold p-1 rounded-sm text-lg flex justify-center items-center transition-colors"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            "Register"
          )}
        </button>
      </form>
        <button 
        onClick={() => router.push("/")}
        className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold p-1 rounded-sm text-lg transition-colors"
        >
            Back
        </button>
    </div>
    </div>
  );
}
