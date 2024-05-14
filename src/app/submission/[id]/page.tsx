import { notFound } from "next/navigation";

import { Badge, Strong, Text } from "@/components";
import { findCategory } from "@/features/category/category.repository";
import { findKeywords } from "@/features/keyword/keyword.repository";
import { getSessionId } from "@/features/session/session.action";
import { findSubmission } from "@/features/submission/submission.repository";
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

  const category = await findCategory(term.categoryId);
  const keywords = await findKeywords({ termId: term.id });
  const keywordTexts = keywords.map((keyword) => keyword.text);

  const regexp = new RegExp(`(${keywordTexts.join("|")})`, "gi");
  const definitionParts = term.definition.split(regexp);
  const includedKeywordTexts: string[] = submission.answer.match(regexp) || [];

  return (
    <main className="mx-auto mt-20 flex min-h-screen max-w-3xl flex-col gap-8">
      <div>
        <Badge>{category?.name}</Badge>
        <h1 className="text-3xl font-bold">{term.name}</h1>
      </div>
      <div>
        <Strong>Your Answer</Strong>
        <Text>{submission.answer}</Text>
      </div>
      <div>
        <Strong>Definition</Strong>
        <Text>
          {definitionParts.map((part, index) =>
            regexp.test(part) ? (
              <Strong
                key={index}
                color={
                  includedKeywordTexts.includes(part.toLowerCase())
                    ? "blue"
                    : "red"
                }
              >
                {part}
              </Strong>
            ) : (
              part
            )
          )}
        </Text>
      </div>
      <div className="flex">
        <div className="flex-1 ">
          <Strong>Included Keywords</Strong>
          <div className="flex gap-2">
            {keywords
              .filter((keyword) => includedKeywordTexts.includes(keyword.text))
              .map((keyword) => (
                <Badge key={keyword.id} color="blue">
                  {keyword.text}
                </Badge>
              ))}
          </div>
        </div>
        <div className="flex-1">
          <Strong>Missing Keywords</Strong>
          <div className="flex gap-2">
            {keywords
              .filter((keyword) => !includedKeywordTexts.includes(keyword.text))
              .map((keyword) => (
                <Badge key={keyword.id} color="red">
                  {keyword.text}
                </Badge>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
