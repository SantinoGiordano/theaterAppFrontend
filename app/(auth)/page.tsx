"use client";

import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    // Store user in localStorage
    localStorage.setItem("user", JSON.stringify(data));

    alert("Logged in!");
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-full">Login</button>
        <Link href={'/register'} className="btn btn-primary w-full">Register</Link>
      </form>
    </div>
  );
}
