"use server";

import { prisma } from "@/prisma";

import type { Keyword } from "@prisma/client";

export async function createKeyword({
  text,
  termId,
}: Pick<Keyword, "text" | "termId">): Promise<Keyword> {
  return prisma.keyword.create({
    data: {
      text,
      termId,
    },
  });
}

export async function findKeywords({
  termId,
}: Partial<Pick<Keyword, "termId">>): Promise<Keyword[]> {
  return await prisma.keyword.findMany({
    where: {
      termId,
    },
  });
}

export async function findKeyword(id: Keyword["id"]): Promise<Keyword | null> {
  return await prisma.keyword.findUnique({
    where: {
      id,
    },
  });
}

export async function deleteKeyword(id: Keyword["id"]): Promise<void> {
  await prisma.keyword.delete({
    where: {
      id,
    },
  });
}
