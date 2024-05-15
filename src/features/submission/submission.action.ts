"use server";

import { notFound, redirect } from "next/navigation";

import { getSessionId } from "@/features/session/session.action";
import { SUBMISSION_ANSWER_KEY, SUBMISSION_TERMID_KEY } from "@/global-keys";

import { createSubmission } from "./submission.repository";

export async function submitAnswer(formData: FormData) {
  const sessionId = await getSessionId();

  const termId = formData.get(SUBMISSION_TERMID_KEY);
  const answer = formData.get(SUBMISSION_ANSWER_KEY);

  if (
    !sessionId ||
    !termId ||
    !answer ||
    typeof termId !== "string" ||
    typeof answer !== "string"
  ) {
    notFound();
  }

  const { id } = await createSubmission({ sessionId, termId, answer });
  redirect(`/submission/${id}`);
}
