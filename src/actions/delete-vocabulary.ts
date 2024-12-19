"use server";

import { getAuth } from "firebase/auth";

import { app } from "@/firebase";
import { prisma } from "@/utilities";

import type { Vocabulary } from "@prisma/client";

export async function deleteVocabulary({ id }: { id: Vocabulary["id"] }) {
  const user = getAuth(app).currentUser;
  if (!user) {
    Promise.reject("Who are you?");
  }

  return await prisma.vocabulary.delete({
    where: {
      id,
    },
  });
}
