import React, { ComponentType, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useZModal } from './use';

export const ZModalRouteElement: React.FC<{
  bgRoute: string;
  ctaId?: string;
  component: ComponentType;
}> = ({ bgRoute, component, ctaId }) => {
  const navigate = useNavigate();
  const { showModal } = useZModal({
    // ideally we should use useMatches fron the latest react-router's api
    // but that would require us to swith to data router. meh.
    customClose: () => navigate(bgRoute),
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
}: {
  component: ComponentType;
  ctaId?: string;
}): React.FC<{ bgRoute: string }> => {
  return ({ bgRoute }) => (
    <ZModalRouteElement bgRoute={bgRoute} component={component} ctaId={ctaId} />
  );
};

export default createZModalRouteElement;
