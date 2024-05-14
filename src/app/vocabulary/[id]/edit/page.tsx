import { Button, Link } from "@/components";
import { EDIT_REDIRECT_KEY } from "@/global-keys";

export default function VocabularyEdit({
  params: { id },
  searchParams: { [EDIT_REDIRECT_KEY]: redirect },
}: {
  params: { id: string };
  searchParams: { [EDIT_REDIRECT_KEY]?: string };
}) {
  return (
    <div>
      {id}
      <Link href={redirect ?? ""}>
        <Button>Done</Button>
      </Link>
    </div>
  );
}
