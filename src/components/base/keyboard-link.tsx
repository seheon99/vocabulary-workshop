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
    const listener = (e: KeyboardEvent) => {
      if (!disabled && context === viewContext && e.key === keyName) {
        router.push(href);
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [keyName, router, href, disabled, context, viewContext]);

  return <span ref={ref} {...props} />;
});
