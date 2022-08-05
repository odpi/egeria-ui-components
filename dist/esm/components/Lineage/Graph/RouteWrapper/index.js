import { jsx as _jsx } from "react/jsx-runtime";
import { useParams, useNavigate } from 'react-router-dom';
import { EgeriaLineageGraph } from '..';
export function EgeriaLineageGraphRouteWrapper(props) {
    const { guid, lineageType } = useParams();
    const { apiUrl } = props;
    const navigate = useNavigate();
    return _jsx(EgeriaLineageGraph, { apiUrl: apiUrl, guid: guid, lineageType: lineageType, navigateTo: (to) => navigate(to) });
}
