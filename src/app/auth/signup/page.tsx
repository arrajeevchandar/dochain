"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    setLoading(false);
    const data = await res.json();
    if (res.ok) {
      router.push("/auth/signin");
    } else {
      setError(data.error ?? "Signup failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Create your account</h2>
        <form onSubmit={handleSubmit} className="mb-6">
          <label htmlFor="username" className="block mb-2 font-semibold">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <label htmlFor="email" className="block mb-2 font-semibold">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <label htmlFor="password" className="block mb-2 font-semibold">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Signing Up…" : "Sign Up"}
          </button>
        </form>
        {error && <div className="text-red-500 text-center mb-2">{error}</div>}
        <div className="text-center mb-2 font-semibold text-gray-500">Already have an account?</div>
        <Link href="/auth/signin" className="block text-center text-blue-600 hover:text-blue-800">
          Go to Sign In
        </Link>
      </div>
    </div>
  );
}
