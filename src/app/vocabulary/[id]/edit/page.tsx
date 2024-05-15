import { notFound } from "next/navigation";

import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Link,
  Select,
  Strong,
} from "@/components";
import { findCategories } from "@/features/category/category.repository";
import { findKeywords } from "@/features/keyword/keyword.repository";
import { updateVocabulary } from "@/features/term/term.action";
import { findTerm } from "@/features/term/term.repository";
import {
  EDIT_REDIRECT_KEY,
  VOCABULARY_CATEGORYID_KEY,
  VOCABULARY_REDIRECTURL_KEY,
  VOCABULARY_TERMID_KEY,
} from "@/global-keys";

import { DefinitionField } from "./definition-field";

export default async function VocabularyEdit({
  params: { id },
  searchParams: { [EDIT_REDIRECT_KEY]: redirectUrl },
}: {
  params: { id: string };
  searchParams: { [EDIT_REDIRECT_KEY]?: string };
}) {
  const term = await findTerm(id);
  const categories = await findCategories();

  if (!term || !categories) {
    notFound();
  }

  const keywords = await findKeywords({ termId: term?.id });

  return (
    <main>
      <h1>
        <Strong className="text-3xl">Edit {term?.name}</Strong>
      </h1>
      <form action={updateVocabulary} className="mt-10 flex flex-col gap-8">
        <Fieldset className="flex flex-col gap-4">
          <input
            name={VOCABULARY_REDIRECTURL_KEY}
            type="hidden"
            value={redirectUrl}
          />
          <input name={VOCABULARY_TERMID_KEY} type="hidden" value={term?.id} />
          <Field>
            <Label>Category</Label>
            <Select
              name={VOCABULARY_CATEGORYID_KEY}
              defaultValue={term?.categoryId}
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </Field>
          <DefinitionField term={term} defaultKeywords={keywords} />
        </Fieldset>
        <div className="flex justify-between">
          <Link href={redirectUrl ?? ""}>
            <Button plain>Cancel</Button>
          </Link>
          <Button type="submit">Done</Button>
        </div>
      </form>
    </main>
  );
}
