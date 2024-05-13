import { prisma } from "@/prisma";

import type { PrismaClient, Term } from "@prisma/client";

class TermService {
  constructor(private prisma: PrismaClient) {}

  async create({
    name,
    definition,
    categoryId,
  }: Pick<Term, "name" | "definition" | "categoryId">): Promise<Term> {
    return this.prisma.term.create({
      data: {
        name,
        definition,
        categoryId,
      },
    });
  }

  async findAll(): Promise<Term[]> {
    return await this.prisma.term.findMany();
  }

  async findOne(id: Term["id"]): Promise<Term | null> {
    return await this.prisma.term.findUnique({
      where: {
        id,
      },
    });
  }
}

export const termService = new TermService(prisma);
