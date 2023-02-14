import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { EgeriaLineageGraph } from '..';

export const getUrlLastSubdirectory = (path:string) => {
  return path.replace(/\/+$/, '').split('/').pop();
}

export function EgeriaLineageGraphRouteWrapper() {
  const { guid } = useParams();
  const location = useLocation();

  const lineageType = getUrlLastSubdirectory(location.pathname);
  const navigate = useNavigate();

  return <EgeriaLineageGraph guid={guid}
                             lineageType={lineageType}
                             navigateTo={(to: string) => navigate(to)} />;
}