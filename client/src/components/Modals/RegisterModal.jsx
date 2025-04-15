import React, { useState } from "react";

export default function RegisterModal({ onClose, setMessage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "user" }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      setMessage(data.message); // ✅ Send to App global message

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white dark:bg-neutral-900 rounded-2xl p-8 w-[90%] max-w-md shadow-2xl border border-gray-200 dark:border-neutral-700">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white text-2xl"
        >
          ×
        </button>

        {/* Header */}
        <h2 className="text-3xl font-semibold text-center text-neutral-900 dark:text-white mb-6">
          Create an account
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alice Dupont"
              className="w-full px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl outline-none focus:ring-2 ring-blue-400 text-sm"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@email.com"
              className="w-full px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl outline-none focus:ring-2 ring-blue-400 text-sm"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl outline-none focus:ring-2 ring-blue-400 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-200 mt-2"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
