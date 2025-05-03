"use client";

import { forwardRef, useEffect } from "react";

import { ViewContext, useUIStateStore } from "@/stores";

import { Button } from "./button";

type KeyboardButtonProps = Parameters<typeof Button>[0] & {
  keyName: KeyboardEvent["key"];
  context?: ViewContext;
  disabled?: boolean;
  handler?: (event?: KeyboardEvent) => void;
};

export const KeyboardButton = forwardRef(function KeyboardButton(
  { keyName, context, handler, ...props }: KeyboardButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { viewContext } = useUIStateStore();

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (!props.disabled && context === viewContext && e.key === keyName) {
        handler?.(e);
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [context, handler, keyName, props.disabled, viewContext]);

  return <Button ref={ref} {...props} />;
});
