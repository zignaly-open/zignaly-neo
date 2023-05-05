import React from 'react';
import { MenuDropDown, ZigTypography } from '@zignaly-open/ui';
import { HeadOption } from './styles';
import { Link, useLocation } from 'react-router-dom';

export const ServiceListOption: React.FC<{
  path: string;
  label: string;
  id: string;
}> = ({ path, label, id }) => {
  const location = useLocation();
  return (
    <Link to={path} id={id}>
      <HeadOption active={location.pathname === path}>
        <ZigTypography variant={'h3'}>{label}</ZigTypography>
      </HeadOption>
    </Link>
  );
};

export const RouteGroup: React.FC<{
  routes: { path: string; name: string; id: string }[];
}> = ({ routes }) => {
  return (
    <>
      {routes.map((r) => (
        <ServiceListOption
          id={r.id}
          path={r.path}
          key={r.path}
          label={r.name}
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
        <RouteGroup routes={routes} />
      </MenuDropDown>
    </>
  );
};
