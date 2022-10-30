import { jsx as _jsx } from "react/jsx-runtime";
import { useParams, useNavigate } from 'react-router-dom';
import { EgeriaLineageGraph } from '..';
export function EgeriaLineageGraphRouteWrapper() {
    const { guid, lineageType } = useParams();
    const navigate = useNavigate();
    return _jsx(EgeriaLineageGraph, { guid: guid, lineageType: lineageType, navigateTo: (to) => navigate(to) });
}
