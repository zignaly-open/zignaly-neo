import React from 'react';
import { TypographyPanelName } from './TransactionDetails/styles';

const ServiceLink = ({
  serviceId,
  serviceName,
}: {
  serviceId: string;
  serviceName: string;
}) => (
  <TypographyPanelName>
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={`${window.location.origin}/profit-sharing/${serviceId}`}
    >
      {serviceName}
    </a>
  </TypographyPanelName>
);

export default ServiceLink;
