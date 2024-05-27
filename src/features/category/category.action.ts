"use server";

import { notFound } from "next/navigation";

import { CATEGORY_NAME_KEY } from "@/global-keys";

import { createCategory, findCategory } from "./category.repository";

export async function createCategoryAction(formData: FormData) {
  const categoryName = formData.get(CATEGORY_NAME_KEY);
  if (!categoryName || typeof categoryName !== "string") {
    notFound();
  }

  const category = await findCategory({ name: categoryName });
  if (category) {
    notFound();
  }

  await createCategory({ name: categoryName });
}
