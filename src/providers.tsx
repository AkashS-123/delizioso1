import type { ReactNode } from "react";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

export default function AppProviders({ children }: { children: ReactNode }) {
  return <AuthProvider><CartProvider>{children}</CartProvider></AuthProvider>;
}
