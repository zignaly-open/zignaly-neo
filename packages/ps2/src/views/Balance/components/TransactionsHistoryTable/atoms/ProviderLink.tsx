import { ZigTypography } from '@zignaly-open/ui';
import React from 'react';

const ServiceLink = ({
  serviceId,
  serviceName,
}: {
  serviceId: string;
  serviceName: string;
}) => (
  <ZigTypography color='neutral000' fontWeight={600}>
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={`${window.location.origin}/profit-sharing/${serviceId}`}
    >
      {serviceName}
    </a>
  </ZigTypography>
);

export default ServiceLink;
