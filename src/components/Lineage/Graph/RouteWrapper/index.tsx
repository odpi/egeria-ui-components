import { useParams, useNavigate } from 'react-router-dom';
import { EgeriaLineageGraph } from '..';

interface Props {
  apiUrl: string;
}

export function EgeriaLineageGraphRouteWrapper(props: Props) {
  const { guid, lineageType } = useParams();
  const { apiUrl } = props;

  const navigate = useNavigate();

  return <EgeriaLineageGraph apiUrl={apiUrl}
                             guid={guid}
                             lineageType={lineageType}
                             navigateTo={(to: string) => navigate(to)} />;
}