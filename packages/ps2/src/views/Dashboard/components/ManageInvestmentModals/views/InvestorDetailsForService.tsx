import React from 'react';
import { Avatar, ZigTypography } from '@zignaly-open/ui';
import { Investor, InvestorData, InvestorName } from '../styles';
import { getServiceLogo } from 'util/images';
import { useTranslation } from 'react-i18next';

const InvestorDetailsForService: React.FC<{
  service: {
    serviceName: string;
    serviceLogo?: string;
    successFee: string;
  };
  prefixId?: string;
}> = ({ service, prefixId }) => {
  const { t } = useTranslation('edit-investment');
  return (
    <Investor id={prefixId && `${prefixId}__investor-details`}>
      {!!service.serviceLogo && (
        <Avatar
          size={'xx-large'}
          image={getServiceLogo(service.serviceLogo)}
          id={prefixId && `${prefixId}__investor-details-avatar`}
        />
      )}
      <InvestorData>
        <InvestorName
          variant={'h2'}
          color={'neutral200'}
          id={prefixId && `${prefixId}__investor-details-name`}
        >
          {service.serviceName}
        </InvestorName>

        {service.successFee?.toString() && (
          <ZigTypography
            variant={'caption'}
            color={'neutral300'}
            id={prefixId && `${prefixId}__investor-details-fee`}
          >
            {t('investorDetail-successFee', {
              fee: service.successFee,
            })}
          </ZigTypography>
        )}
      </InvestorData>
    </Investor>
  );
};

export default InvestorDetailsForService;
