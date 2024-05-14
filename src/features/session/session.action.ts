"use server";

import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";

import { createSession } from "./session.repository";

const SESSION_ID_KEY = "sid";

export async function getSessionId() {
  const ip = headers().get("x-forwarded-for");
  const userAgent = headers().get("user-agent");
  const sid = cookies().get(SESSION_ID_KEY);

  if (!ip || !userAgent) {
    notFound();
  }

  if (!sid) {
    const session = await createSession({
      ip,
      userAgent,
    });
    cookies().set(SESSION_ID_KEY, session.id);
    return session.id;
  }
  return sid.value;
}
