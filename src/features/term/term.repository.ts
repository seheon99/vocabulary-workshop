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

export async function findAllTerms(): Promise<Term[]> {
  return await prisma.term.findMany();
}

export async function findOneTerm(id: Term["id"]): Promise<Term | null> {
  return await prisma.term.findUnique({
    where: {
      id,
    },
  });
}
