import React from 'react';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.highlighted};

  &.active {
    border-color: ${({ theme }) => theme.highlighted};
    border-bottom: 3px solid;
  }

  text-decoration: none;
  padding: 10px 0;
  margin: 0 4px;
`;

type NavItemProp = {
  label: string;
  path: string;
  isActive?: boolean;
};

type NavigationProps = {
  routes: NavItemProp[];
};

function Navigation({ routes }: NavigationProps) {
  return (
    <>
      {routes.map((route: NavItemProp) => (
        <StyledNavLink to={route.path} key={route.path}>
          {route.label}
        </StyledNavLink>
      ))}
    </>
  );
}

export default Navigation;
