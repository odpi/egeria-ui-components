import { useParams, useNavigate } from 'react-router-dom';
import { EgeriaLineageGraph } from '..';

export function EgeriaLineageGraphRouteWrapper() {
  const { guid, lineageType } = useParams();

  const navigate = useNavigate();

  return <EgeriaLineageGraph guid={guid}
                             lineageType={lineageType}
                             navigateTo={(to: string) => navigate(to)} />;
}