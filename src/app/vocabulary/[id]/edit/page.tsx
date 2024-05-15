import {
  Button,
  Field,
  Fieldset,
  Label,
  Link,
  Select,
  Strong,
  Textarea,
} from "@/components";
import { findCategories } from "@/features/category/category.repository";
import { updateVocabulary } from "@/features/term/term.action";
import { findTerm } from "@/features/term/term.repository";
import {
  EDIT_REDIRECT_KEY,
  VOCABULARY_CATEGORYID_KEY,
  VOCABULARY_DEFINITION_KEY,
  VOCABULARY_REDIRECTURL_KEY,
  VOCABULARY_TERMID_KEY,
} from "@/global-keys";

export default async function VocabularyEdit({
  params: { id },
  searchParams: { [EDIT_REDIRECT_KEY]: redirectUrl },
}: {
  params: { id: string };
  searchParams: { [EDIT_REDIRECT_KEY]?: string };
}) {
  const term = await findTerm(id);
  const categories = await findCategories();
  return (
    <main>
      <h1>
        <Strong className="text-3xl">Edit {term?.name}</Strong>
      </h1>
      <form action={updateVocabulary} className="flex flex-col gap-20">
        <input
          name={VOCABULARY_REDIRECTURL_KEY}
          type="hidden"
          value={redirectUrl}
        />
        <input name={VOCABULARY_TERMID_KEY} type="hidden" value={term?.id} />
        <Fieldset>
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
          <Field>
            <Label>Definition</Label>
            <Textarea
              name={VOCABULARY_DEFINITION_KEY}
              placeholder={`Type the definition of ${term?.name}`}
              defaultValue={term?.definition}
              required
            />
          </Field>
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
