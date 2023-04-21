import React from 'react';
import { useTranslation } from 'react-i18next';
import { TypographyPanelName } from './TransactionDetails/styles';

const ServiceLink = ({
  serviceId,
  serviceName,
  servicePsVersion,
}: {
  serviceId: string;
  serviceName: string;
  servicePsVersion: number;
}) => {
  const { t } = useTranslation('transactions-history');

  return (
    <TypographyPanelName>
      {!serviceName || servicePsVersion === 1 ? (
        serviceName || t('psService')
      ) : (
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={`${window.location.origin}/profit-sharing/${serviceId}`}
        >
          {serviceName}
        </a>
      )}
    </TypographyPanelName>
  );
};

export default ServiceLink;
