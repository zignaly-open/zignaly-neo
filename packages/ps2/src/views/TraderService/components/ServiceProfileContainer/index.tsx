import React from 'react';
import { Service } from '../../../../apis/service/types';
import { useIsServiceOwner } from '../../../../apis/service/use';
import { Box } from '@mui/system';
import { getServiceLogo } from '../../../../util/images';
import { Avatar } from '@zignaly-open/ui';
import { InvestButton, InvestedButton, ServiceInformation } from './atoms';
import { useMediaQuery } from '@mui/material';
import theme from 'theme';
import { useSetSelectedInvestment } from '../../../../apis/investment/use';
import { useCoinBalances } from '../../../../apis/coin/use';
import { ShowFnOutput, useModal } from 'mui-modal-provider';
import EditInvestmentModal from '../../../Dashboard/components/EditInvestmentModal';
import { serviceToInvestmentServiceDetail } from '../../../../apis/investment/util';

const ServiceProfileContainer: React.FC<{ service: Service }> = ({
  service,
}) => {
  const isOwner = useIsServiceOwner(service.id);
  const md = useMediaQuery(theme.breakpoints.up('sm'));
  const selectInvestment = useSetSelectedInvestment();
  // we do not use the results of this till before the modal
  useCoinBalances();
  const { showModal } = useModal();

  const onClickEditInvestment = () => {
    selectInvestment(serviceToInvestmentServiceDetail(service));
    const modal: ShowFnOutput<void> = showModal(EditInvestmentModal, {
      close: () => modal.hide(),
    });
  };

  // TODO: not logged in

  return (
    <Box
      sx={
        md
          ? {
              paddingLeft: 4,
              paddingRight: 4,
            }
          : {
              paddingLeft: 0,
              paddingRight: 0,
            }
      }
      paddingTop={isOwner ? 7 : 0}
    >
      <Box
        sx={{
          p: 2,
          pt: 1,
          flexDirection: md ? 'row' : 'column',
          display: 'flex',
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '55px', marginBottom: md ? 0 : 2 }}>
          <Avatar size={'x-large'} image={getServiceLogo(service.logo)} />
        </Box>
        <Box
          ml={md ? 2 : 0}
          flex={1}
          sx={{ textAlign: md ? 'left' : 'center' }}
        >
          <ServiceInformation service={service} />
        </Box>
        {!isOwner && (
          <Box sx={{ mt: md ? 0 : 3 }}>
            {+service.invested ? (
              <InvestedButton
                service={service}
                onClick={onClickEditInvestment}
              />
            ) : (
              <InvestButton service={service} onClick={() => alert()} />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ServiceProfileContainer;
