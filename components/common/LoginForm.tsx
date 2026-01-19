"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const {
    email,
    password,
    rememberMe,
    error,
    setEmail,
    setPassword,
    setRememberMe,
    login,
    isLoading,
  } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-6 sm:p-8 lg:p-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <h1 className="text-xl sm:text-2xl lg:text-[20px] font-bold mb-6 sm:mb-8">
          Welcome back
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="mb-6">
          <Input
            label="Email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 cursor-pointer"
            />
            <span className="ml-2 text-sm">Remember me</span>
          </label>
        </div>

        <Button type="submit" fullWidth disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
