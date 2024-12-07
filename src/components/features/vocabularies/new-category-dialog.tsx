"use client";

import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import { createCategory } from "@/actions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
  ErrorMessage,
  Field,
  FieldGroup,
  Input,
  Label,
} from "@/components/base";
import { CATEGORIES_KEY, useCurrentUser } from "@/hooks";

export function NewCategoryDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { data: user } = useCurrentUser();

  const { control, handleSubmit } = useForm<FormInputs>();
  const { trigger: create, isMutating: isCreating } = useSWRMutation(
    "createCategory",
    (_, { arg }: { arg: Parameters<typeof createCategory>[0] }) =>
      createCategory(arg),
  );

  const onSubmit = useCallback(
    async (data: FormInputs) => {
      if (!user?.uid) {
        toast.error("Logging in before modifying data");
        return;
      }
      await create({ creatorId: user?.uid, ...data });
      mutate(CATEGORIES_KEY);
      onClose();
    },
    [create, onClose, user?.uid],
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Create new category</DialogTitle>
        <DialogDescription>
          Fill in the form below to create a new category
        </DialogDescription>
        <DialogBody>
          <FieldGroup>
            <Field>
              <Label>Name</Label>
              <Controller
                control={control}
                name="name"
                rules={{ required: "Name is required" }}
                render={({ field, fieldState: { invalid, error } }) => (
                  <>
                    <Input invalid={invalid} {...field} />
                    {error && <ErrorMessage>{error.message}</ErrorMessage>}
                  </>
                )}
              />
            </Field>
          </FieldGroup>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isCreating}>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

type FormInputs = {
  name: string;
};
