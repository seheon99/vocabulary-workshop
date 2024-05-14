import { clsx } from "clsx";

import { Link } from "./link";

const colors = {
  zinc: "text-zinc-950 dark:text-white",

  red: "text-red-700 dark:text-red-400",
  orange: "text-orange-700 dark:text-orange-400",
  amber: "text-amber-700 dark:text-amber-400",
  yellow: "text-yellow-700 dark:text-yellow-300",
  lime: "text-lime-700 dark:text-lime-300",
  green: "text-green-700 dark:text-green-400",
  emerald: "text-emerald-700 dark:text-emerald-400",
  teal: "text-teal-700 dark:text-teal-300",
  cyan: "text-cyan-700 dark:text-cyan-300",
  sky: "text-sky-700 dark:text-sky-300",
  blue: "text-blue-700 dark:text-blue-400",
  indigo: "text-indigo-700 dark:text-indigo-400",
  violet: "text-violet-700 dark:text-violet-400",
  purple: "text-purple-700 dark:text-purple-400",
  fuchsia: "text-fuchsia-700 dark:text-fuchsia-400",
  pink: "text-pink-700 dark:text-pink-400",
  rose: "text-rose-700 dark:text-rose-400",
};

export function Text({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      {...props}
      data-slot="text"
      className={clsx(
        className,
        "text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400"
      )}
    />
  );
}

export function TextLink({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={clsx(
        className,
        "text-zinc-950 underline decoration-zinc-950/50 data-[hover]:decoration-zinc-950 dark:text-white dark:decoration-white/50 dark:data-[hover]:decoration-white"
      )}
    />
  );
}

export function Strong({
  color = "zinc",
  className,
  ...props
}: React.ComponentPropsWithoutRef<"strong"> & { color?: keyof typeof colors }) {
  return (
    <strong
      {...props}
      className={clsx(className, colors[color], "font-medium")}
    />
  );
}

export function Code({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"code">) {
  return (
    <code
      {...props}
      className={clsx(
        className,
        "rounded border border-zinc-950/10 bg-zinc-950/[2.5%] px-0.5 text-sm font-medium text-zinc-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white"
      )}
    />
  );
}
