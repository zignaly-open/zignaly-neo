import { BaseEditor, BaseRange, Range, Element } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type CustomDescendant = CustomText;

export type BlockQuoteElement = {
  type: 'block-quote';
  align?: string;
  children: CustomDescendant[];
};

export type BulletedListElement = {
  type: 'bulleted-list';
  align?: string;
  children: CustomDescendant[];
};

export type HeadingElement = {
  type: 'heading';
  align?: string;
  children: CustomDescendant[];
};

export type HeadingTwoElement = {
  type: 'heading-two';
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
  url: string;
  align?: string;
  children: EmptyText[];
};

export type ListItemElement = {
  type: 'list-item';
  align?: string;
  children: CustomDescendant[];
};

export type NumberedListItemElement = {
  type: 'numbered-list';
  align?: string;
  children: CustomDescendant[];
};

export type ParagraphElement = {
  type: 'paragraph';
  align?: string;
  children: CustomDescendant[];
};

type CustomElement =
  | BlockQuoteElement
  | BulletedListElement
  | HeadingElement
  | HeadingTwoElement
  | ImageElement
  | ListItemElement
  | ParagraphElement
  | LeftAlignElement
  | RightAlignElement
  | CenterAlignElement
  | JustifyAlignElement
  | NumberedListItemElement;

export type CustomText = {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  underline?: boolean;
  link?: boolean;
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
