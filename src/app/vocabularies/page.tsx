import { findCategories, findVocabularies } from "@/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base";
import {
  ActionsDropdown,
  NewVocabularyButton,
} from "@/components/features/vocabularies";

export default async function Page() {
  const categories = await findCategories();
  const vocabularies = await findVocabularies();

  return (
    <main className="flex flex-col gap-4">
      <NewVocabularyButton />
      <Table striped fixed>
        <TableHead>
          <TableRow>
            <TableHeader className="w-40">Category</TableHeader>
            <TableHeader>Term</TableHeader>
            <TableHeader>Definition</TableHeader>
            <TableHeader className="w-14">
              <span className="sr-only">Actions</span>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {vocabularies?.map((v) => (
            <TableRow key={v.id}>
              <TableCell className="text-zinc-500">
                {categories?.find((c) => c.id === v.categoryId)?.name}
              </TableCell>
              <TableCell className="truncate font-medium hover:text-clip">
                {v.term}
              </TableCell>
              <TableCell className="truncate hover:text-clip">
                {v.definition}
              </TableCell>
              <TableCell>
                <ActionsDropdown vocabulary={v} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
