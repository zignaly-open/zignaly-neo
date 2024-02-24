import { Element } from 'slate';

export type EditProfileFormType = {
  username: string;
  imageUrl: string;
  country: string;
  bio: Element[];
};
