// src/stores/UserStore.ts
import { atom } from "nanostores";
import type { TUser } from "../types";

export const user = atom<TUser | null>(null);

export function setUser(newUser: TUser) {
  user.set(newUser);
}

export function clearSession() {
  user.set(null);
}

export function getUser() {
  return user.get();
}

export function isLoggedIn() {
  return user.get() !== null;
}
