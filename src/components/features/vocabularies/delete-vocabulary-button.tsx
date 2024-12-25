'use client';

import { TrashIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";

import { Button, DropdownItem } from "@/components/base";

import type { Vocabulary } from "@prisma/client";

import { DeleteVocabularyDialog } from ".";

export function DeleteVocabularyButton({
  dropdownItem = false,
  vocabulary,
}: {
  dropdownItem?: boolean;
  vocabulary: Vocabulary;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback(() => setIsOpen(true), []);
  const closeDialog = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {dropdownItem ? (
        <DropdownItem className="w-full" onClick={openDialog}>
          Delete
        </DropdownItem>
      ) : (
        <Button plain onClick={openDialog}>
          <TrashIcon />
        </Button>
      )}
      <DeleteVocabularyDialog
        open={isOpen}
        onClose={closeDialog}
        vocabulary={vocabulary}
      />
    </>
  );
}
