"use server";

import { prisma } from "@/utilities";

export async function deleteKeyword(id: string) {
  return await prisma.keyword.delete({
    where: { id },
  });
}
