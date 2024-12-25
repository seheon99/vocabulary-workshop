"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/utilities";

import type { Vocabulary } from "@prisma/client";

export async function deleteVocabulary({ id }: { id: Vocabulary["id"] }) {
  const vocabulary = await prisma.vocabulary.delete({
    where: {
      id,
    },
  });

  revalidatePath("/vocabularies");

  return vocabulary;
}
