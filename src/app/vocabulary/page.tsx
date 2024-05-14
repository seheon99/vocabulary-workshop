import { notFound, redirect } from "next/navigation";

import { getRandomTerm } from "@/features/term/term.repository";

export default async function Terms() {
  const terms = await getRandomTerm();

  if (!terms) {
    notFound();
  }

  redirect(`/vocabulary/${terms.id}`);
}
