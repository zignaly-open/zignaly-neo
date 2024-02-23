export type SubHeaderRoute = {
  name: string;
  onClick: () => void;
  id: string;
  sideElement?: JSX.Element;
  active?: boolean;
};

export type SubHeaderElement = {
  element: JSX.Element;
  id: string;
};

export type SubHeaderDropdown = {
  id: string;
  name: string;
  secondaryTitle?: string;
  routes: SubHeaderRoute[];
  isCompactElements?: boolean;
};
