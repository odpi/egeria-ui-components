import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { EgeriaLineageGraph } from '..';


export function EgeriaLineageGraphRouteWrapper() {
  const { guid } = useParams();
  const location = useLocation();

  const lineageType = location.pathname.replace(/\/+$/, '').split('/').pop();

  const navigate = useNavigate();

  return <EgeriaLineageGraph guid={guid}
                             lineageType={lineageType}
                             navigateTo={(to: string) => navigate(to)} />;
}