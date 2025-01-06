"use client";

import { forwardRef, useEffect } from "react";

import { Button } from "./button";

type KeyboardButtonProps = Parameters<typeof Button>[0] & {
  keyName: KeyboardEvent["key"];
  disabled?: boolean;
  handler: (event?: KeyboardEvent) => void;
};

export const KeyboardButton = forwardRef(function KeyboardButton(
  { keyName, handler, ...props }: KeyboardButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (!props.disabled && e.key === keyName) {
        handler(e);
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [handler, keyName, props.disabled]);

  return <Button ref={ref} {...props} />;
});
