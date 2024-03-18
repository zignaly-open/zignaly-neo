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
  return ({ name, path, id, sideElement }) => ({
    name,
    id,
    onClick: () => navigate(path),
    active: currentPath === path,
    sideElement,
  });
}
