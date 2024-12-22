"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/utilities";

export async function createVocabulary({
  creatorId,
  categoryId,
  term,
  definition,
}: {
  creatorId: string;
  categoryId: string;
  term: string;
  definition: string;
}) {
  const vocabulary = await prisma.vocabulary.create({
    data: {
      term,
      definition,

      User: {
        connect: {
          id: creatorId,
        },
      },

      Category: {
        connect: {
          id: categoryId,
        },
      },
    },
  });

  revalidatePath("/vocabularies");

  return vocabulary;
}
