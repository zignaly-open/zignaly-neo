import React, { ComponentType, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useZModal } from './use';
import { UseModalOptions } from 'mui-modal-provider';

export const ZModalRouteElement: React.FC<{
  bgRoute: string;
  ctaId?: string;
  component: ComponentType;
  options?: UseModalOptions;
}> = ({ bgRoute, component, ctaId, options }) => {
  const navigate = useNavigate();
  const { showModal } = useZModal({
    // ideally we should use useMatches fron the latest react-router's api
    // but that would require us to swith to data router. meh.
    customClose: () => navigate(bgRoute),
    ...(options || {}),
  });
  const params = useParams();
  useEffect(() => {
    showModal(component, { ctaId, ...params });
  }, []);
  return null;
};

const createZModalRouteElement = ({
  component,
  ctaId,
  options,
}: {
  component: ComponentType;
  ctaId?: string;
  options?: UseModalOptions;
}): React.FC<{ bgRoute: string }> => {
  return ({ bgRoute }) => (
    <ZModalRouteElement
      bgRoute={bgRoute}
      component={component}
      options={options}
      ctaId={ctaId}
    />
  );
};

export default createZModalRouteElement;
