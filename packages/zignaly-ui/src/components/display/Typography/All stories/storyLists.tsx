// Dependencies
import React from "react";
import Typography from "..";

// Types
import { componentByVariants, weightByType } from "../types";
import { Layout, StoryList } from "./styles";

interface TextProps {
    variant?: keyof typeof componentByVariants,
    weight?: keyof typeof weightByType,
    underline?: boolean,
}

type TextVariationsTypes = {
  textsRow1: TextProps[];
  textsRow2?: TextProps[];
  textsRow3?: TextProps[];
  textsRow4?: TextProps[];
  textsRow5?: TextProps[];
};

export function TextVariations({
  textsRow1,
  textsRow2,
  textsRow3,
  textsRow4,
  textsRow5,
}: TextVariationsTypes) {
  return (
    <Layout>
      <StoryList>
        {textsRow1.map((text, index: number) => (
          <Typography key={`--${index.toString()}`} variant={text.variant} weight={text.weight} underline={text.underline}>
            Example Text
          </Typography>
        ))}
      </StoryList>
      {textsRow2 && (
        <StoryList>
          {textsRow2.map((text, index: number) => (
            <Typography key={`--${index.toString()}`} variant={text.variant} weight={text.weight} underline={text.underline}>
              Example Text
            </Typography>
          ))}
        </StoryList>
      )}
      {textsRow3 && (
        <StoryList>
          {textsRow3.map((text, index: number) => (
            <Typography key={`--${index.toString()}`} variant={text.variant} weight={text.weight} underline={text.underline}>
              Example Text
            </Typography>
          ))}
        </StoryList>
      )}
      {textsRow4 && (
        <StoryList>
          {textsRow4.map((text, index: number) => (
            <Typography key={`--${index.toString()}`} variant={text.variant} weight={text.weight} underline={text.underline}>
              Example Text
            </Typography>
          ))}
        </StoryList>
      )}
      {textsRow5 && (
        <StoryList>
          {textsRow5.map((text, index: number) => (
            <Typography key={`--${index.toString()}`} variant={text.variant} weight={text.weight} underline={text.underline}>
              Example Text
            </Typography>
          ))}
        </StoryList>
      )}
    </Layout>
  );
}
