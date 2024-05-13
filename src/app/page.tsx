import { Text, Strong } from "@/components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10">
      <Strong className="text-6xl">Vocabulary Workshop</Strong>
      <Text>
        <Strong>Click</Strong> anywhere to start or <Strong>Scroll</Strong> to
        see the vocabularies
      </Text>
    </main>
  );
}
