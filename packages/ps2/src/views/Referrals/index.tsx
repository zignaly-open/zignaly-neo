import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useTitle } from 'util/title';
import {
  useReferralHistoryQuery,
  useReferralRewardsQuery,
} from '../../apis/referrals/api';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  SwipeableDrawer,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  PageContainer,
  ZigButton,
  ZigPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import { ZigArrowDescIcon, ZigUserFilledIcon } from '@zignaly-open/ui/icons';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import { TotalBox } from './atoms';
import { ReferralHistory, ReferralRewards } from '../../apis/referrals/types';
import ReferralTable from './components/ReferralTable';
import ReferralSuccessStep from './components/ReferralSuccessStep';
import { useTiersData } from 'apis/referrals/use';
import ReferralLimitedTime from './components/ReferralLimitedTime';
import { ArrowDownward, ListAltOutlined, Verified } from '@mui/icons-material';
import ReferralHowToEarn from './components/ReferralHowToEarn';
import ReferralCommissionBox from './components/ReferralCommissionBox';
import ReferralTermsButton from 'views/TraderService/components/ReferralsInviteModal/atoms/ReferralTermsButton';
import { grey } from '@mui/material/colors';

const Referrals: React.FC = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation(['referrals', 'pages']);
  const rewards = useReferralRewardsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const history = useReferralHistoryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useTitle(t('pages:referrals'));

  const tiersData = useTiersData();
  const {
    referral,
    maxCommission,
    maxCommissionWithoutTraderBoost,
    traderBoost,
    isLoading,
    boostRunning,
    inviteLeft,
  } = tiersData;

  const Puller = styled('div')(() => ({
    width: 30,
    height: 6,
    backgroundColor: grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const ReferralsSection = (
    rewardsData: ReferralRewards,
    referrals: ReferralHistory,
  ) => (
    <>
      {!sm && (
        <ZigTypography align={'center'} variant={'h1'} sx={{ mt: 7 }}>
          {t('my-referrals')}
        </ZigTypography>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          pt: 3,
          pb: 5,
        }}
      >
        <TotalBox
          label={t('signups')}
          value={
            <ZigTypography
              color={'yellow'}
              display={'flex'}
              alignItems={'center'}
              gap={1}
            >
              <ZigUserFilledIcon
                style={{
                  fontSize: '19px',
                }}
              />
              {rewardsData.invitedCount}
            </ZigTypography>
          }
        />
        {!sm && <ZigArrowDescIcon />}
        <TotalBox
          label={t('invested')}
          value={
            <ZigTypography
              color={'paleBlue'}
              display={'flex'}
              alignItems={'center'}
              gap={1}
            >
              <ZigUserFilledIcon
                color={'paleBlue'}
                style={{
                  fontSize: '19px',
                }}
              />
              {rewardsData.investorsCount}
              <Verified sx={{ color: 'greenGraph', fontSize: '21px' }} />
            </ZigTypography>
          }
        />
        {!sm && <ZigArrowDescIcon />}
        <TotalBox
          label={t('total-earned')}
          value={
            <ZigPriceLabel
              color={'#28ba62'}
              usd
              showTooltip
              variant={'bigNumber'}
              value={rewardsData.usdtEarned}
            />
          }
        />
      </Box>
      {sm ? (
        <Accordion
          sx={{
            width: '100%',
            backgroundColor: 'transparent',
            borderRadius: 1,
          }}
        >
          <AccordionSummary expandIcon={<ArrowDownward />}>
            <ListAltOutlined sx={{ mr: 2 }} />
            <ZigTypography variant={'h2'}>{t('table.title')}</ZigTypography>
          </AccordionSummary>
          <AccordionDetails>
            <ReferralTable referrals={referrals.history} />
          </AccordionDetails>
        </Accordion>
      ) : (
        <ReferralTable referrals={referrals.history} />
      )}
    </>
  );

  return (
    <PageContainer style={{ maxWidth: '1200px' }}>
      <LayoutContentWrapper
        endpoint={[rewards, history]}
        loading={isLoading}
        content={([rewardsData, referrals]: [
          ReferralRewards,
          ReferralHistory,
        ]) => (
          <>
            <Box
              sx={{
                mt: 8,
                alignItems: 'center',
                mb: sm ? 2 : 6,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {sm && (
                <SwipeableDrawer
                  anchor={'bottom'}
                  open={open}
                  onClose={toggleDrawer(false)}
                  onOpen={toggleDrawer(true)}
                >
                  <Puller />
                  <Box mt={2}></Box>
                  <ReferralHowToEarn tiersData={tiersData} />
                </SwipeableDrawer>
              )}
              <ZigTypography
                sx={{
                  mb: '19px',
                }}
                variant={'h1'}
                fontSize={'35px'}
                fontWeight={600}
                position={'relative'}
                className='referral-page__title'
              >
                {t('title', { commission: maxCommission })}
                {inviteLeft > 0 && boostRunning && <ReferralLimitedTime />}
              </ZigTypography>
              <ZigTypography
                sx={{
                  mb: 1,
                }}
                variant={'h2'}
                fontWeight={400}
                color='neutral300'
                className='referral-page__subtitle'
              >
                <Trans
                  i18nKey={'description'}
                  values={{
                    commission: maxCommissionWithoutTraderBoost,
                    maxCommission: maxCommission,
                    multiplier: traderBoost + 1,
                  }}
                  t={t}
                >
                  <ZigTypography
                    color='paleBlue'
                    variant={'h2'}
                    fontWeight={'inherit'}
                    component={'span'}
                  />
                </Trans>
              </ZigTypography>
              {sm &&
                rewardsData.invitedCount > 0 &&
                ReferralsSection(rewardsData, referrals)}
              <ReferralCommissionBox
                tiersData={tiersData}
                rewardsData={rewardsData}
              />
              {!sm && referral.invitedCount > 0 && (
                <Box mt='30px'>
                  <ReferralTermsButton />
                </Box>
              )}
              {sm && rewardsData.invitedCount > 0 && (
                <ZigButton
                  sx={{ mt: 2 }}
                  variant={'contained'}
                  size={'large'}
                  onClick={toggleDrawer(true)}
                >
                  {t('how-it-works')}
                </ZigButton>
              )}
            </Box>

            {!rewardsData.invitedCount ? (
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                {sm && (
                  <ZigButton
                    variant={'contained'}
                    size={'large'}
                    onClick={toggleDrawer(true)}
                  >
                    {t('how-it-works')}
                  </ZigButton>
                )}
                {!sm && <ReferralHowToEarn tiersData={tiersData} />}
                <ZigTypography
                  align={'center'}
                  variant={'h1'}
                  fontSize={'26px'}
                  fontWeight={600}
                  sx={{ mt: sm ? 2 : 7, mb: '29px' }}
                  className='referral__start-earning-title'
                >
                  {t('start-earning')}
                </ZigTypography>

                <Grid container>
                  <Grid item xs={4} md={4}>
                    <ReferralSuccessStep step={1} />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <ReferralSuccessStep step={2} />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <ReferralSuccessStep step={3} />
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <>{!sm && ReferralsSection(rewardsData, referrals)}</>
            )}
          </>
        )}
      />
    </PageContainer>
  );
};

export default Referrals;
