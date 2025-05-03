"use client";

import { useRouter } from "next/navigation";
import { forwardRef, useEffect } from "react";

interface KeyboardLinkProps extends React.HTMLAttributes<HTMLSpanElement> {
  keyName: KeyboardEvent["key"];
  href: string;
  disabled?: boolean;
}

export const KeyboardLink = forwardRef(function KeyboardLink(
  { keyName, href, disabled, ...props }: KeyboardLinkProps,
  ref: React.ForwardedRef<HTMLSpanElement>,
) {
  const router = useRouter();

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (!disabled && e.key === keyName) {
        router.push(href);
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [keyName, router, href, disabled]);

  return <span ref={ref} {...props} />;
});
