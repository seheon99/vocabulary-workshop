"use client";

import { useRouter } from "next/navigation";
import { forwardRef, useEffect } from "react";

import { ViewContext, useUIStateStore } from "@/stores";

interface KeyboardLinkProps extends React.HTMLAttributes<HTMLSpanElement> {
  keyName: KeyboardEvent["key"];
  href: string;
  disabled?: boolean;
  context?: ViewContext;
}

export const KeyboardLink = forwardRef(function KeyboardLink(
  { keyName, href, disabled, context, ...props }: KeyboardLinkProps,
  ref: React.ForwardedRef<HTMLSpanElement>,
) {
  const { viewContext } = useUIStateStore();

  const router = useRouter();

  useEffect(() => {
    if (!disabled && (!context || context === viewContext)) {
      const listener = (e: KeyboardEvent) => {
        if (e.key === keyName) {
          router.push(href);
        }
      };
      console.debug(
        `Add Event Listener for ${keyName}, for UI context ${context} (current ${viewContext})`,
      );
      window.addEventListener("keydown", listener);
      return () => {
        console.debug(
          `Remove Event Listener for ${keyName}, for UI context ${context} (current ${viewContext})`,
        );
        window.removeEventListener("keydown", listener);
      };
    }
  }, [keyName, router, href, disabled, context, viewContext]);

  return <span ref={ref} {...props} />;
});
