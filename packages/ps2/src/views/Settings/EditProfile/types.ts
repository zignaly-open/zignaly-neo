import { Element as SlateElement } from 'slate';

export type EditProfileFormType = {
  username: string;
  imageUrl: string;
  country: string;
  bio: SlateElement[];
};
