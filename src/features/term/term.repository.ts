"use server";

import { prisma } from "@/prisma";

import type { Term } from "@prisma/client";

export async function createTerm({
  name,
  definition,
  categoryId,
}: Pick<Term, "name" | "definition" | "categoryId">): Promise<Term> {
  return prisma.term.create({
    data: {
      name,
      definition,
      categoryId,
    },
  });
}

export async function findTerms(): Promise<Term[]> {
  return await prisma.term.findMany();
}

export async function findTerm(id: Term["id"]): Promise<Term | null> {
  return await prisma.term.findUnique({
    where: {
      id,
    },
  });
}

export async function getRandomTerm(): Promise<Term | null> {
  const termCount = await prisma.term.count();
  const skip = Math.floor(Math.random() * termCount);
  return await prisma.term.findFirst({
    skip,
  });
}
