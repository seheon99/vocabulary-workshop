"use server";

import { prisma } from "@/prisma";

import type { Category } from "@prisma/client";

export async function createCategory({
  name,
}: Pick<Category, "name">): Promise<Category> {
  return prisma.category.create({
    data: {
      name,
    },
  });
}

export async function findCategories(): Promise<Category[]> {
  return await prisma.category.findMany();
}

export async function findCategory(
  id: Category["id"]
): Promise<Category | null> {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
}
