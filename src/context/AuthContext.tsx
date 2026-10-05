import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import * as api from "../lib/auth";

type Ctx = {
  user: api.User | null;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  signup: (name: string, email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
};
const AuthCtx = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<api.User | null>(() => api.currentUser());
  const login = useCallback(async (email: string, password: string, remember: boolean) => setUser(await api.logIn({ email, password, remember })), []);
  const signup = useCallback(async (name: string, email: string, password: string, remember: boolean) => setUser(await api.signUp({ name, email, password, remember })), []);
  const logout = useCallback(() => { api.logOut(); setUser(null); }, []);
  const value = useMemo(() => ({ user, login, signup, logout }), [user, login, signup, logout]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const c = useContext(AuthCtx);
  if (!c) throw new Error("useAuth must be used inside <AuthProvider>");
  return c;
}
