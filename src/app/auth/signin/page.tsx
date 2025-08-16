"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in to dochain</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn("credentials", { email, password });
          }}
          className="mb-6"
        >
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <label htmlFor="password" className="block mb-2 font-semibold">
            Password
          </label>
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
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Sign in with Email & Password
          </button>
        </form>
        <div className="text-center mb-2 font-semibold text-gray-500">Or</div>
        
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full bg-red-600 text-white p-2 rounded"
        >
          Sign in with Google
        </button>
        <div className="text-center mt-4">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-blue-600 hover:text-blue-800">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}
