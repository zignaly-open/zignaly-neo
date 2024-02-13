import {
  EditServicePayload,
  TraderServiceAccessLevel,
} from 'apis/service/types';
import { BaseElement } from 'slate';
import { RenderElementProps, RenderLeafProps } from 'slate-react';

export const VISIBILITY_LABEL = {
  [TraderServiceAccessLevel.Solo]: {
    key: 'unlisted',
    color: '#706F82',
  },
  [TraderServiceAccessLevel.Private]: {
    key: 'private',
    color: '#f7cf00',
  },
  [TraderServiceAccessLevel.Public]: {
    key: 'public',
    color: '#e18728',
  },
  [TraderServiceAccessLevel.Marketplace]: {
    key: 'marketplace',
    color: '#26c496',
  },
};

export type EditServiceForm = EditServicePayload & {
  description: RichEditorElement[];
  commission: number;
};

export type RichEditorElement = BaseElement & { type?: string; align?: string };

export type RenderElementType = RenderElementProps & {
  element: RichEditorElement;
};
export type RenderLeafType = RenderLeafProps & {
  leaf: { bold: boolean; code: boolean; italic: boolean; underline: boolean };
};
