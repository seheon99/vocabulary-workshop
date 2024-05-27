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
import { DefinitionField } from "@/features/term/definition-field";
import { createTermAction } from "@/features/term/term.action";
import {
  VOCABULARY_CATEGORYID_KEY,
  VOCABULARY_TERMNAME_KEY,
} from "@/global-keys";

import { CreateCategoryButton } from "./create-category-button";

export default async function VocabularyAdd() {
  const categories = await findCategories();
  return (
    <main>
      <h1>
        <Strong className="text-3xl">Add new term</Strong>
      </h1>
      <form action={createTermAction} className="mt-10 flex flex-col gap-8">
        <Fieldset className="flex flex-col gap-4">
          <div className="flex">
            <Field className="flex-1">
              <Label>Category</Label>
              <Select name={VOCABULARY_CATEGORYID_KEY} required>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </Field>
            <CreateCategoryButton className="ml-2 mt-9" plain>
              Create new category
            </CreateCategoryButton>
          </div>
          <Field>
            <Label>Term</Label>
            <Input name={VOCABULARY_TERMNAME_KEY} required />
          </Field>
          <DefinitionField />
        </Fieldset>
        <div className="flex justify-between">
          <Link href={"/"}>
            <Button plain>Cancel</Button>
          </Link>
          <Button type="submit">Done</Button>
        </div>
      </form>
    </main>
  );
}
