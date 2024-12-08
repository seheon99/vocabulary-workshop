'use client'

import useSWR from "swr";

import { findCategories, findVocabularies } from "@/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base";
import { NewVocabularyButton } from "@/components/features/vocabularies";

export default function VocabulariesPage() {
  const { data: categories } = useSWR('CATEGORIES', findCategories);
  const { data: vocabularies } = useSWR('VOCABULARIES', findVocabularies);

  return (
    <main className="flex flex-col gap-4">
      <NewVocabularyButton />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Category</TableHeader>
            <TableHeader>Term</TableHeader>
            <TableHeader>Definition</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {vocabularies?.map((v) => (
            <TableRow key={v.id}>
              <TableCell className="text-zinc-500">
                {categories?.find((c) => c.id === v.categoryId)?.name}
              </TableCell>
              <TableCell className="font-medium">{v.term}</TableCell>
              <TableCell>{v.definition}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
