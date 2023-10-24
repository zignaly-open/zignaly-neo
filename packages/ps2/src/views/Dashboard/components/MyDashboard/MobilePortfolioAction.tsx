import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import { Box, IconButton, useTheme } from '@mui/material';
import { useMarketplaceMobileActiveRow } from '../../../../apis/marketplace/use';
import { ZigButton, ZigCrossIcon } from '@zignaly-open/ui';
import {
  ROUTE_DASHBOARD_EDIT_INVESTMENT,
  ROUTE_TRADING_SERVICE,
} from '../../../../routes';
import React from 'react';
import { useZRouteModal } from '../../../../components/ZModal/use';
export const MobilePortfolioAction = ({
  serviceId,
  rowId,
}: {
  rowId: string;
  serviceId: string;
}) => {
  const { t } = useTranslation(['marketplace', 'action']);
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeRow, setActiveRow] = useMarketplaceMobileActiveRow();
  const showEditInvestmentModal = useZRouteModal(
    ROUTE_DASHBOARD_EDIT_INVESTMENT,
  );

  const onClickEditInvestment = () => showEditInvestmentModal({ serviceId });
  return (
    rowId === activeRow && (
      <Box
        position={'absolute'}
        left={0}
        top={-2}
        sx={{
          backdropFilter: 'blur(7px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 3,
          gap: 2,
        }}
        width={'100%'}
        height={'102%'}
      >
        <ZigButton size={'large'} onClick={() => onClickEditInvestment()}>
          {t('action:edit')}
        </ZigButton>
        <ZigButton
          size={'large'}
          variant={'outlined'}
          onClick={() =>
            navigate(
              generatePath(ROUTE_TRADING_SERVICE, {
                serviceId,
              }),
            )
          }
        >
          {t('table.view-profile')}
        </ZigButton>
        <IconButton
          onClick={() => {
            setActiveRow(null);
          }}
          sx={{ marginRight: '15px', marginLeft: '-10px' }}
        >
          <ZigCrossIcon
            width={25}
            height={25}
            color={theme.palette.neutral300}
          />
        </IconButton>
      </Box>
    )
  );
};
