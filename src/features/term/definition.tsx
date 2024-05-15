import React, { MouseEventHandler } from "react";

import { Badge, BadgeButton, Text } from "@/components";

type DefinitionProps = {
  value: string;
  keywords: string[];
  onClickKeyword?: (keyword: string) => void;
  highlightColor?: Parameters<typeof Badge>[0]["color"];
};

export function Definition({
  value,
  keywords,
  onClickKeyword,
  highlightColor,
  children,
  ...props
}: DefinitionProps & React.ComponentPropsWithoutRef<"p">) {
  if (keywords.length === 0) {
    return <Text {...props}>{value}</Text>;
  }

  const regexp = new RegExp(`(${keywords.join("|")})`, "gi");
  const parts = value.split(regexp);

  return (
    <Text {...props}>
      {parts.map((part, index) =>
        regexp.test(part) ? (
          onClickKeyword ? (
            <BadgeButton
              key={index}
              color={highlightColor}
              onClick={() => onClickKeyword(part)}
            >
              {part}
            </BadgeButton>
          ) : (
            <Badge key={index} color={highlightColor}>
              {part}
            </Badge>
          )
        ) : (
          part
        )
      )}
    </Text>
  );
}
