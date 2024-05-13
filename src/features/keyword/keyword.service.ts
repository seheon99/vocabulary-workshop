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

export async function findAllKeywords(): Promise<Keyword[]> {
  return await prisma.keyword.findMany();
}

export async function findOneKeyword(
  id: Keyword["id"]
): Promise<Keyword | null> {
  return await prisma.keyword.findUnique({
    where: {
      id,
    },
  });
}
