import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { Helmet } from 'react-helmet';
import * as configs from '../../../../../whitelabel/configs';
import { generatePath } from 'react-router-dom';
import { ROUTE_TRADING_SERVICE } from '../../../../../routes';

const ServiceCanonical: React.FC<{ service: Service }> = ({ service }) => {
  return (
    <Helmet>
      <link
        rel='canonical'
        href={`https://${
          configs.zignaly[service.whitelabel] || configs.zignaly.domain
        }${generatePath(ROUTE_TRADING_SERVICE, { serviceId: service.id })}`}
      />
    </Helmet>
  );
};

export default ServiceCanonical;
