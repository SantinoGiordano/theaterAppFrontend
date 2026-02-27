"use client";

import { useState } from "react";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, email, message }),
    });

    if (res.ok) {
      setStatus("Message sent successfully.");
      setFirstName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold text-white tracking-wide">
            Contact Us
          </h1>
          <div className="mt-3 h-[2px] w-16 bg-red-600 mx-auto rounded-full" />
        </div>

        <div className="bg-neutral-900 border border-red-900/40 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <input
              type="text"
              placeholder="Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="text-white input input-bordered bg-black border-neutral-700 focus:border-red-600 focus:outline-none"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-white input input-bordered bg-black border-neutral-700 focus:border-red-600 focus:outline-none"
              required
            />

            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="text-white textarea textarea-bordered bg-black border-neutral-700 focus:border-red-600 focus:outline-none"
              required
            />

            <button
              type="submit"
              className="btn bg-red-700 hover:bg-red-600 text-white border-none rounded-xl transition-all duration-200"
            >
              Send Message
            </button>

          </form>

          {status && (
            <p className="text-sm text-center text-neutral-400 mt-6">
              {status}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}