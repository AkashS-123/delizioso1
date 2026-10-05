import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { byId, type MenuItem } from "../data/menu";
import { usePersistentState } from "../lib/storage";

export const TAX_RATE = 0.045;
export const VOUCHERS: Record<string, number> = { FREETOEAT: 5 }; // code -> $ off

export type Line = { item: MenuItem; qty: number };
export type Draft = { address?: string; orderTime?: "now" | "later"; method?: "delivery" | "takeaway"; payment?: string };
export type Order = {
  id: string;
  lines: { name: string; qty: number; price: number }[];
  subtotal: number; taxFee: number; discount: number; total: number;
  customer: { name: string; email: string; phone: string; note: string };
  orderTime: string; method: string; payment: string; address: string;
};

type Ctx = {
  lines: Line[]; count: number;
  subtotal: number; taxFee: number; discount: number; total: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  voucher: string; voucherApplied: boolean; voucherMessage: string;
  setVoucher: (v: string) => void; applyVoucher: () => void;
  draft: Draft; setDraft: (d: Draft) => void;
  order: Order | null;
  placeOrder: (o: Omit<Order, "id" | "lines" | "subtotal" | "taxFee" | "discount" | "total">) => Order;
};
const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [qtys, setQtys] = usePersistentState<Record<string, number>>("delizioso.cart", {});
  const [order, setOrder] = usePersistentState<Order | null>("delizioso.lastOrder", null);
  const [voucher, setVoucherText] = useState("");
  const [applied, setApplied] = useState(0); // $ off currently applied
  const [voucherMessage, setMsg] = useState("");
  const [draft, setDraft] = useState<Draft>({});

  const lines = useMemo<Line[]>(
    () => Object.entries(qtys).flatMap(([id, qty]) => { const item = byId(id); return item && qty > 0 ? [{ item, qty }] : []; }),
    [qtys],
  );
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.qty * l.item.price, 0);
  const taxFee = subtotal * TAX_RATE;
  const discount = Math.min(applied, subtotal);
  const total = Math.max(0, subtotal + taxFee - discount);

  const add = useCallback((id: string, qty = 1) => setQtys((q) => ({ ...q, [id]: (q[id] ?? 0) + qty })), [setQtys]);
  const setQty = useCallback((id: string, qty: number) => setQtys((q) => {
    if (qty <= 0) { const { [id]: _drop, ...rest } = q; return rest; }
    return { ...q, [id]: qty };
  }), [setQtys]);
  const remove = useCallback((id: string) => setQty(id, 0), [setQty]);

  const setVoucher = (v: string) => { setVoucherText(v); setApplied(0); setMsg(""); };
  const applyVoucher = () => {
    const off = VOUCHERS[voucher.trim().toUpperCase()];
    if (off) { setApplied(off); setMsg(`Voucher applied: $${off} off`); }
    else { setApplied(0); setMsg(voucher.trim() ? "That voucher code isn't valid." : "Enter a voucher code first."); }
  };

  const placeOrder: Ctx["placeOrder"] = (o) => {
    const placed: Order = {
      ...o,
      id: String(Math.floor(100000 + Math.random() * 900000)),
      lines: lines.map((l) => ({ name: l.item.name, qty: l.qty, price: l.item.price })),
      subtotal, taxFee, discount, total,
    };
    setOrder(placed);
    setQtys({});
    setVoucherText(""); setApplied(0); setMsg(""); setDraft({});
    return placed;
  };

  const value: Ctx = { lines, count, subtotal, taxFee, discount, total, add, setQty, remove, voucher, voucherApplied: applied > 0, voucherMessage, setVoucher, applyVoucher, draft, setDraft, order, placeOrder };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart must be used inside <CartProvider>");
  return c;
}
