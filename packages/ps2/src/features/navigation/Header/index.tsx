import {
  Header as ZigHeader,
  HeaderLinksContainer,
  BrandImage,
} from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationLink } from './atoms';
import {
  ROUTE_DASHBOARD,
  ROUTE_PROFIT_SHARING,
  ROUTE_STAKING,
  ROUTE_ZIGPAD,
} from '../../../routes';
import { Link } from 'react-router-dom';
import ExtraNavigationDropdown from '../ExtraNavigationDropdown';
import AccountMenu from '../AccountMenu';

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <ZigHeader
      leftElements={[
        <Link to={ROUTE_DASHBOARD} key='logo'>
          <BrandImage height='32px' type='isotype' width='32px' />
        </Link>,
        <HeaderLinksContainer key='links'>
          <NavigationLink
            id='menu__profit-sharing'
            to={ROUTE_PROFIT_SHARING}
            key='--route-ps'
          >
            {t('navigation-menu.profit-sharing')}
          </NavigationLink>
          <NavigationLink
            id='menu__staking'
            to={ROUTE_STAKING}
            key='--route-staking'
          >
            {t('navigation-menu.staking')}
          </NavigationLink>
          <NavigationLink
            id='menu__staking'
            to={ROUTE_ZIGPAD}
            key='--route-zigpad'
          >
            {t('navigation-menu.zigpad')}
          </NavigationLink>
        </HeaderLinksContainer>,
        <ExtraNavigationDropdown key={'extra-nav'} />,
      ]}
      rightElements={[<AccountMenu key={'account'} />]}
    />
  );
};

export default Header;
export { HeaderLinksContainer };
