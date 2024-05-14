"use server";

import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { createSubmission } from "./submission.repository";
import { getSessionId } from "../session/session.action";

export const SUBMISSION_TERMID_KEY = "term-id";
export const SUBMISSION_ANSWER_KEY = "answer";

export async function submitAnswer(formData: FormData) {
  const termId = formData.get(SUBMISSION_TERMID_KEY);
  const answer = formData.get(SUBMISSION_ANSWER_KEY);
  const sessionId = await getSessionId();

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
