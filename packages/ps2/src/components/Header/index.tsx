import {
  Header as ZigHeader,
  HeaderLinksContainer,
  IconButton,
  BrandImage,
  UserIcon,
} from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationLink } from './atoms';
import {
  ROUTE_DASHBOARD,
  ROUTE_PROFIT_SHARING,
  ROUTE_STAKING,
  ROUTE_ZIGPAD,
} from '../../routes';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <ZigHeader
      leftElements={[
        <Link to={ROUTE_DASHBOARD} key='logo'>
          <BrandImage height='32px' type='isotype' width='32px' />
        </Link>,
        <HeaderLinksContainer key='links'>
          <NavigationLink to={ROUTE_PROFIT_SHARING} key='--route-ps'>
            {t('navigation-menu.profit-sharing')}
          </NavigationLink>
          <NavigationLink to={ROUTE_STAKING} key='--route-staking'>
            {t('navigation-menu.staking')}
          </NavigationLink>
          <NavigationLink to={ROUTE_ZIGPAD} key='--route-zigpad'>
            {t('navigation-menu.zigpad')}
          </NavigationLink>
        </HeaderLinksContainer>,
      ]}
      rightElements={[
        <IconButton
          key='user'
          dropDownOptions={{ alignment: 'right', position: 'static' }}
          icon={<UserIcon color='#65647E' />}
          // eslint-disable-next-line i18next/no-literal-string
          renderDropDown={<div>DropDown Container</div>}
          variant='flat'
        />,
      ]}
    />
  );
};

export default Header;
export { HeaderLinksContainer };
