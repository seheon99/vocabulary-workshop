"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

import { findRandomVocabulary } from "@/actions";
import { Text } from "@/components/base";
import { useCurrentUser } from "@/hooks";

export default function QuizPage() {
  const { data: vocabulary } = useSWR("random-vocabulary", () =>
    findRandomVocabulary(),
  );

  const { data: user, isLoading: isLoadingUser } = useCurrentUser();

  const router = useRouter();

  useEffect(() => {
    if (!isLoadingUser && !user) {
      toast.error("You have to login before quiz");
      router.replace("/");
    }
    if (user && vocabulary === null) {
      router.replace("/vocabularies");
    }
    if (user && vocabulary) {
      router.replace(`/quiz/${vocabulary.id}`);
    }
  }, [vocabulary, user, isLoadingUser, router]);

  return <Text>Loading</Text>;
}
