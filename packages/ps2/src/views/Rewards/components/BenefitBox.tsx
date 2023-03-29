import { Box, Grid } from '@mui/material';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TicketShapeIndependent } from '../../../components/TicketShape/atoms';
import {
  TextButton,
  ZigButton,
  ZigPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import { OpenInNew } from '@mui/icons-material';
import ExportModal from '../../Balance/components/ExportModal';
import { useZAlert } from '../../../components/ZModal/use';
import { OlList, UlList } from '../../Referrals/styles';

const BenefitBox: React.FC<{
  label: string | JSX.Element;
  rewardAmount: number;
  currentAmount: number;
  requiredAmount: number;
  coin?: string;
  description: string;
  onAction: () => void;
  actionLabel: string | JSX.Element;
  terms: string | JSX.Element;
}> = ({
  label,
  description,
  currentAmount,
  requiredAmount,
  terms,
  onAction,
  actionLabel,
  coin,
  rewardAmount,
}) => {
  const { t } = useTranslation('rewards');
  const showAlert = useZAlert();

  const showTerms = useCallback(() => {
    showAlert({
      title: t('reward-terms'),
      okLabel: t('common:ok'),
      description:
        typeof terms === 'string' ? (
          <ZigTypography>{terms}</ZigTypography>
        ) : (
          terms
        ),
    });
  }, [t, terms]);

  return (
    <TicketShapeIndependent
      sx={{ borderRadius: '10px', minHeight: '140px' }}
      backgroundRgb={'53, 51, 74'}
      hole={15}
    >
      <Grid container>
        <Grid item xs={12} sm={3}>
          <ZigTypography>{label}</ZigTypography>
          <ZigPriceLabel value={rewardAmount} coin={coin} usd={!coin} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ZigTypography>
            {label}
            {!!terms && (
              <TextButton caption={t('terms')} onClick={() => showTerms()} />
            )}
          </ZigTypography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <ZigButton
            sx={{
              padding: '20px',
              fontSize: '18px',
            }}
            size={'large'}
            onClick={onAction}
            variant={'contained'}
          >
            {actionLabel}
          </ZigButton>
        </Grid>
      </Grid>
    </TicketShapeIndependent>
  );
};

export default BenefitBox;
