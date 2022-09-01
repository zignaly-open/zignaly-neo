// Dependencies
import React, { ReactElement } from "react";
import Button from "..";
import { buttonSizes, buttonVariants, buttonColors } from "../types";
import { Layout, StoryList } from "./styles";

// Types

interface ButtonProps {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  caption?: string | null | JSX.Element;
  leftElement?: ReactElement | string | null;
  rightElement?: ReactElement | string | null;
  loading?: boolean;
  disabled?: boolean;
  color?: keyof typeof buttonColors;
  testIdLeftElement?: string | null;
  testIdCaptionElement?: string | null;
  testIdRightElement?: string | null;
  testIdLoadingElement?: string | null;
}

type ButtonVariationsTypes = {
  buttonsRow1: ButtonProps[];
  buttonsRow2?: ButtonProps[];
  buttonsRow3?: ButtonProps[];
  buttonsRow4?: ButtonProps[];
  buttonsRow5?: ButtonProps[];
};

export function ButtonVariations({
  buttonsRow1,
  buttonsRow2,
  buttonsRow3,
  buttonsRow4,
  buttonsRow5,
}: ButtonVariationsTypes) {
  return (
    <Layout>
      <StoryList>
        {buttonsRow1.map((button, index: number) => (
          <Button
            key={`--${index.toString()}`}
            variant={button.variant}
            size={button.size}
            caption={button.caption}
            loading={button.loading}
            leftElement={button.leftElement}
            rightElement={button.rightElement}
            disabled={button.disabled}
            onClick={() => {}}
            color={button.color}
            testIdLeftElement={button.testIdLeftElement}
            testIdCaptionElement={button.testIdCaptionElement}
            testIdRightElement={button.testIdRightElement}
            testIdLoadingElement={button.testIdLoadingElement}
          />
        ))}
      </StoryList>
      {buttonsRow2 && (
        <StoryList>
          {buttonsRow2.map((button, index: number) => (
            <Button
              key={`--${index.toString()}`}
              variant={button.variant}
              size={button.size}
              caption={button.caption}
              loading={button.loading}
              leftElement={button.leftElement}
              rightElement={button.rightElement}
              disabled={button.disabled}
              onClick={() => {}}
              color={button.color}
              testIdLeftElement={button.testIdLeftElement}
              testIdCaptionElement={button.testIdCaptionElement}
              testIdRightElement={button.testIdRightElement}
              testIdLoadingElement={button.testIdLoadingElement}
            />
          ))}
        </StoryList>
      )}
      {buttonsRow3 && (
        <StoryList>
          {buttonsRow3.map((button, index: number) => (
            <Button
              key={`--${index.toString()}`}
              variant={button.variant}
              size={button.size}
              caption={button.caption}
              loading={button.loading}
              leftElement={button.leftElement}
              rightElement={button.rightElement}
              disabled={button.disabled}
              onClick={() => {}}
              color={button.color}
              testIdLeftElement={button.testIdLeftElement}
              testIdCaptionElement={button.testIdCaptionElement}
              testIdRightElement={button.testIdRightElement}
              testIdLoadingElement={button.testIdLoadingElement}
            />
          ))}
        </StoryList>
      )}
      {buttonsRow4 && (
        <StoryList>
          {buttonsRow4.map((button, index: number) => (
            <Button
              key={`--${index.toString()}`}
              variant={button.variant}
              size={button.size}
              caption={button.caption}
              loading={button.loading}
              leftElement={button.leftElement}
              rightElement={button.rightElement}
              disabled={button.disabled}
              onClick={() => {}}
              color={button.color}
              testIdLeftElement={button.testIdLeftElement}
              testIdCaptionElement={button.testIdCaptionElement}
              testIdRightElement={button.testIdRightElement}
              testIdLoadingElement={button.testIdLoadingElement}
            />
          ))}
        </StoryList>
      )}
      {buttonsRow5 && (
        <StoryList>
          {buttonsRow5.map((button, index: number) => (
            <Button
              key={`--${index.toString()}`}
              variant={button.variant}
              size={button.size}
              caption={button.caption}
              loading={button.loading}
              leftElement={button.leftElement}
              rightElement={button.rightElement}
              disabled={button.disabled}
              onClick={() => {}}
              color={button.color}
              testIdLeftElement={button.testIdLeftElement}
              testIdCaptionElement={button.testIdCaptionElement}
              testIdRightElement={button.testIdRightElement}
              testIdLoadingElement={button.testIdLoadingElement}
            />
          ))}
        </StoryList>
      )}
    </Layout>
  );
}
