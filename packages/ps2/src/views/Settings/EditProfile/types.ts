export type EditProfileFormType = {
  username: string;
  imageUrl: string;
  country: string;
  bio: {
    type?: string;
    align?: string;
    url?: string;
    children?: any;
  }[];
};
