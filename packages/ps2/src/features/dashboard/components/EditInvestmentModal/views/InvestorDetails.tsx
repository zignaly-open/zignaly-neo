import React from 'react';
import { Avatar, Typography } from '@zignaly-open/ui';
import { Investor, InvestorData, InvestorName } from '../styles';
import { getServiceLogo } from 'util/images';
import { useSelectedInvestment } from '../../../use';
import { useServiceDetails } from '../../../../trader/use';
import { useTranslation } from 'react-i18next';

const InvestorDetails: React.FC = () => {
  const service = useSelectedInvestment();
  const { data } = useServiceDetails(service.serviceId);
  const { t } = useTranslation('edit-investment');
  return (
    <Investor>
      <Avatar size={'xx-large'} image={getServiceLogo(service.serviceLogo)} />
      <InvestorData>
        <InvestorName variant={'h2'} color={'neutral100'}>
          {service.serviceName}
        </InvestorName>

        {data.successFee && (
          <Typography variant={'h3'} color={'neutral400'}>
            {t('edit-investment.investorDetail-successFee', {
              fee: data.successFee,
            })}
          </Typography>
        )}
      </InvestorData>
    </Investor>
  );
};

export default InvestorDetails;
