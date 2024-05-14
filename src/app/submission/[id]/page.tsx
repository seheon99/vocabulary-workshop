import { notFound } from "next/navigation";

import { getSessionId } from "@/features/session/session.action";
import { findSubmission } from "@/features/submission/submission.repository";

export default async function Submission({
  params: { id },
}: {
  params: { id: string };
}) {
  const submission = await findSubmission(id);
  const sid = await getSessionId();

  if (!submission || submission.sessionId !== sid) {
    notFound();
  }

  return (
    <div>
      <h1>Submission</h1>
      <p>Answer: {submission.answer}</p>
    </div>
  );
}
