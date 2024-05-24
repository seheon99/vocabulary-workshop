import { Button, Field, Input, Label, Link, Strong } from "@/components";
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
    <main className="flex flex-col items-center gap-10">
      <Strong className="text-3xl font-bold">{term?.name}</Strong>
      <form className="w-full" action={submitAnswer}>
        <Field>
          <input type="hidden" name={SUBMISSION_TERMID_KEY} value={term?.id} />
          <Label>Answer</Label>
          <Input
            name={SUBMISSION_ANSWER_KEY}
            placeholder="Type your answer here"
            autoFocus
            autoComplete="off"
          />
        </Field>
      </form>
      <Link href="/">
        <Button plain>Cancel</Button>
      </Link>
    </main>
  );
}
