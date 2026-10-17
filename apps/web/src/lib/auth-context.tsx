"use client";

import React, { createContext, useContext, useState } from "react";
import { UserIdentity } from "@/lib/navigation";

interface AuthContextValue {
  user: UserIdentity | null;
  isAuthenticated: boolean;
  status: "unauthenticated" | "authenticated" | "loading";
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  status: "unauthenticated",
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In the current baseline, authentication engine has not been connected yet.
  // We do not fabricate fake users, roles, or tokens.
  const [user] = useState<UserIdentity | null>(null);
  const [status] = useState<"unauthenticated" | "authenticated" | "loading">("unauthenticated");

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        status,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
