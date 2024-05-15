"use server";

import { notFound, redirect } from "next/navigation";

import { getSessionId } from "@/features/session/session.action";
import {
  VOCABULARY_CATEGORYID_KEY,
  VOCABULARY_DEFINITION_KEY,
  VOCABULARY_REDIRECTURL_KEY,
  VOCABULARY_TERMID_KEY,
} from "@/global-keys";

import { findTerm, updateTerm } from "./term.repository";
import { createTermUpdateLog } from "../term-update-log/term-update-log.repository";

export async function updateVocabulary(formData: FormData) {
  const sessionId = await getSessionId();

  const termId = formData.get(VOCABULARY_TERMID_KEY);
  const categoryId = formData.get(VOCABULARY_CATEGORYID_KEY);
  const definition = formData.get(VOCABULARY_DEFINITION_KEY);
  const redirectUrl = formData.get(VOCABULARY_REDIRECTURL_KEY);

  if (
    !sessionId ||
    !termId ||
    !categoryId ||
    !definition ||
    !redirectUrl ||
    typeof termId !== "string" ||
    typeof categoryId !== "string" ||
    typeof definition !== "string" ||
    typeof redirectUrl !== "string"
  ) {
    notFound();
  }

  const term = await findTerm(termId);

  if (!term) {
    notFound();
  }

  if (term.categoryId !== categoryId) {
    await createTermUpdateLog({
      termId,
      fieldChanged: "categoryId",
      oldValue: term.categoryId,
      newValue: categoryId,
      sessionId,
    });
  }

  if (term.definition !== definition) {
    await createTermUpdateLog({
      termId,
      fieldChanged: "definition",
      oldValue: term.definition,
      newValue: definition,
      sessionId,
    });
  }

  await updateTerm(termId, { categoryId, definition });
  redirect(redirectUrl);
}
