import { RichEditorElement } from '../../TraderService/components/EditServiceProfileContainer/types';

export type EditProfileFormType = {
  username: string;
  imageUrl: string;
  country: string;
  bio: RichEditorElement[];
};
