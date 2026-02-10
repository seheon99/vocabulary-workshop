"use client";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";

import { Button, DropdownItem } from "@/components/base";
import { useUIStateStore } from "@/stores";

import type { Vocabulary } from "@prisma/client";

import { EditVocabularyDialog } from "./edit-vocabulary-dialog";

export function EditVocabularyButton({
  dropdownItem = false,
  vocabulary,
}: {
  dropdownItem?: boolean;
  vocabulary: Vocabulary;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { setViewContext } = useUIStateStore();

  const openDialog = useCallback(() => {
    setViewContext("dialog");
    setIsOpen(true);
  }, [setViewContext]);
  const closeDialog = useCallback(() => {
    setViewContext("screen");
    setIsOpen(false);
  }, [setViewContext]);

  return (
    <>
      {dropdownItem ? (
        <DropdownItem className="w-full" onClick={openDialog}>
          Edit
        </DropdownItem>
      ) : (
        <Button plain onClick={openDialog}>
          <PencilSquareIcon />
        </Button>
      )}
      <EditVocabularyDialog
        open={isOpen}
        onClose={closeDialog}
        vocabulary={vocabulary}
      />
    </>
  );
}
