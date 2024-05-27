"use client";

import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
  Field,
  Input,
  Label,
} from "@/components";
import { createCategoryAction } from "@/features/category/category.action";
import { CATEGORY_NAME_KEY } from "@/global-keys";

export function CreateCategoryButton({
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button {...props} onClick={() => setIsOpen(true)} />
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <form
          action={async (formData) => {
            await createCategoryAction(formData);
            setIsOpen(false);
          }}
        >
          <DialogTitle>Create new category</DialogTitle>
          <DialogDescription>
            If you want to remove existing category, call your brother Heon.
          </DialogDescription>
          <DialogBody>
            <Field>
              <Label>Name</Label>
              <Input name={CATEGORY_NAME_KEY} required />
            </Field>
          </DialogBody>
          <DialogActions>
            <Button plain onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
