import { Box, LinearProgress } from '@mui/material';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import TicketShape, {
  TicketShapeIndependent,
} from '../../../components/TicketShape/atoms';
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
      backgroundRgb={'58, 58, 79'}
      hole={13}
    >
      <TicketShapeIndependent
        sx={{
          borderRadius: '10px',
          minHeight: '140px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: '20px',
          pl: 5,
          pr: 5,
          pt: 1,
          pb: 1,
        }}
        backgroundRgb={'8, 8, 29'}
        hole={14}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '13px',
            pb: 1,
          }}
        >
          <ZigTypography>{label}</ZigTypography>
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
            pr: 3,
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
        <Box>
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
        </Box>
        {/*</Box>*/}
      </TicketShapeIndependent>
    </TicketShape>
  );
};

export default BenefitBox;
