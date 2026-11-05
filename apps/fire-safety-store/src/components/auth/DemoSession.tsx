'use client';
import { useEffect, useState } from 'react';

type DemoUser = { id: string; name: string; email: string; isAdmin: boolean };
const user: DemoUser = { id: 'demo-visitor', name: 'Демо-покупатель', email: 'hello@example.invalid', isAdmin: false };
const event = 'firesafe:session';
const key = 'firesafe-demo-session';
export function SessionProvider({ children }: { children: React.ReactNode; session?: unknown }) { return <>{children}</>; }
export function useSession() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const refresh = () => { try { setActive(sessionStorage.getItem(key) === 'active'); } catch { setActive(false); } };
    refresh(); window.addEventListener(event, refresh);
    return () => window.removeEventListener(event, refresh);
  }, []);
  return { data: active ? { user, expires: '2099-01-01' } : null, status: active ? 'authenticated' : 'unauthenticated' };
}
export async function signIn(provider?: string, options?: Record<string, unknown>) {
  if (!provider) { window.location.href = '/fire-safety-store/login'; return { ok: true, error: null }; }
  // Passwords and contact values are never retained in this local demonstration.
  sessionStorage.setItem(key, 'active'); window.dispatchEvent(new Event(event));
  return { ok: true, error: null, status: 200, url: '/fire-safety-store/' };
}
export async function signOut(options?: Record<string, unknown>) {
  sessionStorage.removeItem(key); window.dispatchEvent(new Event(event)); return { url: '/fire-safety-store/' };
}
