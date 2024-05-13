import { prisma } from "@/prisma";

import type { Category, PrismaClient } from "@prisma/client";

class CategoryService {
  constructor(private prisma: PrismaClient) {}

  async create({ name }: Pick<Category, "name">): Promise<Category> {
    return this.prisma.category.create({
      data: {
        name,
      },
    });
  }

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async findOne(id: Category["id"]): Promise<Category | null> {
    return await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }
}

export const categoryService = new CategoryService(prisma);
