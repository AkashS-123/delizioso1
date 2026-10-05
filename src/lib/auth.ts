/**
 * Front-end-only auth used until a real API exists. Accounts live in this browser's
 * localStorage; passwords are stored as a salted SHA-256 hash (never plain text).
 *
 * TO GO LIVE: keep the exported function signatures and replace the bodies with fetch()
 * calls to your backend – the pages and AuthContext don't need to change.
 */
const USERS_KEY = "delizioso.users";
const SESSION_KEY = "delizioso.session";

export type User = { name: string; email: string };
type Stored = User & { hash: string };

export class AuthError extends Error {}

export const normalizeEmail = (e: string) => e.trim().toLowerCase();
export const isEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());

async function hash(email: string, password: string) {
  const data = `${email}::${password}`;
  try {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data));
    return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    // crypto.subtle only exists on https / localhost – cheap fallback so dev never breaks.
    let h = 5381;
    for (let i = 0; i < data.length; i++) h = ((h << 5) + h + data.charCodeAt(i)) | 0;
    return `x${h}`;
  }
}

const readUsers = (): Stored[] => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]"); } catch { return []; }
};
const writeUsers = (u: Stored[]) => { try { localStorage.setItem(USERS_KEY, JSON.stringify(u)); } catch { /* ignore */ } };

function startSession(user: User, remember: boolean) {
  endSession();
  try { (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, JSON.stringify(user)); } catch { /* ignore */ }
}
function endSession() {
  try { localStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
}

export function currentUser(): User | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY) ?? localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch { return null; }
}

export async function signUp(a: { name: string; email: string; password: string; remember: boolean }): Promise<User> {
  const email = normalizeEmail(a.email);
  const users = readUsers();
  if (users.some((u) => u.email === email)) throw new AuthError("An account with this email already exists. Try logging in.");
  const user = { name: a.name.trim(), email };
  writeUsers([...users, { ...user, hash: await hash(email, a.password) }]);
  startSession(user, a.remember);
  return user;
}

export async function logIn(a: { email: string; password: string; remember: boolean }): Promise<User> {
  const email = normalizeEmail(a.email);
  const found = readUsers().find((u) => u.email === email);
  if (!found || found.hash !== (await hash(email, a.password))) throw new AuthError("Incorrect email or password.");
  const user = { name: found.name, email: found.email };
  startSession(user, a.remember);
  return user;
}

export const logOut = endSession;
