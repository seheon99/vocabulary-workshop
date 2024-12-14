"use client";

import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import useSWR from "swr";

import { findCategories, findVocabularies } from "@/actions";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base";
import { EditVocabularyDialog, NewVocabularyButton } from "@/components/features/vocabularies";

import type { Vocabulary } from "@prisma/client";

export default function VocabulariesPage() {
  const { data: categories } = useSWR("CATEGORIES", findCategories);
  const { data: vocabularies } = useSWR("VOCABULARIES", findVocabularies);

  const [vocabulary, setVocabulary] = useState<Vocabulary | null>(null);

  return (
    <main className="flex flex-col gap-4">
      <NewVocabularyButton />
      {vocabulary && <EditVocabularyDialog vocabulary={vocabulary} open={!!vocabulary} onClose={() => setVocabulary(null)} />}
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Category</TableHeader>
            <TableHeader>Term</TableHeader>
            <TableHeader>Definition</TableHeader>
            <TableHeader className="relative w-0">
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
              <TableCell className="font-medium">{v.term}</TableCell>
              <TableCell>{v.definition}</TableCell>
              <TableCell>
                <div className="-my-1.5 px-[-3] sm:px-[-2.5]">
                  <Dropdown>
                    <DropdownButton plain aria-label="More options">
                      <EllipsisHorizontalIcon />
                    </DropdownButton>
                    <DropdownMenu anchor="bottom end">
                      <DropdownItem className="w-full" onClick={() => setVocabulary(v)}>Edit</DropdownItem>
                      <DropdownItem className="w-full">Delete</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
