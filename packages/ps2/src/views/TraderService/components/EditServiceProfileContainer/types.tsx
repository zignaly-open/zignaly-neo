import {
  EditServicePayload,
  TraderServiceAccessLevel,
} from 'apis/service/types';

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
  commission: number;
};

export type SlateElementTypeFieldTypes =
  | 'block_quote'
  | 'ul_list'
  | 'heading_one'
  | 'heading_two'
  | 'heading_three'
  | 'heading_four'
  | 'heading_five'
  | 'heading_six'
  | 'list_item'
  | 'ol_list'
  | 'image'
  | 'left'
  | 'center'
  | 'right'
  | 'justify'
  | 'link';
