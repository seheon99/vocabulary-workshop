import {
  Text,
  Strong,
  Link,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components";
import { findAllCategories } from "@/features/category/category.repository";
import { findAllTerms } from "@/features/term/term.repository";

export default async function Home() {
  const categories = await findAllCategories();
  const terms = await findAllTerms();

  return (
    <main className="">
      <Link href="/term">
        <div className="flex min-h-screen flex-col items-center justify-center gap-10">
          <Strong className="text-6xl">Vocabulary Workshop</Strong>
          <Text>
            <Strong>Click</Strong> anywhere to start or <Strong>Scroll</Strong>{" "}
            to see the vocabularies
          </Text>
        </div>
      </Link>

      <div className="p-20">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Category</TableHeader>
              <TableHeader>Term</TableHeader>
              <TableHeader>Definition</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {terms.map(async (t) => (
              <TableRow key={t.id}>
                <TableCell>
                  {categories.find(({ id }) => id === t.categoryId)?.name}
                </TableCell>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.definition}</TableCell>
              </TableRow>
            ))}
            {terms.map(async (t) => (
              <TableRow key={t.id}>
                <TableCell>
                  {categories.find(({ id }) => id === t.categoryId)?.name}
                </TableCell>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.definition}</TableCell>
              </TableRow>
            ))}
            {terms.map(async (t) => (
              <TableRow key={t.id}>
                <TableCell>
                  {categories.find(({ id }) => id === t.categoryId)?.name}
                </TableCell>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.definition}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
