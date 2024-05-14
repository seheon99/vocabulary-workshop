"use server";

import { Answer } from "@prisma/client";

import { prisma } from "@/prisma";

export async function createAnswer({
  ip,
  termId,
  answer,
}: {
  ip: string;
  termId: string;
  answer: string;
}): Promise<Answer> {
  return prisma.answer.create({
    data: {
      ip,
      termId,
      text: answer,
    },
  });
}

export async function findAnswers(): Promise<Answer[]> {
  return await prisma.answer.findMany();
}

export async function findAnswer(id: Answer["id"]): Promise<Answer | null> {
  return await prisma.answer.findUnique({
    where: {
      id,
    },
  });
}
