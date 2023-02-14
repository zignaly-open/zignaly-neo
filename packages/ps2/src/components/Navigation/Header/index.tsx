import {
  Header as ZigHeader,
  HeaderLinksContainer,
  BrandImage,
} from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationLink } from './atoms';
import {
  ROUTE_BECOME_TRADER,
  ROUTE_DASHBOARD,
  ROUTE_PROFIT_SHARING,
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
          <BrandImage
            id='menu__logo-portfolio'
            height='32px'
            type='isotype'
            width='32px'
          />
        </Link>,
        <HeaderLinksContainer key='links'>
          <NavigationLink
            id='menu__marketplace'
            to={ROUTE_PROFIT_SHARING}
            key='--route-ps'
          >
            {t('navigation-menu.profit-sharing')}
          </NavigationLink>
          <NavigationLink
            id='menu__become-trader'
            to={ROUTE_BECOME_TRADER}
            key='--route-bt'
          >
            {t('navigation-menu.become-trader')}
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
