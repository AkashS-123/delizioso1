import { useEffect, useState } from "react";

/** localStorage-backed useState. Falls back to memory when storage is unavailable. */
export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw) as T;
    } catch {
      /* storage unavailable or corrupt – use initial */
    }
    return initial;
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }, [key, value]);
  // Another tab changed this key (e.g. placed an order) – follow it instead of showing stale data.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key || e.newValue == null) return;
      try { setValue(JSON.parse(e.newValue) as T); } catch { /* ignore */ }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);
  return [value, setValue] as const;
}

export const money = (n: number) => `$${n.toFixed(2)}`;
