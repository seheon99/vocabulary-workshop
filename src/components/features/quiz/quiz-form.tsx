"use client";

import { ArrowTurnDownLeftIcon } from "@heroicons/react/16/solid";
import { isNil } from "es-toolkit";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";

import { createSubmission } from "@/actions/create-submission";
import {
  Field,
  Fieldset,
  Input,
  KeyboardButton,
  Label,
  Text,
} from "@/components/base";
import { useCurrentUser } from "@/hooks";

export function QuizForm({ vocabularyId }: { vocabularyId: string }) {
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormInputs>();

  const { data: user } = useCurrentUser();

  const {
    data,
    trigger: submitAnswer,
    isMutating,
  } = useSWRMutation(
    "submitAnswer",
    (
      _,
      {
        arg,
      }: { arg: { userId: string; vocabularyId: string; answer: string } },
    ) => createSubmission(arg),
  );

  const onSubmit = useMemo(
    () =>
      user?.uid
        ? handleSubmit(({ answer }) => {
            submitAnswer({ userId: user.uid, vocabularyId, answer });
          })
        : () => {},
    [handleSubmit, submitAnswer, user?.uid, vocabularyId],
  );

  useEffect(() => {
    if (data?.id) {
      router.push(`/submissions/${data.id}`);
    }
  }, [data, router]);

  if (isNil(user)) {
    toast.error("You must be logged in to take the quiz");
    return <Text>Loading ...</Text>;
  }

  return (
    <Fieldset>
      <form className="mt-10 flex w-full flex-col" onSubmit={onSubmit}>
        <Field>
          <Label>Answer</Label>
          <Input
            {...register("answer")}
            placeholder="Type your answer here"
            autoFocus
            autoComplete="off"
          />
        </Field>
        <Text className="mt-4 flex items-center justify-center">
          Press
          <KeyboardButton
            className="mx-2"
            type="submit"
            color="light"
            keyName="Enter"
            disabled={isMutating}
            handler={() => onSubmit()}
          >
            <ArrowTurnDownLeftIcon />
            Enter
          </KeyboardButton>
          to submit
        </Text>
      </form>
    </Fieldset>
  );
}

type FormInputs = {
  answer: string;
};
