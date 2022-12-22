import React from 'react';
import { TypographyPanelName } from './TransactionDetails/styles';

const ServiceLink = ({
  serviceId,
  serviceName,
  servicePsVersion,
}: {
  serviceId: string;
  serviceName: string;
  servicePsVersion: number;
}) => (
  <TypographyPanelName>
    {servicePsVersion === 1 ? (
      serviceName
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

export default ServiceLink;
