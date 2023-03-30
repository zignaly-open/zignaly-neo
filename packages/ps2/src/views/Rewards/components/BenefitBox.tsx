import { Box, LinearProgress } from '@mui/material';
import React from 'react';
import TicketShape from '../../../components/TicketShape/atoms';
import { ZigButton, ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import TermsButtonModal from './TermsButtonModal';

const BenefitBox: React.FC<{
  label: string | JSX.Element;
  rewardAmount: number;
  currentAmount: number;
  requiredAmount: number;
  coin?: string;
  showProgress?: boolean;
  description: string;
  onAction?: () => void;
  actionLabel: string | JSX.Element;
}> = ({
  label,
  description,
  currentAmount,
  requiredAmount,
  showProgress,
  onAction,
  actionLabel,
  coin,
  rewardAmount,
}) => {
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
          <ZigTypography>{description}</ZigTypography>

          <TermsButtonModal />

          {!!showProgress && (
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
          )}
        </Box>
        <Box sx={{ padding: '0 12px', minWidth: 134 }}>
          {!!onAction && (
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
          )}
        </Box>
      </TicketShape>
    </TicketShape>
  );
};

export default BenefitBox;
