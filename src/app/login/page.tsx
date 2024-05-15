"use client";

import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

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
import { createSessionAction } from "@/features/session/session.action";

export default function Login() {
  const [password, setPassword] = useState("");

  const router = useRouter();

  return (
    <Dialog open={true} onClose={() => redirect("/")}>
      <DialogTitle>Show me what you got</DialogTitle>
      <DialogDescription>
        You have to enter the password to access the content.
      </DialogDescription>
      <DialogBody>
        <Field>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
      </DialogBody>
      <DialogActions>
        <Button plain onClick={() => redirect("/")}>
          Cancel
        </Button>
        <Button
          onClick={async () => {
            const sid = await createSessionAction(password);
            if (sid) {
              router.back();
            } else {
              setPassword("");
            }
          }}
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
