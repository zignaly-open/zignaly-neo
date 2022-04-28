// Dependencies
import React, { ReactElement } from "react";
import Button from "..";
import { buttonSizes, buttonVariants, buttonColors } from "../types";
import { Layout, StoryList } from "./styles";

// Types

interface ButtonProps {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  caption?: string | null;
  icon?: ReactElement<any> | String | null;
  leftElement?: ReactElement<any> | String | null;
  rightElement?: ReactElement<any> | String | null;
  disabled?: boolean;
  color?: keyof typeof buttonColors;
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
            icon={button.icon}
            leftElement={button.leftElement}
            rightElement={button.rightElement}
            disabled={button.disabled}
            onClick={() => {}}
            color={button.color}
          ></Button>
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
              icon={button.icon}
              leftElement={button.leftElement}
              rightElement={button.rightElement}
              disabled={button.disabled}
              onClick={() => {}}
              color={button.color}
            >
              Example button
            </Button>
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
              icon={button.icon}
              leftElement={button.leftElement}
              rightElement={button.rightElement}
              disabled={button.disabled}
              onClick={() => {}}
              color={button.color}
            >
              Example button
            </Button>
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
              icon={button.icon}
              leftElement={button.leftElement}
              rightElement={button.rightElement}
              disabled={button.disabled}
              onClick={() => {}}
              color={button.color}
            >
              Example button
            </Button>
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
              icon={button.icon}
              leftElement={button.leftElement}
              rightElement={button.rightElement}
              disabled={button.disabled}
              onClick={() => {}}
              color={button.color}
            >
              Example button
            </Button>
          ))}
        </StoryList>
      )}
    </Layout>
  );
}
