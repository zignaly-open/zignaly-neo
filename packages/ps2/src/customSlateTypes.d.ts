import { BaseEditor, BaseRange, Range, Element } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type CustomDescendant = CustomText;

export type BlockQuoteElement = {
  type: 'block_quote';
  align?: string;
  children: CustomDescendant[];
};

export type BulletedListElement = {
  type: 'ul_list';
  align?: string;
  children: CustomDescendant[];
};

export type HeadingElement = {
  type: 'heading_one';
  align?: string;
  children: CustomDescendant[];
};

export type HeadingTwoElement = {
  type: 'heading_two';
  align?: string;
  children: CustomDescendant[];
};

export type HeadingThreeElement = {
  type: 'heading_three';
  align?: string;
  children: CustomDescendant[];
};

export type HeadingFourElement = {
  type: 'heading_four';
  align?: string;
  children: CustomDescendant[];
};

export type HeadingFiveElement = {
  type: 'heading_five';
  align?: string;
  children: CustomDescendant[];
};

export type HeadingSixElement = {
  type: 'heading_six';
  align?: string;
  children: CustomDescendant[];
};

export type LeftAlignElement = {
  type: 'left';
  align?: string;
  children: CustomDescendant[];
};

export type RightAlignElement = {
  type: 'right';
  align?: string;
  children: CustomDescendant[];
};

export type JustifyAlignElement = {
  type: 'justify';
  align?: string;
  children: CustomDescendant[];
};
export type CenterAlignElement = {
  type: 'center';
  align?: string;
  children: CustomDescendant[];
};

export type ImageElement = {
  type: 'image';
  link: string;
  align?: string;
  children: EmptyText[];
};

export type ListItemElement = {
  type: 'list_item';
  align?: string;
  children: CustomDescendant[];
};

export type NumberedListItemElement = {
  type: 'ol_list';
  align?: string;
  children: CustomDescendant[];
};

export type ParagraphElement = {
  type: 'paragraph';
  align?: string;
  children: CustomDescendant[];
};

export type LinkElement = {
  type: 'link';
  link: string;
  align?: string;
  children: CustomDescendant[];
};

type CustomElement =
  | BlockQuoteElement
  | BulletedListElement
  | HeadingElement
  | HeadingTwoElement
  | HeadingThreeElement
  | HeadingFourElement
  | HeadingFiveElement
  | HeadingSixElement
  | ImageElement
  | ListItemElement
  | ParagraphElement
  | LeftAlignElement
  | RightAlignElement
  | CenterAlignElement
  | JustifyAlignElement
  | NumberedListItemElement
  | LinkElement;

export type CustomText = {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  text: string;
};

export type EmptyText = {
  text: string;
};

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    nodeToDecorations?: Map<Element, Range[]>;
  };

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
    Range: BaseRange & {
      [key: string]: unknown;
    };
    Descendant: CustomDescendant;
  }
}
