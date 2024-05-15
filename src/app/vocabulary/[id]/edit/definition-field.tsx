"use client";

import { Keyword, Term } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";

import { Field, Input, Label, Textarea } from "@/components";
import { Definition } from "@/features/term/definition";
import {
  VOCABULARY_DEFINITION_KEY,
  VOCABULARY_KEYWORDS_KEY,
} from "@/global-keys";

export function DefinitionField({
  term,
  defaultKeywords,
}: {
  term: Term;
  defaultKeywords: Keyword[];
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [definition, setDefinition] = useState(term.definition);
  const [keywords, setKeywords] = useState<string[]>(
    defaultKeywords.map((k) => k.text)
  );

  useEffect(() => {
    const textarea = textareaRef.current;

    const commandHandler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "b" || e.key === "B")) {
        const selectionStart = textareaRef.current?.selectionStart ?? 0;
        const selectionEnd = textareaRef.current?.selectionEnd ?? 0;
        const text = textareaRef.current?.value ?? "";
        const keyword = text.slice(selectionStart, selectionEnd).trim();

        if (keyword.length === 0) {
          return;
        }

        if (keywords.includes(keyword)) {
          setKeywords((prevKeywords) =>
            prevKeywords.filter((k) => k !== keyword)
          );
        } else {
          setKeywords((prevKeywords) => [...prevKeywords, keyword]);
        }
      }
    };

    textarea?.addEventListener("keydown", commandHandler);
    return () => {
      textarea?.removeEventListener("keydown", commandHandler);
    };
  }, [keywords]);

  return (
    <Field>
      <Label>Definition</Label>
      <Definition
        value={definition}
        keywords={keywords}
        onClickKeyword={(clickedKeyword) =>
          setKeywords(keywords.filter((keyword) => clickedKeyword !== keyword))
        }
      />
      <Textarea
        ref={textareaRef}
        name={VOCABULARY_DEFINITION_KEY}
        required
        placeholder={`Type the definition of ${term?.name}`}
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
      />
      {keywords.map((keyword) => (
        <input
          key={keyword}
          name={VOCABULARY_KEYWORDS_KEY}
          type="hidden"
          value={keyword}
        />
      ))}
    </Field>
  );
}
