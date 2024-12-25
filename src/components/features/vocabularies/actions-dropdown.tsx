"use client";

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/components/base";

import type { Vocabulary } from "@prisma/client";

import { DeleteVocabularyDialog, EditVocabularyDialog } from ".";

export function ActionsDropdown({ vocabulary }: { vocabulary: Vocabulary }) {
  const [mode, setMode] = useState<"EDIT" | "DELETE" | null>(null);
  return (
    <>
      <EditVocabularyDialog
        open={mode === "EDIT"}
        onClose={() => setMode(null)}
        vocabulary={vocabulary}
      />
      <DeleteVocabularyDialog
        open={mode === "DELETE"}
        onClose={() => setMode(null)}
        vocabulary={vocabulary}
      />
      <Dropdown>
        <DropdownButton plain className="-my-1.5 px-[-3] sm:px-[-2.5]">
          <EllipsisHorizontalIcon />
        </DropdownButton>
        <DropdownMenu anchor="bottom end">
          <DropdownItem className="w-full" onClick={() => setMode("EDIT")}>
            Edit
          </DropdownItem>
          <DropdownItem className="w-full" onClick={() => setMode("DELETE")}>
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
