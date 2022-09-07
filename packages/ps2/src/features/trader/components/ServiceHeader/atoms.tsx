import React from 'react';
import { MenuDropDown, Typography } from '@zignaly-open/ui';
import { HeadOption } from './styles';
import { Link, useLocation } from 'react-router-dom';

export const ServiceListOption: React.FC<{ path: string; label: string }> = ({
  path,
  label,
}) => {
  const location = useLocation();
  return (
    <Link to={path}>
      <HeadOption active={location.pathname === path}>
        <Typography variant={'h3'}>{label}</Typography>
      </HeadOption>
    </Link>
  );
};

export const RouteGroup: React.FC<{
  routes: { path: string; name: string }[];
}> = ({ routes }) => {
  return (
    <>
      {routes.map((r) => (
        <ServiceListOption path={r.path} key={r.path} label={r.name} />
      ))}
    </>
  );
};

export const RouteDropdown: React.FC<{
  title: string;
  routes: { path: string; name: string }[];
}> = ({ routes, title }) => {
  const activePath = useLocation()?.pathname;
  return (
    <>
      <MenuDropDown
        title={title}
        dropDownOptions={{
          maxHeight: '300px',
        }}
        focused={routes.some((x) => activePath.includes(x.path))}
      >
        <RouteGroup routes={routes} />
      </MenuDropDown>
    </>
  );
};
