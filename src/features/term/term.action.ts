"use server";

import { notFound, redirect } from "next/navigation";

import {
  createKeyword,
  deleteKeyword,
  findKeywords,
} from "@/features/keyword/keyword.repository";
import { getSessionId } from "@/features/session/session.action";
import {
  VOCABULARY_CATEGORYID_KEY,
  VOCABULARY_DEFINITION_KEY,
  VOCABULARY_KEYWORDS_KEY,
  VOCABULARY_REDIRECTURL_KEY,
  VOCABULARY_TERMID_KEY,
  VOCABULARY_TERMNAME_KEY,
} from "@/global-keys";

import { createTerm, findTerm, updateTerm } from "./term.repository";

export async function createTermAction(formData: FormData) {
  const categoryId = formData.get(VOCABULARY_CATEGORYID_KEY);
  const termName = formData.get(VOCABULARY_TERMNAME_KEY);
  const definition = formData.get(VOCABULARY_DEFINITION_KEY);
  const keywords = formData.getAll(VOCABULARY_KEYWORDS_KEY) as string[];

  if (
    !categoryId ||
    !termName ||
    !definition ||
    !keywords ||
    typeof categoryId !== "string" ||
    typeof termName !== "string" ||
    typeof definition !== "string" ||
    !Array.isArray(keywords) ||
    keywords.some((text) => typeof text !== "string")
  ) {
    notFound();
  }

  const term = await createTerm({ categoryId, name: termName, definition });
  for (const keyword of keywords) {
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword.length === 0) {
      continue;
    }
    await createKeyword({ text: trimmedKeyword, termId: term.id });
  }

  redirect("/");
}

export async function updateTermAction(formData: FormData) {
  const sessionId = await getSessionId();

  if (!sessionId) {
    notFound();
  }

  const termId = formData.get(VOCABULARY_TERMID_KEY);
  const categoryId = formData.get(VOCABULARY_CATEGORYID_KEY);
  const definition = formData.get(VOCABULARY_DEFINITION_KEY);
  const redirectUrl = formData.get(VOCABULARY_REDIRECTURL_KEY);
  const userKeywords = formData.getAll(VOCABULARY_KEYWORDS_KEY) as string[];

  if (
    !termId ||
    !categoryId ||
    !definition ||
    !redirectUrl ||
    !userKeywords ||
    typeof termId !== "string" ||
    typeof categoryId !== "string" ||
    typeof definition !== "string" ||
    typeof redirectUrl !== "string" ||
    !Array.isArray(userKeywords) ||
    userKeywords.some((text) => typeof text !== "string")
  ) {
    notFound();
  }

  const term = await findTerm(termId);
  if (!term) {
    notFound();
  }

  const storedKeywords = await findKeywords({ termId: term.id });
  for (const keyword of storedKeywords) {
    if (!userKeywords.includes(keyword.text)) {
      await deleteKeyword(keyword.id);
    }
  }
  for (const keyword of userKeywords) {
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword.length === 0) {
      continue;
    }
    if (!storedKeywords.some((k) => k.text === trimmedKeyword)) {
      await createKeyword({ text: trimmedKeyword, termId: term.id });
    }
  }

  await updateTerm(termId, { categoryId, definition });
  redirect(redirectUrl);
}
