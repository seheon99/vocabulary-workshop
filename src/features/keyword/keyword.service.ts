import { prisma } from "@/prisma";

import type { Keyword, PrismaClient } from "@prisma/client";

class KeywordService {
  constructor(private prisma: PrismaClient) {}

  async create({
    text,
    termId,
  }: Pick<Keyword, "text" | "termId">): Promise<Keyword> {
    return this.prisma.keyword.create({
      data: {
        text,
        termId,
      },
    });
  }

  async findAll(): Promise<Keyword[]> {
    return await this.prisma.keyword.findMany();
  }

  async findOne(id: Keyword["id"]): Promise<Keyword | null> {
    return await this.prisma.keyword.findUnique({
      where: {
        id,
      },
    });
  }
}

export const keywordService = new KeywordService(prisma);
