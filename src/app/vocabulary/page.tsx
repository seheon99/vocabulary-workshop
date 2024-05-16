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
import { getRandomTerm } from "@/features/term/term.repository";

export default function Terms() {
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function redirectRandom() {
      const term = await getRandomTerm();
      if (term) {
        router.replace(`/vocabulary/${term.id}`);
      } else {
        setError("No terms found, please add term before use quiz.");
      }
    }
    if (!error) {
      redirectRandom();
    }
  }, [router, error]);

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
