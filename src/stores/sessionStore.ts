import { atom } from "nanostores";
import type { Session } from "@supabase/supabase-js";

export const session = atom<Session | null>(null);

export function setSession(newSession: Session) {
  session.set(newSession);
}

export function clearSession() {
  session.set(null);
}

export function getSession() {
  return session.get();
}
