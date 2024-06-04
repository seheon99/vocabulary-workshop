"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertTitle,
  Button,
} from "@/components";
import { getSessionId } from "@/features/session/session.action";
import { getRandomTerm } from "@/features/term/term.repository";

export default function Terms() {
  const [sid, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const sid = await getSessionId();
      setSessionId(sid);
    }
    if (!sid) {
      checkSession();
    }
  }, [sid]);

  useEffect(() => {
    async function redirectRandom() {
      const term = await getRandomTerm();
      if (term) {
        router.replace(`/vocabulary/${term.id}`);
      } else {
        setError("No terms found, please add term before use quiz.");
      }
    }
    if (sid && !error) {
      redirectRandom();
    }
  }, [sid, router, error]);

  return (
    <Alert open={!!error} onClose={() => setError(null)}>
      <AlertTitle>Something went wrong :(</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
      <AlertActions>
        <Button plain onClick={() => router.push("/")}>
          Go home
        </Button>
        <Button onClick={() => router.push("/vocabulary/add")}>
          Add new term
        </Button>
      </AlertActions>
    </Alert>
  );
}
