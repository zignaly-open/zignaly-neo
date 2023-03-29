import { Box, LinearProgress } from '@mui/material';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import TicketShape from '../../../components/TicketShape/atoms';
import {
  TextButton,
  ZigButton,
  ZigPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import { useZAlert } from '../../../components/ZModal/use';

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
    <TicketShape
      sx={{
        borderRadius: '10px',
        p: '1px',
      }}
      backgroundRgb={'37, 55, 57'}
      hole={13}
    >
      <TicketShape
        sx={{
          borderRadius: '10px',
          minHeight: '140px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: '60px',
          pr: '60px',
          pl: '60px',
          pt: 1,
          pb: 1,
        }}
        backgroundRgb={'20, 25, 54'}
        hole={14}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '13px',
            maxWidth: '100px',
            textAlign: 'center',
            pb: 1,
          }}
        >
          <ZigTypography sx={{ mb: 1 }}>{label}</ZigTypography>
          <ZigPriceLabel
            color={'neutral175'}
            sx={{
              fontSize: '36px',
            }}
            value={rewardAmount}
            coin={coin}
            usd={!coin}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <ZigTypography>
            {description}
            {!!terms && (
              <TextButton caption={t('terms')} onClick={() => showTerms()} />
            )}
          </ZigTypography>

          <Box
            sx={{
              display: 'flex',
              color: (theme) => theme.palette.neutral300,
              flexDirection: 'row',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <LinearProgress
              sx={{
                flex: 1,
                mr: 2,
              }}
              value={(100 * currentAmount) / requiredAmount}
              variant='determinate'
            />
            <Box>
              <ZigPriceLabel
                sx={{
                  fontSize: '13px',
                }}
                color={'neutral200'}
                value={currentAmount}
                coin={coin}
                usd={!coin}
              />
              <ZigTypography sx={{ fontSize: '13px' }}>{' / '}</ZigTypography>
              <ZigPriceLabel
                sx={{
                  fontSize: '13px',
                }}
                color={'neutral200'}
                value={requiredAmount}
                coin={coin}
                usd={!coin}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ padding: '0 12px' }}>
          <ZigButton
            sx={{
              padding: '20px 30px',
              lineHeight: '20px',
              fontSize: '18px',
            }}
            size={'large'}
            onClick={onAction}
            variant={'contained'}
          >
            {actionLabel}
          </ZigButton>
        </Box>
        {/*</Box>*/}
      </TicketShape>
    </TicketShape>
  );
};

export default BenefitBox;
