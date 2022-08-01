export type NavItemProp = {
  label: string;
  path: string;
  isActive?: boolean;
};

export type NavigationProps = {
  routes: NavItemProp[];
};
