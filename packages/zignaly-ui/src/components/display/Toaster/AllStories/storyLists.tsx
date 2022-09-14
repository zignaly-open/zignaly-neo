import React from "react";
import Toaster from "..";
import { Layout, StoryList } from "./styles";

export interface ToasterProps {
  variant?: "success" | "error";
  size?: "large" | "small";
  caption?: string;
}

type ToasterVariationsTypes = {
  toastersRow1: ToasterProps[];
  toastersRow2?: ToasterProps[];
  toastersRow3?: ToasterProps[];
  toastersRow4?: ToasterProps[];
  toastersRow5?: ToasterProps[];
};

export function ToasterVariations({
  toastersRow1,
  toastersRow2,
  toastersRow3,
  toastersRow4,
  toastersRow5,
}: ToasterVariationsTypes) {
  return (
    <Layout>
      <StoryList>
        {toastersRow1.map((toaster, index: number) => (
          <Toaster
            key={`--${index.toString()}`}
            variant={toaster.variant}
            size={toaster.size}
            caption={toaster.caption}
          ></Toaster>
        ))}
      </StoryList>
      {toastersRow2 && (
        <StoryList>
          {toastersRow2.map((toaster, index: number) => (
            <Toaster
              key={`--${index.toString()}`}
              variant={toaster.variant}
              size={toaster.size}
              caption={toaster.caption}
            ></Toaster>
          ))}
        </StoryList>
      )}
      {toastersRow3 && (
        <StoryList>
          {toastersRow3.map((toaster, index: number) => (
            <Toaster
              key={`--${index.toString()}`}
              variant={toaster.variant}
              size={toaster.size}
              caption={toaster.caption}
            ></Toaster>
          ))}
        </StoryList>
      )}
      {toastersRow4 && (
        <StoryList>
          {toastersRow4.map((toaster, index: number) => (
            <Toaster
              key={`--${index.toString()}`}
              variant={toaster.variant}
              size={toaster.size}
              caption={toaster.caption}
            ></Toaster>
          ))}
        </StoryList>
      )}
      {toastersRow5 && (
        <StoryList>
          {toastersRow5.map((toaster, index: number) => (
            <Toaster
              key={`--${index.toString()}`}
              variant={toaster.variant}
              size={toaster.size}
              caption={toaster.caption}
            ></Toaster>
          ))}
        </StoryList>
      )}
    </Layout>
  );
}
