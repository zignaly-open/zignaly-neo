import React from 'react';
import { MenuDropDown, ZigTypography } from '@zignaly-open/ui';
import { HeadOption, MenuLink } from './styles';
import { useLocation } from 'react-router-dom';

export const ServiceListOption: React.FC<{
  path: string;
  label: string;
  id: string;
  isSubOption?: boolean;
}> = ({ path, label, id, isSubOption }) => {
  const location = useLocation();
  return (
    <MenuLink to={path} id={id} isSubOption={isSubOption}>
      <HeadOption isSubOption={isSubOption} active={location.pathname === path}>
        <ZigTypography color='inherit' fontWeight='inherit' variant={'h3'}>
          {label}
        </ZigTypography>
      </HeadOption>
    </MenuLink>
  );
};

export const RouteGroup: React.FC<{
  routes: { path: string; name: string; id: string }[];
  isSubGroup?: boolean;
}> = ({ routes, isSubGroup }) => {
  return (
    <>
      {routes.map((r) => (
        <ServiceListOption
          id={r.id}
          path={r.path}
          key={r.path}
          label={r.name}
          isSubOption={isSubGroup}
        />
      ))}
    </>
  );
};

export const RouteDropdown: React.FC<{
  id?: string;
  title: string;
  routes: { path: string; name: string; id: string }[];
}> = ({ id, routes, title }) => {
  const activePath = useLocation()?.pathname;
  return (
    <>
      <MenuDropDown
        id={id}
        title={title}
        dropDownOptions={{
          maxHeight: '300px',
        }}
        focused={routes.some((x) => activePath === x.path)}
      >
        <RouteGroup routes={routes} isSubGroup={true} />
      </MenuDropDown>
    </>
  );
};
