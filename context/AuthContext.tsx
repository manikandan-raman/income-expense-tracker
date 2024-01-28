import { auth } from "@/utils/firebase";
import { User } from "firebase/auth";
import React, { useEffect, useState, createContext, ReactNode } from "react";

// undefined: onAuthStateChanged hasn't been called
// null: user is not signed in
// User: user signed in
interface ContextProps {
  user: User | null | undefined;
}

export const AuthContext = createContext<ContextProps>({ user: undefined });

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
