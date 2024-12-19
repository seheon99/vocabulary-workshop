"use client";

import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import useSWR from "swr";
import { create } from "zustand";

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
import {
  EditVocabularyDialog,
  NewVocabularyButton,
} from "@/components/features/vocabularies";
import { DeleteVocabularyDialog } from "@/components/features/vocabularies/delete-vocabulary-dialog";

import type { Vocabulary } from "@prisma/client";

type Store = {
  vocabulary: Vocabulary | null;
  mode: "edit" | "delete" | null;

  setEditMode: (vocabulary: Vocabulary) => void;
  setDeleteMode: (vocabulary: Vocabulary) => void;
  clearMode: () => void;
};

const useStore = create<Store>()((set) => ({
  vocabulary: null,
  mode: null,

  setEditMode: (vocabulary) => set(() => ({ vocabulary, mode: "edit" })),
  setDeleteMode: (vocabulary) => set(() => ({ vocabulary, mode: "delete" })),
  clearMode: () => set(() => ({ vocabulary: null, mode: null })),
}));

export default function VocabulariesPage() {
  const { data: categories } = useSWR("CATEGORIES", findCategories);
  const { data: vocabularies } = useSWR("VOCABULARIES", findVocabularies);

  const { vocabulary, mode, setEditMode, setDeleteMode, clearMode } =
    useStore();

  return (
    <main className="flex flex-col gap-4">
      <NewVocabularyButton />
      <EditVocabularyDialog
        vocabulary={vocabulary}
        open={mode === "edit"}
        onClose={() => clearMode()}
      />
      <DeleteVocabularyDialog
        vocabulary={vocabulary}
        open={mode === "delete"}
        onClose={() => clearMode()}
      />
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
                <div className="-my-1.5 px-[-3] sm:px-[-2.5]">
                  <Dropdown>
                    <DropdownButton plain aria-label="More options">
                      <EllipsisHorizontalIcon />
                    </DropdownButton>
                    <DropdownMenu anchor="bottom end">
                      <DropdownItem
                        className="w-full"
                        onClick={() => setEditMode(v)}
                      >
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        className="w-full"
                        onClick={() => setDeleteMode(v)}
                      >
                        Delete
                      </DropdownItem>
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
