import { Field, Input, Label, Strong } from "@/components";
import { submitAnswer } from "@/features/submission/submission.action";
import { findTerm } from "@/features/term/term.repository";
import { SUBMISSION_ANSWER_KEY, SUBMISSION_TERMID_KEY } from "@/global-keys";

export default async function Vocabulary({
  params: { id },
}: {
  params: { id: string };
}) {
  const term = await findTerm(id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10">
      <Strong className="text-3xl font-bold">{term?.name}</Strong>
      <form className="w-full max-w-3xl" action={submitAnswer}>
        <Field>
          <Input type="hidden" name={SUBMISSION_TERMID_KEY} value={term?.id} />
          <Label>Answer</Label>
          <Input
            className="max-w-3xl"
            name={SUBMISSION_ANSWER_KEY}
            placeholder="Type your answer here"
            autoFocus
          />
        </Field>
      </form>
    </main>
  );
}
