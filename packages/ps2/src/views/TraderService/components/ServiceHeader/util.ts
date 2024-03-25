import type { SubHeaderRouteType } from '@zignaly-open/ui';
import { useLocation, useNavigate } from 'react-router-dom';

export function useConvertRouteToSubHeaderFormat(): (props: {
  name: string;
  path: string;
  id: string;
  sideElement?: JSX.Element;
}) => SubHeaderRouteType {
  const navigate = useNavigate();
  const currentPath = useLocation()?.pathname;
  return (route) => ({
    active: route.href && route.href === currentPath,
    ...route,
  });
}
