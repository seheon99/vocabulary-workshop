"use server";

import { Submission } from "@prisma/client";

import { prisma } from "@/prisma";

export async function createSubmission({
  sessionId,
  termId,
  answer,
}: Pick<Submission, "sessionId" | "termId" | "answer">): Promise<Submission> {
  return prisma.submission.create({
    data: {
      sessionId,
      termId,
      answer,
    },
  });
}

export async function findSubmissions(): Promise<Submission[]> {
  return await prisma.submission.findMany();
}

export async function findSubmission(
  id: Submission["id"]
): Promise<Submission | null> {
  return await prisma.submission.findUnique({
    where: {
      id,
    },
  });
}
