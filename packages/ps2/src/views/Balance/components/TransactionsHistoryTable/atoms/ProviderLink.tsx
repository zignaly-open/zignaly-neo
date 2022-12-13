import React from 'react';

const ProviderLink = ({
  providerId,
  providerName,
}: {
  providerId: string;
  providerName: string;
}) => (
  <a
    target='_blank'
    rel='noopener noreferrer'
    href={`${window.location.origin}${process.env.GATSBY_BASE_PATH}/profitSharing/${providerId}`}
  >
    {providerName}
  </a>
);

export default ProviderLink;
