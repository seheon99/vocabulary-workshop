"use server";

import { Session } from "@prisma/client";

import { prisma } from "@/prisma";

export async function createSession({
  ip,
  userAgent,
}: Pick<Session, "ip" | "userAgent">): Promise<Session> {
  return await prisma.session.create({
    data: {
      ip,
      userAgent,
    },
  });
}

export async function getSession(id: Session["id"]): Promise<Session | null> {
  return await prisma.session.findUnique({
    where: {
      id,
    },
  });
}
