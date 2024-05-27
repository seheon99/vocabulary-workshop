import {
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";

import { Badge, Button, Link, Strong } from "@/components";
import { findCategory } from "@/features/category/category.repository";
import { findKeywords } from "@/features/keyword/keyword.repository";
import { getSessionId } from "@/features/session/session.action";
import { findSubmission } from "@/features/submission/submission.repository";
import { Definition } from "@/features/term/definition";
import { findTerm } from "@/features/term/term.repository";

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

  const term = await findTerm(submission.termId);

  if (!term) {
    notFound();
  }

  const category = await findCategory({ id: term.categoryId });
  const keywords = await findKeywords({ termId: term.id });
  const keywordTexts = keywords.map((keyword) => keyword.text);

  return (
    <div className="mx-auto mt-20 flex max-w-3xl flex-col gap-20">
      <main className="flex flex-col gap-8">
        <div>
          <Badge>{category?.name}</Badge>
          <h1>
            <Strong className="text-3xl">{term.name}</Strong>
            <Link
              href={`/vocabulary/${submission.termId}/edit?redirect=/submission/${submission.id}`}
            >
              <Button plain>
                <PencilSquareIcon />
              </Button>
            </Link>
          </h1>
        </div>
        <div>
          <Strong>Your Answer</Strong>
          <Definition
            value={submission.answer}
            keywords={keywordTexts}
            color="blue"
          />
        </div>
        <div>
          <Strong>Definition</Strong>
          <Definition
            value={term.definition}
            keywords={keywords.map((k) => k.text)}
          />
        </div>
        <div className="flex">
          <div className="flex-1">
            <Strong>Included Keywords</Strong>
            <div className="mt-2 flex flex-wrap gap-2">
              {keywords
                .filter((keyword) => submission.answer.includes(keyword.text))
                .map((keyword) => (
                  <Badge key={keyword.id} color="blue">
                    {keyword.text}
                  </Badge>
                ))}
            </div>
          </div>
          <div className="flex-1">
            <Strong>Missing Keywords</Strong>
            <div className="mt-2 flex flex-wrap gap-2">
              {keywords
                .filter((keyword) => !submission.answer.includes(keyword.text))
                .map((keyword) => (
                  <Badge key={keyword.id} color="red">
                    {keyword.text}
                  </Badge>
                ))}
            </div>
          </div>
        </div>
      </main>
      <div className="flex justify-between">
        <div className="flex flex-1 justify-start">
          <Link href={`/`}>
            <Button plain>
              <ChevronLeftIcon /> Back to home
            </Button>
          </Link>
        </div>
        <div className="flex flex-1 justify-center">
          <Link href={`/vocabulary/${term.id}`}>
            <Button plain>
              <ArrowPathIcon /> Retry
            </Button>
          </Link>
        </div>
        <div className="flex flex-1 justify-end">
          <Link href="/vocabulary">
            <Button plain>
              Next <ChevronRightIcon />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
