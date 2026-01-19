"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  email: string;
  password: string;
  rememberMe: boolean;
  error: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRememberMe: (rememberMe: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = session?.user
    ? {
        id: (session.user as any).id || "1",
        email: session.user.email || "",
        name: session.user.name || "",
      }
    : null;

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setError(null);
        const result = await signIn("credentials", {
          email,
          password,
          callbackUrl: "/dashboard",
        });

        if (result?.error) {
          setError("Invalid email or password");
          throw new Error("Invalid credentials");
        }

        if (result?.ok) {
          router.push("/dashboard");
        }
      } catch (err) {
        setError("An error occurred during login");
        throw err;
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      setEmail("");
      setPassword("");
      setRememberMe(false);
      setError(null);
      await signOut({ redirect: true, callbackUrl: "/login" });
    } catch (err) {
      setError("An error occurred during logout");
      throw err;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: status === "loading",
        isAuthenticated: !!session,
        email,
        password,
        rememberMe,
        error,
        setEmail,
        setPassword,
        setRememberMe,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
