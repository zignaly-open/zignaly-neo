import React from 'react';
import { Avatar, Typography } from '@zignaly-open/ui';
import { Investor, InvestorData, InvestorName } from '../styles';
import { getServiceLogo } from 'util/images';
import { useTranslation } from 'react-i18next';

const InvestorDetailsForService: React.FC<{
  service: {
    serviceName: string;
    serviceLogo?: string;
    successFee: string;
  };
}> = ({ service }) => {
  const { t } = useTranslation('edit-investment');
  return (
    <Investor>
      {!!service.serviceLogo && (
        <Avatar size={'xx-large'} image={getServiceLogo(service.serviceLogo)} />
      )}
      <InvestorData>
        <InvestorName variant={'h2'} color={'neutral100'}>
          {service.serviceName}
        </InvestorName>

        {service.successFee.toString() && (
          <Typography variant={'h3'} color={'neutral400'}>
            {t('investorDetail-successFee', {
              fee: service.successFee,
            })}
          </Typography>
        )}
      </InvestorData>
    </Investor>
  );
};

export default InvestorDetailsForService;
