import React from 'react';
import { Avatar, ZigTypography } from '@zignaly-open/ui';
import { Investor, InvestorData, InvestorName } from '../styles';
import { getServiceLogo } from 'util/images';
import { Trans, useTranslation } from 'react-i18next';
import { adjustDiscountFromBackend } from '../../../../../util/fee';

const InvestorDetailsForService: React.FC<{
  service: {
    serviceName: string;
    serviceLogo?: string;
    successFee: number;
  };
  discount?: string;
  prefixId?: string;
}> = ({ service, discount, prefixId }) => {
  const { t } = useTranslation('edit-investment');
  const successFeeDiscount = adjustDiscountFromBackend(
    +discount || 0,
    +service.successFee,
  );
  return (
    <Investor id={prefixId && `${prefixId}__investor-details`}>
      <Avatar
        size={48}
        image={getServiceLogo(service.serviceLogo)}
        id={prefixId && `${prefixId}__investor-details-avatar`}
      />
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
            {successFeeDiscount ? (
              <Trans
                i18nKey={'edit-investment:investorDetail-successFee-discounted'}
                t={t}
                values={{
                  oldFee: service.successFee,
                  fee: +service.successFee - successFeeDiscount,
                }}
              >
                <ZigTypography
                  sx={{ textDecoration: 'line-through' }}
                  variant={'caption'}
                  color={'neutral300'}
                />
              </Trans>
            ) : (
              t('investorDetail-successFee', {
                fee: +service.successFee - successFeeDiscount,
              })
            )}
          </ZigTypography>
        )}
      </InvestorData>
    </Investor>
  );
};

export default InvestorDetailsForService;
