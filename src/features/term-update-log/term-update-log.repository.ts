import { TermUpdateLog } from "@prisma/client";

import { prisma } from "@/prisma";

export async function createTermUpdateLog({
  termId,
  fieldChanged,
  oldValue,
  newValue,
  sessionId,
}: Pick<
  TermUpdateLog,
  "termId" | "fieldChanged" | "oldValue" | "newValue" | "sessionId"
>): Promise<TermUpdateLog> {
  return prisma.termUpdateLog.create({
    data: {
      termId,
      fieldChanged,
      oldValue,
      newValue,
      sessionId,
    },
  });
}
