"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthContext";
import { TimesheetProvider } from "@/context/TimesheetContext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <TimesheetProvider>{children}</TimesheetProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
