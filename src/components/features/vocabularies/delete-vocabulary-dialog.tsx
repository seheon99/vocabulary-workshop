"use client";

import { mutate } from "swr";

import { deleteVocabulary } from "@/actions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "@/components/base";

import type { Vocabulary } from "@prisma/client";

export function DeleteVocabularyDialog({
  vocabulary,
  open,
  onClose,
}: {
  vocabulary: Vocabulary | null;
  open: React.ComponentProps<typeof Dialog>["open"];
  onClose: React.ComponentProps<typeof Dialog>["onClose"];
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Word</DialogTitle>
      <DialogBody>
        You&apos;re going to delete the &quot;{vocabulary?.term}&quot; word. Are
        you sure?
      </DialogBody>
      <DialogActions>
        <Button plain onClick={() => onClose(false)}>
          No, keep it
        </Button>
        <Button
          color="red"
          onClick={() => {
            if (vocabulary) {
              deleteVocabulary({ id: vocabulary.id });
            }
            mutate("VOCABULARIES");
            onClose(false);
          }}
        >
          Yes, delete it forever
        </Button>
      </DialogActions>
    </Dialog>
  );
}
