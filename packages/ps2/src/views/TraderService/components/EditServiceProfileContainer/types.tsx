import {
  EditServicePayload,
  TraderServiceAccessLevel,
} from 'apis/service/types';
import { Element as SlateElement } from 'slate';

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
  description: SlateElement[];
  commission: number;
};

export type SlateElementTypeFieldTypes =
  | 'block-quote'
  | 'bulleted-list'
  | 'heading'
  | 'heading-two'
  | 'list-item'
  | 'numbered-list'
  | 'image'
  | 'left'
  | 'center'
  | 'right'
  | 'justify';
