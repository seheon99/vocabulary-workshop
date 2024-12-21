"use client";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import useSWR, { mutate } from "swr";

import { app, auth } from "@/firebase";

onAuthStateChanged(auth, () => mutate(CURRENT_USER_KEY));

export function useCurrentUser() {
  return useSWR(CURRENT_USER_KEY, () => getAuth(app).currentUser);
}

export const CURRENT_USER_KEY = "current-user";
