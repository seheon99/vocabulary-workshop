"use server";

import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { createSession } from "./session.repository";

const SESSION_ID_KEY = "sid";

export async function createSessionAction(password: string) {
  const { ip, userAgent } = inspectHeader();

  if (password !== process.env.PASSWORD) {
    return null;
  }

  const session = await createSession({
    ip,
    userAgent,
  });
  cookies().set(SESSION_ID_KEY, session.id);
  return session.id;
}

export async function getSessionId() {
  inspectHeader();

  const sid = cookies().get(SESSION_ID_KEY);
  if (!sid) {
    redirect("/login");
  }

  return sid.value;
}

function inspectHeader() {
  const ip = headers().get("x-forwarded-for");
  const userAgent = headers().get("user-agent");

  if (!ip || !userAgent) {
    notFound();
  }

  return { ip, userAgent };
}
