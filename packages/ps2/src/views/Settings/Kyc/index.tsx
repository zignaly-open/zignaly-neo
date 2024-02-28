import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'util/title';
import {
  PageContainer,
  ZigTab,
  ZigTabs,
  ZigTypography,
} from '@zignaly-open/ui';
import { Box } from '@mui/material';
import KycBox from './components/KycBox';
import { PageWithHeaderContainer } from '../../TraderService/components/styles';
import {
  useKycLevelsQuery,
  useKycStatusesQuery,
  useLazyUserQuery,
} from '../../../apis/user/api';
import LayoutContentWrapper from '../../../components/LayoutContentWrapper';
import { useCurrentUser } from '../../../apis/user/use';
import {
  KycLevels,
  KycResponse,
  KycStatus,
  KycStatusResponse,
} from '../../../apis/user/types';
import { ReactComponent as SilverIcon } from '../../../images/kyc/silver.svg';
import { useTraderServices } from 'apis/service/use';
import { TraderService } from 'apis/service/types';

const Kyc = ({
  statuses,
  kycLevels,
  traderServices,
}: {
  statuses: KycStatusResponse[];
  kycLevels: KycLevels;
  traderServices: TraderService[];
}) => {
  const { t } = useTranslation(['kyc', 'pages']);
  useTitle(t('pages:kyc'));
  const currentUser = useCurrentUser();
  const [loadUser] = useLazyUserQuery();
  useEffect(() => {
    currentUser.KYCMonitoring && loadUser();
  }, []);
  const [tab, switchToTab] = useState(kycLevels[0].category);
  const correctOrder = statuses
    .filter((x) => x.category === tab)
    .sort((a, b) => a.level - b.level);
  const kycTabLevels = kycLevels.find((l) => l.category === tab)?.levels;

  return (
    <PageContainer style={{ maxWidth: '815px' }}>
      <PageWithHeaderContainer hasHeader>
        <Box
          sx={{
            textAlign: 'center',
            pb: 4,
          }}
        >
          <ZigTypography variant={'h1'} id={'kyc__title'}>
            {t('title')}
          </ZigTypography>
          <ZigTypography
            variant={'body1'}
            id={'kyc__description'}
            color='neutral300'
            component={'p'}
          >
            {t('description')}
            <br />
            {t('description-explainer')}
          </ZigTypography>
        </Box>

        {kycLevels.length > 1 && (
          <ZigTabs
            sx={{
              mt: 0,
              mb: 4,
              ml: 'auto',
              mr: 'auto',
            }}
            onChange={(_, newValue) => switchToTab(newValue)}
            value={tab}
          >
            {kycLevels.map((l) => (
              <ZigTab
                key={l.category}
                label={t(`tabs.${l.category.toLowerCase()}`)}
                value={l.category}
              />
            ))}
          </ZigTabs>
        )}
        {kycTabLevels?.map((l, i) => {
          const previousLevelMissing =
            correctOrder[i - 1] &&
            correctOrder[i - 1].status !== KycStatus.APPROVED;
          const differentTypeStarted = statuses.find(
            (x) =>
              x.category !== tab &&
              (x.status === KycStatus.REJECTED_RETRY ||
                [KycStatus.APPROVED, KycStatus.PENDING].includes(x.status)),
          );

          return (
            <KycBox
              disabledMessage={
                (differentTypeStarted &&
                  t(
                    'different-type-started-' + differentTypeStarted.category,
                  )) ||
                (previousLevelMissing && t('complete-previous-level-first')) ||
                (traderServices.length > 0 && t('without-services')) ||
                (currentUser.exchanges.length > 1 && t('multiple-accounts'))
              }
              labelColor={'#E1E9F0'}
              // balanceRestriction={t(
              //   `balance-range-from${l.restriction.to ? '-to' : ''}`,
              //   l.restriction,
              // )}
              response={correctOrder[i]}
              items={{ a: l.requirements }}
              // items={t(l.requirements, { returnObjects: true })}
              title={t(l.name)}
              key={correctOrder[i].level}
              icon={<SilverIcon />}
            />
          );
        })}
      </PageWithHeaderContainer>
    </PageContainer>
  );
};

const KycContainer = () => {
  const statusesEndpoint = useKycStatusesQuery();
  const kycLevelsEndpoint = useKycLevelsQuery();
  const traderServicesEndpoint = useTraderServices();

  return (
    <LayoutContentWrapper
      endpoint={[statusesEndpoint, kycLevelsEndpoint, traderServicesEndpoint]}
      hasHeader
      content={([{ statuses }, kycLevels, traderServices]: [
        KycResponse,
        KycLevels,
        TraderService[],
      ]) => {
        return (
          <Kyc
            statuses={statuses}
            kycLevels={kycLevels}
            traderServices={traderServices}
          />
        );
      }}
    />
  );
};

export default KycContainer;
